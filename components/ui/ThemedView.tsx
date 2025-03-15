import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  mainContainer?: boolean;
};

export function ThemedView({ style, lightColor, className, darkColor, mainContainer, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets()

  return (
    <View
      className={`${className}`}
      style={[{ backgroundColor, paddingTop: mainContainer ? insets.top : 0 }, style]}
      {...otherProps}
    />
  );
}
