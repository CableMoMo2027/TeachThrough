# Design

## Theme

Light (default). The interface should feel like a high-end educational gallery: bright, airy, and focused, with deep-blue accents for trust and gold/accent tones for luxury.

## Color Palette

- **Brand (Primary)**: `#0ea5e9` (Sky 500) -> OKLCH `0.65 0.18 245`. Used for primary actions and brand presence.
- **Trust (Secondary)**: `#06b6d4` (Cyan 500) -> OKLCH `0.70 0.16 220`. Used for supportive trust elements.
- **Accent (Tertiary)**: `#8b5cf6` (Violet 500) -> OKLCH `0.55 0.22 285`. Used for highlights and "luxurious" touches.
- **Surface**: White `#ffffff` with subtle neutral-50 tints for depth.
- **Text**: Neutral-950 for high contrast, Neutral-600 for supporting labels.

## Typography

- **Sans-serif**: `Plus Jakarta Sans` (Primary) for a modern, high-end feel.
- **Secondary (Thai)**: `IBM Plex Sans Thai` for clarity and professional tone.
- **Scale**: Minor Third (1.200) for product density, with occasional large hero headers.

## Spacing & Rhythm

- **Scale**: 4px base (0.25rem).
- **Rhythm**: Generous whitespace to convey "Luxury" and "Clarity". Large containers use `gap-6` or `gap-8`.

## Components

- **Cards**: Large radii (`1.25rem`), very soft shadows (`shadow-sm` with custom ring-1), white elevated backgrounds.
- **Buttons**: Fully rounded (`rounded-full`), semi-bold text, smooth color transitions.
- **Inputs**: Fully rounded, subtle elevated background, focused blue ring.

## Motion

- **Style**: Fluid and high-end.
- **Timing**: 400ms-600ms for page transitions.
- **Curves**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ease-out-expo) for a snappy yet smooth feel.
