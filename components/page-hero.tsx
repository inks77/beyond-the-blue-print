import Link from 'next/link'

/* The interior-page counterpart to the homepage hero: same blue sheet handed in
   as SiteHeader children, sized down so a subpage does not open on a full
   viewport of blue before its first sentence. */
export function PageHero({
  eyebrow,
  title,
  copy,
  meta,
  breadcrumb,
}: {
  eyebrow: string
  title: string
  copy?: string
  meta?: string
  breadcrumb?: { href: string; label: string }
}) {
  return (
    <div className="hero-copy relative mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14 lg:px-10">
      {breadcrumb && (
        <Link
          href={breadcrumb.href}
          className="mb-8 inline-flex font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/70 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← {breadcrumb.label}
        </Link>
      )}
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
        <span className="size-2 bg-accent" /> {eyebrow}
      </p>
      <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] md:text-7xl">
        {title}
      </h1>
      {copy && <p className="mt-8 max-w-xl text-pretty text-lg leading-7 text-primary-foreground/80">{copy}</p>}
      {meta && (
        <p className="mt-10 border-t border-primary-foreground/30 pt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
          {meta}
        </p>
      )}
    </div>
  )
}
