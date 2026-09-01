import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SiteHeader } from '@/components/site-header'
import { navLinks } from '@/lib/site'

export default function NotFound() {
  return (
    <>
      <SiteHeader>
        <PageHero
          eyebrow="404"
          title="No blueprint for this one."
          copy="The page you were after does not exist — or has not been drawn yet."
        />
      </SiteHeader>

      <main id="main">
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10">
          <p className="eyebrow">Try one of these</p>
          <ul className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center justify-between bg-background p-6 transition-colors hover:bg-accent/20 md:p-8">
                  <span className="text-2xl font-black uppercase tracking-[-0.03em]">{link.label}</span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
