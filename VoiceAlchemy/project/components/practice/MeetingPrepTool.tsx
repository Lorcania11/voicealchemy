import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Calendar, Clock, Search, User, Building, Sparkles, Plus, Edit, Trash2, Check, Mic, BookOpen, Download } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Sample meetings data
const MEETINGS = [
  {
    id: '1',
    title: 'Client Pitch: Acme Corp',
    date: 'Today, 3:30 PM',
    client: 'John Smith',
    company: 'Acme Corporation',
    industry: 'Technology',
    prepComplete: 2,
    prepTotal: 5,
  },
  {
    id: '2',
    title: 'Quarterly Review',
    date: 'Tomorrow, 10:00 AM',
    client: 'Executive Team',
    company: 'Internal',
    industry: 'Technology',
    prepComplete: 0,
    prepTotal: 5,
  },
];

// Sample vocabulary sets
const VOCABULARY_SETS = [
  {
    id: '1',
    meetingId: '1',
    title: 'Acme Corp Terminology',
    terms: [
      { term: 'ERP Integration', definition: 'Connecting Acme\'s ERP system with our platform' },
      { term: 'Legacy System Migration', definition: 'Moving from Acme\'s outdated software to our new platform' },
      { term: 'Multi-tenant Architecture', definition: 'Our system\'s ability to serve multiple clients securely' },
      { term: 'ROI Timeline', definition: 'Expected 8-month payback period for Acme\'s investment' },
    ],
  },
  {
    id: '2',
    meetingId: '1',
    title: 'Acme Corp Stakeholders',
    terms: [
      { term: 'John Smith', definition: 'CTO, primary decision maker, technical background' },
      { term: 'Sarah Johnson', definition: 'CFO, concerned with ROI and budget impact' },
      { term: 'Mark Davis', definition: 'Head of Operations, focused on implementation timeline' },
      { term: 'IT Department', definition: 'Will be responsible for daily maintenance of new system' },
    ],
  },
];

// Sample language recommendations
const LANGUAGE_RECOMMENDATIONS = [
  {
    id: '1',
    meetingId: '1',
    category: 'Avoid',
    phrases: [
      { phrase: 'It\'s going to be difficult', reason: 'Frames challenges negatively' },
      { phrase: 'We can try to', reason: 'Shows lack of confidence' },
      { phrase: 'Industry standard', reason: 'Too generic, Acme wants customization' },
    ]
  },
  {
    id: '2',
    meetingId: '1',
    category: 'Use',
    phrases: [
      { phrase: 'Streamlined integration process', reason: 'Addresses their concern about complexity' },
      { phrase: 'Proven implementation methodology', reason: 'Builds confidence in delivery' },
      { phrase: 'Tailored to your specific requirements', reason: 'Emphasizes customization' },
    ]
  },
];

interface MeetingPrepToolProps {
  onSelectMeeting?: (meetingId: string) => void;
}

export default function MeetingPrepTool({ onSelectMeeting }: MeetingPrepToolProps) {
  const { colors, isDark } = useTheme();
  const [selectedMeeting, setSelectedMeeting] = useState(MEETINGS[0].id);
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [editingVocabulary, setEditingVocabulary] = useState(false);
  const [newTerm, setNewTerm] = useState({ term: '', definition: '' });
  
  useEffect(() => {
    if (onSelectMeeting && selectedMeeting) {
      onSelectMeeting(selectedMeeting);
    }
  }, [selectedMeeting]);
  
  const handleMeetingSelect = (meetingId) => {
    setSelectedMeeting(meetingId);
    // Reset editing state when changing meetings
    setEditingVocabulary(false);
  };
  
  const handleAddTerm = () => {
    if (!newTerm.term.trim() || !newTerm.definition.trim()) {
      Alert.alert('Input Required', 'Please enter both a term and definition');
      return;
    }
    
    // In a real app, this would add to the database
    Alert.alert(
      'Term Added',
      `"${newTerm.term}" has been added to your vocabulary set.`,
      [{ text: 'OK' }]
    );
    
    // Reset form
    setNewTerm({ term: '', definition: '' });
  };
  
  const handleGenerateMeetingBrief = () => {
    Alert.alert(
      'Meeting Brief Generated',
      'Your comprehensive meeting brief has been generated and is ready for review. It includes all vocabulary sets, language recommendations, and key client information.',
      [{ text: 'View Brief' }]
    );
  };
  
  const handleRealTimeFeedbackSetup = () => {
    Alert.alert(
      'Real-Time Feedback',
      'Would you like to enable real-time linguistic feedback during this meeting? You\'ll receive subtle prompts through your earpiece when opportunities for improved phrasing are detected.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enable', 
          onPress: () => {
            Alert.alert('Real-Time Feedback Enabled', 'You\'ll receive discreet linguistic prompts during your meeting.');
          }
        }
      ]
    );
  };
  
  const handleResearchClient = () => {
    Alert.alert(
      'Client Research Assistant',
      'I can analyze available data about Acme Corporation to generate language recommendations and industry-specific terminology. This will include analyzing their website, recent news, social media, and public financial information.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Research Now', 
          onPress: () => {
            Alert.alert('Research in Progress', 'Analyzing Acme Corporation data. This process will take approximately 2 minutes.');
          }
        }
      ]
    );
  };
  
  // Get vocabulary sets for the selected meeting
  const getVocabularySets = () => {
    return VOCABULARY_SETS.filter(set => set.meetingId === selectedMeeting);
  };
  
  // Get language recommendations for the selected meeting
  const getLanguageRecommendations = () => {
    return LANGUAGE_RECOMMENDATIONS.filter(rec => rec.meetingId === selectedMeeting);
  };
  
  // Get the selected meeting object
  const getSelectedMeeting = () => {
    return MEETINGS.find(m => m.id === selectedMeeting);
  };
  
  const renderMeetingItem = (meeting) => {
    const isSelected = meeting.id === selectedMeeting;
    
    return (
      <Pressable
        key={meeting.id}
        style={[
          styles.meetingItem,
          isSelected && styles.meetingItemSelected,
          { 
            backgroundColor: isSelected ? colors.primary + '20' : colors.card,
            borderColor: isSelected ? colors.primary : colors.border
          }
        ]}
        onPress={() => handleMeetingSelect(meeting.id)}
      >
        <View style={styles.meetingHeader}>
          <Text style={[styles.meetingTitle, { color: colors.text }]}>
            {meeting.title}
          </Text>
          
          <View style={styles.meetingMeta}>
            <View style={styles.meetingMetaItem}>
              <Calendar size={14} color={colors.textSecondary} />
              <Text style={[styles.meetingMetaText, { color: colors.textSecondary }]}>
                {meeting.date}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.meetingDetails}>
          <View style={styles.meetingDetailItem}>
            <User size={14} color={colors.textTertiary} />
            <Text style={[styles.meetingDetailText, { color: colors.textSecondary }]}>
              {meeting.client}
            </Text>
          </View>
          
          <View style={styles.meetingDetailItem}>
            <Building size={14} color={colors.textTertiary} />
            <Text style={[styles.meetingDetailText, { color: colors.textSecondary }]}>
              {meeting.company} • {meeting.industry}
            </Text>
          </View>
        </View>
        
        <View style={styles.prepProgressContainer}>
          <View style={[styles.prepProgressBar, { backgroundColor: colors.backgroundSecondary }]}>
            <View 
              style={[
                styles.prepProgressFill, 
                { 
                  width: `${(meeting.prepComplete / meeting.prepTotal) * 100}%`,
                  backgroundColor: colors.primary 
                }
              ]} 
            />
          </View>
          <Text style={[styles.prepProgressText, { color: colors.textSecondary }]}>
            {meeting.prepComplete}/{meeting.prepTotal} prep complete
          </Text>
        </View>
      </Pressable>
    );
  };
  
  const renderVocabularySet = (set) => {
    return (
      <View 
        key={set.id}
        style={[styles.vocabularySet, { backgroundColor: colors.card }]}
      >
        <View style={styles.vocabularySetHeader}>
          <Text style={[styles.vocabularySetTitle, { color: colors.text }]}>
            {set.title}
          </Text>
          
          <View style={styles.vocabularyActions}>
            <Pressable style={styles.vocabularyAction}>
              <Edit size={16} color={colors.textSecondary} />
            </Pressable>
            <Pressable style={styles.vocabularyAction}>
              <Trash2 size={16} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>
        
        {set.terms.map((item, index) => (
          <View 
            key={index}
            style={[
              styles.vocabularyItem, 
              { borderBottomColor: colors.border }
            ]}
          >
            <Text style={[styles.vocabularyTerm, { color: colors.text }]}>
              {item.term}
            </Text>
            <Text style={[styles.vocabularyDefinition, { color: colors.textSecondary }]}>
              {item.definition}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  const renderLanguageRecommendation = (recommendation) => {
    const isAvoid = recommendation.category === 'Avoid';
    const categoryColor = isAvoid ? '#EF4444' : '#10B981';
    
    return (
      <View 
        key={recommendation.id}
        style={[styles.recommendationSet, { backgroundColor: colors.card }]}
      >
        <View 
          style={[
            styles.recommendationHeader, 
            { 
              backgroundColor: isAvoid ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderColor: categoryColor
            }
          ]}
        >
          <Text style={[styles.recommendationCategory, { color: categoryColor }]}>
            {recommendation.category}
          </Text>
        </View>
        
        {recommendation.phrases.map((item, index) => (
          <View 
            key={index}
            style={[
              styles.recommendationItem, 
              { borderBottomColor: colors.border }
            ]}
          >
            <Text style={[styles.recommendationPhrase, { color: colors.text }]}>
              "{item.phrase}"
            </Text>
            <Text style={[styles.recommendationReason, { color: colors.textSecondary }]}>
              Why: {item.reason}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  // Get the vocabulary tab content
  const renderVocabularyTab = () => {
    const vocabularySets = getVocabularySets();
    
    return (
      <View style={styles.tabContent}>
        <View style={styles.tabActions}>
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleResearchClient}
          >
            <Search size={16} color="white" />
            <Text style={styles.actionButtonText}>Research Client</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => setEditingVocabulary(!editingVocabulary)}
          >
            <Plus size={16} color={colors.text} />
            <Text style={[styles.secondaryActionText, { color: colors.text }]}>
              {editingVocabulary ? 'Cancel' : 'Add Terms'}
            </Text>
          </Pressable>
        </View>
        
        {editingVocabulary && (
          <View style={[styles.addTermForm, { backgroundColor: colors.card }]}>
            <Text style={[styles.addTermTitle, { color: colors.text }]}>
              Add New Vocabulary Term
            </Text>
            
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: colors.textSecondary }]}>Term</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { backgroundColor: colors.backgroundSecondary, color: colors.text }
                ]}
                placeholder="Enter term or name"
                placeholderTextColor={colors.textTertiary}
                value={newTerm.term}
                onChangeText={(text) => setNewTerm({...newTerm, term: text})}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: colors.textSecondary }]}>Definition/Notes</Text>
              <TextInput
                style={[
                  styles.formInput,
                  styles.textArea,
                  { backgroundColor: colors.backgroundSecondary, color: colors.text }
                ]}
                placeholder="Enter definition or notes about this term"
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={newTerm.definition}
                onChangeText={(text) => setNewTerm({...newTerm, definition: text})}
              />
            </View>
            
            <Pressable 
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleAddTerm}
            >
              <Check size={16} color="white" />
              <Text style={styles.saveButtonText}>Add to Vocabulary</Text>
            </Pressable>
          </View>
        )}
        
        <View style={styles.vocabularySets}>
          {vocabularySets.length > 0 ? (
            vocabularySets.map(renderVocabularySet)
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.backgroundSecondary }]}>
              <BookOpen size={24} color={colors.textTertiary} />
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                No vocabulary sets yet. Use the Research Client button to generate terminology or add terms manually.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  // Get the language tab content
  const renderLanguageTab = () => {
    const recommendations = getLanguageRecommendations();
    
    return (
      <View style={styles.tabContent}>
        <View style={styles.recommendationSets}>
          {recommendations.length > 0 ? (
            recommendations.map(renderLanguageRecommendation)
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.backgroundSecondary }]}>
              <Sparkles size={24} color={colors.textTertiary} />
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                No language recommendations yet. Use the Research Client button to generate tailored recommendations.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.toolTitle, { color: colors.text }]}>
        Meeting Preparation
      </Text>
      
      <Text style={[styles.toolDescription, { color: colors.textSecondary }]}>
        Prepare linguistically for upcoming meetings with client-specific vocabulary and language recommendations
      </Text>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Upcoming Meetings
      </Text>
      
      <View style={styles.meetingsContainer}>
        {MEETINGS.map(renderMeetingItem)}
      </View>
      
      {selectedMeeting && (
        <>
          <View style={styles.tabsContainer}>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'vocabulary' && styles.tabButtonActive,
                { 
                  backgroundColor: activeTab === 'vocabulary' ? colors.primary : colors.card,
                }
              ]}
              onPress={() => setActiveTab('vocabulary')}
            >
              <Text 
                style={[
                  styles.tabButtonText,
                  { color: activeTab === 'vocabulary' ? 'white' : colors.text }
                ]}
              >
                Vocabulary Sets
              </Text>
            </Pressable>
            
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'language' && styles.tabButtonActive,
                { 
                  backgroundColor: activeTab === 'language' ? colors.primary : colors.card,
                }
              ]}
              onPress={() => setActiveTab('language')}
            >
              <Text 
                style={[
                  styles.tabButtonText,
                  { color: activeTab === 'language' ? 'white' : colors.text }
                ]}
              >
                Language Recommendations
              </Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.tabContentScroll}>
            {activeTab === 'vocabulary' ? renderVocabularyTab() : renderLanguageTab()}
          </ScrollView>
          
          <View style={styles.footerActions}>
            <Pressable 
              style={[styles.footerButton, { backgroundColor: colors.primary }]}
              onPress={handleGenerateMeetingBrief}
            >
              <Download size={16} color="white" />
              <Text style={styles.footerButtonText}>Generate Meeting Brief</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.footerButton, { backgroundColor: '#EC4899' }]}
              onPress={handleRealTimeFeedbackSetup}
            >
              <Mic size={16} color="white" />
              <Text style={styles.footerButtonText}>Setup Real-Time Feedback</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toolTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  meetingsContainer: {
    marginBottom: 20,
  },
  meetingItem: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  meetingItemSelected: {
    borderWidth: 2,
  },
  meetingHeader: {
    marginBottom: 10,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meetingMeta: {
    flexDirection: 'row',
  },
  meetingMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  meetingMetaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  meetingDetails: {
    marginBottom: 12,
  },
  meetingDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  meetingDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  prepProgressContainer: {
    width: '100%',
  },
  prepProgressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
  },
  prepProgressFill: {
    height: '100%',
  },
  prepProgressText: {
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderWidth: 0,
  },
  tabButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  tabContentScroll: {
    flex: 1,
    marginBottom: 16,
  },
  tabContent: {
    flex: 1,
  },
  tabActions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  secondaryActionText: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  vocabularySets: {
    marginBottom: 16,
  },
  vocabularySet: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  vocabularySetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  vocabularySetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  vocabularyActions: {
    flexDirection: 'row',
  },
  vocabularyAction: {
    padding: 6,
    marginLeft: 8,
  },
  vocabularyItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
  vocabularyTerm: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  vocabularyDefinition: {
    fontSize: 14,
    lineHeight: 20,
  },
  addTermForm: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  addTermTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  formField: {
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  formInput: {
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
  recommendationSets: {
    marginBottom: 16,
  },
  recommendationSet: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  recommendationHeader: {
    padding: 12,
    borderBottomWidth: 1,
  },
  recommendationCategory: {
    fontSize: 15,
    fontWeight: '600',
  },
  recommendationItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
  recommendationPhrase: {
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  recommendationReason: {
    fontSize: 14,
  },
  emptyState: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  footerActions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  footerButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
});