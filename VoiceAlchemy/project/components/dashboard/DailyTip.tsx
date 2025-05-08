import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Lightbulb } from 'lucide-react-native';

export default function DailyTip() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.iconContainer}>
        <Lightbulb size={24} color="white" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Daily Voice Tip</Text>
        <Text style={styles.tip}>
          When addressing objections in sales calls, lower your pitch slightly and slow your pace to convey confidence and thoughtfulness.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  tip: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
});