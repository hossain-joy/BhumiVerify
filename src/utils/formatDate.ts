/**
 * Formats date cleanly and safely.
 * Returns fallback text for null, undefined, or invalid date strings
 * without ever rendering "Invalid Date".
 */
export function formatSafeDate(
  dateStr: string | null | undefined,
  fallback = 'Date not available',
  locale = 'en-US'
): string {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) {
    return fallback;
  }

  const trimmed = dateStr.trim();
  const timestamp = Date.parse(trimmed);

  if (isNaN(timestamp)) {
    return fallback;
  }

  try {
    const d = new Date(timestamp);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return fallback;
  }
}
