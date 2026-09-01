import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ContactBlock } from '@/components/contact-block'
import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { programBySlug } from '@/lib/site'

export const metadata: Metadata = {
  title: 'The conference',
  description:
    'The flagship Beyond the Blue Print gathering: founders, investors, creatives, and established business leaders in one room in Kampala.',
}

const ways = [
  {
    number: '01',
    title: 'Come as a guest',
    copy: 'Register your interest and we will send the dates, the programme, and how to get a seat the moment they are set.',
    action: 'Register interest',
  },
  {
    number: '02',
    title: 'Take the stage',
    copy: 'We are looking for people with something specific to say — a decision that went badly, a market nobody is watching, a number that surprised you.',
    action: 'Propose a talk',
  },
  {
    number: '03',
    title: 'Back the room',
    copy: 'Partners make the room possible and get to be part of it properly, not as a logo on a banner.',
    action: 'Partner with us',
  },
]

export default function ConferencePage() {
  const program = programBySlug('conference')

  return (
    <>
      <SiteHeader>
        <PageHero
          eyebrow="The gathering / 01"
          title="The room changes everything."
          copy="Once a year we put the whole community in one room — emerging founders, investors, creatives, and business leaders with decades behind them."
          meta="Kampala, Uganda / 2026 — dates announced to the list first"
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10">
          <div>
            <p className="eyebrow">The idea</p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase">
              <span className="h-px w-10 bg-accent" /> One day, one room
            </div>
          </div>
          <div className="max-w-2xl space-y-6 text-xl leading-8">
            <p>{program?.intro}</p>
            <p className="text-lg leading-7 text-muted-foreground">
              One day, once a year, in Kampala. Dates go to the list before they go anywhere else.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28 lg:px-10">
          <div className="relative min-h-96 bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85"
              alt="Audience gathered at a conference"
              fill
              className="object-cover grayscale mix-blend-multiply"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-accent px-4 py-3 font-mono text-xs uppercase text-accent-foreground">
              Ideas in motion / 2026
            </div>
          </div>
          <div>
            <p className="eyebrow">The shape of the day</p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {program?.detail.map((entry) => (
                <li key={entry.title} className="py-6">
                  <h2 className="text-2xl font-black uppercase tracking-[-0.03em]">{entry.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{entry.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40" id="register">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
            <p className="eyebrow">Three ways to be there</p>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {ways.map((way) => (
                <div key={way.number} className="flex flex-col justify-between bg-background p-6 md:p-8">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{way.number}</span>
                    <h2 className="mt-10 text-2xl font-black uppercase tracking-[-0.03em]">{way.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{way.copy}</p>
                  </div>
                  <Link
                    href="/#contact"
                    className="mt-8 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground underline decoration-accent decoration-2 underline-offset-4"
                  >
                    {way.action} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-20 pt-16 md:pb-28 md:pt-20">
          <ContactBlock />
        </div>
      </main>
    </>
  )
}
