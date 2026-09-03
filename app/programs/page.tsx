import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { registerHref } from '@/lib/registration'
import { programHref, programs } from '@/lib/site'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Four ways into Beyond the Blue Print: the annual conference, On Ground sessions inside businesses, The Show, and mentorship.',
}

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader>
        <PageHero
          eyebrow="The blueprint"
          title="Four ways in."
          copy="Different entry points. One shared ambition: build businesses that matter."
          meta="04 programmes / Kampala, Uganda"
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <ul className="grid gap-px border border-border bg-border">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={programHref(program)}
                  className="group grid gap-6 bg-background p-6 transition-colors hover:bg-accent/20 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:p-10"
                >
                  <span className="font-mono text-xs text-muted-foreground md:pt-2">{program.number}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-ink">{program.label}</p>
                    <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] md:text-4xl">{program.title}</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{program.copy}</p>
                  </div>
                  <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:mt-2" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="blueprint-surface blueprint-invert relative mx-3 overflow-hidden bg-primary px-6 py-16 text-primary-foreground md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16">
          <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
          <div className="blueprint-layer blueprint-plan-layer" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] md:text-6xl">
              Not sure which one you are?
            </h2>
            <div>
              <p className="mb-6 max-w-sm text-base leading-7 text-primary-foreground/80">
                Tell us what you are building and we will point you at the right door — or make the introduction ourselves.
              </p>
              <Link
                href={registerHref()}
                className="flex w-fit items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground"
              >
                Start a conversation <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="h-20 md:h-28" />
      </main>
    </>
  )
}
