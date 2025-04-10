import React, { ReactElement, useRef } from 'react';
import { GestureResponderEvent, Pressable, StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface ButtonProps extends React.PropsWithChildren, ViewStyle {
    onPressFunc: () => void,
    children?: ReactElement,
    style?: StyleProp<ViewStyle>
}

const PressableView = ({ children, onPressFunc, style }: ButtonProps) => {
    const startY = useRef(0);

    const handlePressIn = (event: GestureResponderEvent) => {
        startY.current = event.nativeEvent.pageY;
        pressed.value = 1
    };

    const handlePress = (event: GestureResponderEvent) => {
        const endY = event.nativeEvent.pageY;
        const deltaY = Math.abs(endY - startY.current);

        if (deltaY < 5) {
            pressed.value = 0
            onPressFunc()
        } else {
            pressed.value = 0
        }
    };

    const pressed = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withSpring(pressed.value ? 0.2 : 1)
    }));

    return (
        <Pressable
            onPressIn={(e) => {
                handlePressIn(e)
            }}
            onPressOut={(e) => {
                handlePress(e)
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