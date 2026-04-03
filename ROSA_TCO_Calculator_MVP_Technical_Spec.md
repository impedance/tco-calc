
# ROSA TCO Calculator MVP — Technical Specification (for Junior Developer)

**Document type:** Technical Specification / Implementation Brief  
**Language of implementation UI:** Russian (primary), English-ready structure  
**Document language:** English  
**Version:** 0.9  
**Prepared for:** MVP prototype and follow-up RFC  
**Prepared on:** 2026-04-03

---

## 1. Executive Summary

Build a **single-page web calculator** that helps a prospect or presales manager estimate whether migrating part of an existing infrastructure to **ROSA** is economically reasonable.

This is **not** a formal quote engine and **not** a full migration planner.  
It is a **fast presales / lead qualification tool** for the earliest commercial stage.

The first MVP must answer only one practical question:

> “If an organization migrates workstations and servers to ROSA, what is the rough 3-year cost difference versus the current stack?”

The output must be fast, visual, and simple enough to show to management in a live demo.

---

## 2. Business Context

ROSA already publicly positions itself as an ecosystem that spans operating systems, virtualization, management, directory, compatibility, documentation, and services.  
However, the current public funnel still relies mostly on product pages and contact forms.

A calculator is useful because it adds a **self-service intermediate step** between:
1. “I looked at the website”
2. “I am ready to speak to sales / request a pilot”

The calculator should:
- make the economic case tangible,
- warm up the lead before sales contact,
- provide a structured conversation starter for presales,
- support presentations to internal stakeholders (CIO / CFO / IT director).

This MVP should be aligned with the existing ROSA public positioning:
- ROSA home page: ecosystem positioning and “from testing to industrial rollout”.
- ROSA “Хром” page: publicly visible workstation/server prices.
- ROSA Virtualization page: public pricing exists, but that is a separate scenario and should **not** be mixed into MVP v1.
- ROSA Control Center page: public pricing exists, but pricing logic is more complex and should be excluded from the first version.

---

## 3. Product Hypothesis

If we provide a simple calculator that estimates 3-year TCO for ROSA vs. the current stack, then:

- prospects will understand the economic value faster,
- sales will receive better-qualified conversations,
- management will have a more concrete prototype than a generic “landing page idea”,
- the company will be able to test whether self-service ROI content improves engagement.

---

## 4. MVP Product Scope

### 4.1 In Scope for MVP

The MVP covers **only the OS migration scenario**:
- workstations
- servers

The MVP compares:
- **Current environment cost** (user-entered or loaded from a benchmark preset)
vs
- **ROSA target cost** (preloaded from ROSA public prices and editable in admin/config)

The MVP supports:
- 1-year to 5-year horizon (default: 3 years)
- workstation count
- server count
- basic migration one-time costs (optional advanced section)
- result visualization
- demo preset loading
- export / copy summary text

### 4.2 Out of Scope for MVP

Do **not** implement in v1:
- CRM integration
- email capture / lead form submission
- PDF generation
- backend
- authentication / admin panel
- database
- analytics dashboard
- competitor scraping
- auto-refresh from websites
- exact quote generation
- multi-scenario calculator for virtualization, directory, VDI, mobile, or management platform
- integration with ROSA compatibility database
- support for discounts by tender volume or reseller-specific pricing
- FSTEC-certified pricing variants as a separate official commercial mode
- legal / financial approval workflow
- multilingual UI switching (Russian-only UI is enough for the demo)

### 4.3 Why These Exclusions Matter

The first prototype must be:
- easy to build,
- easy to host,
- easy to explain,
- hard to break,
- low-risk from a data accuracy standpoint.

Anything that introduces data governance, quote accuracy, or operational complexity must be postponed to RFC / Phase 2.

---

## 5. User Personas

### Primary Persona A — Prospect-side IT Director / CIO
Needs a quick estimate whether migration is worth exploring.

### Primary Persona B — ROSA Presales / Sales Engineer
Needs a simple tool to support an early conversation and justify next steps (demo, workshop, pilot).

### Secondary Persona C — Internal Director / Product Lead
Needs a visible prototype that demonstrates commercial acceleration value.

---

## 6. Core User Stories

1. As a presales engineer, I want to enter workstation/server counts and show a rough 3-year savings estimate in under 2 minutes.
2. As a prospect, I want to understand whether ROSA is economically interesting before I talk to sales.
3. As a manager, I want the result page to clearly show:
   - current estimated cost,
   - ROSA estimated cost,
   - difference,
   - whether a pilot is worth discussing.
4. As a demo presenter, I want a “Load Example” button so the prototype can be shown live without typing everything manually.

---

## 7. Recommended Technical Stack

## 7.1 Primary Recommendation

Use a **static single-page application** with:

- **Vite**
- **TypeScript**
- **HTML**
- **CSS**
- no frontend framework
- no backend

### Why this stack
- simple enough for a junior developer,
- more maintainable than raw plain JS,
- deployable to **GitHub Pages**,
- good basis for future RFC and later migration to React if needed,
- no server costs,
- deterministic build,
- easy to review.

## 7.2 Fallback Simpler Option

If the junior is not comfortable with TypeScript tooling, plain:
- `index.html`
- `styles.css`
- `app.js`

is acceptable for the prototype.

## 7.3 Do Not Use for MVP
- React
- Next.js
- Node backend
- Python backend
- charting libraries
- Tailwind
- databases

Reason: unnecessary complexity for a proof-of-value demo.

---

## 8. High-Level Architecture

Suggested file structure:

```text
rosa-tco-calculator/
  index.html
  src/
    main.ts
    styles.css
    config/
      vendorProfiles.ts
      defaults.ts
    domain/
      types.ts
      calculator.ts
      validation.ts
      formatters.ts
    ui/
      renderForm.ts
      renderResults.ts
      renderCharts.ts
      state.ts
    assets/
      logo-placeholder.svg
  public/
    favicon.ico
  package.json
  README.md
```

### Notes
- `vendorProfiles.ts` contains preloaded benchmark values.
- `calculator.ts` contains pure functions only.
- `renderCharts.ts` should use simple CSS bars or inline SVG, not a heavy chart library.
- No network requests are required in MVP.

---

## 9. UX / UI Requirements

## 9.1 General Layout

Single-page app, vertical flow:

1. **Intro / explanation block**
2. **Scenario selector block** (MVP: only one scenario enabled)
3. **Input form**
4. **Advanced options (collapsed by default)**
5. **Results panel**
6. **Disclaimer**
7. **CTA placeholder block**

## 9.2 Visual Principles
- clean, minimal, corporate,
- white background or very light gray,
- one ROSA-accent color,
- no flashy animations,
- large readable numbers,
- strong emphasis on the result.

## 9.3 Form Layout
Desktop:
- two-column layout:
  - left: inputs
  - right: results

Mobile:
- stacked layout

## 9.4 Required Form Controls

### Basic Inputs
- Number of workstations
- Number of servers
- Calculation horizon in years (1–5, default 3)
- Baseline profile
  - Custom current stack (default)
  - BaseAlt public benchmark
  - Astra manual benchmark
  - RED manual benchmark
- Support plan for ROSA
  - Standard (default)
  - Extended (displayed but may be disabled in v1 if renewals are not fully confirmed)

### Baseline Cost Inputs
When `Custom current stack` is selected:
- Current annual cost per workstation
- Current annual cost per server

When a preset profile is selected:
- prefill available values,
- allow manual editing,
- show a warning if the profile is based on incomplete public data.

### Advanced Inputs (collapsed by default)
- One-time migration cost total
- One-time training cost total
- One-time pilot / implementation cost total
- Additional hardware delta total (positive or negative)
- Notes (non-calculating, optional textarea for demo only)

## 9.5 Results Layout
Display as summary cards:

- Estimated current stack TCO
- Estimated ROSA TCO
- Estimated savings / additional cost
- Savings percentage
- Break-even year (if applicable)
- Recommendation badge:
  - “Looks promising for pilot”
  - “Needs manual review”
  - “Likely not enough economic upside”

## 9.6 Demo Controls
Must have:
- `Load Demo Example`
- `Reset`
- `Copy Summary`

Optional:
- `Share link with query params` (only if trivial)

---

## 10. Functional Requirements

## 10.1 Scenario Support

### MVP supports only:
- **OS migration scenario**

### Not supported in MVP:
- virtualization ROI
- directory replacement ROI
- Control Center ROI
- VDI ROI
- mixed scenario bundles

These can be added later as separate calculators or scenario modules.

## 10.2 Calculation Modes

### Mode A — Primary / Accurate Enough for MVP
**Current stack entered manually by user**

This is the safest business mode because competitor public pricing is incomplete and not directly comparable.

### Mode B — Demo Benchmark Presets
For internal demos and exploratory comparison only:
- BaseAlt preset (partially preloaded from public base price list)
- Astra preset (manual only)
- RED preset (manual only)

Show a visible disclaimer:
> Benchmark presets are illustrative and do not replace a reseller or vendor quote.

## 10.3 Validation Rules
- workstation count: integer, min 0
- server count: integer, min 0
- cannot both be 0
- years: integer, min 1, max 5
- all money values: number, min 0
- migration/training/pilot/hardware delta: allow 0; hardware delta may be negative only if explicitly permitted by business owner (default: allow negative)
- if any invalid input exists, disable or soft-disable result calculation until corrected

## 10.4 Result Recalculation
- results must update immediately on input change
- debouncing is optional
- no page reload

---

## 11. Data Sources and Pricing Strategy

## 11.1 Public ROSA Data That Can Be Preloaded

### ROSA “Хром” public prices
Use these as the initial ROSA workstation/server defaults.

**Standard support, new license, includes 1 year of support**
- Workstation: **6,072 RUB**
- Server: **12,834 RUB**

**Standard renewal / additional support**
- Workstation: **4,237 RUB**
- Server: **8,603 RUB**

These values should be stored in config and editable.

## 11.2 Public ROSA Data That Must NOT Be Used in MVP v1 Formula
Even though public prices exist, exclude them from the calculator logic for v1:
- ROSA Virtualization
- ROSA Control Center
- Resource Manager
- Dynamic Directory

Reason:
- they correspond to different commercial scenarios,
- pricing units differ (per host, per VM, per device, etc.),
- mixing them into the first calculator would create confusing and less trustworthy output.

## 11.3 Benchmark Data Strategy

### BaseAlt
A public December 2025 base price sheet exists.
Usable as **illustrative preset only**:
- Alt Workstation 11: **6,080 RUB**
- Alt Server 11: **15,180 RUB**
- Alt Domain 11: **212,750 RUB**
- Alt Virtualization 11: **101,200 RUB**

For MVP OS scenario, only workstation/server values matter.

### Astra
Do **not** preload fixed Astra prices in MVP unless internal sales approves them.
Official site states price depends on:
- security level
- certification
- delivery format
- device type
- term
- support type
- other contractual conditions

Therefore Astra preset in MVP should be:
- empty by default, or
- manually configurable in code,
- clearly marked as “manual benchmark”.

### RED
Do **not** preload fixed RED prices in MVP unless internal sales approves them.
Official site states pricing is calculated individually.

Therefore RED preset should also be:
- empty by default, or
- manually configurable in code,
- marked as “manual benchmark”.

## 11.4 Data That Must Be Collected Before Production Release

The prototype can ship with public defaults, but before any public launch the following must be confirmed with ROSA sales / product owner:

1. Are ROSA “Хром” prices intended to be used as public benchmark inputs in a calculator?
2. Should the calculator use:
   - standard support only,
   - extended support,
   - or both?
3. Should volume discounts be represented?
4. Should certified editions be included or excluded?
5. Should the baseline be compared primarily against:
   - custom current stack,
   - Astra,
   - BaseAlt,
   - RED,
   - or a generic “current environment”?
6. Which disclaimer text is legally approved?

---

## 12. Calculation Logic

## 12.1 Default MVP Formula

### Current Stack TCO
```text
current_tco =
  (workstations * current_workstation_annual_cost * years) +
  (servers * current_server_annual_cost * years)
```

### ROSA TCO
```text
rosa_license_support_cost =
  (workstations * (rosa_ws_new + rosa_ws_renewal * (years - 1))) +
  (servers * (rosa_server_new + rosa_server_renewal * (years - 1)))

rosa_one_time_costs =
  migration_cost_total +
  training_cost_total +
  pilot_cost_total +
  hardware_delta_total

rosa_tco =
  rosa_license_support_cost + rosa_one_time_costs
```

### Savings
```text
savings_abs = current_tco - rosa_tco
savings_pct = savings_abs / current_tco
```

If `current_tco == 0`, show:
- absolute values only,
- no percentage.

## 12.2 Break-even Year
For years 1..N calculate cumulative costs for current stack and ROSA.
First year where:
```text
cumulative_rosa <= cumulative_current
```
is the break-even year.

If never reached in selected horizon:
- show “No break-even within selected horizon”.

## 12.3 Recommendation Logic (Simple Rules)
Use a simple heuristic:

- If savings_abs > 0 and break-even <= selected years:
  - `Looks promising for pilot`
- If savings_abs is near zero (e.g. within ±5%):
  - `Needs manual review`
- If savings_abs < 0:
  - `Likely not enough economic upside`

Thresholds should live in config.

---

## 13. Input Defaults

## 13.1 Recommended Defaults
- Workstations: 500
- Servers: 25
- Years: 3
- Baseline profile: Custom current stack
- Current workstation annual cost: 7,500 RUB (placeholder, editable)
- Current server annual cost: 16,000 RUB (placeholder, editable)
- Migration cost total: 0
- Training cost total: 0
- Pilot cost total: 0
- Hardware delta total: 0

## 13.2 Demo Example
Provide a built-in demo example:
- Workstations: 500
- Servers: 25
- Years: 3
- Current workstation annual cost: 8,500 RUB
- Current server annual cost: 18,000 RUB
- Migration cost total: 350,000 RUB
- Training cost total: 150,000 RUB
- Pilot cost total: 100,000 RUB
- Hardware delta total: 0

The point of the demo is not accounting precision.
The point is to show:
- clear input,
- clear output,
- clear commercial story.

---

## 14. Russian UI Copy Requirements

Even though this spec is in English, the UI must be Russian-first.

Suggested labels:

- `Количество рабочих станций`
- `Количество серверов`
- `Горизонт расчёта`
- `Текущий профиль`
- `Текущая стоимость на 1 рабочее место в год`
- `Текущая стоимость на 1 сервер в год`
- `Разовые затраты на миграцию`
- `Разовые затраты на обучение`
- `Разовые затраты на пилот`
- `Доп. затраты / экономия на оборудовании`

Result labels:
- `Текущий TCO`
- `TCO на ROSA`
- `Экономия`
- `Экономия, %`
- `Окупаемость`
- `Рекомендация`

Disclaimer:
> Расчёт является ориентировочным и не является коммерческим предложением.

CTA placeholder:
> Хотите проверить расчёт на вашем контуре? Запросите консультацию / пилот.

---

## 15. Visual Design Notes

## 15.1 Mandatory MVP Components
- top header with product name
- short subtitle explaining purpose
- “Load demo example” button
- form card
- result card
- one simple comparison visualization

## 15.2 Result Visualization
Use one of:
- horizontal comparison bars
- two-column cost comparison blocks
- stacked yearly mini-bars

Avoid:
- pie charts
- 3D charts
- chart libraries

## 15.3 Suggested Wireframe

```text
------------------------------------------------------
ROSA TCO Calculator
Short explanation
[Load demo] [Reset]

| Inputs                              | Results       |
|-------------------------------------|---------------|
| Workstations                        | Current TCO   |
| Servers                             | ROSA TCO      |
| Years                               | Savings       |
| Baseline profile                    | Savings %     |
| Baseline costs                      | Break-even    |
| [Advanced options]                  | Recommendation|
| [Calculate auto-updates]            | Bar chart     |

Disclaimer
CTA placeholder
------------------------------------------------------
```

---

## 16. What the Junior Developer Must NOT Overbuild

Do not overbuild any of the following:

### 16.1 No Exact Procurement Engine
This is not for tenders, legal docs, or official offers.

### 16.2 No Full Competitor Intelligence Layer
Do not scrape competitor websites or attempt live pricing sync.

### 16.3 No Full Migration Wizard
This is not the Migration Readiness Scanner.  
Do not ask AD / SCCM / VDI / policy / peripheral questions in this calculator.

### 16.4 No Rich Admin System
All vendor profile values may live in a plain config file.

### 16.5 No Backend
Do not build an API unless specifically requested later.

### 16.6 No PDF Export in MVP
A copyable text summary is enough.

---

## 17. Acceptance Criteria

The MVP is accepted when:

1. It runs locally and on GitHub Pages.
2. It loads with no backend.
3. A user can enter:
   - workstation count,
   - server count,
   - years,
   - current annual cost values.
4. The calculator immediately shows:
   - current TCO,
   - ROSA TCO,
   - savings,
   - savings percentage,
   - break-even year (or no break-even).
5. ROSA default price values are loaded from config.
6. The app has one demo preset.
7. The UI is readable on desktop and mobile.
8. The disclaimer is always visible near the result.
9. The code separates:
   - data/config,
   - calculation logic,
   - rendering.
10. The code can be used as input for an RFC later.

---

## 18. Suggested Implementation Plan

## Phase 0 — Setup
- create repository
- scaffold Vite + TypeScript project
- add static layout
- commit base structure

## Phase 1 — Core Logic
- define data types
- implement calculator functions
- implement validation
- unit test the main formulas if possible

## Phase 2 — UI
- build form
- bind state
- render results
- add demo preset / reset
- add disclaimer and CTA placeholder

## Phase 3 — Polish
- mobile responsiveness
- copy summary button
- error states
- formatting in RUB
- final cleanup

---

## 19. Testing Checklist

### Manual Cases
1. 500 workstations / 25 servers / 3 years / custom baseline
2. Only workstations
3. Only servers
4. 1 year horizon
5. 5 year horizon
6. Zero values invalid state
7. Large values (10,000 workstations)
8. Advanced costs enabled
9. Negative hardware delta if allowed
10. Demo preset load/reset works

### Edge Cases
- current_tco equals 0
- ROSA more expensive than baseline
- break-even not reached
- all advanced costs zero
- non-numeric input rejected

---

## 20. Future RFC Topics (Do Not Build Yet)

These topics should go into the later RFC, not MVP implementation:

1. Add **Migration Readiness Scanner Lite** as a second product.
2. Add scenario selector:
   - OS migration
   - Virtualization
   - Directory replacement
3. Add CRM integration.
4. Add PDF export and lead capture.
5. Add official competitor pricing tables approved by sales.
6. Add segmented versions:
   - commercial
   - public sector
   - certified / FSTEC
7. Add ROSA bundle pricing:
   - Chrome + Control Center
   - Chrome + Dynamic Directory
   - Chrome + Virtualization
8. Add shareable report URLs.
9. Add analytics events.
10. Add A/B testing on copy and CTA.

---

## 21. Open Questions for Product Owner / Sales Owner

These must be resolved before public launch:

1. Which ROSA product should be the commercial focus of the calculator?
   - ROSA Chrome only?
   - Chrome + support only?
   - Chrome + Control Center?
2. Is the calculator meant for:
   - website visitors,
   - presales team only,
   - or director demo only?
3. Should the baseline compare against:
   - custom current environment,
   - or named competitors?
4. Are public price pages sufficient for the prototype?
5. Is it acceptable to show non-certified pricing only?
6. Should the result always push toward:
   - pilot,
   - consultation,
   - demo,
   - or “download a checklist”?
7. Does legal require a specific disclaimer?

---

## 22. Appendix A — Proposed Default Vendor Config

```ts
export const vendorProfiles = {
  rosa: {
    label: "ROSA",
    workstationNew: 6072,
    workstationRenewal: 4237,
    serverNew: 12834,
    serverRenewal: 8603,
    note: "Public ROSA Chrome prices, standard support, editable."
  },
  custom: {
    label: "Custom current stack",
    workstationAnnual: 7500,
    serverAnnual: 16000,
    note: "Default editable baseline."
  },
  basealt: {
    label: "BaseAlt benchmark",
    workstationAnnual: 6080,
    serverAnnual: 15180,
    note: "Public December 2025 base retail values; support assumptions not included."
  },
  astra: {
    label: "Astra manual benchmark",
    workstationAnnual: null,
    serverAnnual: null,
    note: "Official site uses partner-defined pricing; manual values required."
  },
  red: {
    label: "RED manual benchmark",
    workstationAnnual: null,
    serverAnnual: null,
    note: "Official site indicates pricing is calculated individually; manual values required."
  }
}
```

---

## 23. Appendix B — Recommended Disclaimer Text

Short version:
> This estimate is indicative only and is not a commercial offer.

Russian version:
> Расчёт является ориентировочным и не является коммерческим предложением.

Extended version:
> The result is based on publicly available ROSA data and/or manually entered assumptions. Final project cost depends on support level, certification requirements, deployment scope, integration work, partner terms, and other commercial conditions.

---

## 24. Appendix C — Sources to Verify During RFC

### ROSA
- ROSA home page
- ROSA Chrome pricing page
- ROSA Virtualization pricing page
- ROSA Control Center pricing page
- ROSA compatible software page
- ROSA customers page

### Competitors
- Astra pricing policy page
- BaseAlt public base prices PDF
- RED purchase / pricing page

### Internal Sources Needed
- sales-approved benchmark assumptions
- reseller feedback
- discount logic (if any)
- approved disclaimer text
- strategic preference: compare to custom current stack vs named competitors

---

## 25. Final Recommendation

For the first implementation:
- build **one static SPA**
- support **one scenario only**: OS migration
- compare **custom current stack vs ROSA**
- keep competitor presets **illustrative only**
- do **not** include CRM, backend, PDF, or multi-product bundles
- optimize for **clarity, trust, and speed of demo**

If this prototype proves useful, use it as the basis for an RFC and then implement the second tool:
**Migration Readiness Scanner Lite**.

