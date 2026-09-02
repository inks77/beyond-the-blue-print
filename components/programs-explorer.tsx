'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { registerHref } from '@/lib/registration'
import { programHref, programs } from '@/lib/site'

/* Four links over one shared panel. Clicking a card opens that programme --
   the card is the way in, not a toggle you have to follow with a second tap on
   the arrow below. The panel underneath previews whichever card the pointer or
   keyboard is currently on, so the summary is still there before you commit to
   the page. Touch has no hover, so it simply shows the first programme and the
   tap goes straight to the route. */
export function ProgramsExplorer() {
  const [previewProgram, setPreviewProgram] = useState(programs[0].slug)
  const active = programs.find((program) => program.slug === previewProgram) ?? programs[0]

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
          {/* The highlighted card is flat blue, and so is the panel it points
              at: a card crops the grid to a few squares, which reads as texture
              on a small tile rather than as a sheet, and on the panel the grid
              sits directly behind the one paragraph of copy this section has.
              .blueprint-invert stays on both for the focus ring it retunes for
              the blue surface. */}
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={programHref(program)}
              onMouseEnter={() => setPreviewProgram(program.slug)}
              onFocus={() => setPreviewProgram(program.slug)}
              className={`group relative block min-h-64 overflow-hidden bg-background p-6 text-left transition-colors md:p-8 ${
                previewProgram === program.slug ? 'blueprint-invert bg-primary text-primary-foreground' : 'hover:bg-accent/20'
              }`}
            >
              <div className="relative flex items-start justify-between">
                <span className="font-mono text-xs">{program.number}</span>
                <ArrowUpRight
                  className={`size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    previewProgram === program.slug ? 'text-accent' : ''
                  }`}
                />
              </div>
              <div className="relative mt-16">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">{program.label}</p>
                <h3 className="text-2xl font-black uppercase tracking-[-0.03em]">{program.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div
          id="program-detail"
          className="blueprint-invert grid gap-8 border-x border-b border-border bg-primary p-7 text-primary-foreground md:grid-cols-[1fr_2fr] md:p-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/60">
            {active.label} / {active.number}
          </p>
          <div>
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
