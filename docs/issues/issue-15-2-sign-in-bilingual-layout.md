## Parent

Parent PRD: #15

## What to build

Add bilingual support and layout polish to the sign-in page. A user should be able to switch between English and Thai directly inside the auth flow, read all primary form copy in the selected language, show or hide their password, and use a cleaner login form layout on desktop and mobile.

This slice should not change backend authentication behavior.

## Acceptance criteria

- [ ] The sign-in page exposes a clear English/Thai language toggle.
- [ ] Sign-in heading, supporting text, field labels, helper actions, primary submit, account creation link, separator text, and password visibility labels update with the selected language.
- [ ] Password visibility can be toggled without changing form data.
- [ ] The login form is visually organized into clear regions: header, fields, secondary actions, primary submit, account creation link, and social sign-in.
- [ ] The sign-in page remains usable without horizontal overflow on mobile-width screens.
- [ ] Existing sign-in navigation behavior is preserved.

## Blocked by

None - can start immediately
