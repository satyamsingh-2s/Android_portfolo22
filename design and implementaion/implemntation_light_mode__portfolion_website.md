# Light Mode Portfolio Website — Implementation Specification

## 1. Implementation Goal

Implement a complete Light Mode for the existing portfolio without changing the existing page structure.

The implementation must preserve:

- current layout
- current content
- current navigation
- current hero composition
- current project ordering
- current component hierarchy
- current animations
- current spacing
- current typography
- current responsive behavior

The task is primarily a **theme-system implementation**, not a redesign.

---

# 2. Core Theme Architecture

Create two theme modes:

```text
dark
light
```

Theme switching should update a shared design-token layer.

Do NOT duplicate the entire UI tree for Light Mode.

Preferred:

```text
Component
    ↓
semantic design tokens
    ↓
dark/light values
```

Avoid:

```text
DarkHero
LightHero
DarkSkills
LightSkills
...
```

---

# 3. Theme Tokens

Create semantic CSS variables.

Example:

```css
:root {
  --bg: #F5F4F1;
  --surface: #ECEBE8;
  --surface-soft: #E7E6E3;

  --text-primary: #171719;
  --text-secondary: #555457;
  --text-muted: #858287;

  --border: rgba(20, 20, 22, 0.12);
  --border-soft: rgba(20, 20, 22, 0.07);

  --accent-blue: #6F95FF;
  --accent-blue-hover: #527CF0;

  --status-green: #18B981;

  --pattern: rgba(20, 20, 22, 0.045);

  --input-bg: #E7E6E3;
}
```

Dark theme:

```css
[data-theme="dark"] {
  --bg: #0A0A0B;
  --surface: #141416;
  --surface-soft: #111113;

  --text-primary: #F4F3F1;
  --text-secondary: #A6A4A5;
  --text-muted: #626164;

  --border: rgba(255,255,255,0.10);
  --border-soft: rgba(255,255,255,0.07);

  --accent-blue: #6F95FF;
  --accent-blue-hover: #7FA3FF;

  --status-green: #39E6A5;

  --pattern: rgba(255,255,255,0.045);

  --input-bg: #111113;
}
```

The existing dark theme should remain visually stable.

---

# 4. Design Section Must Have Its Own Theme Context

The Design section intentionally reverses the global theme.

Therefore do not rely only on global variables.

Define semantic Design Lab tokens.

For Light Mode:

```css
[data-theme="light"] .design-section {
  --design-bg: #0A0A0B;
  --design-surface: #141416;
  --design-text: #F4F3F1;
  --design-secondary: #A6A4A5;
  --design-muted: #68666A;
  --design-border: rgba(255,255,255,0.12);
  --design-pattern: rgba(255,255,255,0.06);
}
```

For Dark Mode:

```css
[data-theme="dark"] .design-section {
  --design-bg: #F5F2EC;
  --design-surface: #FAF8F3;
  --design-text: #171719;
  --design-secondary: #6E6B66;
  --design-muted: #8B8780;
  --design-border: rgba(20,20,22,0.16);
  --design-pattern: rgba(20,20,22,0.08);
}
```

This creates:

```text
Dark global
→ Light Design Lab

Light global
→ Dark Design Lab
```

---

# 5. Do Not Use Global Inversion Filters

Do NOT implement the Design section with:

```css
filter: invert(1);
```

Reason:

- project images would invert
- icons would invert
- photographs would invert
- brand assets would invert
- colors would become incorrect
- accessibility behavior becomes unpredictable

Use explicit semantic theme variables instead.

---

# 6. Theme Switch

The existing theme switch should toggle:

```html
<html data-theme="dark">
```

to:

```html
<html data-theme="light">
```

or the equivalent application-level theme state.

The switch should:

1. update the theme state
2. update the root data attribute/class
3. persist the user's preference
4. restore it on reload
5. respect system preference when no preference is saved

---

# 7. Theme Persistence

Use local storage.

Example conceptual behavior:

```text
User selects Light
        ↓
localStorage.theme = "light"
        ↓
reload
        ↓
restore Light
```

If no saved preference exists:

```text
prefers-color-scheme
        ↓
use system preference
```

Do not override an explicit user choice with the system preference.

---

# 8. Avoid Flash of Wrong Theme

Theme initialization must occur as early as possible.

Preferred:

```text
HTML/document initialization
        ↓
read saved theme
        ↓
apply data-theme
        ↓
render page
```

Avoid:

```text
render dark
    ↓
JavaScript executes
    ↓
switch to light
```

That produces a visible flash.

---

# 9. Global Background

Replace hard-coded dark backgrounds such as:

```css
background: #0A0A0B;
```

with:

```css
background: var(--bg);
```

for components that belong to the global theme.

Do the same for:

```text
color
border-color
background-color
input background
icon colors
```

Do not replace project-specific accent colors with theme tokens.

---

# 10. Hero Implementation

The Hero structure remains unchanged.

Use:

```css
.hero {
  background: var(--bg);
  color: var(--text-primary);
}
```

Hero location:

```css
color: var(--text-muted);
```

Hero name:

```css
color: var(--text-primary);
```

Role:

```css
color: var(--accent-blue);
```

Description:

```css
color: var(--text-secondary);
```

---

# 11. Hero Name — One Line

Desktop implementation must preserve:

```text
Satyam Singh
```

on one line.

Use responsive typography rather than forced line breaks.

Example:

```css
.hero-name {
  font-size: clamp(64px, 7vw, 132px);
  line-height: 0.95;
  letter-spacing: -0.055em;
  white-space: nowrap;
}
```

For very narrow screens, allow natural responsive wrapping only when physically required.

Do not insert:

```html
Satyam<br />
Singh
```

---

# 12. Hero Grid

Maintain the current composition:

```css
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 68fr) minmax(260px, 30fr);
  gap: clamp(40px, 5vw, 80px);
}
```

The left side must remain dominant.

The right side is supporting information.

---

# 13. Hero Vertical Rhythm

The current Hero rule must remain:

```text
Kolkata, India
        ↓
Satyam Singh
        ↓
Android Developer
        ↓
Description
        ↓
Buttons
```

The right panel must remain visually within approximately the same vertical range.

Do not increase Hero height just to accommodate the right panel.

Use:

- compact internal spacing
- compact labels
- compact status section
- controlled project image height

---

# 14. Hero Buttons

Desktop:

```css
.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
}
```

All three buttons:

```text
View Projects
Download Resume
Contact
```

must occupy one horizontal row at desktop widths.

Primary:

```css
background: var(--accent-blue);
color: #FFFFFF;
```

Secondary:

```css
background: var(--surface);
color: var(--text-primary);
border: 1px solid var(--border);
```

---

# 15. Right Hero Panel

Use:

```css
background: var(--surface);
border: 1px solid var(--border);
```

Do not hard-code:

```css
background: #141416;
```

for the global panel.

Internal media:

```css
background: var(--surface-soft);
```

---

# 16. Hero Project Image

The existing project image should remain the same image asset across themes unless a dedicated alternate asset exists.

Do not apply:

```css
filter: invert()
```

Do not recolor the image.

The surrounding frame changes with the theme; the project artwork does not.

---

# 17. Hero Progress Bar

Required state:

```text
70%
```

Use:

```css
.progress-track {
  background: var(--surface-soft);
}
```

and:

```css
.progress-fill {
  width: 70%;
  background: var(--accent-blue);
}
```

The bar must be a single continuous block.

Do not render individual segments.

Incorrect:

```text
██ ██ ██ ██ ██ ██
```

Correct:

```text
██████████████████────────
       70%             30%
```

---

# 18. Progress Animation

The width must remain:

```css
width: 70%;
```

Animation should be a sheen/highlight.

Example concept:

```css
.progress-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 20%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.22),
    transparent
  );
  animation: progress-sheen 2.8s ease-in-out infinite;
}
```

Do NOT animate width from:

```text
0 → 100
```

The progress state is 70%.

Only the highlight moves.

---

# 19. Right Panel Motion

Use subtle entrance animation.

Example:

```css
.hero-support {
  animation:
    hero-support-in 700ms ease-out both;
}
```

Keep transforms small:

```text
translateY(8–12px)
```

Do not create large movement.

---

# 20. Status Indicator

Use:

```css
.status-dot {
  background: var(--status-green);
}
```

Optional subtle pulse:

```text
opacity / box-shadow only
```

Do not animate the physical position continuously.

---

# 21. Navigation

Navigation background:

```css
background: color-mix(
  in srgb,
  var(--bg) 88%,
  transparent
);
```

If browser compatibility is a concern, use an explicit theme-aware translucent background instead.

Border:

```css
border: 1px solid var(--border);
```

Navigation links:

```css
color: var(--text-secondary);
```

Active:

```css
color: var(--text-primary);
```

---

# 22. Cards

Replace hard-coded dark card colors with:

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
}
```

Nested:

```css
.card-inner {
  background: var(--surface-soft);
}
```

This applies to:

- Skills
- Leadership
- Contact
- Hero panel
- Omega

---

# 23. Skills

Use existing skill component structure.

Only theme-dependent properties should change:

```css
.skill-card {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text-primary);
}
```

Skill pill:

```css
.skill-pill {
  background: var(--surface-soft);
  color: var(--accent-blue);
}
```

Do not change the grid structure.

---

# 24. Other Projects

Project rows should use:

```css
background: transparent;
border-color: var(--border-soft);
```

Titles:

```css
color: var(--text-primary);
```

Descriptions:

```css
color: var(--text-secondary);
```

Technical metadata:

```css
color: var(--text-muted);
```

Project accent rails remain hard-coded per project.

---

# 25. Omega

Omega card:

```css
.omega-card {
  background: var(--surface);
  border: 1px solid var(--border);
}
```

Description:

```css
color: var(--text-secondary);
```

Links:

```css
color: var(--accent-blue);
```

Statistics:

```css
.stat-value {
  color: var(--text-primary);
}
```

Statistics labels:

```css
color: var(--text-muted);
```

Background geometry:

```css
stroke: var(--pattern);
```

Do not modify the actual Omega project image.

---

# 26. Leadership

Leadership cards use:

```css
background: var(--surface);
border: 1px solid var(--border);
```

Decorative diagrams should use:

```css
stroke: var(--pattern);
```

or a similarly low-contrast semantic token.

Do not use pure black decorative lines in Light Mode.

---

# 27. Education

Education should remain an open layout.

Do not introduce a new card simply for Light Mode.

Use:

```css
color: var(--text-primary);
```

for main content.

Use:

```css
color: var(--text-secondary);
```

for secondary information.

GPA remains prominent.

---

# 28. Contact Form

Form:

```css
.contact-form {
  background: var(--surface);
  border: 1px solid var(--border);
}
```

Input:

```css
.contact-input {
  background: var(--surface-soft);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

Placeholder:

```css
color: var(--text-muted);
```

Submit:

```css
background: var(--accent-blue);
color: #FFFFFF;
```

---

# 29. Social Buttons

Use semantic variables:

```css
.social-button {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}
```

Hover:

```css
color: var(--text-primary);
border-color: var(--text-muted);
```

---

# 30. Design Section Theme Inversion

This is the most important implementation rule.

Do NOT let the Design section simply inherit:

```text
Light Mode global variables
```

Instead define its own variables.

Light Mode:

```css
[data-theme="light"] .design-section {
  --design-bg: #0A0A0B;
  --design-surface: #141416;
  --design-text: #F4F3F1;
  --design-secondary: #A6A4A5;
  --design-muted: #68666A;
  --design-border: rgba(255,255,255,0.12);
  --design-pattern: rgba(255,255,255,0.06);
}
```

Apply:

```css
.design-section {
  background: var(--design-bg);
  color: var(--design-text);
}
```

---

# 31. Design Section Dark Mode

Preserve the current Design section behavior.

Conceptually:

```css
[data-theme="dark"] .design-section {
  --design-bg: #F5F2EC;
  --design-surface: #FAF8F3;
  --design-text: #171719;
  --design-secondary: #6E6B66;
  --design-muted: #8B8780;
  --design-border: rgba(20,20,22,0.16);
  --design-pattern: rgba(20,20,22,0.08);
}
```

Do not break the existing dark-theme Design section.

---

# 32. Design Heading

Use:

```css
.design-heading {
  color: var(--design-text);
}
```

The emphasized word:

```text
interface.
```

retains the orange accent.

Do not map orange to the global blue accent.

---

# 33. Design Dot Grid

Use the Design-specific pattern variable.

Example:

```css
.design-section {
  background-image:
    radial-gradient(
      var(--design-pattern) 1px,
      transparent 1px
    );
  background-size: 14px 14px;
}
```

The actual opacity should remain subtle.

---

# 34. Design Case Study Cards

Use:

```css
.design-card {
  background: var(--design-surface);
  color: var(--design-text);
  border: 1px solid var(--design-border);
}
```

Do not invert the accent decorations.

Keep their individual colors.

---

# 35. Design Card Offset

The physical-card effect remains.

For example:

```css
.case-study-card {
  box-shadow:
    8px 8px 0 var(--case-accent);
}
```

Use the existing project/case-study accent.

Do not replace it with black or white.

---

# 36. Design Deconstruction Panel

The modal/panel must use:

```css
background: var(--design-surface);
color: var(--design-text);
border: 1px solid var(--design-border);
```

The active/result indicator keeps the case-study accent.

Close button:

```css
background: transparent;
color: var(--design-text);
border: 1px solid var(--design-border);
```

---

# 37. Design Buttons

Controls such as:

```text
My Certificate
My Design 3
```

must use Design-specific variables.

Light Mode Design Lab:

```css
background: var(--design-surface);
color: var(--design-text);
border: 1px solid var(--design-border);
```

Dark Mode Design Lab continues to use the existing light styling.

---

# 38. Responsive Behavior

Do not change responsive breakpoints solely because Light Mode exists.

Existing breakpoints should continue to control:

- Hero stacking
- navigation behavior
- skill grid
- leadership grid
- contact layout
- Design cards

Theme should only change appearance.

---

# 39. Mobile Hero

At mobile width:

```text
Kolkata, India
Satyam Singh
Android Developer
Description
Actions
Supporting panel
```

Actions can wrap on mobile if required.

Desktop requirement of one horizontal row remains.

---

# 40. Transition Between Themes

Use a short visual transition where appropriate:

```css
transition:
  background-color 250ms ease,
  color 250ms ease,
  border-color 250ms ease;
```

Do not animate every property.

Avoid long transitions.

The theme should feel responsive.

---

# 41. Prevent Layout Shift

Theme switching must not change:

- font size
- padding
- margin
- card dimensions
- grid columns
- image dimensions
- button dimensions

Only visual properties change.

This ensures the page does not jump when the theme changes.

---

# 42. Reduced Motion

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The site must remain visually understandable without animation.

---

# 43. Accessibility

Verify:

- primary text contrast
- secondary text contrast
- button contrast
- focus visibility
- keyboard navigation
- form labels
- theme switch accessibility

Do not rely solely on color to communicate:

```text
Open to Work
Progress
Active state
```

The text itself must communicate the state.

---

# 44. Focus States

Light Mode focus should remain visible.

Example:

```css
:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 3px;
}
```

Do not remove browser focus indicators without replacing them.

---

# 45. Image Handling

Do not apply theme filters to:

- Omega images
- certificates
- event photos
- portfolio screenshots
- design case-study visuals

Only the surrounding UI changes.

If a future asset requires a Light Mode variant, explicitly provide a second asset.

---

# 46. Hard-Coded Color Audit

Before completion, search the project for hard-coded values such as:

```text
#0A0A0B
#141416
#111113
#F4F3F1
#A6A4A5
#626164
rgba(255,255,255,...)
```

Determine whether each is:

```text
global theme color
design-section-specific color
project-specific accent
image/asset color
```

Convert global theme colors to semantic variables.

Do NOT blindly replace every occurrence.

---

# 47. Component Audit

Review these components individually:

```text
Navigation
ThemeToggle
Hero
HeroSupportPanel
ProgressBar
Button
Skills
SkillCard
SkillPill
OtherProjects
ProjectRow
OmegaCard
LeadershipCard
Education
Contact
ContactForm
SocialButton
DesignSection
DesignCaseStudyCard
DesignDeconstructionPanel
```

Every component should render correctly in both themes.

---

# 48. Theme Verification Matrix

Test:

| Component | Dark Mode | Light Mode |
|---|---|---|
| Page background | Dark | Warm light |
| Hero | Dark | Light |
| Navigation | Dark | Light |
| Hero support | Dark | Light |
| Skills | Dark | Light |
| Other Projects | Dark | Light |
| Omega | Dark | Light |
| Leadership | Dark | Light |
| Education | Dark | Light |
| Contact | Dark | Light |
| Design | Light | Dark |

The final row is the critical inversion.

---

# 49. Visual QA

Compare Dark and Light Mode side-by-side.

Check:

### Hero

- [ ] Satyam Singh remains dominant
- [ ] Name remains one line on desktop
- [ ] Right panel remains supporting
- [ ] Buttons remain horizontally aligned
- [ ] Right panel remains compact
- [ ] Progress remains 70%
- [ ] Progress is one continuous bar
- [ ] Progress sheen remains subtle

### Global

- [ ] Background geometry remains subtle
- [ ] Cards have correct surface contrast
- [ ] Borders are restrained
- [ ] Typography hierarchy is unchanged
- [ ] Blue identity is preserved

### Design

- [ ] Dark Mode → light Design section
- [ ] Light Mode → dark Design section
- [ ] Colored accents remain
- [ ] Dot grid is inverted correctly
- [ ] Case-study cards remain recognizable
- [ ] Deconstruction panel remains usable

---

# 50. Performance

Avoid implementing theme switching by recreating the page.

Prefer:

```text
one DOM
+
CSS variables
+
one theme state
```

This minimizes:

- re-rendering
- duplicated markup
- maintenance cost
- theme inconsistencies

---

# 51. Final Acceptance Criteria

The Light Mode implementation is complete only when:

1. The entire main portfolio uses the warm Light Mode palette.
2. `Satyam Singh` remains the dominant Hero element.
3. The Hero layout is unchanged.
4. The three Hero buttons remain on one desktop horizontal line.
5. The right Hero panel remains supporting rather than dominant.
6. The Hero progress bar is a single continuous 70% bar.
7. The progress sheen moves subtly without changing the 70% state.
8. Existing project images remain visually unchanged.
9. Existing project accent colors remain intact.
10. Skills, Projects, Omega, Leadership, Education, and Contact all correctly use Light Mode surfaces.
11. Background geometry becomes subtly dark rather than disappearing.
12. The Design section becomes **dark** in Light Mode.
13. The Design section retains its colorful case-study accents.
14. The Design section does not use `filter: invert()`.
15. Theme choice persists after reload.
16. No flash of the wrong theme occurs during initial load.
17. No layout shift occurs when changing themes.
18. Reduced-motion preferences are respected.
19. Keyboard focus remains visible.
20. Desktop and mobile layouts remain functional.

---

# 52. Final Implementation Principle

Do not think of this implementation as:

```text
"Add a white theme."
```

Implement it as:

```text
Existing Dark Portfolio
        ↓
Semantic Theme Tokens
        ↓
Light Portfolio
        ↓
Design Section Context Inversion
```

The final result should feel like:

```text
DARK MODE

[ Dark Portfolio ]
        +
[ Light Design Lab ]


LIGHT MODE

[ Light Portfolio ]
        +
[ Dark Design Lab ]
```

while everything else — structure, typography, spacing, content, motion, and visual identity — remains recognizably the same portfolio.
