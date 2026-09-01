import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ImpactBand } from '@/components/impact-band'
import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { registerHref } from '@/lib/registration'
import { programHref, programs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our story',
  description:
    'Why Beyond the Blue Print exists: a Kampala business hub built so experience and energy end up in the same room.',
}

const principles = [
  {
    number: '01',
    title: 'No blueprint is final.',
    copy: 'Every plan worth having gets redrawn. We would rather help someone change course early than watch them defend a plan that stopped working.',
  },
  {
    number: '02',
    title: 'Experience and energy, same room.',
    copy: 'Most business events sort people by seniority. We deliberately do not. The value is in the mix.',
  },
  {
    number: '03',
    title: 'Say the useful thing.',
    copy: 'Polished panels rarely help anyone. We ask for the numbers, the near-misses, and the parts that are still unresolved.',
  },
  {
    number: '04',
    title: 'Build in public.',
    copy: 'We are early, and we say so. What we are figuring out gets shared while we are figuring it out.',
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader>
        <PageHero
          eyebrow="Our story"
          title="The future is built by people willing to redraw the map."
          copy="Beyond the Blue Print is a growing community for the curious, the scrappy, and the established — built in Kampala, for the people building what comes next."
          meta="Kampala / Uganda — building in public"
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10">
          <div>
            <p className="eyebrow">Why we exist</p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase">
              <span className="h-px w-10 bg-accent" /> No blueprint is final
            </div>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-7 text-muted-foreground">
            <p>
              There is no shortage of ambition here. What is short is the connective tissue — the introduction, the honest
              read on a business, the person a few steps ahead who will tell you the truth while it still matters.
            </p>
            <p>
              A factory with three decades behind it and a founder three months in are usually kept apart: different rooms,
              different events, different vocabularies. Put them together and both leave with something. That observation is
              the whole organisation.
            </p>
            <p>
              So we build the rooms. A conference once a year, work inside businesses the rest of it, a show that treats
              entrepreneurship as a story worth watching, and mentorship for the people at the start of theirs.
            </p>
          </div>
        </section>

        <ImpactBand />

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">
            Four things we hold to.
          </h2>
          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.number} className="bg-background p-6 md:p-8">
                <span className="font-mono text-xs text-muted-foreground">{principle.number}</span>
                <h3 className="mt-10 text-2xl font-black uppercase tracking-[-0.03em]">{principle.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{principle.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-10">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">What that becomes</p>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] md:text-5xl">Four ways in.</h2>
              </div>
              <Link href="/programs" className="flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                All programmes <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link href={programHref(program)} className="group block h-full bg-background p-6 transition-colors hover:bg-accent/20 md:p-8">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs text-muted-foreground">{program.number}</span>
                      <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-accent">{program.label}</p>
                    <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.03em]">{program.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-20 md:flex-row md:items-end md:px-8 md:py-28 lg:px-10">
          <h2 className="max-w-2xl text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-5xl">
            If any of this sounds like the room you have been looking for.
          </h2>
          <Link
            href={registerHref()}
            className="flex w-fit shrink-0 items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Join the hub <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </main>
    </>
  )
}
