export function formatDatabaseError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const maybeSqliteError = error as { code?: unknown; message?: unknown };

    if (maybeSqliteError.message) {
      return `SQLite error ${String(
        maybeSqliteError.code ?? 'unknown',
      )}: ${String(maybeSqliteError.message)}`;
    }

    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }

  return String(error);
}
