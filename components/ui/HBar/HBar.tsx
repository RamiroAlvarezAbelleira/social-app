import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ThemedView } from '../ThemedView';
import HBarItem from './HBarItem';

interface HBarProps {
    tabs: Array<string>;
    defaultTab: string,
    setSelectedTab: (tab: string) => void
}

const HBar = ({ tabs, defaultTab, setSelectedTab }: HBarProps) => {

    const [pressedValue, setPressedValue] = useState<string>(defaultTab)

    const pressed = useSharedValue(defaultTab)

    const onPressFunc = (selectedTab: string) => {
        setPressedValue(selectedTab)
        setSelectedTab(selectedTab)
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