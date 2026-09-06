# Implementation --- Interactive Glowing Cursor Tail

## 1. Feature Goal

Add an interactive cursor trail to the portfolio's **Design / Projects
section**.

The effect should feel like part of the design system, not like a
generic rainbow mouse trail.

### Core behavior

-   Activates only when the cursor enters the target section.
-   Creates a **long, smooth, glowing, colorful trail** behind the
    cursor.
-   Smoothly follows the cursor path.
-   The newest part near the cursor is brighter.
-   Older parts become thinner, more transparent, and disappear.
-   When the cursor leaves, no new points are added.
-   The existing trail fades out naturally.
-   The effect never blocks clicking, hovering, or selecting project
    content.

------------------------------------------------------------------------

## 2. Visual Direction

> **Elegant glowing ribbon, not a rainbow cursor effect.**

Concept:

``` text
faded blue ───── cyan ───── purple ───── pink ───── orange ●
                                                          cursor
```

The trail should be fluid and continuous:

``` text
                       ╭──────────────●
                ╭──────╯
          ╭─────╯
    ╭─────╯
────╯
```

### Glow layers

Render the trail in three passes:

1.  **Outer glow** --- wide, low opacity, soft blur.
2.  **Inner glow** --- medium width, more visible.
3.  **Core line** --- thin and brightest.

This gives the trail depth without making it heavy.

### Color

Use a smooth progression:

``` text
Blue → Cyan → Purple → Pink → Orange
```

Do not use hard rainbow segments. The colors should blend continuously
and the glow should inherit the trail colors.

------------------------------------------------------------------------

## 3. Scope and Layering

Recommended structure:

``` text
ProjectsSection
│
├── CursorTrailCanvas
│
└── ProjectsContent
    ├── Section Header
    ├── Screesher
    ├── Secura
    ├── Macer
    ├── Portfolio Website
    └── AI Financial Assistant
```

The canvas is only a visual layer.

``` text
Project content        z-index: 2
Cursor trail canvas    z-index: 1
Background             z-index: 0
```

The canvas must use:

``` css
pointer-events: none;
```

The trail must never block project hover states, links, buttons, or
pointer events.

------------------------------------------------------------------------

## 4. Trail Data Model

Do not create DOM elements for every trail segment.

Use a small in-memory history:

``` ts
type TrailPoint = {
  x: number
  y: number
  time: number
}
```

Internal state:

``` ts
points: TrailPoint[]
isInsideSection: boolean
animationFrameId: number | null
```

Use refs or mutable structures for high-frequency cursor updates. Do not
update React state on every pointer movement.

------------------------------------------------------------------------

## 5. Interaction Flow

### On pointer enter

``` text
Pointer enters section
        ↓
isInsideSection = true
        ↓
Start animation loop if needed
```

### On pointer move

``` text
Pointer moves
        ↓
Convert position to section-local coordinates
        ↓
Compare with previous point
        ↓
If movement exceeds threshold:
    Add TrailPoint
```

Recommended initial threshold:

``` text
3px
```

This avoids excessive points and noisy trails when the cursor is nearly
stationary.

### On pointer leave

``` text
Pointer leaves section
        ↓
isInsideSection = false
        ↓
Stop adding new points
        ↓
Continue rendering existing points
        ↓
Points fade naturally
        ↓
Points become empty
        ↓
Stop animation loop
```

Do **not** immediately clear the trail.

------------------------------------------------------------------------

## 6. Trail Lifetime and Shape

Recommended starting lifetime:

``` text
750ms
```

Recommended tuning range:

``` text
600–900ms
```

Opacity:

``` text
new point                    old point
100% opacity  ───────────→   0% opacity
```

Thickness:

``` text
near cursor                  tail end
2.5px        ───────────→    0.3px
```

Fast movement should naturally create a longer visible trail. Slow
movement should create a shorter, denser trail.

Do not define the effect only by a fixed number of points.

------------------------------------------------------------------------

## 7. Path Smoothing

Raw cursor coordinates create sharp angles.

Use midpoint interpolation and quadratic curves to create a smooth path.

Concept:

``` text
Point A
         midpoint ─── smooth curve ─── midpoint
                                      /
                                  Point B
```

Implementation principle:

``` text
For each point:
    Calculate midpoint with the next point
    Draw a quadratic curve through the current point
```

Start simple. Do not introduce a physics engine unless the basic result
is visually inadequate.

------------------------------------------------------------------------

## 8. Canvas Rendering Pipeline

Every active animation frame:

``` text
requestAnimationFrame
        ↓
Clear canvas
        ↓
Remove expired points
        ↓
Build smooth path
        ↓
Draw outer glow
        ↓
Draw inner glow
        ↓
Draw bright core
        ↓
If no points remain:
    Stop animation loop
```

The animation should run only while visible trail points exist.

------------------------------------------------------------------------

## 9. Gradient Strategy

The trail color should move naturally from old to new points:

``` text
older trail                                      cursor
blue ───── cyan ───── purple ───── pink ───── orange ●
```

Recommended first approach: interpolate colors according to point age.

``` text
oldest → blue
older  → cyan
middle → purple
newer  → pink
newest → orange
```

Important: the color belongs **only to the trail**.

Do not recolor:

-   project titles
-   domain labels
-   arrows
-   side lines
-   main typography

------------------------------------------------------------------------

## 10. Glow Strategy

### Pass 1 --- Outer glow

``` text
Wide stroke
Low alpha
High blur
```

### Pass 2 --- Inner glow

``` text
Medium stroke
Medium alpha
Moderate blur
```

### Pass 3 --- Core

``` text
Thin stroke
High alpha
Minimal blur
```

Visual target:

``` text
░░░░░░▒▒▒▓▓●▓▓▒▒░░░░
    glow  core
```

The glow should be clearly visible on the dark background but should not
dominate the project content.

------------------------------------------------------------------------

## 11. Performance Rules

Required:

-   One canvas.
-   One pointer listener scope.
-   One animation loop only when needed.
-   No React re-render on every pointer movement.
-   Remove expired points every frame.
-   Stop `requestAnimationFrame` when the trail is empty.
-   Resize the canvas with the section.

Avoid:

``` text
❌ Hundreds of DOM elements
❌ React state updates on every mouse event
❌ Multiple animation loops
❌ Permanent animation while inactive
❌ A global document-wide cursor effect
```

------------------------------------------------------------------------

## 12. Resize and High-DPI Support

The canvas must match the section dimensions.

On mount and resize:

``` text
Get section width and height
        ↓
Get devicePixelRatio
        ↓
Set canvas internal resolution
        ↓
Set CSS display size
        ↓
Scale drawing context
```

Use `ResizeObserver` if appropriate.

This keeps the trail sharp on high-DPI displays.

------------------------------------------------------------------------

## 13. Accessibility and Device Rules

### Reduced motion

Respect:

``` css
prefers-reduced-motion: reduce
```

Disable the animated trail when reduced motion is requested.

### Mobile

Enable only for devices with a fine pointer and hover capability.

``` text
Fine pointer + hover
    → enable

Touch-only
    → disable
```

Do not add a finger trail in the first implementation.

------------------------------------------------------------------------

## 14. Future Pattern Interaction

The existing project patterns may later react to the cursor trail.

Possible behavior:

``` text
Cursor enters project row
        ↓
Trail continues normally
        ↓
That project's decorative pattern reacts subtly
```

Examples:

``` text
Screesher             → dot pattern slightly expands
Secura                → contour lines shift subtly
Macer                 → geometric grid gains depth
Portfolio Website     → diagonal lines brighten
AI Financial Assistant → wave pattern gently moves
```

This is **not part of the first implementation**.

First complete the base cursor trail and evaluate the result.

------------------------------------------------------------------------

## 15. Suggested Component Structure

``` text
components/
└── projects/
    ├── ProjectsSection.tsx
    ├── CursorTrail.tsx
    ├── ProjectRow.tsx
    └── projectData.ts
```

### Responsibilities

**ProjectsSection** - Owns the section boundary. - Provides the
activation area.

**CursorTrail** - Owns the canvas. - Tracks pointer positions. - Stores
trail points. - Runs the animation. - Draws gradient and glow. - Handles
resize and cleanup.

**ProjectRow** - Renders project content. - Remains independent from
cursor-trail rendering.

Do not mix canvas logic into individual project rows.

------------------------------------------------------------------------

## 16. Implementation Order

### Step 1 --- Canvas layer

Create:

``` text
absolute canvas
full section size
pointer-events: none
correct z-index
```

Verify all project interactions still work.

### Step 2 --- Pointer tracking

Track section-local cursor coordinates.

Render a temporary dot first.

### Step 3 --- Point history

Add:

``` text
x
y
timestamp
```

Store recent points and remove expired points.

### Step 4 --- Basic trail

Draw the point history as a simple line.

Verify activation, movement, and leave behavior before styling.

### Step 5 --- Smooth path

Add midpoint interpolation and curves.

### Step 6 --- Fade

Apply age-based opacity.

### Step 7 --- Taper

Reduce thickness toward the older end.

### Step 8 --- Gradient

Add:

``` text
Blue → Cyan → Purple → Pink → Orange
```

### Step 9 --- Glow

Add:

``` text
Outer glow
Inner glow
Core line
```

### Step 10 --- Optimize

Verify:

-   no unnecessary React renders
-   one animation loop
-   animation stops when empty
-   resize works
-   cleanup works

### Step 11 --- Device support

Add reduced-motion and touch-device handling.

------------------------------------------------------------------------

## 17. Initial Tuning Values

Starting values only:

``` text
Trail lifetime:       750ms
Minimum point gap:    3px
Core width:           1.5–2.5px
Inner glow width:     4–6px
Outer glow width:     10–16px
Animation:            requestAnimationFrame
```

Tune these visually after seeing the effect in the real portfolio.

Do not over-engineer constants before the first working version exists.

------------------------------------------------------------------------

## 18. Definition of Done

The feature is complete when:

-   [ ] Trail activates only inside the target section.
-   [ ] Trail follows cursor movement smoothly.
-   [ ] Fast movement creates a visually long trail.
-   [ ] Slow movement remains controlled.
-   [ ] Trail has a continuous multi-color gradient.
-   [ ] Trail has a visible but controlled glow.
-   [ ] New points stop immediately when leaving.
-   [ ] Existing trail fades naturally after leaving.
-   [ ] Trail never blocks hover or click interactions.
-   [ ] Animation stops when no points remain.
-   [ ] Canvas remains sharp after resize.
-   [ ] Touch-only devices do not run the effect.
-   [ ] Reduced-motion preferences are respected.
-   [ ] The result looks elegant rather than like a generic rainbow
    mouse trail.

------------------------------------------------------------------------

## Final Design Principle

The intended feeling is:

> **The cursor is drawing light through the Design section.**

The interaction should be:

``` text
Cursor movement
      ↓
Light
      ↓
Color
      ↓
Motion
      ↓
Temporary visual trace
      ↓
Natural fade
```

Keep the first implementation focused on this single experience. Do not
add project-pattern reactions until the glowing trail is complete and
visually stable.
