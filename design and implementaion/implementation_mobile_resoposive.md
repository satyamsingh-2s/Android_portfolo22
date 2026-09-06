# Implementation Guide — Satyam Singh Portfolio

**Purpose:** This file is the execution plan. It doesn't repeat the design rules or content —
it tells you what to build, in what order, referencing the source-of-truth files below. Read the
referenced section before implementing it; don't guess at values that are already specified.

**Source files (all in project root):**
- `design-final.md` — visual system: colors, type, spacing, motion, components, patterns
- `content-brief.md` — actual copy and section hierarchy for every section
- `project-section-update.md` — Omega carousel + Other Projects redesign (supersedes the
  Projects-related parts of `design-final.md` where they conflict — see that file's own header)
- `mobile-responsive-spec.md` — mobile breakpoint behavior and asset requirements

**Current state:** The desktop site is built and functioning (per most recent screenshots). This
guide covers: (A) the Projects section update, (B) mobile responsiveness, and (C) a few small
inconsistencies between the docs and the live build that should be reconciled either way.

---

## Phase 0 — Reconcile known doc/build mismatches

Before adding new work, fix these two so the docs and the live site agree (pick one side, update
the other — don't leave both versions floating):

1. **Nav fade behavior.** `design-final.md` specifies the nav fades out after Hero and doesn't
   reappear on scroll-up. The live build shows a persistent nav on every section. Decide which is
   correct going forward and update `design-final.md` §7 to match reality, or implement the fade if
   that's still wanted.
2. **Theme toggle position.** `design-final.md` specifies left-side fixed placement. The live build
   shows it top-right, next to the nav. Same deal — pick one, update the doc.

Neither of these blocks the phases below; fix them whenever convenient, but don't ship a doc that
contradicts the build.

---

## Phase 1 — Projects section rebuild

Reference: `project-section-update.md` in full.

1. **Omega carousel.** Replace the current static screenshot area with the 4-frame carousel +
   pagination dots described in §1. Confirm dot-click and swipe both work; verify slide transition
   timing (~250–300ms ease-out).
2. **Other Projects — new row layout.** Replace the current 2×2 card grid with the minimal
   color-coded row layout in §2–3:
   - 5-color palette (blue/green/purple/orange/teal) — this is a documented exception to the
     sitewide 2-accent cap; implement exactly as specified, don't reduce it back to 2.
   - Left accent bar, top-right domain label, title, one-line description, arrow icon, background
     pattern per project (dot-grid / wave / hex-grid / diagonal hairlines / wave).
   - Default state shows no tags; hover (desktop) or tap (mobile) reveals tags + fuller description
     via smooth height expansion — no popup, no card transform.
3. **Verify against `design-final.md` §7** for anything not overridden by
   `project-section-update.md` (icon-in-pill rules for any tags revealed on hover — Core CS stays
   text-only, named tools get logos).

**Acceptance check:** Scroll through Other Projects at desktop width — 5 distinct colors/patterns
visible at once is correct here (documented exception). Confirm no other section of the site shows
more than 2 accent colors simultaneously — if it does, that's a regression, not a feature.

---

## Phase 2 — Mobile responsiveness

Reference: `mobile-responsive-spec.md` in full. Build in this order, easiest-to-verify first:

1. **Sections that just reflow** (spec §7): Other Projects (now single-column after Phase 1),
   Skills, Education, Contact, Athletics. Verify single-column stacking, no overlap, no horizontal
   scroll, adequate tap targets (min 44px) on all interactive elements.
2. **Nav — icon-only mobile version** (spec §1): implement below 768px. Verify it fits in one row
   down to 320px width without wrapping; if the smallest width is tight, drop the least essential
   icon first (Design) rather than wrapping.
3. **Background pattern behavior on mobile** (spec §6): disable or reduce the animated drift below
   768px; verify `prefers-reduced-motion` is still respected regardless of viewport width.
4. **Leadership connector lines** (spec §5): confirm these are SVG/CSS (not baked into an image),
   then hide them below 768px. Stat rows should still display cleanly beneath each card's text.
5. **Design section case study cards** (spec §4): implement the stacked, non-rotated, non-
   overlapping mobile version. Before touching the expanded case-study diagram (the "Android +
   4 boxes" layout), **confirm whether it's a live-coded element or a flat image** — this changes
   the approach:
   - If live-coded: restack the five boxes vertically per spec §4, drop/simplify connector visuals.
   - If a flat image: it needs a new asset from the designer (see Phase 3) — implement a placeholder
     or the single-best-frame fallback in the meantime, per spec's closing note.
6. **Hero "Currently Building" card and Omega 4-panel showcase**: these depend on new assets from
   the designer (Phase 3). Until assets arrive, implement the layout shell (card position, carousel
   mechanics, dot indicators) using the existing desktop images as temporary placeholders — expect
   them to look too small/illegible, that's expected and temporary, not a bug to chase.

**Acceptance check:** Load the site at 375px, 414px, and 768px widths. No horizontal scroll
anywhere. No text overlapping or clipped. Every tap target reachable and legible without pinch-zoom.

---

## Phase 3 — Swap in new mobile assets (blocked on designer delivery)

Reference: `mobile-responsive-spec.md` §8 checklist. When each asset arrives:

1. Hero phone mockup (portrait-recomposed) → swap into the Hero card, verify text legibility at
   actual mobile width (not just "looks fine in Figma").
2. Omega 4-panel images (4 separate files) → wire into the carousel built in Phase 2 step 6,
   replacing the temporary desktop-image placeholders.
3. Design section diagram (only if confirmed to be a flat image in Phase 2 step 5) → replace
   placeholder with the new stacked-composition version.

**Acceptance check:** Re-run the Phase 2 acceptance check after each asset swap — a new image can
still break layout if its dimensions don't match what the container expects.

---

## Phase 4 — Final pass

1. Re-verify every open decision from `design-final.md` §11 was actually resolved (Leadership
   layout option, nav CTA fade behavior) — if either was left ambiguous during build, resolve now
   rather than shipping an inconsistent default.
2. Cross-check all copy against `content-brief.md` one more time — confirm no placeholder text,
   invented case-study content, or unconfirmed claims (see content-brief §3.5 exclusions) made it
   into the final build.
3. Run through the site on an actual phone if possible, not just browser dev-tools resize — touch
   targets, swipe gestures, and font rendering can behave differently than the simulator suggests.
4. Confirm all metadata (OG tags, title, description) still renders correctly — this was specified
   earlier in the project and should not be lost during the Projects/mobile rework.

---

## Notes for the AI tool executing this

- Where two files disagree, `project-section-update.md` and `mobile-responsive-spec.md` win over
  `design-final.md` for anything they explicitly cover — they're later, more specific revisions.
  For everything else, `design-final.md` is the base truth.
- Don't invent values that aren't specified (colors, timings, breakpoints) — every number in the
  referenced files was chosen deliberately. If something genuinely isn't covered, flag it rather
  than guessing a "reasonable-looking" value.
- Ship in phases as ordered above, not all at once — each phase has its own acceptance check for a
  reason.
