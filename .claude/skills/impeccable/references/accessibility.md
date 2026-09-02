# Accessibility

Not a compliance chore. It is the same discipline as the rest of this pass:
build for every user, not the one in the mock. Almost everything below also
makes the interface better for people with no impairment at all.

## The five-minute audit

Do these in order; they find most of what is wrong.

1. **Unplug the mouse.** Tab through the whole page. Can you reach and operate
   everything? Can you always see where you are?
2. **Zoom to 200%.** Still usable, nothing clipped, no horizontal scroll?
3. **Emulate achromatopsia** (DevTools → Rendering). Is any information now lost?
4. **Turn on reduced motion.** Is anything still moving that should not be?
5. **Read the accessibility tree** (DevTools → Elements → Accessibility). Does
   each control have a sensible name and role, or is it "button, button, button"?

## Semantics first

Native elements bring focus, keyboard behaviour, and announcement for free. ARIA
is a patch for when there is no native element — the first rule of ARIA is not to
use it.

- `<button>` for actions, `<a href>` for navigation. A `div` with `onClick` is
  not reachable by keyboard, has no role, and does not respond to Enter/Space.
- `<label for>` or a wrapping `<label>`. Placeholder text disappears on input and
  is not a label.
- Lists as `<ul>`/`<ol>`, tables as `<table>` with `<th scope>`.
- Landmarks: one `<main>`, plus `<header>`, `<nav>`, `<footer>`. Label repeated
  landmarks (`aria-label="Main navigation"`).
- Heading levels descend without skipping; do not pick a level for its size.

## Names

Every control needs a name a screen reader can read:

- Icon-only buttons: `aria-label`, or visually-hidden text.
- Link text says where it goes. Five "Read more" links are five identical
  destinations to a screen reader.
- Images: alt text carries the *meaning in this context*, not a description of
  pixels. Decorative images take `alt=""`. In this project alt text lives with
  the image in `lib/images.ts`, so it is written once and cannot drift.
- Form fields: label, plus `aria-describedby` for hints and errors.

## Focus

- `:focus-visible` for the ring; never `outline: none` without a replacement.
- 3:1 contrast against every surface the ring can land on.
- `outline-offset` so the ring is not swallowed by the element's own edge.
- After a dialog or menu closes, focus returns to the element that opened it.
- Focus is trapped inside an open modal, and Escape closes it.
- Skip link first in the DOM, visible when focused (see
  `components/site-header.tsx`).

## Announcing change

- `aria-live="polite"` for status, `assertive` only for genuine urgency.
- The live region must exist in the DOM *before* the message goes into it.
- Route changes in a single-page app need an announcement and a focus move —
  the browser does not do it for you.

## Motion and vestibular safety

`prefers-reduced-motion: reduce` means remove travel, scale, parallax, and
autoplaying loops. Keep opacity changes and instant state changes: feedback still
matters. This project's global override in `app/globals.css` handles transitions
and animations; anything driven by JS must check the query itself, and listen for
changes rather than reading it once — as `components/hero.tsx` does.

## Colour and contrast

| | Minimum |
| --- | --- |
| Body text | 4.5:1 |
| Large text (≥24px, ≥19px bold) | 3:1 |
| Icons and UI boundaries carrying meaning | 3:1 |
| Focus indicator | 3:1 vs adjacent |

Never colour alone: pair with an icon, a label, a weight, or a shape. Check
against every surface, not just the default one.

## Touch and pointer

- ≥44×44px targets, measured on the margin box.
- Adequate spacing between adjacent targets.
- No hover-only affordances.
- Gestures have a non-gesture equivalent.

## What automation cannot tell you

axe, Lighthouse, and friends catch perhaps a third of real problems: contrast,
missing names, bad ARIA. They cannot tell you that the focus order is nonsense,
that the alt text is wrong, that the error message is unhelpful, or that the
skeleton does not match the content. The keyboard walk is not optional.
