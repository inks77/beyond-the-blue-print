import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'

import { SiteFooter } from '@/components/site-footer'
import { getImage } from '@/lib/images'
import './globals.css'

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
  themeColor: '#154e91',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {/* One element as the sole body child, on every route: it is what
            establishes the stacking context that `body > * { z-index: 1 }` in
            globals.css relies on, and the hero's text antialiasing turns out to
            be sensitive to losing it. Header and main are supplied per page --
            the homepage hero and an interior page title sit on the same blue
            sheet as the nav, so the header cannot be hoisted up here -- while
            the footer is identical everywhere and lives here. */}
        <div className="min-h-screen overflow-hidden text-foreground">
          {children}
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
