# Midnight Harbor

## Essence

A modern, high-trust design system built around a deep charcoal foundation with confident teal energy, balanced by warm coral and sharp gold accents. It feels premium, focused, and highly usable. The philosophy is disciplined clarity — strong contrast, minimal ornamentation, and deliberate use of color to guide attention.

---

# Color Palette

The palette is dual-mode, toggling automatically via `prefers-color-scheme`.

### Core Brand Colors (constant across modes)

- **Harbor Teal**: `#0b7285` — primary brand color; actions, links, focus states
- **Signal Coral**: `#ff6b6b` — urgency, secondary CTAs, highlights
- **Trust Gold**: `#ffd43b` — rewards, success emphasis, premium moments

---

# Dark Mode (default / `prefers-color-scheme: dark`)

Built on `#121212` for depth, clarity, and reduced eye strain.

## Backgrounds

- **`--bg-primary`**: `#121212` — main canvas
- **`--bg-secondary`**: `#1a1a1a` — cards, nav, elevated surfaces
- **`--bg-brand-tint`**: `#0f2f35` — teal-tinted info surfaces
- **`--bg-coral-tint`**: `#3a2020` — coral alert / accent surfaces
- **`--bg-gold-tint`**: `#3a320f` — gold premium surfaces

## Text

- **`--text-primary`**: `#f8f9fa` — main headings and body
- **`--text-secondary`**: `#cfd4da` — secondary content
- **`--text-link`**: `#38a3b8` — interactive text
- **`--text-muted`**: `#8b9198` — placeholders, subtle labels

## Brand Adapted for Dark Mode

- **Teal Light**: `#38a3b8`
- **Coral Light**: `#ff8e8e`
- **Gold Light**: `#ffe066`

## Borders & Interactive

- **`--btn-primary`**: `#0b7285` fill / `#f8f9fa` text
- **`--btn-accent`**: `#ff6b6b` fill / `#121212` text
- **`--btn-reward`**: `#ffd43b` fill / `#121212` text
- **`--btn-outline`**: transparent fill + `1.5px #0b7285` border / `#f8f9fa` text
- **`--border-default`**: `rgba(248,249,250,0.08)`
- **`--border-strong`**: `rgba(11,114,133,0.45)`

## Semantic

- **Info**: `#0f2f35` bg / `#6ed0e0` text
- **Success**: `#1f3322` bg / `#9be38f` text
- **Warning**: `#3a320f` bg / `#ffe066` text
- **Error**: `#3a2020` bg / `#ff8e8e` text

---

# Light Mode (`prefers-color-scheme: light`)

Built on `#f8f9fa` for cleanliness and readability.

## Backgrounds

- **`--bg-primary`**: `#f8f9fa` — main page background
- **`--bg-secondary`**: `#ffffff` — cards and raised sections
- **`--bg-brand-tint`**: `#e6f4f7` — teal wash surfaces
- **`--bg-coral-tint`**: `#fff0f0` — soft coral surfaces
- **`--bg-gold-tint`**: `#fff9db` — warm gold surfaces

## Text

- **`--text-primary`**: `#121212` — headings and body
- **`--text-secondary`**: `#495057` — secondary copy
- **`--text-link`**: `#0b7285` — links and actions
- **`--text-muted`**: `#868e96` — placeholders, subtle labels

## Borders & Interactive

- **`--btn-primary`**: `#0b7285` fill / `#f8f9fa` text
- **`--btn-accent`**: `#ff6b6b` fill / `#ffffff` text
- **`--btn-reward`**: `#ffd43b` fill / `#121212` text
- **`--btn-outline`**: `#ffffff` fill + `1.5px #0b7285` border / `#0b7285` text
- **`--border-default`**: `#dee2e6`
- **`--border-strong`**: `#0b7285`

## Semantic

- **Info**: `#e6f4f7` bg / `#0b7285` text
- **Success**: `#eefbea` bg / `#2b8a3e` text
- **Warning**: `#fff9db` bg / `#8f5f00` text
- **Error**: `#fff0f0` bg / `#c92a2a` text

---

# Typography

## Families

- **Display / Headings**: `Metropolis` from `/public/metropolis`
- **Body**: Same family, regular 400
- **UI / Nav**: Same family, medium weight for controls

## Updated Treatment

- Dark mode uses bright neutral typography with teal interaction cues
- Light mode uses dark neutral typography with teal structure
- Coral is reserved for urgency and action emphasis
- Gold is used sparingly for premium or reward moments

---

# Border Radius

- **Pill**: `999px`
- **Buttons**: `8px`
- **Cards**: `14px`
- **Inputs**: `10px`

---

# Interactive States

## Buttons

### Primary

- Fill: `#0b7285`
- Hover: `#0e859b`
- Active: `#095c6b`

### Accent

- Fill: `#ff6b6b`
- Hover: `#ff8787`
- Active: `#fa5252`

### Reward

- Fill: `#ffd43b`
- Hover: `#ffe066`
- Active: `#fcc419`

### Outline

- Border: `#0b7285`
- Hover background: subtle teal tint

## Inputs

- Focus ring: `0 0 0 3px rgba(11,114,133,0.18)`

## Links

- Default: `#0b7285`
- Hover: underline + brightness increase

---

# Design Principles

1. **Trust Through Contrast** — Strong readable contrast creates confidence.
2. **Color With Purpose** — Teal leads, coral alerts, gold rewards.
3. **Premium Simplicity** — Minimal styling, refined proportions, no clutter.
4. **Consistent Across Modes** — Same emotional identity in light and dark themes.
5. **Fast Recognition** — Buttons, states, and priorities are instantly scannable.

---

# Implementation Notes

```css
:root {
  --bg-primary: #121212;
  --bg-secondary: #1a1a1a;
  --text-primary: #f8f9fa;
  --text-link: #0b7285;
  --brand-primary: #0b7285;
  --brand-accent: #ff6b6b;
  --brand-reward: #ffd43b;
  --border-default: rgba(248, 249, 250, 0.08);
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #f8f9fa;
    --bg-secondary: #ffffff;
    --text-primary: #121212;
    --border-default: #dee2e6;
  }
}
```
