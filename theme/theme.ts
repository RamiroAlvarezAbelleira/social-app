import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from "@react-navigation/native";

export const LightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: "#1DA1F2",
    secondary: "#FFAD1F",
    background: "#FFFFFF",
    text: "#14171A",
    border: "#E1E8ED",
    customColor: "#FF5733", // 🎨 Agregado
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "#1DA1F2",
    secondary: "#FFAD1F",
    background: "#151718",
    text: "#E1E8ED",
    border: "#38444D",
    customColor: "#A155B9", // 🎨 Agregado
  },
};