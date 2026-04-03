// ── src/ui/renderResults.ts ──────────────────────────────────────────────
// Updates the results sidebar DOM from a TcoResult.

import type { TcoResult } from '../domain/types.ts';
import { formatRub, formatPct, formatYears } from '../domain/formatters.ts';
import { getRecommendation } from '../domain/calculator.ts';

function el(id: string): HTMLElement {
  const e = document.getElementById(id);
  if (!e) throw new Error(`Element #${id} not found`);
  return e;
}

function setText(id: string, text: string): void {
  el(id).textContent = text;
}


/** Render all results into the sidebar. */
export function renderResults(result: TcoResult, years: number): void {
  const { currentTco, rosaTco, savingsAbs, savingsPct, breakEvenYear } =
    result;

  // Period label
  setText('results-period-label', `Горизонт: ${formatYears(years)}`);

  // Current TCO
  setText('metric-current-tco', formatRub(currentTco));
  setText(
    'metric-current-sub',
    `${formatRub(Math.round(currentTco / years))} / год среднее`,
  );

  // ROSA TCO
  setText('metric-rosa-tco', formatRub(rosaTco));
  setText(
    'metric-rosa-sub',
    `Лицензии РОСА + разовые затраты`,
  );

  // Savings
  const savingsEl = el('metric-savings');
  savingsEl.textContent = formatRub(savingsAbs);
  savingsEl.className = 'metric-value';
  if (savingsAbs > 0) savingsEl.classList.add('is-positive');
  else if (savingsAbs < 0) savingsEl.classList.add('is-negative');
  else savingsEl.classList.add('is-neutral');

  // Savings pct sub-label
  const pctText =
    savingsPct !== null
      ? `${formatPct(savingsPct)} от текущего ТСО`
      : 'Нет данных о текущем ТСО';
  setText('metric-savings-pct', pctText);

  // Break-even
  const breakevenEl = el('metric-breakeven');
  if (breakEvenYear !== null) {
    breakevenEl.textContent = `${breakEvenYear}-й год`;
    breakevenEl.className = 'metric-value is-positive';
    setText('metric-breakeven-sub', 'РОСА выгоднее с этого года');
  } else {
    breakevenEl.textContent = 'Не достигнута';
    breakevenEl.className = 'metric-value is-negative';
    setText(
      'metric-breakeven-sub',
      `В пределах ${formatYears(years)} горизонта`,
    );
  }

  // Comparison bars
  const maxVal = Math.max(currentTco, rosaTco, 1);
  const currentPct = Math.round((currentTco / maxVal) * 100);
  const rosaPct = Math.round((rosaTco / maxVal) * 100);

  (el('bar-current-fill') as HTMLElement).style.width = `${currentPct}%`;
  (el('bar-rosa-fill') as HTMLElement).style.width = `${rosaPct}%`;
  setText('bar-current-amount', formatRub(currentTco));
  setText('bar-rosa-amount', formatRub(rosaTco));

  // Recommendation badge
  const rec = getRecommendation(result);
  const badge = el('recommendation-badge');
  badge.className = `recommendation-badge ${rec.type}`;
  badge.style.display = 'flex';
  setText('recommendation-icon', rec.icon);
  setText('recommendation-text', rec.text);
}

/** Clear results to initial/empty state (used during validation failure). */
export function clearResults(): void {
  const dashes = ['metric-current-tco', 'metric-rosa-tco', 'metric-savings', 'metric-breakeven'];
  dashes.forEach((id) => {
    const e = document.getElementById(id);
    if (e) {
      e.textContent = '—';
      e.className = 'metric-value';
    }
  });

  const subs = ['metric-current-sub', 'metric-rosa-sub', 'metric-savings-pct', 'metric-breakeven-sub', 'results-period-label'];
  subs.forEach((id) => setText(id, ''));

  (document.getElementById('bar-current-fill') as HTMLElement | null)?.style.setProperty('width', '0%');
  (document.getElementById('bar-rosa-fill') as HTMLElement | null)?.style.setProperty('width', '0%');
  setText('bar-current-amount', '—');
  setText('bar-rosa-amount', '—');

  const badge = document.getElementById('recommendation-badge');
  if (badge) badge.style.display = 'none';
}
