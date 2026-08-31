'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X, Play, Check, Send } from 'lucide-react'

const programs = [
  { id: 'conference', label: 'Conference', number: '01', title: 'Big ideas. One room.', copy: 'An annual gathering where emerging founders, investors, creatives, and established business leaders meet to exchange what is next.', color: 'blue' },
  { id: 'onground', label: 'On Ground', number: '02', title: 'Business, in the real world.', copy: 'We step into businesses, teach what works, and help established brands speak to the generation building the future.', color: 'coral' },
  { id: 'show', label: 'The Show', number: '03', title: 'The business behind the story.', copy: 'An entertainment-led format that makes entrepreneurship human, accessible, and worth paying attention to.', color: 'ink' },
  { id: 'mentorship', label: 'Mentorship', number: '04', title: 'A clearer way forward.', copy: 'Practical guidance, honest conversations, and a community that helps young builders move from idea to action.', color: 'blue' },
]

const gallery = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85', alt: 'Audience gathered at a conference', className: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85', alt: 'Team collaborating around a table' },
  { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85', alt: 'Speaker addressing a business audience' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProgram, setActiveProgram] = useState('conference')
  const [submitted, setSubmitted] = useState(false)
  const active = programs.find((program) => program.id === activeProgram) ?? programs[0]

  function scrollTo(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10" aria-label="Main navigation">
        <button onClick={() => scrollTo('top')} className="flex items-center gap-3 text-left" aria-label="Beyond the Blue Print home">
          <span className="flex size-9 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">BTB</span>
          <span className="max-w-28 text-xs font-semibold uppercase leading-tight tracking-[0.14em]">Beyond the<br />Blue Print</span>
        </button>
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] md:flex">
          <button onClick={() => scrollTo('programs')} className="transition-colors hover:text-primary">What we do</button>
          <button onClick={() => scrollTo('story')} className="transition-colors hover:text-primary">Our story</button>
          <button onClick={() => scrollTo('contact')} className="transition-colors hover:text-primary">Partner with us</button>
        </div>
        <button className="hidden items-center gap-2 border border-foreground px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-primary hover:text-primary-foreground md:flex" onClick={() => scrollTo('contact')}>Join the hub <ArrowUpRight className="size-4" /></button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="mx-5 flex flex-col gap-5 border-y border-border py-5 text-sm font-semibold uppercase tracking-[0.12em] md:hidden"><button onClick={() => scrollTo('programs')}>What we do</button><button onClick={() => scrollTo('story')}>Our story</button><button onClick={() => scrollTo('contact')}>Partner with us</button></div>}

      <section id="top" className="blueprint-grid relative mx-3 mt-2 grid min-h-[620px] items-end overflow-hidden bg-primary px-6 pb-8 pt-24 text-primary-foreground md:mx-5 md:min-h-[650px] md:px-12 md:pb-12 lg:mx-8 lg:px-16">
        <div className="relative z-10 max-w-5xl">
          <p className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-primary-foreground/70"><span className="size-2 bg-accent" /> A business hub for the bold</p>
          <h1 className="max-w-5xl text-balance font-sans text-[clamp(3.5rem,10vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">Beyond<br /><span className="text-accent">the blue</span><br />print.</h1>
          <div className="mt-10 flex flex-col justify-between gap-7 border-t border-primary-foreground/30 pt-5 md:flex-row md:items-end">
            <p className="max-w-md text-pretty text-base leading-6 text-primary-foreground/80 md:text-lg">We connect young entrepreneurs, investors, and established businesses to the people and ideas shaping what comes next.</p>
            <button onClick={() => scrollTo('programs')} className="flex w-fit items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground transition-transform hover:-translate-y-1">Explore the hub <ArrowUpRight className="size-4" /></button>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden font-mono text-right text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 md:block">Lagos / Africa<br />Building in public</div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-8 md:py-28 lg:px-10" id="story">
        <div><p className="eyebrow">Why we exist</p><div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase"><span className="h-px w-10 bg-accent" /> No blueprint is final</div></div>
        <div><h2 className="max-w-3xl text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-6xl">The future is built by people willing to redraw the map.</h2><p className="mt-8 max-w-2xl text-pretty text-lg leading-7 text-muted-foreground">BEYOND THE BLUE PRINT is a growing community for the curious, the scrappy, and the established. We create spaces where experience meets energy — where a factory with decades behind it can find a new audience, and a young founder can find the push to begin.</p></div>
      </section>

      <section className="border-y border-border bg-muted/40" id="programs"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-10"><div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">The blueprint</p><h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Four ways in.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Different entry points. One shared ambition: build businesses that matter.</p></div><div className="grid gap-px border border-border bg-border md:grid-cols-2">{programs.map((program) => <button key={program.id} onClick={() => setActiveProgram(program.id)} className={`group min-h-64 bg-background p-6 text-left transition-colors md:p-8 ${activeProgram === program.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/20'}`}><div className="flex items-start justify-between"><span className="font-mono text-xs">{program.number}</span><ArrowUpRight className={`size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${activeProgram === program.id ? 'text-accent' : ''}`} /></div><div className="mt-16"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">{program.label}</p><h3 className="text-2xl font-black uppercase tracking-[-0.03em]">{program.title}</h3></div></button>)}</div><div className="grid gap-8 border-x border-b border-border bg-primary p-7 text-primary-foreground md:grid-cols-[1fr_2fr] md:p-10"><p className="font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/60">{active.label} / 0{programs.indexOf(active) + 1}</p><div><p className="max-w-xl text-xl leading-8">{active.copy}</p><button onClick={() => scrollTo('contact')} className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent">Get involved <ArrowUpRight className="size-4" /></button></div></div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28 lg:px-10"><div><p className="eyebrow">The gathering</p><h2 className="mt-5 max-w-lg text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">The room changes everything.</h2><p className="mt-8 max-w-md text-lg leading-7 text-muted-foreground">Our flagship conference brings the community together for a day of honest conversations, useful connections, and ideas you can take back to work.</p><button onClick={() => scrollTo('contact')} className="mt-8 flex items-center gap-3 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground">Register interest <ArrowUpRight className="size-4" /></button></div><div className="relative min-h-96 bg-muted"><Image src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85" alt="Conference audience listening to a speaker" fill className="object-cover grayscale mix-blend-multiply" sizes="(max-width: 768px) 100vw, 50vw" /><div className="absolute bottom-4 left-4 bg-accent px-4 py-3 font-mono text-xs uppercase text-accent-foreground">Ideas in motion / 2026</div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28 lg:px-10"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">Field notes</p><h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] md:text-5xl">People in motion.</h2></div><button className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] md:flex">View the archive <ArrowUpRight className="size-4" /></button></div><div className="grid auto-rows-[220px] gap-3 md:grid-cols-3 md:auto-rows-[260px]">{gallery.map((item) => <div key={item.src} className={`relative overflow-hidden bg-muted ${item.className ?? ''}`}><Image src={item.src} alt={item.alt} fill className="object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0" sizes="(max-width: 768px) 100vw, 33vw" /></div>)}</div></section>

      <section className="mx-3 bg-accent px-6 py-16 md:mx-5 md:px-12 md:py-20 lg:mx-8 lg:px-16" id="contact"><div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end"><div><p className="eyebrow text-accent-foreground/60">Pull up a chair</p><h2 className="mt-5 max-w-2xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-accent-foreground md:text-7xl">Your next move starts here.</h2></div>{submitted ? <div className="flex items-center gap-3 border border-accent-foreground/30 p-5 text-sm font-semibold text-accent-foreground"><Check className="size-5" /> You&apos;re on the list. We&apos;ll be in touch.</div> : <form className="flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label htmlFor="email" className="sr-only">Email address</label><div className="flex border-b border-accent-foreground/50 py-3"><input id="email" required type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm text-accent-foreground outline-none placeholder:text-accent-foreground/60" /><button type="submit" aria-label="Join the hub"><Send className="size-5 text-accent-foreground" /></button></div><p className="text-xs text-accent-foreground/70">For founders, curious minds, and people building the next thing.</p></form>}</div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs uppercase tracking-[0.12em] md:flex-row md:items-center md:justify-between md:px-8 lg:px-10"><span className="font-bold">Beyond the Blue Print</span><span className="text-muted-foreground">A business hub for the bold — Lagos, Nigeria</span><span className="font-mono text-muted-foreground">© 2026 BTB</span></footer>
    </main>
  )
}
