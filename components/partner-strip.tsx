import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { registerHref } from '@/lib/registration'
import { partners } from '@/lib/site'

/* Until there is a signed partner to name, this renders the ask rather than a
   thin or invented logo wall. Populate `partners` in lib/site.ts and the strip
   switches to the wordmark row on its own. */
export function PartnerStrip() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <p className="eyebrow">Partners</p>
        {partners.length > 0 ? (
          <ul className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
            {partners.map((partner) => (
              <li key={partner.name} className="text-lg font-black uppercase tracking-[-0.02em] text-muted-foreground">
                {partner.href ? (
                  <a href={partner.href} className="transition-colors hover:text-foreground" rel="noreferrer noopener" target="_blank">
                    {partner.name}
                  </a>
                ) : (
                  partner.name
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-4xl">
              This is where the names of the people building it with us will go.
            </h2>
            <Link
              href={registerHref('partner')}
              className="flex w-fit shrink-0 items-center gap-3 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Partner with us <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
