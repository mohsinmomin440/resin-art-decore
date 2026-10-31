import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * AnnouncementBar — continuous slow left-scroll marquee, pauses on hover/focus.
 * Under prefers-reduced-motion it becomes a static centered strip.
 */
export default function MarqueeBar({ items }) {
  const reduce = useReducedMotion()
  const trackRef = useRef(null)

  // Duplicate the track so translateX(-50%) loops seamlessly.
  useEffect(() => {
    const track = trackRef.current
    if (!reduce && track) {
      // Clone the visible content once, so the loop is seamless.
      if (track.dataset.cloned !== '1') {
        track.innerHTML += track.innerHTML
        track.dataset.cloned = '1'
      }
    }
  }, [reduce])

  return (
    <div className="rr-announce" aria-live="polite">
      <div
        ref={trackRef}
        className={`rr-announce__track${reduce ? ' rr-announce__track--static' : ''}`}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
        onFocusCapture={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
        onBlurCapture={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
      >
        {items.map((item, i) => (
          <span key={i} className="rr-announce__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}