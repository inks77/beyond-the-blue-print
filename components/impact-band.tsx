import { impactStats } from '@/lib/site'

/* The hairline rules between stats are the parent's background showing through
   a 1px grid gap, so the parent has to be exactly the size of the grid -- any
   padding on it and the pale wash spreads across the whole band instead of the
   gaps. Padding lives on the wrapper. */
export function ImpactBand() {
  return (
    <section className="blueprint-surface blueprint-invert relative bg-primary text-primary-foreground" aria-label="The hub in numbers">
      <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="grid gap-px bg-primary-foreground/20 md:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="bg-primary py-5 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
              <p className="text-6xl font-black tracking-[-0.06em] md:text-7xl">{stat.value}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">{stat.label}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-primary-foreground/70">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
