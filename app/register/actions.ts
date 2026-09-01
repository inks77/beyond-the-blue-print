'use server'

import { capacityById } from '@/lib/registration'

export type RegistrationState = {
  status: 'idle' | 'success' | 'error'
  /* Field name -> message. Rendered next to the input and, on a no-JS
     submission, re-rendered with the values the visitor already typed. */
  errors?: Record<string, string>
  message?: string
  /* Capacity the successful registration was made in, so the confirmation can
     name it back. */
  capacityId?: string
  /* Echoed back so a rejected form keeps what was typed when JavaScript is off
     and React cannot preserve the DOM state itself. */
  values?: Record<string, string>
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function field(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitRegistration(
  _previous: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  /* Hidden field, positioned off-screen and never announced. A human leaves it
     empty; the crawlers that fill every input do not. */
  if (field(formData, 'website')) {
    return { status: 'success', capacityId: capacityById(field(formData, 'capacity'))?.id }
  }

  const values = {
    capacity: field(formData, 'capacity'),
    name: field(formData, 'name'),
    email: field(formData, 'email'),
    phone: field(formData, 'phone'),
    organisation: field(formData, 'organisation'),
    detail: field(formData, 'detail'),
    updates: formData.get('updates') ? 'yes' : 'no',
  }

  const capacity = capacityById(values.capacity)
  const errors: Record<string, string> = {}

  if (!capacity) errors.capacity = 'Choose how you want to take part.'
  if (!values.name) errors.name = 'We need a name to put to the registration.'
  if (!values.email) errors.email = 'We need an email address to reply to.'
  else if (!emailPattern.test(values.email)) errors.email = 'That email address does not look right.'
  if (capacity?.detailRequired && !values.detail) errors.detail = 'This one we do need — a couple of sentences is plenty.'
  if (values.detail.length > 4000) errors.detail = 'Please keep this under 4000 characters.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values, message: 'Nearly — a couple of things need fixing.' }
  }

  const entry = {
    receivedAt: new Date().toISOString(),
    capacity: capacity!.id,
    capacityTitle: capacity!.title,
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    organisation: values.organisation || null,
    detail: values.detail || null,
    wantsUpdates: values.updates === 'yes',
  }

  /* Where registrations go. Set REGISTRATION_WEBHOOK_URL to any endpoint that
     accepts a JSON POST -- a form service, an automation, a sheet webhook --
     and every submission is delivered there. With nothing configured the
     submission is still accepted and written to the server log rather than
     dropped, so nothing a visitor sends is lost while the destination is being
     decided; see README.md. */
  const endpoint = process.env.REGISTRATION_WEBHOOK_URL

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(entry),
      })
      if (!response.ok) throw new Error(`Registration endpoint responded ${response.status}`)
    } catch (error) {
      /* Never lose the submission because the delivery hop failed: log it in
         full, then tell the visitor honestly rather than showing a confirmation
         for something that did not arrive. */
      console.error('[registration] delivery failed —', JSON.stringify(entry))
      console.error(error)
      return {
        status: 'error',
        values,
        message: 'Something went wrong sending that. Please try again in a moment.',
      }
    }
  } else {
    console.warn('[registration] no REGISTRATION_WEBHOOK_URL set — recorded to log only:', JSON.stringify(entry))
  }

  return { status: 'success', capacityId: capacity!.id }
}
