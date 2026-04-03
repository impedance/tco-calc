# Epic 3: Reactivity & UI Implementation

**Owner:** Junior Developer  
**Status:** [ ] TODO  

## Goal
Connect the domain logic to the user interface and implement the interactive parts of the calculator.

## Tasks

- [ ] **State Management**
  - Create `src/ui/state.ts` to hold the current form values.
  - Implement a simple watcher/listener to trigger recalculation when state changes.

- [ ] **Form Binding**
  - Implement `src/ui/renderForm.ts`.
  - Bind input `onChange` and `onInput` events to the state.
  - Ensure immediate auto-recalculation (UX: results update as you type counts).

- [ ] **Results Rendering**
  - Implement `src/ui/renderResults.ts`.
  - Display result cards: Current TCO, ROSA TCO, Savings (Absolute and %).
  - Style the "Savings %" badge to be prominently visible.
  - Style the "Recommendation Badge" using ROSA colors (Orange for promising).

- [ ] **Visual Polish (ROSA Style)**
  - Ensure buttons have the `12px` border radius.
  - Add the `→` arrow icon to primary buttons as seen on `rosa.ru`.
  - Use **#FB693C** (Orange) for the primary "Contact Sales" or "Recalculate" buttons.

## Acceptance Criteria
- [ ] Changing an input immediately updates the result panel.
- [ ] The layout is clean and matches the ROSA design language.
- [ ] Recommendation text changes dynamically based on inputs.
