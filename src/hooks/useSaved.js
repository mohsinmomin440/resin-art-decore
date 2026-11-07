import { useSyncExternalStore } from 'react'

/**
 * Wishlist store shared by every component (cards, header badge, Saved page).
 * One source of truth + localStorage + cross-tab sync, so hearting item A and
 * then item B can never wipe A, and the header count always matches.
 */
const KEY = 'rr_saved'

function read() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let cache = typeof window === 'undefined' ? [] : read()
const subs = new Set()
const emit = () => subs.forEach((fn) => fn())
const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}

function commit(next) {
  cache = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage blocked — keep in memory only
  }
  emit()
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY || e.key === null) {
      cache = read()
      emit()
    }
  })
}

export function useSaved() {
  const saved = useSyncExternalStore(subscribe, () => cache, () => [])
  return {
    saved,
    isSaved: (slug) => saved.includes(slug),
    toggle: (slug) => commit(cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug]),
    remove: (slug) => commit(cache.filter((s) => s !== slug)),
    clear: () => commit([]),
  }
}
