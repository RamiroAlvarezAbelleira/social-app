import { useThemeColor } from '@/hooks/useThemeColor';
import React, { ReactElement } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface ButtonProps extends React.PropsWithChildren {
    onPressFunc: () => void,
    children?: ReactElement
}

const CustomButton = ({ children, onPressFunc }: ButtonProps) => {

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
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    )
}

export default CustomButton