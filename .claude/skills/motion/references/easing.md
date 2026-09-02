# Easing and duration

## Why the defaults are wrong

CSS ships `ease`, `ease-in`, `ease-out`, `ease-in-out` and `linear`. For
user-initiated interface motion, three of the five are actively bad:

- `linear` — mechanical; nothing in the physical world moves at constant speed.
  The one exception is a continuous rotation (a spinner) or a colour/opacity
  crossfade, where it is fine.
- `ease-in` — starts slow, ends fast. Correct only for something *leaving*
  toward an exit, and even then, prefer a plain fade.
- `ease-in-out` — the default reflex, and the reason so many interfaces feel
  laggy. The slow start lands after the click, so the interface reads as
  hesitant.
- `ease` — CSS's default is a mild `ease-in-out`, so it inherits the same fault.

**`ease-out` is the workhorse.** Fast departure, gentle settle. It maps onto the
user's mental model: I acted, the interface moved immediately, then came to
rest.

## Curves worth keeping

```css
:root {
  /* General UI: hover, focus, small state changes */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Enters that should feel instant: menus, popovers, tooltips */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* Large surfaces travelling far: drawers, sheets, full-screen dialogs.
     Very fast off the mark, long tail — reads as weight without slowness. */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* A restrained overshoot. One bounce, small. For confirmations only,
     and never on anything the user sees more than a few times a session. */
  --ease-back: cubic-bezier(0.34, 1.4, 0.64, 1);
}
```

Reading a bezier: the first control point governs the start. A low first
`y` with a high `x` (like `0.32, 0.72`) means it leaves *hard*. Curves whose
first point sits near `(0.4, 0)` are ease-in-ish and will feel sluggish.

## Duration table

| Interaction | Duration |
| --- | --- |
| Colour, border, background on hover/focus | 100–150ms |
| Press / active feedback | 80–120ms |
| Tooltip, small popover | 120–180ms |
| Dropdown, context menu, select | 150–220ms |
| Dialog, modal | 200–300ms |
| Drawer, bottom sheet, side panel | 300–400ms |
| Page or route transition | 200–350ms |
| Toast enter | 200–300ms; exit 150–200ms |

Two adjustments to apply on top:

- **Distance scales duration.** The same element crossing 8px and 300px should
  not take the same time. Rough guide: duration ∝ √distance.
- **Exits are ~2/3 of the enter.** The decision is already made.

Anything over 400ms in an interface needs a written justification. Marketing
hero animations that run for a second are a different medium and do not belong
in product UI.

## Springs

A spring is defined by stiffness, damping, and mass rather than by duration —
which is exactly why it feels right for anything driven by a gesture: it can
absorb the velocity of the finger that threw it.

Use a spring when the motion continues a physical action the user started
(dragging a sheet, flicking a card away, a slider thumb). Use a curve for
everything discrete (open, close, hover, focus).

Do not fake a spring with a bouncy bezier on a gesture — it ignores velocity and
the mismatch is felt even when it cannot be named. And do not use a bouncy
spring on frequent UI: bounce is charming once and irritating on the fiftieth
repeat.

## Staggering

When several items enter together, offset them by **20–40ms**, and cap the total
at ~200ms. Beyond that the last item is simply late. Stagger the first five and
show the rest immediately if the list is long.

Never stagger something the user is waiting to read.
