# Running a critique

## The rules of the pass

1. **Describe, then judge.** "The heading is 28px and the body is 20px, eight
   pixels apart" comes before "the hierarchy is weak". A critique that starts at
   the adjective cannot be acted on.
2. **Deltas, not adjectives.** Every finding ends in a number, a token, or a
   deletion. "Make it cleaner" is not a finding.
3. **Rank, then cut.** List everything, then act on the top three. A page with
   three real fixes shipped beats a page with fourteen noted.
4. **Attack the strongest version.** Assume the choice was deliberate and argue
   against it anyway. If you cannot, it survives.
5. **Deletion is the first tool.** Before adding anything, check whether removing
   something achieves it.

## Checklist

### Hierarchy
- [ ] At 25% zoom there are 2–3 distinct masses, not an even field.
- [ ] One unambiguous focal point per screen.
- [ ] No two elements compete at the same visual level.
- [ ] Removing colour leaves the hierarchy intact.

### Type
- [ ] Every size comes from the scale; no one-off values.
- [ ] Adjacent levels differ by a visible jump, not one step.
- [ ] Body measure is 60–75 characters.
- [ ] Leading is tight on display, loose on small.
- [ ] Display type has negative tracking; small caps labels have wide tracking.
- [ ] No orphans or awkward wraps at any width.
- [ ] Real typographic characters throughout.

### Space
- [ ] Between-group space visibly exceeds within-group space, everywhere.
- [ ] Section rhythm is consistent and set in one place.
- [ ] At least one section has markedly more air than the rest.
- [ ] Optical alignment checked, not just mathematical.

### Colour and surface
- [ ] No raw hex or `rgb()` in components; tokens only.
- [ ] Three surfaces at most.
- [ ] One accent, on action only.
- [ ] Body 4.5:1, large text and UI edges 3:1, focus ring 3:1 on *every* surface
      it can land on.
- [ ] No state signalled by colour alone.
- [ ] Every gradient, shadow, and blur does a physical job.

### Composition
- [ ] Section structures vary; not the same band repeated.
- [ ] At least one deliberate break from the container.
- [ ] Unequal column splits where content is unequal.
- [ ] Cards justified — or replaced by space and hairlines.

### Motion
- [ ] Only `transform` and `opacity` animate.
- [ ] 150–250ms for UI; nothing over 400ms.
- [ ] `ease-out`, never `ease-in-out` on user-initiated motion.
- [ ] Exits shorter than enters; popovers scale from their anchor.
- [ ] Interruptible and reversible mid-flight.
- [ ] Nothing moves when the user is idle.
- [ ] Reduced motion keeps everything usable.

### Copy
- [ ] No marketing verbs, no invented metrics, no lorem.
- [ ] Every sentence could only belong to this project.
- [ ] Headings do not restate their eyebrows.
- [ ] Buttons say what happens, in the user's words.

### Identity
- [ ] Name the repeated gesture that makes this site itself.
- [ ] It appears at least twice on this page.
- [ ] Nothing on the page is justified only by convention.

## Writing it up

```
FINDING   Section gap (64px) is smaller than the gap between cards inside it
          (48px), so the two bands read as one.
FIX       Sections to 128px on desktop / 80px on mobile; card gap to 24px.
IMPACT    High — this is why the page reads as a single grey field.

FINDING   Three feature cards each carry a border, a background tint, and a
          shadow. Three devices, one boundary.
FIX       Keep the hairline; drop the tint and the shadow.
IMPACT    Medium.

FINDING   "Empowering the next generation of visionary founders" (hero) could
          appear on any startup site in the world.
FIX       Replace with the specific claim from lib/site.ts.
IMPACT    High — copy is the loudest tell on the page.
```

Three findings written like this are a better deliverable than a page of prose.

## When you are told it is fine

Sometimes it is. The pass has a legitimate output of "nothing above the line" —
but only after actually running it. Say which checks you ran and what the
strongest remaining weakness is, so the judgement is inspectable rather than
polite.
