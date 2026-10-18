export interface TimelineEventItem {
  id: string;
  type: 'transfer_related' | 'mutation_application' | 'mutation_completed';
  title: string;
  date: string | null;
  reference: string | null;
  explanation: string;
}

/**
 * Pure function to sort timeline events chronologically.
 * Dated events appear in order; unknown/null/invalid dates appear after dated events.
 */
export function sortTimelineEvents<T extends { date: string | null }>(
  events: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  if (!events || !Array.isArray(events)) return [];

  const copy = [...events];

  return copy.sort((a, b) => {
    const aValid = a.date && !isNaN(Date.parse(a.date));
    const bValid = b.date && !isNaN(Date.parse(b.date));

    // Both have valid dates
    if (aValid && bValid) {
      const timeA = Date.parse(a.date as string);
      const timeB = Date.parse(b.date as string);
      return order === 'asc' ? timeA - timeB : timeB - timeA;
    }

    // A has date, B does not -> A comes first
    if (aValid && !bValid) return -1;

    // B has date, A does not -> B comes first
    if (!aValid && bValid) return 1;

    // Neither has date -> preserve relative order
    return 0;
  });
}
