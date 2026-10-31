import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Close } from './svg'
import { FESTIVALS, getActiveFestival, isPreview } from '../data/festivals.js'

const DISMISS_KEY = 'rr_festival_dismissed_v1'

export default function FestivalBanner() {
  const [festival, setFestival] = useState(() => {
    if (typeof window === 'undefined') return null
    const preview = isPreview()
    const f = preview ? FESTIVALS.find((x) => x.id === 'diwali') : getActiveFestival()
    if (!f) return null
    if (!preview) {
      try {
        const raw = localStorage.getItem(DISMISS_KEY)
        if (raw && JSON.parse(raw).id === f.id) return null
      } catch {
        // ignore malformed storage
      }
    }
    return f
  })

  function dismiss() {
    if (!festival) return
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify({ id: festival.id, t: Date.now() }))
    } catch {
      // ignore storage errors
    }
    setFestival(null)
  }

  if (!festival) return null

  return (
    <div
      className="rr-festival-banner"
      role="region"
      aria-label={`${festival.name} promotion`}
      style={{ background: festival.bg, color: festival.fg }}
    >
      <span aria-hidden style={{ fontSize: '1.2em', flexShrink: 0 }}>{festival.icon}</span>
      <span className="rr-festival-banner__msg">{festival.message}</span>
      <Link to={festival.to || '/shop'} className="rr-festival-banner__cta" style={{ color: festival.fg, borderColor: festival.accent }}>
        {festival.cta}
      </Link>
      <button type="button" onClick={dismiss} aria-label="Dismiss banner" className="rr-festival-banner__close" style={{ color: festival.fg }}>
        <Close size={16} />
      </button>
    </div>
  )
}