# TeachThrough

TeachThrough is a premium tutor discovery and onboarding platform for parents, students, and tutors. The product focuses on trusted tutor profiles, clear learning choices, bilingual English/Thai entry flows, and a polished Nuxt UI experience.

## Product Scope

- **Find Tutors**: learners and families browse tutors by subject, level, price, and teaching style.
- **Tutor Recruitment Page**: explains the value, expectations, and preparation required before becoming a tutor.
- **Tutor Registration Form**: the focused stepper flow where prospective tutors submit the information required for a Tutor Application.
- **Tutor Application**: the submitted record reviewed by the platform team before a Tutor Profile can become public.
- **Pending Review**: the initial state after successful Tutor Registration.

The Tutor Recruitment Page and Tutor Registration Form are intentionally separate. Recruitment explains and qualifies; registration collects application data.

## Current Highlights

- Nuxt 4 / Vue 3 frontend with Nuxt UI and Tailwind CSS.
- Bilingual English/Thai app copy through the local `useAppLocale` helper.
- Tutor Recruitment hero image remains language-independent.
- Thai Tutor Recruitment heading supports proper wrapping and readable reveal timing.
- `BlurText` uses grapheme-aware text segmentation so Thai tone marks stay attached to their base characters.
- Auth entry pages support bilingual copy and wider, cleaner form layouts.
- Tutor Registration uses a six-step flow: Account, Personal, Education, Teaching, Documents, Review.
- Draft handling excludes sensitive fields such as passwords and uploaded files.

## Tech Stack

- **Framework**: Nuxt 4 / Vue 3
- **UI**: Nuxt UI
- **Styling**: Tailwind CSS
- **Language**: TypeScript / JavaScript
- **Validation**: Zod
- **Animation**: GSAP
- **Testing**: Node test runner

## Project Structure

```text
/
├── CONTEXT.md
├── PRODUCT.md
├── DESIGN.md
├── docs/
│   ├── adr/
│   ├── agents/
│   ├── issues/
│   └── prd/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── pages/
│   │   └── utils/
│   └── tests/
└── supabase/
```

## Getting Started

Install dependencies and run the frontend from the `frontend` directory:

```powershell
cd frontend
npm install
npm run dev
```

The local dev server defaults to:

```text
http://localhost:3000
```

## Available Scripts

Run these from `frontend/`:

```powershell
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
npm run preview
```

- `npm run dev`: starts the Nuxt development server.
- `npm test`: runs behavior-focused Node tests.
- `npm run lint`: checks code style and lint rules.
- `npm run typecheck`: runs Nuxt/Vue type checking.
- `npm run build`: builds the production app.
- `npm run preview`: previews the built production app locally.

## Development Notes

- Use domain terms from `CONTEXT.md` in issue titles, tests, and implementation notes.
- Respect ADR 0001: Tutor Recruitment and Tutor Registration must remain separate.
- Do not edit files inside `node_modules`; override behavior in app code or local components.
- Prefer behavior tests through public interfaces, especially exports from `frontend/app/utils/`.
- Keep bilingual UI copy concise enough for Thai and English layouts.
- For Thai animated text, preserve grapheme clusters so tone marks and vowels render correctly.

## Issue Tracker

Issues and PRDs are tracked in GitHub Issues for:

```text
CableMoMo2027/TeachThrough
```

See `docs/agents/issue-tracker.md` for the repo's issue workflow.
