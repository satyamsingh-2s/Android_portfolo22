# Glowing Cursor Trail — Omega + Other Projects

## Goal
A single elegant ribbon of light that follows the cursor while it is inside the Omega section and the Other Projects section. It reads as part of the design system: a continuous blue → cyan → purple → pink → orange glow, brightest at the cursor, thinning and fading behind it. It never blocks hovering, clicking or reading.

## Behaviour
- Activates only when the cursor is inside one of the two sections; each section has its own independent trail layer.
- Points are added as the cursor moves (min 3px gap), each living ~750ms.
- Fast movement gives a long trail, slow movement a short dense one.
- On leaving the section, no new points are added and the existing trail fades out on its own — it is not cleared instantly.
- Animation stops entirely once the trail is empty; nothing runs while idle.
- Disabled on touch-only devices and when reduced motion is preferred.

## What gets built

### New component `src/components/CursorTrail.tsx`
A self-contained canvas layer, absolutely positioned to fill its parent section, `pointer-events: none`, sitting above the section background but below content.

- Pointer positions, point history, and the animation frame id live in refs — no React state on pointer move, so no re-renders.
- Pointer listeners attach to the parent section element (enter / move / leave), converting to section-local coordinates.
- Each frame: clear, drop expired points, build a smooth quadratic path through segment midpoints, then draw three passes — wide low-alpha outer glow, medium inner glow, thin bright core.
- Colour is interpolated by point age across the five stops, drawn segment-by-segment so the gradient is continuous rather than banded; glow passes inherit the same colours.
- Width tapers from ~2.5px at the cursor to ~0.3px at the tail; opacity from full to zero.
- `ResizeObserver` on the section keeps the canvas sized, with `devicePixelRatio` scaling so it stays sharp.
- Full cleanup of listeners, observer and animation frame on unmount.

### Section wiring
- `src/components/sections/Omega.tsx` and `src/components/sections/OtherProjects.tsx`: add `relative` positioning where needed, render `<CursorTrail />` as the first child, and make sure the content wrapper sits above it in stacking order.
- No changes to project content, typography, colours or existing hover behaviour.

## Technical notes
- Trail lifetime 750ms, min point gap 3px, core 1.5–2.5px, inner glow 4–6px, outer glow 10–16px; tuned visually after the first pass.
- Glow uses layered strokes plus a modest `shadowBlur`, not CSS filters, to keep it cheap.
- Guarded by `matchMedia('(hover: hover) and (pointer: fine)')` and `prefers-reduced-motion`.
- Canvas only mounts client-side, so it does not affect server rendering.

## Out of scope
- The bright design board section keeps no trail.
- Decorative section patterns reacting to the cursor (a possible later step).
