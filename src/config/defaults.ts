// ── src/config/defaults.ts ───────────────────────────────────────────────
// Application-wide default values and configuration.
// All monetary values are in RUB.

import type { FormState } from '../domain/types.ts';

/** ROSA Chrome public prices (standard support, new + renewal). */
export const ROSA_PRICING = {
  /** New workstation license + 1 year support. */
  workstationNew: 6_072,
  /** Workstation renewal / additional annual support. */
  workstationRenewal: 4_237,
  /** New server license + 1 year support. */
  serverNew: 12_834,
  /** Server renewal / additional annual support. */
  serverRenewal: 8_603,
} as const;

/** Recommendation thresholds. */
export const RECOMMENDATION_CONFIG = {
  /** Savings percentage above which we show "promising". */
  positiveSavingsThreshold: 0.05,
  /** Savings percentage below -5 % triggers "not worth it". */
  negativeSavingsThreshold: -0.05,
} as const;

/** Default form values for a fresh load. */
export const DEFAULT_FORM_STATE: FormState = {
  workstations: 500,
  servers: 25,
  years: 3,
  baselineProfile: 'custom',
  wsAnnualCost: 7_500,
  srvAnnualCost: 16_000,
  migrationCost: 0,
  trainingCost: 0,
  pilotCost: 0,
  hwDelta: 0,
  notes: '',
};

/** Demo example preset values. */
export const DEMO_PRESET: FormState = {
  workstations: 500,
  servers: 25,
  years: 3,
  baselineProfile: 'custom',
  wsAnnualCost: 8_500,
  srvAnnualCost: 18_000,
  migrationCost: 350_000,
  trainingCost: 150_000,
  pilotCost: 100_000,
  hwDelta: 0,
  notes: 'Демонстрационный пример для пресейл-переговоров.',
};
