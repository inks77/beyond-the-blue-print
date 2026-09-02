# Typography

Type is the largest surface area in almost every interface. Most of what reads as
"designed" or "generated" is decided here.

## Build a scale, then obey it

Pick a set of steps and use only those steps. A modular scale (ratio ~1.25 for
dense UI, ~1.333 for editorial) or a hand-tuned list both work; what matters is
that adjacent uses are *visibly* different.

```
12  eyebrow / meta / legal
14  UI label, dense body
16  body
20  lead paragraph, section intro
28  section heading
40  page heading
64+ display
```

Two rules that follow from having a scale:

- **Never invent a step mid-page.** `text-[17px]` because 16 felt small means the
  scale is wrong, not that this one element is special.
- **Skip steps for emphasis.** Body 16 next to heading 20 is a nothing-jump.
  16 next to 40 is a hierarchy.

## Measure

- Body copy: 60–75 characters per line. Roughly `max-w-md` to `max-w-2xl`
  depending on size.
- Display type can run wider — it is scanned, not read — but rarely past
  `max-w-4xl`.
- A paragraph inside a `max-w-7xl` container with no measure constraint is the
  most common typographic failure in generated layouts.

## Leading

Inverse to size, always:

| Size | Leading |
| --- | --- |
| Display 40–72 | 0.95–1.1 (`leading-none`/`leading-tight`) |
| Heading 24–32 | 1.15–1.25 |
| Body 16 | 1.5–1.6 |
| Small 12–14 | 1.4–1.5 |

Tight leading on small text is unreadable; loose leading on display type looks
unfinished.

## Tracking

- Display: `-0.02em` to `-0.03em`. Large type at default tracking looks loose.
- Body: leave it alone.
- Small uppercase labels: `0.12em`–`0.22em`. This is the only place wide
  tracking belongs, and it is a signature of this site's eyebrows.
- Never track out lowercase running text.

## Weight and style

- Two weights is a complete system: a regular for reading, a semibold or bold
  for structure. Reach for a third only when it carries meaning.
- Uppercase is a *labelling* device — eyebrows, small buttons, meta. Uppercase
  paragraphs are hostile.
- Italics for genuine emphasis and titles, not for decoration.
- Numerals in tables and stats: tabular figures (`font-variant-numeric:
  tabular-nums`) so columns line up and counters do not jitter.

## Details that separate finished from nearly

- `text-wrap: balance` on short headlines (Tailwind `text-balance`), `pretty` on
  paragraphs and long headings (`text-pretty`).
- Hyphenation off for headlines, fine for justified body — but do not justify
  body text on the web without hyphenation.
- Optical alignment: a large quote mark or a bulleted list should hang into the
  margin so the *text* aligns, not the punctuation.
- One space after a full stop. Real apostrophes and quotes (`’ “ ”`), real
  dashes (– —), real ellipsis (…).
- Never let a heading wrap to leave a single orphan word. Fix with
  `text-balance`, a `<br>` at a chosen breakpoint, or shorter copy — usually
  shorter copy.

## Fonts

- Fewer families. One is a stance; two is a system; three is a mess.
- Pair by contrast of *kind*, not of taste: a grotesk with a mono, a serif with a
  grotesk. Two similar sans-serifs read as a mistake.
- System and web-safe stacks are not a compromise — they are instant, never
  shift, and this project uses Arial/Courier deliberately. If you add a webfont,
  it must be self-hosted, subset, `font-display: swap`, and preloaded, or it will
  cost more than it gives.

## In this codebase

`--font-sans: 'Arial', 'Helvetica Neue', sans-serif` and `--font-mono: 'Courier
New', monospace`. The mono is the voice of the drafting sheet: eyebrows, meta,
coordinates, numbering. The `.eyebrow` utility in `app/globals.css` already
encodes the label treatment — use it rather than re-typing
`font-mono text-xs uppercase tracking-[0.2em]`.
