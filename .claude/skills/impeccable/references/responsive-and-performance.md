# Responsive edges and performance

## Widths to check

| Width | Why |
| --- | --- |
| 320px | Smallest phone still in real use; where layouts break first |
| 375px | The common phone |
| 768px | The awkward middle — usually the least-tested and most-broken width |
| 1024px | Small laptop / landscape tablet |
| 1440px | The design mock |
| 2560px | Does anything stretch absurdly, or is the container capped? |

Plus 200% zoom, which WCAG requires and which behaves like a narrower viewport
with larger text — often exposing a different set of failures.

## Breakpoints belong to the content

Add a breakpoint at the width where the layout stops working, not at a device
name. Design narrow first: the small screen forces the hierarchy to be real,
and widening is easier than salvaging.

## The recurring breakages

- **Horizontal scroll on the body.** Almost always one element with a fixed
  width, a negative margin, or a `100vw` that ignores the scrollbar. Wide
  content scrolls in its *own* `overflow-x: auto` container.
- **Flex children refusing to shrink.** `min-width: auto` is the default;
  `min-w-0` is the fix.
- **Long unbroken strings** — URLs, emails, IDs, hashes. `break-words`,
  `hyphens-auto`, or `truncate` with the full value still reachable.
- **Sticky elements** that cover content on short viewports, or whose offset
  ignores the header.
- **`100vh` on mobile**, which excludes the browser chrome. Use `100dvh`.
- **Fixed headers** with no matching scroll padding — anchors land under them.
  `scroll-padding-top` on the scroll container.
- **Text over images** legible at one width and unreadable at another. Test the
  scrim at every width.
- **Reordering with `order`/`grid-area`**, which desynchronises visual and DOM
  order and breaks keyboard flow.

## Performance the user actually feels

Three things, in order of impact:

1. **Layout shift.** Every image and embed gets explicit dimensions or an aspect
   ratio. Fonts get `font-display: swap` and are preloaded. Data arriving must
   not reflow the page — reserve the space in the loading state.
2. **JavaScript shipped.** In the App Router, `'use client'` marks a boundary,
   and everything imported below it goes to the browser. Push the boundary to the
   leaf: this project keeps the header, hero, and forms client-side and
   everything else on the server. Check the bundle before adding a dependency —
   an animation library for one fade is a bad trade.
3. **Main-thread work.** Animate only `transform` and `opacity`. Prefer CSS and
   scroll-driven animations over scroll listeners. Do not read layout
   (`offsetHeight`, `getBoundingClientRect`) and write to it in the same frame.

## Images

- Explicit `width`/`height` from the real file, always.
- Modern formats, correctly sized, with `sizes` matching the layout so the
  browser does not fetch a 2000px file for a 400px column.
- `priority` only for what is genuinely above the fold — marking everything
  priority means nothing is.
- `loading="lazy"` for the rest.
- In this project every image is declared in `lib/images.ts` with its real pixel
  size, and `pnpm check:images` fails the build if the declaration and the file
  disagree. That check is why a broken frame cannot ship; do not route around it
  with a raw path.

## Measuring

- Throttle to 4–6× CPU slowdown and "Fast 3G" in DevTools. That is a real
  mid-range Android on a real network.
- Lighthouse on a production build, not `next dev`.
- Watch CLS and INP specifically — they are the two the user feels as
  "janky" and "unresponsive", and they are the two most often ignored.
