// ── src/domain/validation.ts ─────────────────────────────────────────────
// Validation rules for the TCO calculator form.

import type { FormState, ValidationResult, ValidationErrors } from './types.ts';

export function validate(state: FormState): ValidationResult {
  const errors: ValidationErrors = {};

  // workstations: integer ≥ 0
  if (!Number.isInteger(state.workstations) || state.workstations < 0) {
    errors.workstations = 'Введите целое число ≥ 0';
  }

  // servers: integer ≥ 0
  if (!Number.isInteger(state.servers) || state.servers < 0) {
    errors.servers = 'Введите целое число ≥ 0';
  }

  // cannot both be zero
  if (state.workstations === 0 && state.servers === 0) {
    errors.workstations = 'Укажите количество РС или серверов';
    errors.servers = 'Укажите количество РС или серверов';
  }

  // years: integer 1..5
  if (!Number.isInteger(state.years) || state.years < 1 || state.years > 5) {
    errors.years = 'Горизонт должен быть от 1 до 5 лет';
  }

  // annual costs: number ≥ 0
  if (state.wsAnnualCost < 0 || isNaN(state.wsAnnualCost)) {
    errors.wsAnnualCost = 'Введите число ≥ 0';
  }
  if (state.srvAnnualCost < 0 || isNaN(state.srvAnnualCost)) {
    errors.srvAnnualCost = 'Введите число ≥ 0';
  }

  // Advanced costs: ≥ 0
  if (state.migrationCost < 0 || isNaN(state.migrationCost)) {
    errors.migrationCost = 'Введите число ≥ 0';
  }
  if (state.trainingCost < 0 || isNaN(state.trainingCost)) {
    errors.trainingCost = 'Введите число ≥ 0';
  }
  if (state.pilotCost < 0 || isNaN(state.pilotCost)) {
    errors.pilotCost = 'Введите число ≥ 0';
  }
  if (isNaN(state.hwDelta)) {
    errors.hwDelta = 'Введите число';
  }

  const valid = Object.keys(errors).length === 0;
  return { valid, errors };
}
