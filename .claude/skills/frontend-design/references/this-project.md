# Beyond the Blue Print — house style

Read this before the first change. It is what "consistent with the site" means
here, in specifics.

## The idea

A drafting sheet. Everything follows from that: a continuous blueprint grid
behind the page, square corners, hairline rules, mono labels that read like
annotations, and copy that sounds like it was written by people who build things.
The design is not "clean modern startup" — it is a technical drawing that
happens to be a website. Every new section should be able to answer *how does
this belong on the sheet?*

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (CSS-first config,
no `tailwind.config`), `@base-ui/react` primitives, `lucide-react` icons,
`tw-animate-css`. No animation library is installed — see the `motion` skill for
what that means in practice.

## Tokens

All in `app/globals.css` under `:root` and `@theme inline`.

| Token | Value | Notes |
| --- | --- | --- |
| `--brand-blue` | `#154e91` | Matched to the colour-managed backdrop of `public/btb-logo.mp4`. Do not "correct" it. |
| `--background` | warm cream | The sheet |
| `--accent` | coral | The one "go" colour — actions only |
| `--destructive` | deep red | Exists because coral means go; errors need their own hue |
| `--focus-ring` | darkened accent | Re-pointed to `--accent` on blue surfaces so 3:1 holds on both |
| `--radius` | `0rem` | Square. Always. |

Rules: no raw hex in components; derive with `color-mix()` or an alpha suffix;
if you must add a token, add the comment explaining why alongside it, in the
voice the file already uses.

## The grid utilities

- `.blueprint-grid` — the line geometry (24px minor, 120px major), driven by
  `--bp-line` / `--bp-line-strong`.
- `.blueprint-surface` + a `.blueprint-layer.blueprint-grid` child — a coloured
  band that paints its own contained grid on top of its fill.
- `.blueprint-invert` — white-alpha lines for blue sheets; also re-points
  `--focus-ring`.
- `.blueprint-on-accent` — lines for coral surfaces.
- `body::before` — the fixed global sheet behind everything.

Never re-derive the gradients. Compose the utilities. Both the global layer and
`.blueprint-layer` are hidden under `prefers-reduced-transparency` and in print.

## Paint order on the hero

Documented in `globals.css` and worth not breaking: surface fill < `.hero-plate`
(logo video) < `.blueprint-layer` < `.hero-copy`. The grid runs *across* the
video so its rectangle dissolves, and `.hero-plate::after` fades the surface
colour back over the video's outer band. Anything added to the hero needs a
place in that ladder.

## Content sources — never hardcode

| What | Where |
| --- | --- |
| Site name, tagline, description, nav, programmes, field notes, socials | `lib/site.ts` |
| Every image and video | `lib/images.ts`, rendered via `<SiteImage id="…">` / `getVideo()` |
| Register/propose/partner/book links | `registerHref()` in `lib/registration.ts` |
| Form submission | `app/register/actions.ts` |

Images are guarded: `pnpm check:images` runs in `prebuild` and fails the build if
a declared image is missing from `public/` or its declared pixel size is wrong.
An entry can be `status: 'pending'` with an `awaiting` note — the page then draws
a labelled placeholder at the right aspect ratio instead of a broken frame.

## Component conventions

- Server components by default; `'use client'` only where there is state, an
  effect, or an event handler (`hero`, `site-header`, the forms, the explorer).
- `cn()` from `lib/utils.ts` for class composition.
- Class order roughly: layout → box → typography → colour → state → responsive.
- Comments explain **why**, not what — the negative-margin touch target, the
  missing `autoPlay`, the reason a social link is absent. Match that register:
  plain, specific, no hedging. This commentary is part of the house style; a PR
  that adds a non-obvious rule without one is incomplete.
- Prose in comments and copy uses `--` where the file already does; do not
  introduce em-dash-heavy marketing prose.

## Voice

Direct, concrete, Ugandan and specific. "Kampala / Uganda. Building in public."
Not "Empowering the next generation of visionary founders." If a sentence could
appear on any startup site in the world, it is wrong for this one.

## Checks before you push

```bash
pnpm check:images                                   # build-blocking
node .claude/skills/taste/scripts/design-lint.mjs   # advisory
pnpm build
```
