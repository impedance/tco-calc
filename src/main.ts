// ── src/main.ts ──────────────────────────────────────────────────────────
// Application entry point — wires up events, state, and render cycles.

import './styles.css';

import { DEFAULT_FORM_STATE, DEMO_PRESET } from './config/defaults.ts';
import { vendorProfiles } from './config/vendorProfiles.ts';
import type { ProfileKey } from './config/vendorProfiles.ts';

import { calculate } from './domain/calculator.ts';
import { validate } from './domain/validation.ts';
import { formatRub, formatPct, formatYears } from './domain/formatters.ts';

import { readFormState, writeFormState, applyProfile } from './ui/state.ts';
import {
  updateYearsLabel,
  showPresetWarning,
  renderValidationErrors,
  clearValidationErrors,
} from './ui/renderForm.ts';
import { renderResults, clearResults } from './ui/renderResults.ts';

// ── Bootstrap ─────────────────────────────────────────────────────────────

function init(): void {
  // Set initial form state
  writeFormState(DEFAULT_FORM_STATE);
  updateYearsLabel(DEFAULT_FORM_STATE.years);
  showPresetWarning(false);

  // Run first calculation
  runCalculation();

  // Bind events
  bindFormEvents();
  bindActionButtons();
  bindAdvancedToggle();
}

// ── Calculation cycle ─────────────────────────────────────────────────────

function runCalculation(): void {
  const state = readFormState();
  const { valid, errors } = validate(state);

  if (!valid) {
    renderValidationErrors(errors);
    clearResults();
    return;
  }

  clearValidationErrors();
  const result = calculate(state);
  renderResults(result, state.years);
}

// ── Form events ───────────────────────────────────────────────────────────

function bindFormEvents(): void {
  const formCard = document.getElementById('form-card');
  if (!formCard) return;

  // Delegate all input/change events inside the form card
  formCard.addEventListener('input', onFormChange);
  formCard.addEventListener('change', onFormChange);

  // Scenario selector (outside form-card, in a sibling card)
  document
    .getElementById('scenario-select')
    ?.addEventListener('change', () => {
      // Future: switch scenario module
    });
}

function onFormChange(e: Event): void {
  const target = e.target as HTMLElement;

  // Years range slider: update label
  if (target.id === 'input-years') {
    const years = parseInt((target as HTMLInputElement).value, 10);
    updateYearsLabel(years);
  }

  // Baseline profile select: apply preset + show/hide warning
  if (target.id === 'input-baseline-profile') {
    const profileKey = (target as HTMLSelectElement).value as ProfileKey;
    const profile = vendorProfiles[profileKey];
    applyProfile(profileKey);

    // Show warning for non-custom profiles
    showPresetWarning(profileKey !== 'custom');

    // If profile note is relevant, show it (future: tooltip)
    console.debug('[profile changed]', profile.note);
  }

  runCalculation();
}

// ── Action buttons ────────────────────────────────────────────────────────

function bindActionButtons(): void {
  // Load demo — header and hero variants
  ['btn-load-demo', 'btn-load-demo-hero'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', loadDemo);
  });

  // Reset
  document.getElementById('btn-reset')?.addEventListener('click', resetForm);

  // Scroll to form
  document.getElementById('btn-scroll-form')?.addEventListener('click', () => {
    document
      .getElementById('calculator')
      ?.scrollIntoView({ behavior: 'smooth' });
  });

  // Copy summary
  document
    .getElementById('btn-copy-summary')
    ?.addEventListener('click', copySummary);
}

function loadDemo(): void {
  writeFormState(DEMO_PRESET);
  updateYearsLabel(DEMO_PRESET.years);
  showPresetWarning(false);
  clearValidationErrors();
  runCalculation();

  // Scroll to calculator
  document
    .getElementById('calculator')
    ?.scrollIntoView({ behavior: 'smooth' });
}

function resetForm(): void {
  writeFormState(DEFAULT_FORM_STATE);
  updateYearsLabel(DEFAULT_FORM_STATE.years);
  showPresetWarning(false);
  clearValidationErrors();
  runCalculation();
}

async function copySummary(): Promise<void> {
  const state = readFormState();
  const { valid } = validate(state);
  if (!valid) return;

  const result = calculate(state);

  const lines = [
    '=== РОСА TCO Calculator — Сводка ===',
    '',
    `Горизонт: ${formatYears(state.years)}`,
    `Рабочих станций: ${state.workstations}`,
    `Серверов: ${state.servers}`,
    '',
    `Текущий TCO: ${formatRub(result.currentTco)}`,
    `TCO на РОСА: ${formatRub(result.rosaTco)}`,
    `Экономия: ${formatRub(result.savingsAbs)}`,
    result.savingsPct !== null
      ? `Экономия, %: ${formatPct(result.savingsPct)}`
      : '',
    result.breakEvenYear !== null
      ? `Окупаемость: ${result.breakEvenYear}-й год`
      : 'Окупаемость: не достигнута в горизонте расчёта',
    '',
    'Расчёт является ориентировочным и не является коммерческим предложением.',
  ]
    .filter((l) => l !== undefined)
    .join('\n');

  try {
    await navigator.clipboard.writeText(lines);
    showCopyFeedback();
  } catch {
    // Fallback for environments without clipboard API
    console.warn('Clipboard API unavailable');
  }
}

function showCopyFeedback(): void {
  const feedback = document.getElementById('copy-feedback');
  if (!feedback) return;
  feedback.classList.add('is-visible');
  setTimeout(() => feedback.classList.remove('is-visible'), 2500);
}

// ── Advanced toggle ────────────────────────────────────────────────────────

function bindAdvancedToggle(): void {
  const btn = document.getElementById('btn-advanced');
  const body = document.getElementById('advanced-body');
  if (!btn || !body) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    body.setAttribute('aria-hidden', String(expanded));
    body.classList.toggle('is-open', !expanded);
  });
}

// ── Start ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
