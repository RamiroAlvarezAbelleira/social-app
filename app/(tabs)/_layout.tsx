import TabBar from '@/components/ui/TabBar';
import { Tabs } from 'expo-router';
import React from "react";
import Icon from 'react-native-vector-icons/AntDesign';
export default function LoggedLayout() {
    return (
        <Tabs
            tabBar={(props) => (<TabBar {...props} />)}
            screenOptions={{
                // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search1" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    title: 'Post',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="plus" size={30} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}