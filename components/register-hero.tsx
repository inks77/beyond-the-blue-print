'use client'

import { PageHero } from '@/components/page-hero'
import { useCapacity } from '@/components/register-capacity'

/* The register page's hero is the only one on the site that moves: it names
   the capacity currently chosen in the form below it, on arrival and on every
   change of card. */
export function RegisterHero() {
  const { capacity } = useCapacity()

  return (
    <PageHero
      eyebrow="Register"
      title={`${capacity.title}.`}
      copy={capacity.copy}
      meta="One form / Kampala, Uganda — a reply from a person"
    />
  )
}
