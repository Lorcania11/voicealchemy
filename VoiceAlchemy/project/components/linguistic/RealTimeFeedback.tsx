import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Headphones, Mic, Volume2, Zap, CircleAlert as AlertCircle, Settings, Bell, ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Sample prompt settings
const DEFAULT_SETTINGS = {
  fillerWords: true,
  paceAdjustment: true,
  clarityPrompts: true,
  vocabularyEnhancements: true,
  emotionalCues: false,
  interruptionReminders: false,
};

// Sample feedback categories
const FEEDBACK_CATEGORIES = [
  {
    id: 'fillerWords',
    name: 'Filler Word Reduction',
    description: 'Reduce use of words like "um," "uh," "like," "you know," and "actually"',
    icon: AlertCircle,
    color: '#EF4444',
    examples: [
      '"Um, I think, you know, this solution could work"',
      '"So, basically, the data shows that, like, improvements are happening"'
    ]
  },
  {
    id: 'paceAdjustment',
    name: 'Pace Adjustments',
    description: 'Prompts to slow down or speed up based on context and audience engagement',
    icon: Volume2,
    color: '#F59E0B',
    examples: [
      '"Slow down, they\'re taking notes"',
      '"Speed up, they seem familiar with this concept"'
    ]
  },
  {
    id: 'clarityPrompts',
    name: 'Clarity Prompts',
    description: 'Suggestions to clarify points when explanation becomes complex',
    icon: Zap,
    color: '#10B981',
    examples: [
      '"Use an example here"',
      '"Explain that technical term"'
    ]
  },
  {
    id: 'vocabularyEnhancements',
    name: 'Vocabulary Enhancements',
    description: 'Real-time alternative word suggestions for stronger impact',
    icon: Sparkles,
    color: '#3B82F6',
    examples: [
      '"Use \'optimize\' instead of \'improve\'"',
      '"Try \'substantial\' instead of \'big\'"'
    ]
  },
  {
    id: 'emotionalCues',
    name: 'Emotional Intelligence Cues',
    description: 'Reminders to adjust tone based on audience emotional responses',
    icon: Heart,
    color: '#EC4899',
    examples: [
      '"They seem concerned - acknowledge and reassure"',
      '"Show more enthusiasm for this point"'
    ]
  },
  {
    id: 'interruptionReminders',
    name: 'Interruption Management',
    description: 'Prompts to handle interruptions professionally',
    icon: MessageCircle,
    color: '#8B5CF6',
    examples: [
      '"Pause and listen fully"',
      '"Return to your previous point"'
    ]
  },
];

// Sample feedback history
const FEEDBACK_HISTORY = [
  {
    meetingTitle: 'Client Pitch: Acme Corp',
    date: 'Today, 2:30 PM',
    duration: '45 minutes',
    promptsDelivered: 18,
    promptsFollowed: 15,
    impact: {
      fillerWords: -40, // percentage reduction
      paceConsistency: +25, // percentage improvement
      clarityRating: +15, // percentage improvement
    },
    topPrompts: [
      { text: "Slow down for this technical explanation", category: "paceAdjustment", followed: true },
      { text: "Use 'streamline' instead of 'make easier'", category: "vocabularyEnhancements", followed: true },
      { text: "They look confused - provide an example", category: "clarityPrompts", followed: true },
      { text: "Reduce use of 'basically'", category: "fillerWords", followed: false },
    ]
  },
  {
    meetingTitle: 'Team Presentation',
    date: 'Yesterday, 10:00 AM',
    duration: '30 minutes',
    promptsDelivered: 12,
    promptsFollowed: 10,
    impact: {
      fillerWords: -35, 
      paceConsistency: +20,
      clarityRating: +22,
    },
    topPrompts: [
      { text: "Provide a specific example here", category: "clarityPrompts", followed: true },
      { text: "Address the question directly", category: "clarityPrompts", followed: true },
      { text: "Reduce use of 'sort of'", category: "fillerWords", followed: false },
    ]
  }
];

// Component imports that need to be defined
import { Sparkles, Heart, MessageCircle } from 'lucide-react-native';

interface RealTimeFeedbackProps {
  upcomingMeeting?: { 
    title: string;
    time: string;
  };
}

export default function RealTimeFeedback({ 
  upcomingMeeting = { title: "Client Pitch: Acme Corp", time: "Today, 3:30 PM" }
}: RealTimeFeedbackProps) {
  const { colors, isDark } = useTheme();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [volume, setVolume] = useState(2); // 0-3 (Off, Low, Medium, High)
  const [mode, setMode] = useState('standard'); // 'standard', 'minimal', 'comprehensive'
  
  const handleToggleSetting = (settingId) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
  };
  
  const handleVolumeChange = () => {
    // Cycle through volume levels: Off -> Low -> Medium -> High -> Off
    setVolume((volume + 1) % 4);
  };
  
  const getVolumeLabel = () => {
    switch(volume) {
      case 0: return 'Off';
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Medium';
    }
  };
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
    
    // Update settings based on mode
    if (newMode === 'minimal') {
      setSettings({
        ...DEFAULT_SETTINGS,
        emotionalCues: false,
        interruptionReminders: false,
        vocabularyEnhancements: false
      });
    } else if (newMode === 'comprehensive') {
      setSettings({
        fillerWords: true,
        paceAdjustment: true,
        clarityPrompts: true,
        vocabularyEnhancements: true,
        emotionalCues: true,
        interruptionReminders: true,
      });
    } else {
      // Standard mode
      setSettings(DEFAULT_SETTINGS);
    }
  };
  
  const handleTestFeedback = () => {
    Alert.alert(
      'Test Feedback',
      'You will now hear a sample of real-time feedback prompts at your selected volume level.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Start Test', 
          onPress: () => {
            Alert.alert('Test Started', 'Simulating feedback prompts...');
            
            // In a real app, this would trigger actual audio through the earpiece
            setTimeout(() => {
              Alert.alert('Test Complete', 'How was the volume level? Adjust if needed.');
            }, 2000);
          }
        }
      ]
    );
  };
  
  const handleSetupForMeeting = () => {
    if (!upcomingMeeting) return;
    
    Alert.alert(
      `Setup for ${upcomingMeeting.title}`,
      `Would you like to enable real-time feedback for your upcoming meeting at ${upcomingMeeting.time}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enable', 
          onPress: () => {
            Alert.alert(
              'Feedback Enabled',
              `Real-time feedback is now set up for your meeting. Connect your earpiece 5 minutes before the meeting starts.`
            );
          }
        }
      ]
    );
  };
  
  const handleViewPerformanceHistory = () => {
    // In a real app, this would navigate to a detailed history view
    Alert.alert(
      'Performance History',
      'This would navigate to a comprehensive view of your linguistic performance history across all meetings with detailed analytics.'
    );
  };
  
  const renderFeedbackCategory = (category) => {
    const Icon = category.icon;
    const isEnabled = settings[category.id];
    
    return (
      <View 
        key={category.id}
        style={[
          styles.categoryCard, 
          { 
            backgroundColor: colors.card,
            borderLeftColor: category.color,
            borderLeftWidth: 3
          }
        ]}
      >
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleContainer}>
            <Icon size={20} color={category.color} style={styles.categoryIcon} />
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              {category.name}
            </Text>
          </View>
          
          <Switch
            value={isEnabled}
            onValueChange={() => handleToggleSetting(category.id)}
            trackColor={{ false: colors.backgroundSecondary, true: category.color + '80' }}
            thumbColor={isEnabled ? category.color : colors.textTertiary}
          />
        </View>
        
        <Text style={[styles.categoryDescription, { color: colors.textSecondary }]}>
          {category.description}
        </Text>
        
        {isEnabled && (
          <View style={[styles.examplesContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[styles.examplesTitle, { color: colors.textSecondary }]}>
              Example prompts:
            </Text>
            
            {category.examples.map((example, index) => (
              <Text 
                key={index}
                style={[styles.exampleText, { color: colors.text }]}
              >
                • {example}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };
  
  const renderHistory = (item, index) => {
    return (
      <Pressable 
        key={index}
        style={[styles.historyItem, { backgroundColor: colors.card }]}
        onPress={() => Alert.alert(
          'Session Details',
          `This would open detailed analytics for your "${item.meetingTitle}" session.`
        )}
      >
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: colors.text }]}>
            {item.meetingTitle}
          </Text>
          <Text style={[styles.historyMeta, { color: colors.textSecondary }]}>
            {item.date} • {item.duration}
          </Text>
        </View>
        
        <View style={styles.historyStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {item.promptsDelivered}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Prompts
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {Math.round((item.promptsFollowed / item.promptsDelivered) * 100)}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Followed
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {item.impact.fillerWords}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Fillers
            </Text>
          </View>
        </View>
        
        <View style={styles.topPrompts}>
          <Text style={[styles.topPromptsTitle, { color: colors.textSecondary }]}>
            Top Prompts:
          </Text>
          
          {item.topPrompts.slice(0, 2).map((prompt, promptIndex) => {
            // Get category details
            const category = FEEDBACK_CATEGORIES.find(c => c.id === prompt.category);
            return (
              <View 
                key={promptIndex}
                style={styles.promptItem}
              >
                <View style={styles.promptContent}>
                  <Text 
                    style={[
                      styles.promptText, 
                      { color: colors.text }
                    ]}
                  >
                    "{prompt.text}"
                  </Text>
                  
                  <View 
                    style={[
                      styles.categoryLabel, 
                      { 
                        backgroundColor: category ? category.color + '20' : colors.backgroundSecondary
                      }
                    ]}
                  >
                    <Text 
                      style={[
                        styles.categoryLabelText, 
                        { color: category ? category.color : colors.textSecondary }
                      ]}
                    >
                      {category ? category.name : prompt.category}
                    </Text>
                  </View>
                </View>
                
                {prompt.followed ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <AlertCircle size={16} color="#F59E0B" />
                )}
              </View>
            );
          })}
          
          {item.topPrompts.length > 2 && (
            <Text style={[styles.morePrompts, { color: colors.primary }]}>
              +{item.topPrompts.length - 2} more prompts
            </Text>
          )}
        </View>
        
        <View style={styles.viewDetails}>
          <Text style={[styles.viewDetailsText, { color: colors.primary }]}>
            View Details
          </Text>
          <ArrowRight size={16} color={colors.primary} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Real-Time Feedback
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Receive discreet linguistic prompts during live conversations through your earpiece
      </Text>
      
      {upcomingMeeting && (
        <Pressable
          style={[styles.upcomingMeeting, { backgroundColor: colors.primary }]}
          onPress={handleSetupForMeeting}
        >
          <View style={styles.meetingInfo}>
            <Text style={styles.setupText}>Set up for upcoming meeting</Text>
            <Text style={styles.meetingText}>
              {upcomingMeeting.title} at {upcomingMeeting.time}
            </Text>
          </View>
          <ArrowRight size={20} color="white" />
        </Pressable>
      )}
      
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Feedback Settings
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Feedback Mode
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {mode === 'minimal' ? 'Essential prompts only' : 
                   mode === 'comprehensive' ? 'All available prompts' : 
                   'Balanced selection of prompts'}
                </Text>
              </View>
              
              <View style={styles.modeOptions}>
                <Pressable
                  style={[
                    styles.modeOption,
                    mode === 'minimal' && styles.modeOptionSelected,
                    { 
                      backgroundColor: mode === 'minimal' ? colors.primary : colors.backgroundSecondary
                    }
                  ]}
                  onPress={() => handleModeChange('minimal')}
                >
                  <Text 
                    style={[
                      styles.modeOptionText, 
                      { color: mode === 'minimal' ? 'white' : colors.text }
                    ]}
                  >
                    Minimal
                  </Text>
                </Pressable>
                
                <Pressable
                  style={[
                    styles.modeOption,
                    mode === 'standard' && styles.modeOptionSelected,
                    { 
                      backgroundColor: mode === 'standard' ? colors.primary : colors.backgroundSecondary
                    }
                  ]}
                  onPress={() => handleModeChange('standard')}
                >
                  <Text 
                    style={[
                      styles.modeOptionText, 
                      { color: mode === 'standard' ? 'white' : colors.text }
                    ]}
                  >
                    Standard
                  </Text>
                </Pressable>
                
                <Pressable
                  style={[
                    styles.modeOption,
                    mode === 'comprehensive' && styles.modeOptionSelected,
                    { 
                      backgroundColor: mode === 'comprehensive' ? colors.primary : colors.backgroundSecondary
                    }
                  ]}
                  onPress={() => handleModeChange('comprehensive')}
                >
                  <Text 
                    style={[
                      styles.modeOptionText, 
                      { color: mode === 'comprehensive' ? 'white' : colors.text }
                    ]}
                  >
                    Full
                  </Text>
                </Pressable>
              </View>
            </View>
            
            <View 
              style={[
                styles.settingDivider, 
                { backgroundColor: colors.border }
              ]} 
            />
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.settingLabelContainer}>
                  <Volume2 size={16} color={colors.text} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Prompt Volume
                  </Text>
                </View>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {volume === 0 ? 'Audio prompts disabled' : `${getVolumeLabel()} volume in earpiece`}
                </Text>
              </View>
              
              <Pressable
                style={[styles.volumeButton, { backgroundColor: colors.backgroundSecondary }]}
                onPress={handleVolumeChange}
              >
                <Text style={[styles.volumeButtonText, { color: colors.text }]}>
                  {getVolumeLabel()}
                </Text>
              </Pressable>
            </View>
            
            <View 
              style={[
                styles.settingDivider, 
                { backgroundColor: colors.border }
              ]} 
            />
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.settingLabelContainer}>
                  <Headphones size={16} color={colors.text} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>
                    Test Earpiece
                  </Text>
                </View>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Hear sample prompts at current volume setting
                </Text>
              </View>
              
              <Pressable
                style={[styles.testButton, { backgroundColor: colors.primary }]}
                onPress={handleTestFeedback}
              >
                <Text style={styles.testButtonText}>Test</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Feedback Categories
          </Text>
          
          <View style={styles.categories}>
            {FEEDBACK_CATEGORIES.map(renderFeedbackCategory)}
          </View>
        </View>
        
        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Sessions
            </Text>
            
            <Pressable 
              style={styles.viewAllButton}
              onPress={handleViewPerformanceHistory}
            >
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                View All
              </Text>
              <ArrowRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          <View style={styles.historyList}>
            {FEEDBACK_HISTORY.map(renderHistory)}
          </View>
        </View>
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
  upcomingMeeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  meetingInfo: {
    flex: 1,
  },
  setupText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  meetingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingsCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingDivider: {
    height: 1,
    width: '100%',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingIcon: {
    marginRight: 8,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  modeOptions: {
    flexDirection: 'row',
  },
  modeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 6,
  },
  modeOptionSelected: {
  },
  modeOptionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  volumeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  volumeButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  testButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  testButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categories: {
  },
  categoryCard: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  examplesContainer: {
    padding: 12,
    borderRadius: 8,
  },
  examplesTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  historySection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    marginRight: 4,
  },
  historyList: {
  },
  historyItem: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  historyHeader: {
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 13,
  },
  historyStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    marginRight: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  topPrompts: {
    marginBottom: 12,
  },
  topPromptsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  promptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptContent: {
    flex: 1,
    marginRight: 8,
  },
  promptText: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  categoryLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryLabelText: {
    fontSize: 10,
    fontWeight: '500',
  },
  morePrompts: {
    fontSize: 12,
    marginTop: 4,
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 4,
  },
});