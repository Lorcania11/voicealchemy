import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface VoiceMetricsProps {
  loading: boolean;
}

export default function VoiceMetrics({ loading }: VoiceMetricsProps) {
  const { colors } = useTheme();
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3, 4].map((_, index) => (
          <View 
            key={index}
            style={[styles.loadingCard, { backgroundColor: colors.card }]} 
          />
        ))}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <View style={styles.metricHeader}>
            <Text style={[styles.metricName, { color: colors.text }]}>Clarity</Text>
            <Text style={[styles.metricTrend, { color: '#10B981' }]}>+5%</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>85%</Text>
          <View style={[styles.metricBar, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={[styles.metricBarFill, { width: '85%', backgroundColor: '#3B82F6' }]} />
          </View>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <View style={styles.metricHeader}>
            <Text style={[styles.metricName, { color: colors.text }]}>Pace</Text>
            <Text style={[styles.metricTrend, { color: '#F59E0B' }]}>+2%</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>72%</Text>
          <View style={[styles.metricBar, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={[styles.metricBarFill, { width: '72%', backgroundColor: '#8B5CF6' }]} />
          </View>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <View style={styles.metricHeader}>
            <Text style={[styles.metricName, { color: colors.text }]}>Pitch</Text>
            <Text style={[styles.metricTrend, { color: '#EF4444' }]}>-3%</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>68%</Text>
          <View style={[styles.metricBar, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={[styles.metricBarFill, { width: '68%', backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <View style={styles.metricHeader}>
            <Text style={[styles.metricName, { color: colors.text }]}>Energy</Text>
            <Text style={[styles.metricTrend, { color: '#10B981' }]}>+7%</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>79%</Text>
          <View style={[styles.metricBar, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={[styles.metricBarFill, { width: '79%', backgroundColor: '#F59E0B' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadingCard: {
    width: '48%',
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricTrend: {
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});