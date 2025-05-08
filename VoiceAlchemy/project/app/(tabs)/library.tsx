import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search, BookOpen, Headphones, Mic, Video, Filter } from 'lucide-react-native';
import Header from '@/components/common/Header';
import { useTheme } from '@/hooks/useTheme';

// Sample resource categories
const RESOURCE_TYPES = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'recording', label: 'Recordings', icon: Mic },
  { id: 'video', label: 'Video', icon: Video },
];

// Sample library resources
const LIBRARY_RESOURCES = [
  {
    id: '1',
    title: 'Mastering Sales Pitch Tone',
    type: 'audio',
    duration: '32 min',
    author: 'Emily Johnson',
    thumbnail: 'https://images.pexels.com/photos/3811081/pexels-photo-3811081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Persuasive Voice Techniques',
    type: 'video',
    duration: '18 min',
    author: 'Michael Chen',
    thumbnail: 'https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'My Sales Pitch - Feb 15',
    type: 'recording',
    duration: '5 min',
    date: 'Feb 15, 2025',
    thumbnail: null,
  },
  {
    id: '4',
    title: 'Objection Handling Workshop',
    type: 'video',
    duration: '45 min',
    author: 'Sarah Williams',
    thumbnail: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'Voice Warmup Guide',
    type: 'audio',
    duration: '12 min',
    author: 'David Rodriguez',
    thumbnail: 'https://images.pexels.com/photos/7674499/pexels-photo-7674499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'Client Presentation - Mar 3',
    type: 'recording',
    duration: '8 min',
    date: 'Mar 3, 2025',
    thumbnail: null,
  },
];

export default function LibraryScreen() {
  const { colors, isDark } = useTheme();
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredResources = LIBRARY_RESOURCES.filter(resource => {
    // Filter by type if not 'all'
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    
    // Filter by search query if exists
    const searchMatch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.author && resource.author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return typeMatch && searchMatch;
  });
  
  const handleFilterPress = () => {
    Alert.alert(
      "Filter Options",
      "Choose filters for your library",
      [
        {
          text: "Most Recent",
          onPress: () => console.log("Filter by most recent")
        },
        {
          text: "Longest Duration",
          onPress: () => console.log("Filter by longest duration")
        },
        {
          text: "Shortest Duration",
          onPress: () => console.log("Filter by shortest duration")
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };
  
  const handleResourcePress = (resource) => {
    let actionTitle = "";
    let actionMessage = "";
    
    switch(resource.type) {
      case 'audio':
        actionTitle = "Play Audio";
        actionMessage = `Playing "${resource.title}" audio lesson`;
        break;
      case 'video':
        actionTitle = "Play Video";
        actionMessage = `Playing "${resource.title}" video lesson`;
        break;
      case 'recording':
        actionTitle = "View Recording";
        actionMessage = `Opening "${resource.title}" recording details`;
        break;
      default:
        actionTitle = "Open Content";
        actionMessage = `Opening "${resource.title}"`;
    }
    
    Alert.alert(
      actionTitle,
      actionMessage
    );
  };
  
  // Render resource type pill
  const renderResourceTypeItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <Pressable
        style={[
          styles.typePill,
          selectedType === item.id && styles.typePillSelected,
          { 
            backgroundColor: selectedType === item.id 
              ? colors.primary 
              : colors.card 
          }
        ]}
        onPress={() => setSelectedType(item.id)}
      >
        <Icon 
          size={18} 
          color={selectedType === item.id ? 'white' : colors.text} 
          style={styles.typeIcon} 
        />
        <Text 
          style={[
            styles.typePillText, 
            { color: selectedType === item.id ? 'white' : colors.text }
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  // Render resource item
  const renderResourceItem = ({ item }) => {
    const TypeIcon = RESOURCE_TYPES.find(type => type.id === item.type)?.icon || BookOpen;
    
    return (
      <Pressable
        style={[styles.resourceCard, { backgroundColor: colors.card }]}
        onPress={() => handleResourcePress(item)}
      >
        <View 
          style={[
            styles.resourceThumbnail, 
            { backgroundColor: item.thumbnail ? undefined : colors.backgroundSecondary }
          ]}
        >
          {!item.thumbnail && (
            <TypeIcon size={24} color={colors.textSecondary} />
          )}
        </View>
        
        <View style={styles.resourceContent}>
          <Text style={[styles.resourceTitle, { color: colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          
          <View style={styles.resourceMeta}>
            <View style={[styles.resourceTypeTag, { backgroundColor: colors.backgroundSecondary }]}>
              <TypeIcon size={12} color={colors.textSecondary} />
              <Text style={[styles.resourceTypeText, { color: colors.textSecondary }]}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Text>
            </View>
            
            <Text style={[styles.resourceDuration, { color: colors.textTertiary }]}>
              {item.duration}
            </Text>
          </View>
          
          <Text style={[styles.resourceAuthor, { color: colors.textSecondary }]}>
            {item.author || item.date}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header title="Library" />
        
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
            <Search size={18} color={colors.textTertiary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search library"
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <Pressable 
            style={[styles.filterButton, { backgroundColor: colors.card }]}
            onPress={handleFilterPress}
          >
            <Filter size={18} color={colors.text} />
          </Pressable>
        </View>
        
        <View style={styles.typesContainer}>
          <FlatList
            data={RESOURCE_TYPES}
            renderItem={renderResourceTypeItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typesList}
          />
        </View>
        
        <FlatList
          data={filteredResources}
          renderItem={renderResourceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resourcesList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  typesContainer: {
    marginBottom: 16,
  },
  typesList: {
    paddingHorizontal: 20,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 10,
  },
  typePillSelected: {
    backgroundColor: '#1E40AF',
  },
  typeIcon: {
    marginRight: 6,
  },
  typePillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resourcesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resourceCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  resourceThumbnail: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resourceTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  resourceTypeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  resourceDuration: {
    fontSize: 12,
  },
  resourceAuthor: {
    fontSize: 14,
  },
});