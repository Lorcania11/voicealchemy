import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { BookOpen, Sparkles, Star, MessageSquare, Lightbulb, RefreshCw, Book, Scale, Compass, History, Award, GraduationCap, ArrowRight, PenTool, Send, Copy, Heart, Bookmark, Clock, ChartBar as BarChart4 } from 'lucide-react-native';
import ProgressBar from '@/components/common/ProgressBar';

// Sample metaphor templates
const METAPHOR_TEMPLATES = [
  {
    id: '1',
    title: 'Bridge Metaphor',
    description: 'Connect a complex concept to something familiar',
    prompt: 'Our solution is like a bridge that connects...',
    example: 'Our analytics platform is like a bridge that connects the islands of your data, allowing you to travel freely between insights that were previously isolated.',
    category: 'explanation'
  },
  {
    id: '2',
    title: 'Journey Metaphor',
    description: 'Frame your solution as a journey or path',
    prompt: 'Working with us is a journey where...',
    example: 'Working with us is a journey where we start by mapping your current terrain, identify the mountains worth climbing, and equip you with the right tools to reach the summit.',
    category: 'process'
  },
  {
    id: '3',
    title: 'Gardening Metaphor',
    description: 'Relate business growth to plant growth',
    prompt: 'Think of your business as a garden where...',
    example: 'Think of your business as a garden where our solution provides not just water, but the perfect soil conditions and climate control to help your ideas bloom into their fullest potential.',
    category: 'growth'
  },
  {
    id: '4',
    title: 'Medical Metaphor',
    description: 'Compare your solution to medical treatment',
    prompt: 'Our approach doesn\'t just treat the symptoms, it...',
    example: 'Our approach doesn\'t just treat the symptoms, it provides a full diagnostic of your operation\'s health and delivers a custom treatment plan that addresses the root causes of inefficiency.',
    category: 'solution'
  },
  {
    id: '5',
    title: 'Sports Metaphor',
    description: 'Use sports concepts to explain business strategy',
    prompt: 'We\'re not just players in this industry, we\'re...',
    example: 'We\'re not just players in this industry, we\'re your dedicated coaches, analyzing your competition\'s playbook and developing strategies that put you in a position to win, quarter after quarter.',
    category: 'strategy'
  },
];

// Sample storytelling frameworks
const STORYTELLING_FRAMEWORKS = [
  {
    id: '1',
    title: 'Problem-Solution-Result',
    description: 'Classic framework focusing on the customer\'s pain points',
    steps: [
      { name: 'Problem', description: 'Describe the pain point or challenge' },
      { name: 'Solution', description: 'Introduce your solution' },
      { name: 'Result', description: 'Share the positive outcome' }
    ],
    example: 'A manufacturing client was losing $2M annually due to supply chain disruptions. We implemented our predictive analytics solution. They\'ve reduced stockouts by 70% and saved $1.4M in the first year alone.'
  },
  {
    id: '2',
    title: 'Hero\'s Journey',
    description: 'Position the client as the hero facing a challenge',
    steps: [
      { name: 'Ordinary World', description: 'Describe the client\'s current situation' },
      { name: 'Call to Adventure', description: 'Introduce the challenge or opportunity' },
      { name: 'Meeting the Mentor', description: 'Position your solution as the guide' },
      { name: 'Transformation', description: 'Describe the journey of implementation' },
      { name: 'Return with Elixir', description: 'Showcase the transformed business' }
    ],
    example: 'When FutureTech started, they were operating like most mid-sized companies, using disconnected systems. Market disruption threatened their business model. That\'s when they found our integrated platform. The implementation journey wasn\'t always easy, but their team emerged with a 40% more efficient operation and are now industry leaders in digital transformation.'
  },
  {
    id: '3',
    title: 'Contrast Framework',
    description: 'Compare before and after states for maximum impact',
    steps: [
      { name: 'Before', description: 'Paint a vivid picture of the problematic status quo' },
      { name: 'Turning Point', description: 'Introduce your solution as the catalyst' },
      { name: 'After', description: 'Describe the transformed reality in detail' }
    ],
    example: 'Before implementing our system, their sales team spent 12 hours weekly just generating reports. Customer data lived in six different systems, and insights were always retrospective. Then came the turning point with our platform. Now, they access real-time dashboards with predictive insights, spending those 12 hours on actual customer engagement instead, leading to a 23% increase in sales.'
  },
  {
    id: '4',
    title: 'Value-in-Action',
    description: 'Demonstrate your value through specific scenarios',
    steps: [
      { name: 'Situation', description: 'Set the scene with a specific scenario' },
      { name: 'Complication', description: 'Introduce the challenge' },
      { name: 'Value Delivery', description: 'Show your solution in action' },
      { name: 'Outcome', description: 'Quantify the positive impact' }
    ],
    example: 'During Black Friday, our client\'s website traffic increased by 800%. In the past, this would have crashed their systems. Our elastic cloud solution automatically scaled to handle the 1.2M visitors, maintained 99.99% uptime, and helped them process 3x more orders than their previous record.'
  },
];

// Traditional wisdom categories
const WISDOM_CATEGORIES = [
  { id: 'proverbs', name: 'Classic Proverbs', icon: Book, color: '#3B82F6' },
  { id: 'business', name: 'Business Wisdom', icon: GraduationCap, color: '#10B981' },
  { id: 'cultural', name: 'Cultural Aphorisms', icon: Compass, color: '#8B5CF6' },
  { id: 'industry', name: 'Industry Wisdom', icon: Scale, color: '#EC4899' },
  { id: 'historical', name: 'Historical Sayings', icon: History, color: '#F59E0B' },
];

// Sample wisdom vault data
const TRADITIONAL_WISDOM = [
  {
    id: '1',
    text: "A penny saved is a penny earned.",
    category: 'proverbs',
    origin: 'Benjamin Franklin',
    modernVersion: "Every expense reduced directly improves your bottom line.",
    businessContext: "Cost management, operational efficiency",
    effectiveness: 85
  },
  {
    id: '2',
    text: "Don't put all your eggs in one basket.",
    category: 'proverbs',
    origin: 'Traditional',
    modernVersion: "Diversify your investments and strategies to mitigate risk.",
    businessContext: "Risk management, portfolio strategy",
    effectiveness: 92
  },
  {
    id: '3',
    text: "The tallest tree catches the most wind.",
    category: 'cultural',
    origin: 'Chinese proverb',
    modernVersion: "Market leaders face the greatest scrutiny and challenges.",
    businessContext: "Leadership, industry positioning",
    effectiveness: 78
  },
  {
    id: '4',
    text: "What gets measured gets managed.",
    category: 'business',
    origin: 'Peter Drucker',
    modernVersion: "You can only improve what you track with meaningful metrics.",
    businessContext: "Performance management, analytics",
    effectiveness: 90
  },
  {
    id: '5',
    text: "Measure twice, cut once.",
    category: 'industry',
    origin: 'Carpentry proverb',
    modernVersion: "Thorough planning prevents costly implementation errors.",
    businessContext: "Project planning, execution strategy",
    effectiveness: 88
  },
  {
    id: '6',
    text: "Rome wasn't built in a day.",
    category: 'historical',
    origin: 'Medieval French proverb',
    modernVersion: "Significant achievements require time, persistence and systematic effort.",
    businessContext: "Growth strategy, expectation management",
    effectiveness: 82
  },
  {
    id: '7',
    text: "The cobbler's children have no shoes.",
    category: 'proverbs',
    origin: 'Traditional',
    modernVersion: "Companies often neglect applying their expertise to their own operations.",
    businessContext: "Internal process improvement, resource allocation",
    effectiveness: 75
  },
  {
    id: '8',
    text: "The rising tide lifts all boats.",
    category: 'business',
    origin: 'John F. Kennedy',
    modernVersion: "A growing market creates opportunities for all participants.",
    businessContext: "Market analysis, economic trends",
    effectiveness: 80
  },
];

// Sample contextual suggestions
const CONTEXTUAL_SUGGESTIONS = {
  opening: [
    { id: '1', text: "Well begun is half done.", origin: "Aristotle", explanation: "Starting strong sets the foundation for success." },
    { id: '2', text: "First impressions are the most lasting.", origin: "Traditional", explanation: "Emphasize the importance of your opening moments." }
  ],
  objections: [
    { id: '3', text: "The obstacle is the path.", origin: "Zen proverb", explanation: "Reframe objections as opportunities to demonstrate value." },
    { id: '4', text: "Between the hammer and the anvil.", origin: "Traditional", explanation: "Acknowledge the challenging position of decision-makers." }
  ],
  closing: [
    { id: '5', text: "Strike while the iron is hot.", origin: "Traditional", explanation: "Emphasize the timeliness of acting now." },
    { id: '6', text: "The journey of a thousand miles begins with a single step.", origin: "Laozi", explanation: "Make taking the first step seem manageable." }
  ],
  pricing: [
    { id: '7', text: "The bitterness of poor quality remains long after the sweetness of low price is forgotten.", origin: "Benjamin Franklin", explanation: "Justify premium pricing with value perspective." },
    { id: '8', text: "Price is what you pay, value is what you get.", origin: "Warren Buffett", explanation: "Shift focus from cost to return on investment." }
  ]
};

// Sample analogies
const ANALOGICAL_REASONING = [
  {
    id: '1',
    baseAnalogy: "Time is money.",
    derivedAnalogies: [
      "Attention is currency.",
      "Data is the new oil.",
      "Knowledge is capital."
    ],
    businessApplications: [
      "Just as you budget money carefully, allocate your team's attention deliberately.",
      "Like financial investments, knowledge investments compound over time."
    ]
  },
  {
    id: '2',
    baseAnalogy: "Don't put all your eggs in one basket.",
    derivedAnalogies: [
      "Don't build your strategy on a single market trend.",
      "Don't tie your revenue to a single customer segment.",
      "Don't limit innovations to one product line."
    ],
    businessApplications: [
      "Create a balanced portfolio of initiatives across different risk levels.",
      "Develop multiple channels for customer acquisition and retention."
    ]
  }
];

interface MetaphorStorytellingToolProps {
  industryContext?: string;
}

export default function MetaphorStorytellingTool({ 
  industryContext = 'technology' 
}: MetaphorStorytellingToolProps) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('wisdom'); // 'metaphors', 'storytelling', or 'wisdom'
  const [currentInput, setCurrentInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedFramework, setSelectedFramework] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('proverbs');
  const [selectedContext, setSelectedContext] = useState('opening');
  const [selectedWisdom, setSelectedWisdom] = useState<any>(null);
  const [customizedWisdom, setCustomizedWisdom] = useState('');
  const [selectedAnalogy, setSelectedAnalogy] = useState<any>(null);
  
  const handleGenerateMetaphor = () => {
    if (!currentInput.trim() || !selectedTemplate) {
      Alert.alert('Input Required', 'Please enter your concept and select a template');
      return;
    }
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const concept = currentInput.trim();
      const template = selectedTemplate;
      // In a real app, this would call an AI service
      const generatedMetaphor = `${template.prompt.replace('...', '')} ${concept}, providing a pathway to clarity that transforms complexity into actionable insights, much like a skilled translator converts foreign languages into your native tongue.`;
      
      setGeneratedContent(generatedMetaphor);
    }, 1500);
  };
  
  const handleGenerateStory = () => {
    if (!currentInput.trim() || !selectedFramework) {
      Alert.alert('Input Required', 'Please enter your scenario and select a framework');
      return;
    }
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const scenario = currentInput.trim();
      const framework = selectedFramework;
      
      // In a real app, this would call an AI service
      let generatedStory = `Using the ${framework.title} framework for your scenario about "${scenario}":\n\n`;
      
      framework.steps.forEach(step => {
        generatedStory += `${step.name}: [Insert specific details about ${step.description.toLowerCase()} here]\n\n`;
      });
      
      generatedStory += 'Example structure based on your input:\n\n';
      generatedStory += framework.example;
      
      setGeneratedContent(generatedStory);
    }, 1500);
  };

  const handleCustomizeWisdom = () => {
    if (!selectedWisdom) {
      Alert.alert('Selection Required', 'Please select a traditional saying to customize');
      return;
    }

    // Simulate AI generation for customized wisdom
    setTimeout(() => {
      const customized = `In the digital landscape of ${industryContext}, ${selectedWisdom.modernVersion.toLowerCase()} This creates a foundation for sustainable growth that outperforms quick-fix solutions.`;
      
      setCustomizedWisdom(customized);
    }, 800);
  };

  const handleSaveToLibrary = (content) => {
    Alert.alert(
      'Saved to Library',
      'This saying has been added to your personal wisdom library for easy reference in future communications.',
      [{ text: 'OK' }]
    );
  };
  
  const handleSaveContent = () => {
    if (!generatedContent) return;
    
    // In a real app, this would save to database
    Alert.alert(
      'Content Saved',
      'Your content has been saved to your library for future reference.',
      [{ text: 'OK' }]
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
        onPress={() => {
          setActiveTab(id);
          setGeneratedContent(null);
          setSelectedTemplate(null);
          setSelectedFramework(null);
          setCurrentInput('');
          setCustomizedWisdom('');
        }}
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
  
  const renderMetaphorTemplate = (template) => {
    const isSelected = selectedTemplate?.id === template.id;
    
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
        onPress={() => setSelectedTemplate(template)}
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
        
        <View style={[styles.exampleContainer, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>Example: </Text>
            {template.example}
          </Text>
        </View>
      </Pressable>
    );
  };
  
  const renderStorytellingFramework = (framework) => {
    const isSelected = selectedFramework?.id === framework.id;
    
    return (
      <Pressable
        key={framework.id}
        style={[
          styles.frameworkCard, 
          isSelected && styles.frameworkCardSelected,
          { 
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
          }
        ]}
        onPress={() => setSelectedFramework(framework)}
      >
        <View style={styles.frameworkHeader}>
          <Text style={[styles.frameworkTitle, { color: colors.text }]}>
            {framework.title}
          </Text>
          {isSelected && (
            <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.selectedBadgeText}>Selected</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.frameworkDescription, { color: colors.textSecondary }]}>
          {framework.description}
        </Text>
        
        <View style={styles.stepsContainer}>
          {framework.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepName, { color: colors.text }]}>{step.name}</Text>
                <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                  {step.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Pressable>
    );
  };

  const renderTraditionalWisdom = () => {
    return (
      <>
        <Text style={[styles.wisdomTitle, { color: colors.text }]}>
          Wisdom Vault
        </Text>
        
        <Text style={[styles.wisdomDescription, { color: colors.textSecondary }]}>
          Timeless traditional sayings and aphorisms to enhance your communication with depth and cultural resonance
        </Text>

        <View style={styles.categorySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {WISDOM_CATEGORIES.map(category => {
              const isSelected = selectedCategory === category.id;
              return (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryPill,
                    { 
                      backgroundColor: isSelected ? category.color : colors.backgroundSecondary,
                    }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <category.icon size={14} color={isSelected ? 'white' : category.color} style={styles.categoryIcon} />
                  <Text style={[styles.categoryText, { color: isSelected ? 'white' : colors.text }]}>
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.wisdomItems}>
          {TRADITIONAL_WISDOM
            .filter(item => item.category === selectedCategory || selectedCategory === 'all')
            .map((wisdom) => {
              const isSelected = selectedWisdom?.id === wisdom.id;
              return (
                <Pressable
                  key={wisdom.id}
                  style={[
                    styles.wisdomCard, 
                    { 
                      backgroundColor: colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    }
                  ]}
                  onPress={() => setSelectedWisdom(wisdom)}
                >
                  <View style={styles.wisdomHeader}>
                    <Text style={[styles.wisdomText, { color: colors.text }]}>
                      "{wisdom.text}"
                    </Text>
                  </View>
                  
                  <View style={[styles.wisdomOrigin, { backgroundColor: colors.backgroundSecondary }]}>
                    <History size={12} color={colors.textSecondary} />
                    <Text style={[styles.wisdomOriginText, { color: colors.textSecondary }]}>
                      {wisdom.origin}
                    </Text>
                  </View>
                  
                  <View style={styles.wisdomDetails}>
                    <Text style={[styles.wisdomDetailLabel, { color: colors.textTertiary }]}>
                      Modern Application:
                    </Text>
                    <Text style={[styles.wisdomDetailText, { color: colors.text }]}>
                      {wisdom.modernVersion}
                    </Text>
                  </View>
                  
                  <View style={styles.wisdomMeta}>
                    <View style={styles.wisdomContext}>
                      <Text style={[styles.wisdomContextText, { color: colors.textSecondary }]}>
                        {wisdom.businessContext}
                      </Text>
                    </View>
                    <View style={[styles.wisdomEffectiveness, { backgroundColor: `rgba(16, 185, 129, ${wisdom.effectiveness / 100})` }]}>
                      <Text style={styles.wisdomEffectivenessText}>
                        {wisdom.effectiveness}%
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.wisdomActions}>
                    <Pressable 
                      style={[styles.wisdomAction, { backgroundColor: colors.backgroundSecondary }]}
                      onPress={() => handleSaveToLibrary(wisdom)}
                    >
                      <Bookmark size={14} color={colors.primary} style={styles.wisdomActionIcon} />
                      <Text style={[styles.wisdomActionText, { color: colors.text }]}>Save</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.wisdomAction, { backgroundColor: colors.primary }]}
                      onPress={() => {
                        setSelectedWisdom(wisdom);
                        handleCustomizeWisdom();
                      }}
                    >
                      <PenTool size={14} color="white" style={styles.wisdomActionIcon} />
                      <Text style={[styles.wisdomActionText, { color: 'white' }]}>Customize</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
          Contextual Suggestion Engine
        </Text>

        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Get context-aware traditional wisdom for different parts of your communication
        </Text>

        <View style={styles.contextSelector}>
          {Object.keys(CONTEXTUAL_SUGGESTIONS).map(context => {
            const isSelected = selectedContext === context;
            return (
              <Pressable
                key={context}
                style={[
                  styles.contextButton,
                  { 
                    backgroundColor: isSelected ? colors.primary : colors.backgroundSecondary,
                  }
                ]}
                onPress={() => setSelectedContext(context)}
              >
                <Text style={[styles.contextButtonText, { color: isSelected ? 'white' : colors.text }]}>
                  {context.charAt(0).toUpperCase() + context.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.contextSuggestions, { backgroundColor: colors.card }]}>
          <Text style={[styles.contextTitle, { color: colors.text }]}>
            Suggestions for {selectedContext.charAt(0).toUpperCase() + selectedContext.slice(1)}
          </Text>
          
          {CONTEXTUAL_SUGGESTIONS[selectedContext]?.map(suggestion => (
            <View key={suggestion.id} style={[styles.suggestionItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.suggestionText, { color: colors.text }]}>
                "{suggestion.text}"
              </Text>
              <View style={styles.suggestionMeta}>
                <Text style={[styles.suggestionOrigin, { color: colors.textSecondary }]}>
                  — {suggestion.origin}
                </Text>
                <Pressable style={styles.copyButton} onPress={() => {
                  Alert.alert('Copied', 'Saying copied to clipboard');
                }}>
                  <Copy size={16} color={colors.primary} />
                </Pressable>
              </View>
              <Text style={[styles.suggestionExplanation, { color: colors.textSecondary }]}>
                {suggestion.explanation}
              </Text>
            </View>
          ))}
          
          <Pressable 
            style={[styles.generateMoreButton, { backgroundColor: colors.primary }]}
            onPress={() => Alert.alert('Generate More', 'This would generate additional suggestions based on your specific meeting or communication context.')}
          >
            <Sparkles size={16} color="white" style={styles.generateMoreIcon} />
            <Text style={styles.generateMoreText}>Generate Personalized Suggestions</Text>
          </Pressable>
        </View>

        {customizedWisdom && (
          <View style={[styles.customizedContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.customizedTitle, { color: colors.text }]}>
              Customized for {industryContext.charAt(0).toUpperCase() + industryContext.slice(1)}
            </Text>
            
            <Text style={[styles.customizedText, { color: colors.text }]}>
              "{customizedWisdom}"
            </Text>
            
            <View style={styles.customizedActions}>
              <Pressable 
                style={[styles.customizedAction, { backgroundColor: colors.backgroundSecondary }]}
                onPress={() => {
                  Alert.alert('Regenerate', 'This would generate a new customization of the selected wisdom.');
                  handleCustomizeWisdom();
                }}
              >
                <RefreshCw size={16} color={colors.text} style={styles.customizedActionIcon} />
                <Text style={[styles.customizedActionText, { color: colors.text }]}>Regenerate</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.customizedAction, { backgroundColor: colors.primary }]}
                onPress={() => handleSaveToLibrary(customizedWisdom)}
              >
                <Bookmark size={16} color="white" style={styles.customizedActionIcon} />
                <Text style={[styles.customizedActionText, { color: 'white' }]}>Save to Library</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
          Analogical Reasoning
        </Text>

        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Explore powerful analogies based on traditional wisdom to enhance your messaging
        </Text>

        <View style={styles.analogyItems}>
          {ANALOGICAL_REASONING.map(analogy => {
            const isSelected = selectedAnalogy?.id === analogy.id;
            return (
              <Pressable
                key={analogy.id}
                style={[
                  styles.analogyCard, 
                  { 
                    backgroundColor: colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedAnalogy(analogy)}
              >
                <Text style={[styles.baseAnalogyText, { color: colors.text }]}>
                  "{analogy.baseAnalogy}"
                </Text>
                
                <View style={[styles.derivedAnalogies, { backgroundColor: colors.backgroundSecondary }]}>
                  <Text style={[styles.derivedTitle, { color: colors.textSecondary }]}>
                    Modern Variations:
                  </Text>
                  
                  {analogy.derivedAnalogies.map((derived, index) => (
                    <View key={index} style={styles.derivedItem}>
                      <ArrowRight size={14} color={colors.primary} style={styles.derivedIcon} />
                      <Text style={[styles.derivedText, { color: colors.text }]}>
                        "{derived}"
                      </Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.applicationContainer}>
                  <Text style={[styles.applicationTitle, { color: colors.textSecondary }]}>
                    Business Applications:
                  </Text>
                  
                  {analogy.businessApplications.map((application, index) => (
                    <Text key={index} style={[styles.applicationText, { color: colors.text }]}>
                      • {application}
                    </Text>
                  ))}
                </View>
                
                <Pressable 
                  style={[styles.customizeButton, { backgroundColor: colors.primary }]}
                  onPress={() => Alert.alert('Create Custom Analogy', 'This would open the analogy builder to create your own variation based on this traditional wisdom.')}
                >
                  <PenTool size={14} color="white" style={styles.customizeIcon} />
                  <Text style={styles.customizeText}>Create Custom Analogy</Text>
                </Pressable>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.wisdomLibraryCard, { backgroundColor: colors.card }]}>
          <View style={styles.wisdomLibraryHeader}>
            <BookOpen size={20} color={colors.primary} />
            <Text style={[styles.wisdomLibraryTitle, { color: colors.text }]}>
              Your Personal Wisdom Library
            </Text>
          </View>
          
          <Text style={[styles.wisdomLibraryDescription, { color: colors.textSecondary }]}>
            Build your collection of effective sayings organized by use case and context
          </Text>
          
          <View style={styles.wisdomLibraryStats}>
            <View style={styles.wisdomLibraryStat}>
              <Text style={[styles.wisdomLibraryStatValue, { color: colors.text }]}>32</Text>
              <Text style={[styles.wisdomLibraryStatLabel, { color: colors.textSecondary }]}>Saved Items</Text>
            </View>
            <View style={styles.wisdomLibraryStat}>
              <Text style={[styles.wisdomLibraryStatValue, { color: colors.text }]}>8</Text>
              <Text style={[styles.wisdomLibraryStatLabel, { color: colors.textSecondary }]}>Collections</Text>
            </View>
            <View style={styles.wisdomLibraryStat}>
              <Text style={[styles.wisdomLibraryStatValue, { color: colors.text }]}>24</Text>
              <Text style={[styles.wisdomLibraryStatLabel, { color: colors.textSecondary }]}>Times Used</Text>
            </View>
          </View>
          
          <Pressable 
            style={[styles.wisdomLibraryButton, { backgroundColor: colors.primary }]}
            onPress={() => Alert.alert('Wisdom Library', 'This would open your personal library of saved wisdom and aphorisms.')}
          >
            <Text style={styles.wisdomLibraryButtonText}>View My Library</Text>
          </Pressable>
        </View>

        <View style={[styles.analyticsCard, { backgroundColor: colors.card }]}>
          <View style={styles.analyticsHeader}>
            <BarChart4 size={20} color={colors.primary} />
            <Text style={[styles.analyticsTitle, { color: colors.text }]}>
              Wisdom Effectiveness
            </Text>
          </View>
          
          <Text style={[styles.analyticsDescription, { color: colors.textSecondary }]}>
            Analytics on which traditional sayings have the most impact with your audience
          </Text>
          
          <View style={styles.analyticsData}>
            <View style={[styles.analyticsChart, { backgroundColor: colors.backgroundSecondary }]}>
              <View style={styles.chartItem}>
                <View style={styles.chartLabel}>
                  <Text style={[styles.chartLabelText, { color: colors.textSecondary }]}>
                    Classic proverbs
                  </Text>
                </View>
                <View style={styles.chartBar}>
                  <View style={[styles.chartFill, { width: '85%', backgroundColor: '#3B82F6' }]} />
                </View>
                <Text style={[styles.chartValue, { color: colors.text }]}>85%</Text>
              </View>
              
              <View style={styles.chartItem}>
                <View style={styles.chartLabel}>
                  <Text style={[styles.chartLabelText, { color: colors.textSecondary }]}>
                    Business wisdom
                  </Text>
                </View>
                <View style={styles.chartBar}>
                  <View style={[styles.chartFill, { width: '92%', backgroundColor: '#10B981' }]} />
                </View>
                <Text style={[styles.chartValue, { color: colors.text }]}>92%</Text>
              </View>
              
              <View style={styles.chartItem}>
                <View style={styles.chartLabel}>
                  <Text style={[styles.chartLabelText, { color: colors.textSecondary }]}>
                    Cultural aphorisms
                  </Text>
                </View>
                <View style={styles.chartBar}>
                  <View style={[styles.chartFill, { width: '78%', backgroundColor: '#8B5CF6' }]} />
                </View>
                <Text style={[styles.chartValue, { color: colors.text }]}>78%</Text>
              </View>
              
              <View style={styles.chartItem}>
                <View style={styles.chartLabel}>
                  <Text style={[styles.chartLabelText, { color: colors.textSecondary }]}>
                    Industry specific
                  </Text>
                </View>
                <View style={styles.chartBar}>
                  <View style={[styles.chartFill, { width: '88%', backgroundColor: '#EC4899' }]} />
                </View>
                <Text style={[styles.chartValue, { color: colors.text }]}>88%</Text>
              </View>
            </View>
            
            <Pressable 
              style={[styles.analyticsButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={() => Alert.alert('Detailed Analytics', 'This would open detailed analytics on the effectiveness of different types of traditional wisdom in your communications.')}
            >
              <Text style={[styles.analyticsButtonText, { color: colors.text }]}>View Detailed Analytics</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.toolTitle, { color: colors.text }]}>
        Wisdom & Storytelling Tool
      </Text>
      
      <Text style={[styles.toolDescription, { color: colors.textSecondary }]}>
        Create powerful content using traditional wisdom, metaphors and compelling stories
      </Text>
      
      <View style={styles.tabsContainer}>
        {renderTabButton('wisdom', 'Wisdom Vault', BookOpen)}
        {renderTabButton('metaphors', 'Metaphors', Sparkles)}
        {renderTabButton('storytelling', 'Storytelling', MessageSquare)}
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {activeTab === 'wisdom' && renderTraditionalWisdom()}
        
        {activeTab === 'metaphors' && (
          <>
            <View style={styles.inputSection}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                What concept would you like to explain with a metaphor?
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Enter the concept or idea (e.g., 'our data analytics solution')"
                placeholderTextColor={colors.textTertiary}
                value={currentInput}
                onChangeText={setCurrentInput}
                multiline
              />
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Select a Metaphor Template
            </Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templatesContainer}
            >
              {METAPHOR_TEMPLATES.map(renderMetaphorTemplate)}
            </ScrollView>
            
            <View style={styles.actionContainer}>
              <Pressable 
                style={[
                  styles.generateButton, 
                  { 
                    backgroundColor: 
                      selectedTemplate && currentInput
                        ? colors.primary 
                        : colors.backgroundSecondary,
                    opacity: 
                      selectedTemplate && currentInput
                        ? 1 
                        : 0.7
                  }
                ]}
                onPress={handleGenerateMetaphor}
                disabled={!selectedTemplate || !currentInput}
              >
                <Sparkles size={18} color="white" style={styles.buttonIcon} />
                <Text style={styles.generateButtonText}>
                  Generate Metaphor
                </Text>
              </Pressable>
            </View>
          </>
        )}
        
        {activeTab === 'storytelling' && (
          <>
            <View style={styles.inputSection}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                What scenario or solution would you like to craft a story around?
              </Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Describe your scenario (e.g., 'how our solution helped a client overcome supply chain issues')"
                placeholderTextColor={colors.textTertiary}
                value={currentInput}
                onChangeText={setCurrentInput}
                multiline
              />
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Select a Storytelling Framework
            </Text>
            
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.frameworksContainer}
            >
              {STORYTELLING_FRAMEWORKS.map(renderStorytellingFramework)}
            </ScrollView>
            
            <View style={styles.actionContainer}>
              <Pressable 
                style={[
                  styles.generateButton, 
                  { 
                    backgroundColor: 
                      selectedFramework && currentInput
                        ? colors.primary 
                        : colors.backgroundSecondary,
                    opacity: 
                      selectedFramework && currentInput
                        ? 1 
                        : 0.7
                  }
                ]}
                onPress={handleGenerateStory}
                disabled={!selectedFramework || !currentInput}
              >
                <Sparkles size={18} color="white" style={styles.buttonIcon} />
                <Text style={styles.generateButtonText}>
                  Generate Story
                </Text>
              </Pressable>
            </View>
          </>
        )}
        
        {generatedContent && (
          <View style={[styles.resultContainer, { backgroundColor: colors.card }]}>
            <View style={styles.resultHeader}>
              <Text style={[styles.resultTitle, { color: colors.text }]}>
                {activeTab === 'metaphors' ? 'Generated Metaphor' : 'Storytelling Framework'}
              </Text>
              <Pressable
                style={[styles.saveButton, { backgroundColor: colors.primary + '20' }]}
                onPress={handleSaveContent}
              >
                <Star size={16} color={colors.primary} />
                <Text style={[styles.saveButtonText, { color: colors.primary }]}>Save</Text>
              </Pressable>
            </View>
            
            <Text style={[styles.resultContent, { color: colors.text }]}>
              {generatedContent}
            </Text>
            
            <View style={styles.feedbackContainer}>
              <Text style={[styles.feedbackText, { color: colors.textSecondary }]}>
                Was this useful?
              </Text>
              <View style={styles.feedbackButtons}>
                <Pressable 
                  style={[styles.feedbackButton, { backgroundColor: colors.backgroundSecondary }]}
                >
                  <MessageSquare size={14} color={colors.textSecondary} />
                  <Text style={[styles.feedbackButtonText, { color: colors.textSecondary }]}>
                    Feedback
                  </Text>
                </Pressable>
                
                <Pressable 
                  style={[styles.regenerateButton, { backgroundColor: colors.backgroundSecondary }]}
                  onPress={activeTab === 'metaphors' ? handleGenerateMetaphor : handleGenerateStory}
                >
                  <RefreshCw size={14} color={colors.textSecondary} />
                  <Text style={[styles.feedbackButtonText, { color: colors.textSecondary }]}>
                    Regenerate
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.tipsContainer}>
          <View style={[styles.tipCard, { backgroundColor: colors.card }]}>
            <Lightbulb size={18} color={colors.primary} style={styles.tipIcon} />
            <Text style={[styles.tipTitle, { color: colors.text }]}>
              Pro Tip: {activeTab === 'metaphors' 
                ? 'Metaphors' 
                : activeTab === 'storytelling' 
                  ? 'Stories' 
                  : 'Traditional Wisdom'}
            </Text>
            <Text style={[styles.tipContent, { color: colors.textSecondary }]}>
              {activeTab === 'wisdom' 
                ? 'Traditional wisdom resonates deeply because it taps into shared cultural understanding. For maximum impact, choose sayings that reflect your audience\'s cultural background.'
                : activeTab === 'metaphors' 
                  ? 'The best metaphors connect abstract concepts to concrete experiences your audience can visualize. Make it relevant to their industry or interests.'
                  : 'Stories that include specific numbers and measurable outcomes are 22x more memorable than general claims about benefits or advantages.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 16,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20, 
    color: '#94A3B8',
  },
  templatesContainer: {
    paddingBottom: 16,
  },
  templateCard: {
    width: 280,
    borderRadius: 12,
    padding: 14,
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
  exampleContainer: {
    padding: 10,
    borderRadius: 8,
  },
  exampleText: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  frameworksContainer: {
    paddingBottom: 16,
  },
  frameworkCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  frameworkCardSelected: {
    borderWidth: 2,
  },
  frameworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  frameworkTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  frameworkDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  actionContainer: {
    marginVertical: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  resultContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  feedbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 14,
  },
  feedbackButtons: {
    flexDirection: 'row',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  feedbackButtonText: {
    fontSize: 12,
    marginLeft: 4,
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipCard: {
    borderRadius: 12,
    padding: 14,
  },
  tipIcon: {
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  // New styles for Traditional Wisdom
  wisdomTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  wisdomDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  categorySelector: {
    marginBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  wisdomItems: {
    marginBottom: 20,
  },
  wisdomCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  wisdomHeader: {
    marginBottom: 8,
  },
  wisdomText: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  wisdomOrigin: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  wisdomOriginText: {
    fontSize: 12,
    marginLeft: 4,
  },
  wisdomDetails: {
    marginBottom: 12,
  },
  wisdomDetailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  wisdomDetailText: {
    fontSize: 14,
    lineHeight: 20,
  },
  wisdomMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wisdomContext: {},
  wisdomContextText: {
    fontSize: 12,
  },
  wisdomEffectiveness: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wisdomEffectivenessText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  wisdomActions: {
    flexDirection: 'row',
  },
  wisdomAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  wisdomActionIcon: {
    marginRight: 6,
  },
  wisdomActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  contextSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  contextButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  contextButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  contextSuggestions: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  contextTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 15,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 22,
  },
  suggestionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionOrigin: {
    fontSize: 13,
  },
  copyButton: {
    padding: 4,
  },
  suggestionExplanation: {
    fontSize: 13,
    lineHeight: 18,
  },
  generateMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  generateMoreIcon: {
    marginRight: 8,
  },
  generateMoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  customizedContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  customizedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  customizedText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  customizedActions: {
    flexDirection: 'row',
  },
  customizedAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  customizedActionIcon: {
    marginRight: 6,
  },
  customizedActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  analogyItems: {
    marginBottom: 20,
  },
  analogyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  baseAnalogyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  derivedAnalogies: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  derivedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  derivedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  derivedIcon: {
    marginRight: 8,
  },
  derivedText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  applicationContainer: {
    marginBottom: 16,
  },
  applicationTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  applicationText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  customizeIcon: {
    marginRight: 6,
  },
  customizeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  wisdomLibraryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  wisdomLibraryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  wisdomLibraryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  wisdomLibraryDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  wisdomLibraryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  wisdomLibraryStat: {
    alignItems: 'center',
  },
  wisdomLibraryStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  wisdomLibraryStatLabel: {
    fontSize: 12,
  },
  wisdomLibraryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  wisdomLibraryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  analyticsDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  analyticsData: {},
  analyticsChart: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  chartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartLabel: {
    width: 110,
  },
  chartLabelText: {
    fontSize: 12,
  },
  chartBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  chartFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartValue: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  analyticsButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  analyticsButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});