import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '@/constants/colors';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  colors: typeof colors.light & typeof colors.dark;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
  colors: colors.light,
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme from AsyncStorage on initial render
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
        setIsLoaded(true);
      }
    };
    
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  };

  // Determine if dark mode is active
  const isDark = theme === 'system' 
    ? colorScheme === 'dark' 
    : theme === 'dark';

  // Get the appropriate color palette
  const activeColors = isDark ? colors.dark : colors.light;

  const contextValue = {
    theme,
    setTheme,
    isDark,
    colors: activeColors,
  };

  // Don't render until we've loaded the theme preference
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}