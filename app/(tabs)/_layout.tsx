import { Tabs } from 'expo-router';
import React, { ReactNode } from 'react';
import { Platform, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBar from '@/components/ui/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => (<TabBar {...props} />)}
    // screenOptions={{
    //   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //   headerShown: false,
    //   tabBarStyle: Platform.select({
    //     ios: {
    //       // Use a transparent background on iOS to show the blur effect
    //       position: 'absolute',
    //     },
    //     default: {},
    //   }),
    // }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
