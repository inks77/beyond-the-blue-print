# The tells

A catalogue of what makes an interface read as machine-generated, and what to do
instead. None of these are crimes in isolation. Three of them together are a
verdict.

## Colour

| Tell | Instead |
| --- | --- |
| Indigo/violet → pink or blue → cyan gradient on a hero, a button, or a headline | One flat brand colour. Gradients only where they do physical work — a scrim over a photo, an edge fade |
| Gradient text (`bg-clip-text text-transparent`) | Solid colour, larger, tighter tracking |
| `gray-50` page, `white` cards, `gray-200` borders — the default Tailwind palette untouched | A ground colour with an actual temperature, and a hairline that belongs to it |
| Six accent colours, one per feature card | One accent, reserved for action |
| Colour as the only difference between states | Colour *and* icon/weight/shape |
| Glassmorphism: `backdrop-blur` panels over blurred colour blobs | A flat surface with a hairline |
| Dark mode that is the light theme with hues inverted | Adjusted lightness and chroma per token, elevation by lightness |

## Shape and surface

| Tell | Instead |
| --- | --- |
| `rounded-2xl` + `shadow-lg` + `border` on the same element | Pick one boundary device and use it everywhere |
| Every element a card | Content on the ground plane, grouped by space and hairlines |
| Icon in a rounded square tinted 10% of the accent, above a title, above two lines — repeated three times | Vary the structure; use a list when it is a list |
| Uniform `rounded-xl` on everything including inputs, images, avatars, and the page | A radius decision that includes "square" as a legitimate answer |
| Soft shadows on things that are not floating | Elevation only where there is a real z-relationship |

## Layout

| Tell | Instead |
| --- | --- |
| Everything centred, every section the same rhythm | Left alignment as the default; one section with far more air |
| Three equal columns regardless of content | Unequal splits (7/5, 8/4); a list when items are unequal |
| Uniform 16px gaps — no difference between within-group and between-group | A spacing scale where group gaps are visibly larger |
| `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` on every single section, nothing full-bleed | Deliberate contrast between contained and full-bleed |
| Paragraphs running the full container width | 60–75 character measure |
| Nothing ever overlaps or breaks the grid | One deliberate overlap or bleed per page |
| A hero that is: badge pill, big centred headline, subtitle, two buttons, gradient blob | Real content, asymmetry, and something specific to this project |

## Type

| Tell | Instead |
| --- | --- |
| Inter (or the framework default) at default tracking, everywhere | Tracking tightened on display sizes; a mono or serif for contrast |
| `text-4xl font-bold` as the only heading treatment | A scale with visible jumps and more than one device (case, weight, family) |
| `font-semibold` on everything | Two weights, used to mean something |
| Adjacent sizes (`text-base` next to `text-lg`) doing hierarchy work | Skip steps |
| Emoji used as icons or in headings (✨ 🚀 💡) | A real icon set, one metaphor family |
| Straight quotes, `--` for dashes, three dots for ellipsis | `’ “ ” – — …` |

## Motion

| Tell | Instead |
| --- | --- |
| Every section fades up on scroll | At most one, or none |
| `transition-all duration-300` everywhere | Named properties, 150–250ms, `ease-out` |
| `hover:scale-105` on cards | Nothing, or a 1px translate and a border colour change |
| Floating/pulsing/drifting ambient loops | Stillness when the user is idle |
| Animated counters, typewriter headlines | Show the number |
| Bouncy springs on routine UI | Bounce only for rare confirmations, if at all |

## Copy

| Tell | Instead |
| --- | --- |
| *Empower, unlock, seamless(ly), elevate, revolutionise, supercharge, transform your X, take X to the next level, in seconds, effortlessly* | Say what it does |
| "Trusted by 10,000+ teams", "99.9% uptime", "24/7 support" with no source | Real numbers or no numbers |
| Three-word feature titles that could belong to any product | Titles made of this project's actual nouns |
| Em-dash-heavy, triadic, evenly-cadenced marketing prose | Short sentences. Specific nouns. Local detail |
| Headings that restate the eyebrow above them | Delete one of the two |
| Lorem ipsum surviving into a commit | Real content, or the layout is not finished |

## Content and structure

| Tell | Instead |
| --- | --- |
| Placeholder avatars and stock testimonials | Ship without them until the real ones exist |
| A features grid of exactly six items because six fills two rows | As many as are true |
| An FAQ nobody asked | Delete |
| Icons picked at random from lucide with no shared metaphor | One family — all outline, all the same weight, all the same conceptual level |
| A trust bar of greyed-out logos of companies with no relationship | Nothing |

## The meta-tell

The deepest one: **no idiosyncrasy**. Real sites have a repeated, slightly odd
move that a committee would have removed — a drafting grid behind every page,
square corners in a rounded world, a mono coordinate stamp in the corner, colour
only on one element per screen. Nothing here should be justified purely by
"that's how these usually look."
