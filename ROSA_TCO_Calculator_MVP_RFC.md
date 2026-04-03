# RFC: ROSA TCO Calculator MVP

- **Status:** Draft
- **Version:** 1.0
- **Date:** 2026-04-03
- **Author:** OpenAI / project draft
- **Audience:** Junior developers, tech lead, product owner, presales owner
- **Target language of UI:** Russian
- **Document language:** English
- **Related document:** `ROSA_TCO_Calculator_MVP_Technical_Spec.md`

---

## 1. Summary

This RFC proposes building a **static single-page TCO calculator** for early commercial conversations around **ROSA OS migration**.

The calculator will estimate whether migrating a customer’s **workstations** and **servers** to ROSA is economically promising over a **1–5 year horizon** (default: 3 years).

The MVP is intentionally narrow:

- one scenario only: **OS migration**
- one delivery mode: **static SPA**
- one primary comparison model: **Current stack vs ROSA**
- one purpose: **presales acceleration / early lead qualification**

This is **not** a quoting engine, **not** a procurement tool, and **not** a full migration planner.

The goal of the MVP is to create a prototype that is:

- easy to demo to leadership,
- easy for a junior developer to build,
- easy to host on GitHub Pages or a simple static host,
- trustworthy enough for early commercial use with proper disclaimers.

---

## 2. Why this exists

ROSA already has public product pages, public calls to action, and at least partial public pricing on some products. However, the public funnel still relies mostly on content pages and direct contact forms.

There is a missing intermediate step between:

1. “I looked at the product page”
2. “I am ready to talk to sales / request a pilot”

This RFC addresses that gap with a lightweight self-service calculator.

### The intended business value

The calculator should help:

- **prospects** understand economic feasibility faster,
- **presales / sales** get more structured and warmer conversations,
- **management** see a concrete prototype for sales acceleration,
- **product / marketing** test whether financial framing improves engagement.

---

## 3. Problem statement

Today, many potential buyers do not have an easy way to answer a simple first-stage question:

> “Is switching to ROSA financially worth deeper evaluation?”

Without such a tool, the user must either:

- manually compare websites and assumptions,
- immediately contact sales,
- or leave without taking the next step.

This creates three problems:

1. **High cognitive load** for the prospect.
2. **Low self-qualification** before sales interaction.
3. **Weak commercial storytelling** at the earliest stage.

---

## 4. Decision

We will build **ROSA TCO Calculator MVP** as a **static SPA** with the following core behavior:

- user enters infrastructure size and baseline annual costs,
- calculator applies public/configured ROSA pricing assumptions,
- calculator estimates 1–5 year TCO,
- calculator shows difference, savings %, and break-even,
- calculator ends with a clear recommendation and a CTA placeholder.

This RFC recommends **not** building any backend, CRM integration, PDF export, or competitor automation in phase 1.

---

## 5. Scope

### 5.1 In scope

The MVP must include:

- single-page web app,
- Russian UI,
- desktop + mobile responsive layout,
- one scenario only: **OS migration**,
- inputs for workstation count,
- inputs for server count,
- calculation horizon (1–5 years),
- baseline selection:
  - Custom current stack (default)
  - Illustrative benchmark presets (optional but recommended for demo)
- advanced one-time cost inputs:
  - migration
  - training
  - pilot / implementation
  - hardware delta
- output cards:
  - current TCO
  - ROSA TCO
  - savings / extra cost
  - savings percentage
  - break-even year
  - recommendation badge
- demo helpers:
  - load demo values
  - reset
  - copy summary
- disclaimers always visible near result.

### 5.2 Out of scope

Do **not** include in MVP:

- CRM integration
- email capture
- backend / API
- database
- authentication
- admin panel
- PDF generation
- Excel export
- live pricing sync
- competitor scraping
- scenario selector with virtualization / directory / VDI / mobile
- bundle logic (e.g. Chrome + Control Center + Directory)
- procurement / tender workflow
- exact quote generation
- certified edition pricing matrix
- deal discount logic
- legal approval workflow
- A/B framework
- analytics dashboard

### 5.3 Why we are intentionally narrow

The MVP must optimize for:

- speed of implementation,
- clarity of explanation,
- trustworthiness,
- low maintenance,
- ability to convert into implementation tasks without architectural churn.

If we widen scope too early, the result becomes a half-built commercial platform rather than a usable demo.

---

## 6. Product goals

### 6.1 Primary goal

Provide a reliable early-stage calculator that lets a user estimate whether ROSA migration appears financially promising.

### 6.2 Secondary goals

- give presales a reusable demo tool,
- create a stronger bridge from product content to pilot conversation,
- establish a codebase that can later evolve into a richer migration toolkit,
- create an implementation slice suitable for juniors.

### 6.3 Non-goals

The calculator is **not** intended to:

- replace a commercial offer,
- produce exact deal pricing,
- benchmark competitors with contractual precision,
- answer migration readiness in operational detail,
- assess software compatibility,
- support official procurement documents.

---

## 7. Success criteria

The MVP is successful if:

1. A junior developer can implement it in a short cycle without backend complexity.
2. A manager can understand the value of the prototype in a 3–5 minute live demo.
3. A presales engineer can use it in a real exploratory conversation.
4. The result is visually credible and easy to explain.
5. The codebase is clean enough to serve as a base for a later RFC / phase 2.

---

## 8. Users and use cases

### 8.1 Personas

#### Persona A — Prospect-side IT Director / CIO
Needs a rough financial estimate before committing to a deeper discussion.

#### Persona B — ROSA Presales / Sales Engineer
Needs a simple way to structure a conversation and translate infrastructure size into an economic story.

#### Persona C — Internal Director / Business Owner
Needs a visible proof that a small web tool can accelerate commercial motion.

### 8.2 Primary use cases

1. **Director demo**
   - open calculator,
   - load demo example,
   - show 3-year comparison,
   - explain how this warms leads.

2. **Presales exploratory call**
   - ask for workstation/server counts,
   - enter assumptions,
   - show whether pilot discussion is justified.

3. **Website self-service stage**
   - visitor enters rough values,
   - sees indicative result,
   - is nudged toward consultation / pilot.

---

## 9. Product shape

### 9.1 User flow

1. User opens calculator.
2. User sees a short explanation that the estimate is indicative only.
3. User selects or keeps default baseline profile.
4. User enters infrastructure counts.
5. User optionally opens advanced one-time cost section.
6. Results update automatically.
7. User copies summary or proceeds to consultation / pilot CTA placeholder.

### 9.2 Required top-level sections

The page must contain the following blocks in order:

1. Header / title
2. Short purpose description
3. Control row (`Load demo`, `Reset`, optional profile selector)
4. Main two-column layout:
   - left: form
   - right: results
5. Advanced assumptions block
6. Result explanation / disclaimer
7. CTA placeholder block

---

## 10. Functional requirements

### 10.1 Inputs

#### Required basic inputs

- `workstationsCount` — integer >= 0
- `serversCount` — integer >= 0
- `years` — integer from 1 to 5, default 3
- `baselineProfile` — enum
- `currentWorkstationAnnualCost` — number >= 0
- `currentServerAnnualCost` — number >= 0

#### Optional advanced inputs

- `migrationCostTotal` — number >= 0
- `trainingCostTotal` — number >= 0
- `pilotCostTotal` — number >= 0
- `hardwareDeltaTotal` — number (can be negative if enabled by config)
- `notes` — string, not used in calculation

### 10.2 Output metrics

The calculator must always show:

- `currentTco`
- `rosaTco`
- `savingsAbsolute`
- `savingsPercent` (only when `currentTco > 0`)
- `breakEvenYear` or “not reached”
- `recommendationBadge`

### 10.3 Recommendation logic

Keep logic deliberately simple and configurable.

Suggested thresholds:

- if `savingsAbsolute > 0` and break-even is reached within selected horizon → `Looks promising for pilot`
- if savings are within a configurable near-zero band (for example ±5%) → `Needs manual review`
- if `savingsAbsolute < 0` → `Likely not enough economic upside`

### 10.4 Validation rules

- both workstation and server counts cannot be zero simultaneously,
- all numeric fields must reject non-numeric invalid values,
- years must be in 1–5 range,
- invalid state must be visible in UI,
- calculator must not crash on empty inputs.

### 10.5 Recalculation behavior

- results recalculate automatically on change,
- no page reload,
- no network requests.

---

## 11. Pricing and benchmark strategy

### 11.1 ROSA data strategy

The MVP should preload ROSA default values from a local config file.

Recommended initial source for OS scenario:

- **ROSA Chrome workstation and server public prices**
- use public “new license + first year support” and “renewal / support extension” style assumptions where available

The product owner / sales owner must verify whether these exact public values are approved for use inside a calculator before public rollout.

### 11.2 Baseline strategy

The **primary mode** should be:

- user enters current annual costs manually.

This is the safest and most honest commercial approach because competitor pricing is not cleanly comparable in public sources.

### 11.3 Illustrative presets

The app may support illustrative presets for internal demo use only:

- `Custom current stack` — default and editable
- `BaseAlt benchmark` — optional if values are validated by business owner
- `Astra manual benchmark` — empty by default or code-configured manually
- `RED manual benchmark` — empty by default or code-configured manually

### 11.4 Rules for competitor baselines

- do **not** claim official competitor prices unless verified and approved,
- do **not** scrape competitor sites,
- do **not** imply procurement-grade comparability,
- do **not** hard-code uncertain values as “official”.

### 11.5 Data that must be verified before public launch

Before any external launch, confirm:

1. approved ROSA price defaults,
2. whether standard support or another support mode should be the default,
3. whether discounts should be ignored or represented,
4. whether certified editions are included or excluded,
5. whether competitor presets can be shown at all,
6. final disclaimer wording.

---

## 12. Calculation model

### 12.1 Core formulas

#### Current stack TCO

```text
current_tco =
  (workstations * current_workstation_annual_cost * years) +
  (servers * current_server_annual_cost * years)
```

#### ROSA recurring cost

```text
rosa_recurring_tco =
  (workstations * (rosa_ws_new + rosa_ws_renewal * (years - 1))) +
  (servers * (rosa_server_new + rosa_server_renewal * (years - 1)))
```

#### ROSA one-time cost

```text
rosa_one_time_costs =
  migration_cost_total +
  training_cost_total +
  pilot_cost_total +
  hardware_delta_total
```

#### ROSA total TCO

```text
rosa_tco = rosa_recurring_tco + rosa_one_time_costs
```

#### Savings

```text
savings_abs = current_tco - rosa_tco
savings_pct = savings_abs / current_tco
```

If `current_tco == 0`, the UI must suppress the percentage calculation.

### 12.2 Break-even logic

For each year in the selected horizon:

- compute cumulative current stack cost,
- compute cumulative ROSA cost,
- first year where `rosa <= current` is the break-even year.

If it never happens in the selected horizon, show:

- `No break-even within selected horizon`.

### 12.3 Philosophy of this model

This is intentionally a **rough presales model**.

It is acceptable because:

- it is explainable,
- it is inspectable,
- it can be challenged and edited,
- it avoids fake precision.

It is preferable to an overcomplicated model that looks more “serious” but becomes impossible to trust or maintain.

---

## 13. UX requirements

### 13.1 Layout

Desktop:

- two columns,
- form on the left,
- results on the right,
- sticky or visually anchored result card preferred.

Mobile:

- stacked layout,
- form before results.

### 13.2 Visual principles

- minimal corporate style,
- light background,
- one accent color inspired by ROSA branding,
- no decorative animation,
- large numbers,
- obvious hierarchy,
- obvious disclaimer.

### 13.3 Required controls

- `Load demo example`
- `Reset`
- `Copy summary`

Optional if trivial:

- `Share URL with query params`

### 13.4 Result visualization

Keep visuals simple:

- horizontal bars,
- side-by-side summary cards,
- or tiny inline yearly comparison bars.

Do not use:

- pie charts,
- 3D charts,
- heavy chart libraries.

### 13.5 Russian-first UI copy

The UI should be Russian-first.

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
- `Текущий TCO`
- `TCO на ROSA`
- `Экономия`
- `Экономия, %`
- `Окупаемость`
- `Рекомендация`

---

## 14. Technical design

### 14.1 Recommended stack

Preferred stack:

- **Vite**
- **TypeScript**
- **HTML + CSS**
- no framework
- no backend

Why:

- still simple for juniors,
- more maintainable than pure untyped JS,
- easy static deployment,
- clean path to future growth.

### 14.2 Acceptable fallback

If the junior team is more comfortable with plain static files:

- `index.html`
- `styles.css`
- `app.js`

This is acceptable for the MVP.

### 14.3 Explicit anti-patterns for MVP

Do not use:

- React
- Next.js
- Express
- FastAPI
- databases
- auth
- charting frameworks
- Tailwind if the team will waste time on setup

The product value is not in the framework choice.

### 14.4 File structure recommendation

```text
rosa-tco-calculator/
  index.html
  src/
    main.ts
    styles.css
    config/
      vendorProfiles.ts
      defaults.ts
      thresholds.ts
    domain/
      types.ts
      calculator.ts
      validation.ts
      formatters.ts
    ui/
      renderForm.ts
      renderResults.ts
      state.ts
      events.ts
    assets/
      logo-placeholder.svg
  README.md
  package.json
```

### 14.5 Design principles in code

- keep calculation logic pure,
- keep config separate from UI,
- no pricing constants buried in rendering code,
- no network dependency,
- easy local run,
- easy GitHub Pages deployment.

---

## 15. Defaults and demo data

### 15.1 Recommended initial defaults

- workstations: `500`
- servers: `25`
- years: `3`
- baseline profile: `Custom current stack`
- current workstation annual cost: `7500 RUB`
- current server annual cost: `16000 RUB`
- migration: `0`
- training: `0`
- pilot: `0`
- hardware delta: `0`

### 15.2 Demo example

Include one built-in demo scenario, for example:

- workstations: `500`
- servers: `25`
- years: `3`
- current workstation annual cost: `8500 RUB`
- current server annual cost: `18000 RUB`
- migration: `350000 RUB`
- training: `150000 RUB`
- pilot: `100000 RUB`
- hardware delta: `0`

The goal of demo data is not accounting precision.
The goal is to show a persuasive demo story quickly.

---

## 16. Security, legal, and trust considerations

### 16.1 Security

Because the app is static and stores no user data server-side, security risk is low.

Still required:

- no unsafe HTML injection,
- no dynamic script loading,
- no untrusted remote dependencies,
- no data exfiltration.

### 16.2 Legal / commercial trust

The MVP must include an obvious disclaimer:

> This estimate is indicative only and is not a commercial offer.

Russian version:

> Расчёт является ориентировочным и не является коммерческим предложением.

### 16.3 Trust rules

The calculator must avoid pretending to know more than it does.

That means:

- no hidden formulas,
- no false “official competitor pricing”,
- no precision beyond assumptions,
- no auto-generated quote numbers that look legally binding.

---

## 17. Observability and analytics

### 17.1 MVP decision

No analytics implementation is required in phase 1.

### 17.2 What to prepare for later

However, the code should make it easy to add later events such as:

- demo preset loaded,
- copy summary clicked,
- CTA clicked,
- advanced section opened.

Do not build event piping now.
Just keep event handlers structured cleanly.

---

## 18. Testing requirements

### 18.1 Manual test matrix

Required scenarios:

1. 500 workstations / 25 servers / 3 years
2. workstations only
3. servers only
4. 1-year horizon
5. 5-year horizon
6. zero/zero invalid state
7. large values (10,000 workstations)
8. advanced assumptions filled
9. negative hardware delta enabled
10. demo preset load + reset

### 18.2 Edge cases

- `current_tco == 0`
- ROSA more expensive than baseline
- no break-even in selected horizon
- empty advanced values
- invalid numeric input
- browser refresh should not break layout

### 18.3 Nice-to-have unit tests

At minimum, add tests for:

- current TCO formula,
- ROSA TCO formula,
- savings,
- break-even logic,
- recommendation classification.

If the team is too junior for test tooling overhead, at least implement a manual test checklist in `README.md`.

---

## 19. Delivery and hosting

### 19.1 Hosting

Preferred hosting:

- **GitHub Pages** for prototype/demo

Alternative:

- any static host

### 19.2 Build requirement

The application must:

- run locally,
- build deterministically,
- deploy as static assets,
- not depend on environment variables for core logic.

---

## 20. Delivery plan

### Phase 0 — RFC alignment

Owner: product / tech lead

Tasks:

- confirm scenario scope,
- confirm approved ROSA defaults,
- confirm disclaimer wording,
- decide whether illustrative competitor presets stay visible.

### Phase 1 — Skeleton

Owner: junior developer

Tasks:

- create repo,
- scaffold app,
- create basic layout,
- add placeholder form and result area.

### Phase 2 — Domain logic

Owner: junior developer

Tasks:

- define data types,
- implement formulas,
- implement validation,
- implement formatter utilities.

### Phase 3 — UI behavior

Owner: junior developer

Tasks:

- bind inputs to state,
- implement auto recalculation,
- render cards,
- render recommendation,
- add disclaimer block.

### Phase 4 — Demo helpers

Owner: junior developer

Tasks:

- add load demo example,
- add reset,
- add copy summary,
- refine responsive layout.

### Phase 5 — Review and polish

Owner: tech lead / product owner

Tasks:

- verify formulas,
- verify copy,
- verify disclaimer,
- verify business story in live demo.

---

## 21. Suggested epic breakdown

This section exists so the RFC can be turned into implementation tasks quickly.

### Epic 1 — Project bootstrap

**Goal:** create the minimal application shell.

Potential tasks:

- initialize repo
- configure Vite + TypeScript (or plain JS fallback)
- create directory structure
- add base HTML skeleton
- add base CSS
- add README with run/build instructions

### Epic 2 — Calculation engine

**Goal:** implement reliable TCO domain logic.

Potential tasks:

- define domain types
- implement current stack formula
- implement ROSA recurring cost formula
- implement one-time cost formula
- implement total savings formula
- implement break-even logic
- implement recommendation thresholds
- add test cases / manual test notes

### Epic 3 — Form and state

**Goal:** enable user input and live updates.

Potential tasks:

- build basic input fields
- build advanced section
- implement local state
- wire validation
- disable/show warnings on invalid inputs

### Epic 4 — Result rendering

**Goal:** make output easy to understand in a live demo.

Potential tasks:

- render summary cards
- render savings styling
- render break-even message
- render recommendation badge
- add simple bar comparison visualization

### Epic 5 — Demo usability

**Goal:** make the prototype presentation-friendly.

Potential tasks:

- add demo preset
- add reset button
- add copy summary
- add disclaimer
- add CTA placeholder

### Epic 6 — Production hardening for prototype

**Goal:** make the demo stable enough to share.

Potential tasks:

- mobile responsive pass
- browser compatibility pass
- number formatting pass
- empty state pass
- deploy to GitHub Pages

---

## 22. Suggested story format for juniors

Each implementation story should use this template:

### Story template

**Title**  
Short implementation goal.

**Context**  
Why this matters for the product.

**Requirements**  
Bullet list of what must be done.

**Acceptance criteria**  
Concrete, testable outcomes.

**Out of scope**  
What must not be included.

**Notes**  
Helpful implementation hints.

### Example story

**Title**  
Implement break-even year calculation.

**Context**  
The calculator must show when ROSA cumulative cost becomes lower than the current stack.

**Requirements**

- iterate over selected years,
- compute cumulative current cost,
- compute cumulative ROSA cost,
- return first year where ROSA <= current,
- return null if never reached.

**Acceptance criteria**

- for positive savings examples, the correct year is shown,
- for negative ROI examples, null is returned,
- no runtime errors occur on 1-year horizon.

**Out of scope**

- monthly amortization,
- discounting / NPV,
- tax calculations.

---

## 23. Risks and mitigations

### Risk 1 — Misleading pricing assumptions

**Risk:** public/default values may be interpreted as official quotes.

**Mitigation:**

- visible disclaimer,
- editable baseline,
- no claim of exact competitor pricing,
- product owner sign-off before external release.

### Risk 2 — Scope creep

**Risk:** team starts adding full migration wizard features.

**Mitigation:**

- strict MVP boundary,
- no additional scenarios,
- separate phase for Migration Readiness Scanner.

### Risk 3 — Overengineering

**Risk:** junior developers introduce complex stack and delays.

**Mitigation:**

- static SPA only,
- no backend,
- no framework unless explicitly approved.

### Risk 4 — False sense of precision

**Risk:** stakeholders assume calculator gives procurement-grade numbers.

**Mitigation:**

- use language like “indicative”,
- expose assumptions,
- keep formula understandable.

---

## 24. Open questions

These must be resolved by product/sales owner before public use:

1. Should the calculator stay internal-only at first?
2. Which ROSA price values are officially approved for preload?
3. Should competitor presets be visible in the MVP UI at all?
4. Should the CTA point to:
   - consultation,
   - pilot,
   - demo,
   - or a contact form?
5. Should negative hardware delta be allowed?
6. Should renewal/support be represented exactly as public page structure or simplified for trust?
7. Should the UI mention “TCO” only, or “TCO / ROI” together?

---

## 25. Future work (not for this MVP)

These items are intentionally postponed:

1. Migration Readiness Scanner Lite
2. multi-scenario calculator
3. PDF report generation
4. CRM / lead capture integration
5. official competitor comparison layer
6. segmented commercial/government/certified modes
7. bundle pricing logic
8. saved sessions / shareable reports
9. analytics events
10. A/B tests on messaging and CTA

---

## 26. Implementation readiness checklist

This RFC is ready for development once all items below are confirmed:

- [ ] scenario scope approved
- [ ] ROSA default values approved
- [ ] competitor preset policy approved
- [ ] disclaimer approved
- [ ] target hosting approved
- [ ] owner for final review assigned
- [ ] one demo scenario approved

---

## 27. Acceptance criteria (final)

The RFC implementation is considered complete when:

1. App runs locally and on static hosting.
2. No backend is required.
3. User can input workstation/server counts and current annual costs.
4. Results update without refresh.
5. App shows current TCO, ROSA TCO, savings, percentage, and break-even.
6. Demo preset and reset work.
7. Copy summary works.
8. Disclaimer is always visible near results.
9. The codebase cleanly separates config, domain logic, and UI.
10. The prototype is stable enough for live presentation.

---

## 28. Source verification checklist for product owner

Before wider use, verify these public references manually:

### ROSA

- ROSA Chrome product/pricing page
- ROSA buy page / public product list
- ROSA Virtualization page (only as future scenario reference)
- ROSA Control Center page (only as future scenario reference)
- ROSA Dynamic Directory page
- ROSA customers page

### Competitor references

- Astra Linux product / where-to-buy / pricing policy pages
- RED OS product / buy pages
- BaseAlt public price materials if they are used at all

### Internal inputs needed

- sales-approved assumptions
- wording for approved disclaimer
- policy for competitor mention
- recommendation thresholds for pilot trigger

---

## 29. Appendix A — Recommended default config example

```ts
export const vendorProfiles = {
  rosa: {
    label: 'ROSA',
    workstationNew: 6072,
    workstationRenewal: 4237,
    serverNew: 12834,
    serverRenewal: 8603,
    note: 'Editable config; confirm with sales owner before public rollout.'
  },
  custom: {
    label: 'Custom current stack',
    workstationAnnual: 7500,
    serverAnnual: 16000,
    note: 'Default editable baseline.'
  },
  basealt: {
    label: 'BaseAlt benchmark',
    workstationAnnual: 6080,
    serverAnnual: 15180,
    note: 'Illustrative only; show only if approved.'
  },
  astra: {
    label: 'Astra manual benchmark',
    workstationAnnual: null,
    serverAnnual: null,
    note: 'Do not preload unless approved.'
  },
  red: {
    label: 'RED manual benchmark',
    workstationAnnual: null,
    serverAnnual: null,
    note: 'Do not preload unless approved.'
  }
}
```

---

## 30. Appendix B — Final recommendation

For junior implementation, the best path is:

- treat this RFC as the **engineering source of truth**,
- keep the earlier technical spec as a **supporting product brief / appendix**,
- create epics and tasks directly from sections 20–22 of this RFC,
- do not maintain two parallel implementation documents unless required by process.

In practice:

- **RFC** = what and why we are building, scope, decisions, assumptions, risks, rollout, acceptance
- **Tasks / epics** = how the work is sliced in Jira / GitHub issues
- **Technical spec / brief** = optional supporting document for product/business context

For this calculator MVP, the juniors can work from:

1. this RFC,
2. a task board created from the epic breakdown,
3. a short design reference / wireframe.

A separate heavy “ТЗ” is **not strictly necessary** if the RFC is approved and detailed enough.

