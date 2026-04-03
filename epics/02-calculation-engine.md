# Epic 2: Calculation Engine (Domain Logic)

**Owner:** Junior Developer  
**Status:** [ ] TODO  

## Goal
Implement the business logic of the calculator as pure, testable TypeScript functions.

## Tasks

- [ ] **Data Definitions**
  - Create `src/domain/types.ts`.
  - Define `InfrastructureInputs` (WS count, Server count, Horizon years, etc.).
  - Define `PricingAssumptions` (New license price, renewal price).
  - Define `CalculationOutput` (TCO Current, TCO ROSA, Savings, Break-even).

- [ ] **Formula Implementation**
  - Implement `calculateCurrentTCO(inputs)` in `src/domain/calculator.ts`.
  - Implement `calculateRosaTCO(inputs, pricing)` (Logic: Year 1 = New, Years 2-5 = Renewal).
  - Implement `calculateSavings(currentTco, rosaTco)`.

- [ ] **Break-even & Recommendation Logic**
  - Implement `findBreakEvenYear(inputs, pricing)`: Iterate through years 1..5 to find where cumulative ROSA costs drop below cumulative current costs.
  - Implement `getRecommendation(savingsAbs, breakEvenYear)` based on the thresholds in the Spec (promising vs manual review).

- [ ] **Validation Layer**
  - Create `src/domain/validation.ts` to ensure counts >= 0 and years are 1..5.
  - Return clean error messages for the UI.

## Acceptance Criteria
- [ ] All calculation functions are implemented in `src/domain/`.
- [ ] No UI code is mixed with logic.
- [ ] Functions handle edge cases (e.g., 0 workstations) without crashing.
