# Satyam Singh Portfolio Website — Build Plan

## Goal
Build a single-page portfolio site that positions Satyam Singh as a hireable Android Developer, using the uploaded `design-final-2.md` and `content-brief_1-2.md` as the source of truth.

## Current State
- Fresh TanStack Start + Tailwind v4 + shadcn/ui project.
- `src/routes/index.tsx` is still the placeholder blank page.
- `src/styles.css` uses default shadcn slate tokens; needs to be replaced with the portfolio's dark-first custom token system.
- No backend or auth required; this is a static presentation page.

## Build Order

### 1. Design-system foundation
- Replace `src/styles.css` with the dark-first token set from `design-final-2.md` (`--bg-primary`, `--bg-elevated`, `--text-primary`, `--accent`, `--accent-secondary`, etc.).
- Map the custom tokens into Tailwind v4 `@theme inline` utilities.
- Load the chosen fonts via `<link>` in `src/routes/__root.tsx`: Inter Tight (display) + Inter (body) + JetBrains Mono (micro labels).
- Add a theme-toggle class strategy: default dark, optional dimmed-dark alternate for Phase 1; respect `prefers-reduced-motion`.

### 2. Global components
- `Nav`: floating pill with name/logo, section links, and a "Let's talk" CTA. Fades out after scrolling past Hero.
- `Button` variants: solid accent-fill (primary) and ghost/outline (secondary), with press micro-interaction.
- `Tag/Pill`: mono uppercase micro-label style for tech stacks.
- `ProjectCard`: elevated card with mapped background pattern, mono stack line, title, description, metric row, link arrow.
- `StatBlock`: big display number + tiny uppercase label.
- `SectionEyebrow`: mono uppercase section label.
- `ThemeToggle`: fixed side icon (sun/moon).

### 3. Background & patterns
- Fixed full-viewport topographic contour texture in `--accent` at 3–4% opacity.
- Ambient drift animation (20–30s cycle), frozen under `prefers-reduced-motion`.
- Per-card pattern library (dot-grid, diagonal hairlines, hex-grid, circuit-trace, radial rings, contour lines for Omega only), mapped per section.

### 4. Page sections (in content-brief order)
1. **Hero** — name, "Android Developer" headline, subline, three CTAs (View Projects, Download Resume, Contact), optional Kolkata tag.
2. **Omega (flagship)** — full-width card, status tag, stack pills, description, stat row, GitHub link. Placeholder for UI screenshots until assets arrive.
3. **Other Projects** — 2-column grid: Screesher, Portfolio Website, Macer, Secura, AI Financial Assistant. Each card keeps stack + 1–2 sentence description.
4. **Technical Skills** — grouped categories (Android, Web, Systems, AI & APIs, Core CS, Languages, Tools) with category icons and text-only concept pills.
5. **Design/UX Sensibility** — deliberately bounded showcase card with distinct visual language inside the frame; include the verified breadcrumb and icon-3-zone case studies.
6. **Education** — B.Tech Electrical Engineering, CGPA 8.41, coursework; small, pattern-free.
7. **Leadership & Extracurricular** — dominant Dakshh card (₹10–12L budget, 120-member team, 1st edition in 9 years), secondary Lakshaya card (200–300 participants), Prothoma footnote, optional Tata Steel internship footnote.
8. **Athletics** — smallest section, one short card.
9. **Contact** — pattern-free, mirrors Hero; email, phone, location, GitHub/LinkedIn icon buttons, simple Name/Email/Message form.

### 5. Motion & interactions
- Scroll reveals: fade + 12–16px translate for text, 24–32px for cards, 400–500ms ease-out, stagger 60–80ms.
- Hover: background shift or 2–4px lift, 150ms.
- Buttons: press scale-down ~0.97, 100ms.
- Stat counters: count up once on scroll-into-view, ~800ms.
- Smooth-scroll nav links.
- Theme crossfade 200–300ms.

### 6. SEO / head metadata
Update `src/routes/index.tsx` `head()` with unique title, description, og:title, og:description, og:type, twitter:card. No relative/placeholder og:image.

## Open Decisions to Confirm
1. **Leadership layout:** Option A (asymmetric dominance — recommended), B (horizontal timeline), or C (oversized stat headline)? Default to A if no reply.
2. **Nav CTA behavior:** Does the "Let's talk" button fade with the nav or stay pinned? Default to fading with nav.

## Assets Still Needed From Satyam
- Omega GitHub repo link
- Screesher GitHub repo link
- LinkedIn profile URL
- Confirm GitHub handle `github.com/satyamsingh-2s`
- Omega UI screenshots (for Omega and Design/UX sections)
- Final resume PDF for Download Resume CTA
- Decision on whether to include the standalone "Portfolio Website" project card

## Out of Scope for This Plan
- Full light theme (Phase 2 only; dimmed-dark alternate is in scope).
- Backend, auth, CMS, or contact-form delivery service.
- Stock photography; any headshot will be supplied by Satyam.
