import React from 'react'
import Animated, { Easing, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { ThemedText } from '../ThemedText'
import { useTheme } from '@react-navigation/native'

interface HBarItemProps {
    pressedValue: string,
    tab: string
}

const HBarItem = ({ pressedValue, tab }: HBarItemProps) => {

    const { colors } = useTheme()

    const animatedStyle = useAnimatedStyle(() => ({
        borderBottomWidth: 3,
        borderBottomColor: withTiming(pressedValue === tab ? colors.text : colors.background, {
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          }),
    }));

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: colors.background,
                },
            ]}
        >
            <ThemedText>{tab}</ThemedText>
        </Animated.View>
    )
}

export default HBarItem