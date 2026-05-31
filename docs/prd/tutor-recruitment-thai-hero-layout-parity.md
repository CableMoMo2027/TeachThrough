# PRD: Tutor Recruitment Thai Hero Layout Parity

## Problem Statement

Prospective tutors using the Thai version of the Tutor Recruitment Page can lose confidence when the hero section does not preserve the same readable structure as the English version. The Thai hero topic is longer than the English topic and does not naturally break at spaces in the same way English copy does. When the animated heading treats Thai copy as one unbreakable word, the text can appear cut off, overflow its column, or push attention away from the hero image.

From the user's perspective, switching to Thai should not make the Tutor Recruitment Page feel broken. The hero image should remain visible, the main heading should be readable in full, and the page should still clearly direct qualified prospects to Tutor Registration.

## Solution

Make the Thai Tutor Recruitment Page hero layout structurally match the English version while accommodating Thai typography. The hero should keep the same content order, visual hierarchy, image treatment, and Tutor Registration Call to Action behavior in both languages. Thai heading text should wrap cleanly, finish its reveal quickly enough to read naturally, and never depend on horizontal scrolling or clipped text.

The solution should preserve the existing product flow: the Tutor Recruitment Page remains a recruitment and qualification page, while every primary Call to Action continues to send prospective tutors to the Tutor Registration Form.

## User Stories

1. As a prospective tutor reading Thai, I want the Tutor Recruitment Page headline to display fully, so that I can understand the page's offer without missing words.
2. As a prospective tutor reading Thai, I want the hero image to remain visible beside the hero copy on desktop, so that the page feels as complete and trustworthy as the English version.
3. As a prospective tutor reading Thai, I want the heading to wrap naturally across lines, so that long Thai text does not overflow or disappear.
4. As a prospective tutor reading Thai, I want the hero copy and image to keep the same visual relationship as English, so that language switching does not feel like a different page.
5. As a prospective tutor reading Thai on mobile, I want the image and heading to stack cleanly, so that I can read and inspect the page without horizontal scrolling.
6. As a prospective tutor reading Thai on desktop, I want the page to avoid horizontal overflow, so that navigation and hero content stay within the viewport.
7. As a prospective tutor, I want the primary Tutor Registration Call to Action to remain visible near the hero message, so that I know where to start Tutor Registration.
8. As a prospective tutor, I want the Tutor Recruitment Page to keep routing me to the Tutor Registration Form, so that I complete the focused application flow.
9. As a prospective tutor, I want the Thai topic "เริ่มสมัครเป็นติวเตอร์" to fit cleanly where it appears, so that the page does not look unfinished or cramped.
10. As a prospective tutor, I want Thai and English hero sections to use the same image asset, so that the page maintains a stable visual identity across languages.
11. As a prospective tutor, I want animated heading text to become readable quickly, so that the animation does not make Thai text appear temporarily broken.
12. As a prospective tutor, I want heading animation to support Thai text length, so that decorative motion does not reduce clarity.
13. As a prospective tutor, I want supporting Thai body copy to stay within a readable line length, so that the hero section remains easy to scan.
14. As a prospective tutor, I want the secondary Find Tutors action to remain understandable in Thai, so that I can choose the correct path if I am not applying.
15. As a student or parent, I want the Thai navigation label for Find Tutors to remain natural, so that I can browse tutors without confusion.
16. As a product owner, I want the Thai page to preserve English layout parity, so that the bilingual experience feels intentional and high quality.
17. As a product owner, I want Tutor Recruitment and Tutor Registration to remain separate, so that marketing content does not duplicate form responsibility.
18. As a product owner, I want this fix to use the existing locale helper, so that bilingual copy stays under one app-level language mechanism.
19. As a product owner, I want the fix to avoid introducing a new i18n system, so that the change remains scoped to layout and copy rendering.
20. As a developer, I want a clear contract for Thai hero layout behavior, so that future heading or animation changes do not reintroduce clipping.
21. As a developer, I want layout verification to check visible behavior rather than source text only, so that tests fail when the rendered page breaks.
22. As a developer, I want desktop and mobile viewport coverage, so that responsive layout regressions are caught early.
23. As a developer, I want language-switching verification for the Tutor Recruitment Page, so that Thai and English hero variants are both covered.
24. As a maintainer, I want the animated text component to remain reusable elsewhere, so that a page-specific Thai layout fix does not unexpectedly alter the whole app.
25. As a maintainer, I want the hero layout to use stable responsive constraints, so that long localized copy cannot resize the page unpredictably.
26. As a maintainer, I want the Call to Action route contract to remain tested, so that visual fixes do not break Tutor Registration entry.
27. As a maintainer, I want lint and typecheck to remain clean after the layout change, so that the fix can be shipped safely.
28. As a maintainer, I want any browser verification helper to be removable or clearly separated from production code, so that temporary visual checks do not pollute the app.

## Implementation Decisions

- Preserve the ADR that separates Tutor Recruitment from Tutor Registration. The Tutor Recruitment Page should explain the value, expectations, and process of becoming a tutor; the Tutor Registration Form remains the only focused application entry point.
- Treat this as a bilingual layout hardening task, not a content redesign of the Tutor Recruitment Page.
- Keep the existing locale state and translation helper as the single source of truth for English and Thai copy.
- Keep the Tutor Recruitment hero image language-independent. The image should remain part of the first hero section in both English and Thai.
- Keep desktop layout parity: hero copy and Calls to Action on one side, hero image on the other side.
- Keep mobile layout parity: hero image and copy stack predictably without horizontal overflow.
- Make the hero text column allowed to shrink within the grid, so long localized text cannot force the image off-screen or create horizontal scrolling.
- Make the hero heading support Thai wrapping. Thai text should not be treated as one unbreakable word by the animated heading presentation.
- Tune hero heading animation timing for long Thai copy. Motion should support readability, not delay the complete sentence for too long.
- Avoid changing the animated text component globally unless a broader audit proves all usages need the same behavior. Prefer a page-level or prop-level constraint for this scope.
- Keep heading typography close to the English version while allowing a slightly more constrained large-screen size if required to preserve image visibility.
- Keep the primary Tutor Registration Call to Action wording aligned with product language in both locales.
- Preserve the single Tutor Registration destination for all primary Tutor Recruitment Call to Action buttons.
- Preserve the secondary Find Tutors path and Thai label, because it is a separate browsing path for users who are not applying.
- Do not add new Tutor Registration steps, new pre-screening pages, or embedded form fields to the Tutor Recruitment Page.
- Major modules to build or modify:
  - Tutor Recruitment Page hero layout and localized typography behavior.
  - Locale-driven copy usage for hero labels and Calls to Action.
  - Animated heading usage where Thai wrapping and reveal timing are controlled.
  - Behavior-level verification around bilingual hero rendering and Call to Action route contracts.
- Deep module opportunity: a small layout contract checker or browser-verification utility could expose a stable interface such as "render route in locale and viewport, return overflow, heading visibility, image visibility, and route contract assertions." This would encapsulate viewport setup and DOM measurement behind a simple test interface.
- Deep module opportunity: if animated text wrapping issues appear elsewhere, the animated heading component could grow a narrow, testable prop for wrapping behavior instead of relying on ad hoc class overrides per page.

## Testing Decisions

- Good tests should verify user-observable behavior: visible heading text, visible hero image, no horizontal overflow, correct locale state, and correct Call to Action routes.
- Tests should avoid brittle source-text regex checks when rendered behavior can be checked through a component, route, or browser-level contract.
- Existing Tutor onboarding tests are prior art for route and content contracts, especially around keeping Tutor Recruitment separate from Tutor Registration.
- Add or extend behavior-focused tests for the Tutor Recruitment Page hero in English and Thai.
- Cover at least one desktop viewport where the image and copy should sit side by side.
- Cover at least one mobile viewport where the image and copy should stack without horizontal scrolling.
- Verify that switching language on the Tutor Recruitment Page does not remove the hero image.
- Verify that the Thai heading is present as complete readable text in the rendered page.
- Verify that the rendered page does not create horizontal overflow in Thai.
- Verify that every primary Tutor Registration Call to Action still routes to the Tutor Registration Form.
- If browser-level layout tests are too heavy for the normal test suite, keep a focused manual verification checklist and add lightweight route/content contract tests to the Node test suite.
- Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` before closing implementation work where practical.

## Out of Scope

- Replacing the existing locale helper with a full i18n framework.
- Rewriting all Thai copy across the app.
- Redesigning the full Tutor Recruitment Page content model.
- Changing the Tutor Registration Form steps, validation, draft behavior, or submission flow.
- Adding backend Tutor Application submission APIs.
- Changing Pending Review or Tutor Profile publication behavior.
- Changing authentication behavior.
- Replacing the hero image asset unless it fails to render reliably.
- Globally changing animated text behavior across the app without a separate audit.
- Adding new marketing sections or a new pre-application screening step.

## Further Notes

- Use the glossary terms Tutor Recruitment Page, Tutor Registration, Tutor Registration Form, Tutor Application, Pending Review, Tutor Profile, Teaching Experience, and Learner Level where relevant.
- The prior bilingual PRD already established that Thai and English Tutor Recruitment layouts should remain structurally equivalent. This PRD narrows that requirement to the Thai hero topic, image visibility, text wrapping, and animation readability.
- Thai copy length must be treated as a first-class layout input. The page should not assume space-separated words or English line-breaking behavior.
- The implementation should prioritize clarity and trust over decorative novelty.
