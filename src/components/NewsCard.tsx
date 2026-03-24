import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

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
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
  description: {
    fontSize: typography.body,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
