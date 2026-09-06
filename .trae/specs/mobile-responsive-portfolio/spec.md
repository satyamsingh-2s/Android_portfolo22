# Satyam Singh Portfolio — Mobile Responsiveness & Projects Redesign
## Product Requirements Document

## Overview
- **Summary**: Adapt the existing Satyam Singh portfolio desktop site for mobile viewports (<768px), rebuild the Projects section (Omega carousel + Other Projects row layout), and reconcile doc/build inconsistencies. Delivered in phases with acceptance gates.
- **Purpose**: The desktop site is functioning; mobile viewports currently show a shrunk desktop layout with broken navigation, illegible text in mockups, overlapping spatial effects, and horizontal overflow. The Projects section needs a redesign (carousel + color-coded row layout) regardless of viewport width.
- **Target Users**: Recruiters, hiring managers, and collaborators viewing the portfolio on phones (320px–767px), tablets (768px–1023px), and desktops (≥1024px).

## Goals
- Deliver a mobile-first responsive experience with no horizontal scroll, no text overlap, no clipped content, and ≥44px touch targets at all widths 320px and above.
- Replace the static Omega showcase screenshot with a swipeable 4-panel carousel (desktop + mobile) with pagination dots and 250–300ms ease-out transitions.
- Replace the Other Projects 2×2 card grid with a minimal color-coded row layout using a 5-color palette (blue/green/purple/orange/teal) with accent bars, domain labels, hover/tap expansion, and per-project SVG background patterns.
- Reconcile the two documented doc/build mismatches (nav fade behavior and theme toggle position) so docs and build agree.

## Non-Goals
- No new sections, copy changes, or new case-study content beyond what the mobile spec already describes.
- No swap-in of mobile-specific designer assets (Hero mockup, Omega 4-panel crops, stacked Design diagram) — those are blocked on designer delivery. Layout shells and placeholder fallbacks only.
- No redesign of the desktop visual system beyond what is explicitly specified.
- No light-theme activation or theme-toggle feature expansion beyond current behavior.

## Background & Context

Source-of-truth files (in project root):
- [implementation_mobile_resoposive.md](file:///P:/Android_portfolo22/design%20and%20implementaion/implementation_mobile_resoposive.md) — ordered execution plan and phase checklists.
- [mobile-responsive-spec.md](file:///P:/Android_portfolo22/design%20and%20implementaion/mobile-responsive-spec.md) — breakpoint behavior, per-section mobile treatments, asset requirements.

Referenced but **missing** from the repository (treated as implicit context, not enforced):
- `design-final.md` (visual system)
- `content-brief.md` (copy source)
- `project-section-update.md` (Omega carousel + Other Projects redesign).

Where the two existing files disagree, `mobile-responsive-spec.md` wins for anything it explicitly covers because it is the later, more-specific revision.

**Current codebase state (verified):**
- Stack: React 19, TanStack Router/Start, Vite, Tailwind v4, motion/react, embla-carousel-react (already installed), lucide-react icons.
- Mobile hook: `useIsMobile()` at [use-mobile.tsx](file:///P:/Android_portfolo22/src/hooks/use-mobile.tsx) uses a 768px breakpoint — matches the spec, reuse it.
- Nav at [Nav.tsx](file:///P:/Android_portfolo22/src/components/Nav.tsx) currently: center-top fixed pill, fades to 0 after 60% of viewport height scroll, text labels, "Let's talk" pill.
- Theme toggle at [ThemeToggle.tsx](file:///P:/Android_portfolo22/src/components/ThemeToggle.tsx): fixed top-right (build reality).
- Omega at [Omega.tsx](file:///P:/Android_portfolo22/src/components/sections/Omega.tsx): single static `<img>` of a wide 4-panel composite.
- Other Projects at [OtherProjects.tsx](file:///P:/Android_portfolo22/src/components/sections/OtherProjects.tsx): 2-column md:grid-cols-2 ProjectRow grid with text-only rows, no color accents, no per-project patterns.
- Design section at [DesignUX.tsx](file:///P:/Android_portfolo22/src/components/sections/DesignUX.tsx): 3 case-study cards rotated/overlapped with offset-y classes (`md:-translate-y-6`, `md:translate-y-8`) and decorative floating corner circles. Expanded view uses live-coded SVG/CSS diagrams at [DesignDiagrams.tsx](file:///P:/Android_portfolo22/src/components/design/DesignDiagrams.tsx) — **confirmed live-coded, not flat images**.
- Background pattern at [BackgroundPattern.tsx](file:///P:/Android_portfolo22/src/components/BackgroundPattern.tsx): SVG with 28s drift animation; `prefers-reduced-motion` already respected in [styles.css](file:///P:/Android_portfolo22/src/styles.css).
- Leadership at [Leadership.tsx](file:///P:/Android_portfolo22/src/components/sections/Leadership.tsx): two PatternCards + footnotes. No explicit SVG connector lines are currently rendered; the spec's "hide connector lines" is interpreted as a guard against future ones or any decorative link visuals.
- Pattern infrastructure: [PatternCard.tsx](file:///P:/Android_portfolo22/src/components/PatternCard.tsx) + [PatternSvg.tsx](file:///P:/Android_portfolo22/src/components/PatternSvg.tsx) with motifs: dot-grid, diagonal, contour, hex-grid, circuit-trace, radial.

**Breakpoints (from mobile-responsive-spec.md §Breakpoints):**
- Desktop: ≥1024px (unchanged)
- Tablet: 768–1023px (mostly desktop layout, grid collapses where noted)
- Mobile: <768px (primary target of this spec)

## Functional Requirements

- **FR-1 Nav**: Below 768px the text nav is replaced entirely by a single-row icon-only bar (logo/name mark + section glyphs + Let's-talk icon + theme toggle). No hamburger, no drawer. No wrap to two rows even at 320px — drop the Design icon last if width is tight. Icons smooth-scroll to sections identically to desktop text links. At ≥768px existing nav behavior is preserved.
- **FR-2 Nav fade behavior**: Reconciled: the build currently fades out after Hero scroll (per [Nav.tsx](file:///P:/Android_portfolo22/src/components/Nav.tsx#L17-L25) lines 17–25). This is the chosen reality; we keep it and the spec/docs reflect it.
- **FR-3 Theme toggle position**: Reconciled: the build places it fixed top-right inside the nav row area (per [ThemeToggle.tsx](file:///P:/Android_portfolo22/src/components/ThemeToggle.tsx)). This is the chosen reality; keep it. On mobile it moves inside the icon-only nav row.
- **FR-4 Other Projects row layout**: Replace the current 2-column ProjectRow grid with a full-width vertical list of project rows. Each row has: (a) a 5-color palette accent (blue / green / purple / orange / teal) applied as a left border bar; (b) top-right mono domain label; (c) title and one-line description; (d) an arrow/link icon; (e) an assigned SVG background pattern (dot-grid / wave / hex-grid / diagonal hairlines / wave — use existing PatternSvg motifs where available, map "wave" → contour or a new simple wave pattern); (f) hover on desktop and tap on mobile trigger a smooth vertical height expansion that reveals tags + expanded description + "View project" link. No popup, no card transform.
- **FR-5 5-color palette exception**: The Other Projects section is the **only** permitted section that shows >2 accent colors simultaneously. Confirm no other section exceeds 2 accent colors at once after the redesign.
- **FR-6 Omega 4-panel carousel**: Replace the single static wide-composite image in [Omega.tsx](file:///P:/Android_portfolo22/src/components/sections/Omega.tsx) with a swipeable 4-panel carousel (use `embla-carousel-react`, already installed). Behavior: drag left/right + dot indicators below; slide transition 250–300ms ease-out; dot click jumps to slide; carousel shows one panel at a time on mobile, same on desktop (consistent with the Other Projects spec §1 Omega carousel description). Until designer delivers 4 separate mobile-optimized assets, use the current existing wide composite split / cropped into 4 equal panels or 4 copies of the full image as temporary placeholders.
- **FR-7 Hero mobile stacking**: On <768px the Hero's right "Currently Building" card stacks below the name/subline/CTA column (single column) and goes full width. The three CTA buttons stack full-width vertically with ≥44px height each. The existing hero2 image is used as a placeholder per Phase 3 guidance; no new asset swap required now.
- **FR-8 Design case-study cards mobile treatment**: On <768px the three case-study cards are: no rotate, no translate-y offset, no overlap, no decorative floating corner circles, stacked vertically full-width. Each card reuses a colored top or left border (the row accent pattern) instead of the `8px 8px 0 0 {color}` box-shadow + rotated decorative elements. Expanded view: 2-column diagram+steps grid collapses to 1 column (diagram first, then numbered steps below). The live-coded diagrams at [DesignDiagrams.tsx](file:///P:/Android_portfolo22/src/components/design/DesignDiagrams.tsx) are restacked vertically on mobile (all boxes in a single column for LayersDiagram; TreeDiagram connectors kept simple but verticalized; MarkDiagram unchanged or stacked).
- **FR-9 Leadership connector lines**: Any decorative SVG/CSS connector lines linking bullets to stat numbers (if present now or added later) are hidden below 768px via `display: none` or equivalent CSS. Stat rows display cleanly beneath each card's text.
- **FR-10 Background pattern on mobile**: The drift animation (28s translate/scale) at [BackgroundPattern.tsx](file:///P:/Android_portfolo22/src/components/BackgroundPattern.tsx#L21) is disabled below 768px (static frame, no transform), while the SVG still renders with its opacity. `prefers-reduced-motion` continues to override regardless of viewport width (per existing CSS in [styles.css](file:///P:/Android_portfolo22/src/styles.css)).
- **FR-11 Reflow sections**: Below 768px: Skills grid → single column; Education → single column; Contact → info block and form stack vertically; Athletics card → full width single card; Other Projects → single column rows. Tag wrapping in Skills is natural. Contact social buttons remain a row or wrap to two rows at 320px.
- **FR-12 Tap targets**: Every interactive element (nav icons, CTA buttons, project rows, case study cards, social icons, form inputs, theme toggle) has a minimum hit area of 44×44 CSS pixels on <768px.

## Non-Functional Requirements

- **NFR-1 No horizontal scroll**: DocumentElement `scrollWidth` must equal `clientWidth` at viewport widths of 320px, 375px, 414px, 767px, 768px, and 1024px.
- **NFR-2 No clipping/overlap**: At 320px through 767px every text node in the DOM must render with both its `boundingClientRect.bottom` below its `top` and no text node's bounding rect intersect any other non-descendant text node's bounding rect by ≥50% of its area.
- **NFR-3 prefers-reduced-motion**: Background drift animation, carousel slide easing visual, and height expansions all fully disable (or use 0ms transition) when `matchMedia('(prefers-reduced-motion: reduce)')` matches, regardless of viewport.
- **NFR-4 Device widths verified manually in review**: Reviewer loads at 375px (iPhone SE), 414px (iPhone Plus), 768px (iPad mini portrait) and performs a full scroll pass.
- **NFR-5 Lint/typecheck clean**: `npm run lint` and `npm run build` exit with code 0 after every completed phase task.

## Constraints
- **Technical**: React 19 + TanStack Start + Tailwind v4 + motion/react + embla-carousel-react (no new runtime dependencies unless absolutely required). Breakpoint: mobile `<768px`, tablet `768px–1023px`, desktop `≥1024px`. Existing `useIsMobile()` hook must be reused.
- **Business**: Lovable-connected repository — do not rewrite published git history. Keep the branch in a working state at every phase boundary.
- **Dependencies**: Designer delivery of three new mobile-specific assets (Hero phone mockup recomposed for portrait, Omega 4-panel individual images, stacked Design diagram — **if** the diagram were an image, which it is not) is required for Phase 3. Those are not part of this implementation; we ship layout shells + graceful placeholders only.
- **Palette constraint (5-color exception)**: Only Other Projects may show 5 accent colors at once. All other sections stay ≤2.

## Assumptions
- The three missing reference files (`design-final.md`, `content-brief.md`, `project-section-update.md`) are not required for implementation since the two existing documents plus current code provide all necessary detail. Where they conflict, `mobile-responsive-spec.md` wins.
- The "wave" pattern requested for Other Projects rows is approximated by the existing `contour` motif in [PatternSvg.tsx](file:///P:/Android_portfolo22/src/components/PatternSvg.tsx) (it looks like waves). If a distinct sine-wave pattern is wanted later it can be added without breaking the layout.
- "Leadership connector lines" don't currently exist in the code. The requirement is interpreted as a CSS visibility rule that will apply if any are present or are later added (safe default: add a `hidden md:block` utility class or a CSS media query on a `.leadership-connector` selector).
- Omega carousel will initially render 4 slides using the current image as a placeholder. The designer will provide the 4 individual panel files later (Phase 3).

## Acceptance Criteria

### AC-1: Nav icon-only mobile version at <768px
- **Type**: `rule`
- **Given**: A viewport width <768px and the page fully loaded
- **When**: The nav bar renders
- **Then**: No text labels are visible; only a name/logo mark, section icon glyphs, a Let's-talk icon, and the theme toggle appear in one row; at 320px width the row does not wrap to two lines; tapping each icon smooth-scrolls to its target section.
- **Pass Condition**: DevTools responsive mode at 320px shows a single-row nav with no text labels, 5 functional icons, no wrap.
- **Evidence**: Screenshot at 320px + manual tap-verify scroll behavior.

### AC-2: Nav fade and theme toggle reconciled
- **Type**: `rule`
- **Given**: Desktop viewport, nav visible, then user scrolls past Hero
- **When**: Scroll position exceeds 60% of viewport height
- **Then**: Nav fades out (existing behavior); theme toggle remains in fixed top-right position (existing behavior). No conflicting alternate implementation.
- **Pass Condition**: Scroll past Hero → nav opacity 0; theme toggle still visible at top-right.
- **Evidence**: Recording or step-through.

### AC-3: Other Projects 5-color row layout with patterns and expansion
- **Type**: `rule`
- **Given**: Any viewport width and the Other Projects section
- **When**: 5 rows are rendered
- **Then**: Each row has a distinct accent-color left border bar (blue/green/purple/orange/teal), a unique assigned SVG pattern background, a top-right domain label, title, short description, arrow icon. Hovering a row on desktop or tapping on mobile expands it vertically to reveal expanded description, stack tags, and a link. Smooth height transition with motion-reduce opt-out.
- **Pass Condition**: 5 visually distinct rows at desktop width; no other section on the page shows more than 2 accent colors simultaneously.
- **Evidence**: Section screenshot + hover-to-expand and tap-to-expand recording.

### AC-4: Omega 4-panel swipeable carousel
- **Type**: `rule`
- **Given**: Omega section loaded
- **When**: User drags horizontally or clicks pagination dots
- **Then**: The active slide changes with a 250–300ms ease-out transition; 4 slides exist; dot indicators update; clicking dot N jumps to slide N.
- **Pass Condition**: 4 slides rendered; swipe and dot-click both transition; timing matches 250–300ms.
- **Evidence**: Carousel interaction recording; computed transition-duration checked in DevTools.

### AC-5: Hero stacks on mobile
- **Type**: `rule`
- **Given**: Viewport <768px
- **When**: Hero section renders
- **Then**: Right card ("Currently Building") appears below identity text in a single full-width column. CTA buttons are full-width, vertically stacked, each ≥44px tall.
- **Pass Condition**: At 375px, Hero is single column, card below text, 3 stacked buttons ≥44px.
- **Evidence**: 375px screenshot.

### AC-6: Design case-study cards stacked non-rotated on mobile
- **Type**: `rule`
- **Given**: Viewport <768px, Design section
- **When**: The three collapsed case-study cards render
- **Then**: No rotation, no y-translation offset, no overlap, no floating decorative corner circles. Cards are stacked vertically full-width with colored top/left accent borders. When expanded, the diagram + numbered steps 2-column grid collapses to 1 column (diagram above steps). Live-coded diagrams: LayersDiagram boxes are stacked in a single vertical column; TreeDiagram and MarkDiagram remain layout-safe at full width.
- **Pass Condition**: No rotate/translate classes active at <768px; `.escaping-fragments` (or equivalent) are hidden. Expanded view is 1-col.
- **Evidence**: 375px screenshots of collapsed grid and one expanded case study.

### AC-7: Background animation disabled on mobile; respects reduced-motion anywhere
- **Type**: `rule`
- **Given**: Viewport <768px OR `prefers-reduced-motion: reduce`
- **When**: Background pattern SVG renders
- **Then**: The `.ambient-drift g` element has no active transform animation (static); CSS `@media (prefers-reduced-motion: reduce)` still disables drift regardless of width.
- **Pass Condition**: `<768px` → animation-play-state paused or transform property static; reduced-motion media query still disables it on desktop.
- **Evidence**: DevTools computed styles at 375px (no drift) and at desktop with reduced-motion emulated.

### AC-8: Leadership connector lines hidden on mobile
- **Type**: `rule`
- **Given**: Viewport <768px, Leadership section
- **When**: Inspecting the Leadership DOM / rendered output
- **Then**: Any element matching `.leadership-connector`, `svg.connector-line`, or equivalent decorative link visuals has `display: none`. Bullet lists and stat rows are cleanly stacked with no visual gap.
- **Pass Condition**: No connector lines visible at <768px; present at ≥768px (if any exist).
- **Evidence**: 375px Leadership screenshot.

### AC-9: No horizontal scroll and no overlap/clipping at key widths
- **Type**: `rubric`
- **Dimension**: Mobile viewport robustness at 320/375/414/767/768/1024 px widths
- **Scale**: 1-5
- **Anchors**: 1 = horizontal scroll bar present or severe overlap at multiple widths; 3 = one minor overflow/overlap at edge width (e.g., 320px) easily fixed; 5 = zero overflow, zero overlap, every section pixel-perfect at all 6 widths
- **Pass Threshold**: >= 4
- **Evidence**: Full-scroll screenshots or recording at each of the 6 widths; `document.documentElement.scrollWidth === clientWidth` verified in console.

### AC-10: Tap target sizing
- **Type**: `rule`
- **Given**: Viewport <768px
- **When**: Measuring every interactive element's hit area
- **Then**: Each interactive element (nav icons, CTAs, project rows, case cards, social icons, form inputs, theme toggle) occupies a minimum 44×44 CSS px clickable region.
- **Pass Condition**: DevTools box model shows width≥44 and height≥44 (or padding achieves it) for every interactive control.
- **Evidence**: Tabular measurement of 5+ key controls at 375px.

### AC-11: Reflow sections single-column on mobile
- **Type**: `rule`
- **Given**: Viewport <768px
- **When**: Scrolling Skills, Education, Contact, Athletics, Other Projects sections
- **Then**: Skills categories = 1 column; Education = 1 column; Contact info + form stacked; Athletics = single full-width card; Other Projects = single column rows.
- **Pass Condition**: Grid utilities show `grid-cols-1` (no 2/3 col) at <768px on the sections listed.
- **Evidence**: 375px screenshots of each section.

### AC-12: Build and lint clean
- **Type**: `rule`
- **Given**: All changes applied
- **When**: Running `npm run lint` and `npm run build`
- **Then**: Both exit with code 0 with no TypeScript errors, no ESLint errors.
- **Pass Condition**: Exit codes 0, captured stdout.
- **Evidence**: Attached command output.

## Open Questions
- [ ] **Missing `project-section-update.md`**: The implementation guide references it for the exact 5-color→project mapping, pattern→project assignment, and Omega carousel dot style. For now we implement a reasonable default mapping. User: confirm/override this mapping (we'll pick Screesher→blue/dot-grid, Secura→green/hex-grid, Macer→purple/diagonal, Portfolio→orange/wave-contour, AI Financial→teal/radial as a starting point).
- [ ] **Wave pattern vs contour**: Is existing `contour` motif acceptable as "wave" in the 5-project Other Projects section, or do you want a new dedicated sine-wave SVG pattern added?
- [ ] **Nav icon set**: Spec says "simple glyph per section" — are the existing lucide icons acceptable? Proposed: Projects = FolderKanban, Skills = Code2, Design = Palette, Leadership = Users, Let's-talk = MessageCircle, Design icon is first to drop at 320px if tight.
- [ ] **Theme toggle placement in mobile nav**: The toggle currently sits outside the nav (fixed top-right, z-50). On mobile the spec says it should be part of the icon row. Do you want it **inside** the nav pill (replacing the current separate fixed button) on all widths for consistency, or inside on mobile only?
