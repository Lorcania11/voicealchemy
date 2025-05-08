import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { 
  Wind, 
  Lungs, 
  Brain, 
  Activity, 
  Zap, 
  Dumbbell,
  ChevronRight,
  Play
} from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Breathing exercise categories
const PREP_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'breathing', label: 'Breathing' },
  { id: 'vocal', label: 'Vocal' },
  { id: 'posture', label: 'Posture' },
  { id: 'relaxation', label: 'Relaxation' },
  { id: 'energy', label: 'Energy' },
];

// Sample physiological prep data
const PHYSIOLOGICAL_PREPS = [
  {
    id: '1',
    title: 'Tactical Breathing',
    description: 'Military-derived breathing patterns for vocal stability under pressure',
    duration: '4 min',
    category: 'breathing',
    progress: 0.65,
    icon: Wind,
    iconColor: '#3B82F6',
    science: 'Research shows this technique regulates the autonomic nervous system in high-stress scenarios.',
  },
  {
    id: '2',
    title: 'Diaphragmatic Breathing',
    description: 'Professional broadcaster technique for resonant voice production',
    duration: '5 min',
    category: 'breathing',
    progress: 0.8,
    icon: Lungs,
    iconColor: '#8B5CF6',
    science: 'Activates the primary breathing muscle for improved vocal support and control.',
  },
  {
    id: '3',
    title: 'CO2 Tolerance Training',
    description: 'Advanced breathing exercise to improve vocal stamina',
    duration: '6 min',
    category: 'breathing',
    progress: 0.2,
    icon: Activity,
    iconColor: '#EC4899',
    science: 'Improves oxygen efficiency and reduces breathlessness during extended speaking.',
  },
  {
    id: '4',
    title: 'Vagus Nerve Stimulation',
    description: 'Neurological technique for voice stability under pressure',
    duration: '3 min',
    category: 'relaxation',
    progress: 0.1,
    icon: Zap,
    iconColor: '#F59E0B',
    science: 'Directly activates the parasympathetic nervous system for improved stress management.',
  },
  {
    id: '5',
    title: 'Vocal Tract Warm-up',
    description: 'Speech pathology exercises for optimal articulation',
    duration: '7 min',
    category: 'vocal',
    progress: 0.4,
    icon: Dumbbell,
    iconColor: '#10B981',
    science: 'Systematic activation of all vocal tract muscles for improved speech clarity.',
  },
  {
    id: '6',
    title: 'Facial Muscle Relaxation',
    description: 'Targeted exercises for jaw and face relaxation',
    duration: '4 min',
    category: 'relaxation',
    progress: 0.5,
    icon: Brain,
    iconColor: '#6366F1',
    science: 'Reduces tension in speech-producing muscles for improved vocal quality.',
  },
];

export default function PhysiologicalPrep() {
  const { colors, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredPreps = selectedCategory === 'all' 
    ? PHYSIOLOGICAL_PREPS 
    : PHYSIOLOGICAL_PREPS.filter(prep => prep.category === selectedCategory);
  
  const handleViewAllPress = () => {
    // In a real app, this would navigate to all physiological prep exercises
    Alert.alert("This would navigate to all physiological preparation exercises");
  };
  
  const handlePrepItemPress = (item) => {
    Alert.alert(
      item.title,
      `${item.description}\n\nScience: ${item.science}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Start Exercise",
          onPress: () => {
            // In a real app, this would navigate to the exercise
            Alert.alert(`Starting ${item.title}...`);
          }
        }
      ]
    );
  };
  
  const handleStartRoutinePress = () => {
    Alert.alert(
      "3-Minute Personalized Warm-up",
      "Ready to begin your personalized quick warm-up routine?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Start",
          onPress: () => {
            // In a real app, this would navigate to the routine
            Alert.alert("Starting 3-minute personalized warm-up routine...");
          }
        }
      ]
    );
  };
  
  // Render physiological preparation card
  const renderPrepItem = (item) => {
    const Icon = item.icon;
    
    return (
      <Pressable 
        key={item.id}
        style={[styles.prepCard, { backgroundColor: colors.card }]}
        onPress={() => handlePrepItemPress(item)}
      >
        <View style={styles.prepHeader}>
          <View 
            style={[
              styles.prepIconContainer, 
              { backgroundColor: `${item.iconColor}20` /* 20% opacity */ }
            ]}
          >
            <Icon size={24} color={item.iconColor} />
          </View>
          
          <View style={styles.prepTitle}>
            <Text style={[styles.prepTitleText, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.prepCategory, { color: colors.textTertiary }]}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
          </View>
          
          <View style={styles.playButton}>
            <Play size={16} color={colors.primary} />
          </View>
        </View>
        
        <Text style={[styles.prepDescription, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
        
        <View style={[styles.scienceContainer, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.scienceLabel, { color: colors.textSecondary }]}>THE SCIENCE:</Text>
          <Text style={[styles.scienceText, { color: colors.textSecondary }]}>
            {item.science}
          </Text>
        </View>
        
        <View style={styles.prepFooter}>
          <Text style={[styles.prepDuration, { color: colors.textSecondary }]}>
            {item.duration}
          </Text>
          
          <View style={styles.progressContainer}>
            <ProgressBar progress={item.progress} />
            <Text style={[styles.progressText, { color: colors.textTertiary }]}>
              {item.progress === 0 ? 'Not started' : 
               item.progress === 1 ? 'Completed' : 
               `${Math.round(item.progress * 100)}%`}
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
          Science-Backed Preparation
        </Text>
        <Pressable 
          style={styles.viewAllButton}
          onPress={handleViewAllPress}
        >
          <Text style={[styles.viewAllText, { color: colors.primary }]}>
            View All
          </Text>
          <ChevronRight size={16} color={colors.primary} />
        </Pressable>
      </View>
      
      <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
        Scientifically validated physiological exercises to optimize your vocal performance
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        {PREP_CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryPill,
              selectedCategory === category.id && styles.categoryPillSelected,
              { backgroundColor: selectedCategory === category.id ? colors.primary : colors.card }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryPillText,
                { color: selectedCategory === category.id ? 'white' : colors.text }
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      
      <View style={styles.prepContainer}>
        {filteredPreps.map(renderPrepItem)}
      </View>
      
      <View style={styles.quickRoutineContainer}>
        <View style={[styles.quickRoutineHeader, { backgroundColor: '#3B82F6' }]}>
          <Wind size={24} color="white" />
          <Text style={styles.quickRoutineTitle}>
            Personalized Quick Warm-up
          </Text>
        </View>
        
        <View style={[styles.quickRoutineContent, { backgroundColor: colors.card }]}>
          <Text style={[styles.quickRoutineDescription, { color: colors.textSecondary }]}>
            Your personalized 3-minute vocal preparation based on your voice analysis:
          </Text>
          
          <View style={styles.quickRoutineSteps}>
            <View style={styles.quickRoutineStep}>
              <View style={[styles.quickRoutineStepNumber, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.quickRoutineStepNumberText}>1</Text>
              </View>
              <Text style={[styles.quickRoutineStepText, { color: colors.text }]}>
                30s Diaphragmatic Breathing
              </Text>
            </View>
            
            <View style={styles.quickRoutineStep}>
              <View style={[styles.quickRoutineStepNumber, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.quickRoutineStepNumberText}>2</Text>
              </View>
              <Text style={[styles.quickRoutineStepText, { color: colors.text }]}>
                45s Vocal Tract Warm-up
              </Text>
            </View>
            
            <View style={styles.quickRoutineStep}>
              <View style={[styles.quickRoutineStepNumber, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.quickRoutineStepNumberText}>3</Text>
              </View>
              <Text style={[styles.quickRoutineStepText, { color: colors.text }]}>
                45s Facial Muscle Relaxation
              </Text>
            </View>
            
            <View style={styles.quickRoutineStep}>
              <View style={[styles.quickRoutineStepNumber, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.quickRoutineStepNumberText}>4</Text>
              </View>
              <Text style={[styles.quickRoutineStepText, { color: colors.text }]}>
                60s "Authority Boost" Exercise
              </Text>
            </View>
          </View>
          
          <Pressable 
            style={[styles.startRoutineButton, { backgroundColor: '#3B82F6' }]}
            onPress={handleStartRoutinePress}
          >
            <Text style={styles.startRoutineButtonText}>
              Start 3-Minute Routine
            </Text>
            <Play size={16} color="white" />
          </Pressable>
        </View>
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
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
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
  sectionDescription: {
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryPillSelected: {
    backgroundColor: '#1E40AF',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  prepContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  prepCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  prepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  prepTitle: {
    flex: 1,
  },
  prepTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prepCategory: {
    fontSize: 12,
    marginTop: 2,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prepDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  scienceContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  scienceLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  scienceText: {
    fontSize: 13,
    lineHeight: 18,
  },
  prepFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prepDuration: {
    fontSize: 14,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
  },
  quickRoutineContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickRoutineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  quickRoutineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginLeft: 12,
  },
  quickRoutineContent: {
    padding: 16,
  },
  quickRoutineDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  quickRoutineSteps: {
    marginBottom: 16,
  },
  quickRoutineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickRoutineStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickRoutineStepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  quickRoutineStepText: {
    fontSize: 15,
    fontWeight: '500',
  },
  startRoutineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
  },
  startRoutineButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});