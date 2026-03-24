import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { NewsScreen } from '@screens/NewsScreen/NewsScreen';
import { GalleryScreen } from '@screens/GalleryScreen/GalleryScreen';
import { RegisterScreen } from '@screens/RegisterScreen/RegisterScreen';
import { colors } from '@theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="News"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'Новини' }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ title: 'Фотогалерея' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Реєстрація' }}
      />
    </Stack.Navigator>
  );
}
