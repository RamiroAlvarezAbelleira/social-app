import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  mainContainer?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, mainContainer, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets()

  return <View style={[{ backgroundColor, paddingTop: mainContainer? insets.top : 0 }, style]} {...otherProps} />;
}
