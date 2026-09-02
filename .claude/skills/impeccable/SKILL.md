---
name: impeccable
description: The finishing pass that separates a demo from something shipped — every state, every input modality, every width, every failure. Use before calling any interface done, when reviewing a UI change, or when something works in the happy path but has not been tested empty, loading, failing, long, keyboard-only, or offline. Covers states, accessibility, responsive edges, forms, and front-end performance.
argument-hint: "[component, page, or flow]"
metadata:
  version: "1.0.0"
---

# Impeccable

Most interfaces are built for one state — populated, successful, in English, at
1440px, with a mouse — and everything outside it is discovered by users. This
pass is the systematic walk through everything outside it.

`taste` asks whether it is good. **`impeccable` asks whether it is finished.**

## Every state, every time

For every component that shows data or accepts input, all seven exist whether or
not you designed them:

| State | The question |
| --- | --- |
| **Empty** | First run, nothing yet. Does it explain what goes here and how to start? An empty state is the best onboarding surface you have; a blank box is a dead end. |
| **Loading** | Under ~300ms show nothing — a flashed spinner is worse than a pause. Longer: a skeleton with the *same geometry* as the content, so nothing jumps when it arrives. |
| **Partial** | Some data, some still coming. Does the layout hold? |
| **Populated** | The designed case. |
| **Overflowing** | 200 items, a 60-character unbroken word, a name in a script with tall ascenders, a number with nine digits. |
| **Error** | Says what went wrong, in the user's terms, and what to do next. Never a status code alone. Never loses what they typed. |
| **Disabled / read-only** | Visibly different, still 3:1 legible, and it says *why* it is disabled. |

A component that only handles "populated" is a mock.

## Interaction states on every interactive element

`default → hover → focus-visible → active → disabled`, plus `selected`/`open`
where they apply.

- **`:focus-visible`, never `:focus`** — mouse users should not see rings, and
  keyboard users must.
- Never remove an outline without replacing it. `outline: none` with nothing
  after it is the most damaging single line in front-end CSS.
- The focus indicator needs 3:1 against **every** surface it can appear on. This
  project solves that by re-pointing `--focus-ring` inside `.blueprint-invert`;
  do the same rather than lowering the bar.
- Hit targets ≥44×44px in the margin box. Grow with padding and cancel with a
  negative margin so the painted position does not move — see
  `components/site-header.tsx`.
- Hover-only affordances do not exist on touch. Anything reachable only by hover
  needs a second route.

## Keyboard and screen reader

Walk the page with Tab, Shift+Tab, Enter, Space, Escape, and the arrow keys, and
nothing else:

- [ ] Focus order matches visual order. Reordering with `flex`/`grid` breaks
      this; fix the DOM, not the tab index.
- [ ] Focus is always visible and never lost — after a dialog closes it returns
      to the trigger.
- [ ] Escape closes anything overlaid; focus is trapped while a modal is open.
- [ ] No keyboard trap anywhere.
- [ ] A skip link is the first focusable element.
- [ ] Nothing interactive is a bare `<div>` with an `onClick`.

Semantics:

- [ ] One `<h1>`; headings descend without skipping levels.
- [ ] Landmarks: `header`, `nav`, `main`, `footer`, and `aria-label` on any that
      repeats.
- [ ] Every image has alt text that carries its *meaning*; decorative images get
      `alt=""` or `aria-hidden`.
- [ ] Icon-only buttons have an accessible name.
- [ ] Live regions announce async changes (form results, toasts).
- [ ] Language set on `<html>`.

Depth: `references/accessibility.md`.

## Forms

Forms are where unfinished interfaces cause real damage.

- Labels are `<label>` elements, always visible. Placeholders are not labels.
- Validate on blur and on submit, never on every keystroke of a field not yet
  completed.
- Errors sit next to the field, are linked with `aria-describedby`, set
  `aria-invalid`, and are announced.
- Submitting disables the button *and* says what is happening; a double-submit
  must not create two records.
- Failure never clears the form.
- Correct `type`, `inputMode`, `autoComplete`, and `enterKeyHint` on every input.
- Success is a state change the user can see, not a silent return.

`components/registration-form.tsx` and `app/register/actions.ts` are the
reference implementation here — including what happens when the webhook is not
configured or is unreachable.

## Responsive and content edges

- 320px, 375px, 768px, 1024px, 1440px, and one very wide viewport.
- Zoom to 200% — WCAG requires it to remain usable.
- No horizontal scroll on the body. Wide things (tables, code, diagrams) scroll
  inside their own `overflow-x: auto`.
- Long, unbroken strings (URLs, emails, IDs) do not blow out the layout:
  `min-w-0` on the flex child, `break-words` on the text.
- Real names, long titles, and missing optional fields all render correctly.
- Test with the longest and the shortest content you will actually have.

Depth: `references/responsive-and-performance.md`.

## Media and assets

- Every image has explicit `width`/`height` or an aspect ratio — layout shift is
  a bug, and CLS is measured.
- Only genuinely above-the-fold images get `priority`; everything else is lazy.
- Autoplaying video is `muted playsInline`, gated on `prefers-reduced-motion`
  from an effect rather than the `autoPlay` attribute, and has a `poster`.
- Missing assets fail loudly at build, not silently in production. Here that is
  `pnpm check:images`, which runs in `prebuild` — add the image to
  `lib/images.ts`, never a raw path.

## Performance that users feel

- Ship as little JavaScript as the page needs. `'use client'` only where there
  is state, an effect, or a handler; push it to the leaf.
- No layout shift on load, on font swap, or on data arrival.
- Fonts: self-hosted, subset, preloaded, `font-display: swap`.
- Nothing animates outside `transform`/`opacity` — see the `motion` skill.
- Check on a throttled CPU and a slow network, not on the dev machine.

## Before you say it is done

```bash
pnpm check:images
node .claude/skills/taste/scripts/design-lint.mjs
pnpm build
```

Then, by hand: tab through it, turn on reduced motion, drop to 320px, empty the
data, break the network, and paste in a 200-character string. If you have not
seen those six, it is not done — it is untested.
