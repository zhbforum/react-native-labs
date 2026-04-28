import React from 'react';
import Lucide from '@react-native-vector-icons/lucide';

import type { RootTabParamList } from '@navigation/types';

export type TabIconProps = {
  color: string;
  size: number;
};

export type LucideIconName = React.ComponentProps<typeof Lucide>['name'];

const tabIconsMap: Record<keyof RootTabParamList, LucideIconName> = {
  News: 'newspaper',
  Gallery: 'images',
  Posts: 'file-text',
  Register: 'circle-user-round',
  Auth: 'log-in',
};

export function getTabBarIcon(routeName: keyof RootTabParamList) {
  return ({ color, size }: TabIconProps) => (
    <Lucide name={tabIconsMap[routeName]} size={size} color={color} />
  );
}
