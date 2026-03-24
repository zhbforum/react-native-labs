import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { colors } from '@theme/colors';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  userInfo: {
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});
