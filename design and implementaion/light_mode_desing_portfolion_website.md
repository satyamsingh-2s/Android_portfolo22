# Light Mode Portfolio Website — Design Specification

## 1. Purpose

This document defines the Light Mode visual system for the portfolio website.

The Light Mode is **not a separate design**. It is the same portfolio visual language translated into a light environment.

The central theme rule is:

```text
DARK MODE
Main Portfolio → Dark
Design Section → Light

LIGHT MODE
Main Portfolio → Light
Design Section → Dark
```

The layout, hierarchy, typography, spacing, component geometry, project accents, and interaction language remain consistent between themes.

The theme switch should feel like changing the visual environment of the same portfolio — not switching to another website.

---

# 2. Core Visual Principle

The Light Mode should feel:

- clean
- technical
- editorial
- warm
- minimal
- professional
- spacious
- precise

It must NOT feel:

- sterile white
- generic SaaS
- corporate dashboard
- glassmorphism-heavy
- overly colorful
- flat
- shadow-heavy

The strongest principle remains:

> Large typography + generous whitespace + restrained technical detail.

---

# 3. Global Light Mode Palette

## 3.1 Page Background

Primary background:

```text
#F5F4F1
```

This is a warm off-white rather than pure white.

Use for:

- Hero background
- Skills background
- Projects background
- Education background
- Leadership background
- Contact background
- general dark-theme-equivalent sections

CSS token:

```css
--light-bg: #F5F4F1;
```

Do NOT use `#FFFFFF` as the global page background.

---

# 4. Light Mode Surface System

## Primary Card Surface

```text
#ECEBE8
```

CSS:

```css
--light-surface: #ECEBE8;
```

Used for:

- project cards
- skill cards
- leadership cards
- contact form
- hero supporting panel
- Omega card

The card should be only slightly darker than the page.

---

## Nested Surface

```text
#E7E6E3
```

CSS:

```css
--light-surface-soft: #E7E6E3;
```

Used for:

- image containers
- input fields
- nested media frames
- small controls
- inset UI

The relationship is:

```text
Page
#F5F4F1
    ↓
Card
#ECEBE8
    ↓
Nested
#E7E6E3
```

This creates depth without requiring strong shadows.

---

# 5. Light Mode Typography

## Primary Text

```text
#171719
```

CSS:

```css
--light-text-primary: #171719;
```

Used for:

- Satyam Singh
- section headings
- project titles
- card titles
- important information

This is near-black, not absolute black.

---

## Secondary Text

```text
#555457
```

CSS:

```css
--light-text-secondary: #555457;
```

Used for:

- descriptions
- supporting copy
- project descriptions
- education details
- contact text

---

## Muted Text

```text
#858287
```

CSS:

```css
--light-text-muted: #858287;
```

Used for:

- section eyebrows
- technical metadata
- categories
- dates
- labels
- inactive supporting information

Muted content must remain visibly secondary.

---

# 6. Borders

Primary:

```css
--light-border: rgba(20, 20, 22, 0.12);
```

Soft:

```css
--light-border-soft: rgba(20, 20, 22, 0.07);
```

Borders should be subtle.

Avoid strong black outlines around every component.

The visual depth should come primarily from:

```text
surface difference
+
border
+
spacing
```

rather than heavy shadows.

---

# 7. Blue Accent

The portfolio's existing blue identity remains.

Primary:

```text
#6F95FF
```

CSS:

```css
--accent-blue: #6F95FF;
```

Hover/deeper interaction:

```text
#527CF0
```

CSS:

```css
--accent-blue-hover: #527CF0;
```

Use blue for:

- Android Developer
- primary CTA
- links
- active navigation
- technology pills
- progress fill
- selected elements
- active indicators
- project focus

Do not replace the blue with a completely different light-theme color.

Theme continuity is more important.

---

# 8. Status Green

Dark Mode uses a bright green.

For Light Mode:

```text
#18B981
```

CSS:

```css
--status-green: #18B981;
```

Use for:

- Open to Work
- availability indicator
- active status

Green should remain a small semantic signal.

---

# 9. Project Accent Colors

Retain the existing project-specific accent language.

Allowed accents include:

```text
Blue
Green
Purple
Orange
Pink
Cyan
Yellow
```

These remain associated with projects and design case studies.

Do not recolor every project to blue.

---

# 10. Background Geometry

The current dark website contains very subtle large curved lines.

Light Mode should retain the same geometry.

Change only its treatment:

```text
Dark Mode:
white geometry at ~3–8% opacity

Light Mode:
dark geometry at ~4–5% opacity
```

Recommended:

```css
color: rgba(20,20,22,0.045);
```

The curves should be barely visible.

At first glance the viewer should see:

```text
warm background
```

not:

```text
pattern
```

---

# 11. Hero Section

The Hero keeps the existing structural layout.

Desktop:

```text
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  LEFT — DOMINANT                     RIGHT — SUPPORTING    │
│                                                            │
│  KOLKATA, INDIA                         CURRENTLY BUILDING │
│                                                            │
│  SATYAM SINGH                           [PROJECT IMAGE]    │
│                                                            │
│  Android Developer                      CURRENT FOCUS      │
│                                                            │
│  Description                            70% progress       │
│                                                            │
│  [View Projects] [Resume] [Contact]     Current Status     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

The left side remains visually dominant.

Recommended relationship:

```text
Left: 68–70%
Right: 26–30%
```

---

# 12. Hero Name

Exact text:

```text
Satyam Singh
```

Desktop requirement:

```text
ONE LINE
```

Light Mode:

```text
#171719
```

The name must remain the strongest visual element.

---

# 13. Hero Role

Exact text:

```text
Android Developer
```

Color:

```text
#6F95FF
```

It remains a strong secondary visual anchor.

---

# 14. Hero Description

Current text:

```text
Building AI-assisted productivity tools
with Kotlin & Jetpack Compose.
```

Color:

```text
#555457
```

Keep approximately two lines on desktop.

Do not make it full-width.

---

# 15. Hero Actions

Order:

```text
View Projects
Download Resume
Contact
```

All three remain on the same horizontal line on desktop.

Primary:

```text
Blue fill
White text
```

Secondary:

```text
Light surface
Dark text
Subtle border
```

The button hierarchy remains identical to Dark Mode.

---

# 16. Hero Right Panel

The supporting panel should remain compact.

Light Mode:

```text
Page background
#F5F4F1

Panel
#ECEBE8

Nested media
#E7E6E3
```

Structure:

```text
CURRENTLY BUILDING                    ●

[ PROJECT IMAGE ]

CURRENTLY BUILDING

FEATURE - TASK ORGANISER

[==================------]
        70%

────────────────────────────

CURRENT STATUS                 ●

Intern at SunsysTechsol pvt. Ltd.

OPEN TO WORK ●
```

The right panel must not overpower the Hero name.

---

# 17. Hero Progress Bar

The progress indicator remains:

```text
70% filled
30% unfilled
```

It must be a single continuous bar.

Do NOT use segmented blocks.

Dark Mode:

```text
blue fill
dark track
```

Light Mode:

```text
blue fill
light-gray track
```

Suggested track:

```text
#D8D8D5
```

The 70% value remains fixed.

Animation is a subtle moving highlight/sheen across the filled region.

---

# 18. Hero Right-Panel Animation

Animation remains restrained.

Allowed:

- subtle panel entrance
- soft status glow
- progress sheen
- small indicator movement
- subtle hover response

Avoid:

- bouncing
- excessive scaling
- large transforms
- fast pulsing
- distracting perpetual motion

The right panel should feel alive but secondary.

---

# 19. Navigation

The floating navigation remains structurally identical.

Light Mode:

```text
Background:
rgba(245,244,241,0.88)

Border:
rgba(20,20,22,0.10)
```

Inactive links:

```text
#555457
```

Brand/active:

```text
#171719
```

Primary CTA:

```text
#6F95FF
```

White text remains on the blue CTA.

The theme switch remains part of the navigation system.

---

# 20. Skills Section

Structure remains:

```text
TECHNICAL SKILLS

What I work with

┌──────────┐ ┌──────────┐ ┌──────────┐
│ Android  │ │ Web      │ │ Systems  │
└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ AI       │ │ Core CS  │ │Languages │
└──────────┘ └──────────┘ └──────────┘

┌──────────┐
│ Tools    │
└──────────┘
```

Cards use:

```text
#ECEBE8
```

Text:

```text
#171719
```

Description:

```text
#555457
```

---

# 21. Skill Pills

Light Mode pills:

```text
background: #E7E6E3
text: #527CF0
```

Optional subtle border:

```text
rgba(20,20,22,0.06)
```

Keep pills compact.

They are metadata, not primary content.

---

# 22. Other Projects

Keep the existing horizontal project-list design.

Structure:

```text
OTHER PROJECTS

A range of experiments across Android, systems, web and AI.

────────────────────────────────────────
Screenshot
...
────────────────────────────────────────
Secura
...
────────────────────────────────────────
Macer
...
```

Project rows use:

- light background
- subtle borders
- dark typography
- colored left rail
- arrow action

---

# 23. Project Accent Rails

Retain the existing project-specific accents.

Example:

```text
Screenshot → Blue
Secura → Green
Macer → Purple
Portfolio → Orange
AI Financial Assistant → Cyan/Green
```

The accent rail remains narrow.

It should not become a thick decorative stripe.

---

# 24. Omega Flagship Section

Omega remains the most substantial project presentation.

Light Mode:

```text
FLAGSHIP PROJECT

┌───────────────────────────────────────────────────────┐
│ Omega    Ongoing                                      │
│ AI-Assisted Productivity & Planning Platform          │
│                                                       │
│ technology pills                                     │
│                                                       │
│ description                                          │
│                                                       │
│ 13+        5          1                               │
│                                                       │
│ View on GitHub    Visit Website                      │
│                                                       │
│ [large Omega visual]                                 │
└───────────────────────────────────────────────────────┘
```

Card:

```text
#ECEBE8
```

Typography:

```text
#171719
```

Background geometry:

```text
rgba(20,20,22,0.045)
```

---

# 25. Leadership

Leadership retains the same asymmetric card hierarchy.

Large:

```text
Finance Head & Operations Lead
```

Smaller:

```text
Operations Head
```

Light cards:

```text
#ECEBE8
```

Technical decorative geometry becomes subtle dark lines.

Do not remove the diagrams.

Simply invert their visual treatment.

---

# 26. Education

Education remains intentionally open rather than becoming another card.

Structure:

```text
EDUCATION

B.Tech, Electrical Engineering                 8.41
Heritage Institute of Technology, Kolkata
2023–2027

Relevant coursework...
```

Primary text:

```text
#171719
```

Secondary:

```text
#555457
```

GPA remains visually prominent.

---

# 27. Contact

The contact section remains split.

Left:

```text
CONTACT

Let's talk

description

email
phone
location

social buttons
```

Right:

```text
Name
input

Email
input

Message
textarea

Send message
```

The form surface uses:

```text
#ECEBE8
```

Inputs use:

```text
#E7E6E3
```

Primary button remains blue.

---

# 28. Social Buttons

Light Mode:

```text
background: #ECEBE8
border: rgba(20,20,22,0.10)
icon: #555457
```

Hover:

```text
border becomes slightly stronger
icon becomes #171719
```

Do not use full-color social brand icons.

---

# 29. Light Mode Design Section — Inversion

This is the defining Light Mode feature.

Dark Mode:

```text
Main Portfolio
    ↓
Dark

Design Section
    ↓
Cream / Light
```

Light Mode:

```text
Main Portfolio
    ↓
Light

Design Section
    ↓
Dark
```

The Design section should feel like a dark editorial design laboratory.

---

# 30. Dark Design Section Palette

Background:

```text
#0A0A0B
```

Card:

```text
#141416
```

Primary text:

```text
#F4F3F1
```

Secondary:

```text
#A6A4A5
```

Muted:

```text
#68666A
```

Border:

```text
rgba(255,255,255,0.12)
```

---

# 31. Dark Design Section Dot Grid

The existing cream Design section has a subtle dot grid.

In Light Mode, invert the dot treatment:

```text
dark background
+
very subtle light dots
```

Keep the dots low contrast.

They should support the physical design-board feeling without becoming a star field.

---

# 32. Design Heading

Keep the same content and visual concept:

```text
Designing the experience,
not just the interface.
```

Use:

```text
off-white primary text
orange italic emphasis
```

The word:

```text
interface.
```

remains orange and italic.

---

# 33. Design Intro

Keep the editorial two-column header:

```text
LEFT                              RIGHT

Designing the experience...       explanatory paragraph
```

Left:

```text
large off-white typography
```

Right:

```text
muted gray text
```

---

# 34. Design Controls

The existing controls remain but become dark-theme controls.

Example:

```text
My Certificate
My Design 3
```

Use:

```text
dark surface
subtle white border
off-white text
```

Do not use blue unless interaction requires it.

---

# 35. Dark Design Case Study Cards

The current cream case-study cards invert to:

```text
dark section
    ↓
dark cards
    ↓
colored offsets remain
```

Card:

```text
#141416
```

Border:

```text
rgba(255,255,255,0.16)
```

Primary text:

```text
#F4F3F1
```

Secondary:

```text
#A6A4A5
```

Accent colors remain:

```text
Orange
Blue
Purple
Pink
Cyan
Yellow
```

---

# 36. Case Study Geometry

Keep the physical-card concept.

Cards can still have:

- colored offset shadow
- colored circles
- rectangles
- small geometric decorations
- accent rails

Only the base card/surface is inverted.

The result should resemble:

```text
dark design board
+
physical dark cards
+
bright colored paper-like accents
```

---

# 37. Case Study Typography

Example:

```text
01
CASE STUDY

One Identity,
Multiple Layers

A clear primary identity...

DECONSTRUCT →
```

Light Mode Design section:

```text
01 → accent color
CASE STUDY → muted
Title → off-white
Description → gray
CTA → accent
```

---

# 38. Deconstruction Panel

The expanded case-study panel also inverts.

Dark version:

```text
#141416 / #0A0A0B
```

Text:

```text
off-white
```

Accent:

```text
case-study accent
```

The structural hierarchy remains exactly the same.

Do not redesign the interaction.

---

# 39. Design Case Study Result State

The active/result step should remain visually distinct.

Use the case-study accent.

For example:

```text
04
RESULT
```

can use the active purple/blue/orange accent.

This preserves the existing case-study logic.

---

# 40. Design Section Transition

The transition should be visually obvious:

```text
Light portfolio
#F5F4F1

        ↓

Dark Design Lab
#0A0A0B
```

This contrast is intentional.

Do not create a gradual gradient between the two.

The change should feel like entering another visual environment.

---

# 41. Border Radius

Preserve the existing geometry.

Suggested:

```text
Large cards:       22–28px
Medium cards:      16–20px
Inputs:            20–28px
Buttons:           14–18px
Pills:             999px
Circular controls: 50%
```

Theme switching must not change corner geometry.

---

# 42. Shadows

Light Mode should remain restrained.

Use shadows only where needed:

```css
0 20px 60px rgba(20,20,22,0.08)
```

Most components should rely on:

```text
surface contrast
+
border
```

rather than strong shadows.

---

# 43. Typography

Do not change the typography system between themes.

Keep:

- Satoshi direction
- same display font
- same technical/monospace metadata
- same heading hierarchy
- same body sizing
- same letter spacing

Only the color changes.

---

# 44. Spacing

Spacing remains unchanged between themes.

Preserve:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
```

Theme switching should never cause layout shifts simply because colors changed.

---

# 45. Motion

Motion behavior remains shared between themes.

Do not create separate Light Mode animations.

Use the same:

- hover transitions
- entrance animation
- progress sheen
- status indicator behavior
- case-study interactions

Only adapt contrast if necessary.

---

# 46. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable:

- progress sheen
- decorative looping motion
- unnecessary entrance movement

The design must remain complete without motion.

---

# 47. Light Mode Visual Hierarchy

The hierarchy should remain:

```text
1. Satyam Singh
2. Android Developer
3. Hero description
4. Primary CTA
5. Supporting hero panel
6. Section headings
7. Cards
8. Technical metadata
9. Background geometry
```

Do not let the light background make every element equally prominent.

---

# 48. Theme Consistency Rules

The following must remain identical between themes:

```text
Layout
Grid
Spacing
Typography
Font sizes
Border radius
Component structure
Project order
Project accent assignments
Navigation structure
Animation timing
Interaction behavior
```

Only these primarily change:

```text
Background
Surface
Text colors
Border colors
Background pattern color
Status contrast
Design-section surface system
```

---

# 49. Theme Mapping

Use this conceptual mapping:

```text
DARK MODE                         LIGHT MODE

#0A0A0B  background      →       #F5F4F1
#141416  surface         →       #ECEBE8
#111113  nested          →       #E7E6E3

#F4F3F1  primary text    →       #171719
#A6A4A5  secondary       →       #555457
#626164  muted           →       #858287

white border opacity     →       dark border opacity

#6F95FF blue             →       #6F95FF blue
#39E6A5 green            →       #18B981 green
```

---

# 50. Final Design Rule

The Light Mode should communicate:

> **The same engineer, the same work, the same design system — a different visual environment.**

The most important contrast is:

```text
DARK MODE
technical dark portfolio
+
light Design Lab

LIGHT MODE
technical light portfolio
+
dark Design Lab
```

This inversion is a core part of the portfolio identity and should be treated as a deliberate product decision, not a simple theme toggle.
