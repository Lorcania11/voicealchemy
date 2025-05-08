import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Play, Clock, Calendar, Star, Award, Dumbbell } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

interface ExerciseDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  exercise?: {
    id: string;
    title: string;
    description: string;
    duration: string;
    category: string;
    progress: number;
  };
}

export default function ExerciseDetailsModal({
  visible,
  onClose,
  exercise,
}: ExerciseDetailsModalProps) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleStartExercise = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      // In a real app, navigate to the exercise screen
      onClose();
    }, 1000);
  };

  if (!exercise) return null;

  // Exercise steps (sample data)
  const steps = [
    {
      id: '1',
      title: 'Preparation',
      description: 'Find a quiet space with minimal background noise. Sit or stand in a comfortable position with good posture.',
      duration: '1 min',
    },
    {
      id: '2',
      title: 'Warm-up',
      description: 'Take deep breaths and gently stretch your neck and facial muscles to prepare your vocal apparatus.',
      duration: '2 min',
    },
    {
      id: '3',
      title: 'Core Exercise',
      description: 'Practice the main technique, focusing on specific aspects of your voice that need improvement.',
      duration: '5 min',
    },
    {
      id: '4',
      title: 'Practice Application',
      description: 'Apply the technique to real-world scenarios such as sales objections or presentations.',
      duration: '5 min',
    },
    {
      id: '5',
      title: 'Cool Down',
      description: 'Reflect on your performance and areas for improvement in future practice sessions.',
      duration: '2 min',
    }
  ];

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
            <Pressable 
              style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={onClose}
            >
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <Dumbbell size={24} color="#3B82F6" />
              </View>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                {exercise.title}
              </Text>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color={colors.textSecondary} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {exercise.duration}
                  </Text>
                </View>
                <View style={[styles.categoryTag, { backgroundColor: colors.backgroundSecondary }]}>
                  <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
                    {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={[styles.descriptionText, { color: colors.text }]}>
                {exercise.description}
              </Text>
            </View>
            
            <View style={styles.progressSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
              <View style={styles.progressContainer}>
                <ProgressBar progress={exercise.progress} height={8} />
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  {Math.round(exercise.progress * 100)}% Complete
                </Text>
              </View>
            </View>
            
            <View style={styles.benefitsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Benefits</Text>
              <View style={[styles.benefitsContainer, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.benefitItem}>
                  <Star size={18} color="#F59E0B" style={styles.benefitIcon} />
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Improves vocal clarity and projection
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Star size={18} color="#F59E0B" style={styles.benefitIcon} />
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Reduces filler words and hesitations
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Star size={18} color="#F59E0B" style={styles.benefitIcon} />
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    Enhances pitch control for more engaging speech
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.stepsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercise Steps</Text>
              {steps.map((step, index) => (
                <View 
                  key={step.id} 
                  style={[
                    styles.stepItem, 
                    index < steps.length - 1 && styles.stepWithConnector,
                    { borderColor: colors.border }
                  ]}
                >
                  <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: colors.text }]}>
                      {step.title}
                    </Text>
                    <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                      {step.description}
                    </Text>
                    <Text style={[styles.stepDuration, { color: colors.textTertiary }]}>
                      Duration: {step.duration}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={styles.achievementSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievement</Text>
              <View style={[styles.achievementContainer, { backgroundColor: colors.backgroundSecondary }]}>
                <Award size={24} color="#F59E0B" style={styles.achievementIcon} />
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  Voice Mastery Badge
                </Text>
                <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                  Complete this exercise 5 times to earn the Voice Mastery badge.
                </Text>
              </View>
            </View>
          </ScrollView>
          
          <Pressable 
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={handleStartExercise}
            disabled={loading}
          >
            <Play size={18} color="white" style={styles.startIcon} />
            <Text style={styles.startButtonText}>
              {loading ? 'Loading...' : 'Start Exercise'}
            </Text>
          </Pressable>
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
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginBottom: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'right',
  },
  benefitsSection: {
    marginBottom: 24,
  },
  benefitsContainer: {
    padding: 16,
    borderRadius: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  stepsSection: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  stepWithConnector: {
    position: 'relative',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  stepDuration: {
    fontSize: 12,
  },
  achievementSection: {
    marginBottom: 20,
  },
  achievementContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  achievementDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  startIcon: {
    marginRight: 8,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});