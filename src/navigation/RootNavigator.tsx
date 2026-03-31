import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewsScreen } from '@screens/NewsScreen/NewsScreen';
import { GalleryScreen } from '@screens/GalleryScreen/GalleryScreen';
import { RegisterScreen } from '@screens/RegisterScreen/RegisterScreen';
import { NewsDetailsScreen } from '@screens/NewsScreen/NewsDetailsScreen';
import { PhotoViewerScreen } from '@screens/GalleryScreen/PhotoViewerScreen';

import { RootStackParamList, RootTabParamList } from './types';
import { getTabBarIcon } from './tabBarIcons';
import { colors } from '@theme/colors';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'Новини',
          tabBarIcon: getTabBarIcon('News'),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          title: 'Галерея',
          tabBarIcon: getTabBarIcon('Gallery'),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Реєстрація',
          tabBarIcon: getTabBarIcon('Register'),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={{
          title: 'Деталі новини',
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />

      <Stack.Screen
        name="PhotoViewer"
        component={PhotoViewerScreen}
        options={{
          title: 'Фото',
          animation: 'fade',
          presentation: 'fullScreenModal',
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
    </Stack.Navigator>
  );
}
