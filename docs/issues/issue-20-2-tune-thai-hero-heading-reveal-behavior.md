## Parent

Parent PRD: #20

## What to build

Tune the Thai Tutor Recruitment hero heading reveal behavior so the longer Thai heading becomes readable quickly and does not look partially missing while the animation is still running. The change should be scoped to the Tutor Recruitment hero or exposed through a narrow reusable option if needed, rather than unexpectedly changing animated text behavior across the whole app.

This slice should preserve the same Tutor Recruitment layout and Call to Action behavior established by the parent PRD.

## Acceptance criteria

- [ ] The Thai hero heading reveal completes quickly enough that the full sentence is readable without an awkward delay.
- [ ] The animation does not make Thai characters appear clipped or permanently blurred.
- [ ] The English hero heading reveal still feels consistent with the current page design.
- [ ] Any animated text behavior change is scoped to the Tutor Recruitment hero unless a narrow reusable prop/interface is intentionally added.
- [ ] Reduced-motion behavior remains acceptable for the hero heading.
- [ ] The hero image remains visible after the animation tuning.

## Blocked by

- #21
