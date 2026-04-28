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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userTextBlock: {
    flex: 1,
  },
  userName: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  logoutButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutButtonPressed: {
    opacity: 0.75,
  },
  logoutText: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: '700',
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    textAlign: 'center',
  },
});
