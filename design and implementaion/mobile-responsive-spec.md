# Mobile Responsiveness Spec

**Scope:** Adapts the finished desktop site (per `design-final.md`, `project-section-update.md`,
`content-brief.md`) for mobile. Where a section can reflow cleanly, it does. Where the desktop
version depends on flat images or spatial tricks that don't survive a narrow viewport, this file
specifies the mobile-native alternative rather than a naive shrink.

**Breakpoints:**
- Desktop: ≥1024px (existing behavior, unchanged)
- Tablet: 768–1023px (mostly desktop layout, some grid collapses — see per-section notes)
- Mobile: <768px (primary target of this spec)

---

## 1. Navigation — icon-only collapsed nav

- Below 768px, the full-width nav bar (Satyam / Projects / Skills / Design / Leadership / Contact /
  Let's talk) is replaced entirely — no hamburger menu, no slide-out drawer.
- Mobile nav shows: logo/name mark (small) + a compact row of icons representing each section
  (e.g. a simple glyph per section) + the theme toggle. No text labels visible by default.
- Tapping a section icon smooth-scrolls to that section (same behavior as desktop nav clicks).
- The "Let's talk" CTA becomes its own small icon-button (e.g. a chat/arrow icon) rather than a
  labeled pill, consistent with the icon-only approach — tapping it scrolls to Contact.
- Fits in a single row at all mobile widths down to 375px. If the icon row is too wide at the
  smallest supported width (320px), drop the least essential icon (e.g. Design) before wrapping to
  a second row — never wrap.
- No text tooltip is required on tap (mobile has no hover), but a brief label can appear beneath the
  icon row on first visit only, if that helps first-time orientation — optional, not required.

---

## 2. Hero — "Currently Building" card

- Card stacks below the name/subline/CTA buttons on mobile (single column), full-width.
- **Needs a new asset from your designer.** The current phone-mockup image was composed for a
  square-ish desktop card; scaled down to mobile width the text inside the image (Structure/Focus/
  Execute, timer, sidebar labels) will be illegible. Ask for a version recomposed for a **portrait,
  narrower aspect ratio** (roughly matching full mobile-width card proportions) with larger internal
  type, or a simplified crop showing just the phone screen without the surrounding dark canvas.
- The three CTA buttons (View Projects / Download Resume / Contact) stack full-width, stacked
  vertically, generous tap targets (min 44px height).

---

## 3. Omega flagship — 4-panel showcase

The current desktop showcase (New Workspace / Timer / Unplanned Projects / History side-by-side)
is a set of flat images and cannot reflow — there's no CSS fix for four fixed-width images that
need to sit side by side.

- **Mobile treatment: swipeable one-at-a-time carousel**, matching the pagination-dot pattern
  already specified for the Omega screenshot strip in `project-section-update.md` §1. Swipe
  left/right to move between the four panels; small dot indicators below show position.
- **Needs new assets from your designer:** each of the four panels (New Workspace, Timer,
  Unplanned Projects, History) as an individual image cropped/composed for a single mobile-width
  card, rather than one wide composite image. If the designer can provide these as 4 separate files
  at a consistent portrait aspect ratio, the carousel can swap between them cleanly.
- Until new assets arrive, do not ship the existing wide composite scaled down — it will be
  illegible. Placeholder (blank state or "optimized for larger screens" note) is preferable to a
  broken/unreadable image in the interim.

---

## 4. Design section — case study cards

The overlapping, rotated, color-bordered cards (orange/blue/purple, with floating corner circles)
are a spatial effect that depends on extra desktop width to overlap without colliding.

- **Mobile treatment: same three cards, same click-to-expand interaction, no overlap and no
  rotation.** Stack them vertically, full-width, each in its own clean rectangular block —
  colored top border or left border (reusing the project-row accent-bar pattern from
  `project-section-update.md`) instead of the rotated/overlapping desktop treatment.
  Floating corner circles are dropped on mobile — they're decorative and don't carry information.
- **Expanded case-study view** (the "Android surrounded by Web / Systems / Leadership / Core CS"
  diagram, e.g. Case Study 01): the four supporting boxes currently sit in a fixed spatial
  arrangement around the central "Android" box. On mobile, stack all five boxes vertically in a
  single column: Android (primary) first, then the four supporting boxes beneath it in any
  consistent order. The connecting line/arrow visuals can be dropped or simplified to simple
  vertical connectors between stacked boxes.
- This diagram appears to be built from live HTML/CSS elements (colored boxes + text), not a flat
  image — confirm with your developer; if so, this is a layout-only change with no new asset
  needed. If it turns out to be a flattened image, treat it the same as the Omega panels above and
  flag for a new asset.
- The numbered step list (01 Problem / 02 Thinking / 03 Design Decision / 04 Result) beside the
  diagram stacks beneath it on mobile, full-width, unchanged in content.

---

## 5. Leadership — decorative connector lines

- The thin lines/dots visually linking bullet points to the stat numbers below (Dakshh card) are a
  desktop-width decoration and carry no information on their own.
- **Drop these entirely on mobile.** Each card's bullet list and stat row stack in the same vertical
  order, just without the connecting line graphics. No new asset needed — this is a CSS/visibility
  change only, assuming the lines are SVG/CSS rather than baked into an image.
- Stat numbers (₹10–12L / 120 / 9 yrs, and 200–300) display as a clean row or wrap to two rows under
  each card's text, full-width.

---

## 6. Background pattern & per-card patterns

- The animated topographic background texture continues to render on mobile but:
  - Reduce animation intensity or disable the drift animation entirely below 768px, defaulting to a
    static frame — mobile GPUs/battery budgets don't need a continuously animating full-viewport
    background, and it's not essential to the experience.
  - Always fully respects `prefers-reduced-motion` regardless of viewport, per existing rule.
- Per-card patterns (Other Projects, Leadership) keep their assigned motif and color, but opacity/
  coverage values tuned for wide desktop cards need independent verification at full-width mobile
  card proportions — don't assume the same percentages read the same on a narrower, differently-
  proportioned card. Check each one visually rather than porting numbers directly.

---

## 7. Sections that reflow with no special handling needed

- **Other Projects grid** → single column, full-width rows. Tap-to-expand replaces hover, per
  `project-section-update.md` §3 (already specified).
- **Skills grid** → single column stack of category blocks, tags wrap naturally within each block.
- **Education** → already a simple text block; no change needed beyond standard single-column
  reflow.
- **Contact** → info block and form stack vertically, full-width; icon buttons (GitHub/LinkedIn/
  Email) remain a horizontal row if they fit, or wrap to two rows if needed at the smallest widths.
- **Athletics card** → single card, full-width, unchanged content.

---

## 8. New assets needed from your designer — summary checklist

- [ ] Hero "Currently Building" phone mockup — recomposed for portrait/narrow aspect ratio with
      larger internal type, or a simplified crop of just the phone screen.
- [ ] Omega 4-panel showcase — 4 separate images (New Workspace, Timer, Unplanned Projects,
      History), each composed for a single mobile-width card rather than one wide composite.
- [ ] **Confirm with developer:** is the Design section's "Android + 4 supporting boxes" diagram a
      live-coded element or a flat image? If a flat image, it needs the same treatment as above —
      a version designed to stack vertically rather than scaled down from the wide desktop layout.

Until these arrive, ship the rest of the mobile adaptation with a graceful placeholder or a
static single-best-frame image in place of the missing mobile-specific assets — never a scaled-down
copy of the desktop original that will be too small to read.
