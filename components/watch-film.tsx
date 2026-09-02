'use client'

import { useEffect, useRef } from 'react'
import { Play } from 'lucide-react'

import { getImage, getVideo } from '@/lib/images'

export function WatchFilm() {
  const watchVideo = useRef<HTMLVideoElement>(null)

  // The watch film is a 3-minute, ~19 MB download, so it ships as preload="metadata"
  // and only warms its buffer once the section is close to the viewport — by the time
  // the play button is pressed the browser is already streaming ahead, and playback
  // runs to the end without stalling. `preload` is only consulted while the browser
  // has not started fetching media, so raising it needs a load() to take effect.
  useEffect(() => {
    const video = watchVideo.current
    if (!video) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        // Re-running the resource selection algorithm mid-playback would seek the
        // viewer back to the start, so leave a video that is already going alone.
        if (!video.paused || video.currentTime > 0) return
        video.preload = 'auto'
        video.load()
      },
      { rootMargin: '400px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="blueprint-surface blueprint-invert relative mx-3 overflow-hidden bg-primary px-6 py-16 text-primary-foreground md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16"
      id="watch"
    >
      <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
      <div className="blueprint-layer blueprint-plan-layer" aria-hidden="true" />
      <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <p className="eyebrow text-primary-foreground/60">Watch</p>
          <h2 className="mt-5 max-w-lg text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-6xl">
            See it for yourself.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-7 text-primary-foreground/80">
            Three minutes inside the room — the conversations, the people, and the energy that make this more than another
            business event.
          </p>
          <p className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            <Play className="size-4 text-accent" /> 2:58 / Kampala
          </p>
        </div>
        <div className="mx-auto w-full max-w-xs border border-primary-foreground/20 bg-black md:max-w-sm">
          <video
            ref={watchVideo}
            className="aspect-[9/16] w-full object-cover"
            width={720}
            height={1280}
            controls
            playsInline
            preload="metadata"
            poster={getImage(getVideo('santina-film').poster).src}
          >
            <source src={getVideo('santina-film').src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
