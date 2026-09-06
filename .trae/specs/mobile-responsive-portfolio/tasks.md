# Satyam Singh Portfolio — Mobile Responsiveness & Projects Redesign
## Implementation Plan

## Task 1: Reconcile doc/build mismatches (Nav fade + Theme toggle position)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Declare the current build reality as canonical: (a) Nav fades out after Hero scroll (existing behavior); (b) Theme toggle is fixed top-right (existing behavior).
  - Integrate the ThemeToggle component *inside* the Nav pill rather than as a sibling fixed button, so on mobile it fits naturally in the icon row without overlap. Update [Nav.tsx](file:///P:/Android_portfolo22/src/components/Nav.tsx) to import and render ThemeToggle inside the nav pill's right end, and remove the separate `fixed top-right` positioning from [ThemeToggle.tsx](file:///P:/Android_portfolo22/src/components/ThemeToggle.tsx) (make it a plain button without fixed positioning; Nav controls its placement).
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-1.1: Scroll past Hero → Nav opacity becomes 0 (fade behavior preserved). Theme toggle is visually inside the nav pill at all widths ≥768px; no double theme toggle rendered.
  - `rule` TR-1.2: `npm run lint` and `npm run build` pass after this change.
- **Notes**: This is the only cross-component change in Phase 0; it must land first so mobile nav work can assume a single nav container.

## Task 2: Other Projects — 5-color row layout with patterns + hover/tap expansion
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Rewrite [OtherProjects.tsx](file:///P:/Android_portfolo22/src/components/sections/OtherProjects.tsx) ProjectRow component. For each of the 5 projects, add:
    - Accent left border bar using a fixed 5-color palette: Screesher → `#1C7ED6` (blue), Secura → `#2F9E44` (green), Macer → `#7048E8` (purple), Portfolio Website → `#E8590C` (orange), AI Financial Assistant → `#0CA678` (teal).
    - Top-right mono domain label (kept from current).
    - Assigned SVG background pattern via PatternCard/PatternSvg: Screesher → dot-grid, Secura → hex-grid, Macer → diagonal, Portfolio → contour (as "wave"), AI Financial → radial (second "wave" if contour taken, or keep radial — 5 distinct motifs is the goal).
    - Arrow icon `ArrowUpRight` aligned right on the header row.
    - Expansion: on `hover` (desktop) / `tap` (mobile, onClick toggle) expand smooth height to reveal `expandedDescription`, `stack`, and link. Use current CSS grid-rows technique but tune transition timing to 300ms ease-out; ensure `motion-reduce:transition-none` is respected.
  - Remove the `md:grid-cols-2` outer grid → make it a single full-width list of border-bottom rows at all viewport widths (consistent with spec §7 and §1).
  - Add per-project color mapping to `otherProjects` entries in [data.ts](file:///P:/Android_portfolo22/src/lib/data.ts) (add `accentColor` and `pattern` fields) so styling is data-driven.
- **Acceptance Criteria Addressed**: AC-3, AC-11
- **Test Requirements**:
  - `rule` TR-2.1: 5 distinct left-border accent colors and 5 distinct patterns visible at desktop. No other section shows >2 accent colors simultaneously (visually inspect Hero, Omega, Skills, Design, Leadership, Contact).
  - `rule` TR-2.2: Hover on desktop → row expands smoothly (no jump, 300ms timing); tap on mobile (emulated) toggles expansion state. Expanded content includes expanded description, stack line, and "View project" link.
  - `rule` TR-2.3: At <768px, Other Projects renders as a single full-width column with no 2-column grid classes applied.
  - `rule` TR-2.4: `npm run lint` and `npm run build` pass.
- **Notes**: If `contour` alone is not "wave-like" enough, add a new simple `wave` pattern to [PatternSvg.tsx](file:///P:/Android_portfolo22/src/components/PatternSvg.tsx) (2–3 horizontal sine paths).

## Task 3: Omega 4-panel swipeable carousel with embla + pagination dots
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Replace the static single `<img>` in [Omega.tsx](file:///P:/Android_portfolo22/src/components/sections/Omega.tsx#L62-L68) with an embla-carousel instance (dependency already installed).
  - Render 4 slides. Until designer delivers 4 individual cropped panel files: create 4 slides each showing the existing `/images/omega_portfolio_2nd.png` image but with CSS `object-fit: cover` and distinct `object-position` values (e.g. 0% 0%, 33% 50%, 66% 50%, 100% 100%) to simulate 4 separate panels as temporary placeholders. Document this as "placeholders to be swapped in Phase 3".
  - Add pagination dots below the carousel: 4 small dots; active dot uses `var(--accent)` fill, inactive dots use `var(--border-subtle)`. Clicking dot N scrolls to slide N.
  - Slide transition timing: `duration: 280ms, ease: [0.16, 1, 0.3, 1]` (ease-out ~250–300ms window).
  - Wrap carousel in existing `rounded-2xl border border-border-subtle bg-bg-primary` container style.
  - Ensure swipe and pointer drag both work; keyboard arrow nav is nice-to-have but not required.
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `rule` TR-3.1: 4 slides rendered; swiping/dot-clicking changes slide; CSS transition-duration on the embla container is 250–300ms.
  - `rule` TR-3.2: At <768px carousel shows one slide at a time and fits full-width without overflow.
  - `rule` TR-3.3: `npm run lint` and `npm run build` pass.
- **Notes**: Embla already installed. If current existing wide composite image has a distinct 4-panel layout (New Workspace / Timer / Unplanned / History) visible at equal widths, crop positions can be tuned; otherwise a simple 4-way split is fine as placeholder.

## Task 4: Background animation disabled on mobile; reduced-motion everywhere
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - In [BackgroundPattern.tsx](file:///P:/Android_portfolo22/src/components/BackgroundPattern.tsx), conditionally disable the drift animation below 768px. Approaches: (a) use existing `useIsMobile()` hook to set `style={{ animationPlayState: 'paused' }}` or (b) add a Tailwind media query utility class `md:animate` equivalent. Preferred: (a) with the hook, since the hook already exists with correct breakpoint.
  - Keep existing `@media (prefers-reduced-motion: reduce)` rule in [styles.css](file:///P:/Android_portfolo22/src/styles.css#L142-L149) intact (already disables `.ambient-drift` and `.progress-sheen`).
  - Verify that mobile + reduced-motion together don't conflict (no double-negative).
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `rule` TR-4.1: At viewport 375px → `.ambient-drift g` element has `animationPlayState: 'paused'` or transform is static.
  - `rule` TR-4.2: Desktop viewport with Chrome DevTools reduced-motion emulated → drift fully disabled.
  - `rule` TR-4.3: `npm run lint` and `npm run build` pass.

## Task 5: Leadership connector lines hidden on mobile (guard rule)
- **Status**: `pending`
- **Priority**: low
- **Depends On**: None
- **Description**:
  - In [Leadership.tsx](file:///P:/Android_portfolo22/src/components/sections/Leadership.tsx), add a CSS class convention for any decorative connector lines: any SVG/line element with class `leadership-connector` should be hidden below 768px via `hidden md:block` or an equivalent `@media (max-width: 767px) { display: none }` rule.
  - Add this convention as a comment near the PatternCard usage where bullets and stats render, so any future added lines pick it up. Since no explicit connectors currently exist, the main change is defensive CSS and class naming on any wrapper that could receive lines.
  - Verify stat rows still wrap cleanly to 1–2 rows at 320px with no overlap.
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `rule` TR-5.1: Any element marked `.leadership-connector` is `display: none` at 375px and visible at ≥768px. (Add a small test SVG connector during implementation to self-verify, then either leave it in if it matches the desired look or remove it and leave the CSS convention.)
  - `rule` TR-5.2: `npm run lint` and `npm run build` pass.

## Task 6: Design section — stacked non-rotated non-overlapping mobile case cards + live diagrams vertical restack
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - In [DesignUX.tsx](file:///P:/Android_portfolo22/src/components/sections/DesignUX.tsx):
    - CaseCard: Add media-query conditional behavior. On ≥768px keep current rotation/overlap/floating-corner-circles. On <768px:
      - Remove rotations, remove `whileHover={{x:-3,y:-3}}` (or keep, but no rotate).
      - Remove offset-y classes `md:-translate-y-6`, `md:translate-y-8` (these already only apply md+ so effectively no-op, but confirm the grid is `grid-cols-1 gap-6 md:grid-cols-3`).
      - Hide `.escaping-fragments` / decorative floating boxes (lines 46–63 in CaseCard) entirely on mobile via `hidden md:block`.
      - Replace the `8px 8px 0 0 {color}` offset box-shadow with a left accent border (3–4px) matching the study color — consistent with Other Projects row accent pattern.
    - ExpandedCase: The `lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]` 2-column grid already collapses to single-column below lg (1024px). Confirm it uses simple `grid-cols-1 lg:grid-cols-2` so on tablet/mobile diagram stacks above numbered steps. This is likely already the case; verify.
  - In [DesignDiagrams.tsx](file:///P:/Android_portfolo22/src/components/design/DesignDiagrams.tsx):
    - LayersDiagram (Case 01): The top/left/center/right/bottom spatial arrangement doesn't fit at 320–375px. Wrap the diagram in a responsive layout: on <768px render the 5 boxes vertically in a single column (top-layer → left → center → right → bottom, or consistent order) as full-width colored blocks with no rotation, keeping motion/animation. On ≥768px keep the current spatial layout.
    - TreeDiagram (Case 02): The 2-branch grid + connectors may be tight. Verify it fits at 375px; if the grid `grid-cols-2` overflows, collapse to `grid-cols-1` on mobile with simplified connector dots (lines OK to drop on mobile, nodes still render).
    - MarkDiagram (Case 03): Three shape zones + converging lines + Ω mark. Verify fits at 375px; if the 3 shapes overflow width, stack them vertically (stack shapes, keep converging lines and final Ω mark below).
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `rule` TR-6.1: At 375px collapsed cards are flat (no transform rotate/translate) with a left accent border; no floating corner circles. Expanded view is 1 column (diagram above steps).
  - `rubric` TR-6.2: Live diagram readability at 375px — LayersDiagram vertically stacked, TreeDiagram & MarkDiagram legible without clipping. Scale: 1–5; Anchors: 1 = diagrams clip/overflow, 3 = diagrams fit but look cramped with overlapping text labels, 5 = all 3 diagrams cleanly single-column stacked with clear labels; Threshold: >= 4. Evidence: screenshots at 375px of all 3 expanded diagrams.
  - `rule` TR-6.3: `npm run lint` and `npm run build` pass.

## Task 7: Nav icon-only mobile version (section glyphs + Let's-talk icon + theme toggle)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (theme toggle now inside nav, so it can participate in the row)
- **Description**:
  - In [Nav.tsx](file:///P:/Android_portfolo22/src/components/Nav.tsx):
    - Use `useIsMobile()` hook. When true, render icon-only layout; otherwise render current text layout.
    - Mobile nav contents (single row, no wrap):
      1. Left end: "Satyam" name mark (small font-display bold, ~text-sm) OR a compact initial "SS" monogram. Prefer name mark, fall back to initials only if 320px is too tight.
      2. Section icons (lucide-react): Projects → FolderKanban, Skills → Code2, Design → Palette, Leadership → Users. Each icon is a 44×44 clickable area (use h-11 w-11 rounded-full with flex center padding, NOT just padding on a smaller inline icon). onClick → smooth-scroll to section id.
      3. Let's-talk icon: MessageCircle (chat bubble) as icon button, same 44×44 sizing, scrolls to #contact.
      4. Right end: ThemeToggle button (already moved into Nav by Task 1).
    - Constraint: If at 320px the row overflows, drop the Design (Palette) icon first before wrapping. Never wrap to two rows — enforce `flex-nowrap` + `overflow-hidden` + selective icon display.
    - Tooltip labels: spec says optional, not required. Skip.
  - Preserve fade behavior: both mobile and desktop nav variants fade out after Hero scroll per current logic.
- **Acceptance Criteria Addressed**: AC-1, AC-10
- **Test Requirements**:
  - `rule` TR-7.1: At 320px nav renders in one row, no wrap. Icons visible: logo/name + Projects + Skills + [Design IF fits] + Leadership + Let's-talk + Theme-toggle. 320px width measured: total nav width ≤ viewport width.
  - `rule` TR-7.2: Each nav icon click target has computed bounding box ≥44×44 px at 375px.
  - `rule` TR-7.3: Tapping each icon smooth-scrolls to correct section id.
  - `rule` TR-7.4: `npm run lint` and `npm run build` pass.
- **Notes**: lucide icons already installed. Prefer 18–20px stroke size inside 44px hit area for visual balance.

## Task 8: Hero mobile stacking (card below text, 3 full-width stacked CTA buttons ≥44px)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - In [Hero.tsx](file:///P:/Android_portfolo22/src/components/sections/Hero.tsx):
    - The current `.hero-grid-v2` uses `grid-cols-1` on mobile and `grid-template-columns: minmax(0,1fr) 0.42fr` via `@media (min-width: 900px)`. Confirm this naturally stacks. If the 900px custom media is between 768 and 900 causing a premature 2-column tablet look that breaks the spec (spec says <768px is primary mobile target, 768–1023 is tablet "mostly desktop layout"), add a clamp or change the desktop breakpoint media from 900px to 768px so stacking only occurs strictly below 768px.
    - CTA buttons: Add explicit `w-full md:w-auto` classes on the 3 buttons (View Projects, Download Resume, Contact) so on mobile each is 100% width with flex-col stacking via `flex-col md:flex-row` on the `.hero-actions-row` wrapper. Ensure each button has explicit `h-12` (48px ≥ 44px) — current buttons already have `h-12`, preserve that.
    - Right card on mobile: full width, image 16:9 aspect already exists. Verify image doesn't have a minimum intrinsic width that overflows.
- **Acceptance Criteria Addressed**: AC-5, AC-10
- **Test Requirements**:
  - `rule` TR-8.1: At 375px Hero layout is 1-column (text block above card block). 3 CTA buttons stacked full-width each with `height ≥ 44px`.
  - `rule` TR-8.2: `npm run lint` and `npm run build` pass.

## Task 9: Reflow sections final pass (Skills/Education/Contact/Athletics) + contact social buttons wrap rule
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Skills at [TechnicalSkills.tsx](file:///P:/Android_portfolo22/src/components/sections/TechnicalSkills.tsx): current grid `gap-6 md:grid-cols-2 lg:grid-cols-3`. Already becomes single-col below md (768px) by default in Tailwind (if no explicit `sm:grid-cols-2` is set, which there isn't). Confirm → yes, already `grid-cols-1`. No code change likely needed, just verify tags wrap naturally.
  - Education at [Education.tsx](file:///P:/Android_portfolo22/src/components/sections/Education.tsx): `flex-col md:flex-row`. Below md it stacks. No change needed; verify at 320px.
  - Contact at [Contact.tsx](file:///P:/Android_portfolo22/src/components/sections/Contact.tsx): `grid gap-12 lg:grid-cols-2`. Below 1024px becomes 1-column (info then form). Social buttons (Github/LinkedIn/Email): `flex gap-3`. At 320px this row fits (3 × 44px + 2 × 12px gap = 156px). If any icons need to wrap at 320px, keep as-is since spec explicitly allows wrapping to two rows. Confirm each icon button is 44×44 (current 44×44 h-11 w-11 = 44px). Good.
  - Athletics at [Athletics.tsx](file:///P:/Android_portfolo22/src/components/sections/Athletics.tsx): single card, should flow. Verify no fixed width containers.
  - Form inputs in Contact: ensure `<input>` / `<textarea>` min-height ≥44px on mobile (current `py-3` on inputs — verify it adds up).
- **Acceptance Criteria Addressed**: AC-11, AC-10
- **Test Requirements**:
  - `rule` TR-9.1: Skills/Education/Contact/Athletics all render single-column at 375px with no horizontal overflow. Contact inputs have height ≥44px. Social buttons row fits at 375px, wraps acceptably at 320px if needed.
  - `rule` TR-9.2: `npm run lint` and `npm run build` pass.

## Task 10: Composite verification pass at 6 widths (320/375/414/767/768/1024) + overlap check + build/lint clean
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 1–9 (all)
- **Description**:
  - Manual verification sweep at 6 viewport widths. Record scrollWidth/clientWidth check in console. Record screenshots. Fix any regressions found (treat as sub-fixes within this task, not new top-level tasks unless they're large independent refactors).
  - Run `npm run lint` and `npm run build`; attach output.
  - Final: confirm no section outside Other Projects shows ≥3 distinct accent colors simultaneously. Visually scan each section.
- **Acceptance Criteria Addressed**: AC-9 (rubric), AC-12, AC-5 cross-check, AC-3 cross-check
- **Test Requirements**:
  - `rubric` TR-10.1: Mobile viewport robustness AC-9 scored with evidence. Evidence = screenshots + scrollWidth/clientWidth console.log at each width. Threshold: >= 4.
  - `rule` TR-10.2: `npm run lint` exit code 0, `npm run build` exit code 0. Output captured.
  - `rule` TR-10.3: Accent-color audit: 5 sections (Hero, Omega, Skills, Design, Leadership, Contact) each individually examined and show ≤2 accent colors at once. Evidence = per-section listing.
