import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { PrimaryButton } from './PrimaryButton';

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  source: string;
  publishedAt: string;
  url: string;
};

type Props = {
  item: NewsItem;
  onPress: () => void;
};

export function NewsCard({ item, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.meta}>
          {item.source} · {item.publishedAt}
        </Text>

        <Text style={styles.description}>{item.description}</Text>

        <PrimaryButton title="Деталі" onPress={onPress} style={styles.button} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.sm + 2,
    marginBottom: spacing.sm + 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.96,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: spacing.sm + 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.body + 2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.body,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 110,
    paddingHorizontal: spacing.md,
  },
});
