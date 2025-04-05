import React, { useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import HBarItem from './HBarItem';

interface HBarProps {
    tabs: Array<string>;
    defaultTab: string
}

const HBar = ({ tabs, defaultTab }: HBarProps) => {

    const [pressedValue, setPressedValue] = useState<string>(defaultTab)

    const pressed = useSharedValue(defaultTab)

    const onPressFunc = (selectedTab: string) => {
        setPressedValue(selectedTab)
    }

    return (
        <ThemedView className='flex-row gap-x-4 items-center justify-around'>
            {tabs.map((tab) => (
                <Pressable
                    key={tab}
                    onPress={() => {
                        pressed.value = tab
                        onPressFunc(tab)
                    }}
                >
                    <HBarItem pressedValue={pressedValue} tab={tab} />

                </Pressable>

            ))}
        </ThemedView>
    )
}

export default HBar