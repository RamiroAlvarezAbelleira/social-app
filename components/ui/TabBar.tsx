import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const TabBar = (props: BottomTabBarProps) => {
    const insets = useSafeAreaInsets()
    const color = useThemeColor({ light: "#fff", dark: "#000" }, 'background')
    const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text')
    const {dark} = useTheme()
    const postColor = dark ? "#202020" : "#e0e0e0"
    const { buildHref } = useLinkBuilder();
    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: `${color}`, paddingTop: 15 }]}>
            {props.state.routes.map((route, index) => {
                const { options } = props.descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined && typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined && typeof options.title === 'string'
                            ? options.title
                            : route.name;

                const isFocused = props.state.index === index;

                const onPress = () => {
                    const event = props.navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        props.navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    props.navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const IconComponent = options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: isFocused ? textColor : '#909090', size: 30 }) : null;

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ alignItems: "center", backgroundColor: `${label === 'Post' && postColor}`, padding: 8, borderRadius: 8 }}
                        key={label}
                    >
                        {IconComponent}
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default TabBar