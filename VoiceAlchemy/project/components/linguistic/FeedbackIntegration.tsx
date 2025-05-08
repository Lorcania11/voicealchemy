import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { MessageSquare, BarChart, Star, Users, SquarePen, Smile, Frown, Meh, ArrowRight, Send, Check, X, XCircle, Info } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Sample feedback data
const SAMPLE_FEEDBACK = [
  {
    id: '1',
    source: 'Client Meeting: Acme Corp',
    date: 'Yesterday',
    rating: 4,
    comments: 'Your explanation of the implementation timeline was very clear and addressed our concerns. The technical details were well-presented without being overwhelming.',
    areas: ['Clarity', 'Technical Communication'],
    analyzed: true,
    insights: [
      { type: 'strength', text: 'Clear technical explanations' },
      { type: 'strength', text: 'Effective timeline communication' },
      { type: 'action', text: 'Continue using concrete examples' },
    ]
  },
  {
    id: '2',
    source: 'Team Presentation',
    date: '3 days ago',
    rating: 3,
    comments: 'The presentation was informative but could have been more concise. Some points were repeated unnecessarily which made it run longer than scheduled.',
    areas: ['Conciseness', 'Time Management'],
    analyzed: true,
    insights: [
      { type: 'weakness', text: 'Redundancy in explanation' },
      { type: 'weakness', text: 'Time management issues' },
      { type: 'action', text: 'Practice more focused delivery' },
    ]
  },
  {
    id: '3',
    source: 'Sales Call: GlobeTech Inc',
    date: '1 week ago',
    rating: 5,
    comments: 'Excellent presentation of our solution. You addressed all objections professionally and your examples were very relevant to our industry.',
    areas: ['Objection Handling', 'Industry Knowledge'],
    analyzed: true,
    insights: [
      { type: 'strength', text: 'Effective objection handling' },
      { type: 'strength', text: 'Strong industry-specific examples' },
      { type: 'action', text: 'Share techniques with the team' },
    ]
  },
];

// Sample feedback request templates
const FEEDBACK_TEMPLATES = [
  {
    id: '1',
    title: 'Quick Clarity Check',
    description: 'A brief assessment of how clear and understandable your communication was',
    questions: [
      'How clear was my explanation of the main concepts?',
      'Were there any parts of my presentation that could have been more understandable?',
      'Did I effectively answer your questions?'
    ]
  },
  {
    id: '2',
    title: 'Comprehensive Communication Review',
    description: 'In-depth feedback on all aspects of your communication effectiveness',
    questions: [
      'How would you rate the clarity of my explanation (1-5)?',
      'Was my pace appropriate for the content?',
      'Did I use terminology that was accessible and clear?',
      'How effective were my examples and analogies?',
      'In what specific ways could I improve my communication?',
      'What aspects of my communication style worked well?'
    ]
  },
  {
    id: '3',
    title: 'Presentation Impact Assessment',
    description: 'Focused feedback on the persuasiveness and impact of your presentation',
    questions: [
      'How compelling did you find the key points of my presentation?',
      'Did the structure of my presentation make the information easy to follow?',
      'Which parts of the presentation were most impactful?',
      'Were there points that needed more support or evidence?',
      'How convincing was my handling of questions or objections?'
    ]
  },
];

// Sample communication metrics
const COMMUNICATION_METRICS = {
  clarity: {
    current: 4.2,
    trend: +0.3,
    description: 'How clearly your message is understood'
  },
  impact: {
    current: 3.8,
    trend: +0.5,
    description: 'How memorable and influential your communication is'
  },
  engagement: {
    current: 4.0,
    trend: +0.2,
    description: 'How well you maintain audience interest'
  },
  accessibility: {
    current: 4.5,
    trend: +0.1,
    description: 'How understandable your language is to diverse audiences'
  },
};

interface FeedbackIntegrationProps {
  onRequestFeedback?: (templateId: string, recipients: string[]) => void;
}

export default function FeedbackIntegration({ onRequestFeedback }: FeedbackIntegrationProps) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('collect'); // 'collect', 'analyze', 'improve'
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [recipientInput, setRecipientInput] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  
  const handleAddRecipient = () => {
    if (!recipientInput.trim() || recipients.includes(recipientInput.trim())) {
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientInput.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    setRecipients([...recipients, recipientInput.trim()]);
    setRecipientInput('');
  };
  
  const handleRemoveRecipient = (email) => {
    setRecipients(recipients.filter(r => r !== email));
  };
  
  const handleSendFeedbackRequest = () => {
    if (!selectedTemplate) {
      Alert.alert('Select Template', 'Please select a feedback template first');
      return;
    }
    
    if (recipients.length === 0) {
      Alert.alert('Add Recipients', 'Please add at least one recipient');
      return;
    }
    
    if (onRequestFeedback) {
      onRequestFeedback(selectedTemplate, recipients);
    } else {
      Alert.alert(
        'Feedback Request Sent',
        `Your feedback request has been sent to ${recipients.length} recipient(s).`,
        [{ text: 'OK' }]
      );
    }
    
    // Reset the form
    setSelectedTemplate(null);
    setRecipients([]);
    setCustomMessage('');
  };
  
  const handleViewDetails = (feedback) => {
    Alert.alert(
      'Feedback Details',
      `This would open a detailed view of feedback from "${feedback.source}" with linguistic insights and action recommendations.`
    );
  };
  
  const renderFeedbackTemplate = (template) => {
    const isSelected = selectedTemplate === template.id;
    
    return (
      <Pressable
        key={template.id}
        style={[
          styles.templateCard,
          isSelected && styles.templateCardSelected,
          { 
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
          }
        ]}
        onPress={() => setSelectedTemplate(template.id)}
      >
        <View style={styles.templateHeader}>
          <Text style={[styles.templateTitle, { color: colors.text }]}>
            {template.title}
          </Text>
          {isSelected && (
            <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.selectedBadgeText}>Selected</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.templateDescription, { color: colors.textSecondary }]}>
          {template.description}
        </Text>
        
        <View style={styles.questionCount}>
          <MessageSquare size={14} color={colors.textTertiary} />
          <Text style={[styles.questionCountText, { color: colors.textTertiary }]}>
            {template.questions.length} questions
          </Text>
        </View>
      </Pressable>
    );
  };
  
  const renderFeedbackItem = (feedback) => {
    // Determine rating icon and color
    let RatingIcon;
    let ratingColor;
    
    if (feedback.rating >= 4) {
      RatingIcon = Smile;
      ratingColor = '#10B981'; // success green
    } else if (feedback.rating <= 2) {
      RatingIcon = Frown;
      ratingColor = '#EF4444'; // error red
    } else {
      RatingIcon = Meh;
      ratingColor = '#F59E0B'; // warning yellow
    }
    
    return (
      <View
        key={feedback.id}
        style={[styles.feedbackItem, { backgroundColor: colors.card }]}
      >
        <View style={styles.feedbackHeader}>
          <Text style={[styles.feedbackSource, { color: colors.text }]}>
            {feedback.source}
          </Text>
          <Text style={[styles.feedbackDate, { color: colors.textTertiary }]}>
            {feedback.date}
          </Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <RatingIcon size={18} color={ratingColor} />
          <Text style={[styles.ratingText, { color: ratingColor }]}>
            {feedback.rating}/5
          </Text>
        </View>
        
        <Text style={[styles.feedbackComments, { color: colors.textSecondary }]}>
          "{feedback.comments}"
        </Text>
        
        <View style={styles.feedbackAreas}>
          {feedback.areas.map((area, index) => (
            <View 
              key={index}
              style={[styles.areaTag, { backgroundColor: colors.backgroundSecondary }]}
            >
              <Text style={[styles.areaTagText, { color: colors.text }]}>
                {area}
              </Text>
            </View>
          ))}
        </View>
        
        {feedback.analyzed && (
          <View style={[styles.insightsContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[styles.insightsTitle, { color: colors.text }]}>
              Communication Insights:
            </Text>
            
            {feedback.insights.map((insight, index) => {
              let InsightIcon;
              let insightColor;
              
              if (insight.type === 'strength') {
                InsightIcon = Check;
                insightColor = '#10B981';
              } else if (insight.type === 'weakness') {
                InsightIcon = X;
                insightColor = '#EF4444';
              } else {
                InsightIcon = Info;
                insightColor = '#3B82F6';
              }
              
              return (
                <View 
                  key={index}
                  style={styles.insightItem}
                >
                  <InsightIcon size={14} color={insightColor} style={styles.insightIcon} />
                  <Text style={[styles.insightText, { color: colors.textSecondary }]}>
                    {insight.text}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        
        <Pressable
          style={styles.viewDetailsButton}
          onPress={() => handleViewDetails(feedback)}
        >
          <Text style={[styles.viewDetailsText, { color: colors.primary }]}>
            View Details
          </Text>
          <ArrowRight size={16} color={colors.primary} />
        </Pressable>
      </View>
    );
  };
  
  const renderMetricsSection = () => {
    return (
      <View style={styles.metricsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Communication Metrics
          </Text>
          <Pressable onPress={() => Alert.alert('Metrics Details', 'This would open a detailed view of your communication metrics over time.')}>
            <BarChart size={20} color={colors.primary} />
          </Pressable>
        </View>
        
        <View style={[styles.metricsCard, { backgroundColor: colors.card }]}>
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Text style={[styles.metricName, { color: colors.text }]}>Clarity</Text>
              <Text style={[styles.metricDescription, { color: colors.textSecondary }]}>
                {COMMUNICATION_METRICS.clarity.description}
              </Text>
            </View>
            
            <View style={styles.metricValue}>
              <Text style={[styles.metricScore, { color: colors.text }]}>
                {COMMUNICATION_METRICS.clarity.current}
              </Text>
              <View style={styles.metricTrend}>
                <ArrowRight 
                  size={14} 
                  color={COMMUNICATION_METRICS.clarity.trend > 0 ? '#10B981' : '#EF4444'} 
                  style={{ 
                    transform: [{ rotate: COMMUNICATION_METRICS.clarity.trend > 0 ? '45deg' : '-45deg' }] 
                  }} 
                />
                <Text 
                  style={{ 
                    color: COMMUNICATION_METRICS.clarity.trend > 0 ? '#10B981' : '#EF4444',
                    fontWeight: '500',
                    fontSize: 12
                  }}
                >
                  {Math.abs(COMMUNICATION_METRICS.clarity.trend).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Text style={[styles.metricName, { color: colors.text }]}>Impact</Text>
              <Text style={[styles.metricDescription, { color: colors.textSecondary }]}>
                {COMMUNICATION_METRICS.impact.description}
              </Text>
            </View>
            
            <View style={styles.metricValue}>
              <Text style={[styles.metricScore, { color: colors.text }]}>
                {COMMUNICATION_METRICS.impact.current}
              </Text>
              <View style={styles.metricTrend}>
                <ArrowRight 
                  size={14} 
                  color={COMMUNICATION_METRICS.impact.trend > 0 ? '#10B981' : '#EF4444'} 
                  style={{ 
                    transform: [{ rotate: COMMUNICATION_METRICS.impact.trend > 0 ? '45deg' : '-45deg' }] 
                  }} 
                />
                <Text 
                  style={{ 
                    color: COMMUNICATION_METRICS.impact.trend > 0 ? '#10B981' : '#EF4444',
                    fontWeight: '500',
                    fontSize: 12
                  }}
                >
                  {Math.abs(COMMUNICATION_METRICS.impact.trend).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Text style={[styles.metricName, { color: colors.text }]}>Engagement</Text>
              <Text style={[styles.metricDescription, { color: colors.textSecondary }]}>
                {COMMUNICATION_METRICS.engagement.description}
              </Text>
            </View>
            
            <View style={styles.metricValue}>
              <Text style={[styles.metricScore, { color: colors.text }]}>
                {COMMUNICATION_METRICS.engagement.current}
              </Text>
              <View style={styles.metricTrend}>
                <ArrowRight 
                  size={14} 
                  color={COMMUNICATION_METRICS.engagement.trend > 0 ? '#10B981' : '#EF4444'} 
                  style={{ 
                    transform: [{ rotate: COMMUNICATION_METRICS.engagement.trend > 0 ? '45deg' : '-45deg' }] 
                  }} 
                />
                <Text 
                  style={{ 
                    color: COMMUNICATION_METRICS.engagement.trend > 0 ? '#10B981' : '#EF4444',
                    fontWeight: '500',
                    fontSize: 12
                  }}
                >
                  {Math.abs(COMMUNICATION_METRICS.engagement.trend).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.metricRowLast}>
            <View style={styles.metricInfo}>
              <Text style={[styles.metricName, { color: colors.text }]}>Accessibility</Text>
              <Text style={[styles.metricDescription, { color: colors.textSecondary }]}>
                {COMMUNICATION_METRICS.accessibility.description}
              </Text>
            </View>
            
            <View style={styles.metricValue}>
              <Text style={[styles.metricScore, { color: colors.text }]}>
                {COMMUNICATION_METRICS.accessibility.current}
              </Text>
              <View style={styles.metricTrend}>
                <ArrowRight 
                  size={14} 
                  color={COMMUNICATION_METRICS.accessibility.trend > 0 ? '#10B981' : '#EF4444'} 
                  style={{ 
                    transform: [{ rotate: COMMUNICATION_METRICS.accessibility.trend > 0 ? '45deg' : '-45deg' }] 
                  }} 
                />
                <Text 
                  style={{ 
                    color: COMMUNICATION_METRICS.accessibility.trend > 0 ? '#10B981' : '#EF4444',
                    fontWeight: '500',
                    fontSize: 12
                  }}
                >
                  {Math.abs(COMMUNICATION_METRICS.accessibility.trend).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  const renderTabButton = (id, label, icon) => {
    const Icon = icon;
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
        <Icon size={16} color={isActive ? 'white' : colors.text} />
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

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Feedback Integration
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Collect, analyze, and act on listener feedback to continuously improve your communication clarity
      </Text>
      
      <View style={styles.tabsContainer}>
        {renderTabButton('collect', 'Collect', MessageSquare)}
        {renderTabButton('analyze', 'Analyze', BarChart)}
        {renderTabButton('improve', 'Improve', Star)}
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {activeTab === 'collect' && (
          <View style={styles.collectTab}>
            <Text style={[styles.tabTitle, { color: colors.text }]}>
              Request Feedback
            </Text>
            
            <Text style={[styles.tabDescription, { color: colors.textSecondary }]}>
              Select a template and specify recipients to request focused feedback on your communication
            </Text>
            
            <View style={styles.templatesContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Feedback Templates
              </Text>
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.templatesList}
              >
                {FEEDBACK_TEMPLATES.map(renderFeedbackTemplate)}
              </ScrollView>
            </View>
            
            <View style={styles.recipientsContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recipients
              </Text>
              
              <View style={styles.recipientsInputContainer}>
                <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary }]}>
                  <Users size={16} color={colors.textTertiary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter email address"
                    placeholderTextColor={colors.textTertiary}
                    value={recipientInput}
                    onChangeText={setRecipientInput}
                    onSubmitEditing={handleAddRecipient}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                
                <Pressable
                  style={[styles.addButton, { backgroundColor: colors.primary }]}
                  onPress={handleAddRecipient}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
              </View>
              
              <View style={styles.recipientsList}>
                {recipients.map((email, index) => (
                  <View 
                    key={index}
                    style={[styles.recipientChip, { backgroundColor: colors.backgroundSecondary }]}
                  >
                    <Text style={[styles.recipientEmail, { color: colors.text }]}>
                      {email}
                    </Text>
                    <Pressable
                      style={styles.removeRecipient}
                      onPress={() => handleRemoveRecipient(email)}
                    >
                      <XCircle size={16} color={colors.textTertiary} />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.customMessageContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Custom Message (Optional)
              </Text>
              
              <TextInput
                style={[
                  styles.messageInput, 
                  { 
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Add a personal message to your feedback request..."
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={customMessage}
                onChangeText={setCustomMessage}
              />
            </View>
            
            <Pressable 
              style={[
                styles.sendButton, 
                { 
                  backgroundColor: 
                    selectedTemplate && recipients.length > 0 
                      ? colors.primary 
                      : colors.backgroundSecondary,
                  opacity: 
                    selectedTemplate && recipients.length > 0 
                      ? 1 
                      : 0.7
                }
              ]}
              onPress={handleSendFeedbackRequest}
              disabled={!selectedTemplate || recipients.length === 0}
            >
              <Send size={18} color="white" style={styles.sendIcon} />
              <Text style={styles.sendButtonText}>
                Send Feedback Request
              </Text>
            </Pressable>
          </View>
        )}
        
        {activeTab === 'analyze' && (
          <View style={styles.analyzeTab}>
            <Text style={[styles.tabTitle, { color: colors.text }]}>
              Analyze Feedback
            </Text>
            
            <Text style={[styles.tabDescription, { color: colors.textSecondary }]}>
              Review and gain insights from the feedback you've received
            </Text>
            
            <View style={styles.feedbackList}>
              {SAMPLE_FEEDBACK.map(renderFeedbackItem)}
            </View>
          </View>
        )}
        
        {activeTab === 'improve' && (
          <View style={styles.improveTab}>
            <Text style={[styles.tabTitle, { color: colors.text }]}>
              Improvement Insights
            </Text>
            
            <Text style={[styles.tabDescription, { color: colors.textSecondary }]}>
              Track your communication metrics and apply insights to improve
            </Text>
            
            {renderMetricsSection()}
            
            <View style={styles.suggestionsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Personalized Recommendations
              </Text>
              
              <View style={[styles.recommendationCard, { backgroundColor: colors.card }]}>
                <View style={styles.recommendationHeader}>
                  <Star size={18} color="#F59E0B" />
                  <Text style={[styles.recommendationTitle, { color: colors.text }]}>
                    Top Recommendations
                  </Text>
                </View>
                
                <View style={styles.recommendationItems}>
                  <View style={styles.recommendationItem}>
                    <Check size={16} color="#10B981" style={styles.recommendationIcon} />
                    <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
                      Continue using concrete, specific examples in technical explanations
                    </Text>
                  </View>
                  
                  <View style={styles.recommendationItem}>
                    <X size={16} color="#EF4444" style={styles.recommendationIcon} />
                    <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
                      Reduce repetition in explanations to improve conciseness
                    </Text>
                  </View>
                  
                  <View style={styles.recommendationItem}>
                    <Info size={16} color="#3B82F6" style={styles.recommendationIcon} />
                    <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
                      Practice formulating more concise answers to common questions
                    </Text>
                  </View>
                </View>
                
                <Pressable 
                  style={[
                    styles.suggestedExercise, 
                    { backgroundColor: colors.backgroundSecondary }
                  ]}
                  onPress={() => Alert.alert(
                    'Suggested Exercise',
                    'This would open a custom practice exercise for improving conciseness while maintaining clarity.'
                  )}
                >
                  <SquarePen size={16} color={colors.primary} style={styles.exerciseIcon} />
                  <Text style={[styles.exerciseText, { color: colors.text }]}>
                    Suggested Exercise: Conciseness Practice
                  </Text>
                  <ArrowRight size={16} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  tabButtonActive: {
    borderWidth: 0,
  },
  tabButtonText: {
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  collectTab: {
    flex: 1,
  },
  analyzeTab: {
    flex: 1,
  },
  improveTab: {
    flex: 1,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  tabDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  templatesContainer: {
    marginBottom: 24,
  },
  templatesList: {
    paddingBottom: 8,
  },
  templateCard: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
  },
  templateCardSelected: {
    borderWidth: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  selectedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  selectedBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  templateDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  questionCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionCountText: {
    fontSize: 12,
    marginLeft: 6,
  },
  recipientsContainer: {
    marginBottom: 24,
  },
  recipientsInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginRight: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  addButton: {
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  recipientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recipientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  recipientEmail: {
    fontSize: 14,
    marginRight: 6,
  },
  removeRecipient: {
    padding: 2,
  },
  customMessageContainer: {
    marginBottom: 24,
  },
  messageInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    minHeight: 120,
    fontSize: 15,
    lineHeight: 22,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  sendIcon: {
    marginRight: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  feedbackList: {
    marginBottom: 24,
  },
  feedbackItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackSource: {
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackDate: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  feedbackComments: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 12,
  },
  feedbackAreas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  areaTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  areaTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  insightsContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  insightIcon: {
    marginRight: 8,
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 4,
  },
  metricsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricsCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metricRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  metricInfo: {
    flex: 1,
    marginRight: 12,
  },
  metricName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  metricValue: {
    alignItems: 'center',
  },
  metricScore: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  recommendationCard: {
    borderRadius: 12,
    padding: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recommendationItems: {
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  suggestedExercise: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  exerciseIcon: {
    marginRight: 8,
  },
  exerciseText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});