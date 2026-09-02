# Colour and surface

## Think in surfaces, not colours

A page is a small number of planes with things sitting on them. Decide the planes
first:

- **Ground** — the page background, the default.
- **Raised or inset** — a card, a panel, a well. One step of separation, made by
  *one* device: a hairline, a fill change, or elevation. Not all three.
- **Inverted** — a full-bleed sheet in the brand colour that resets every
  foreground token inside it.

Three planes handle almost any page. When you find yourself needing a fourth,
what you actually need is more space.

## Tokens, never literals

Every colour is a variable with a name that says its *role* (`--muted-foreground`,
`--focus-ring`), not its appearance (`--light-gray-2`). A component that names a
hex has broken the system: a theme change now has to find it.

Two consequences worth internalising:

- Derive related colours from the token (`color-mix(in srgb, var(--primary) 8%,
  transparent)`, `text-primary-foreground/70`) so re-pointing the token
  re-colours everything downstream.
- On an inverted surface, re-point the tokens for the subtree rather than
  overriding colours per element. `app/globals.css` does exactly this with
  `.blueprint-invert`.

## Contrast is a constraint, not an aesthetic

| Thing | Minimum |
| --- | --- |
| Body text | 4.5:1 |
| Large text (≥24px, or ≥19px bold) | 3:1 |
| Icons and UI boundaries that carry meaning | 3:1 |
| Focus indicator vs. its surroundings | 3:1 |

Check against **every** surface a token can land on — a ring that passes on the
page background and fails on the accent button is still a failure. When one value
cannot clear both, re-point the token per surface and say so in a comment. That
is what `--focus-ring` does here.

Colour is never the only carrier of meaning: pair it with an icon, a label, a
weight change, or a shape.

## Using the accent

The accent exists to answer "where do I go next?". Rules:

- One accent element per viewport, ideally per section.
- The accent is for *action*, not for decoration or for headings.
- If the accent is also your error colour, you have no error colour. This
  project's `--destructive` exists precisely because coral means "go".
- Accent on accent (accent text on an accent fill) needs its own contrast check.

## Gradients, shadows, blur

Use when they do a physical job:

- A scrim gradient so text over a photograph stays legible.
- An edge gradient that fades a surface into the one behind it (see
  `.hero-plate::after`, which dissolves the video's rectangle into the sheet).
- A shadow that communicates a real z-relationship — a menu floating over
  content.

Do not use them as texture. A gradient behind a headline, a glow around a card,
`backdrop-blur` on a panel over a blurred blob: these are ornament pretending to
be design, and they are the fastest way to make a page look generated.

## Dark mode

- A dark theme is not an inversion. Backgrounds lift toward a dark grey rather
  than pure black; foregrounds drop from pure white; saturated hues need
  lightness and chroma adjustment or they vibrate.
- Elevation reverses: raised surfaces get *lighter*, not shadowed.
- If the project does not ship dark mode (this one sets `color-scheme: light`
  deliberately), do not half-add it. A half-supported theme is worse than none.

## In this codebase

Read the comments in `app/globals.css` before touching a colour — the brand blue
is matched to the colour-managed backdrop of the hero video, and `--destructive`
and `--focus-ring` both exist for contrast reasons that are documented inline. If
you change one, update the reasoning with it.
