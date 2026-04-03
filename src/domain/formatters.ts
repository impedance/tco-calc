// ── src/domain/formatters.ts ─────────────────────────────────────────────
// Formatting utilities for display: currency, percentages, years.

const RUB_FORMATTER = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const NUM_FORMATTER = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
});

/** Format a number as RUB currency string, e.g. "1 234 567 ₽". */
export function formatRub(value: number): string {
  return RUB_FORMATTER.format(value);
}

/** Format a number with thousands separator. */
export function formatNumber(value: number): string {
  return NUM_FORMATTER.format(value);
}

/** Format a fractional value as percentage string, e.g. "23,4%". */
export function formatPct(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

/** Format years label: "1 год", "2–4 года", "5 лет". */
export function formatYears(years: number): string {
  const map: Record<number, string> = {
    1: '1 год',
    2: '2 года',
    3: '3 года',
    4: '4 года',
    5: '5 лет',
  };
  return map[years] ?? `${years} лет`;
}
