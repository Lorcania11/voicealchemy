import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Play, Clock, Calendar, BookOpen, Sparkles, Wind, Brain } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { useTheme } from '@/hooks/useTheme';
import ProgressBar from '@/components/common/ProgressBar';
import VoiceArsenal from '@/components/practice/VoiceArsenal';
import PhysiologicalPrep from '@/components/practice/PhysiologicalPrep';
import ExerciseDetailsModal from '@/components/modals/ExerciseDetailsModal';

// Exercise category data
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'vocal', label: 'Vocal' },
  { id: 'pitch', label: 'Pitch' },
  { id: 'pace', label: 'Pace' },
  { id: 'sales', label: 'Sales' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'physiological', label: 'Breathing' },
  { id: 'preparation', label: 'Prep' },
];

// Sample exercise data
const EXERCISES = [
  {
    id: '1',
    title: 'Pitch Control Fundamentals',
    description: 'Master the basics of controlling your vocal pitch',
    duration: '10 min',
    category: 'pitch',
    progress: 0.25,
  },
  {
    id: '2',
    title: 'Pace Variation Exercise',
    description: 'Learn to effectively vary your speaking pace',
    duration: '15 min',
    category: 'pace',
    progress: 0.6,
  },
  {
    id: '3',
    title: 'Sales Pitch Mastery',
    description: 'Practice persuasive sales communication techniques',
    duration: '20 min',
    category: 'sales',
    progress: 0,
  },
  {
    id: '4',
    title: 'Vocal Warm-up Routine',
    description: 'Essential warm-up exercises for your voice',
    duration: '5 min',
    category: 'vocal',
    progress: 1,
  },
  {
    id: '5',
    title: 'Clarity and Articulation',
    description: 'Improve your speech clarity and articulation',
    duration: '12 min',
    category: 'clarity',
    progress: 0.4,
  },
  {
    id: '6',
    title: 'Tactical Breathing',
    description: 'Military-derived breathing techniques for vocal stability',
    duration: '8 min',
    category: 'physiological',
    progress: 0.2,
  },
  {
    id: '7',
    title: 'Voice Persona Builder',
    description: 'Create situation-specific voice personas for different clients',
    duration: '15 min',
    category: 'preparation',
    progress: 0.7,
  },
  {
    id: '8',
    title: 'Diaphragmatic Breathing',
    description: 'Professional broadcaster breathing techniques',
    duration: '10 min',
    category: 'physiological',
    progress: 0.5,
  },
];

export default function PracticeScreen() {
  const { colors, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('exercises'); // 'exercises', 'arsenal', 'physiological'
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [exerciseDetailsVisible, setExerciseDetailsVisible] = useState(false);
  
  const filteredExercises = selectedCategory === 'all' 
    ? EXERCISES 
    : EXERCISES.filter(ex => ex.category === selectedCategory);
    
  const handleDailyPracticeStart = () => {
    Alert.alert(
      "Start Daily Practice",
      "Ready to begin your daily practice on Sales Objection Handling?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Start",
          onPress: () => {
            // In a real app, this would navigate to the practice session
            Alert.alert("Starting daily practice session...");
          }
        }
      ]
    );
  };
  
  const handleQuickWarmup = () => {
    Alert.alert(
      "3-Minute Voice Tune-up",
      "This quick warm-up will prepare your voice for your upcoming sales call. Ready to begin?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Go",
          onPress: () => {
            // In a real app, this would navigate to the tune-up session
            Alert.alert("Starting voice tune-up...");
          }
        }
      ]
    );
  };
  
  const handleViewAllExercises = () => {
    // In a real app, this would navigate to the full exercise library
    Alert.alert("This would navigate to the full exercise library");
  };
  
  const handleExercisePress = (exercise: any) => {
    setSelectedExercise(exercise);
    setExerciseDetailsVisible(true);
  };

  // Render category pill
  const renderCategoryItem = ({ item }) => (
    <Pressable
      style={[
        styles.categoryPill,
        selectedCategory === item.id && styles.categoryPillSelected,
        { backgroundColor: selectedCategory === item.id ? colors.primary : colors.card }
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text 
        style={[
          styles.categoryPillText,
          { color: selectedCategory === item.id ? 'white' : colors.text }
        ]}
      >
        {item.label}
      </Text>
    </Pressable>
  );

  // Render exercise card
  const renderExerciseItem = ({ item }) => (
    <Pressable 
      style={[styles.exerciseCard, { backgroundColor: colors.card }]}
      onPress={() => handleExercisePress(item)}
    >
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseHeader}>
          <Text style={[styles.exerciseTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <View style={styles.playButton}>
            <Play size={16} color={colors.primary} />
          </View>
        </View>
        
        <Text style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
          {item.description}
        </Text>
        
        <View style={styles.exerciseFooter}>
          <View style={styles.exerciseMeta}>
            <View style={styles.exerciseMetaItem}>
              <Clock size={14} color={colors.textTertiary} />
              <Text style={[styles.exerciseMetaText, { color: colors.textTertiary }]}>
                {item.duration}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <ProgressBar progress={item.progress} />
            <Text style={[styles.progressText, { color: colors.textTertiary }]}>
              {item.progress === 0 ? 'Not started' : 
               item.progress === 1 ? 'Completed' : 
               `${Math.round(item.progress * 100)}%`}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header title="Practice" />
        
        <View style={styles.dailyContainer}>
          <View style={styles.dailyContent}>
            <View>
              <Text style={[styles.dailyLabel, { color: colors.textSecondary }]}>
                TODAY'S PRACTICE
              </Text>
              <Text style={[styles.dailyTitle, { color: colors.text }]}>
                Sales Objection Handling
              </Text>
            </View>
            <Pressable 
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={handleDailyPracticeStart}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </Pressable>
          </View>
          <View style={styles.dailyMeta}>
            <View style={styles.dailyMetaItem}>
              <Calendar size={14} color={colors.textTertiary} />
              <Text style={[styles.dailyMetaText, { color: colors.textTertiary }]}>
                Day 3 of 7
              </Text>
            </View>
            <View style={styles.dailyMetaItem}>
              <Clock size={14} color={colors.textTertiary} />
              <Text style={[styles.dailyMetaText, { color: colors.textTertiary }]}>
                15 minutes
              </Text>
            </View>
          </View>
        </View>
        
        {/* Quick Warm-up Banner */}
        <Pressable 
          style={[styles.quickWarmupBanner, { backgroundColor: '#10B981' }]}
          onPress={handleQuickWarmup}
        >
          <View style={styles.quickWarmupContent}>
            <Sparkles size={24} color="white" style={styles.quickWarmupIcon} />
            <View>
              <Text style={styles.quickWarmupTitle}>3-Minute Voice Tune-up</Text>
              <Text style={styles.quickWarmupDescription}>
                Perfect before your upcoming sales call at 3:00 PM
              </Text>
            </View>
          </View>
          <Text style={styles.quickWarmupButton}>Go</Text>
        </Pressable>
        
        {/* Tab Navigation */}
        <View style={styles.tabsContainer}>
          {renderTabButton('exercises', 'Exercises', BookOpen)}
          {renderTabButton('arsenal', 'Voice Arsenal', Sparkles)}
          {renderTabButton('physiological', 'Physiological', Wind)}
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'exercises' && (
            <>
              <View style={styles.categoriesContainer}>
                <FlatList
                  data={CATEGORIES}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesList}
                />
              </View>
              
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Exercises
                </Text>
                <Pressable 
                  style={styles.viewAllButton}
                  onPress={handleViewAllExercises}
                >
                  <Text style={[styles.viewAllText, { color: colors.primary }]}>
                    View All
                  </Text>
                  <ChevronRight size={16} color={colors.primary} />
                </Pressable>
              </View>
              
              <FlatList
                data={filteredExercises}
                renderItem={renderExerciseItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.exercisesList}
                scrollEnabled={false}
              />
            </>
          )}
          
          {activeTab === 'arsenal' && <VoiceArsenal />}
          
          {activeTab === 'physiological' && <PhysiologicalPrep />}
        </ScrollView>
      </SafeAreaView>
      
      <ExerciseDetailsModal
        visible={exerciseDetailsVisible}
        onClose={() => setExerciseDetailsVisible(false)}
        exercise={selectedExercise}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  dailyContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dailyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E40AF',
  },
  dailyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  startButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  startButtonText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 14,
  },
  dailyMeta: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 64, 175, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dailyMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dailyMetaText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 6,
  },
  quickWarmupBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 15,
  },
  quickWarmupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickWarmupIcon: {
    marginRight: 15,
  },
  quickWarmupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  quickWarmupDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '90%',
  },
  quickWarmupButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  exercisesList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseMeta: {
    flexDirection: 'row',
  },
  exerciseMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseMetaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
  },
});