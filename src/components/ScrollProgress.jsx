import { useScrollProgress } from '../hooks/useScrollProgress'

/**
 * 3px gold bar under the header, showing how far down the page you are.
 * Pure CSS width — 60fps, no layout work.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="rr-scroll-progress"
      style={{ width: `${Math.round(progress * 100)}%` }}
      aria-hidden
    />
  )
}