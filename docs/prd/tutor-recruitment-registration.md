# PRD: Tutor Recruitment Page and Tutor Registration Form

## Problem Statement

Prospective tutors currently encounter overlapping registration experiences: the `Tutor Recruitment Page` contains an embedded long form, while the dedicated `Tutor Registration Form` already exists as a stepper flow. This creates duplicated UX, validation, field order, and future data-submission risk. The product needs a clear split between a persuasive recruitment page and a focused registration form that produces a `Tutor Application` in `Pending Review`.

## Solution

Create a clear two-page tutor onboarding experience. The `Tutor Recruitment Page` should explain the value of becoming a tutor, help prospects self-qualify, describe what to prepare, answer common concerns, and send all primary CTAs to the `Tutor Registration Form`. The `Tutor Registration Form` should remain a focused stepper flow with progress, validation, draft recovery, structured teaching information, required documents, and a final review step before submission.

After successful submission, the user should see a success page that clearly says the `Tutor Application` has been submitted and is `Pending Review`. Approved applications should seed a `Tutor Profile` draft later, but the public profile should not publish automatically.

## User Stories

1. As a prospective tutor, I want the recruitment page to explain why I should join, so that I can decide whether the platform is worth applying to.
2. As a prospective tutor, I want the recruitment page to show clear benefits, so that I understand what I gain from joining.
3. As a prospective tutor, I want to know who the platform is suitable for, so that I can self-assess before starting the form.
4. As a prospective tutor, I want to know what information and documents to prepare, so that I can complete the form without being surprised.
5. As a prospective tutor, I want the main apply buttons to take me directly to the registration form, so that I do not have to pass through an unnecessary pre-screening step.
6. As a prospective tutor, I want the same apply CTA repeated at natural decision points, so that I can start when I am ready.
7. As a prospective tutor, I want the recruitment page to answer how long review takes, so that I know what to expect after applying.
8. As a prospective tutor, I want the recruitment page to explain required documents, so that I can prepare my ID card and transcript.
9. As a prospective tutor, I want the recruitment page to explain pricing freedom and commissions, so that I understand the business terms before applying.
10. As a prospective tutor, I want the recruitment page to explain online and onsite teaching options, so that I know whether my preferred format is supported.
11. As a prospective tutor, I want the recruitment page to explain whether limited teaching experience is acceptable, so that I do not abandon the application unnecessarily.
12. As a prospective tutor, I want the recruitment page to explain how personal documents are used, so that I feel comfortable submitting verification material.
13. As a prospective tutor, I want the registration form to be separated from marketing content, so that I can focus on completing the application.
14. As a prospective tutor, I want registration progress shown as step number and short label, so that I know where I am without feeling overwhelmed by percentages.
15. As a prospective tutor, I want the registration form to use a stepper, so that a large amount of information is broken into manageable parts.
16. As a prospective tutor, I want to move backward without validation blocking me, so that I can review or fix previous information freely.
17. As a prospective tutor, I want invalid fields to show errors next to the fields, so that I know exactly what to fix.
18. As a prospective tutor, I want the first invalid field focused after a failed Next or Register action, so that I can recover quickly.
19. As a prospective tutor, I want subtle validation feedback, so that the form feels responsive without being distracting.
20. As a mobile prospective tutor, I want compact step progress, so that the form content remains visible on a small screen.
21. As a mobile prospective tutor, I want sticky Back/Next/Register actions, so that I do not need to scroll to the bottom of long steps to continue.
22. As a prospective tutor, I want my draft to survive accidental refresh within the same browser session, so that I do not lose typed information.
23. As a prospective tutor, I want sensitive fields like password and uploaded files excluded from draft storage, so that private data is not retained unnecessarily.
24. As a prospective tutor, I want restored draft data to appear automatically in the same session, so that I can continue without a modal interruption.
25. As a prospective tutor, I want a clear way to clear restored draft data, so that I can start over when needed.
26. As a prospective tutor, I want to provide structured teaching experience, so that reviewers can understand my background more accurately than from a single paragraph.
27. As a reviewer, I want teaching experience split into duration, learner levels, teaching formats, taught subjects, and outcome examples, so that I can assess quality more consistently.
28. As a prospective tutor, I want to choose subjects from a standard list and add an extra subject when needed, so that common subjects stay structured while niche subjects are supported.
29. As a reviewer, I want subjects linked to learner levels per subject, so that I know exactly what level the tutor can teach for each subject.
30. As a prospective tutor, I want to choose teaching mode before seeing onsite fields, so that online-only tutors do not see irrelevant location fields.
31. As an onsite tutor, I want to provide province, district or area, and a note, so that I can describe where I can teach without using a map.
32. As a prospective tutor, I want to provide a base hourly rate and optional pricing note, so that I can keep the form simple while explaining exceptions.
33. As a prospective tutor, I want to upload required verification documents, so that my application can be reviewed.
34. As a prospective tutor, I want ID card and transcript to be clearly required, so that I know what is needed before submission.
35. As a prospective tutor, I want portfolio and certificates to be optional, so that I can strengthen my application without being blocked.
36. As a prospective tutor, I want a privacy note near document uploads, so that I know documents are for verification and will not appear on my public tutor profile.
37. As a prospective tutor, I want a review step before submission, so that I can check important information before sending my application.
38. As a prospective tutor, I want the review step to summarize contact, education, teaching setup, and document checklist, so that I can verify the application quickly.
39. As a prospective tutor, I want Edit buttons in the review step, so that I can jump directly to the section that needs changes.
40. As a prospective tutor, I want to return to Review easily after editing valid information, so that I do not repeat the entire step flow unnecessarily.
41. As a prospective tutor, I want bilingual UI copy to remain concise, so that Thai and English labels both fit cleanly in the interface.
42. As a prospective tutor, I want the success page to say my application was submitted, so that I know the form is complete.
43. As a prospective tutor, I want the success page to say the application is pending review, so that I do not expect immediate public visibility.
44. As a prospective tutor, I want the success page to explain the next step, so that I know whether to wait, return home, or browse the platform.
45. As a platform operator, I want submitted registration data to become a `Tutor Application`, so that review status can be managed separately from public profile data.
46. As a platform operator, I want approved applications to seed a `Tutor Profile` draft, so that tutors do not need to re-enter public information.
47. As a tutor, I want my public profile draft to require my review before publishing, so that application wording is not exposed automatically.

## Implementation Decisions

- Respect the domain split recorded in ADR 0001: the `Tutor Recruitment Page` explains and qualifies; the `Tutor Registration Form` collects application data.
- Remove or retire the embedded registration form inside the recruitment page. The recruitment page should not own form state, validation, file upload behavior, or completion behavior.
- Use three primary CTAs on the recruitment page: hero, after the preparation checklist, and near the FAQ/final section. All primary CTAs should use consistent copy and route to the registration form.
- Structure the recruitment page as: Hero + CTA, Benefits, Who It's For, Preparation Checklist, Registration Steps, FAQ, Final CTA.
- Use real teaching-related photography as the main visual signal. Avoid relying on abstract gradient or illustration-only visuals.
- Use refined motion on the recruitment page: hero reveal, scroll reveal, card hover lift, smooth FAQ expand/collapse, and subtle CTA hover scale.
- Keep the registration form as a stepper rather than a single long form.
- Expand the registration flow to six steps: Account, Personal, Education, Teaching, Documents, Review.
- Show progress with step number and short label, not percentage.
- Use horizontal slide plus soft fade between steps.
- Use subtle shake only when Next/Register validation fails.
- Allow Back navigation without validating the current step.
- On mobile, use compact current-step progress and a sticky bottom action bar for Back/Next/Register.
- Store non-sensitive in-progress draft data in `sessionStorage` for the current browser session.
- Exclude passwords and file uploads from draft storage.
- Restore draft data automatically and show a small notice with a clear draft reset action.
- Model `Teaching Experience` as structured evidence, not a single bio paragraph. Include years or duration, learner levels, teaching formats, taught subjects, and short outcome examples.
- Model taught subjects and `Learner Level` relationships per subject, not as two unrelated lists.
- Keep standard subject options while allowing an additional subject entry.
- Ask for `Teaching Mode` before onsite details. Show province, district/area, and note only when onsite or both is selected.
- Use one base hourly rate plus an optional pricing note in the initial registration flow.
- Require ID card and transcript or education proof. Keep portfolio/certificate optional.
- Place a privacy note directly near document upload fields explaining that verification documents are not shown on the `Tutor Profile`.
- Add a Review step with section summaries and Edit actions that jump directly to the relevant step.
- After successful submit, navigate to the registration success page and explain that the `Tutor Application` is `Pending Review`.
- Do not route newly submitted tutors directly to a dashboard as if they are approved.
- After approval, application data may seed a `Tutor Profile` draft, but publishing the public profile requires explicit tutor review and publish action.
- Continue using the existing bilingual locale helper pattern. Thai labels should be short enough for buttons, step labels, cards, and FAQ rows.

## Testing Decisions

- Tests should verify external behavior and user-observable outcomes, not implementation details like internal component names or exact animation classes.
- The registration form state/draft behavior is a strong candidate for isolated tests because it can be treated as a deep module: a small API around serializing, restoring, excluding sensitive fields, and clearing draft data.
- The registration validation schema is a strong candidate for isolated tests because it encodes business rules around required fields, documents, subject-level pairs, teaching mode, pricing, and review readiness.
- The subject-to-learner-level pairing behavior should be tested as data behavior, not only as UI clicks, because it drives future matching and profile generation.
- The recruitment page can be covered with component or page-level tests that assert major sections exist, all primary CTAs target the registration form, and no embedded registration submission flow remains.
- The registration stepper can be covered with page-level tests for forward validation, free Back navigation, review Edit navigation, and mobile sticky action visibility.
- The success page can be covered with a focused page-level test asserting it communicates submitted application, pending review, and next steps.
- Animation should be tested lightly: verify reduced-motion compatibility or non-blocking presence where the test harness supports it, but avoid brittle timing assertions.

## Out of Scope

- Backend submission API implementation beyond the UI contract, unless needed by the implementation issue that follows.
- Admin review dashboard for approving or rejecting tutor applications.
- Automated publication of tutor profiles.
- Full map, geocoding, or radius-based onsite matching.
- Advanced pricing tables by subject, learner level, teaching mode, or location.
- Persistent cross-session draft storage.
- Storing uploaded files in browser storage.
- Payment, commission settlement, or tutor payout workflows.
- Full search/matching algorithm changes.

## Further Notes

The current code already has a dedicated tutor registration stepper, five step components, and a shared tutor form composable. The PRD intentionally builds around that existing shape instead of replacing it. The main product correction is to remove duplicate form responsibility from the recruitment page and make the registration form the single source of truth for application entry.

The project glossary now distinguishes `Tutor Registration`, `Tutor Registration Form`, `Tutor Application`, `Pending Review`, `Tutor Profile`, `Teaching Experience`, and `Learner Level`. These terms should be used consistently in UI copy, issue titles, and future implementation notes.
