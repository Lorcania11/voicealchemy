import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Heart, TrendingUp, TrendingDown, BarChart, ArrowRight, Sparkles, MessageSquare, RefreshCw } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Sample emotional tones with their characteristics
const EMOTIONAL_TONES = [
  {
    id: 'persuasive',
    name: 'Persuasive',
    description: 'Convincing and influential language focused on benefits and outcomes',
    icon: TrendingUp,
    color: '#3B82F6',
    characteristics: [
      { name: 'Benefit-focused', level: 0.85 },
      { name: 'Clear calls to action', level: 0.9 },
      { name: 'Social proof elements', level: 0.7 },
      { name: 'Second-person pronouns', level: 0.8 },
    ],
    examples: [
      { original: "Our product is good and has many features.", improved: "You'll immediately notice how our solution saves you 5 hours every week while increasing customer satisfaction by 30%." },
      { original: "We should move forward with this plan.", improved: "By implementing this strategy now, you'll secure a competitive advantage that 80% of industry leaders already enjoy." },
    ]
  },
  {
    id: 'empathetic',
    name: 'Empathetic',
    description: 'Understanding and acknowledging the feelings and perspectives of others',
    icon: Heart,
    color: '#EC4899',
    characteristics: [
      { name: 'Acknowledgment phrases', level: 0.9 },
      { name: 'Active listening signals', level: 0.85 },
      { name: 'Emotional validation', level: 0.8 },
      { name: 'Perspective-taking language', level: 0.75 },
    ],
    examples: [
      { original: "We can fix that issue for you.", improved: "I understand how frustrating this situation must be. We're committed to resolving this issue for you immediately." },
      { original: "That deadline won't work for us.", improved: "I appreciate the pressures you're facing with this timeline. Let's explore options that address your needs while working within our constraints." },
    ]
  },
  {
    id: 'confident',
    name: 'Confident',
    description: 'Authoritative and assured language that establishes expertise and trust',
    icon: BarChart,
    color: '#10B981',
    characteristics: [
      { name: 'Decisive statements', level: 0.95 },
      { name: 'Absence of hedging', level: 0.9 },
      { name: 'Clear expertise signals', level: 0.85 },
      { name: 'Outcome certainty', level: 0.8 },
    ],
    examples: [
      { original: "I think we might be able to help with that.", improved: "We will solve this challenge using our proven three-step methodology that has worked for over 200 clients." },
      { original: "This approach could potentially work well.", improved: "This approach delivers consistent results, as demonstrated by our 40% improvement in efficiency metrics across all implementations." },
    ]
  },
  {
    id: 'collaborative',
    name: 'Collaborative',
    description: 'Partnership-oriented language that builds a sense of shared goals',
    icon: MessageSquare,
    color: '#8B5CF6',
    characteristics: [
      { name: 'First-person plural', level: 0.9 },
      { name: 'Inclusive terminology', level: 0.85 },
      { name: 'Mutual benefit framing', level: 0.8 },
      { name: 'Joint problem-solving', level: 0.75 },
    ],
    examples: [
      { original: "You should implement our solution.", improved: "Together, we can implement a solution that aligns with our shared goal of increasing operational efficiency." },
      { original: "I've developed a plan you should follow.", improved: "Let's explore this approach I've developed based on our previous discussions about your team's specific challenges." },
    ]
  },
  {
    id: 'urgent',
    name: 'Urgent',
    description: 'Time-sensitive language that creates a sense of importance and momentum',
    icon: TrendingDown,
    color: '#F59E0B',
    characteristics: [
      { name: 'Timely action phrases', level: 0.9 },
      { name: 'Opportunity cost language', level: 0.85 },
      { name: 'Specific timeframes', level: 0.8 },
      { name: 'Consequence framing', level: 0.75 },
    ],
    examples: [
      { original: "You should consider making a decision about this.", improved: "With only 3 spots remaining and prices increasing next week, securing your position today guarantees the maximum ROI." },
      { original: "It would be good to address this issue.", improved: "Every day this issue remains unresolved costs approximately $5,000 in lost productivity and missed opportunities." },
    ]
  },
];

interface EmotionalToneAnalyzerProps {
  initialText?: string;
}

export default function EmotionalToneAnalyzer({ initialText = '' }: EmotionalToneAnalyzerProps) {
  const { colors, isDark } = useTheme();
  const [inputText, setInputText] = useState(initialText);
  const [selectedTone, setSelectedTone] = useState('confident');
  const [analyzedText, setAnalyzedText] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  
  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    
    // In a real app, this would call an AI service for analysis
    // For demo, we'll simulate analysis results with a predefined tone mapping
    setAnalyzedText(inputText);
    
    // Generate fake analysis results
    const results = {
      tones: [
        { name: 'Confident', score: 0.35, color: '#10B981' },
        { name: 'Persuasive', score: 0.25, color: '#3B82F6' },
        { name: 'Empathetic', score: 0.15, color: '#EC4899' },
        { name: 'Collaborative', score: 0.15, color: '#8B5CF6' },
        { name: 'Urgent', score: 0.10, color: '#F59E0B' },
      ],
      improvements: [
        { 
          original: "I think we might be able to help with this issue.", 
          improved: "We will resolve this issue using our proven methodology.",
          type: "Hedging language",
          explanation: "Replaced uncertain phrasing with confident assertion"
        },
        { 
          original: "Our product has many features.",
          improved: "Our solution delivers the specific capabilities you need to increase productivity by 30%.",
          type: "Generic description",
          explanation: "Added specific value proposition and quantified benefit"
        }
      ]
    };
    
    setAnalysisResults(results);
  };
  
  const handleRephrase = () => {
    if (!inputText.trim() || !selectedTone) return;
    
    // Find the selected tone
    const tone = EMOTIONAL_TONES.find(t => t.id === selectedTone);
    if (!tone) return;
    
    // In a real app, this would call an AI service to rephrase the text
    // For demo, we'll simulate with a sample rephrasing
    let rephrasedText = inputText;
    
    // Simulate enhancement based on tone characteristics
    if (tone.id === 'persuasive') {
      rephrasedText = rephrasedText.replace(
        "Our solution is good.",
        "You'll experience a 25% increase in efficiency with our solution."
      );
    } else if (tone.id === 'empathetic') {
      rephrasedText = rephrasedText.replace(
        "We can't do that.",
        "I understand your needs, and while that specific approach presents challenges, I'd like to explore alternatives that could work for you."
      );
    } else if (tone.id === 'confident') {
      rephrasedText = rephrasedText.replace(
        "I think we can help.",
        "We will deliver results through our proven expertise in this area."
      );
    } else if (tone.id === 'collaborative') {
      rephrasedText = rephrasedText.replace(
        "You should try this approach.",
        "Let's work together to implement this approach for our mutual benefit."
      );
    } else if (tone.id === 'urgent') {
      rephrasedText = rephrasedText.replace(
        "You can decide later.",
        "Acting now secures your competitive advantage while this limited opportunity is available."
      );
    }
    
    // Set the text to the rephrased version
    setInputText(rephrasedText);
  };
  
  const renderToneOption = (tone) => {
    const Icon = tone.icon;
    const isSelected = selectedTone === tone.id;
    
    return (
      <Pressable
        key={tone.id}
        style={[
          styles.toneOption,
          isSelected && styles.toneOptionSelected,
          { 
            backgroundColor: isSelected ? tone.color + '20' : colors.card,
            borderColor: isSelected ? tone.color : colors.border
          }
        ]}
        onPress={() => setSelectedTone(tone.id)}
      >
        <Icon 
          size={20} 
          color={tone.color} 
          style={styles.toneIcon} 
        />
        <Text 
          style={[
            styles.toneName, 
            { color: colors.text }
          ]}
        >
          {tone.name}
        </Text>
      </Pressable>
    );
  };
  
  const renderSelectedToneDetails = () => {
    const tone = EMOTIONAL_TONES.find(t => t.id === selectedTone);
    if (!tone) return null;
    
    const Icon = tone.icon;
    
    return (
      <View style={[styles.toneDetails, { backgroundColor: colors.card }]}>
        <View style={styles.toneHeader}>
          <Icon size={22} color={tone.color} />
          <Text style={[styles.toneDetailName, { color: colors.text }]}>
            {tone.name} Tone
          </Text>
        </View>
        
        <Text style={[styles.toneDescription, { color: colors.textSecondary }]}>
          {tone.description}
        </Text>
        
        <View style={styles.toneCharacteristics}>
          <Text style={[styles.characteristicsTitle, { color: colors.text }]}>
            Key Characteristics:
          </Text>
          
          {tone.characteristics.map((characteristic, index) => (
            <View key={index} style={styles.characteristicItem}>
              <Text style={[styles.characteristicName, { color: colors.textSecondary }]}>
                {characteristic.name}
              </Text>
              <View style={styles.characteristicBar}>
                <ProgressBar 
                  progress={characteristic.level} 
                  height={4}
                  progressColor={tone.color}
                  backgroundColor={colors.backgroundSecondary}
                />
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.examples}>
          <Text style={[styles.examplesTitle, { color: colors.text }]}>
            Examples:
          </Text>
          
          {tone.examples.map((example, index) => (
            <View key={index} style={styles.exampleItem}>
              <View style={[styles.originalText, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.originalTextContent, { color: colors.textSecondary }]}>
                  "{example.original}"
                </Text>
              </View>
              
              <View style={styles.transformationArrow}>
                <ArrowRight size={16} color={tone.color} />
              </View>
              
              <View style={[styles.improvedText, { backgroundColor: tone.color + '15' }]}>
                <Text style={[styles.improvedTextContent, { color: colors.text }]}>
                  "{example.improved}"
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };
  
  const renderAnalysisResults = () => {
    if (!analysisResults) return null;
    
    return (
      <View style={[styles.analysisResults, { backgroundColor: colors.card }]}>
        <Text style={[styles.analysisTitle, { color: colors.text }]}>
          Emotional Tone Analysis
        </Text>
        
        <View style={styles.toneDistribution}>
          <Text style={[styles.distributionTitle, { color: colors.textSecondary }]}>
            Current Tone Distribution:
          </Text>
          
          {analysisResults.tones.map((tone, index) => (
            <View key={index} style={styles.distributionItem}>
              <Text style={[styles.distributionLabel, { color: colors.textSecondary }]}>
                {tone.name}
              </Text>
              <View style={styles.distributionBar}>
                <View 
                  style={[
                    styles.distributionFill, 
                    { width: `${tone.score * 100}%`, backgroundColor: tone.color }
                  ]} 
                />
              </View>
              <Text style={[styles.distributionPercentage, { color: colors.textSecondary }]}>
                {Math.round(tone.score * 100)}%
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.suggestedImprovements}>
          <Text style={[styles.improvementsTitle, { color: colors.textSecondary }]}>
            Suggested Improvements:
          </Text>
          
          {analysisResults.improvements.map((improvement, index) => (
            <View key={index} style={styles.improvementItem}>
              <View style={[styles.originalText, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.originalTextContent, { color: colors.textSecondary }]}>
                  "{improvement.original}"
                </Text>
              </View>
              
              <View style={styles.improvementMetadata}>
                <Text style={[styles.improvementType, { color: colors.primary }]}>
                  {improvement.type}
                </Text>
              </View>
              
              <View style={[styles.improvedText, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.improvedTextContent, { color: colors.text }]}>
                  "{improvement.improved}"
                </Text>
              </View>
              
              <Text style={[styles.improvementExplanation, { color: colors.textSecondary }]}>
                {improvement.explanation}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Emotional Intelligence in Language
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Analyze and optimize your language for the desired emotional impact
      </Text>
      
      <View style={styles.inputSection}>
        <Text style={[styles.inputLabel, { color: colors.text }]}>
          Enter text to analyze or rephrase:
        </Text>
        
        <TextInput
          style={[
            styles.textInput,
            { 
              backgroundColor: colors.backgroundSecondary,
              color: colors.text,
              borderColor: colors.border
            }
          ]}
          placeholder="Type or paste your message here..."
          placeholderTextColor={colors.textTertiary}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={inputText}
          onChangeText={setInputText}
        />
      </View>
      
      <View style={styles.actionButtons}>
        <Pressable 
          style={[
            styles.actionButton, 
            { backgroundColor: colors.primary }
          ]}
          onPress={handleAnalyze}
          disabled={!inputText.trim()}
        >
          <BarChart size={18} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Analyze Tone</Text>
        </Pressable>
        
        <Pressable 
          style={[
            styles.actionButton, 
            { backgroundColor: colors.backgroundSecondary }
          ]}
          onPress={handleRephrase}
          disabled={!inputText.trim()}
        >
          <Sparkles size={18} color={colors.text} style={styles.buttonIcon} />
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Rephrase
          </Text>
        </Pressable>
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Select Target Emotional Tone
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.toneOptions}
      >
        {EMOTIONAL_TONES.map(renderToneOption)}
      </ScrollView>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {renderSelectedToneDetails()}
        
        {analyzedText && renderAnalysisResults()}
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
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    minHeight: 120,
    fontSize: 15,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  toneOptions: {
    paddingBottom: 12,
  },
  toneOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  toneOptionSelected: {
    borderWidth: 2,
  },
  toneIcon: {
    marginRight: 8,
  },
  toneName: {
    fontWeight: '500',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  toneDetails: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  toneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toneDetailName: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  toneDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  toneCharacteristics: {
    marginBottom: 16,
  },
  characteristicsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  characteristicItem: {
    marginBottom: 12,
  },
  characteristicName: {
    fontSize: 14,
    marginBottom: 4,
  },
  characteristicBar: {
    width: '100%',
  },
  examples: {
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  exampleItem: {
    marginBottom: 16,
  },
  originalText: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  originalTextContent: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  transformationArrow: {
    alignSelf: 'center',
    marginVertical: 4,
  },
  improvedText: {
    padding: 12,
    borderRadius: 8,
  },
  improvedTextContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  analysisResults: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  toneDistribution: {
    marginBottom: 20,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionLabel: {
    width: 100,
    fontSize: 14,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionPercentage: {
    width: 40,
    fontSize: 14,
    textAlign: 'right',
  },
  suggestedImprovements: {
  },
  improvementsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  improvementItem: {
    marginBottom: 16,
  },
  improvementMetadata: {
    marginVertical: 6,
  },
  improvementType: {
    fontSize: 13,
    fontWeight: '600',
  },
  improvementExplanation: {
    fontSize: 13,
    marginTop: 6,
    fontStyle: 'italic',
  }
});