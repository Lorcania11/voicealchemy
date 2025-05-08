import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Mic, BookOpen, PenLine, Dumbbell } from 'lucide-react-native';

interface RecordingModesProps {
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

export default function RecordingModes({ selectedMode, onSelectMode }: RecordingModesProps) {
  const { colors, isDark } = useTheme();
  
  const modes = [
    {
      id: 'freestyle',
      name: 'Freestyle',
      icon: Mic,
      description: 'Record anything without guidance'
    },
    {
      id: 'guided',
      name: 'Guided',
      icon: BookOpen,
      description: 'Get real-time feedback as you speak'
    },
    {
      id: 'script',
      name: 'Script',
      icon: PenLine,
      description: 'Record from a prepared text'
    },
    {
      id: 'exercise',
      name: 'Exercise',
      icon: Dumbbell,
      description: 'Practice specific voice techniques'
    }
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = selectedMode === mode.id;
        
        return (
          <Pressable
            key={mode.id}
            style={[
              styles.modeCard,
              {
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderColor: isSelected ? colors.primary : colors.border
              }
            ]}
            onPress={() => onSelectMode(mode.id)}
          >
            <View style={[
              styles.iconContainer,
              {
                backgroundColor: isSelected 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : isDark 
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)'
              }
            ]}>
              <Icon 
                size={20} 
                color={isSelected ? 'white' : colors.text} 
              />
            </View>
            
            <Text style={[
              styles.modeName,
              { color: isSelected ? 'white' : colors.text }
            ]}>
              {mode.name}
            </Text>
            
            <Text style={[
              styles.modeDescription,
              { 
                color: isSelected 
                  ? 'rgba(255, 255, 255, 0.8)' 
                  : colors.textSecondary 
              }
            ]}>
              {mode.description}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingRight: 20,
  },
  modeCard: {
    width: 150,
    height: 150,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  modeDescription: {
    fontSize: 12,
    lineHeight: 16,
  }
});