import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

interface HBarProps {
    tabs: Array<string>;
}
const HBar = ({ tabs }: HBarProps) => {
    return (
        <ThemedView className='flex-row gap-x-4 items-center justify-around'>
            {tabs.map((tab) => (
                <ThemedText key={tab}>{tab}</ThemedText>
            ))}
        </ThemedView>
    )
}

export default HBar