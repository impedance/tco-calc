# Epic 4: Demo Features & Refinement

**Owner:** Junior Developer  
**Status:** [x] DONE  

## Goal
Add auxiliary features that make the tool "demo-ready" and polish the final experience for public or internal use.

## Tasks

- [x] **Demo Data & Reset**
  - Implement a "Load Demo Example" button that fills the form with a persuasive migration scenario (e.g., 500 workstations).
  - Implement a "Reset" button to clear all inputs to defaults.

- [x] **Summary Tools**
  - Implement a "Copy Summary" button that formats the calculation results into a human-readable text block for clipping into emails/chats.
  - Handle clipboard success/error feedback (e.g., a small "Copied!" notification).

- [x] **Mobile & Responsive Polish**
  - Ensure the two-column layout stacks correctly on mobile.
  - Test touch targets for input fields.
  - Optimize the sticky behavior of the result panel for mobile view (bottom fixed or scrolled).

- [x] **Final Deployment Prep**
  - Document the build and deploy process in `README.md`.
  - Configure GitHub Actions or a script for static deployment to GitHub Pages.
  - Ensure the disclaimer (Russian version) is always visible and legally clear.

## Acceptance Criteria
- [x] "Load Demo" button works and updates counts/results.
- [x] "Copy Summary" provides a clean text output.
- [x] The app is usable on a mobile browser.
- [x] Final package is ready for host deployment.
