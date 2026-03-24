import React from 'react';
import { Text, View } from 'react-native';
import { UserData } from '@context/types';
import { styles } from '../styles';

type Props = {
  user: UserData | null;
};

export function NewsHeader({ user }: Props) {
  return user ? (
    <View style={styles.userInfo}>
      <Text style={styles.userName}>
        Вітаємо, {user.name} {user.surname}!
      </Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
  ) : (
    <View style={styles.userInfo}>
      <Text style={styles.userName}>Ви переглядаєте новини як гість.</Text>
    </View>
  );
}
