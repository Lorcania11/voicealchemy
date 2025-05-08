import React from 'react';
import { Tabs } from 'expo-router';
import { Mic, ChartBar as BarChart, Dumbbell, User, BookOpen, Diamond } from 'lucide-react-native';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import ThemeProvider from '@/providers/ThemeProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#1E40AF',
          tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B',
          tabBarBackground: () => (
            Platform.OS === 'web' ? (
              <View style={[StyleSheet.absoluteFill, { 
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)' 
              }]} />
            ) : (
              <BlurView
                intensity={70}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
              />
            )
          ),
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => <BarChart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="record"
          options={{
            title: 'Record',
            tabBarIcon: ({ color, size }) => <Mic size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            title: 'Practice',
            tabBarIcon: ({ color, size }) => <Dumbbell size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: 'AI Lab+',
            tabBarIcon: ({ color, size }) => <Diamond size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingBottom: 20,
  },
  tabBarLabel: {
    fontWeight: '500',
    fontSize: 12,
  },
});