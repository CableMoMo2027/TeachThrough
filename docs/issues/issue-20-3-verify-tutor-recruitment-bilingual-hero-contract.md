## Parent

Parent PRD: #20

## What to build

Add or adjust verification for the bilingual Tutor Recruitment hero contract. Verification should cover externally visible behavior: the English and Thai hero headings render, the hero image remains part of the page, Thai layout does not overflow horizontally, and primary Tutor Registration Call to Action buttons still route to the Tutor Registration Form.

This slice should prefer behavior-focused checks over brittle source-text assertions. If full browser layout tests are too heavy for the normal suite, add the strongest lightweight contract tests available and document the manual browser verification needed before closing.

## Acceptance criteria

- [ ] Verification covers the Tutor Recruitment hero in English.
- [ ] Verification covers the Tutor Recruitment hero in Thai.
- [ ] Verification confirms the hero image remains present and language-independent.
- [ ] Verification checks that the Thai hero does not create horizontal overflow where practical.
- [ ] Verification confirms primary Tutor Registration Call to Action route contracts.
- [ ] Verification avoids relying only on brittle source-text regex checks when rendered behavior or route contracts can be tested.
- [ ] `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` pass before the issue is closed, or any skipped command is documented with a concrete reason.

## Blocked by

- #21
- #22
