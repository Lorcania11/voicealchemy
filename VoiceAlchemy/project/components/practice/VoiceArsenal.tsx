import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { 
  Brain, 
  Target, 
  User, 
  MessageCircle, 
  Route, 
  Mic, 
  EyeOff,
  Zap,
  ChevronRight 
} from 'lucide-react-native';

// Voice Arsenal Tools
const ARSENAL_TOOLS = [
  {
    id: 'persona',
    title: 'Voice Persona Builder',
    description: 'Create situation-specific voice personas for different client types',
    icon: User,
    color: '#3B82F6',
    beta: false,
  },
  {
    id: 'priming',
    title: 'Psychological Voice Priming',
    description: 'Mental exercises that activate specific voice qualities needed for meetings',
    icon: Brain,
    color: '#8B5CF6',
    beta: false,
  },
  {
    id: 'simulation',
    title: 'Opponent Simulation',
    description: 'Practice with AI-generated client personas with communication challenges',
    icon: MessageCircle,
    color: '#EC4899',
    beta: false,
  },
  {
    id: 'strategy',
    title: 'Voice Strategy Planner',
    description: 'Create a voice roadmap for meetings with timing recommendations',
    icon: Route,
    color: '#F59E0B',
    beta: false,
  },
  {
    id: 'phrases',
    title: 'Key Phrase Optimization',
    description: 'Practice delivering critical points with maximum vocal impact',
    icon: Mic,
    color: '#10B981',
    beta: false,
  },
  {
    id: 'mirroring',
    title: 'Silent Mirroring Challenge',
    description: 'Practice matching communication patterns without sound',
    icon: EyeOff,
    color: '#6366F1',
    beta: true,
  },
  {
    id: 'competitive',
    title: 'Beat Your Best Mode',
    description: 'Challenge yourself to outperform previous vocal performances',
    icon: Zap,
    color: '#EF4444',
    beta: true,
  },
];

// Meeting data for upcoming meetings
const UPCOMING_MEETINGS = [
  {
    id: '1',
    title: 'Client Pitch: Acme Corp',
    date: 'Today, 3:30 PM',
    client: 'John Smith',
    clientImg: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepComplete: 2,
    prepTotal: 5,
  },
  {
    id: '2',
    title: 'Quarterly Review',
    date: 'Tomorrow, 10:00 AM',
    client: 'Executive Team',
    clientImg: 'https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepComplete: 0,
    prepTotal: 5,
  },
];

export default function VoiceArsenal() {
  const { colors, isDark } = useTheme();
  const [selectedMeeting, setSelectedMeeting] = useState(UPCOMING_MEETINGS[0].id);
  
  const handleInfoButtonPress = () => {
    Alert.alert(
      "Voice Arsenal",
      "The Voice Arsenal contains specialized tools to help you prepare your voice for specific professional situations. These tools are designed to give you a competitive edge by optimizing your vocal delivery for maximum impact."
    );
  };
  
  const handleArsenalToolPress = (tool) => {
    Alert.alert(
      tool.title,
      `${tool.description}${tool.beta ? '\n\nThis feature is currently in beta.' : ''}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Open Tool",
          onPress: () => {
            // In a real app, this would navigate to the specific tool
            Alert.alert(`Opening ${tool.title}...`);
          }
        }
      ]
    );
  };
  
  // Render arsenal tool item
  const renderArsenalTool = (item) => {
    const Icon = item.icon;
    
    return (
      <Pressable 
        key={item.id}
        style={[styles.arsenalItem, { backgroundColor: colors.card }]}
        onPress={() => handleArsenalToolPress(item)}
      >
        <View 
          style={[
            styles.arsenalIconContainer, 
            { backgroundColor: `${item.color}20` /* 20% opacity */ }
          ]}
        >
          <Icon size={24} color={item.color} />
        </View>
        
        <View style={styles.arsenalContent}>
          <View style={styles.arsenalTitleRow}>
            <Text style={[styles.arsenalTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            {item.beta && (
              <View style={styles.betaBadge}>
                <Text style={styles.betaText}>BETA</Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.arsenalDescription, { color: colors.textSecondary }]}>
            {item.description}
          </Text>
        </View>
        
        <ChevronRight size={20} color={colors.textTertiary} />
      </Pressable>
    );
  };
  
  // Render meeting item
  const renderMeetingItem = (meeting) => {
    const isSelected = meeting.id === selectedMeeting;
    
    return (
      <Pressable
        key={meeting.id}
        style={[
          styles.meetingItem,
          isSelected && styles.meetingItemSelected,
          { 
            backgroundColor: isSelected ? colors.primary + '30' : colors.card,
            borderColor: isSelected ? colors.primary : colors.border
          }
        ]}
        onPress={() => setSelectedMeeting(meeting.id)}
      >
        <Image 
          source={{ uri: meeting.clientImg }} 
          style={styles.clientImage} 
        />
        
        <View style={styles.meetingContent}>
          <Text style={[styles.meetingTitle, { color: colors.text }]}>
            {meeting.title}
          </Text>
          <Text style={[styles.meetingDate, { color: colors.textSecondary }]}>
            {meeting.date}
          </Text>
          
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
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Upcoming Meetings
        </Text>
      </View>
      
      <View style={styles.meetingsContainer}>
        {UPCOMING_MEETINGS.map(renderMeetingItem)}
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Voice Arsenal
        </Text>
        <Pressable 
          style={styles.infoButton}
          onPress={handleInfoButtonPress}
        >
          <Text style={[styles.infoButtonText, { color: colors.primary }]}>
            What's this?
          </Text>
        </Pressable>
      </View>
      
      <Text style={[styles.arsenalDescription, { color: colors.textSecondary, marginHorizontal: 20, marginBottom: 16 }]}>
        Use these tools to prepare your voice and communication strategy for upcoming meetings
      </Text>
      
      <View style={styles.arsenalContainer}>
        {ARSENAL_TOOLS.map(renderArsenalTool)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  infoButton: {
    padding: 4,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  meetingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  meetingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  meetingItemSelected: {
    borderWidth: 2,
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  meetingContent: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  meetingDate: {
    fontSize: 14,
    marginBottom: 8,
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
  arsenalContainer: {
    paddingHorizontal: 20,
  },
  arsenalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  arsenalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  arsenalContent: {
    flex: 1,
  },
  arsenalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  arsenalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  betaBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  betaText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  arsenalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});