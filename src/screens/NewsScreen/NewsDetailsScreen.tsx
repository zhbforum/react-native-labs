import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PrimaryButton } from '@components/PrimaryButton';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { useNewsDetails } from './useNewsDetails';

export function NewsDetailsScreen() {
  const { article, isLoading, handleOpenArticle } = useNewsDetails();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Новину не знайдено.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: article.image }} style={styles.image} />

      <Text style={styles.title}>{article.title}</Text>

      <Text style={styles.meta}>
        {article.source} · {article.publishedAt}
      </Text>

      <Text style={styles.text}>
        {article.description}
        {'\n\n'}
        Це екран з повною інформацією про новину. Тут можна розмістити
        розширений опис, деталі події, додаткові факти та іншу текстову
        інформацію відповідно до вимог лабораторної роботи.
      </Text>

      <View style={styles.sourceBlock}>
        <Text style={styles.sourceLabel}>Джерело:</Text>
        <Text style={styles.sourceText}>{article.source}</Text>
        <Text style={styles.sourceUrl}>{article.url}</Text>

        <PrimaryButton
          title="Перейти до джерела"
          onPress={handleOpenArticle}
          style={styles.sourceButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  notFound: {
    fontSize: typography.body + 2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: typography.body + 1,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  sourceBlock: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sourceLabel: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sourceText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  sourceUrl: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  sourceButton: {
    alignSelf: 'flex-start',
    minWidth: 180,
    paddingHorizontal: spacing.md,
  },
});
