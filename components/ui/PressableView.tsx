import React, { ReactElement } from 'react';
import { Pressable, StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface ButtonProps extends React.PropsWithChildren, ViewStyle {
    onPressFunc: () => void,
    children?: ReactElement,
    style?: StyleProp<ViewStyle> 
}

const PressableView = ({ children, onPressFunc, style }: ButtonProps) => {

    const pressed = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withSpring(pressed.value ? 0.2 : 1)
    }));

    return (
        <Pressable
            onPressIn={() => {
                pressed.value = 1
            }}
            onPressOut={() => {
                pressed.value = 0
                onPressFunc()
            }}
        >
            <Animated.View
                style={[
                    animatedStyle,
                    style
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    )
}

export default PressableView