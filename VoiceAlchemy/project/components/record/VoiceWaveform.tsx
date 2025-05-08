import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface VoiceWaveformProps {
  isRecording: boolean;
  barCount?: number;
  animationSpeed?: number;
}

export default function VoiceWaveform({ 
  isRecording, 
  barCount = 30,
  animationSpeed = 500
}: VoiceWaveformProps) {
  const { colors, isDark } = useTheme();
  const [bars, setBars] = useState<Array<{height: Animated.Value, key: number}>>([]);
  
  // Initialize bars on first render
  useEffect(() => {
    const initialBars = Array.from({ length: barCount }, (_, index) => ({
      height: new Animated.Value(getRandomHeight(0.3, 0.5)),
      key: index
    }));
    setBars(initialBars);
  }, [barCount]);
  
  // Handle animation when recording state changes
  useEffect(() => {
    if (isRecording) {
      startAnimation();
    } else {
      // Reset all bars to minimal height when not recording
      bars.forEach(bar => {
        Animated.timing(bar.height, {
          toValue: getRandomHeight(0.1, 0.3),
          duration: 300,
          useNativeDriver: false,
          easing: Easing.ease
        }).start();
      });
    }
  }, [isRecording, bars]);
  
  // Generate a random height value between min and max
  const getRandomHeight = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };
  
  // Animate each bar with a randomized height and duration
  const startAnimation = () => {
    bars.forEach(bar => {
      const animate = () => {
        const randomHeight = getRandomHeight(0.1, isRecording ? 0.95 : 0.3);
        const randomDuration = getRandomSpeed(animationSpeed * 0.7, animationSpeed * 1.3);
        
        Animated.timing(bar.height, {
          toValue: randomHeight,
          duration: randomDuration,
          useNativeDriver: false,
          easing: Easing.ease
        }).start(() => {
          if (isRecording) {
            animate();
          }
        });
      };
      
      animate();
    });
  };
  
  // Get a random animation speed
  const getRandomSpeed = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min));
  };
  
  return (
    <View style={styles.container}>
      {bars.map((bar) => (
        <Animated.View 
          key={bar.key}
          style={[
            styles.bar,
            {
              backgroundColor: isRecording 
                ? bar.key % 3 === 0 
                  ? colors.primary 
                  : bar.key % 2 === 0 
                    ? colors.primaryLight 
                    : colors.secondary,
              height: bar.height.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bar: {
    flex: 1,
    marginHorizontal: 1,
    borderRadius: 2,
  }
});