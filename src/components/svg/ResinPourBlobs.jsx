/**
 * ResinPourBlobs — hero decorative art: slow morphing blobs that look like
 * liquid resin settling. Runs in an ambient loop (5s each) only when JS is
 * on and prefers-reduced-motion is not set.
 */
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ResinPourBlobs({ className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={`rr-resin-pour${className ? ' ' + className : ''}`} aria-hidden style={{ opacity: 0.15 }}>
        <div className="rr-resin-pour__blob rr-resin-pour__blob--1" />
        <div className="rr-resin-pour__blob rr-resin-pour__blob--2" />
        <div className="rr-resin-pour__blob rr-resin-pour__blob--3" />
      </div>
    )
  }
  return (
    <div className={`rr-resin-pour${className ? ' ' + className : ''}`} aria-hidden>
      <div className="rr-resin-pour__blob rr-resin-pour__blob--1" />
      <div className="rr-resin-pour__blob rr-resin-pour__blob--2" />
      <div className="rr-resin-pour__blob rr-resin-pour__blob--3" />
      <div className="rr-resin-pour__blob rr-resin-pour__blob--4" />
    </div>
  )
}