# PRD: Bilingual Tutor Recruitment and Auth Entry Polish

## Problem Statement

Users can switch the website between English and Thai, but recent Tutor Recruitment and auth entry improvements were not fully consistent across languages. The Tutor Recruitment Page needs to preserve the same layout, typography hierarchy, hero image treatment, and Call to Action behavior when switching language. The sign-in and sign-up entry pages also need the same language switching affordance as the wider site, with Thai copy and a cleaner login form layout.

From the user's perspective, changing language should not make the Tutor Recruitment Page feel like a different page, remove the hero image, change the visual rhythm, or leave auth pages in English while the rest of the website is Thai.

## Solution

Polish the Tutor Recruitment Page and auth entry pages so the bilingual experience is continuous:

- The Tutor Recruitment Page keeps the same structure in English and Thai, including the hero image, typography scale, content order, and primary Call to Action.
- The sign-in page supports English and Thai, exposes a clear language toggle, and uses a cleaner form layout that works on mobile and desktop.
- The sign-up page supports English and Thai, exposes a clear language toggle, and keeps account type selection understandable in both languages.
- All bilingual copy uses the existing locale mechanism so language state stays consistent across the app.
- The Tutor Registration Form remains focused on form completion and is not turned into a marketing page.

## User Stories

1. As a prospective tutor, I want the Tutor Recruitment Page to look consistent in English and Thai, so that I trust I am still in the same flow after switching language.
2. As a prospective tutor, I want the Tutor Recruitment Page hero image to remain visible after switching language, so that the page does not feel broken or incomplete.
3. As a prospective tutor, I want the Thai Tutor Recruitment Page to preserve the same layout as the English page, so that I can scan the page in the same order.
4. As a prospective tutor, I want the Thai headline and supporting copy to fit the same visual hierarchy as English, so that the page remains polished and readable.
5. As a prospective tutor, I want the primary Call to Action to stay consistent in both languages, so that I understand where to start Tutor Registration.
6. As a prospective tutor, I want the Tutor Recruitment Page to keep routing me to the Tutor Registration Form, so that the recruitment flow remains direct.
7. As a prospective tutor, I want the "Who it is for" section to remain clear in Thai and English, so that I can self-assess before applying.
8. As a prospective tutor, I want the "Prepare before applying" section to remain clear in Thai and English, so that I know what information and documents I need.
9. As a prospective tutor, I want FAQ content to remain available in Thai and English, so that I can answer common questions before starting registration.
10. As a prospective tutor, I want the Thai wording for becoming a tutor to match product language, so that navigation and Call to Action labels do not feel inconsistent.
11. As a student or parent, I want "Find Tutors" to appear as a natural Thai label when Thai is selected, so that navigation is understandable.
12. As a returning user, I want the sign-in page to support Thai, so that I can log in without switching mental context back to English.
13. As a returning user, I want a visible language toggle on the sign-in page, so that I can change language even inside the auth flow.
14. As a returning user, I want the sign-in form to be cleanly arranged, so that email, password, remember me, and password recovery are easy to use.
15. As a returning user, I want to show or hide my password, so that I can reduce typing mistakes.
16. As a returning user on mobile, I want the sign-in social buttons to fit within the form, so that the page does not feel cramped or broken.
17. As a new user, I want the sign-up page to support Thai, so that account creation matches the language I selected elsewhere.
18. As a new user, I want a visible language toggle on the sign-up page, so that I can change language without leaving the auth flow.
19. As a new user, I want account type choices to be readable in Thai, so that I can choose parent, student, or tutor correctly.
20. As a prospective tutor selecting the tutor account type, I want to be routed into Tutor Registration, so that I complete the correct application flow.
21. As a new user, I want first name, last name, email, password, and confirm password labels to be translated, so that the form is understandable in Thai.
22. As a new user, I want password visibility controls to have translated accessible labels, so that assistive technology remains useful in Thai.
23. As a bilingual user, I want auth page headings and supporting text to update immediately when language changes, so that the UI state feels coherent.
24. As a mobile user, I want auth cards to remain readable and scrollable when needed, so that I can complete login or signup on a small screen.
25. As a product owner, I want bilingual work to reuse the existing locale composable, so that future copy updates do not create separate language systems.
26. As a product owner, I want this polish to avoid adding new steps before Tutor Registration, so that conversion is not reduced by unnecessary friction.
27. As a developer, I want layout and bilingual behavior covered by behavior-oriented tests where practical, so that future changes do not silently break the onboarding flow.
28. As a developer, I want auth entry layout changes to follow existing design tokens and component patterns, so that the auth pages remain consistent with the rest of the product.

## Implementation Decisions

- Reuse the existing locale state and translation helper as the single source of truth for English and Thai copy.
- Keep Tutor Recruitment and Tutor Registration separate. The Tutor Recruitment Page remains a marketing and qualification page; the Tutor Registration Form remains the focused application form.
- Preserve one Tutor Registration destination for all Tutor Recruitment Call to Action buttons.
- Keep the Tutor Recruitment hero image language-independent. The image should not be conditional on the selected locale and should not depend on scroll reveal animation to become visible.
- Keep Tutor Recruitment layout structurally equivalent across English and Thai. Thai copy may differ in length, but it should use the same hierarchy, content order, spacing intent, and visual treatment.
- Use product UI patterns for auth pages: standard form controls, clear labels, predictable primary button placement, and restrained motion.
- Add language switching directly to sign-in and sign-up auth entry cards so language can be changed without returning to the main navigation.
- Translate user-facing auth labels, helper text, account type labels, link text, separator labels, and password visibility labels.
- Improve the sign-in form layout by separating header, fields, secondary actions, primary submit, account creation link, and social sign-in into predictable regions.
- Keep password visibility as a local UI state, not persisted user data.
- Do not introduce a new i18n library as part of this polish. The existing app-level locale helper is sufficient for this scope.
- Do not introduce backend authentication changes. The work is UI and frontend flow polish only.

## Testing Decisions

- Tests should verify external behavior and contracts, not source text implementation details.
- Tutor Recruitment tests should continue verifying that every primary Tutor Registration Call to Action routes to the Tutor Registration Form.
- Tutor onboarding behavior tests remain the prior art for this work because they already validate content contracts and flow decisions around Tutor Recruitment and Tutor Registration.
- Add or extend tests where practical to cover language-independent behavior such as route contracts, visible content contracts, and flow decisions.
- Manual browser verification should cover:
  - Tutor Recruitment in English.
  - Tutor Recruitment in Thai.
  - Switching language while on Tutor Recruitment.
  - Sign-in in English and Thai.
  - Sign-up in English and Thai.
  - Mobile-width auth layout.
- Build, lint, typecheck, and existing tests must pass before closing implementation issues.

## Out of Scope

- Replacing the existing locale helper with a full i18n framework.
- Backend authentication implementation.
- Persisting language selection across browser sessions unless already supported elsewhere.
- Redesigning the full auth background animation system.
- Changing the Tutor Registration Form steps or validation rules.
- Adding a new pre-form screening step before Tutor Registration.
- Changing approval, Pending Review, or Tutor Application review logic.
- Changing image assets beyond ensuring the current Tutor Recruitment image appears reliably.

## Further Notes

- Use the domain terms from the shared context: Tutor Recruitment Page, Tutor Registration, Tutor Registration Form, Tutor Application, and Pending Review.
- The relevant ADR requires keeping Tutor Recruitment separate from Tutor Registration.
- Thai navigation labels should remain natural and task-focused. "Find Tutors" should read as "ค้นหาติวเตอร์", and the Tutor Recruitment entry should read as "เริ่มสมัครเป็นติวเตอร์".
- The implementation should prioritize consistency and clarity over decorative novelty.
