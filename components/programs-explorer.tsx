'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { registerHref } from '@/lib/registration'
import { programHref, programs } from '@/lib/site'

/* Four toggle buttons over one shared panel. They are `aria-pressed` buttons
   rather than a tablist: a tablist owes the user arrow-key roving focus, and
   this is a preview whose full content lives on its own route anyway. The
   panel announces itself politely because focus stays on the button that
   changed it. */
export function ProgramsExplorer() {
  const [activeProgram, setActiveProgram] = useState(programs[0].slug)
  const active = programs.find((program) => program.slug === activeProgram) ?? programs[0]

  return (
    <section className="border-y border-border bg-muted/40" id="programs">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The blueprint</p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Four ways in.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Different entry points. One shared ambition: build businesses that matter.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {programs.map((program) => (
            <button
              key={program.slug}
              onClick={() => setActiveProgram(program.slug)}
              aria-pressed={activeProgram === program.slug}
              aria-controls="program-detail"
              className={`group relative min-h-64 overflow-hidden bg-background p-6 text-left transition-colors md:p-8 ${
                activeProgram === program.slug ? 'blueprint-invert bg-primary text-primary-foreground' : 'hover:bg-accent/20'
              }`}
            >
              {activeProgram === program.slug && <div className="blueprint-layer blueprint-grid" aria-hidden="true" />}
              <div className="relative flex items-start justify-between">
                <span className="font-mono text-xs">{program.number}</span>
                <ArrowUpRight
                  className={`size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    activeProgram === program.slug ? 'text-accent' : ''
                  }`}
                />
              </div>
              <div className="relative mt-16">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">{program.label}</p>
                <h3 className="text-2xl font-black uppercase tracking-[-0.03em]">{program.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <div
          id="program-detail"
          aria-live="polite"
          className="blueprint-surface blueprint-invert grid gap-8 border-x border-b border-border bg-primary p-7 text-primary-foreground md:grid-cols-[1fr_2fr] md:p-10"
        >
          <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
          <p className="relative font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/60">
            {active.label} / {active.number}
          </p>
          <div className="relative">
            <p className="max-w-xl text-xl leading-8">{active.copy}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href={programHref(active)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent"
              >
                Open {active.label} <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href={registerHref(active.slug)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground/70"
              >
                Register for {active.label} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
