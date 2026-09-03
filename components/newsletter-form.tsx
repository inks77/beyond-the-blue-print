'use client'

import { useId, useState } from 'react'
import { Check, Send } from 'lucide-react'

/* Two surfaces carry the same capture: the coral contact block and the footer.
   `tone` only swaps the colour tokens -- the markup, the states, and the
   labelling are shared so they can never drift apart. */
export function NewsletterForm({ tone = 'accent' }: { tone?: 'accent' | 'plain' }) {
  const [submitted, setSubmitted] = useState(false)
  const id = useId()

  const text = tone === 'accent' ? 'text-accent-foreground' : 'text-foreground'
  const border = tone === 'accent' ? 'border-accent-foreground/50' : 'border-border'
  const placeholder = tone === 'accent' ? 'placeholder:text-accent-foreground/75' : 'placeholder:text-muted-foreground'
  const help = tone === 'accent' ? 'text-accent-foreground/75' : 'text-muted-foreground'

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 border ${border} p-5 text-sm font-semibold ${text}`}>
        <Check className="size-5" /> You&apos;re on the list. We&apos;ll be in touch.
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className={`flex border-b ${border} py-3`}>
        <input
          id={id}
          required
          type="email"
          placeholder="Your email address"
          className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${text} ${placeholder}`}
        />
        <button type="submit" aria-label="Join the hub">
          <Send className={`size-5 ${text}`} />
        </button>
      </div>
      <p className={`text-xs ${help}`}>For founders, curious minds, and people building the next thing.</p>
    </form>
  )
}
