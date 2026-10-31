import { useEffect, useState } from 'react'

/**
 * 0..1 scroll progress. Used by ScrollProgress to drive a gold bar under the
 * header. Passive listener — no layout work on scroll.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      setProgress(total <= 0 ? 0 : window.scrollY / total)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}