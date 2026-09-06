# Hero Design Specification

## Purpose
Redesign the portfolio hero using **Structure A: Connected Information Rail**.

The hero communicates:
1. Who I am.
2. What I am currently building.
3. Whether I am available for opportunities.

Keep approximately the same overall hero height. Do not make the hero taller.

## Overall Layout
Desktop uses two columns:
- Left identity column: ~60%
- Right connected information rail: ~40%

Both columns occupy approximately the same vertical space.

The right rail itself is vertically divided into:
- CURRENTLY BUILDING: ~70%
- CURRENT STATUS: ~30%

The two rail areas should remain connected, but use generous internal whitespace and a thin divider so they do not feel like crowded dashboard cards.

## Left Column
Content order:

KOLKATA, INDIA

SATYAM SINGH

ANDROID DEVELOPER

Building AI-assisted productivity tools
with Kotlin & Jetpack Compose.

[ VIEW PROJECTS ↓ ]
[ RESUME ↧ ] [ CONTACT ✉ ]

The name remains the strongest visual element.

**Name rule:** `SATYAM SINGH` must always stay on a single line on desktop. Do not wrap the first and last name onto separate lines. Adjust font size, letter spacing, or available column width before allowing a line break.

## Right Connected Information Rail
Do not use numbering such as 01 / 02.
Do not use two floating cards with a visible gap.

One connected rail with an internal divider:
- CURRENTLY BUILDING: 70%
- CURRENT STATUS: 30%

## CURRENTLY BUILDING
This occupies approximately 70% of the right rail.

Header:

CURRENTLY BUILDING                         ●

The `CURRENTLY BUILDING` label must be small, restrained, and technical/editorial. It must not compete with the main name or the Current Focus text.

Below it, reserve an intentional **plain image placeholder**. There is currently no Omega image asset, so do not generate, simulate, or use an Omega UI screenshot. The placeholder is intentional until a real project image is supplied:

┌──────────────────────────────────┐
│                                  │
│       OMEGA UI PREVIEW           │
│                                  │
│     [ IMAGE PLACEHOLDER ]        │
│                                  │
└──────────────────────────────────┘

The future image represents Omega visually.
Do not repeat a large Omega logo, project statistics, full project description, or tech stack here.

Keep generous whitespace between the header, image placeholder, Current Focus block, and the rail divider.

Below the image placeholder, keep Current Focus and the animated status bar together as one live-work block:

CURRENT FOCUS

AI-ASSISTED PROJECT
PLANNING WORKFLOWS

████████████████▒▒▒▒▒▒▒▒▒▒▒

Do not add:
- FEATURE / ...
- IN PROGRESS
- ACTIVE DEVELOPMENT
- percentages
- fake completion values

### Animated Status Bar
Use exactly one bar.
It is not numerical progress.

A highlighted segment should continuously move across the track, inspired by a Windows file-copy/loading operation. The motion should be subtle, smooth, and looping.

Concept:

███████▒▒▒▒▒▒▒▒▒▒▒▒
    moving segment

▒▒▒▒███████▒▒▒▒▒▒▒▒
        moving segment

▒▒▒▒▒▒▒▒███████▒▒▒▒
            moving segment

The animation alone communicates that work is actively happening.

## CURRENT STATUS
This compact lower area occupies approximately 30% of the right rail and uses:

The `CURRENT STATUS` label must use the same small, restrained technical/editorial treatment as `CURRENTLY BUILDING`. Leave visible whitespace around the availability message; do not crowd the content.

CURRENT STATUS

AVAILABLE FOR
ANDROID OPPORTUNITIES

OPEN TO WORK                              ●

Do not include:
- location
- company name
- timezone
- extra descriptions
- extra buttons
- unnecessary metadata

Its only purpose is to communicate availability.

## Complete Wireframe

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              TOP NAVIGATION                                  │
│                                                                              │
│   KOLKATA, INDIA                    CURRENTLY BUILDING                  ●    │
│                                                                              │
│   SATYAM SINGH                      ┌──────────────────────────────────┐     │
│                                     │                                  │     │
│   ANDROID DEVELOPER                 │       PROJECT IMAGE               │     │
│                                     │                                  │     │
│   Building AI-assisted              │     [ PLACEHOLDER ONLY ]          │     │
│   productivity tools with           │                                  │     │
│   Kotlin & Jetpack Compose.         └──────────────────────────────────┘     │
│                                                                              │
│                                     CURRENT FOCUS                            │
│   [ VIEW PROJECTS ↓ ]                                                       │
│   [ RESUME ↧ ] [ CONTACT ✉ ]       AI-ASSISTED PROJECT                     │
│                                     PLANNING WORKFLOWS                       │
│                                     ███████████████▒▒▒▒▒▒▒▒▒▒▒               │
│                                     [ subtle moving segment ]                │
│                                                                              │
│                                     ──────────────────────────────────────    │
│                                                                              │
│                                     CURRENT STATUS                      ●    │
│                                                                              │
│                                     AVAILABLE FOR                            │
│                                     ANDROID OPPORTUNITIES                    │
│                                                                              │
│                                     OPEN TO WORK                        ●    │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Visual Direction
Complement the existing portfolio design.

Keep:
- Existing dark portfolio visual language.
- Large bold identity typography.
- Thin structured borders.
- Generous whitespace.
- Editorial/technical metadata labels.
- Restrained accent usage.
- Clean geometry.
- Strong hierarchy.

Avoid:
- Gradients.
- Glassmorphism.
- Heavy shadows.
- Multiple competing cards.
- Excessive rounded containers.
- Decoration that competes with the name.
- Repeated Omega information already shown in the flagship section.
- Fake progress percentages.
- Numbering the rail sections.

## Information Story

WHO AM I?
→ SATYAM SINGH / ANDROID DEVELOPER

WHAT AM I BUILDING RIGHT NOW?
→ PROJECT IMAGE PLACEHOLDER (until a real Omega image is available)
→ CURRENT FOCUS
→ AI-ASSISTED PROJECT PLANNING WORKFLOWS
→ CONTINUOUS MOVING STATUS BAR

AM I AVAILABLE?
→ AVAILABLE FOR ANDROID OPPORTUNITIES
→ OPEN TO WORK ●

## Right Rail Spacing & Scale Rules

- Keep the right rail visually lighter than the original dashboard-like version.
- Use more blank space inside both the 70% and 30% areas.
- Reduce the visual size of the `CURRENTLY BUILDING` and `CURRENT STATUS` headers.
- These headers are metadata labels, not section titles.
- The Current Focus text is the primary text inside the upper rail area.
- The availability message is the primary text inside the lower rail area.
- Do not enlarge the image placeholder to fill empty space artificially.
- Empty space is intentional and should make the rail feel calm, premium, and integrated with the portfolio.
- Keep borders thin and restrained.
- Do not add extra cards, badges, statistics, progress percentages, or repeated project information.

## Responsive Intent
Desktop:
- Two-column layout.
- Left ~60%, right ~40%.
- Rail aligned vertically with identity content.
- `SATYAM SINGH` remains on one line.

Smaller screens:
- Identity first.
- Connected information rail follows.
- The name may scale down to preserve a single line where practical; only wrap when the viewport makes a single line impossible without harming readability.
- Preserve the content hierarchy.
- Preserve the 70/30 Currently Building / Current Status relationship where practical.
- Do not make the animated bar imply numerical progress.

## Final Principle
**Identity on the left. A spacious live work snapshot on the right.**

The design should feel integrated with the portfolio, not like generic dashboard cards.
