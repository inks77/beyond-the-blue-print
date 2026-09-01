import { NewsletterForm } from '@/components/newsletter-form'

export function ContactBlock() {
  return (
    <section
      className="blueprint-surface blueprint-on-accent mx-3 bg-accent px-6 py-16 md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16"
      id="contact"
    >
      <div className="blueprint-layer blueprint-grid" aria-hidden="true" />
      <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="eyebrow text-accent-foreground/60">Pull up a chair</p>
          <h2 className="mt-5 max-w-2xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-accent-foreground md:text-7xl">
            Your next move starts here.
          </h2>
        </div>
        <NewsletterForm tone="accent" />
      </div>
    </section>
  )
}
