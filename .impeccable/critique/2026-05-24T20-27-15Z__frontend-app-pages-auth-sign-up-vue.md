---
target: Signup Page
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-05-24T20-27-15Z
slug: frontend-app-pages-auth-sign-up-vue
---
#### Design Health Score
> *Assessment based on Nielsen's 10 Usability Heuristics*

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Stepper is clear, but lacks interactive "detailed" states. |
| 2 | Match System / Real World | 4 | Labels are clear and appropriate. |
| 3 | User Control and Freedom | 3 | Good navigation, but state persistence is unclear. |
| 4 | Consistency and Standards | 4 | Nuxt UI ensures high consistency. |
| 5 | Error Prevention | 2 | Minimal inline validation or constraint hints. |
| 6 | Recognition Rather Than Recall | 3 | Standard layout, low cognitive load. |
| 7 | Flexibility and Efficiency | 3 | Good for first-timers, could use power-user shortcuts. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean but feels a bit "standard" SaaS rather than "premium". |
| 9 | Error Recovery | 2 | Error states are generic or undefined. |
| 10 | Help and Documentation | 1 | No help text for complex tutor registration fields. |
| **Total** | | **28/40** | **[Fair - Solid Foundation]** |

#### Anti-Patterns Verdict

**Verdict**: Low Slop. The code shows intentional custom components (`CardSwap`, `v-reveal`), but some sections (Tutor Step 5/7) still lean on "Identical grid" reflexes.

**LLM assessment**: The visual hierarchy is functional but lacks the "Luxurious" and "Sharp" feel requested. Spacing is consistent but safe. The "Expert Warmth" principle isn't fully realized yet—the blue accents are used sparingly.

**Deterministic scan**: Detector unavailable in this environment. Manual audit performed.

#### Overall Impression
The foundation is excellent and highly functional. The "Biggest Opportunity" is to move from **Restrained** to a **Committed** color strategy and refine the "Craft" (shadows and micro-interactions) to achieve that "Premium" feel.

#### What's Working
1. **Interactive Entry**: The account type selector with icons is engaging and clear.
2. **Visual Interest**: The `AuthRouteBackground` with animated cards provides a great first impression.
3. **Responsive Logic**: The recent fixes for Steps 5/7 show good attention to small-screen usability.

#### Priority Issues

1. **[P1] Lack of "Premium" Depth**: 
   - **Why**: Current shadows and borders feel flat/standard. 
   - **Fix**: Use layered shadows and subtle ring-offsets for cards.
   - **Suggested command**: `impeccable polish`

2. **[P1] Underutilized Color Strategy**: 
   - **Why**: The UI is mostly white/slate. Doesn't feel "Luxurious" or "Sharp".
   - **Fix**: Inject OKLCH-based brand tints into input backgrounds and card headers.
   - **Suggested command**: `impeccable colorize`

3. **[P2] Information Density in Tutor Steps**: 
   - **Why**: Steps 5 and 7 are still quite dense, even after layout fixes.
   - **Fix**: Use progressive disclosure or "Field Grouping" with clearer typographic hierarchy.
   - **Suggested command**: `impeccable layout`

4. **[P3] Missing Micro-interactions**: 
   - **Why**: Buttons and inputs have standard hover states. 
   - **Fix**: Add "Ease-out-expo" transforms and subtle scale effects on interaction.
   - **Suggested command**: `impeccable animate`

#### Persona Red Flags

**Alex (Power User/Tutor)**: 
- Needs to fill out 7 steps. No "Save for later" or clear keyboard navigation through steps. High friction for busy professionals.

**Jordan (First-Timer/Parent)**: 
- The transition from "Sign Up" header to "Parent Registration" button to "First name" input is clear. Low friction.

#### Minor Observations
- Input placeholder text is a bit light (A11y risk).
- The "Upload documents" label could be more descriptive of what's *actually* required to build trust.

#### Questions to Consider
- "What if the Tutor Registration felt more like a 'Premium Onboarding' rather than just a long form?"
- "Could we use the Violet (Accent) color to highlight 'High-Value' steps or completions?"
