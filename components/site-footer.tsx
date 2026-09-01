import Link from 'next/link'

import { NewsletterForm } from '@/components/newsletter-form'
import { SocialLinks } from '@/components/social-links'
import { registerHref } from '@/lib/registration'
import { navLinks, programHref, programs, site } from '@/lib/site'

/* Every one of these opens the registration form with its own capacity already
   chosen; see lib/registration.ts. */
const getInvolved = [
  { href: registerHref(), label: 'Join the hub' },
  { href: registerHref('partner'), label: 'Partner with us' },
  { href: registerHref('mentorship'), label: 'Find a mentor' },
  { href: registerHref('speaker'), label: 'Speak at the conference' },
  { href: registerHref('guest'), label: 'Attend the conference' },
]

/* The strip below the columns carries the social accounts; a contact address
   still belongs there once one exists. A footer link that goes nowhere is worse
   than a footer without one, so the accounts come from lib/site.ts and nothing
   is stubbed out in the meantime. */
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

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-border px-5 py-6 text-xs uppercase tracking-[0.12em] md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
        <span className="font-bold">Beyond the Blue Print</span>
        <span className="text-muted-foreground">{site.tagline} — {site.place}</span>
        {/* -ml-2 pulls the first icon's 36px box back to the text margin so the
            row still starts on the grid the rest of the strip sits on. */}
        <div className="flex items-center gap-5 md:gap-6">
          <SocialLinks className="-ml-2 md:ml-0" />
          <span className="font-mono text-muted-foreground">© 2026 BTB</span>
        </div>
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
