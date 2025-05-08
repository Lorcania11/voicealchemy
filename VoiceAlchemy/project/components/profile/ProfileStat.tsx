import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ProfileStatProps {
  label: string;
  value: string;
}

export default function ProfileStat({ label, value }: ProfileStatProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 70,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
  },
});