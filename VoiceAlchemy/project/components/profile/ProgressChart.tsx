import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// Voice metrics data (simulated)
const VOICE_METRICS = [
  { id: 'clarity', label: 'Clarity', score: 82, color: '#3B82F6' },
  { id: 'pace', label: 'Pace', score: 68, color: '#8B5CF6' },
  { id: 'pitch', label: 'Pitch', score: 75, color: '#EC4899' },
  { id: 'tone', label: 'Tone', score: 90, color: '#10B981' },
  { id: 'energy', label: 'Energy', score: 65, color: '#F59E0B' },
];

interface MetricBarProps {
  label: string;
  score: number;
  color: string;
  maxScore?: number;
}

function MetricBar({ label, score, color, maxScore = 100 }: MetricBarProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Animate the bar width
    const timer = setTimeout(() => {
      setWidth((score / maxScore) * 100);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [score, maxScore]);

  return (
    <View style={styles.metricContainer}>
      <View style={styles.metricLabelContainer}>
        <Text style={[styles.metricLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.metricScore, { color }]}>{score}%</Text>
      </View>
      <View style={[styles.metricBarBackground, { backgroundColor: colors.backgroundSecondary }]}>
        <View 
          style={[
            styles.metricBarFill, 
            { width: `${width}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
}

export default function ProgressChart() {
  return (
    <View style={styles.container}>
      {VOICE_METRICS.map((metric) => (
        <MetricBar
          key={metric.id}
          label={metric.label}
          score={metric.score}
          color={metric.color}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  metricContainer: {
    marginBottom: 16,
  },
  metricLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  metricScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 4,
    width: '0%', // Starting width for animation
  },
});