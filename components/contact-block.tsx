import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { NewsletterForm } from '@/components/newsletter-form'
import { registerHref } from '@/lib/registration'

export function ContactBlock() {
  return (
    <section
      className="mx-3 bg-accent px-6 py-16 md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16"
      id="contact"
    >
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow text-accent-foreground/60">Pull up a chair</p>
          <h2 className="mt-5 max-w-2xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-accent-foreground md:text-7xl">
            Your next move starts here.
          </h2>
          {/* The newsletter beside this only takes an address. Anyone ready to
              say what they actually want from the hub belongs in the form. */}
          <Link
            href={registerHref()}
            className="mt-8 flex w-fit items-center gap-3 bg-accent-foreground px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-accent transition-transform hover:-translate-y-0.5"
          >
            Register your interest <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <NewsletterForm tone="accent" />
      </div>
    </section>
  )
}
