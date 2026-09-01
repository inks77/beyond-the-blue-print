import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { FieldNoteGrid } from '@/components/field-note-grid'
import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { registerHref } from '@/lib/registration'
import { fieldNotes } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Field notes',
  description: 'The archive: what the rooms look like, and what we are learning while we build them in public.',
}

export default function StoriesPage() {
  return (
    <>
      <SiteHeader>
        <PageHero
          eyebrow="Field notes"
          title="People in motion."
          copy="Pictures from the rooms and the things we keep noticing in them. The archive grows as the work does."
          meta="Building in public / Kampala"
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <FieldNoteGrid items={fieldNotes} />
        </section>

        <section className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 md:flex-row md:items-end md:px-8 md:py-20 lg:px-10">
            <div>
              <p className="eyebrow">Add to it</p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-5xl">
                Got a story that belongs here?
              </h2>
            </div>
            <Link
              href={registerHref('the-show')}
              className="flex w-fit shrink-0 items-center gap-3 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Tell us about it <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
