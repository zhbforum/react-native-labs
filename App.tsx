import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { RootNavigator } from '@navigation/RootNavigator';
import { colors } from '@theme/colors';
import { AppProvider } from '@context/AppContext';

const paperTheme = {
  colors: {
    primary: colors.primary,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.textPrimary,
    onBackground: colors.textPrimary,
    outline: colors.border,
    error: '#D32F2F',
  },
};

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme as any}>
        <AppProvider>
          <NavigationContainer theme={navigationTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={colors.background}
            />
            <RootNavigator />
          </NavigationContainer>

          <Toast />
        </AppProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
