import { useThemeColor } from '@/hooks/useThemeColor';
import React, { ReactElement } from 'react';
import { Pressable, StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface ButtonProps extends React.PropsWithChildren, ViewStyle {
    onPressFunc: () => void,
    children?: ReactElement,
    style?: StyleProp<ViewStyle> 
}

const CustomButton = ({ children, onPressFunc, style }: ButtonProps) => {

    const BgColor = useThemeColor({light: "#151718" , dark: "#fff" }, "background")

    const pressed = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(pressed.value ? 0.95 : 1) }],
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
                    { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, backgroundColor: BgColor },
                    style
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    )
}

export default CustomButton