import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { programBySlug, programHref, programs } from '@/lib/site'

export function generateStaticParams() {
  return programs.filter((program) => !program.route).map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = programBySlug(slug)
  if (!program || program.route) return {}
  return { title: program.label, description: program.copy }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = programBySlug(slug)
  // A programme with its own route is served there; /programs/<that slug> must
  // not become a second copy of the same page at a second URL.
  if (!program || program.route) notFound()

  const others = programs.filter((item) => item.slug !== program.slug)

  return (
    <>
      <SiteHeader>
        <PageHero
          breadcrumb={{ href: '/programs', label: 'All programmes' }}
          eyebrow={`${program.label} / ${program.number}`}
          title={program.title}
          copy={program.copy}
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10">
          <div>
            <p className="eyebrow">The idea</p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase">
              <span className="h-px w-10 bg-accent" /> {program.label}
            </div>
          </div>
          <p className="max-w-2xl text-pretty text-xl leading-8">{program.intro}</p>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
            <p className="eyebrow">What happens</p>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {program.detail.map((entry, index) => (
                <div key={entry.title} className="bg-background p-6 md:p-8">
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="mt-10 text-2xl font-black uppercase tracking-[-0.03em]">{entry.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{entry.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10">
          <div>
            <p className="eyebrow">Who it is for</p>
          </div>
          <ul className="max-w-2xl divide-y divide-border border-y border-border">
            {program.audience.map((line) => (
              <li key={line} className="py-5 text-lg leading-7">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="blueprint-surface blueprint-on-accent mx-3 bg-accent px-6 py-16 md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16">
          <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-accent-foreground md:text-6xl">
              {program.cta}.
            </h2>
            <Link
              href="/#contact"
              className="flex w-fit items-center gap-3 bg-accent-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent"
            >
              {program.cta} <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <p className="eyebrow">Other ways in</p>
          <ul className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={programHref(item)} className="group block h-full bg-background p-6 transition-colors hover:bg-accent/20">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{item.number}</span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-accent">{item.label}</p>
                  <h2 className="mt-2 text-xl font-black uppercase tracking-[-0.03em]">{item.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
