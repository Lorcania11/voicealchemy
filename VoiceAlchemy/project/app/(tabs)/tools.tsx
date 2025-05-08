import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search, Lightbulb, Zap, BookOpen, Brain, History, SquareCheck as CheckSquare, Gauge, ChartBar as BarChart, ArrowUpRight, ChevronRight } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { useTheme } from '@/hooks/useTheme';
import ProgressBar from '@/components/common/ProgressBar';
import { LinearGradient } from 'expo-linear-gradient';
import LinguisticAnalysisModal from '@/components/modals/LinguisticAnalysisModal';
import SentenceReimaginedModal from '@/components/modals/SentenceReimaginedModal';
import EmotionalToneAnalyzer from '@/components/linguistic/EmotionalToneAnalyzer';
import MetaphorStorytellingTool from '@/components/linguistic/MetaphorStorytellingTool';
import IndustryLanguageSelector from '@/components/linguistic/IndustryLanguageSelector';
import FeedbackIntegration from '@/components/linguistic/FeedbackIntegration';
import RealTimeFeedback from '@/components/linguistic/RealTimeFeedback';
import MeetingPrepTool from '@/components/practice/MeetingPrepTool';

// Sample data for linguistic insights
const LINGUISTIC_INSIGHTS = {
  vocabularyRange: 78,
  clarityScore: 82,
  overusedWords: ['basically', 'actually', 'just', 'like'],
  improvementAreas: ['sentence complexity', 'transitional phrases', 'audience engagement'],
  recentProgress: [
    { date: 'Apr 14', score: 72 },
    { date: 'Apr 21', score: 75 },
    { date: 'Apr 28', score: 78 },
    { date: 'May 5', score: 82 },
  ]
};

// Sample data for recent recordings linguistic analysis
const ANALYZED_RECORDINGS = [
  {
    id: '1',
    title: 'Client Pitch - TechCorp',
    date: 'May 5, 2025',
    duration: '5:23',
    vocabularyScore: 84,
    clarityScore: 79,
    improvementSuggestions: 12
  },
  {
    id: '2',
    title: 'Team Presentation',
    date: 'May 3, 2025',
    duration: '7:45',
    vocabularyScore: 76,
    clarityScore: 81,
    improvementSuggestions: 8
  },
  {
    id: '3',
    title: 'Sales Call - InnovateInc',
    date: 'May 1, 2025',
    duration: '3:15',
    vocabularyScore: 82,
    clarityScore: 88,
    improvementSuggestions: 5
  }
];

// Sample data for linguistic optimization tools
const OPTIMIZATION_TOOLS = [
  {
    id: 'metaphor',
    title: 'Metaphor & Storytelling',
    description: 'Create powerful metaphors and stories for maximum impact',
    icon: BookOpen,
    color: '#3B82F6',
    progress: 0.78,
    component: MetaphorStorytellingTool
  },
  {
    id: 'industry',
    title: 'Industry Language',
    description: 'Specialized vocabulary for different industries',
    icon: Brain,
    color: '#8B5CF6',
    progress: 0.42,
    component: IndustryLanguageSelector
  },
  {
    id: 'emotional',
    title: 'Emotional Intelligence',
    description: 'Analyze and optimize emotional impact of language',
    icon: Lightbulb,
    color: '#F59E0B',
    progress: 0.65,
    component: EmotionalToneAnalyzer
  },
  {
    id: 'feedback',
    title: 'Feedback Integration',
    description: 'Collect and analyze listener feedback',
    icon: CheckSquare,
    color: '#10B981',
    progress: 0.29,
    component: FeedbackIntegration
  },
  {
    id: 'realtime',
    title: 'Real-Time Feedback',
    description: 'Receive discreet prompts during live conversations',
    icon: Zap,
    color: '#EC4899',
    progress: 0.53,
    component: RealTimeFeedback
  },
  {
    id: 'meeting',
    title: 'Meeting Preparation',
    description: 'Prepare linguistically for upcoming meetings',
    icon: Brain,
    color: '#6366F1',
    progress: 0.37,
    component: MeetingPrepTool
  },
];

export default function ToolsScreen() {
  const { colors, isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showSentenceModal, setShowSentenceModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleAnalyzePress = () => {
    setShowAnalysisModal(true);
  };

  const handleRecordingPress = (recording) => {
    setSelectedRecording(recording);
    setRecordingModalVisible(true);
  };
  
  const handleToolPress = (tool) => {
    setSelectedTool(tool);
    if (tool.id === 'sentence') {
      setShowSentenceModal(true);
    } else {
      // In a real app, this would navigate to the tool screen
      // For this demo, we'll just set the selected tool
    }
  };

  const renderToolItem = (item, index) => {
    const Icon = item.icon;
    
    return (
      <Pressable 
        key={item.id}
        style={[styles.toolCard, { backgroundColor: colors.card }]}
        onPress={() => handleToolPress(item)}
      >
        <View style={styles.toolHeader}>
          <View 
            style={[
              styles.toolIconContainer, 
              { backgroundColor: `${item.color}20` /* 20% opacity */ }
            ]}
          >
            <Icon size={22} color={item.color} />
          </View>
          
          <View style={styles.toolProgressContainer}>
            <ProgressBar 
              progress={item.progress} 
              height={5}
              progressColor={item.color}
              backgroundColor={colors.backgroundSecondary}
            />
            <Text style={[styles.toolProgressText, { color: colors.textTertiary }]}>
              {Math.round(item.progress * 100)}% complete
            </Text>
          </View>
        </View>
        
        <Text style={[styles.toolTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        
        <Text style={[styles.toolDescription, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
      </Pressable>
    );
  };

  const renderRecordingItem = (item) => {
    return (
      <Pressable 
        key={item.id}
        style={[styles.recordingCard, { backgroundColor: colors.card }]}
        onPress={() => handleRecordingPress(item)}
      >
        <View style={styles.recordingInfo}>
          <Text style={[styles.recordingTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          
          <View style={styles.recordingMeta}>
            <Text style={[styles.recordingDate, { color: colors.textSecondary }]}>
              {item.date}
            </Text>
            <Text style={[styles.recordingDuration, { color: colors.textSecondary }]}>
              {item.duration}
            </Text>
          </View>
        </View>
        
        <View style={styles.recordingScores}>
          <View style={styles.scoreItem}>
            <Text style={[styles.scoreLabel, { color: colors.textTertiary }]}>Vocabulary</Text>
            <Text style={[styles.scoreValue, { color: colors.text }]}>{item.vocabularyScore}</Text>
          </View>
          
          <View style={styles.scoreItem}>
            <Text style={[styles.scoreLabel, { color: colors.textTertiary }]}>Clarity</Text>
            <Text style={[styles.scoreValue, { color: colors.text }]}>{item.clarityScore}</Text>
          </View>
          
          <View style={styles.suggestionsBadge}>
            <Text style={styles.suggestionsValue}>{item.improvementSuggestions}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header title="AI Lab+" />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Linguistic Insights Card */}
            <View style={[styles.insightsCard, { backgroundColor: colors.card }]}>
              <View style={styles.insightsHeader}>
                <View>
                  <Text style={[styles.insightsTitle, { color: colors.text }]}>
                    Your Linguistic Profile
                  </Text>
                  <Text style={[styles.insightsSubtitle, { color: colors.textSecondary }]}>
                    Based on your recent recordings
                  </Text>
                </View>
                
                <Pressable
                  style={[styles.analyzeButton, { backgroundColor: colors.primary }]}
                  onPress={handleAnalyzePress}
                >
                  <Text style={styles.analyzeButtonText}>Analyze</Text>
                </Pressable>
              </View>
              
              <View style={styles.insightsRow}>
                <View style={styles.insightColumn}>
                  <View 
                    style={[
                      styles.insightMetricContainer, 
                      { backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)' }
                    ]}
                  >
                    <View style={styles.insightMetricHeader}>
                      <Text style={[styles.insightMetricLabel, { color: colors.textSecondary }]}>
                        Vocabulary Range
                      </Text>
                      <Pressable onPress={() => Alert.alert("Vocabulary Analysis", "This would show a detailed breakdown of your vocabulary usage, complexity levels, and personalized expansion recommendations.")}>
                        <ChevronRight size={16} color={colors.textTertiary} />
                      </Pressable>
                    </View>
                    
                    <View style={styles.insightMetricValue}>
                      <Text style={[styles.insightMetricNumber, { color: '#3B82F6' }]}>
                        {LINGUISTIC_INSIGHTS.vocabularyRange}
                      </Text>
                      <Text style={[styles.insightMetricUnit, { color: colors.textSecondary }]}>
                        /100
                      </Text>
                    </View>
                    
                    <ProgressBar 
                      progress={LINGUISTIC_INSIGHTS.vocabularyRange / 100} 
                      height={4}
                      progressColor='#3B82F6'
                    />
                  </View>
                  
                  <View 
                    style={[
                      styles.insightMetricContainer, 
                      { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)' }
                    ]}
                  >
                    <View style={styles.insightMetricHeader}>
                      <Text style={[styles.insightMetricLabel, { color: colors.textSecondary }]}>
                        Clarity Score
                      </Text>
                      <ChevronRight size={16} color={colors.textTertiary} />
                    </View>
                    
                    <View style={styles.insightMetricValue}>
                      <Text style={[styles.insightMetricNumber, { color: '#10B981' }]}>
                        {LINGUISTIC_INSIGHTS.clarityScore}
                      </Text>
                      <Text style={[styles.insightMetricUnit, { color: colors.textSecondary }]}>
                        /100
                      </Text>
                    </View>
                    
                    <ProgressBar 
                      progress={LINGUISTIC_INSIGHTS.clarityScore / 100} 
                      height={4}
                      progressColor='#10B981'
                    />
                  </View>
                </View>
                
                <View style={styles.insightColumn}>
                  <View 
                    style={[
                      styles.insightListContainer, 
                      { backgroundColor: isDark ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.08)' }
                    ]}
                  >
                    <Text style={[styles.insightListTitle, { color: colors.textSecondary }]}>
                      Frequently Overused Words
                    </Text>
                    
                    <View style={styles.wordTags}>
                      {LINGUISTIC_INSIGHTS.overusedWords.map((word, index) => (
                        <View 
                          key={index} 
                          style={[
                            styles.wordTag, 
                            { backgroundColor: colors.card }
                          ]}
                        >
                          <Text style={[styles.wordTagText, { color: '#EC4899' }]}>
                            {word}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  <View 
                    style={[
                      styles.insightListContainer, 
                      { backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)' }
                    ]}
                  >
                    <Text style={[styles.insightListTitle, { color: colors.textSecondary }]}>
                      Focus Improvement Areas
                    </Text>
                    
                    <View style={styles.areasList}>
                      {LINGUISTIC_INSIGHTS.improvementAreas.map((area, index) => (
                        <Text 
                          key={index} 
                          style={[styles.areaItem, { color: colors.text }]}
                        >
                          • {area}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Optimization Tools Section */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                🧠Knowledge Hub
              </Text>
              <Pressable 
                style={styles.viewAllButton}
                onPress={() => Alert.alert("All Tools", "This would open a comprehensive list of all linguistic optimization tools available in the app.")}
              >
                <Text style={[styles.viewAllText, { color: colors.primary }]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.primary} />
              </Pressable>
            </View>
            
            <View style={styles.toolsGrid}>
              {OPTIMIZATION_TOOLS.map(renderToolItem)}
            </View>
            
            {/* Recent Recordings Analysis */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Recordings Analysis
              </Text>
            </View>
            
            <View style={styles.recordingsContainer}>
              {ANALYZED_RECORDINGS.map(renderRecordingItem)}
            </View>
            
            {/* Daily Challenge */}
            <View style={[styles.challengeCard, { backgroundColor: colors.card }]}>
              <LinearGradient
                colors={['#3B82F6', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.challengeGradient}
              >
                <View style={styles.challengeHeader}>
                  <Zap size={24} color="white" />
                  <Text style={styles.challengeTitle}>
                    Daily Vocabulary Challenge
                  </Text>
                </View>
                
                <Text style={styles.challengeDescription}>
                  Replace common words with more precise, impactful alternatives in your next presentation.
                </Text>
                
                <Pressable 
                  style={styles.challengeButton}
                  onPress={() => Alert.alert("Daily Challenge", "This would start your daily vocabulary challenge with personalized word replacements.")}
                >
                  <Text style={styles.challengeButtonText}>
                    Start Challenge
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      <LinguisticAnalysisModal
        visible={showAnalysisModal}
        onClose={() => {
          setShowAnalysisModal(false);
          setSelectedRecording(null);
        }}
        recording={selectedRecording}
      />
      
      <SentenceReimaginedModal
        visible={showSentenceModal}
        onClose={() => setShowSentenceModal(false)}
      />
      
      {selectedTool && selectedTool.component && (
        <View style={[
          StyleSheet.absoluteFill, 
          { backgroundColor: colors.background, zIndex: 100 }
        ]}>
          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <View style={styles.selectedToolHeader}>
              <Pressable 
                style={[styles.backButton, { backgroundColor: colors.card }]}
                onPress={() => setSelectedTool(null)}
              >
                <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
              </Pressable>
              <Text style={[styles.selectedToolTitle, { color: colors.text }]}>
                {selectedTool.title}
              </Text>
              <View style={{ width: 60 }} />
            </View>
            
            <ScrollView style={{ flex: 1 }}>
              {React.createElement(selectedTool.component)}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
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
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  insightsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  insightsSubtitle: {
    fontSize: 14,
  },
  analyzeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  analyzeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  insightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insightColumn: {
    width: '48%',
  },
  insightMetricContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  insightMetricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightMetricLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  insightMetricValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  insightMetricNumber: {
    fontSize: 22,
    fontWeight: '700',
  },
  insightMetricUnit: {
    fontSize: 14,
    marginLeft: 2,
  },
  insightListContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  insightListTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  wordTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  wordTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  areasList: {
  },
  areaItem: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  toolCard: {
    width: '48%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  toolHeader: {
    marginBottom: 12,
  },
  toolIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  toolProgressContainer: {
    marginTop: 4,
  },
  toolProgressText: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  toolDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  recordingsContainer: {
    marginBottom: 24,
  },
  recordingCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordingInfo: {
    flex: 1,
    marginRight: 10,
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordingMeta: {
    flexDirection: 'row',
  },
  recordingDate: {
    fontSize: 12,
    marginRight: 8,
  },
  recordingDuration: {
    fontSize: 12,
  },
  recordingScores: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreItem: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  scoreLabel: {
    fontSize: 11,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  suggestionsBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  suggestionsValue: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  challengeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  challengeGradient: {
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  challengeDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  challengeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  selectedToolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    fontWeight: '600',
  },
  selectedToolTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});