# Recipes

Starting points for this stack — Tailwind v4, `@base-ui/react`, no animation
library. Every one is CSS-driven, interruptible, and already respects the global
`prefers-reduced-motion` override in `app/globals.css`.

## Curves as Tailwind v4 theme values

Add once, in `app/globals.css`, so they are usable as `ease-out-quad` etc.:

```css
@theme inline {
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

## Press feedback

The cheapest motion in the whole interface, and the one that does the most for
perceived quality. One frame of acknowledgement.

```tsx
className="transition-transform duration-100 ease-out active:translate-y-px"
```

`components/ui/button.tsx` already does this. Prefer `translate-y-px` over
`scale` for square, blueprint-flavoured elements — scale on a sharp-cornered box
reads as a wobble.

## Hover on a link or nav item

Animate the underline, not the text. Moving text on hover is unpleasant and
causes reflow.

```tsx
className="underline decoration-transparent decoration-2 underline-offset-4
           transition-colors duration-150 ease-out hover:decoration-accent"
```

Name the property (`transition-colors`), never `transition-all`.

## Enter/exit with `@base-ui/react`

Base UI exposes transition state as data attributes, so the whole animation is
CSS and stays interruptible:

```tsx
<Popover.Popup
  className="origin-[var(--transform-origin)] transition-[transform,opacity]
             duration-200 ease-out-expo
             data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0
             data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0
             data-[ending-style]:duration-150"
/>
```

Three things to notice, and to reproduce anywhere:

- `transform-origin` comes from the anchor, so the popup grows *out of* its
  trigger (rule 5).
- Scale is `0.98`, not `0.9`.
- The exit is shorter than the enter.

## Dialog

```css
.dialog-backdrop {
  transition: opacity 200ms var(--ease-out-quad);
}
.dialog-panel {
  transition:
    opacity 200ms var(--ease-out-quad),
    transform 200ms var(--ease-out-quad);
}
.dialog-panel[data-starting-style],
.dialog-panel[data-ending-style] {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
```

Do not animate `filter: blur()` on the backdrop. A static `backdrop-filter` that
is present for the whole open state is affordable; animating it is not.

## Drawer / bottom sheet

```css
.sheet {
  transition: transform 350ms var(--ease-drawer);
}
.sheet[data-state='closed'] {
  transform: translateY(100%);
}
```

If the sheet is draggable, the drag itself must be a direct 1:1 `translate` with
no transition, and the transition class is only applied on release. Applying a
transition during a drag makes the sheet lag the finger — the most common way
gesture UIs feel broken.

## Accordion / disclosure height

Height is a layout property. Use the modern primitives rather than measuring in
JS:

```css
.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms var(--ease-out-quad);
}
.panel[data-open] { grid-template-rows: 1fr; }
.panel > div { overflow: hidden; }
```

`interpolate-size: allow-keywords` with `height: auto` is the newer route; the
grid trick has wider support today. Either beats a `useLayoutEffect` that reads
`scrollHeight`.

## Route transitions

```ts
if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.startViewTransition(() => update())
} else {
  update()
}
```

Keep it to a crossfade unless there is a genuine shared element. A slide on
every navigation gets old by the third page.

## Video and autoplaying media

The pattern already used in `components/hero.tsx`, and the correct one:

- **No `autoPlay` attribute.** It ships in the server HTML and the browser acts
  on it at parse time, long before hydration can run a reduced-motion guard.
- Start playback from an effect that reads the media query.
- Subscribe to `change` on the query so a visitor who flips the setting is
  honoured without a reload.
- `poster` covers the gap, `muted playsInline` for autoplay policy,
  `preload="metadata"` so it does not cost bandwidth it may never need.

## Scroll-linked effects

Prefer `animation-timeline: scroll()` / `view()` over a scroll listener — it runs
off the main thread and cannot jank. But re-read rule: most scroll animation
should not exist. A progress bar, a sticky header that compacts once: fine. Every
section fading up: no.

If you must use IntersectionObserver, make the initial state *visible* and let
the observer add the animated class, so the content is readable with JS
disabled and to a crawler.
