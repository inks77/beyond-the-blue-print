'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'

import { submitRegistration, type RegistrationState } from '@/app/register/actions'
import { capacities, capacityById, type Capacity } from '@/lib/registration'

const initialState: RegistrationState = { status: 'idle' }

const fieldClass =
  'w-full border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent'

/* One form, seven capacities. The capacity arrives from the button the visitor
   pressed (`/register?as=speaker`), so the thing they already told us is
   already answered -- they can still change it here, and the free-text prompt
   changes with it.

   It is a real <form> bound to a server action, so it submits and validates
   with JavaScript off as well as on; the pending state and the live prompt are
   the enhancement, not the mechanism. */
export function RegistrationForm({ initialCapacity }: { initialCapacity: Capacity }) {
  const [state, formAction, pending] = useActionState(submitRegistration, initialState)
  const [selected, setSelected] = useState(initialCapacity.id)
  const headingRef = useRef<HTMLDivElement>(null)

  const capacity = capacityById(selected) ?? initialCapacity
  const values = state.values ?? {}
  const errors = state.status === 'error' ? (state.errors ?? {}) : {}

  /* Focus and the viewport both move to the outcome. Submitting from the
     bottom of a long form and having it replaced by a short confirmation
     otherwise leaves the visitor looking at the footer, with nothing on screen
     saying it worked. */
  useEffect(() => {
    if (state.status === 'idle') return
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ block: 'center' })
  }, [state])

  if (state.status === 'success') {
    const registered = capacityById(state.capacityId) ?? capacity
    return (
      <div className="border border-border bg-background p-8 md:p-12" ref={headingRef} tabIndex={-1}>
        <div className="flex items-center gap-3 text-accent-foreground">
          <span className="flex size-9 items-center justify-center bg-accent">
            <Check className="size-5" />
          </span>
          <p className="eyebrow">Registered</p>
        </div>
        <h2 className="mt-8 max-w-xl text-balance text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-4xl">
          You are down for “{registered.title}”.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          We read every one of these ourselves. Expect a reply from a person, not an autoresponder — and the dates before
          they go public.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] underline decoration-accent decoration-2 underline-offset-4"
          >
            Register in another capacity <ArrowUpRight className="size-4" />
          </button>
          <Link href="/programs" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Back to the programmes <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="border border-border bg-background p-6 md:p-10">
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        {state.status === 'error' && state.message && (
          <p role="alert" className="mb-8 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {state.message}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="eyebrow">I am here to</legend>
        <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
          {capacities.map((option, index) => (
            <label
              key={option.id}
              /* An odd number of capacities would otherwise leave a bare cell
                 of grid gap at the end, reading as a broken card; the last one
                 takes the full row instead. */
              className={`cursor-pointer bg-background p-5 transition-colors hover:bg-accent/15 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-3px] has-[:focus-visible]:outline-[color:var(--focus-ring)] ${
                index === capacities.length - 1 && capacities.length % 2 === 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <input
                type="radio"
                name="capacity"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="sr-only"
              />
              <span className="flex items-start justify-between gap-3">
                <span className="text-lg font-black uppercase leading-tight tracking-[-0.02em]">{option.title}</span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">{option.label}</span>
              </span>
              <span className="mt-3 block text-sm leading-6 opacity-80">{option.copy}</span>
            </label>
          ))}
        </div>
        {errors.capacity && <FieldError id="capacity-error">{errors.capacity}</FieldError>}
      </fieldset>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Field label="Your name" name="name" required error={errors.name}>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} defaultValue={values.name} />
        </Field>
        <Field label="Email address" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            defaultValue={values.email}
          />
        </Field>
        <Field label="Phone or WhatsApp" name="phone" hint="Optional" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} defaultValue={values.phone} />
        </Field>
        <Field label="Company or what you do" name="organisation" hint="Optional" error={errors.organisation}>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            className={fieldClass}
            defaultValue={values.organisation}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label={capacity.prompt}
          name="detail"
          required={Boolean(capacity.detailRequired)}
          error={errors.detail}
        >
          <textarea
            id="detail"
            name="detail"
            rows={5}
            required={Boolean(capacity.detailRequired)}
            maxLength={4000}
            placeholder={capacity.placeholder}
            className={`${fieldClass} resize-y`}
            defaultValue={values.detail}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input
          type="checkbox"
          name="updates"
          defaultChecked={values.updates !== 'no'}
          className="mt-1 size-4 shrink-0 accent-[color:var(--accent)]"
        />
        Send me the dates and announcements before they go public.
      </label>

      {/* Honeypot. Off-screen rather than hidden so the field is real to a bot
          and absent to everyone else; never announced, never tab-stopped. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-8">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-3 bg-accent px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
        >
          {pending ? (
            <>
              Sending <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Register — {capacity.label} <ArrowUpRight className="size-4" />
            </>
          )}
        </button>
        <p className="max-w-xs text-xs leading-5 text-muted-foreground">
          We use what you send here to reply and to plan the room. Nothing is passed on to anyone else.
        </p>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  required,
  hint,
  error,
  children,
}: {
  label: string
  name: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em]">
        <span>
          {label}
          {required && <span className="text-accent-foreground"> *</span>}
        </span>
        {hint && <span className="font-mono text-[10px] font-normal tracking-[0.16em] text-muted-foreground">{hint}</span>}
      </label>
      {children}
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-semibold text-destructive">
      {children}
    </p>
  )
}
