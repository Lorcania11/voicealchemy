import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Mic, Pause, Play, Save } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/common/Header';
import { useTheme } from '@/hooks/useTheme';
import VoiceWaveform from '@/components/record/VoiceWaveform';
import RecordingModes from '@/components/record/RecordingModes';
import { useRecording } from '@/hooks/useRecording';
import RecordingDetailsModal from '@/components/modals/RecordingDetailsModal';

export default function RecordScreen() {
  const { colors, isDark } = useTheme();
  const { 
    recording, 
    isRecording, 
    isPaused, 
    recordingTime, 
    startRecording, 
    stopRecording, 
    pauseRecording, 
    resumeRecording 
  } = useRecording();
  
  const [selectedMode, setSelectedMode] = useState('freestyle');
  const [recordingDetailsVisible, setRecordingDetailsVisible] = useState(false);
  const [savedRecording, setSavedRecording] = useState<any>(null);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleRecordPress = async () => {
    if (!isRecording) {
      await startRecording();
    } else if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  };
  
  const handleSaveRecording = async () => {
    if (recording) {
      const finishedRecording = await stopRecording();
      
      // Create a new recording object with more metadata
      const newRecording = {
        id: finishedRecording.id,
        title: generateRecordingTitle(),
        duration: formatTime(finishedRecording.duration),
        date: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
      };
      
      setSavedRecording(newRecording);
      setRecordingDetailsVisible(true);
    }
  };
  
  const generateRecordingTitle = () => {
    const modes = {
      'freestyle': 'Freestyle Recording',
      'guided': 'Guided Recording',
      'script': 'Script Recording',
      'exercise': 'Exercise Recording'
    };
    
    return modes[selectedMode] || 'Voice Recording';
  };
  
  const handleModeSelect = (mode: string) => {
    if (isRecording) {
      Alert.alert(
        "Change Recording Mode?",
        "Changing the recording mode will stop your current recording. Continue?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Continue", 
            onPress: async () => {
              await stopRecording();
              setSelectedMode(mode);
            }
          }
        ]
      );
    } else {
      setSelectedMode(mode);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header title="Record" />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <RecordingModes 
            selectedMode={selectedMode} 
            onSelectMode={handleModeSelect} 
          />
          
          <View style={styles.recordingContainer}>
            <View style={[styles.waveformContainer, { backgroundColor: colors.card }]}>
              <VoiceWaveform isRecording={isRecording && !isPaused} />
              
              <View style={styles.timeContainer}>
                <Text style={[styles.timeText, { color: colors.text }]}>
                  {formatTime(recordingTime)}
                </Text>
              </View>
            </View>
            
            <View style={styles.controlsContainer}>
              <Pressable 
                style={[
                  styles.recordButton, 
                  isRecording ? styles.recordingActive : null
                ]}
                onPress={handleRecordPress}
              >
                <LinearGradient
                  colors={isRecording ? ['#DC2626', '#EF4444'] : ['#1E40AF', '#3B82F6']}
                  style={styles.recordButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isRecording && !isPaused ? (
                    <Pause size={28} color="white" />
                  ) : isRecording && isPaused ? (
                    <Play size={28} color="white" />
                  ) : (
                    <Mic size={28} color="white" />
                  )}
                </LinearGradient>
              </Pressable>
              
              {isRecording && (
                <Pressable 
                  style={[styles.saveButton, { backgroundColor: colors.card }]}
                  onPress={handleSaveRecording}
                >
                  <Save size={24} color={colors.primary} />
                </Pressable>
              )}
            </View>
          </View>
          
          {isRecording && (
            <View style={[styles.tipsContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.tipsTitle, { color: colors.text }]}>Recording Tips</Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                • Speak clearly at a consistent volume
              </Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                • Keep the microphone 6-12 inches from your mouth
              </Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                • Minimize background noise
              </Text>
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                • Take pauses between sentences
              </Text>
            </View>
          )}
          
          {selectedMode === 'guided' && !isRecording && (
            <View style={[styles.guidedContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.guidedTitle, { color: colors.text }]}>Guided Recording</Text>
              <Text style={[styles.guidedDescription, { color: colors.textSecondary }]}>
                This mode provides prompts and feedback as you record. Perfect for practicing sales pitches, presentations, or interviews.
              </Text>
              <Text style={[styles.guidedInstructions, { color: colors.primary }]}>
                Press the record button to begin your guided session.
              </Text>
            </View>
          )}
          
          {selectedMode === 'script' && !isRecording && (
            <View style={[styles.scriptContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.scriptTitle, { color: colors.text }]}>Script Recording</Text>
              <Text style={[styles.scriptDescription, { color: colors.textSecondary }]}>
                Select or upload a script to read as you record. The app will analyze your delivery against the written content.
              </Text>
              <Pressable 
                style={[styles.uploadButton, { borderColor: colors.primary }]}
              >
                <Text style={[styles.uploadButtonText, { color: colors.primary }]}>
                  Upload or Select Script
                </Text>
              </Pressable>
            </View>
          )}
          
          {selectedMode === 'exercise' && !isRecording && (
            <View style={[styles.exerciseContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>Exercise Recording</Text>
              <Text style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
                Follow along with voice exercises designed to improve specific aspects of your speaking abilities.
              </Text>
              <View style={styles.exerciseOptions}>
                <Pressable 
                  style={[styles.exerciseOption, { backgroundColor: colors.backgroundSecondary }]}
                >
                  <Text style={[styles.exerciseOptionText, { color: colors.text }]}>
                    Pitch Control
                  </Text>
                </Pressable>
                <Pressable 
                  style={[styles.exerciseOption, { backgroundColor: colors.backgroundSecondary }]}
                >
                  <Text style={[styles.exerciseOptionText, { color: colors.text }]}>
                    Pace Variation
                  </Text>
                </Pressable>
                <Pressable 
                  style={[styles.exerciseOption, { backgroundColor: colors.backgroundSecondary }]}
                >
                  <Text style={[styles.exerciseOptionText, { color: colors.text }]}>
                    Vocal Strength
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      
      <RecordingDetailsModal
        visible={recordingDetailsVisible}
        onClose={() => setRecordingDetailsVisible(false)}
        recording={savedRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  recordingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  waveformContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  timeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  recordingActive: {
    // For recording state
  },
  recordButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  tipsContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  guidedContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
  },
  guidedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  guidedDescription: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  guidedInstructions: {
    fontSize: 15,
    fontWeight: '500',
  },
  scriptContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
  },
  scriptTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  scriptDescription: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  exerciseContainer: {
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  exerciseDescription: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  exerciseOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseOption: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  exerciseOptionText: {
    fontWeight: '500',
  }
});