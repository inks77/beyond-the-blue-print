---
name: motion
description: Animation and interaction craft in the Emil Kowalski school — fast, interruptible, origin-aware, transform-only motion that feels like the interface responding rather than performing. Use when adding or fixing any transition, hover state, dropdown, dialog, drawer, toast, page transition, scroll effect, or gesture. Covers easing, duration, what is safe to animate, reduced motion, and the animations to delete.
argument-hint: "[element or interaction]"
metadata:
  version: "1.0.0"
---

# Motion

Good interface animation is not noticed. It is felt as *responsiveness* — the
sense that the thing you touched knew you touched it. Bad interface animation is
noticed every single time, and after the third time it is resented.

The governing question for any animation: **does this help someone understand
what just happened?** If the honest answer is "it looks nice", delete it.

## The seven rules

1. **Animate `transform` and `opacity`. Almost nothing else.** They are the only
   properties the compositor can handle without laying out or painting. Animating
   `width`, `height`, `top`, `left`, `margin`, `box-shadow`, `filter: blur()`, or
   `background-position` costs a layout or paint every frame and will drop
   frames on a mid-range Android. Need a size change? Animate `scale`. Need a
   position change? `translate`. Need a real layout change? FLIP it.

2. **Fast.** Most UI motion belongs in **150–250ms**. Hover and press feedback:
   **100–150ms**. A large surface crossing a lot of distance (a drawer, a
   full-screen sheet): **300–400ms**, and that is the ceiling. Anything at
   `duration-500` or above on a small element is a delay, not an animation.
   Duration should scale with distance travelled, not with importance.

3. **`ease-out`, not `ease-in-out`.** The element should leave fast and settle
   slow — that is what "responsive" feels like. `ease-in-out` starts slowly,
   which reads as lag on anything the user initiated. CSS's default `ease` is
   also wrong for UI. Use a real curve:

   ```css
   --ease-out-quad:   cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* general UI */
   --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);          /* enters, snappy */
   --ease-drawer:     cubic-bezier(0.32, 0.72, 0, 1);         /* sheets, drawers */
   ```

4. **Exits are faster than enters, and simpler.** Roughly 2/3 the duration. On
   the way in you are introducing something and can afford a little travel; on
   the way out the user has already decided and is waiting. Often the correct
   exit is a plain fade.

5. **Animate from where it came from.** A dropdown scales up from the corner
   nearest its trigger, not from its own centre. A toast slides in from the edge
   it lives on. Set `transform-origin` to the anchor. Motion that ignores origin
   reads as decoration; motion that respects it explains the relationship
   between the thing you clicked and the thing that appeared.

6. **Interruptible.** If a user can trigger it, they can reverse it mid-flight.
   CSS transitions on a state class do this for free; keyframe animations and
   naive JS timelines do not — they finish, then react, which feels stuck. This
   is the single biggest difference between motion that feels physical and
   motion that feels scripted.

7. **Never block input.** No animation should stand between a click and its
   result. No modal that cannot be dismissed until its entrance finishes, no
   `pointer-events` trap during a transition, no waiting on an animation to
   render data that has already arrived.

## Scale and distance

Two numbers that fix most amateur motion:

- **Scale**: enter from `0.96`–`0.98`, not `0.8`. Small elements scaling from
  `0.9` look like they are being thrown at the user.
- **Translate**: `4px`–`12px` for menus, tooltips, list items. `scale-105` on
  hover and `translate-y-8` reveals both belong to slide decks, not interfaces.

Big movements are for big things. A dialog can cross 20px; a menu item cannot.

## What to delete on sight

- Scroll-triggered fade-up on every section of a page. It delays content, breaks
  on fast scroll, ruins Ctrl-F, and is the most recognisable signature of a
  generated site. At most, use it once, on one hero element, or not at all.
- `transition-all`. It animates properties you did not intend, including layout
  ones. Name the properties.
- `duration-300` applied uniformly to everything by reflex.
- Hover `scale-105` with a shadow bloom on cards.
- Looping ambient animation — floating blobs, pulsing glows, gradient drift.
  Nothing on the page should move when the user is not doing anything.
- Animated counters and typewriter text. They withhold information for effect.
- Page-load stagger cascades on nav items and hero copy.
- Spinners for anything under ~300ms. Show nothing, or show the optimistic
  result.

## Reduced motion

`prefers-reduced-motion: reduce` means *reduce vestibular motion*, not *remove
all feedback*. Keep opacity changes and instant state changes; drop travel,
scale, parallax, and autoplaying loops.

This project already ships a global kill-switch in `app/globals.css` that
collapses every transition and animation to `0.01ms`, and `Hero` gates video
playback on the same query with a `matchMedia` listener rather than a bare
attribute. Follow that pattern: check the query where the behaviour lives, and
listen for changes rather than reading it once.

## Choosing a tool

There is **no animation library installed here** — `tw-animate-css` plus CSS is
the whole toolkit, and that is usually enough. Escalate only when the interaction
genuinely needs it:

| Need | Reach for |
| --- | --- |
| Hover, press, focus, open/close, simple enter/exit | CSS transitions + a data attribute |
| Enter/exit that must finish before unmount | `@base-ui/react` transition state, or the View Transition API |
| Shared-element or layout change | View Transitions (`startViewTransition`) or FLIP by hand |
| Drag, velocity, rubber-banding, spring physics | A real library — and justify the bundle first |

Prefer state-driven classes (`data-[state=open]:…`) over imperative JS. They are
interruptible, they respect the reduced-motion override, and they cost nothing.

## Recipes

Copy-paste starting points for the common cases live in
`references/recipes.md`. Curves, durations, and the reasoning behind them are in
`references/easing.md`.

## Before you call it done

- Throttle the CPU 4–6× in DevTools and repeat the interaction. Still smooth?
- Trigger it, then immediately trigger the reverse. Does it recover, or finish?
- Turn on reduced motion. Is everything still usable and legible?
- Watch the whole page for five seconds without touching it. Anything moving?
  Fix that.
