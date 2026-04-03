# Epic 1: Scaffold & Visual Foundation

**Owner:** Junior Developer  
**Status:** [x] DONE  

## Goal
Set up the technical project foundation and the visual design system to match the ROSA ecosystem identity.

## Tasks

- [ ] **Project Initialization**
  - Run `npm create vite@latest . -- --template vanilla-ts`.
  - Install dependencies and clean up boilerplate.
  - Set up `tsconfig.json` for strict typing.

- [ ] **Design Tokens (CSS Variables)**
  - Create `src/styles.css`.
  - Define the following ROSA variables:
    ```css
    :root {
      --rosa-primary-orange: #FB693C;
      --rosa-blue: #13AFF0;
      --rosa-dark-bg: #1E1E21;
      --rosa-text-primary: #1E1E21;
      --rosa-border-radius: 12px;
      --rosa-font: 'PT Root UI', 'Rubik', sans-serif;
    }
    ```
  - Implement a basic global reset and typography setup.

- [ ] **HTML Skeleton**
  - Structure `index.html` with semantic blocks:
    - `<header>`: ROSA TCO Calculator logo and title.
    - `<main>`: Two-column layout container.
    - `<aside id="results-panel">`: Sticky result area.
    - `<footer>`: Disclaimer and Contact CTA.

- [ ] **Asset Management**
  - Add ROSA logo placeholder in `src/assets/`.
  - Configure public static assets.

## Acceptance Criteria
- [ ] Project runs locally with `npm run dev`.
- [ ] The page shows the basic layout with ROSA colors.
- [ ] All CSS variables are used consistently.
