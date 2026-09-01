import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { CapacityProvider } from '@/components/register-capacity'
import { RegisterHero } from '@/components/register-hero'
import { RegistrationForm } from '@/components/registration-form'
import { SiteHeader } from '@/components/site-header'
import { resolveCapacity } from '@/lib/registration'

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Register with Beyond the Blue Print — as a guest at the conference, a speaker, a partner, an On Ground host, a story for The Show, or a place in the mentorship programme.',
}

const whatHappensNext = [
  {
    number: '01',
    title: 'A person reads it',
    copy: 'Not a queue and not an autoresponder. Every registration is read by someone on the team.',
  },
  {
    number: '02',
    title: 'We reply',
    copy: 'With the next step for the capacity you registered in — a seat, a slot, a call, or an introduction.',
  },
  {
    number: '03',
    title: 'You hear it first',
    copy: 'Dates, programme, and announcements go to the people on this list before they go anywhere else.',
  },
]

/* One form for every way in. The capacity comes in on `?as=`, set by whichever
   button was pressed, so the visitor lands with their answer already filled in
   rather than starting from a blank contact box -- and the hero opens on that
   same capacity. From there the two stay together: the hero and the picker
   share one piece of state, so changing the card changes the heading. */
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ as?: string | string[] }>
}) {
  const { as } = await searchParams
  const capacity = resolveCapacity(as)

  return (
    <CapacityProvider initialCapacity={capacity}>
      <SiteHeader>
        <RegisterHero />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
            <RegistrationForm />

            <aside className="lg:pt-2">
              <p className="eyebrow">What happens next</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {whatHappensNext.map((step) => (
                  <li key={step.number} className="py-6">
                    <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                    <h2 className="mt-3 text-xl font-black uppercase tracking-[-0.03em]">{step.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-6 text-muted-foreground">
                Still working out which door is yours?{' '}
                <Link href="/programs" className="underline decoration-accent decoration-2 underline-offset-4">
                  Read the four programmes
                </Link>{' '}
                — or pick “Join the hub” above and we will point you at the right one.
              </p>
            </aside>
          </div>
        </section>

        <section className="blueprint-surface blueprint-invert mx-3 overflow-hidden bg-primary px-6 py-14 text-primary-foreground md:mx-5 md:px-12 md:py-16 lg:mx-8 lg:px-16">
          <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-4xl">
              The conference is the room everything else feeds into.
            </h2>
            <Link
              href="/conference"
              className="flex w-fit shrink-0 items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground"
            >
              About the conference <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        <div className="h-20 md:h-28" />
      </main>
    </CapacityProvider>
  )
}
