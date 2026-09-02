# Beyond the Blue Print

A Next.js 16 / React 19 / Tailwind v4 site for a Kampala business hub. The design
idea is a **drafting sheet**: a continuous blueprint grid behind every page,
square corners, hairline rules, mono annotations, and copy written by people who
build things.

## Design work goes through the skills

Four skills in `.claude/skills/` carry the standard for this site. They exist
because the failure mode of AI-built frontends is not ugliness — it is
*averageness*, and averageness is recognisable. Use them:

| Skill | When |
| --- | --- |
| **`frontend-design`** | Building or reworking any page, section, or component. Read `references/this-project.md` before the first change. |
| **`motion`** | Anything that moves — a hover, a menu, a drawer, a page transition. |
| **`impeccable`** | Before calling anything done: every state, every width, keyboard, failure. |
| **`taste`** | The critique pass. Run it last, on what you built. |

Order of work: structure → type and space → surface → states (`impeccable`) →
motion (`motion`) → critique (`taste`).

## Non-negotiables

- **Tokens, never literals.** All colour lives in `app/globals.css`. A hex in a
  component is a bug. `--radius: 0`.
- **Content lives in `lib/`.** Copy and nav in `lib/site.ts`, images in
  `lib/images.ts` via `<SiteImage id="…">`, registration links via
  `registerHref()`. Never a hardcoded string or path.
- **Comments explain why.** Match the register already used in `globals.css`
  and the components: plain, specific, no hedging. A non-obvious rule without a
  reason is an unfinished change.
- **One accent.** Coral means "go". `--destructive` exists because of that.
- **Motion is fast and rare.** `transform`/`opacity`, 150–250ms, `ease-out`.
  Nothing moves while the user is idle.

## Checks

```bash
pnpm check:images   # build-blocking: declared images must exist at declared size
pnpm check:design   # advisory: the mechanical AI tells
pnpm build
```

`pnpm check:design` is advisory by design — it catches regex-visible tells only.
The critique pass in `.claude/skills/taste/SKILL.md` is the part that matters.
Append `design-lint-disable` to a line, or the line above it, to keep a
deliberate exception with its reason next to it.
