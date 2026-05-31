# PRD: Tutor Registration Hardening After Scrutinize Review

## Problem Statement

The Tutor Registration implementation now covers the main Tutor Recruitment and Tutor Registration flow, but the scrutinize review found behavior gaps that can break the user's trust in the form. A prospective tutor can clear a restored draft without the visible form resetting, jump directly to later steps without completing required validation, and use Review edit actions without an easy return path to Review. Current tests also lean too heavily on source-text assertions, so they can pass while real user interactions break.

## Solution

Harden the Tutor Registration Form so the implemented behavior matches the accepted PRD and issue acceptance criteria. Clearing a restored draft should actually reset the visible form. Step navigation should allow free backward movement but prevent unvalidated forward jumps. Review Edit should support a smooth edit-and-return-to-review path. Tests should move toward behavior-level verification for these user-facing flows rather than only reading Vue source files.

## User Stories

1. As a prospective tutor, I want Clear draft to remove restored values from the visible form, so that I can start the Tutor Registration Form over cleanly.
2. As a prospective tutor, I want Clear draft to remove sessionStorage data, so that old session data does not come back after refresh.
3. As a prospective tutor, I want Clear draft to reset non-file fields, so that restored text, selects, checkboxes, and structured teaching details do not remain in the form.
4. As a prospective tutor, I want Clear draft to keep password and file upload behavior safe, so that sensitive fields are not restored or stored.
5. As a prospective tutor, I want the restored draft notice to disappear after clearing the draft, so that the UI reflects the current state.
6. As a prospective tutor, I want to move backward freely in the stepper, so that I can review earlier information without being blocked by current-step validation.
7. As a prospective tutor, I want direct forward step clicks to be blocked until earlier steps are valid, so that I do not accidentally reach Review with an incomplete Tutor Application.
8. As a prospective tutor, I want completed steps to remain accessible after validation, so that I can revisit valid sections without unnecessary friction.
9. As a prospective tutor, I want invalid forward navigation to show the same field-level feedback as pressing Next, so that I know what to fix.
10. As a prospective tutor, I want Review Edit buttons to jump directly to the relevant section, so that I can correct one part of my application quickly.
11. As a prospective tutor, I want an easy way to return to Review after editing a valid section, so that I do not have to walk through every remaining step again.
12. As a prospective tutor, I want the return-to-review behavior to validate the edited section first, so that Review does not summarize invalid data.
13. As a prospective tutor, I want the Review step to remain a trustworthy final checkpoint, so that I submit only after the application is complete.
14. As a maintainer, I want step navigation behavior covered by tests, so that future stepper refactors do not reintroduce validation bypasses.
15. As a maintainer, I want draft clearing behavior covered by tests, so that session restoration remains safe and predictable.
16. As a maintainer, I want Review Edit behavior covered by tests, so that the edit-and-return path remains intact.
17. As a maintainer, I want tests to exercise observable behavior where practical, so that tests fail when the user-facing flow breaks.
18. As a maintainer, I want source-text assertions reduced or backed by stronger behavior tests, so that the test suite does not give false confidence.

## Implementation Decisions

- Treat this as a hardening PRD for the existing Tutor Registration implementation, not a redesign of the original Tutor Recruitment and Tutor Registration scope.
- Keep the existing six-step Tutor Registration Form: Account, Personal, Education, Teaching, Documents, Review.
- Keep the domain rule that backward navigation should not validate the current step.
- Add a guarded forward navigation rule: direct clicks to future steps should either be disabled or require sequential validation of each intervening step.
- Track the highest validated step or an equivalent navigation state so the stepper can distinguish safe revisits from unsafe forward jumps.
- Make Clear draft reset both sessionStorage and the visible Tutor Registration Form state. This should include structured fields such as Teaching Experience, subject-to-Learner-Level pairs, teaching formats, languages, termsAccepted, and location/pricing fields.
- Keep password and file upload fields excluded from draft storage and restore behavior.
- Ensure birth date UI state stays consistent when clearing restored draft data.
- Add Review Edit return behavior. When a user enters a section from Review, the form should offer a clear path back to Review after validating the edited section.
- Avoid broad coupling between Review and individual step components. Prefer page-level navigation state or a small stepper/navigation interface over embedding Review-specific behavior inside each form step.
- Preserve the existing public language: Tutor Registration Form, Tutor Application, Pending Review, Tutor Profile, Teaching Experience, and Learner Level.
- Improve tests around public behavior. Pure utility tests remain useful for draft serialization and subject-level validation, but user-flow claims need tests that exercise navigation behavior rather than only reading files as strings.

## Testing Decisions

- Good tests should verify behavior through public interfaces: visible form state, navigation outcomes, validation blocking, restored draft behavior, and Review Edit return behavior.
- Add focused tests for the draft module or composable-level API: save, restore, clear, sensitive-field exclusions, and reset-to-empty behavior.
- Add tests for step navigation rules: backward navigation is always allowed, direct forward jumps are blocked before validation, and validated steps can be revisited.
- Add tests for Review Edit: Edit jumps to the requested section, edited valid data can return to Review directly, and invalid edits remain on the edited section with validation feedback.
- Keep existing Node tests for pure utilities where they add value.
- Replace or supplement source-text assertions with behavior-level tests for the highest-risk routes and components.
- If a full Nuxt/browser test runner is too heavy for this pass, extract deep navigation and draft modules with simple public interfaces and test those directly, then keep minimal route smoke checks for render safety.

## Out of Scope

- Reopening the broader Tutor Recruitment Page content design.
- Adding backend submission APIs or persistence beyond browser session draft behavior.
- Building an admin review dashboard.
- Changing Tutor Profile publication rules.
- Adding map, geocoding, or advanced onsite matching.
- Replacing the existing VueBitsStepper component wholesale if the navigation behavior can be hardened through a small interface change.

## Further Notes

This PRD comes from the scrutinize review after implementation of PRD #1 and issues #2-#9. The previous implementation passed lint, typecheck, build, route smoke checks, and utility tests, but the review found acceptance-level behavior gaps that should be fixed before treating the Tutor Registration Form as shippable.
