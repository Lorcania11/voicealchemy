import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Settings } from 'lucide-react-native';
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { colors, isDark } = useTheme();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.actions}>
        <Pressable 
          style={[styles.iconButton, { backgroundColor: colors.card }]}
          onPress={() => setNotificationsModalVisible(true)}
        >
          <Bell size={18} color={colors.text} />
        </Pressable>
        <Pressable 
          style={[styles.iconButton, { backgroundColor: colors.card }]}
          onPress={() => setSettingsModalVisible(true)}
        >
          <Settings size={18} color={colors.text} />
        </Pressable>
      </View>
      
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        darkModeEnabled={darkModeEnabled}
        setDarkMode={setDarkModeEnabled}
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
      />
      
      <NotificationsModal
        visible={notificationsModalVisible}
        onClose={() => setNotificationsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});