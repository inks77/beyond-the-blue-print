---
name: frontend-design
description: Design and build interfaces that look designed by a person, not generated. Use when creating or reworking any page, section, or component — layout, typography, colour, spacing, surface, hierarchy. Covers the type scale, the spacing rhythm, colour discipline, composition, and the house rules of this codebase. Pair with `taste` for the critique pass, `motion` for anything that moves, and `impeccable` for the finishing pass.
argument-hint: "[page, section, or component]"
metadata:
  version: "1.0.0"
---

# Frontend design

Interfaces read as machine-made when every decision is the safe average of every
other interface. This skill is the opposite instinct: **decide, then repeat the
decision**. One point of view, applied consistently, beats twelve good ideas
applied once each.

## Before writing any markup

Answer these four in one line each. If you cannot, you are decorating, not
designing.

1. **What is this page for?** The single thing a visitor should do or understand.
2. **What is the one element they see first?** Everything else is subordinate to it.
3. **What is the idiosyncratic move?** The repeated gesture that makes this site
   this site — here, the drafting grid, the hairline rule, `--radius: 0`, the
   mono eyebrow. Name it before you start, and use it at least twice.
4. **What is the real content?** Design around the actual words and pictures.
   Lorem ipsum and "10k+ users" produce layouts that collapse the moment truth
   arrives.

## The rules that do the most work

**Hierarchy is contrast, not size.** Three levels, maximum, per screen. Get them
apart by *kind* — a mono uppercase eyebrow, a large tight-tracked headline, a
comfortable measure of body text — not by nudging `text-lg` to `text-xl`. If two
things are close in weight, one of them should not exist at that level.

**Space is the design.** Space between groups must clearly exceed space within
them. A card whose padding equals the gap between cards has no groups, only
noise. Vertical rhythm outranks horizontal prettiness: get section-to-section
spacing right and the rest follows. See `references/layout.md`.

**Alignment beats decoration.** Everything lines up to a small number of edges.
When something must break the grid, break it far enough to read as deliberate —
a half-step offset looks like a bug, a full-column offset looks like a decision.

**One accent, spent carefully.** The accent colour marks the one action that
matters on a screen. Two accents means neither is one. Every additional colour
must earn its existence by carrying meaning nothing else carries.

**Prefer subtraction.** The strongest edit available at any moment is usually
deletion: a border that duplicates a background change, a shadow under an
element that already has an outline, a heading that repeats the eyebrow, a card
around content that was fine unwrapped. Ship the version with fewer parts.

**Borders or shadows — pick one language.** Mixing hairline borders with soft
elevation on the same surface is the single most common tell of an interface
assembled from tutorials. This project is a borders project. Honour it.

## Typography in one screen

- **Scale**: pick roughly `12 / 14 / 16 / 20 / 28 / 40 / 64` and use those steps
  only. Jumps between adjacent uses should be obvious.
- **Measure**: body copy 60–75 characters. `max-w-md`/`max-w-prose` exist for
  this. Full-bleed paragraphs at `max-w-7xl` are unreadable and unmistakably
  auto-generated.
- **Leading moves opposite to size**: `leading-tight` on display type,
  `leading-relaxed` on small copy. Headlines at `leading-normal` look limp.
- **Tracking**: negative on large type (`tracking-tight`), wide on small
  uppercase (`tracking-[0.2em]`). Never wide-tracked lowercase body text.
- **Weight**: two weights carry a whole site. Semibold everything is a flatline.
- Use `text-pretty` on headings and `text-balance` on short display lines.

Depth: `references/typography.md`.

## Colour in one screen

- Work in tokens, never literals. In this codebase every colour is a CSS
  variable in `app/globals.css`; a raw hex in a component is a bug.
- Build the page from **surfaces**, not from painted boxes: a background, one
  raised or inverted sheet, and a rule colour. Three surfaces are plenty.
- Contrast is a requirement, not a preference: 4.5:1 body, 3:1 large text and UI
  edges, 3:1 focus ring against whatever it lands on.
- Never signal state with colour alone.
- Gradients: only where they do physical work (a scrim over an image, an edge
  fading into a surface). A decorative gradient behind a headline is the
  loudest AI tell there is.

Depth: `references/color-and-surface.md`.

## Composition

Sections should not all have the same shape. If every band is `eyebrow → h2 →
paragraph → three-column grid`, the page reads as a template even when each
band is individually fine. Vary the *structure*: a full-bleed image, a two-column
split with a sticky side, a single wide statement with nothing else in it, a
list that is genuinely a list. Asymmetry, overlap, and things that run off the
edge are how human layouts look; perfect centring everywhere is how generated
ones look.

Depth: `references/layout.md`.

## Working in this codebase

Read `references/this-project.md` before your first change here. Short version:

- Tokens live in `app/globals.css`; `--radius: 0`, brand blue / cream / coral,
  Arial + Courier New. No new colours without a stated reason in a comment.
- The drafting grid (`.blueprint-grid`, `.blueprint-surface`,
  `.blueprint-invert`) is the house gesture. Reuse the utilities; do not
  re-derive the geometry.
- Copy, navigation, programmes, and field notes come from `lib/site.ts`.
  Registration links come from `registerHref()` in `lib/registration.ts`.
  Images come from `lib/images.ts` via `<SiteImage id="…">` — never a raw path.
- Non-obvious decisions get a comment saying *why*, in the voice already used
  throughout `globals.css` and the components. That commentary is part of the
  house style.

## Order of work

1. Structure in plain HTML, real content, no styling.
2. Typography and spacing until it reads correctly in black and white.
3. Surfaces and the single accent.
4. States and edges — `impeccable`.
5. Motion, last and sparingly — `motion`.
6. Critique pass — `taste`, and run `node .claude/skills/taste/scripts/design-lint.mjs`.

Steps 1–2 are where the design happens. Anything that only looks good after
step 3 is not designed.
