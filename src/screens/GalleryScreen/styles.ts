import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { colors } from '@theme/colors';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userInfo: {
    marginBottom: spacing.md,
  },
  userText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
});
