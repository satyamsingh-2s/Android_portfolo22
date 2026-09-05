# Redesign "Other Projects" Section — Typography-First

## Goal
Replace the current card-grid projects section with the minimal, scan-first layout from the uploaded `designproject_1.md`: no cards, no always-visible stack pills, no decorative patterns in this section. Omega stays untouched as the rich flagship.

## Changes

### 1. Data (`src/lib/data.ts`)
Rework `otherProjects` entries to match the doc's content exactly:
- Each project gets: `title`, `domain` (Android / Systems / Web / AI·Backend), `shortDescription` (default state), `expandedDescription`, `stack` (dot-separated string, e.g. "Kotlin · Jetpack Compose · MediaStore · FileObserver"), `link`.
- Remove the per-project `pattern`/`tint` fields — no patterns in this section anymore.
- Keep all 5 projects: Screesher, Secura, Macer, Portfolio Website, AI Financial Assistant.

### 2. Section rewrite (`src/components/sections/OtherProjects.tsx`)
- Eyebrow "Other Projects" + subline "A range of experiments across Android, systems, web and AI."
- Responsive 2-column grid on desktop (single column on mobile); items may have natural, unequal heights.
- Each project = a row block:
  - Project name (large display type) on the left, quiet uppercase mono domain label on the right.
  - One-line short description in muted gray.
  - Thin `border-border-subtle` separator line under each block — text and lines create the structure.
- No PatternCard, no Tags, no background tints, no numbering.

### 3. Progressive disclosure (signature interaction)
- On hover (desktop): the block expands in place — expanded description, stack line in mono, and "View Project ↗" fade in with a small upward slide, smooth height animation (~200–300ms ease-out). Title gets a subtle accent color shift, separator line slightly strengthens, arrow nudges right.
- On touch/mobile: tap toggles the same expanded content (button with `aria-expanded`), so nothing essential requires hover.
- Implementation: a `ProjectRow` client component with a `group` hover state plus a click-toggle state; height animation via grid-template-rows / max-height transition, respecting `prefers-reduced-motion`.

### 4. Cleanup
- `PatternCard`/`PatternSvg` stay in the codebase (still used by Leadership); only this section stops using them.
- Verify visually via Playwright: default state, hover expansion, and mobile tap.

## Out of Scope
- Omega flagship section, all other sections, design tokens, and motion specs remain unchanged.
