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
            {/* The grayscale-to-colour reveal is the archive's one hover
                gesture, so it names the single property it moves rather than
                sweeping all of them, and the picture does not grow: a tile
                that scales under a fixed caption drags the photograph out
                from under it. Filter is a paint rather than a composite,
                which is affordable here only because the tiles are small and
                one is hovered at a time. */}
            <SiteImage
              id={item.image}
              fill
              className="object-cover grayscale transition-[filter] duration-200 ease-out hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="absolute bottom-0 left-0 bg-background/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">
              {item.tag}
            </figcaption>
          </figure>
        ) : (
          <blockquote
            key={`${item.tag}-${index}`}
            className={`relative flex flex-col justify-between p-6 ${
              item.tone === 'blue'
                ? 'blueprint-surface blueprint-invert bg-primary text-primary-foreground'
                : 'bg-accent text-accent-foreground'
            }`}
          >
            {/* The grid belongs to the blue sheet. Coral is the one flat
                surface on the site -- it is the accent, and an accent that
                also carries texture stops reading as a single note. */}
            {item.tone === 'blue' ? <div className="blueprint-layer blueprint-grid" aria-hidden="true" /> : null}
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
