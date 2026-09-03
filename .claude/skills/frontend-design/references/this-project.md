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

## Type

Two families, loaded by `next/font` in `app/layout.tsx` and self-hosted — no
third-party font request on any route.

- **Archivo** (`--font-sans`) — a grotesque with a real 900. Every display line
  is `font-black uppercase` at negative tracking; a stack without a drawn 900
  makes a heading and a subhead render at the same weight.
- **IBM Plex Mono** (`--font-mono`, weights 400/500/600) — the annotations:
  eyebrows, drawing numbers, the `Kampala / Uganda` mark.

`.font-black.uppercase` carries a `word-spacing` of `0.06em` in `globals.css`.
Negative tracking closes word spaces along with letter spaces, and Archivo's
space is narrower than the Arial the tracking values were originally set
against. Do not remove it and do not re-tune the tracking to compensate.

## Tokens

All in `app/globals.css` under `:root` and `@theme inline`.

| Token | Value | Notes |
| --- | --- | --- |
| `--brand-blue` | `#154e91` | Matched to the colour-managed backdrop of `public/btb-logo.mp4`. Do not "correct" it. |
| `--background` | warm cream | The sheet |
| `--accent` | coral | The one "go" colour — actions only. A **fill**: 2.42:1 on the sheet, so never small type on cream. |
| `--accent-ink` | coral as type | The same hue at a lightness that reads as type. Darkened on cream, lifted on blue by `.blueprint-invert`. |
| `--destructive` | deep red | Exists because coral means go; errors need their own hue |
| `--focus-ring` | darkened accent | Re-pointed to `--accent-ink` on blue surfaces so 3:1 holds on both |
| `--radius` | `0rem` | Square. Always. |

Coral is two tokens because a fill and a piece of type are not the same colour.
`bg-accent` for the fill, `text-accent-ink` for coral type — and `text-accent`
only where the surface is the near-black `--accent-foreground`.

Rules: no raw hex in components; derive with `color-mix()` or an alpha suffix;
if you must add a token, add the comment explaining why alongside it, in the
voice the file already uses. Every colour value in `:root` is checked to be
inside the sRGB gamut — an `oklch()` that asks for more chroma than the gamut
holds is silently re-mapped by the browser, which means the palette gets picked
by the gamut-mapper instead of by you.

**Anything global in `globals.css` goes in a layer.** Unlayered CSS outranks
every layer whatever the selector, so a bare `* { … }` or `.eyebrow { … }` beats
the utilities it is supposed to be a default for. `* { border-color }` is in
`@layer base`, `.eyebrow` in `@layer components`. Both were unlayered once and
both silently overrode every per-surface colour on the site.

Alpha copy on the coloured sheets is measured against the surface, not guessed:
`/70` is the first step that clears 4.5:1 on blue, `/75` the first on coral.

## The grid utilities

- `.blueprint-grid` — the line geometry (24px minor, 120px major), driven by
  `--bp-line` / `--bp-line-strong`.
- `.blueprint-surface` + a `.blueprint-layer.blueprint-grid` child — a coloured
  band that paints its own contained grid on top of its fill.
- `.blueprint-invert` — the token set for anything on a blue sheet: white-alpha
  lines, and `--accent-ink` / `--focus-ring` re-pointed for the surface. It
  paints nothing on its own, so a flat blue band takes it too (`impact-band`
  does) purely to get the tokens right.
- Coral surfaces take no grid at all — the accent stays flat.
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
