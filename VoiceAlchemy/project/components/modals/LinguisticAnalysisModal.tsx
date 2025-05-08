import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Mic, BookOpen, Lightbulb, ArrowUpRight, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

interface LinguisticAnalysisModalProps {
  visible: boolean;
  onClose: () => void;
  recording?: any;
}

// Sample data - in a real app, this would come from NLP analysis
const SAMPLE_ANALYSIS = {
  overallScore: 78,
  metrics: [
    { id: 'vocabulary', label: 'Vocabulary Range', score: 82, color: '#3B82F6' },
    { id: 'clarity', label: 'Clarity Score', score: 75, color: '#10B981' },
    { id: 'fillers', label: 'Filler Words', score: 65, color: '#F59E0B' },
    { id: 'pace', label: 'Speech Pacing', score: 88, color: '#8B5CF6' },
    { id: 'complexity', label: 'Sentence Complexity', score: 82, color: '#EC4899' },
  ],
  improvements: [
    {
      type: 'vocabulary',
      original: "We need to make sure we get this done ASAP.",
      suggestion: "We need to ensure this is completed by tomorrow.",
      reason: "More precise timing instead of ambiguous urgency",
      severity: 'medium',
    },
    {
      type: 'fillers',
      original: "So, basically, we're just going to, you know, implement the new system.",
      suggestion: "We're going to implement the new system.",
      reason: "Removed unnecessary filler words",
      severity: 'high',
    },
    {
      type: 'clarity',
      original: "The thing about our approach is it's got a lot of different aspects to it.",
      suggestion: "Our approach has three key components: research, development, and testing.",
      reason: "Replaced vague description with specific details",
      severity: 'high',
    },
    {
      type: 'complexity',
      original: "The project will be done when we finish it.",
      suggestion: "We'll complete the project by the end of Q3, with key milestones in July and August.",
      reason: "Added specific timeline and milestones",
      severity: 'medium',
    },
  ],
  patterns: [
    { 
      pattern: "Frequent use of 'basically'", 
      occurrences: 8,
      recommendation: "Remove this filler word to sound more confident" 
    },
    { 
      pattern: "Sentences often begin with 'So'", 
      occurrences: 12,
      recommendation: "Vary your sentence starters for more engaging speech" 
    },
    { 
      pattern: "Overuse of passive voice", 
      occurrences: 7,
      recommendation: "Use active voice for more direct and impactful statements" 
    },
  ],
  recommendations: [
    "Practice using more precise terminology when discussing timelines",
    "Record and listen to yourself to identify filler words",
    "Prepare specific examples before important discussions",
    "Structure complex ideas into clear, numbered points"
  ]
};

export default function LinguisticAnalysisModal({
  visible,
  onClose,
  recording
}: LinguisticAnalysisModalProps) {
  const { colors, isDark } = useTheme();
  const [analysisData, setAnalysisData] = useState(SAMPLE_ANALYSIS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('improvements');

  useEffect(() => {
    if (visible) {
      // Simulate loading analysis data
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        // If we have a specific recording, we could customize the analysis data here
        if (recording) {
          // Just simulate this for now
          setAnalysisData({
            ...SAMPLE_ANALYSIS,
            overallScore: recording.vocabularyScore || SAMPLE_ANALYSIS.overallScore
          });
        } else {
          setAnalysisData(SAMPLE_ANALYSIS);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, recording]);

  const renderMetricBar = ({ id, label, score, color }) => {
    return (
      <View key={id} style={styles.metricContainer}>
        <View style={styles.metricHeader}>
          <Text style={[styles.metricLabel, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.metricScore, { color }]}>{score}/100</Text>
        </View>
        <ProgressBar 
          progress={score / 100} 
          height={6}
          progressColor={color}
          backgroundColor={colors.backgroundSecondary}
        />
      </View>
    );
  };

  const renderTabButton = (id, label) => {
    const isActive = activeTab === id;
    
    return (
      <Pressable
        style={[
          styles.tabButton,
          isActive && styles.tabButtonActive,
          { 
            backgroundColor: isActive ? colors.primary : colors.card,
            borderColor: colors.border
          }
        ]}
        onPress={() => setActiveTab(id)}
      >
        <Text 
          style={[
            styles.tabButtonText,
            { color: isActive ? 'white' : colors.text }
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'high':
        return <XCircle size={16} color="#EF4444" />;
      case 'medium':
        return <AlertCircle size={16} color="#F59E0B" />;
      default:
        return <CheckCircle size={16} color="#10B981" />;
    }
  };

  const renderImprovementItem = (item, index) => {
    return (
      <View 
        key={index} 
        style={[styles.improvementItem, { backgroundColor: colors.backgroundSecondary }]}
      >
        <View style={styles.improvementHeader}>
          <View style={styles.severityIndicator}>
            {getSeverityIcon(item.severity)}
            <Text 
              style={[
                styles.improvementType, 
                { 
                  color: item.severity === 'high' ? '#EF4444' : 
                         item.severity === 'medium' ? '#F59E0B' : '#10B981' 
                }
              ]}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={[styles.originalText, { backgroundColor: colors.card }]}>
          <Text style={[styles.originalTextContent, { color: colors.textSecondary }]}>
            "{item.original}"
          </Text>
        </View>
        
        <View style={styles.suggestionArrow}>
          <ArrowUpRight size={16} color={colors.primary} />
        </View>
        
        <View style={[styles.suggestedText, { backgroundColor: `${colors.primary}15` }]}>
          <Text style={[styles.suggestedTextContent, { color: colors.text }]}>
            "{item.suggestion}"
          </Text>
        </View>
        
        <View style={styles.reasonContainer}>
          <Text style={[styles.reasonText, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>Why: </Text>
            {item.reason}
          </Text>
        </View>
      </View>
    );
  };

  const renderPatternItem = (item, index) => {
    return (
      <View 
        key={index} 
        style={[styles.patternItem, { backgroundColor: colors.backgroundSecondary }]}
      >
        <View style={styles.patternHeader}>
          <Text style={[styles.patternTitle, { color: colors.text }]}>
            {item.pattern}
          </Text>
          <View style={[styles.occurrencesBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.occurrencesText}>{item.occurrences}×</Text>
          </View>
        </View>
        
        <Text style={[styles.patternRecommendation, { color: colors.textSecondary }]}>
          {item.recommendation}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {recording ? `Analysis: ${recording.title}` : 'Linguistic Analysis'}
            </Text>
            <Pressable 
              style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={onClose}
            >
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                Analyzing linguistic patterns...
              </Text>
              <View style={[styles.loadingBar, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={[styles.loadingProgress, { backgroundColor: colors.primary, width: '60%' }]} />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.scoreContainer}>
                <View style={[styles.scoreCircle, { borderColor: colors.primary }]}>
                  <Text style={[styles.scoreValue, { color: colors.primary }]}>
                    {analysisData.overallScore}
                  </Text>
                  <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
                    Overall
                  </Text>
                </View>
                
                <View style={styles.metricsContainer}>
                  {analysisData.metrics.slice(0, 3).map(renderMetricBar)}
                </View>
              </View>
              
              <View style={styles.tabsContainer}>
                {renderTabButton('improvements', 'Improvements')}
                {renderTabButton('patterns', 'Patterns')}
                {renderTabButton('recommendations', 'Recommendations')}
              </View>
              
              <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {activeTab === 'improvements' && (
                  <View style={styles.improvementsContainer}>
                    {analysisData.improvements.map(renderImprovementItem)}
                  </View>
                )}
                
                {activeTab === 'patterns' && (
                  <View style={styles.patternsContainer}>
                    {analysisData.patterns.map(renderPatternItem)}
                  </View>
                )}
                
                {activeTab === 'recommendations' && (
                  <View style={styles.recommendationsContainer}>
                    {analysisData.recommendations.map((rec, index) => (
                      <View key={index} style={[styles.recommendationItem, { backgroundColor: colors.backgroundSecondary }]}>
                        <Lightbulb size={18} color={colors.primary} style={styles.recommendationIcon} />
                        <Text style={[styles.recommendationText, { color: colors.text }]}>
                          {rec}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>
              
              <View style={styles.actionsContainer}>
                <Pressable 
                  style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
                  onPress={() => {
                    onClose();
                    setTimeout(() => {
                      alert("This would generate a full PDF report of the linguistic analysis with detailed insights and actionable recommendations.");
                    }, 500);
                  }}
                >
                  <Text style={[styles.actionButtonText, { color: colors.text }]}>Generate Report</Text>
                </Pressable>
                
                <Pressable 
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                  onPress={onClose}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginBottom: 16,
  },
  loadingBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    borderRadius: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 12,
  },
  metricsContainer: {
    flex: 1,
  },
  metricContainer: {
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  tabButtonActive: {
    borderWidth: 0,
  },
  tabButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  improvementsContainer: {
    marginBottom: 16,
  },
  improvementItem: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
  },
  improvementHeader: {
    marginBottom: 8,
  },
  severityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  improvementType: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  originalText: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  originalTextContent: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  suggestionArrow: {
    alignSelf: 'center',
    marginVertical: 4,
  },
  suggestedText: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestedTextContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  reasonContainer: {
    paddingHorizontal: 4,
  },
  reasonText: {
    fontSize: 12,
  },
  patternsContainer: {
    marginBottom: 16,
  },
  patternItem: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
  },
  patternHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patternTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  occurrencesBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  occurrencesText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  patternRecommendation: {
    fontSize: 14,
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationItem: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontWeight: '500',
    fontSize: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});