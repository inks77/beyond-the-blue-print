# Layout and composition

## Spacing is a rhythm, not a value

Use one scale — 4/8-based is standard — and let the *ratios* carry the structure:

```
4   inside a control
8   between a label and its field
12  between related lines
16  inside a card
24  between cards
48  between a heading and its content
80  between sections (mobile)
128 between sections (desktop)
```

The rule that matters: **the gap between groups must be visibly larger than the
gap inside them.** Proximity is the strongest grouping cue there is; it outranks
borders, backgrounds, and cards. When a layout feels muddy, the fix is almost
never another divider — it is increasing one gap and decreasing another.

Uniform 16px everywhere is the spacing signature of generated layouts. It is not
wrong so much as it is silent.

## Vertical rhythm

Section spacing is the skeleton of a long page. Set it once, at two or three
breakpoints, and apply it everywhere. A page whose sections breathe differently
for no reason reads as assembled rather than composed.

Give at least one section on a long page *much* more air than the others — a
single statement, a full-bleed image, a quote with nothing around it. Uniform
density is exhausting and flat.

## Grids and containers

- One container width and one gutter, defined once. Here: `mx-auto w-full
  max-w-7xl px-5 md:px-8 lg:px-10`.
- Break the container deliberately: a full-bleed surface, an image that runs to
  the viewport edge, a rule that spans the whole width. The contrast between
  contained and full-bleed is a large part of what makes a page feel designed.
- Columns: 12 is conventional, but the useful move is *unequal* splits — 7/5,
  8/4, 5/7 — rather than 6/6 forever. Symmetry is the default; asymmetry is a
  decision.
- Do not centre everything. Left-aligned text with a ragged right edge is easier
  to read and looks intentional; centred body copy over three lines does not.

## Composition moves worth having in hand

- **Sticky sidebar against a scrolling column.** Good for programmes, docs, long
  forms.
- **A statement band.** One sentence, huge, on an inverted surface, with nothing
  competing. Cheap to build, does enormous work.
- **Overlap.** A picture that crosses a surface boundary, a card that hangs off a
  band's edge. One overlap per page is plenty; it reads as craft.
- **A real list.** Numbered, hairline-separated rows beat three cards for
  anything with more than three items or with items of unequal length.
- **Editorial split.** Small mono label in a narrow left column, content in a
  wide right column. Consistent, scannable, and unmistakably drafted.

## Cards: use fewer

Cards are the default because they are safe: uniform boxes hide unequal content.
That is exactly the problem. Before adding a card, ask what the border and
padding are doing that whitespace and alignment could not. Content on the ground
plane, separated by space and hairlines, is almost always calmer and always looks
less generated.

If you do use cards: identical padding, identical radius, identical border
treatment, and content of genuinely similar shape. Ragged card grids where one
card has four lines and another has one are worse than a list.

## Responsive

Design the *narrow* layout first — it forces the hierarchy to be real. Then let
the layout change shape at the point where it stops working, not at a device
name. Breakpoints belong to the content.

Things that must be checked at every width:

- Long words and long names do not overflow (`min-w-0`, `break-words`).
- Tables scroll in their own container; the page body never scrolls sideways.
- Touch targets are ≥44px in their *margin* box (the negative-margin/padding
  trick in `site-header.tsx` shows how to do this without moving the icon).
- The order of content in the DOM matches the visual order — reordering with
  flex/grid breaks keyboard and screen-reader flow.

## In this codebase

`max-w-7xl`, gutters `px-5 md:px-8 lg:px-10`, `--radius: 0`, hairline rules
in `border-border` (or `border-primary-foreground/30` on the blue sheet). The
drafting grid is continuous behind the whole page — layouts that align to its
24px minor / 120px major lines will feel correct for reasons the visitor cannot
name. That is the point.
