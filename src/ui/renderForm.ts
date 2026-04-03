// ── src/ui/renderForm.ts ─────────────────────────────────────────────────
// Form rendering helpers: validation display, years label, preset warning.

import type { ValidationErrors } from '../domain/types.ts';

/** Update years display label. */
export function updateYearsLabel(years: number): void {
  const display = document.getElementById('years-display');
  const label = document.getElementById('input-years');
  if (display) {
    const map: Record<number, string> = {
      1: '1 год',
      2: '2 года',
      3: '3 года',
      4: '4 года',
      5: '5 лет',
    };
    display.textContent = map[years] ?? `${years} лет`;
  }
  if (label) {
    label.setAttribute('aria-valuenow', String(years));
  }
}

/** Show or hide the preset warning. */
export function showPresetWarning(show: boolean): void {
  const el = document.getElementById('profile-warning');
  if (el) {
    el.classList.toggle('is-visible', show);
  }
}

/** Mark form fields with validation errors. */
export function renderValidationErrors(errors: ValidationErrors): void {
  // Field → error element + form-group id
  const fieldMap: Array<{ field: keyof ValidationErrors; inputId: string; errorId: string; groupId: string }> = [
    { field: 'workstations', inputId: 'input-workstations', errorId: 'workstations-error', groupId: 'fg-workstations' },
    { field: 'servers',      inputId: 'input-servers',      errorId: 'servers-error',      groupId: 'fg-servers'      },
    { field: 'wsAnnualCost', inputId: 'input-ws-cost',      errorId: 'ws-cost-error',       groupId: 'fg-ws-cost'     },
    { field: 'srvAnnualCost',inputId: 'input-srv-cost',     errorId: 'srv-cost-error',      groupId: 'fg-srv-cost'    },
  ];

  for (const { field, inputId, errorId, groupId } of fieldMap) {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    const errEl = document.getElementById(errorId);
    const group = document.getElementById(groupId);

    const errorMsg = errors[field] ?? '';
    const hasError = errorMsg.length > 0;

    if (input) input.classList.toggle('is-invalid', hasError);
    if (errEl) errEl.textContent = errorMsg;
    if (group) group.classList.toggle('has-error', hasError);
  }
}

/** Clear all validation error states. */
export function clearValidationErrors(): void {
  renderValidationErrors({});
}
