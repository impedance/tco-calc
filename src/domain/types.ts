// ── src/domain/types.ts ──────────────────────────────────────────────────
// Core domain types for the ROSA TCO Calculator.

import type { ProfileKey } from '../config/vendorProfiles.ts';

// ── Form Input ────────────────────────────────────────────────────────────

/** Raw form state — mirrors the input controls. */
export interface FormState {
  workstations: number;
  servers: number;
  years: number;
  baselineProfile: ProfileKey;
  wsAnnualCost: number;
  srvAnnualCost: number;
  // Advanced inputs
  migrationCost: number;
  trainingCost: number;
  pilotCost: number;
  hwDelta: number;
  notes: string;
}

// ── Calculation Outputs ────────────────────────────────────────────────────

/** Year-by-year cumulative cost entry for break-even analysis. */
export interface YearlyCost {
  year: number;
  cumulativeCurrent: number;
  cumulativeRosa: number;
}

/** Full result of one TCO calculation. */
export interface TcoResult {
  /** Current stack TCO over the horizon. */
  currentTco: number;
  /** ROSA TCO over the horizon (license + one-time costs). */
  rosaTco: number;
  /** Absolute savings: positive = ROSA cheaper. */
  savingsAbs: number;
  /** Fractional savings (0.0–1.0). null if currentTco === 0. */
  savingsPct: number | null;
  /** Year number at which rosa is cheaper, or null if not reached. */
  breakEvenYear: number | null;
  /** Year-by-year cost data for visualisation. */
  yearly: YearlyCost[];
}

// ── Validation ─────────────────────────────────────────────────────────────

/** Map of field name → error message (empty string = no error). */
export type ValidationErrors = Partial<Record<keyof FormState, string>>;

/** Validation result. */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

// ── UI Recommendation ────────────────────────────────────────────────────

export type RecommendationType = 'positive' | 'neutral' | 'negative';

export interface Recommendation {
  type: RecommendationType;
  icon: string;
  text: string;
}
