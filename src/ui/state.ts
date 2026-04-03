// ── src/ui/state.ts ──────────────────────────────────────────────────────
// Reactive application state — read form DOM → FormState.

import { DEFAULT_FORM_STATE } from '../config/defaults.ts';
import { vendorProfiles } from '../config/vendorProfiles.ts';
import type { FormState } from '../domain/types.ts';
import type { ProfileKey } from '../config/vendorProfiles.ts';

function getInputNumber(id: string): number {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (!el) return 0;
  const v = parseFloat(el.value);
  return isNaN(v) ? 0 : v;
}

function getInputInt(id: string): number {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (!el) return 0;
  const v = parseInt(el.value, 10);
  return isNaN(v) ? 0 : v;
}

function getSelectValue(id: string): string {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  return el?.value ?? '';
}

function getTextareaValue(id: string): string {
  const el = document.getElementById(id) as HTMLTextAreaElement | null;
  return el?.value ?? '';
}

/** Read current form values from the DOM into a FormState object. */
export function readFormState(): FormState {
  return {
    workstations: getInputInt('input-workstations'),
    servers: getInputInt('input-servers'),
    years: getInputInt('input-years'),
    baselineProfile: getSelectValue('input-baseline-profile') as ProfileKey,
    wsAnnualCost: getInputNumber('input-ws-cost'),
    srvAnnualCost: getInputNumber('input-srv-cost'),
    migrationCost: getInputNumber('input-migration-cost'),
    trainingCost: getInputNumber('input-training-cost'),
    pilotCost: getInputNumber('input-pilot-cost'),
    hwDelta: getInputNumber('input-hw-delta'),
    notes: getTextareaValue('input-notes'),
  };
}

/** Write a FormState back to the DOM (used by reset / load demo). */
export function writeFormState(state: FormState): void {
  setInput('input-workstations', state.workstations);
  setInput('input-servers', state.servers);
  setInput('input-years', state.years);
  setSelect('input-baseline-profile', state.baselineProfile);
  setInput('input-ws-cost', state.wsAnnualCost);
  setInput('input-srv-cost', state.srvAnnualCost);
  setInput('input-migration-cost', state.migrationCost);
  setInput('input-training-cost', state.trainingCost);
  setInput('input-pilot-cost', state.pilotCost);
  setInput('input-hw-delta', state.hwDelta);
  setTextarea('input-notes', state.notes);
}

function setInput(id: string, value: number): void {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (el) el.value = String(value);
}

function setSelect(id: string, value: string): void {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  if (el) el.value = value;
}

function setTextarea(id: string, value: string): void {
  const el = document.getElementById(id) as HTMLTextAreaElement | null;
  if (el) el.value = value;
}

/** Apply a vendor profile preset to cost inputs. */
export function applyProfile(profileKey: ProfileKey): void {
  const profile = vendorProfiles[profileKey];
  if (profile.workstationAnnual !== null) {
    setInput('input-ws-cost', profile.workstationAnnual);
  }
  if (profile.serverAnnual !== null) {
    setInput('input-srv-cost', profile.serverAnnual);
  }
}

export { DEFAULT_FORM_STATE };
