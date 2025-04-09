import { ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';


import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, LightTheme } from '@/theme/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="posts/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="users/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>

  );
}
