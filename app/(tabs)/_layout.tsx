import TabBar from '@/components/ui/TabBar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const color = useThemeColor({ light: "#fff", dark: "#000" }, 'background')

  return (
    <Tabs
      tabBar={(props) => (<TabBar {...props} />)}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Icon name="home" size={24} color={color === "#fff" ? "#000" : "#fff"} />
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => (
            <Icon name="search1" size={24} color={color === "#fff" ? "#000" : "#fff"} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <Icon name="user" size={24} color={color === "#fff" ? "#000" : "#fff"} />
          )
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: () => (
            <Icon name="message1" size={24} color={color === "#fff" ? "#000" : "#fff"} />
          )
        }}
      />
    </Tabs>
  );
}
