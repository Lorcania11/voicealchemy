import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Copy, Check, Search, ArrowRight, Star, BookOpen, Brain } from 'lucide-react-native';

interface SentenceReimaginedModalProps {
  visible: boolean;
  onClose: () => void;
}

const AUDIENCE_TYPES = [
  { id: 'executive', label: 'Executive' },
  { id: 'technical', label: 'Technical' },
  { id: 'general', label: 'General' },
  { id: 'customer', label: 'Customer' },
];

const COMPLEXITY_LEVELS = [
  { id: 'simple', label: 'Simple' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'advanced', label: 'Advanced' },
];

const SAMPLE_RESULTS = [
  {
    id: '1',
    text: "We're implementing a strategic initiative to optimize operational efficiency across all departments.",
    type: 'original'
  },
  {
    id: '2',
    text: "We're creating a plan to help every team work more efficiently.",
    type: 'simple',
    audience: 'general'
  },
  {
    id: '3',
    text: "We're developing a cross-functional efficiency program to reduce operational overhead by standardizing processes.",
    type: 'advanced',
    audience: 'executive'
  },
  {
    id: '4',
    text: "We're building a system that will automate repetitive tasks and standardize workflows across teams.",
    type: 'moderate',
    audience: 'technical'
  },
  {
    id: '5',
    text: "We're rolling out improvements that will make your experience faster and more reliable.",
    type: 'simple',
    audience: 'customer'
  }
];

const SAVED_PHRASES = [
  "Our solution leverages cutting-edge technology to provide seamless integration.",
  "We need to circle back and touch base regarding our go-forward strategy.",
  "The key performance indicators demonstrate significant market penetration."
];

export default function SentenceReimaginedModal({
  visible,
  onClose,
}: SentenceReimaginedModalProps) {
  const { colors, isDark } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedAudience, setSelectedAudience] = useState('general');
  const [selectedComplexity, setSelectedComplexity] = useState('moderate');
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      // Reset state when modal opens
      setInputText('');
      setResults([]);
      setIsProcessing(false);
      setCopiedId(null);
    }
  }, [visible]);

  const handlePhraseSelect = (phrase) => {
    setInputText(phrase);
    setSelectedPhrase(phrase);
  };

  const handleReimagine = () => {
    if (!inputText.trim()) {
      alert("Please enter a sentence to reimagine");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show results based on sample data
      setResults(SAMPLE_RESULTS);
    }, 1500);
  };

  const handleCopy = (id) => {
    // In a real app, this would copy the text to clipboard
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderSavedPhrase = (phrase, index) => {
    const isSelected = phrase === selectedPhrase;
    
    return (
      <Pressable
        key={index}
        style={[
          styles.savedPhrase,
          {
            backgroundColor: isSelected ? colors.primary + '20' : colors.card,
            borderColor: isSelected ? colors.primary : colors.border
          }
        ]}
        onPress={() => handlePhraseSelect(phrase)}
      >
        <Text 
          style={[
            styles.savedPhraseText, 
            { color: colors.text }
          ]}
          numberOfLines={2}
        >
          {phrase}
        </Text>
      </Pressable>
    );
  };

  const renderOptionButton = (option, selected, setSelected) => {
    const isSelected = selected === option.id;
    
    return (
      <Pressable
        key={option.id}
        style={[
          styles.optionButton,
          { 
            backgroundColor: isSelected ? colors.primary : colors.backgroundSecondary,
          }
        ]}
        onPress={() => setSelected(option.id)}
      >
        <Text 
          style={[
            styles.optionButtonText,
            { color: isSelected ? 'white' : colors.text }
          ]}
        >
          {option.label}
        </Text>
      </Pressable>
    );
  };

  const renderResult = (item) => {
    const isCopied = item.id === copiedId;
    
    let badgeText = '';
    let badgeColor = '';
    
    if (item.type === 'original') {
      badgeText = 'Original';
      badgeColor = '#94A3B8'; // gray
    } else {
      badgeText = item.audience.charAt(0).toUpperCase() + item.audience.slice(1);
      
      switch(item.type) {
        case 'simple':
          badgeColor = '#10B981'; // green
          break;
        case 'moderate':
          badgeColor = '#3B82F6'; // blue
          break;
        case 'advanced':
          badgeColor = '#8B5CF6'; // purple
          break;
        default:
          badgeColor = '#94A3B8'; // gray
      }
    }
    
    return (
      <View 
        key={item.id}
        style={[
          styles.resultItem,
          { 
            backgroundColor: colors.backgroundSecondary,
            borderLeftColor: badgeColor,
            borderLeftWidth: 4
          }
        ]}
      >
        <View style={styles.resultHeader}>
          <View style={[styles.resultBadge, { backgroundColor: badgeColor + '20' }]}>
            <Text style={[styles.resultBadgeText, { color: badgeColor }]}>
              {badgeText}
            </Text>
          </View>
          
          <Pressable 
            style={styles.copyButton}
            onPress={() => handleCopy(item.id)}
          >
            {isCopied ? (
              <Check size={16} color="#10B981" />
            ) : (
              <Copy size={16} color={colors.textSecondary} />
            )}
          </Pressable>
        </View>
        
        <Text style={[styles.resultText, { color: colors.text }]}>
          "{item.text}"
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
              Sentence Reimagined
            </Text>
            <Pressable 
              style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={onClose}
            >
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Phrase
            </Text>
            
            <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter a phrase or sentence to reimagine..."
                placeholderTextColor={colors.textTertiary}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              
              {inputText.length > 0 && (
                <Pressable 
                  style={[styles.clearButton, { backgroundColor: colors.background }]}
                  onPress={() => setInputText('')}
                >
                  <X size={16} color={colors.textSecondary} />
                </Pressable>
              )}
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
              Recently Saved Phrases
            </Text>
            
            <View style={styles.savedPhrasesContainer}>
              {SAVED_PHRASES.map(renderSavedPhrase)}
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
              Audience Type
            </Text>
            
            <View style={styles.optionsContainer}>
              {AUDIENCE_TYPES.map(option => 
                renderOptionButton(option, selectedAudience, setSelectedAudience)
              )}
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
              Complexity Level
            </Text>
            
            <View style={styles.optionsContainer}>
              {COMPLEXITY_LEVELS.map(option => 
                renderOptionButton(option, selectedComplexity, setSelectedComplexity)
              )}
            </View>
            
            <Pressable 
              style={[
                styles.reimagineButton, 
                { 
                  backgroundColor: inputText.length > 0 ? colors.primary : colors.backgroundSecondary,
                  opacity: inputText.length > 0 ? 1 : 0.7
                }
              ]}
              onPress={handleReimagine}
              disabled={inputText.length === 0 || isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Brain size={18} color="white" style={styles.reimagineIcon} />
                  <Text style={styles.reimagineButtonText}>
                    Reimagine Sentence
                  </Text>
                </>
              )}
            </Pressable>
            
            {results.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
                  Reimagined Options
                </Text>
                
                <View style={styles.resultsContainer}>
                  {results.map(renderResult)}
                </View>
                
                <View style={styles.tipContainer}>
                  <Star size={16} color={colors.primary} style={styles.tipIcon} />
                  <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                    Tip: Try different audience types and complexity levels for more options.
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
          
          <Pressable 
            style={[styles.doneButton, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={styles.doneButtonText}>Close</Text>
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
  contentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedPhrasesContainer: {
    marginBottom: 8,
  },
  savedPhrase: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  savedPhraseText: {
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reimagineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  reimagineIcon: {
    marginRight: 8,
  },
  reimagineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultItem: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 14,
    borderLeftWidth: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  resultBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  copyButton: {
    padding: 4,
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipIcon: {
    marginRight: 8,
  },
  tipText: {
    fontSize: 13,
    flex: 1,
  },
  doneButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});