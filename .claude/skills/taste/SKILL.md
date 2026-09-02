---
name: taste
description: The critique pass — judge a built interface the way a demanding designer would, and remove the tells that make a site read as AI-generated. Use after building or changing any UI, before calling it done, when a page "looks fine but feels off", or when asked to make something look less generic, less templated, or less like AI built it. Includes a runnable linter for the mechanical tells.
argument-hint: "[page, component, or diff]"
metadata:
  version: "1.0.0"
---

# Taste

Taste is not a mood. It is a repeatable pass: look at the thing honestly, name
what is wrong in specific terms, and fix the two or three that matter. This skill
is that pass.

Run it **after** building, not instead of. `frontend-design` decides; `taste`
judges what was decided.

## Why generated interfaces are recognisable

Not because any single choice is bad. Because every choice is the *median*
choice. A model that has seen a million landing pages produces the average of a
million landing pages: rounded cards on a grey ground, an indigo gradient,
three equal columns, `text-4xl font-bold` centred, `duration-300` on everything,
copy about empowering and unlocking. Each piece is defensible. Together they are
anonymous.

The fix is not more decoration. It is **commitment**: pick a position and hold
it everywhere, including where it is slightly inconvenient.

## The pass

Work in this order. Stop at the first section that finds something and fix it
before moving on — early problems create later ones.

### 1. Squint

Blur your eyes, or drop the page to 25% zoom. You should see two or three
distinct masses with obvious weight difference, and one clear focal point. If it
is an even grey field, the hierarchy does not exist and no amount of colour will
create it.

### 2. Black and white

Remove colour entirely (DevTools → Rendering → Emulate vision deficiencies →
Achromatopsia). The page must still work: still scannable, still obvious where
to act. If it collapses, the design was carried by colour, which means it was
not carried.

### 3. Rhythm

Scroll the whole page at reading speed. Do the sections have different shapes, or
is it `eyebrow → h2 → paragraph → three cards` five times? Is there anywhere the
page breathes — one band with far more space than the rest? Sameness of rhythm is
the tell people feel but cannot name.

### 4. The tells

Go through `references/ai-tells.md` and run:

```bash
node .claude/skills/taste/scripts/design-lint.mjs
```

The linter catches the mechanical ones — gradient clichés, `transition-all`,
`duration-300` sprawl, emoji-as-icon, banned marketing verbs, shadow+border
double-treatment, `scale-105` hovers, raw hex colours. It is advisory and it is
not exhaustive; your eyes catch the rest.

### 5. Copy

Read every string aloud. Marketing verbs (*empower, unlock, seamless, elevate,
revolutionise, transform your…*), fake numbers ("10k+ users"), and sentences that
would fit any company in the world all have to go. Specific beats impressive:
"Kampala / Uganda. Building in public" is worth more than any of them.

### 6. Subtract

Name the three elements you would delete if forced. Delete at least one. Then
find the duplicated treatments — a border *and* a background *and* a shadow
marking the same boundary — and keep exactly one.

### 7. Then compare

Put it beside the best reference you know for this kind of page. Not to copy —
to notice the gap. The gap is usually spacing and type, never colour.

## Verdict

Finish the pass with an explicit judgement, not a shrug:

- **What is the strongest thing on this screen?** If the answer is "the layout is
  fine", nothing is strong and the page has no point of view.
- **What is the one repeated gesture that makes it belong to this site?**
- **What would a person who cares notice within five seconds?** Fix that.

Write the findings as concrete deltas — "the section gap is 64px and the card gap
is 48px, so the groups do not read; take sections to 128px" — never as adjectives.
`references/critique.md` has the full checklist and the language to use.

## The line to hold

Restraint is not blandness. A blank page with one huge sentence on it is
restrained *and* has a point of view. A page with fourteen gradient cards has no
restraint and no point of view. When in doubt: fewer elements, more contrast
between the ones that remain, one idea repeated with conviction.
