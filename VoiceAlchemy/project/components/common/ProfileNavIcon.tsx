import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import * as ImagePicker from 'expo-image-picker';
import { User } from 'lucide-react-native';
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';

interface ProfileNavIconProps {
  onPress?: () => void;
}

export default function ProfileNavIcon({ onPress }: ProfileNavIconProps) {
  const { colors, isDark } = useTheme();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfilePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Show options for profile actions
      Alert.alert(
        "Profile Options",
        "What would you like to do?",
        [
          {
            text: "Edit Profile Picture",
            onPress: pickImage
          },
          {
            text: "Settings",
            onPress: () => setSettingsModalVisible(true)
          },
          {
            text: "Notifications",
            onPress: () => setNotificationsModalVisible(true)
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );
    }
  };

  const pickImage = async () => {
    // Request permissions first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    // Show options for image source
    Alert.alert(
      "Profile Picture",
      "Choose a source for your profile picture",
      [
        {
          text: "Take Photo",
          onPress: takePhoto
        },
        {
          text: "Choose from Library",
          onPress: chooseFromLibrary
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to take a photo!"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "There was an error taking a photo. Please try again.");
    }
  };

  const chooseFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was an error selecting an image. Please try again.");
    }
  };

  return (
    <Pressable 
      style={[styles.iconButton, { backgroundColor: colors.card }]}
      onPress={handleProfilePress}
    >
      {profileImage ? (
        <Image 
          source={{ uri: profileImage }} 
          style={styles.profileImage} 
        />
      ) : (
        <User size={18} color={colors.text} />
      )}
      
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        darkModeEnabled={isDark}
        setDarkMode={() => {}}
        notificationsEnabled={true}
        setNotificationsEnabled={() => {}}
      />
      
      <NotificationsModal
        visible={notificationsModalVisible}
        onClose={() => setNotificationsModalVisible(false)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});