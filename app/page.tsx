import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ContactBlock } from '@/components/contact-block'
import { FieldNoteGrid } from '@/components/field-note-grid'
import { Hero } from '@/components/hero'
import { ImpactBand } from '@/components/impact-band'
import { PartnerStrip } from '@/components/partner-strip'
import { ProgramsExplorer } from '@/components/programs-explorer'
import { SiteHeader } from '@/components/site-header'
import { SiteImage } from '@/components/site-image'
import { WatchFilm } from '@/components/watch-film'
import { getImage } from '@/lib/images'
import { fieldNotes } from '@/lib/site'

export default function Page() {
  return (
    <>
      <SiteHeader>
        <Hero />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10" id="story">
          <div>
            <p className="eyebrow">Why we exist</p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase">
              <span className="h-px w-10 bg-accent" /> No blueprint is final
            </div>
            <figure className="mx-auto mt-10 w-full max-w-xs md:mx-0 md:mt-14 md:max-w-none">
              <SiteImage
                id="panel-dr-ian-clarke"
                className="h-auto w-full border border-border"
                sizes="(max-width: 768px) 20rem, 33vw"
              />
              <figcaption className="mt-3 font-mono text-xs uppercase text-muted-foreground">
                {getImage('panel-dr-ian-clarke').credit}
              </figcaption>
            </figure>
          </div>
          <div>
            <h2 className="max-w-3xl text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-6xl">
              The future is built by people willing to redraw the map.
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-7 text-muted-foreground">
              BEYOND THE BLUE PRINT is a growing community for the curious, the scrappy, and the established. We create
              spaces where experience meets energy — where a factory with decades behind it can find a new audience, and a
              young founder can find the push to begin.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] underline decoration-accent decoration-2 underline-offset-4"
            >
              Read our story <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        <ImpactBand />

        <ProgramsExplorer />

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28 lg:px-10">
          <div>
            <p className="eyebrow">The gathering</p>
            <h2 className="mt-5 max-w-lg text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
              The room changes everything.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-7 text-muted-foreground">
              Our flagship conference brings the community together for a day of honest conversations, useful connections,
              and ideas you can take back to work.
            </p>
            <Link
              href="/conference"
              className="mt-8 flex w-fit items-center gap-3 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              About the conference <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="relative min-h-96 bg-muted">
            <SiteImage
              id="ideas-in-motion"
              fill
              className="object-cover grayscale mix-blend-multiply"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-accent px-4 py-3 font-mono text-xs uppercase text-accent-foreground">
              Ideas in motion / 2026
            </div>
          </div>
        </section>

        <WatchFilm />

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">Field notes</p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] md:text-5xl">People in motion.</h2>
            </div>
            <Link href="/stories" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] md:flex">
              View the archive <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <FieldNoteGrid items={fieldNotes.slice(0, 3)} />
          <Link href="/stories" className="mt-6 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] md:hidden">
            View the archive <ArrowUpRight className="size-4" />
          </Link>
        </section>

        <PartnerStrip />

        <div className="pb-20 pt-16 md:pb-28 md:pt-20">
          <ContactBlock />
        </div>
      </main>
    </>
  )
}
