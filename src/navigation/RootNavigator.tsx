import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NewsScreen } from '@screens/NewsScreen/NewsScreen';
import { GalleryScreen } from '@screens/GalleryScreen/GalleryScreen';
import { RegisterScreen } from '@screens/RegisterScreen/RegisterScreen';
import { RootTabParamList } from './types';
import { getTabBarIcon } from './tabBarIcons';
import { colors } from '@theme/colors';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
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
