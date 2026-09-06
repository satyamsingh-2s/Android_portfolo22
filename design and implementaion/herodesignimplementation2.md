# Hero Design Implementation v2

## 1. Purpose

Implement the portfolio hero section to match the approved reference design.

The hero has two visual columns:

- **Left:** dominant personal introduction.
- **Right:** compact supporting information about the current project and availability.

The final implementation must preserve the visual hierarchy:

> **Left content dominates. Right content supports.**

Do not redesign the structure, add extra cards, or introduce additional content.

---

# 2. Desktop Layout

## Main Hero Container

Use a centered desktop container below the navigation.

### Required composition

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  LEFT — DOMINANT                         RIGHT — SUPPORTING              │
│  ~64–68% width                           ~28–32% width                   │
│                                                                          │
│  Kolkata, India                          Currently Building              │
│                                                                          │
│  Satyam Singh                            Project Image Placeholder       │
│                                                                          │
│  Android Developer                       Current Focus                   │
│                                          AI-Assisted Project              │
│  Building AI-assisted productivity       Planning Workflows               │
│  tools with Kotlin & Jetpack Compose.                                         │
│                                          70% Progress Bar                 │
│  [ View Projects ] [ Download Resume ] [ Contact ]                        │
│                                          ─────────────────────            │
│                                          Current Status                   │
│                                          Available for Android            │
│                                          Opportunities                    │
│                                          Open to Work                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Use a horizontal layout on large screens.

Suggested relationship:

```css
hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 0.42fr;
  gap: clamp(48px, 6vw, 96px);
}
```

The exact pixel width may adapt to the viewport, but the left side must remain visually dominant.

---

# 3. Critical Vertical Height Rule

This is a mandatory layout rule.

The right supporting section must occupy approximately the same vertical content range as the left section from:

```text
KOLKATA, INDIA
```

to:

```text
[ VIEW PROJECTS ] [ DOWNLOAD RESUME ] [ CONTACT ]
```

### Alignment intent

```text
LEFT TOP                               RIGHT TOP
Kolkata, India                         Currently Building
      ↓                                      ↓
      │                                      │
      │     SAME OVERALL CONTENT RANGE       │
      │                                      │
      ↓                                      ↓
Hero action buttons                     Open to Work
LEFT BOTTOM                            RIGHT BOTTOM
```

### Important

Do not make the right card unnecessarily tall.

The right section must be compressed through:

- smaller typography
- tighter line heights
- controlled section spacing
- compact status content
- compact image placeholder

Do **not** compress the left section to match the right.

The left section remains spacious and dominant.

---

# 4. Navigation

Keep the navigation centered above the hero.

Structure:

```text
[ Satyam | Projects | Skills | Design | Leadership | Contact | Let's talk ]
```

The navigation should remain visually independent from the hero columns.

Use:

- rounded pill container
- subtle border
- dark translucent surface
- restrained shadow or glow
- blue primary CTA for `Let's talk`

Do not make the navigation excessively large.

---

# 5. Left Section — Dominant Identity

## Content Order

```text
• KOLKATA, INDIA

SATYAM SINGH

Android Developer

Building AI-assisted productivity tools
with Kotlin & Jetpack Compose.

[ View Projects ] [ Download Resume ] [ Contact ]
```

## 5.1 Location

Use:

```text
• KOLKATA, INDIA
```

Rules:

- small uppercase text
- generous letter spacing
- muted gray
- small blue status dot
- compact height

This is the top anchor of the left hero content.

---

## 5.2 Name

Display exactly:

```text
Satyam Singh
```

### Mandatory rule

The name must stay on **one line** on the intended desktop layout.

Do not break it into:

```text
Satyam
Singh
```

The name is the largest typography element in the hero.

Visual direction:

- bold
- bright off-white
- very large
- tight but readable line-height
- no unnecessary effects
- subtle visual weight only

The name must dominate the entire composition.

---

## 5.3 Role

Display:

```text
Android Developer
```

Rules:

- blue accent color
- clearly smaller than the name
- larger than supporting labels
- enough spacing below the name

---

## 5.4 Description

Display:

```text
Building AI-assisted productivity tools
with Kotlin & Jetpack Compose.
```

Rules:

- muted light gray
- readable line-height
- maximum width controlled so the text naturally forms approximately two lines
- not as visually strong as the role or name

---

# 6. Hero Action Buttons

All three buttons must remain on the **same horizontal line** on desktop.

Required order:

```text
[ View Projects ] [ Download Resume ] [ Contact ]
```

Do not stack the Contact button below the other buttons on desktop.

Suggested structure:

```css
.hero-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 24px;
}
```

Allow responsive wrapping only when the viewport becomes too narrow.

## Button Hierarchy

### Primary

```text
View Projects
```

- blue filled surface
- strongest visual emphasis
- rounded corners
- subtle hover response
- project-related icon may remain

### Secondary

```text
Download Resume
```

- dark surface
- subtle border
- white/light text
- download icon

### Tertiary

```text
Contact
```

- dark surface
- subtle border
- white/light text
- mail icon

All buttons should have consistent height.

Do not make the buttons oversized.

---

# 7. Right Supporting Section

The right section is one compact bordered information panel.

It contains two stacked areas:

```text
CURRENTLY BUILDING
        ↓
Project image placeholder
        ↓
Current focus
        ↓
Single 70% progress bar
        ↓
divider
        ↓
Current status
        ↓
Availability + Open to Work
```

Use:

- subtle rounded border
- very dark surface
- restrained internal padding
- minimal shadow
- no strong card gradients
- no excessive glow

The panel must remain visually secondary to the left hero.

---

# 8. Currently Building

Top label:

```text
CURRENTLY BUILDING
```

Rules:

- small uppercase text
- monospaced or technical-looking typography if consistent with the site
- muted light gray
- compact letter spacing
- small blue dot aligned on the right

The label must be noticeably smaller than the earlier oversized versions.

---

# 9. Project Image Placeholder

Use a placeholder because no final Omega image is available yet.

Required placeholder content:

```text
[ image icon ]

PROJECT IMAGE
PLACEHOLDER
```

The placeholder should:

- use a compact landscape rectangle
- have rounded corners
- use a subtle dashed or low-contrast border
- have a dark surface slightly separated from the panel background
- remain visually quiet

Do not make the image area so tall that it breaks the vertical height rule.

When the real project image becomes available, it should replace only this placeholder without changing the surrounding layout.

---

# 10. Current Focus

Label:

```text
CURRENT FOCUS
```

Main content:

```text
AI-ASSISTED PROJECT
PLANNING WORKFLOWS
```

Rules:

- label is small and muted
- focus text uses the site's blue accent
- focus text is stronger than the label but smaller than the left-side role
- keep the text compact
- two lines are acceptable and intended

Avoid repeating extra labels such as:

```text
FEATURE:
STATUS:
IN PROGRESS
BUILDING THE NEXT LAYER
```

The content should communicate one clear message without repetition.

---

# 11. Progress Bar — Mandatory Design

The progress indicator must be a **single continuous block**, not separate segments.

### Visual structure

```text
┌────────────────────────────────────┐
│████████████████████████████░░░░░░░░│
└────────────────────────────────────┘
              ~70% filled
```

## Required behavior

- one continuous track
- approximately **70% filled**
- remaining 30% stays dark/muted
- rounded corners
- compact height
- blue filled area

Do not use individual square blocks.

Do not use segmented indicators.

### Animation

The progress should communicate active work without changing the actual 70% value.

Use a subtle moving highlight inside the filled region.

Example behavior:

```text
70% fill remains fixed
        ↓
soft highlight moves left → right
        ↓
loops slowly
```

Recommended animation characteristics:

- slow
- smooth
- low contrast
- subtle
- no flashing
- no pulsing percentage changes

The visual should feel similar to a file-copying progress indicator: the work is active, while the progress remains approximately 70%.

The actual width must stay near:

```css
width: 70%;
```

The animation must move a highlight layer, gradient, or sheen rather than repeatedly changing the fill width from 0% to 100%.

---

# 12. Divider

Place one subtle horizontal divider between the Current Focus / Progress area and the Current Status area.

Rules:

- low-contrast border
- full usable width of the panel
- enough vertical breathing room
- not visually dominant

---

# 13. Current Status

Label:

```text
CURRENT STATUS
```

Availability text:

```text
AVAILABLE FOR ANDROID OPPORTUNITIES
```

Availability state:

```text
OPEN TO WORK  ●
```

The status area must be compact.

### Typography hierarchy

```text
CURRENT STATUS
```

Small technical label.

```text
AVAILABLE FOR ANDROID OPPORTUNITIES
```

Small supporting text.

```text
OPEN TO WORK
```

Small accent status text.

Do not use large headline-sized text in this section.

The status area was intentionally reduced in size to keep the right panel within the vertical height rule.

Use a small green indicator dot for the active availability state.

---

# 14. Right Section Vertical Rhythm

Use controlled spacing approximately in this order:

```text
Panel padding
  ↓
Currently Building label
  ↓ small gap
Project image placeholder
  ↓ moderate gap
Current Focus label
  ↓ small gap
Focus text
  ↓ moderate gap
70% progress bar
  ↓ moderate gap
Divider
  ↓ moderate gap
Current Status label
  ↓ small gap
Availability text
  ↓ small gap
Open to Work
Panel padding
```

The spacing must feel clean but compressed enough to satisfy the shared vertical range.

Do not insert large empty gaps between every element.

---

# 15. Subtle Right Section Animations

The right section should have restrained motion.

## Allowed animations

### A. Panel entrance

On initial hero appearance:

1. right panel begins slightly lower or slightly transparent
2. fades/slides into its final position
3. animation finishes quickly

Suggested feeling:

```text
opacity: 0 → 1
translateY: 8px → 0
```

Use a smooth easing curve.

No dramatic entrance.

---

### B. Blue indicator dot

The `Currently Building` blue dot may have a very subtle periodic glow.

Rules:

- very low intensity
- slow
- should not continuously attract attention

---

### C. Progress highlight

This is the primary continuous animation in the right section.

The progress value remains fixed at approximately 70%.

Only a highlight travels through the filled region.

This animation should be the clearest signal that active work is happening.

---

### D. Open to Work indicator

The green status dot may have a minimal soft glow.

Do not make it blink rapidly.

---

# 16. Animation Restrictions

Do not animate everything.

Avoid:

- bouncing cards
- floating cards
- continuous panel movement
- rapidly blinking dots
- progress percentage changing repeatedly
- exaggerated scaling
- strong neon glow
- multiple simultaneous attention-grabbing effects

The intended feeling is:

```text
quiet
technical
alive
controlled
professional
```

---

# 17. Background

Keep the existing dark portfolio background direction.

Use:

- near-black base
- subtle blue atmospheric gradient if already part of the design
- faint curved line patterns
- very low contrast

The background must not compete with the name or right panel.

---

# 18. Responsive Rules

## Desktop

Required layout:

```text
LEFT | RIGHT
```

- left dominates
- right supports
- name stays on one line
- all three action buttons stay on one line
- right panel remains compact
- shared vertical range is maintained as closely as practical

## Tablet

Gradually reduce:

- name size
- column gap
- panel padding
- image placeholder height

Keep two columns while there is enough width.

## Mobile

Stack vertically:

```text
LEFT
↓
RIGHT
```

On mobile, the desktop one-line requirements may adapt naturally:

- name can wrap if physically necessary
- action buttons may stack or wrap
- right panel uses full available width

Do not preserve desktop proportions at the cost of overflow.

---

# 19. Implementation Priority

Follow these priorities in order:

1. **Correct left-dominant hierarchy**
2. **Correct shared vertical content range**
3. **Satyam Singh stays on one line on desktop**
4. **All three action buttons stay on one line on desktop**
5. **Right panel remains compact**
6. **Single continuous 70% progress bar**
7. **Subtle active highlight animation**
8. **Minimal Current Status typography**
9. **Fine visual polish**

If a visual adjustment conflicts with the vertical height rule, preserve the vertical height rule.

---

# 20. Final Acceptance Checklist

Before considering the hero complete, verify:

### Layout

- [ ] Left section is visually dominant.
- [ ] Right section is clearly supporting.
- [ ] Desktop uses approximately a 68–70 / 30–32 visual relationship.
- [ ] Right section's overall content height approximately matches the left range from `KOLKATA, INDIA` to the action buttons.
- [ ] Right panel is not excessively tall.

### Left Content

- [ ] `Satyam Singh` is on one line on desktop.
- [ ] Name is the largest element.
- [ ] `Android Developer` uses the blue accent.
- [ ] Description remains secondary.
- [ ] All three action buttons are on one horizontal line on desktop.

### Right Content

- [ ] `CURRENTLY BUILDING` typography is small.
- [ ] Project image is a placeholder.
- [ ] `CURRENT FOCUS` is compact.
- [ ] No repetitive feature/status wording is added.
- [ ] Progress bar is one continuous block.
- [ ] Progress fill is approximately 70%.
- [ ] Remaining 30% is visibly unfilled.
- [ ] Only a subtle highlight moves through the filled portion.
- [ ] Progress width does not animate from 0% to 100%.
- [ ] Divider separates building information from availability.
- [ ] Current Status text remains small and compact.
- [ ] Green availability indicator is subtle.

### Motion

- [ ] Right panel entrance is subtle.
- [ ] Progress animation is slow and controlled.
- [ ] No distracting repeated motion exists.
- [ ] Motion supports the feeling of active work.

---

# Final Design Principle

The hero should communicate this hierarchy immediately:

```text
WHO I AM
    ↓
WHAT I BUILD
    ↓
WHAT I AM BUILDING RIGHT NOW
    ↓
MY CURRENT AVAILABILITY
```

The viewer should notice **Satyam Singh** first.

The right panel should be discovered second as a compact live context layer, not compete with the main identity.
