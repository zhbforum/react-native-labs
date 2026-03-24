import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

type Props = {
  title: string;
  onPress: () => void;
};

export function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  text: {
    color: '#fff',
    fontSize: typography.body + 2,
    fontWeight: '700',
  },
});
