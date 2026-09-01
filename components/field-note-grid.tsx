import { SiteImage } from '@/components/site-image'
import type { FieldNote } from '@/lib/site'

/* Mixed grid: photographs where there is photography, written notes where
   there is not. The written tiles are not filler for missing images -- they
   are the other half of what a field note is -- so the grid stays whole while
   the archive is still small. */
export function FieldNoteGrid({ items }: { items: FieldNote[] }) {
  return (
    <div className="grid auto-rows-[220px] gap-3 md:auto-rows-[260px] md:grid-cols-3">
      {items.map((item, index) =>
        item.kind === 'image' ? (
          <figure key={item.image} className={`relative overflow-hidden bg-muted ${item.className ?? ''}`}>
            <SiteImage
              id={item.image}
              fill
              className="object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="absolute bottom-0 left-0 bg-background/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">
              {item.tag}
            </figcaption>
          </figure>
        ) : (
          <blockquote
            key={`${item.tag}-${index}`}
            className={`blueprint-surface relative flex flex-col justify-between p-6 ${
              item.tone === 'blue' ? 'blueprint-invert bg-primary text-primary-foreground' : 'blueprint-on-accent bg-accent text-accent-foreground'
            }`}
          >
            <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
            <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{item.tag}</p>
            <div className="relative">
              <p className="text-xl font-black uppercase leading-[1.05] tracking-[-0.03em]">{item.title}</p>
              <p className="mt-3 text-sm leading-6 opacity-80">{item.copy}</p>
            </div>
          </blockquote>
        ),
      )}
    </div>
  )
}
