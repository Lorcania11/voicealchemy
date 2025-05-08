import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { VoiceMetrics } from '@/components/dashboard/VoiceMetrics';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { RecentRecordings } from '@/components/dashboard/RecentRecordings';
import { DailyTip } from '@/components/dashboard/DailyTip';
import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/common/Header';
import RecordingDetailsModal from '@/components/modals/RecordingDetailsModal';

export default function DashboardScreen() {
  const { colors, isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleQuickCheckPress = () => {
    Alert.alert(
      "2-Minute Voice Check",
      "This quick assessment will analyze your voice in real-time and provide immediate feedback. Ready to begin?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Start",
          onPress: () => {
            // Navigate to recording screen with quick check mode
            // In a real app, this would use navigation to the Record tab
            Alert.alert("Starting voice check...");
          }
        }
      ]
    );
  };
  
  const handleRecordingPress = (recording) => {
    setSelectedRecording(recording);
    setRecordingModalVisible(true);
  };

  // Check if components are defined before rendering them
  const canRenderVoiceMetrics = typeof VoiceMetrics !== 'undefined';
  const canRenderProgressChart = typeof ProgressChart !== 'undefined';
  const canRenderRecentRecordings = typeof RecentRecordings !== 'undefined';
  const canRenderDailyTip = typeof DailyTip !== 'undefined';
  const canRenderHeader = typeof Header !== 'undefined';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {canRenderHeader ? (
          <Header title="Dashboard" />
        ) : (
          <View style={styles.fallbackHeader}>
            <Text style={[styles.fallbackHeaderText, { color: colors.text }]}>Dashboard</Text>
          </View>
        )}
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.welcomeSection}>
              <Text style={[styles.greeting, { color: colors.text }]}>Welcome back</Text>
              <Text style={[styles.name, { color: colors.text }]}>John</Text>
              
              <Pressable 
                style={styles.quickCheckButton}
                onPress={handleQuickCheckPress}
              >
                <LinearGradient
                  colors={['#1E40AF', '#3B82F6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.quickCheckGradient}
                >
                  <Text style={styles.quickCheckText}>2-Min Voice Check</Text>
                </LinearGradient>
              </Pressable>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Voice Metrics
              </Text>
              {canRenderVoiceMetrics ? (
                <VoiceMetrics loading={loading} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={{ color: colors.text }}>Voice metrics component unavailable</Text>
                </View>
              )}
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Progress
              </Text>
              {canRenderProgressChart ? (
                <ProgressChart loading={loading} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={{ color: colors.text }}>Progress chart component unavailable</Text>
                </View>
              )}
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Recordings
              </Text>
              {canRenderRecentRecordings ? (
                <RecentRecordings 
                  loading={loading} 
                  onRecordingPress={handleRecordingPress} 
                />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={{ color: colors.text }}>Recent recordings component unavailable</Text>
                </View>
              )}
            </View>
            
            <View style={styles.sectionContainer}>
              {canRenderDailyTip ? (
                <DailyTip />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={{ color: colors.text }}>Daily tip component unavailable</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      <RecordingDetailsModal
        visible={recordingModalVisible}
        onClose={() => setRecordingModalVisible(false)}
        recording={selectedRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallbackHeader: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 16,
  },
  quickCheckButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  quickCheckGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  quickCheckText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  placeholderContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});