import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  borderRadius?: number;
}

export default function ProgressBar({
  progress,
  height = 6,
  backgroundColor,
  progressColor,
  borderRadius = 3,
}: ProgressBarProps) {
  const { colors } = useTheme();
  
  // Clamp progress between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          height,
          backgroundColor: backgroundColor || colors.backgroundSecondary,
          borderRadius
        }
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: progressColor || colors.primary,
            borderRadius
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  }
});