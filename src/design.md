# FLVR: Quiet Dark (editorial minimalism)

## Essence

A calm, dark, editorial interface. Content sits in softly rounded panels separated
by a small gutter, with hairline rules, thin "+" registration marks and light-weight
sans type. One warm copper accent, taken from the FLVR wordmark. Nothing shouts:
no heavy weights, no hard shadows, no saturated fills.

## Colour (dark only)

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#080909` | Behind the panels |
| `--bg-primary` | `#0f1011` | Panels |
| `--bg-secondary` | `#151617` | Raised surfaces, image placeholders |
| `--text-primary` | `#ece8e1` | Headings, key text (warm off-white) |
| `--text-secondary` | `rgba(236,232,225,.66)` | Body copy |
| `--text-muted` | `rgba(236,232,225,.40)` | Labels, captions |
| `--accent` | `#d6ad84` | One highlight per view, focus ring, active nav |
| `--border-default` | `rgba(236,232,225,.10)` | Hairlines, panel borders |
| `--border-strong` | `rgba(236,232,225,.22)` | Outlined buttons, crosshairs |

Concept cards and the concept drawer use each concept's own palette (`src/data/concepts.js`).
Imagery is softened with `brightness(.78-.85)` and `saturate(.75-.85)` so it never overpowers the type.

## Typography

- **Latin:** Inter (variable, self-hosted via @fontsource-variable/inter). Headings 300 (light), key figures 200, body 400, small controls 500.
- **Arabic:** Etlalah regular. No forced bold.
- **Display:** uppercase, light, `clamp(2.2rem, 5.4-5.8vw, 4.8-5.2rem)`, leading ~1.04.
- **Statements:** sentence case, light, `clamp(1.9rem, 3.6vw, 3.3rem)`, leading ~1.14.
- **Body:** 15px, line-height 1.75-1.8, secondary colour.
- **Labels (`.eyebrow`):** 11px, uppercase, tracking .2em, muted.

## Shape and layout

- Pages are a stack of `.panel`s (radius 28px, 1px hairline) inside an 8-12px gutter.
- Images use 20-22px radius. Pills are fully rounded.
- Editorial details: `Crosshair` marks in panel corners, a hairline beside the lead paragraph.

## Components

- `CtaLink`: filled or outlined pill plus a separate circular arrow. Primary action = filled.
- `.btn-primary` / `.btn-secondary`: same pill shape for `<button>` elements.
- `SectionHeading`, `PageHeader`: eyebrow, statement, lead.
- `TermsTable`, `Faq`: hairline rows, no boxes.

## Motion

Fade and 12-24px rise on entry, 0.7-1s, ease `[0.22, 1, 0.36, 1]`. Image hover is a slow 1.04 scale.
`prefers-reduced-motion` is respected.
