'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { capacityById, registerHref, type Capacity } from '@/lib/registration'

/* The capacity is the one thing the hero and the form both have to agree on:
   the visitor arrives on `/register?as=speaker` and the heading already says
   "Take the stage", and picking a different card has to move the heading with
   it. Both sides read the same state from here rather than each keeping their
   own copy. */
type CapacityContextValue = {
  capacity: Capacity
  selectCapacity: (id: string) => void
}

const CapacityContext = createContext<CapacityContextValue | null>(null)

export function CapacityProvider({
  initialCapacity,
  children,
}: {
  initialCapacity: Capacity
  children: React.ReactNode
}) {
  /* Seeded from the server-resolved `?as=`, so the first paint -- heading,
     selected card, and prompt -- is already the capacity that was linked to,
     with nothing to correct once JavaScript arrives. */
  const [selectedId, setSelectedId] = useState(initialCapacity.id)
  const capacity = capacityById(selectedId) ?? initialCapacity

  const selectCapacity = useCallback((id: string) => {
    const next = capacityById(id)
    if (!next) return
    setSelectedId(next.id)
    /* Keep `?as=` in step with the picker, so a reload, a shared link, or a
       return to this page opens on the capacity that was showing. History,
       not the router: the page already holds the copy for every capacity, so
       a server round trip would only re-render what is on screen. */
    window.history.replaceState(null, '', registerHref(next.id))
  }, [])

  const value = useMemo(() => ({ capacity, selectCapacity }), [capacity, selectCapacity])

  return <CapacityContext.Provider value={value}>{children}</CapacityContext.Provider>
}

export function useCapacity() {
  const value = useContext(CapacityContext)
  if (!value) throw new Error('useCapacity must be used inside a CapacityProvider')
  return value
}
