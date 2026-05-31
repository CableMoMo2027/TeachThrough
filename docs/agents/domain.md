# Domain Docs

This repo uses a single-context domain documentation layout.

## Before exploring, read these

- `CONTEXT.md` at the repo root for domain language.
- `docs/adr/` for architectural decisions that touch the area being changed.

If any of these files do not exist, proceed silently. Producer skills create domain docs lazily when terms or decisions are resolved.

## Layout

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── frontend/
```

## Use the glossary vocabulary

When output names a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term as defined in `CONTEXT.md`. Do not drift to synonyms the glossary explicitly avoids.

If the concept needed is not in the glossary yet, either reconsider whether it belongs to this domain or note the gap for `grill-with-docs`.

## Flag ADR conflicts

If output contradicts an existing ADR, surface it explicitly rather than silently overriding it.
