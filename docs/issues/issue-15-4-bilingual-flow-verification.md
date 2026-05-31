## Parent

Parent PRD: #15

## What to build

Add or adjust verification for the bilingual Tutor Recruitment and auth entry flow. The tests and checks should focus on externally visible behavior and route contracts rather than implementation details.

This slice should verify that the completed bilingual polish still respects the Tutor Recruitment to Tutor Registration flow and that auth entry pages remain buildable, type-safe, and lint-clean.

## Acceptance criteria

- [ ] Behavior-focused tests or verification cover Tutor Recruitment Call to Action route contracts.
- [ ] Verification covers language-independent Tutor Recruitment behavior, including the hero image remaining part of the page.
- [ ] Verification covers sign-in and sign-up bilingual content contracts where practical.
- [ ] Verification does not rely on brittle source-text regex checks when a behavior-level helper or contract test is more appropriate.
- [ ] `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` pass before the issue is closed.

## Blocked by

- #16
- #17
- #18
