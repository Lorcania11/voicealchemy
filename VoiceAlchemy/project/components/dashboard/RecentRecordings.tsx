import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Mic, ChevronRight } from 'lucide-react-native';

interface RecentRecordingsProps {
  loading: boolean;
  onRecordingPress?: (recording: any) => void;
}

// Sample recording data
const RECORDINGS = [
  {
    id: '1',
    title: 'Sales Pitch - Client X',
    duration: '4:32',
    date: 'Today, 2:15 PM',
    metrics: {
      clarity: 85,
      pace: 72,
    },
  },
  {
    id: '2',
    title: 'Practice - Objection Handling',
    duration: '8:17',
    date: 'Yesterday, 10:45 AM',
    metrics: {
      clarity: 76,
      pace: 81,
    },
  },
  {
    id: '3',
    title: 'Team Meeting Introduction',
    duration: '2:55',
    date: 'Mar 12, 2025',
    metrics: {
      clarity: 92,
      pace: 88,
    },
  },
];

export default function RecentRecordings({ loading, onRecordingPress }: RecentRecordingsProps) {
  const { colors } = useTheme();

  const handleViewAllPress = () => {
    // Navigate to all recordings - in a real app, this would use navigation
    console.log('View all recordings pressed');
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3].map((_, index) => (
          <View 
            key={index}
            style={[styles.loadingItem, { backgroundColor: colors.card }]} 
          />
        ))}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {RECORDINGS.map(recording => (
        <Pressable
          key={recording.id}
          style={[styles.recordingItem, { backgroundColor: colors.card }]}
          onPress={() => onRecordingPress?.(recording)}
        >
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <Mic size={18} color="#3B82F6" />
          </View>
          
          <View style={styles.recordingContent}>
            <Text style={[styles.recordingTitle, { color: colors.text }]} numberOfLines={1}>
              {recording.title}
            </Text>
            <View style={styles.recordingMeta}>
              <Text style={[styles.recordingDuration, { color: colors.textSecondary }]}>
                {recording.duration}
              </Text>
              <Text style={[styles.recordingDate, { color: colors.textSecondary }]}>
                {recording.date}
              </Text>
            </View>
          </View>
          
          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textTertiary }]}>Clarity</Text>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {recording.metrics.clarity}%
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textTertiary }]}>Pace</Text>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {recording.metrics.pace}%
              </Text>
            </View>
            <ChevronRight size={16} color={colors.textTertiary} />
          </View>
        </Pressable>
      ))}
      
      <Pressable 
        style={[styles.viewAllButton, { borderColor: colors.border }]}
        onPress={handleViewAllPress}
      >
        <Text style={[styles.viewAllText, { color: colors.primary }]}>
          View All Recordings
        </Text>
        <ChevronRight size={16} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    marginBottom: 16,
  },
  loadingItem: {
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordingContent: {
    flex: 1,
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingDuration: {
    fontSize: 14,
    marginRight: 8,
  },
  recordingDate: {
    fontSize: 14,
  },
  metricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  viewAllText: {
    fontWeight: '600',
    marginRight: 4,
  },
});