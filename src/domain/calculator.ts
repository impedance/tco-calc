// ── src/domain/calculator.ts ─────────────────────────────────────────────
// Pure calculation functions — no DOM, no side effects.
// All monetary inputs/outputs in RUB.

import { ROSA_PRICING, RECOMMENDATION_CONFIG } from '../config/defaults.ts';
import type { FormState, TcoResult, YearlyCost, Recommendation } from './types.ts';

// ── Current Stack TCO ────────────────────────────────────────────────────

export function calcCurrentTco(state: FormState): number {
  return (
    state.workstations * state.wsAnnualCost * state.years +
    state.servers * state.srvAnnualCost * state.years
  );
}

// ── ROSA TCO ─────────────────────────────────────────────────────────────

export function calcRosaLicenseCost(state: FormState): number {
  const { years, workstations, servers } = state;
  const {
    workstationNew,
    workstationRenewal,
    serverNew,
    serverRenewal,
  } = ROSA_PRICING;

  const renewalYears = Math.max(0, years - 1);

  const wsCost =
    workstations * (workstationNew + workstationRenewal * renewalYears);
  const srvCost =
    servers * (serverNew + serverRenewal * renewalYears);

  return wsCost + srvCost;
}

export function calcRosaOneTimeCosts(state: FormState): number {
  return (
    state.migrationCost +
    state.trainingCost +
    state.pilotCost +
    state.hwDelta
  );
}

export function calcRosaTco(state: FormState): number {
  return calcRosaLicenseCost(state) + calcRosaOneTimeCosts(state);
}

// ── Yearly cumulative data ────────────────────────────────────────────────

export function calcYearlyCosts(state: FormState): YearlyCost[] {
  const result: YearlyCost[] = [];

  // One-time ROSA costs are incurred in year 1
  const rosaOneTime = calcRosaOneTimeCosts(state);
  const { workstationNew, workstationRenewal, serverNew, serverRenewal } =
    ROSA_PRICING;

  let cumulativeCurrent = 0;
  let cumulativeRosa = 0;

  for (let year = 1; year <= state.years; year++) {
    // Current stack: constant annual cost
    const currentAnnual =
      state.workstations * state.wsAnnualCost +
      state.servers * state.srvAnnualCost;
    cumulativeCurrent += currentAnnual;

    // ROSA: year 1 uses "new" price + one-time costs; subsequent years use renewal
    const rosaLicenseYear =
      year === 1
        ? state.workstations * workstationNew + state.servers * serverNew
        : state.workstations * workstationRenewal +
          state.servers * serverRenewal;

    const rosaOneTimeYear = year === 1 ? rosaOneTime : 0;
    cumulativeRosa += rosaLicenseYear + rosaOneTimeYear;

    result.push({ year, cumulativeCurrent, cumulativeRosa });
  }

  return result;
}

// ── Break-even ────────────────────────────────────────────────────────────

export function calcBreakEvenYear(yearly: YearlyCost[]): number | null {
  for (const { year, cumulativeRosa, cumulativeCurrent } of yearly) {
    if (cumulativeRosa <= cumulativeCurrent) {
      return year;
    }
  }
  return null;
}

// ── Full result ───────────────────────────────────────────────────────────

export function calculate(state: FormState): TcoResult {
  const currentTco = calcCurrentTco(state);
  const rosaTco = calcRosaTco(state);
  const savingsAbs = currentTco - rosaTco;
  const savingsPct = currentTco === 0 ? null : savingsAbs / currentTco;
  const yearly = calcYearlyCosts(state);
  const breakEvenYear = calcBreakEvenYear(yearly);

  return { currentTco, rosaTco, savingsAbs, savingsPct, yearly, breakEvenYear };
}

// ── Recommendation ────────────────────────────────────────────────────────

export function getRecommendation(result: TcoResult): Recommendation {
  const { savingsPct, savingsAbs, breakEvenYear, yearly } = result;
  const maxYear = yearly.at(-1)?.year ?? 0;

  const { positiveSavingsThreshold, negativeSavingsThreshold } =
    RECOMMENDATION_CONFIG;

  if (
    savingsAbs > 0 &&
    (savingsPct === null || savingsPct >= positiveSavingsThreshold) &&
    breakEvenYear !== null &&
    breakEvenYear <= maxYear
  ) {
    return {
      type: 'positive',
      icon: '✓',
      text: 'Выглядит перспективно для пилота',
    };
  }

  if (
    savingsPct !== null &&
    savingsPct > negativeSavingsThreshold &&
    savingsPct < positiveSavingsThreshold
  ) {
    return {
      type: 'neutral',
      icon: '≈',
      text: 'Требует дополнительного анализа',
    };
  }

  return {
    type: 'negative',
    icon: '✗',
    text: 'Экономического преимущества мало',
  };
}
