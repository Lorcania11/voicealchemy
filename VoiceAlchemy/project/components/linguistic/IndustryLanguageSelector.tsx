import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { SearchIcon, ChevronRight, Briefcase, Building, Users, ShoppingBag, Hospital, GraduationCap, Gavel } from 'lucide-react-native';

// Industry data
const INDUSTRIES = [
  {
    id: 'technology',
    name: 'Technology',
    icon: Briefcase,
    color: '#3B82F6',
    description: 'Software, IT services, hardware, telecommunications',
    vocabulary: {
      examples: ['scalable', 'integration', 'ecosystem', 'infrastructure', 'implementation'],
      count: 420
    }
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Building,
    color: '#10B981',
    description: 'Banking, investments, insurance, financial services',
    vocabulary: {
      examples: ['portfolio', 'dividend', 'liquidity', 'capitalization', 'equity'],
      count: 385
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Hospital,
    color: '#EC4899',
    description: 'Hospitals, pharmaceuticals, medical devices, health services',
    vocabulary: {
      examples: ['clinical', 'patient-centered', 'diagnostics', 'therapeutic', 'compliance'],
      count: 410
    }
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    color: '#F59E0B',
    description: 'E-commerce, brick-and-mortar, consumer goods, distribution',
    vocabulary: {
      examples: ['omnichannel', 'conversion', 'merchandising', 'fulfillment', 'inventory'],
      count: 325
    }
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    color: '#8B5CF6',
    description: 'K-12, higher education, edtech, corporate training',
    vocabulary: {
      examples: ['curriculum', 'pedagogy', 'assessment', 'engagement', 'competency'],
      count: 290
    }
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: Gavel,
    color: '#6366F1',
    description: 'Law firms, legal services, compliance, regulatory',
    vocabulary: {
      examples: ['jurisdiction', 'precedent', 'liability', 'statute', 'discovery'],
      count: 350
    }
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Building,
    color: '#EF4444',
    description: 'Production, assembly, supply chain, industrial equipment',
    vocabulary: {
      examples: ['throughput', 'lead time', 'quality control', 'efficiency', 'yield'],
      count: 375
    }
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: Users,
    color: '#0EA5E9',
    description: 'Management consulting, advisory services, professional services',
    vocabulary: {
      examples: ['deliverable', 'stakeholder', 'optimization', 'framework', 'implementation'],
      count: 340
    }
  },
];

interface IndustryLanguageSelectorProps {
  onSelectIndustry?: (industry: string) => void;
  onViewVocabulary?: (industry: string) => void;
}

export default function IndustryLanguageSelector({ 
  onSelectIndustry,
  onViewVocabulary
}: IndustryLanguageSelectorProps) {
  const { colors, isDark } = useTheme();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    if (onSelectIndustry) {
      onSelectIndustry(industryId);
    } else {
      Alert.alert(
        "Industry Selected",
        `Your linguistic optimization will now be tailored to the ${INDUSTRIES.find(i => i.id === industryId)?.name} industry.`
      );
    }
  };
  
  const handleViewVocabulary = (industryId: string) => {
    if (onViewVocabulary) {
      onViewVocabulary(industryId);
    } else {
      Alert.alert(
        "Industry Vocabulary",
        `This would open the complete vocabulary database for the ${INDUSTRIES.find(i => i.id === industryId)?.name} industry.`
      );
    }
  };
  
  const renderIndustryItem = (industry) => {
    const Icon = industry.icon;
    const isSelected = selectedIndustry === industry.id;
    
    return (
      <Pressable
        key={industry.id}
        style={[
          styles.industryCard,
          isSelected && styles.industryCardSelected,
          { 
            backgroundColor: colors.card,
            borderColor: isSelected ? industry.color : colors.border
          }
        ]}
        onPress={() => handleIndustrySelect(industry.id)}
      >
        <View style={styles.industryHeader}>
          <View 
            style={[
              styles.industryIconContainer,
              { backgroundColor: `${industry.color}15` }
            ]}
          >
            <Icon size={20} color={industry.color} />
          </View>
          
          <View style={styles.industryInfo}>
            <Text style={[styles.industryName, { color: colors.text }]}>
              {industry.name}
            </Text>
            <Text style={[styles.industryDescription, { color: colors.textSecondary }]}>
              {industry.description}
            </Text>
          </View>
        </View>
        
        <View style={styles.vocabularyPreview}>
          <Text style={[styles.vocabularyTitle, { color: colors.textSecondary }]}>
            Industry-Specific Vocabulary:
          </Text>
          
          <View style={styles.vocabularyTags}>
            {industry.vocabulary.examples.map((term, index) => (
              <View 
                key={index}
                style={[
                  styles.vocabularyTag,
                  { backgroundColor: colors.backgroundSecondary }
                ]}
              >
                <Text style={[styles.vocabularyTagText, { color: colors.text }]}>
                  {term}
                </Text>
              </View>
            ))}
            <Pressable
              style={[styles.viewMoreTag, { backgroundColor: `${industry.color}20` }]}
              onPress={() => handleViewVocabulary(industry.id)}
            >
              <Text style={[styles.viewMoreText, { color: industry.color }]}>
                +{industry.vocabulary.count - industry.vocabulary.examples.length} more
              </Text>
              <ChevronRight size={14} color={industry.color} />
            </Pressable>
          </View>
        </View>
        
        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: industry.color }]}>
            <Text style={styles.selectedText}>Active Industry</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Industry-Specific Language
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Select your industry to receive tailored language suggestions and specialized vocabulary for more effective communication
      </Text>
      
      <ScrollView
        contentContainerStyle={styles.industriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {INDUSTRIES.map(renderIndustryItem)}
      </ScrollView>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Each industry has a unique vocabulary, communication style, and set of metaphors that resonate with its audience. Our industry-specific language models are trained on millions of successful communications within each field.
        </Text>
      </View>
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
    marginBottom: 20,
    lineHeight: 20,
  },
  industriesContainer: {
    paddingBottom: 20,
  },
  industryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  industryCardSelected: {
    borderWidth: 2,
  },
  industryHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  industryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  industryInfo: {
    flex: 1,
  },
  industryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  industryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  vocabularyPreview: {
    marginTop: 4,
  },
  vocabularyTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  vocabularyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vocabularyTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  vocabularyTagText: {
    fontSize: 13,
  },
  viewMoreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 4,
  },
  selectedIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  selectedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});