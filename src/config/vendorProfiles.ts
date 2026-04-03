// ── src/config/vendorProfiles.ts ──────────────────────────────────────────
// Preloaded vendor/benchmark price data for the ROSA TCO Calculator.
// All monetary values are in RUB (Russian Roubles).
// Source: ROSA public pricing, December 2025.

export type ProfileKey = 'custom' | 'basealt' | 'astra' | 'red';

export interface VendorProfile {
  key: ProfileKey;
  label: string;
  /** Annual cost per workstation in RUB. null = requires manual input. */
  workstationAnnual: number | null;
  /** Annual cost per server in RUB. null = requires manual input. */
  serverAnnual: number | null;
  note: string;
  isManual: boolean;
}

export const vendorProfiles: Record<ProfileKey, VendorProfile> = {
  custom: {
    key: 'custom',
    label: 'Ввести вручную',
    workstationAnnual: 7_500,
    serverAnnual: 16_000,
    note: 'Ориентировочные значения. Введите фактические данные вашей организации.',
    isManual: false,
  },
  basealt: {
    key: 'basealt',
    label: 'BaseAlt (иллюстративный)',
    workstationAnnual: 6_080,
    serverAnnual: 15_180,
    note: 'Публичный прайс-лист BaseAlt, декабрь 2025. Условия поддержки не включены. Только для сравнения.',
    isManual: false,
  },
  astra: {
    key: 'astra',
    label: 'Astra (вручную)',
    workstationAnnual: null,
    serverAnnual: null,
    note: 'Официальный сайт указывает, что цена определяется партнёром. Введите значения вручную.',
    isManual: true,
  },
  red: {
    key: 'red',
    label: 'RED OS (вручную)',
    workstationAnnual: null,
    serverAnnual: null,
    note: 'Официальный сайт указывает, что цена рассчитывается индивидуально. Введите значения вручную.',
    isManual: true,
  },
};
