import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Moon, Bell, Lock, HelpCircle, Info } from 'lucide-react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  darkModeEnabled: boolean;
  setDarkMode: (enabled: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export default function SettingsModal({
  visible,
  onClose,
  darkModeEnabled,
  setDarkMode,
  notificationsEnabled,
  setNotificationsEnabled,
}: SettingsModalProps) {
  const { colors, theme, setTheme } = useTheme();
  
  // Handle theme toggling
  const handleThemeChange = (value: boolean) => {
    setDarkMode(value);
    setTheme(value ? 'dark' : 'light');
  };
  
  const settingsOptions = [
    {
      id: 'darkMode',
      icon: Moon,
      title: 'Dark Mode',
      description: 'Enable dark theme',
      type: 'switch',
      value: darkModeEnabled,
      onValueChange: handleThemeChange,
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Enable push notifications',
      type: 'switch',
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      id: 'privacy',
      icon: Lock,
      title: 'Privacy',
      description: 'Manage privacy settings',
      type: 'link',
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Contact support, FAQs',
      type: 'link',
    },
    {
      id: 'about',
      icon: Info,
      title: 'About',
      description: 'App version 1.0.0',
      type: 'link',
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Settings</Text>
            <Pressable
              style={[styles.closeButton, { backgroundColor: colors.card }]}
              onPress={onClose}
            >
              <X size={18} color={colors.text} />
            </Pressable>
          </View>
          
          <View style={styles.settingsList}>
            {settingsOptions.map((option) => {
              const Icon = option.icon;
              
              return (
                <Pressable
                  key={option.id}
                  style={[
                    styles.settingItem,
                    { borderBottomColor: colors.border }
                  ]}
                  onPress={() => {
                    if (option.type === 'link') {
                      // Handle navigation to specific settings screens
                      console.log(`Navigate to ${option.id}`);
                    }
                  }}
                >
                  <View style={styles.settingItemContent}>
                    <View style={[
                      styles.iconContainer,
                      { backgroundColor: colors.backgroundSecondary }
                    ]}>
                      <Icon size={20} color={colors.primary} />
                    </View>
                    
                    <View style={styles.settingInfo}>
                      <Text style={[styles.settingTitle, { color: colors.text }]}>
                        {option.title}
                      </Text>
                      <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                  
                  {option.type === 'switch' && (
                    <Switch
                      value={option.value}
                      onValueChange={option.onValueChange}
                      trackColor={{ false: colors.backgroundSecondary, true: colors.primary }}
                      thumbColor="white"
                    />
                  )}
                  
                  {option.type === 'link' && (
                    <View style={[styles.arrowContainer, { backgroundColor: colors.backgroundSecondary }]}>
                      <Text style={[styles.arrowText, { color: colors.primary }]}>{'>'}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            © 2025 VoiceAlchemy. All rights reserved.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsList: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
  }
});