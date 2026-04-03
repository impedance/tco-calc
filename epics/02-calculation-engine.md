# Epic 2: Calculation Engine (Domain Logic)

**Owner:** Junior Developer  
**Status:** [x] DONE  

## Goal
Implement the business logic of the calculator as pure, testable TypeScript functions.

## Tasks

- [x] **Data Definitions**
  - Create `src/domain/types.ts`.
  - Define `InfrastructureInputs` (WS count, Server count, Horizon years, etc.).
  - Define `PricingAssumptions` (New license price, renewal price).
  - Define `CalculationOutput` (TCO Current, TCO ROSA, Savings, Break-even).

- [x] **Formula Implementation**
  - Implement `calculateCurrentTCO(inputs)` in `src/domain/calculator.ts`.
  - Implement `calculateRosaTCO(inputs, pricing)` (Logic: Year 1 = New, Years 2-5 = Renewal).
  - Implement `calculateSavings(currentTco, rosaTco)`.

- [x] **Break-even & Recommendation Logic**
  - Implement `findBreakEvenYear(inputs, pricing)`: Iterate through years 1..5 to find where cumulative ROSA costs drop below cumulative current costs.
  - Implement `getRecommendation(savingsAbs, breakEvenYear)` based on the thresholds in the Spec (promising vs manual review).

- [x] **Validation Layer**
  - Create `src/domain/validation.ts` to ensure counts >= 0 and years are 1..5.
  - Return clean error messages for the UI.

## Acceptance Criteria
- [x] All calculation functions are implemented in `src/domain/`.
- [x] No UI code is mixed with logic.
- [x] Functions handle edge cases (e.g., 0 workstations) without crashing.

## Implementation Notes

All domain files were implemented as part of Epic 1 scaffolding:

| File | Description |
|---|---|
| `src/domain/types.ts` | `FormState`, `TcoResult`, `YearlyCost`, `ValidationResult`, `Recommendation` types |
| `src/domain/calculator.ts` | `calcCurrentTco`, `calcRosaTco`, `calcYearlyCosts`, `calcBreakEvenYear`, `calculate`, `getRecommendation` |
| `src/domain/validation.ts` | Full validation with Russian error messages |
| `src/domain/formatters.ts` | `formatRub`, `formatPct`, `formatYears` formatters |
| `src/config/defaults.ts` | `ROSA_PRICING`, `RECOMMENDATION_CONFIG`, `DEFAULT_FORM_STATE`, `DEMO_PRESET` |
| `src/config/vendorProfiles.ts` | Vendor profiles: custom, basealt, astra, red |

Verified working in browser: calculations update in real-time, break-even detection works, recommendation badge displays correctly.
