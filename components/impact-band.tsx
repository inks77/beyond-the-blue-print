import { impactStats } from '@/lib/site'

/* The numbers band is deliberately the one flat blue surface on the page: the
   sheet either side of it already carries the grid and the plan, and three
   large numerals read faster with nothing drawn behind them. No blueprint
   layer here, so nothing is drawn -- but it still takes .blueprint-invert,
   which paints nothing and only retunes the tokens that change meaning on blue.
   Without it the stat labels would resolve --accent-ink to the cream sheet's
   dark coral and go nearly invisible on the band.

   The hairline rules between stats are the parent's background showing through
   a 1px grid gap, so the parent has to be exactly the size of the grid -- any
   padding on it and the pale wash spreads across the whole band instead of the
   gaps. Padding lives on the wrapper. */
export function ImpactBand() {
  return (
    <section className="blueprint-invert bg-primary text-primary-foreground" aria-label="The hub in numbers">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <div className="grid gap-px bg-primary-foreground/20 md:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="bg-primary py-5 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
              <p className="text-6xl font-black tracking-[-0.06em] md:text-7xl">{stat.value}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-accent-ink">{stat.label}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-primary-foreground/70">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
