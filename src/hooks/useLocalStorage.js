import { useEffect, useState } from 'react'

/**
 * localStorage-backed state. Returns [value, setter]. Fails closed — if storage
 * is blocked (private mode, quota) it silently falls back to in-memory state.
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage blocked — keep value in state only
    }
  }, [key, value])

  return [value, setValue]
}