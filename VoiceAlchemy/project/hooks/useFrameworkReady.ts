import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { preventAutoHideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';

// Keep the splash screen visible while we initialize resources
preventAutoHideAsync();

export function useFrameworkReady() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await Font.loadAsync({
          // Add any custom fonts here if needed
        });
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        // Tell app that resources are ready
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen after resources are loaded
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return appIsReady;
}