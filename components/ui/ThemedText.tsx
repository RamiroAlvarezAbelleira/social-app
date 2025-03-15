import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  className,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const textType = (type: string): string => {
    switch (type) {
      case "default":
        return 'text-[16px]'
      case "title":
        return 'text-[32px] font-bold'
      case "defaultSemiBold":
        return 'text-[16px] font-semibold'
      case "subtitle":
        return 'text-[20px] font-bold'
      case "link":
        return 'text-[16px] text-[#0a7ea4]'
      default:
        return ''
    }
  }

  const text = textType(type)

  return (
    <Text
      className={`${className} text-[${color}] ${text}`}
      {...rest}
    />
  );
}
