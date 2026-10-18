/**
 * Normalizes input string for consistent comparison.
 * Trims surrounding whitespace, collapses internal multiple spaces,
 * and converts to lower case.
 */
export function normalizeIdentifier(val: string | null | undefined): string {
  if (!val) return '';
  return val
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * Normalizes parcel input fields.
 */
export function normalizeParcelInput<T extends Record<string, any>>(input: T): T {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string') {
      result[key] = normalizeIdentifier(value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
