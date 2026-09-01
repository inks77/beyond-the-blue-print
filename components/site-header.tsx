'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { SiteImage } from '@/components/site-image'
import { registerHref } from '@/lib/registration'
import { navLinks } from '@/lib/site'

/* The nav and the blue sheet it sits on are one element, so a page can hand in
   whatever belongs below the nav -- the homepage hero, or an interior page
   title -- and it paints on the same continuous surface. `hero-sheet` puts the
   blueprint layer above the logo plate and the copy above both; see the paint
   order note in globals.css.

   Navigation is <Link>, not scripted scrolling: the anchors now have to reach
   `/#contact` from four other routes, and the browser's own hash handling
   already honours the `scroll-behavior` reset that globals.css applies under
   prefers-reduced-motion. */
export function SiteHeader({ children }: { children?: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      id="top"
      className="hero-sheet blueprint-surface blueprint-invert relative w-full overflow-hidden bg-primary text-primary-foreground"
    >
      <a
        href="#main"
        className="hero-copy absolute left-5 top-5 -translate-y-[200%] bg-accent px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground focus:translate-y-0"
      >
        Skip to main content
      </a>
      <div className="blueprint-layer blueprint-grid" aria-hidden="true" />

      <nav
        className="hero-copy relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3 text-left" aria-label="Beyond the Blue Print home">
          <SiteImage id="logo-mark" priority className="size-10 object-contain" />
          <span className="max-w-28 text-xs font-semibold uppercase leading-tight tracking-[0.14em]">
            Beyond the
            <br />
            Blue Print
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.12em] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={registerHref()}
          className="hidden items-center gap-2 border border-primary-foreground/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground lg:flex"
        >
          Join the hub <ArrowUpRight className="size-4" />
        </Link>

        {/* -m-2.5 p-2.5 grows the 24px icon to a 44px target while the negative
            margin cancels the padding, so the margin box -- and the icon's
            painted position -- are exactly what they were. */}
        <button
          className="-m-2.5 p-2.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="hero-copy relative mx-auto flex w-full max-w-7xl flex-col gap-5 border-y border-primary-foreground/30 px-5 py-5 text-sm font-semibold uppercase tracking-[0.12em] lg:hidden"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-left" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={registerHref()} className="flex items-center gap-2 text-accent" onClick={() => setMenuOpen(false)}>
            Join the hub <ArrowUpRight className="size-4" />
          </Link>
        </div>
      )}

      {children}
    </header>
  )
}
