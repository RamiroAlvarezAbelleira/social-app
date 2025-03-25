import { UserType } from "@/types/user.types"
import { Pressable } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor, withTiming, runOnJS } from "react-native-reanimated";
import { ThemedView } from "../ui/ThemedView"
import User from "./User"

const FollowUserCard = ({ profilePic, firstName, lastName, username }: UserType) => {
    const pressed = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(pressed.value ? 0.95 : 1) }],
        backgroundColor: withTiming(interpolateColor(pressed.value, [0, 1], ["#fff", "#000"]),
            { duration: 50, }
        ),
    }));
    const textStyle = useAnimatedStyle(() => ({
        color: withTiming(interpolateColor(pressed.value, [0, 1], ["#000", "#fff"]),
            { duration: 50 }
        ),
    }));
    const resetAfterAnimation = () => {
        setTimeout(() => {
            pressed.value = 0;
        }, 50); // Wait for the animation to complete
    };
    return (
        <ThemedView className="mx-4 flex-row justify-between items-center mt-5 pb-5 border-b border-b-2">
            <User profilePic={profilePic} firstName={firstName} lastName={lastName} username={username} />
            <Pressable
                onPressIn={() => {
                    pressed.value = 1
                }}
                onPressOut={() => {
                    runOnJS(resetAfterAnimation)()
                }}
            >
                <Animated.View
                    style={[
                        animatedStyle,
                        { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
                    ]}
                >
                    <Animated.Text style={[textStyle, { textAlign: "center", fontWeight: "bold" }]}>
                        Follow
                    </Animated.Text>
                </Animated.View>
            </Pressable>
        </ThemedView>
    )
}

export default FollowUserCard