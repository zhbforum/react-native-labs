import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { UserData } from '@context/types';
import { styles } from '../styles';

type Props = {
  user: UserData | null;
  onLogout: () => void;
};

export function NewsHeader({ user, onLogout }: Props) {
  return user ? (
    <View style={styles.userInfo}>
      <View style={styles.userTextBlock}>
        <Text style={styles.userName}>
          Вітаємо, {user.name} {user.surname}!
        </Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <Pressable
        onPress={onLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.logoutButtonPressed,
        ]}
      >
        <Text style={styles.logoutText}>Вийти</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.userInfo}>
      <Text style={styles.userName}>Ви переглядаєте новини як гість.</Text>
    </View>
  );
}
