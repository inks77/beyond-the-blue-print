'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { site } from '@/lib/site'

export function Hero() {
  const heroVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      const video = heroVideo.current
      if (!video) return
      if (media.matches) {
        video.pause()
        video.currentTime = 0
      } else {
        video.play().catch(() => {})
      }
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <div className="relative mx-auto grid w-full min-h-[560px] max-w-7xl items-end px-5 pb-8 pt-16 md:min-h-[600px] md:px-8 md:pb-12 lg:px-10">
      <div className="max-w-5xl">
        <p className="hero-copy relative mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
          <span className="size-2 bg-accent" /> {site.tagline}
        </p>
        <h1 className="sr-only">Beyond the Blue Print Uganda — a business hub for the bold</h1>
        <div className="hero-plate w-full max-w-xl md:max-w-2xl lg:max-w-4xl">
          {/* No `autoPlay` attribute: it ships in the server HTML and the browser
              acts on it at parse time, well before hydration runs the
              reduced-motion guard in the effect above, so such a visitor would see
              the loop start before anything could stop it. The effect is the
              only thing that starts playback. The poster covers the gap. */}
          <video
            ref={heroVideo}
            className="block aspect-video w-full rounded-none border-0 bg-brand-blue object-cover shadow-none"
            width={1280}
            height={720}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/btb-logo-poster.png"
            aria-hidden="true"
          >
            <source src="/btb-logo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy relative mt-10 flex flex-col justify-between gap-7 border-t border-primary-foreground/30 pt-5 md:flex-row md:items-end">
          <p className="max-w-md text-pretty text-base leading-6 text-primary-foreground/80 md:text-lg">
            {site.description}
          </p>
          <Link
            href="/programs"
            className="flex w-fit items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground transition-transform hover:-translate-y-1"
          >
            Explore the hub <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="hero-copy absolute bottom-8 right-5 hidden font-mono text-right text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70 md:right-8 md:block lg:right-10">
        Kampala / Uganda
        <br />
        Building in public
      </div>
    </div>
  )
}
