import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  inputOutline: {
    borderRadius: 12,
  },
  helperText: {
    color: colors.textPrimary,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: spacing.xs + 4,
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: 16,
  },
  hintCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
  },
  hintTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  hintText: {
    color: colors.textSecondary,
    marginBottom: 2,
  },
});
