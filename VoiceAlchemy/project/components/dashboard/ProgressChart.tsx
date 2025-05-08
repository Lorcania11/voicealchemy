import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ProgressChartProps {
  loading: boolean;
}

export default function ProgressChart({ loading }: ProgressChartProps) {
  const { colors } = useTheme();
  
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={styles.loadingContainer}>
          <View style={[styles.loadingBar, { backgroundColor: colors.backgroundSecondary }]} />
        </View>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.weekText, { color: colors.textSecondary }]}>Last 7 days</Text>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Pace</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EC4899' }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Clarity</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        {/* Chart bars */}
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Mon</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 70, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 45, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Tue</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 50, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 60, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Wed</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 80, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 65, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Thu</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 60, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 70, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Fri</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 90, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 75, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Sat</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 65, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 85, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
        
        <View style={styles.barGroup}>
          <Text style={[styles.barLabel, { color: colors.textTertiary }]}>Sun</Text>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: 85, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.bar, { height: 90, backgroundColor: '#EC4899' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  loadingContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBar: {
    width: '90%',
    height: 150,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekText: {
    fontSize: 14,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
  },
  chartContainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barGroup: {
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
  },
  bar: {
    width: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});