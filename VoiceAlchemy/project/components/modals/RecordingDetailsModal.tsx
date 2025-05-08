import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Play, Pause, Clock, Calendar, Share2, Download, Trash2, Volume2 } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface RecordingDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  recording: {
    id: string;
    title?: string;
    duration?: string;
    date?: string;
    uri?: string;
  } | null;
}

export default function RecordingDetailsModal({
  visible,
  onClose,
  recording,
}: RecordingDetailsModalProps) {
  const { colors, isDark } = useTheme();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  
  // Clean up sound when modal closes or component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  
  // Reset state when modal visibility changes
  useEffect(() => {
    if (!visible) {
      if (sound) {
        sound.unloadAsync();
        setSound(null);
      }
      setIsPlaying(false);
      setPlaybackPosition(0);
      setPlaybackDuration(0);
    } else if (visible && recording?.uri) {
      loadSound();
    }
  }, [visible, recording]);
  
  // Load the sound file
  const loadSound = async () => {
    if (!recording?.uri) return;
    
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recording.uri },
        { progressUpdateIntervalMillis: 100 },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      
      // Get duration
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setPlaybackDuration(status.durationMillis || 0);
      }
    } catch (error) {
      console.error('Error loading sound:', error);
      Alert.alert('Playback Error', 'Failed to load recording. The file may be corrupted or deleted.');
    }
  };
  
  // Monitor playback status
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
      
      // Reset when playback ends
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
        sound?.setPositionAsync(0);
      }
    }
  };
  
  // Handle play/pause
  const togglePlayback = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };
  
  // Format time in mm:ss
  const formatTime = (millis: number) => {
    const seconds = Math.floor(millis / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Share recording
  const shareRecording = async () => {
    if (!recording?.uri) return;
    
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(recording.uri);
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing recording:', error);
      Alert.alert('Sharing Error', 'Failed to share recording');
    }
  };
  
  // Delete recording
  const deleteRecording = () => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!recording?.uri) return;
            
            try {
              // Stop playback
              if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
              }
              
              // Delete file
              await FileSystem.deleteAsync(recording.uri);
              
              // TODO: Remove from saved recordings in storage
              
              onClose();
            } catch (error) {
              console.error('Error deleting recording:', error);
              Alert.alert('Delete Error', 'Failed to delete recording');
            }
          }
        }
      ]
    );
  };

  if (!recording) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Recording Details
            </Text>
            
            <Pressable
              style={[styles.closeButton, { backgroundColor: colors.card }]}
              onPress={onClose}
            >
              <X size={18} color={colors.text} />
            </Pressable>
          </View>
          
          <View style={styles.recordingInfo}>
            <Text style={[styles.recordingTitle, { color: colors.text }]}>
              {recording.title || 'Untitled Recording'}
            </Text>
            
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock size={14} color={colors.textSecondary} style={styles.metaIcon} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {recording.duration || formatTime(playbackDuration)}
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Calendar size={14} color={colors.textSecondary} style={styles.metaIcon} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {recording.date || new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.playbackContainer, { backgroundColor: colors.card }]}>
            <View style={styles.waveformPlaceholder}>
              {/* In a full implementation, this could be a visualization of the audio waveform */}
              <View style={styles.waveRow}>
                {Array.from({ length: 30 }).map((_, index) => (
                  <View 
                    key={index}
                    style={[
                      styles.waveBar,
                      { 
                        height: 5 + Math.random() * 30,
                        backgroundColor: colors.primary,
                        opacity: index / 30 > playbackPosition / playbackDuration ? 0.3 : 1
                      }
                    ]}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.timeRow}>
              <Text style={{ color: colors.textSecondary }}>
                {formatTime(playbackPosition)}
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                {formatTime(playbackDuration)}
              </Text>
            </View>
            
            <View style={styles.playbackControls}>
              <Pressable
                style={[styles.playButton, { backgroundColor: colors.primary }]}
                onPress={togglePlayback}
              >
                {isPlaying ? (
                  <Pause size={24} color="white" />
                ) : (
                  <Play size={24} color="white" />
                )}
              </Pressable>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={shareRecording}
            >
              <Share2 size={20} color={colors.text} style={styles.actionIcon} />
              <Text style={[styles.actionText, { color: colors.text }]}>Share</Text>
            </Pressable>
            
            <Pressable
              style={[styles.actionButton, { backgroundColor: colors.card }]}
            >
              <Volume2 size={20} color={colors.text} style={styles.actionIcon} />
              <Text style={[styles.actionText, { color: colors.text }]}>Analyze</Text>
            </Pressable>
            
            <Pressable
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={deleteRecording}
            >
              <Trash2 size={20} color={colors.error} style={styles.actionIcon} />
              <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingInfo: {
    marginBottom: 20,
  },
  recordingTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    marginRight: 6,
  },
  metaText: {
    fontSize: 14,
  },
  playbackContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  waveformPlaceholder: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waveBar: {
    width: 3,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  playbackControls: {
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});