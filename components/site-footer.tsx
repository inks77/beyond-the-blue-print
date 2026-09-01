import Link from 'next/link'

import { NewsletterForm } from '@/components/newsletter-form'
import { navLinks, programHref, programs, site } from '@/lib/site'

const getInvolved = [
  { href: '/#contact', label: 'Join the hub' },
  { href: '/#contact', label: 'Partner with us' },
  { href: '/programs/mentorship', label: 'Find a mentor' },
  { href: '/conference', label: 'Speak at the conference' },
]

/* TODO: social handles and a contact address go in the strip below the columns
   once they exist. A footer link that goes nowhere is worse than a footer
   without one, so nothing is stubbed out here in the meantime. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="text-sm font-black uppercase leading-tight tracking-[0.12em]">
            Beyond the
            <br />
            Blue Print
          </p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
            {site.tagline} — {site.place}.
          </p>
        </div>

        <FooterColumn heading="The hub" links={navLinks} />
        <FooterColumn
          heading="Programmes"
          links={programs.map((program) => ({ href: programHref(program), label: program.label }))}
        />

        <div>
          <p className="eyebrow">Get involved</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {getInvolved.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="eyebrow">Newsletter</p>
            <div className="mt-3">
              <NewsletterForm tone="plain" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-border px-5 py-6 text-xs uppercase tracking-[0.12em] md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
        <span className="font-bold">Beyond the Blue Print</span>
        <span className="text-muted-foreground">{site.tagline} — {site.place}</span>
        <span className="font-mono text-muted-foreground">© 2026 BTB</span>
      </div>
    </footer>
  )
}

function FooterColumn({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow">{heading}</p>
      <ul className="mt-5 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
