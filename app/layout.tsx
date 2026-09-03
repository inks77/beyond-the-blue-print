import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'

import { SiteFooter } from '@/components/site-footer'
import { getImage } from '@/lib/images'
import './globals.css'

/* The sheet is lettered, not typeset in whatever the browser has lying around.
   Both faces are self-hosted by next/font -- the files are emitted into the
   build and preloaded from our own origin, so there is no third-party font
   request on any route and no swap flash from a CDN that is having a bad day.

   Archivo is a grotesque with a real 900. That matters here rather than being a
   preference: every display line on this site is set `font-black uppercase` at
   negative tracking, and the previous stack topped out at Arial Bold -- the
   browser was faking the weight, so a heading and a subhead were rendering at
   the same one. The drawn 900 is what makes the headings read as drawn.

   IBM Plex Mono carries the annotations -- eyebrows, drawing numbers, the
   Kampala / Uganda mark. A drafting sheet's small lettering is a mono, and this
   one was cut for technical documents; Courier New is a typewriter. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  /* Plex Mono is not a variable font, so the weights have to be named. These
     are the three the annotations actually use -- shipping the other five
     would be four files nobody downloads. */
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
})

/* Icons and the share card come out of the image database like everything else,
   so `pnpm check:images` catches a missing one before it ships. */
const ogCard = getImage('og-card')
const icons = {
  small: getImage('icon-32'),
  medium: getImage('icon-192'),
  large: getImage('icon-512'),
  apple: getImage('apple-icon'),
}

export const metadata: Metadata = {
  title: {
    default: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    template: '%s — Beyond the Blue Print',
  },
  description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: icons.small.src, sizes: '32x32', type: 'image/png' },
      { url: icons.medium.src, sizes: '192x192', type: 'image/png' },
      { url: icons.large.src, sizes: '512x512', type: 'image/png' },
    ],
    apple: icons.apple.src,
  },
  openGraph: {
    title: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
    type: 'website',
    images: [{ url: ogCard.src, width: ogCard.width, height: ogCard.height, alt: ogCard.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
    images: [ogCard.src],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  /* The one place --brand-blue has to be written out: the browser reads this
     from the document metadata before any stylesheet is applied, so it cannot
     be a var(). Keep it in step with --brand-blue in app/globals.css. */
  themeColor: '#154e91', // design-lint-disable: metadata cannot reference a CSS token
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} bg-background`}>
      <body className="antialiased">
        {/* One element as the sole body child, on every route: it is what
            establishes the stacking context that `body > * { z-index: 1 }` in
            globals.css relies on, and the hero's text antialiasing turns out to
            be sensitive to losing it. Header and main are supplied per page --
            the homepage hero and an interior page title sit on the same blue
            sheet as the nav, so the header cannot be hoisted up here -- while
            the footer is identical everywhere and lives here. */}
        <div className="min-h-screen overflow-hidden text-foreground">
          {/* Thins the fixed floor plan across the middle band so no drafting
              line sits behind body copy at full strength; see globals.css. */}
          <div className="blueprint-veil" aria-hidden="true" />
          {children}
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
