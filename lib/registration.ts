/* The registration flow, in one place. Every "register / propose / partner /
   book / pitch / join" button on the site points at /register with a capacity
   in the query string, so the form opens with that capacity already chosen and
   the visitor never has to say twice why they came. Adding a way in means
   adding an entry here -- the picker, the routes, and the confirmation copy all
   read from this list. */

export type Capacity = {
  /* Also the `?as=` value. Kept identical to the programme slug where one
     exists so a programme page never has to translate. */
  id: string
  /* Short label for the picker card. */
  label: string
  /* Headline phrasing, used on the card and in the confirmation. */
  title: string
  copy: string
  /* Label and placeholder for the one free-text field, worded for this
     capacity -- a speaker and a partner are not being asked the same thing. */
  prompt: string
  placeholder: string
  /* True where the free text is the whole point of the registration: a talk
     with no subject or a story with no story is not a submission we can act on. */
  detailRequired?: boolean
}

export const capacities: Capacity[] = [
  {
    id: 'guest',
    label: 'Guest',
    title: 'Come as a guest',
    copy: 'A seat in the room at the annual conference. We send dates, programme, and how to get one.',
    prompt: 'Anything you want us to know (optional)',
    placeholder: 'What you are building, what you are hoping to find in the room.',
  },
  {
    id: 'speaker',
    label: 'Speaker',
    title: 'Take the stage',
    copy: 'Something specific to say — a decision that went badly, a market nobody is watching, a number that surprised you.',
    prompt: 'What would you talk about?',
    placeholder: 'The talk in two or three sentences, and why you are the person to give it.',
    detailRequired: true,
  },
  {
    id: 'partner',
    label: 'Partner',
    title: 'Back the room',
    copy: 'Partners make the room possible and get to be part of it properly, not as a logo on a banner.',
    prompt: 'What would you like to back?',
    placeholder: 'The organisation, what you have in mind, and roughly what scale.',
    detailRequired: true,
  },
  {
    id: 'on-ground',
    label: 'On Ground',
    title: 'Book an On Ground session',
    copy: 'We come to the business, work out what it is stuck on, and leave something the team can use on Monday.',
    prompt: 'Tell us about the business',
    placeholder: 'What it does, how big the team is, and what you are stuck on.',
    detailRequired: true,
  },
  {
    id: 'the-show',
    label: 'The Show',
    title: 'Pitch a story',
    copy: 'The business behind the story — what it cost, what it made, what nearly ended it.',
    prompt: 'What is the story?',
    placeholder: 'Whose story it is and the part that has not been told properly.',
    detailRequired: true,
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    title: 'Join the mentorship programme',
    copy: 'Matched on the problem in front of you, not on job titles — whether you are looking for a mentor or offering to be one.',
    prompt: 'Are you looking for a mentor, or offering to be one?',
    placeholder: 'Where you are, what you are building, and what you need next.',
    detailRequired: true,
  },
  {
    id: 'community',
    label: 'The hub',
    title: 'Join the hub',
    copy: 'Not sure which door yet. Get on the list, hear things first, and we will point you at the right one.',
    prompt: 'What are you working on? (optional)',
    placeholder: 'A line or two is plenty.',
  },
]

/* Older or looser links -- a programme slug, a synonym someone typed -- resolve
   to a real capacity rather than dropping the visitor on the default. */
const aliases: Record<string, string> = {
  conference: 'guest',
  attend: 'guest',
  talk: 'speaker',
  speak: 'speaker',
  sponsor: 'partner',
  partnership: 'partner',
  onground: 'on-ground',
  show: 'the-show',
  story: 'the-show',
  mentor: 'mentorship',
  mentee: 'mentorship',
  hub: 'community',
  join: 'community',
}

export const defaultCapacityId = 'community'

export function capacityById(id: string | undefined | null): Capacity | undefined {
  if (!id) return undefined
  const key = id.trim().toLowerCase()
  return capacities.find((capacity) => capacity.id === key || capacity.id === aliases[key])
}

/* `searchParams` hands back a string, an array, or nothing; all three land on a
   valid capacity so the form is never rendered without one selected. */
export function resolveCapacity(param: string | string[] | undefined): Capacity {
  const value = Array.isArray(param) ? param[0] : param
  return capacityById(value) ?? capacityById(defaultCapacityId)!
}

/* The only thing that should build a link into the form, so a renamed capacity
   cannot leave a button pointing at a query string nothing answers to. */
export function registerHref(id?: string) {
  return id && id !== defaultCapacityId ? `/register?as=${id}` : '/register'
}
