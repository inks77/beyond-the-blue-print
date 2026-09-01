/* Single source of truth for everything that appears in more than one place:
   the nav, the footer, the four programmes, and the field-note archive. Pages
   import from here so a copy change lands everywhere at once. */

export const site = {
  name: 'Beyond the Blue Print',
  tagline: 'A business hub for the bold',
  place: 'Kampala, Uganda',
  description:
    'We connect young entrepreneurs, investors, and established businesses to the people and ideas shaping what comes next.',
}

/* Social accounts, in the order they appear in the footer. An entry lives here
   only once the account is real and its URL has been checked -- SocialLinks
   renders exactly what is in this list, so an account we do not yet run simply
   stays out of it rather than shipping a logo that leads nowhere. */
export type SocialPlatform = 'instagram' | 'facebook' | 'x'

export const socials: { platform: SocialPlatform; label: string; handle: string; href: string }[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@beyondtheblueprint_ug',
    href: 'https://www.instagram.com/beyondtheblueprint_ug/',
  },
]

export const navLinks = [
  { href: '/programs', label: 'What we do' },
  { href: '/conference', label: 'The conference' },
  { href: '/stories', label: 'Field notes' },
  { href: '/about', label: 'Our story' },
]

export type Program = {
  slug: string
  number: string
  label: string
  title: string
  /* One-liner. Used on the homepage explorer and the programmes index. */
  copy: string
  /* Long form. Only the programme's own page. */
  intro: string
  audience: string[]
  detail: { title: string; copy: string }[]
  cta: string
  /* A programme big enough to earn a top-level route sets it here; everything
     else is served by /programs/[slug]. programHref() is the only thing that
     should build a programme link, so the two never diverge. */
  route?: string
}

export const programs: Program[] = [
  {
    slug: 'conference',
    number: '01',
    label: 'Conference',
    title: 'Big ideas. One room.',
    copy: 'An annual gathering where emerging founders, investors, creatives, and established business leaders meet to exchange what is next.',
    intro:
      'Once a year we put the whole community in one room. Not a trade show, not a panel marathon — a day built around the conversations people actually travel for: what is working, what is not, and who you need to meet next.',
    audience: [
      'Founders in their first three years',
      'Investors and funds looking at Uganda',
      'Established businesses courting a younger market',
      'Creatives, operators, and the merely curious',
    ],
    detail: [
      { title: 'Main stage', copy: 'A short programme of honest talks. No keynote theatre, no slides that could have been an email.' },
      { title: 'Working rooms', copy: 'Smaller sessions where people bring a real problem and leave with a next step.' },
      { title: 'The floor', copy: 'Deliberately long breaks. Most of what people take home happens between sessions.' },
    ],
    cta: 'Register interest',
    route: '/conference',
  },
  {
    slug: 'on-ground',
    number: '02',
    label: 'On Ground',
    title: 'Business, in the real world.',
    copy: 'We step into businesses, teach what works, and help established brands speak to the generation building the future.',
    intro:
      'Not every business needs a conference ticket. On Ground takes the work to the factory floor, the shop, the office — wherever the business already is — and leaves behind something the team can use on Monday.',
    audience: [
      'Established businesses with a younger audience to reach',
      'Family firms navigating a generational handover',
      'Teams that need practice, not a lecture',
    ],
    detail: [
      { title: 'We come to you', copy: 'A visit, a diagnosis, and a session shaped around what the business is actually stuck on.' },
      { title: 'Teach what works', copy: 'Positioning, storytelling, and the mechanics of reaching a generation that buys differently.' },
      { title: 'Leave something behind', copy: 'A written read on the business and a short list of moves, in plain language.' },
    ],
    cta: 'Book a session',
  },
  {
    slug: 'the-show',
    number: '03',
    label: 'The Show',
    title: 'The business behind the story.',
    copy: 'An entertainment-led format that makes entrepreneurship human, accessible, and worth paying attention to.',
    intro:
      'Business media here tends to be dry, deferential, or both. The Show is neither. It is an entertainment-led format that treats entrepreneurship as what it is — a story with stakes, setbacks, and people worth knowing.',
    audience: [
      'Founders with a story that has not been told properly',
      'Brands looking for a format that is not an advert',
      'Anyone who has ever switched off a business programme',
    ],
    detail: [
      { title: 'Made to watch', copy: 'Shot and cut like entertainment, because nobody sits through a lecture voluntarily.' },
      { title: 'The real numbers', copy: 'What it cost, what it made, what nearly ended it. The parts usually edited out.' },
      { title: 'Built for the feed', copy: 'Long form for the people who want depth, short cuts for everyone else.' },
    ],
    cta: 'Pitch a story',
  },
  {
    slug: 'mentorship',
    number: '04',
    label: 'Mentorship',
    title: 'A clearer way forward.',
    copy: 'Practical guidance, honest conversations, and a community that helps young builders move from idea to action.',
    intro:
      'The gap between an idea and a business is rarely knowledge — it is having someone who has done it tell you the truth early enough to matter. Mentorship pairs young builders with people a few steps ahead.',
    audience: [
      'Young builders with an idea and no map',
      'Founders stuck between the first customer and the tenth',
      'Operators who want to mentor rather than merely advise',
    ],
    detail: [
      { title: 'Matched, not assigned', copy: 'Pairings are made on the problem in front of you, not on job titles.' },
      { title: 'Honest conversations', copy: 'Standing sessions with room to say the thing you would not say in a pitch.' },
      { title: 'A community around it', copy: 'The pairing is the start. The group you land in is what keeps you moving.' },
    ],
    cta: 'Apply to join',
  },
]

export function programBySlug(slug: string) {
  return programs.find((program) => program.slug === slug)
}

export function programHref(program: Program) {
  return program.route ?? `/programs/${program.slug}`
}

/* Numbers on the homepage band. Everything here is verifiable from what the
   organisation already publishes -- programme count, the conference year, the
   home city. Replace with audience, founder, and partner figures as they are
   measured; do not add a number that has not been counted. */
export const impactStats = [
  { value: '04', label: 'Ways in', note: 'Conference, On Ground, The Show, Mentorship' },
  { value: '2026', label: 'Flagship conference', note: 'The first full gathering' },
  { value: '01', label: 'Home base', note: 'Kampala, Uganda — building in public' },
]

/* Named partners belong here only once a relationship is signed. While the
   list is empty the strip renders the invitation instead of a logo wall --
   an empty logo wall is worse than no logo wall. */
export const partners: { name: string; href?: string }[] = []

export type FieldNote =
  | { kind: 'image'; src: string; alt: string; tag: string; className?: string }
  | { kind: 'note'; tag: string; title: string; copy: string; tone?: 'accent' | 'blue' }

export const fieldNotes: FieldNote[] = [
  {
    kind: 'image',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    alt: 'Audience gathered at a conference',
    tag: 'The room',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    kind: 'image',
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    alt: 'Team collaborating around a table',
    tag: 'On ground',
  },
  {
    kind: 'note',
    tag: 'Note 01',
    title: 'The introduction is the product.',
    copy: 'Every useful thing that came out of the last room started as somebody saying: you two should talk.',
    tone: 'accent',
  },
  {
    kind: 'image',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85',
    alt: 'Speaker addressing a business audience',
    tag: 'Main stage',
  },
  {
    kind: 'note',
    tag: 'Note 02',
    title: 'Experience is not the opposite of energy.',
    copy: 'The factory with thirty years behind it and the founder with three months are solving the same problem from different ends.',
    tone: 'blue',
  },
  {
    kind: 'image',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    alt: 'Conference audience listening to a speaker',
    tag: 'Ideas in motion',
  },
]
