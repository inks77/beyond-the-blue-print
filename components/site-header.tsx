'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { SiteImage } from '@/components/site-image'
import { registerHref } from '@/lib/registration'
import { navLinks } from '@/lib/site'
import { cn } from '@/lib/utils'

/* Two pieces that read as one. The nav is fixed to the top of the viewport so
   it stays reachable down a long page; the blue sheet below it is the surface a
   page paints its opening on -- the homepage hero, or an interior page title --
   and it keeps a spacer the height of the bar so the sheet still opens exactly
   where it used to. `hero-sheet` puts the blueprint layer above the logo plate
   and the copy above both; see the paint order note in globals.css.

   The bar cannot live inside that sheet: .blueprint-surface clips its overflow,
   which would make a sticky nav stick to nothing. It sits outside as a sibling,
   above the page at z-50, and reserves its own space through --nav-height.

   Navigation is <Link>, not scripted scrolling: the anchors now have to reach
   `/#contact` from four other routes, and the browser's own hash handling
   already honours the `scroll-behavior` reset that globals.css applies under
   prefers-reduced-motion. */
export function SiteHeader({ children }: { children?: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)

  /* Unscrolled, the bar carries no fill: the nav sits on the blue sheet as part
     of the drawing, the way it did when it was still in flow. The moment the
     page moves it has to paint itself -- the sheet's own copy passes underneath
     it before the sheet does, and white nav copy over that, or over the cream
     body further down, is unreadable. */
  useEffect(() => {
    let frame = 0
    const sync = () => {
      frame = 0
      /* A few pixels of slack: a trackpad or an overscroll bounce should not be
         able to flick the fill on and off around zero. */
      setAtTop(window.scrollY <= 4)
    }
    /* Scroll fires far faster than the screen redraws, and one reading per frame
       is all the browser can show. */
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync)
    }

    sync()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  /* The mobile menu now covers the page instead of pushing it down, so it is a
     layer, and a layer has to be dismissible from the keyboard. */
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  /* An open menu always needs the fill: it can be opened at the very top of the
     page, where the bar is otherwise transparent, and its links would then sit
     on the hero video. */
  const filled = !atTop || menuOpen

  return (
    <>
      {/* The rule under the bar is drawn by adding the border, not by fading its
          colour: `* { @apply border-border }` in globals.css is unlayered, so it
          beats any border-colour utility and a "transparent" border would still
          paint a hairline over the hero. */}
      <div
        className={cn(
          'blueprint-invert fixed inset-x-0 top-0 z-50 text-primary-foreground transition-colors duration-200 ease-out',
          filled && 'border-b bg-primary',
        )}
      >
        <a
          href="#main"
          className="absolute left-5 top-5 z-10 -translate-y-[200%] bg-accent px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground focus:translate-y-0"
        >
          Skip to main content
        </a>

        {/* The row is set to --nav-height rather than padded to it, so the
            spacer holding its place in the sheet is the same number and not an
            estimate of one. */}
        <nav
          className="mx-auto flex h-[var(--nav-height)] w-full max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10"
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
            className="mx-auto flex w-full max-w-7xl flex-col gap-5 border-t border-primary-foreground/30 px-5 py-5 text-sm font-semibold uppercase tracking-[0.12em] lg:hidden"
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
      </div>

      <header
        id="top"
        className="hero-sheet blueprint-surface blueprint-invert relative w-full overflow-hidden bg-primary text-primary-foreground"
      >
        {/* The plan without the grid under it. Every other blue band pairs the
            two, but this one also carries the logo video and the largest type
            on the site, and graph paper behind both reads as texture on texture
            -- the drawing alone is the blueprint here. */}
        <div className="blueprint-layer blueprint-plan-layer" aria-hidden="true" />

        {/* Holds the space the fixed bar no longer takes up in flow, so the
            sheet is as tall as it was and its opening copy starts where it
            always did. */}
        <div className="h-[var(--nav-height)]" aria-hidden="true" />

        {children}
      </header>
    </>
  )
}
