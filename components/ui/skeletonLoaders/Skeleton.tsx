import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { withSpring } from "react-native-reanimated";

type SkeletonProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export const Skeleton = ({
  style,
}: SkeletonProps) => {
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim]);

  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity: opacityAnim
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    height: 15,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",

  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
    opacity: 0.3,
  },
});