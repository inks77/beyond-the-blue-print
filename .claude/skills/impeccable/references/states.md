# States

## The matrix

Every data-bearing component × every state. Fill it in before building, not
after shipping.

| | Empty | Loading | Populated | Overflowing | Error |
| --- | --- | --- | --- | --- | --- |
| List / grid | | | | | |
| Detail page | | | | | |
| Form | | | | | |
| Search | | | | | |

Cells you cannot describe in a sentence are cells the user will discover for
you.

## Empty

The most-skipped and highest-value state. A good empty state has three parts:

1. **What belongs here**, in one line.
2. **Why it is empty** — nothing yet, or nothing matched.
3. **The one action** that fills it.

Distinguish *never had any* from *filtered to none*. They need different copy and
different actions ("Add your first…" vs "Clear filters"). Do not illustrate an
empty state with a large graphic that pushes the action below the fold.

## Loading

- **< 300ms**: show nothing. A spinner that flashes makes the app feel slower
  than a brief pause does.
- **300ms – 2s**: a skeleton whose geometry matches the real content. Skeletons
  that do not match cause a visible jump when the data lands, which is worse than
  the spinner they replaced.
- **> 2s**: say what is happening, and give a way out.
- Preserve layout. Reserving the space is the whole point.
- Never block the entire page for a change to one region.
- Optimistic updates where the operation almost always succeeds and is
  reversible — and a real path back when it does not.

## Error

Three questions, answered in the user's language:

1. What happened? ("We could not save your registration.")
2. Whose problem is it? (theirs to fix, or ours)
3. What now? (retry, edit, or contact — with the control right there)

Rules:

- Never show a raw status code, stack trace, or exception message as the whole
  message.
- Never lose user input on failure.
- Distinguish offline / timeout / rejected / server error — each has a different
  action.
- Failures that need attention go to a live region so a screen reader announces
  them.
- Log the full detail server-side even when the user sees the friendly version,
  so nothing is lost. `app/register/actions.ts` does exactly this.

## Overflow

The state that breaks layouts in production and never in development:

- 200 rows where you designed 3.
- A single 60-character word with no spaces.
- A name in a script with tall ascenders or a right-to-left language.
- Nine-digit numbers in a column sized for three.
- An optional field that is missing.
- A title that is one word, and a title that is forty.

Fixes: `min-w-0` on flex children, `break-words` / `hyphens-auto` on text,
`line-clamp-*` with the full text still reachable, `overflow-x-auto` on the
element rather than the page, `tabular-nums` on figures.

## Disabled

- Disabled must be visually distinct *and* still meet 3:1 — greying out to
  invisibility is a failure, not a style.
- Say why. A disabled submit with no explanation is a dead end; a hint ("add an
  email address to continue") is not.
- Prefer enabled-with-validation over disabled: let them press it and tell them
  what is missing. Disabled controls are not focusable, so keyboard and screen
  reader users cannot discover why.

## Success

- Something must visibly change. A form that returns to its initial state looks
  broken.
- Confirm in place where possible; a full-page confirmation loses context.
- Undo beats a confirmation dialog for anything reversible.
- Do not dismiss a success message so fast it cannot be read — and do not leave
  it forever.
