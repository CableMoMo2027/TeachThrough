## Parent

Parent PRD: #15

## What to build

Add bilingual support and language switching to the sign-up page. A new user should be able to switch between English and Thai directly inside the auth flow, understand account type choices in Thai, and complete the existing account creation path without losing the Tutor Registration routing behavior.

This slice should preserve the current account type selection behavior: choosing tutor routes prospective tutors into Tutor Registration.

## Acceptance criteria

- [ ] The sign-up page exposes a clear English/Thai language toggle.
- [ ] Sign-up heading, supporting text, account type labels, field labels, placeholders, password visibility labels, primary submit, sign-in link, and separator text update with the selected language.
- [ ] Parent, student, and tutor account type choices are understandable in Thai.
- [ ] Selecting the tutor account type still routes to the Tutor Registration Form.
- [ ] Password and confirm password visibility controls remain accessible in both languages.
- [ ] Existing non-tutor sign-up navigation behavior is preserved.

## Blocked by

None - can start immediately
