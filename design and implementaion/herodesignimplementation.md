# Hero Design Implementation Guide

## 1. Purpose

Implement the portfolio hero exactly according to the approved hero design.

This document is an **execution guide** for the AI/code tool. It defines how the hero should be structured, sized, styled, spaced, and animated.

The goal is not to redesign the hero.

Do not add new visual concepts. Do not reinterpret the hierarchy. Implement the structure below faithfully.

---

# 2. Core Layout

The desktop hero has one main horizontal layout:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              TOP NAVIGATION                                  │
│                                                                              │
│  ┌──────────────────────────────┐   ┌─────────────────────────────────────┐ │
│  │                              │   │                                     │ │
│  │        IDENTITY              │   │        INFORMATION RAIL             │ │
│  │          ~60%                │   │             ~40%                    │ │
│  │                              │   │                                     │ │
│  │  KOLKATA, INDIA              │   │       CURRENTLY BUILDING             │ │
│  │                              │   │       ~70% OF RAIL HEIGHT           │ │
│  │  SATYAM SINGH                │   │                                     │ │
│  │  Android Developer           │   │       [ IMAGE PLACEHOLDER ]          │ │
│  │                              │   │                                     │ │
│  │  Description                 │   │       CURRENT FOCUS                  │ │
│  │                              │   │       Animated live status bar      │ │
│  │  Actions                     │   │                                     │ │
│  │                              │   │─────────────────────────────────────│ │
│  │                              │   │       CURRENT STATUS                │ │
│  │                              │   │       ~30% OF RAIL HEIGHT           │ │
│  │                              │   │       AVAILABLE / OPEN TO WORK      │ │
│  └──────────────────────────────┘   └─────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Required ratios

Desktop:

- Left identity area: approximately **60%**
- Right information rail: approximately **40%**
- Upper rail / Currently Building: approximately **70% of rail height**
- Lower rail / Current Status: approximately **30% of rail height**

Both the identity area and the complete right rail should fit inside approximately the same hero content height.

Do not make the hero significantly taller just to fit the rail.

---

# 3. DOM / Component Structure

Use this hierarchy:

```text
HeroSection
├── Navigation
└── HeroContent
    ├── HeroIdentity
    │   ├── LocationLabel
    │   ├── Name
    │   ├── Role
    │   ├── Description
    │   └── HeroActions
    │       ├── ViewProjectsButton
    │       ├── ResumeButton
    │       └── ContactButton
    │
    └── InfoRail
        ├── CurrentlyBuilding
        │   ├── RailHeader
        │   │   ├── Label
        │   │   └── StatusDot
        │   ├── ProjectImagePlaceholder
        │   └── LiveWorkBlock
        │       ├── CurrentFocusLabel
        │       ├── FocusTitle
        │       └── AnimatedStatusBar
        │
        └── CurrentStatus
            ├── RailHeader
            │   ├── Label
            │   └── StatusDot
            └── AvailabilityBlock
                ├── AvailabilityText
                └── OpenToWork
```

Do not create multiple unrelated floating cards.

The right side must read as **one connected information rail**, with one outer visual boundary and an internal divider.

---

# 4. Hero Container

## Desktop

Use a wide centered content container consistent with the rest of the portfolio.

Recommended behavior:

```css
.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(420px, 2fr);
  align-items: stretch;
  gap: clamp(48px, 5vw, 96px);
}
```

This expresses the intended ~60/40 relationship.

Do not force exact fixed pixel widths.

The layout must remain balanced on wide screens.

## Vertical alignment

The identity and right rail should occupy the same general visual zone.

Do not place the rail much higher or lower than the name.

The rail should feel attached to the identity composition, not like a separate dashboard placed beside it.

---

# 5. Left Identity Area

## Content order

Use exactly this hierarchy:

```text
KOLKATA, INDIA

SATYAM SINGH

ANDROID DEVELOPER

Building AI-assisted productivity tools
with Kotlin & Jetpack Compose.

[ VIEW PROJECTS ↓ ]
[ DOWNLOAD RESUME ↧ ] [ CONTACT ✉ ]
```

### Name rule — critical

`SATYAM SINGH` must stay on **one line on desktop**.

Never implement:

```text
SATYAM
SINGH
```

Instead:

```text
SATYAM SINGH
```

Before allowing the name to wrap:

1. reduce the name size responsively,
2. slightly reduce tracking if necessary,
3. ensure the left column has enough available width.

Only on genuinely narrow mobile screens may wrapping occur if a single line becomes impossible without destroying readability.

## Hierarchy

The name is the strongest visual element in the entire hero.

Order of visual importance:

1. `SATYAM SINGH`
2. `Android Developer`
3. Current Focus title in the right rail
4. Description
5. Primary action
6. Metadata labels and secondary controls

Do not let the rail headers compete with the name.

---

# 6. Right Information Rail

## General structure

Use one connected outer rail.

Conceptually:

```text
┌──────────────────────────────────────┐
│ CURRENTLY BUILDING               ●   │
│                                      │
│      [ PROJECT IMAGE PLACEHOLDER ]   │
│                                      │
│      CURRENT FOCUS                   │
│      AI-ASSISTED PROJECT             │
│      PLANNING WORKFLOWS              │
│      ███████ moving ███████████      │
│                                      │
├──────────────────────────────────────┤
│ CURRENT STATUS                   ●   │
│                                      │
│ AVAILABLE FOR                        │
│ ANDROID OPPORTUNITIES                │
│                                      │
│ OPEN TO WORK                     ●   │
└──────────────────────────────────────┘
```

### Important

Do not turn each subsection into a separate large card with a large gap between them.

Use:

- one connected rail,
- subtle outer border,
- thin internal divider,
- generous whitespace.

The result should feel minimal and structured.

---

# 7. Rail Proportions

The rail uses approximately:

```text
CURRENTLY BUILDING
70%
██████████████████████████████████

CURRENT STATUS
30%
███████████████
```

This is a vertical composition.

Do not calculate these as separate arbitrary cards.

The upper section is visually larger because it contains:

- header,
- image placeholder,
- current focus,
- animated status bar.

The lower section is intentionally compact because it communicates only availability.

---

# 8. Rail Header Implementation

Both sections use the same header language:

```text
CURRENTLY BUILDING                         ●
```

and:

```text
CURRENT STATUS                             ●
```

## Header rules

Headers must be:

- small,
- uppercase,
- restrained,
- technical/editorial,
- secondary in hierarchy.

They are metadata labels, not large section headings.

Use small font sizing relative to the hero name and focus title.

Recommended visual behavior:

```css
.rail-label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

Adapt the exact values to the existing portfolio typography system rather than introducing a conflicting font style.

Use a small accent dot aligned to the right.

Do not use large colored header backgrounds.

Do not use badges around the header text.

---

# 9. Currently Building Section

## Internal order

```text
CURRENTLY BUILDING                    ●


[ PROJECT IMAGE PLACEHOLDER ]


CURRENT FOCUS

AI-ASSISTED PROJECT
PLANNING WORKFLOWS

██████████ moving segment ███████████
```

## Spacing

This section needs more blank space than the earlier version.

Do not compress:

- header directly against image,
- image directly against focus,
- focus directly against status bar.

Use deliberate vertical rhythm.

Suggested relationship:

```text
Header
↓ medium whitespace
Image Placeholder
↓ medium/large whitespace
Current Focus
↓ small whitespace
Focus Title
↓ medium whitespace
Animated Status Bar
↓ remaining breathing room
Divider
```

Empty space is intentional.

Do not fill unused space with:

- extra statistics,
- extra Omega labels,
- fake percentages,
- tech badges,
- project descriptions,
- decorative widgets.

---

# 10. Project Image Placeholder

There is currently **no real Omega image asset** available.

Therefore implement a placeholder only.

Do not:

- generate an Omega screenshot,
- simulate a dashboard UI,
- invent an app interface,
- add a fake image,
- render project statistics inside it.

The placeholder should communicate reserved future media space.

Structure:

```text
┌──────────────────────────────────────┐
│                                      │
│                                      │
│        PROJECT IMAGE PLACEHOLDER     │
│                                      │
│        [ FUTURE IMAGE AREA ]         │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

## Placeholder styling

Keep it visually quiet:

- thin border,
- subtle background separation if needed,
- no heavy shadow,
- no strong decoration,
- no oversized icon.

The placeholder must not become the strongest element in the rail.

When a real project image is added later, it should replace this area without requiring structural changes.

---

# 11. Current Focus Block

The Current Focus and animated bar are one connected live-work unit.

Use:

```text
CURRENT FOCUS

AI-ASSISTED PROJECT
PLANNING WORKFLOWS

████████████████████ moving ███████████
```

Do not place unrelated labels between the title and the bar.

Specifically do not add:

- `FEATURE / AI-ASSISTED PLANNING`
- `IN PROGRESS`
- `ACTIVE DEVELOPMENT`
- percentages
- fake completion values
- extra progress descriptions

The focus title already explains the current work.

The animation communicates activity.

Do not repeat the same message in another form.

## Focus title

The focus title is uppercase or strongly editorial, matching the approved visual language.

It should be visually stronger than:

- rail headers,
- small metadata,
- status dots.

But it should remain weaker than `SATYAM SINGH`.

---

# 12. Animated Status Bar

## Purpose

This bar is **not a progress indicator**.

It must not imply:

- 72% complete,
- 50% complete,
- estimated completion,
- fixed progress.

It communicates only:

> work is currently active.

The motion should feel inspired by a Windows file-copy/loading operation.

## Visual structure

Use one long horizontal track containing repeated segments.

Example:

```text
██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██
                ↑
          moving highlight
```

A brighter highlighted group moves continuously across the track.

## Implementation concept

Use:

- static base segments,
- one or more adjacent highlighted segments,
- continuous horizontal movement,
- seamless looping.

Do not animate the entire rail.

Only the highlighted segment should create the feeling of live activity.

## Animation rules

The movement should be:

- subtle,
- smooth,
- linear or nearly linear,
- continuous,
- looped,
- non-distracting.

Avoid:

- bouncing,
- pulsing the entire bar,
- aggressive glow,
- random jumps,
- fast flashing.

Recommended duration:

```text
approximately 2.5–4 seconds per cycle
```

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  /* Stop the moving segment or reduce to a static highlight */
}
```

The bar should still look intentional when animation is disabled.

---

# 13. Current Status Section

This is the compact lower ~30% area.

Use exactly this information:

```text
CURRENT STATUS                         ●


AVAILABLE FOR
ANDROID OPPORTUNITIES


OPEN TO WORK                           ●
```

Its only job is to communicate availability.

Do not add:

- location,
- timezone,
- company name,
- extra description,
- CTA buttons,
- availability dates,
- social links,
- unnecessary metadata.

## Internal hierarchy

```text
Small metadata header
↓ whitespace
Availability message
↓ whitespace
Open-to-work status row
```

The lower area should feel calm and spacious despite being compact.

Do not shrink all spacing just because this section is only 30%.

---

# 14. Borders and Geometry

The portfolio already uses a restrained technical visual language.

Use:

- thin borders,
- clean rectangular geometry,
- subtle rounded corners consistent with the existing site,
- precise alignment.

Avoid:

- excessive border layers,
- heavy card stacking,
- large corner radii everywhere,
- decorative frames inside frames.

The right rail should have:

```text
one outer boundary
+
one internal horizontal divider
```

The image placeholder may have its own thin boundary.

Do not introduce additional unnecessary containers.

---

# 15. Color Rules

Follow the existing portfolio color system.

The hero should remain primarily dark and neutral.

Accent colors should be restrained.

Recommended semantic use:

- Primary accent: role, active elements, moving status highlight.
- Green/live accent: open-to-work or availability status.
- Neutral text: descriptions and secondary metadata.
- White/light text: primary identity and important headings.

Do not introduce gradients.

Do not use rainbow decoration in the hero.

Do not make every element blue.

The name and whitespace must remain visually dominant.

---

# 16. Typography Rules

Use the typography system already defined for the portfolio.

Hierarchy should approximately follow:

```text
SATYAM SINGH
largest / strongest

Android Developer
large accent role

Current Focus title
medium-large

Description and availability message
body / readable

Rail labels
smallest metadata
```

## Critical constraints

- `SATYAM SINGH` remains on one line on desktop.
- `CURRENTLY BUILDING` and `CURRENT STATUS` must be significantly smaller than the focus title.
- Small rail labels should not compete with major content.
- Do not make all headings equally large.
- Use whitespace rather than oversized typography to create importance.

---

# 17. Blank Space Rules

Whitespace is a required design element.

The earlier version felt too dense because:

- rail labels were too large,
- sections felt like dashboard cards,
- content occupied too much of the available area.

Correct implementation:

- reduce rail header scale,
- add breathing room around content,
- keep the image placeholder modest,
- preserve empty areas,
- avoid filling every part of the rail.

The hero should feel:

- focused,
- premium,
- intentional,
- calm,
- technical.

It should not feel like:

- a dashboard,
- a resume sidebar,
- a SaaS analytics panel.

---

# 18. Navigation

Keep the existing centered/floating portfolio navigation style.

Expected items:

```text
Satyam | Projects | Skills | Design | Leadership | Contact | Let's talk
```

Do not redesign the navigation while implementing this hero.

The hero implementation must complement the existing navigation.

---

# 19. Background

Preserve the existing dark portfolio background direction.

The background should remain subtle.

If the site already uses faint technical contour/line decoration, preserve it at very low contrast.

Do not add strong patterns behind the hero.

The background must never reduce readability or compete with:

- the name,
- the right rail,
- action buttons.

---

# 20. Desktop Implementation Checklist

Before considering the hero complete, verify:

### Layout
- [ ] Two-column desktop composition.
- [ ] Left approximately 60%.
- [ ] Right approximately 40%.
- [ ] Rail fits within the same general hero height.
- [ ] Upper rail approximately 70%.
- [ ] Lower rail approximately 30%.

### Identity
- [ ] `SATYAM SINGH` is on one line.
- [ ] Name is the strongest visual element.
- [ ] Role is clearly secondary to the name.
- [ ] Existing actions remain visible.

### Right Rail
- [ ] One connected rail.
- [ ] No visible large gap creating two unrelated cards.
- [ ] CURRENTLY BUILDING label is small.
- [ ] CURRENT STATUS label is small.
- [ ] Generous whitespace exists.
- [ ] Thin internal divider exists.

### Project Area
- [ ] Uses a placeholder only.
- [ ] No fake Omega screenshot is generated.
- [ ] Placeholder can later be replaced with a real image.

### Live Work
- [ ] Current Focus title is present.
- [ ] Exactly one animated status bar exists.
- [ ] Bar is not numerical progress.
- [ ] Moving segment loops smoothly.
- [ ] No percentage is shown.
- [ ] No `IN PROGRESS` text is shown.

### Availability
- [ ] Shows Android opportunities.
- [ ] Shows OPEN TO WORK.
- [ ] Uses a live/status indicator.
- [ ] Contains no extra metadata.

---

# 21. Responsive Behavior

## Tablet

As width decreases:

- preserve the identity hierarchy,
- reduce horizontal gap before collapsing,
- scale the name carefully while preserving one line where practical,
- allow the right rail to remain readable.

Do not compress the rail until text becomes crowded.

## Mobile

Stack the layout:

```text
Navigation

Identity
├── Location
├── SATYAM SINGH
├── Role
├── Description
└── Actions

Information Rail
├── Currently Building
│   ├── Image Placeholder
│   └── Current Focus + Status Bar
└── Current Status
    └── Availability
```

Identity comes first.

The information rail follows.

Preserve the content hierarchy.

Preserve the conceptual 70/30 relationship where practical, but do not force fixed heights that cause clipping or excessive empty space on mobile.

The animated status bar should use the available container width.

---

# 22. Do Not Do This

The AI/code tool must not:

- redesign the hero into a generic dashboard,
- split the name onto two lines on desktop,
- create a fake Omega UI screenshot,
- use an actual Omega image when none has been supplied,
- add fake progress percentages,
- add multiple status bars,
- add `IN PROGRESS`,
- add `ACTIVE DEVELOPMENT`,
- add redundant feature labels,
- enlarge rail headers to heading scale,
- crowd the rail,
- fill blank space with unnecessary widgets,
- add gradients,
- add glassmorphism,
- add heavy shadows,
- add excessive rounded cards,
- add new statistics,
- add tech stacks inside the rail,
- add extra buttons inside Current Status,
- add numbering such as `01 / 02`,
- change the existing site-wide visual system.

---

# 23. Final Visual Intent

The viewer should understand the hero in this order:

```text
WHO IS THIS?
→ SATYAM SINGH

WHAT DOES HE DO?
→ ANDROID DEVELOPER

WHAT IS HE WORKING ON RIGHT NOW?
→ AI-ASSISTED PROJECT PLANNING WORKFLOWS
→ live animated status bar

IS HE AVAILABLE?
→ AVAILABLE FOR ANDROID OPPORTUNITIES
→ OPEN TO WORK
```

The final composition should feel like:

> **A strong personal identity on the left, with a quiet live snapshot of current work and availability on the right.**

The right rail provides context.

The name remains the hero.
