import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'

import { SiteFooter } from '@/components/site-footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    template: '%s — Beyond the Blue Print',
  },
  description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Beyond the Blue Print Uganda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEYOND THE BLUE PRINT — A business hub for the bold',
    description: 'A growing community connecting young entrepreneurs, investors, and established businesses through conferences, mentorship, and business storytelling.',
    images: ['/og-image.png'],
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
