import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Close,
  CrescentStar,
  Lantern,
  Heart,
  Diya,
  Rakhi,
  Bouquet,
  PartyPopper,
  Sparkle,
} from './svg'
import { FESTIVALS, getActiveFestival, isPreview } from '../data/festivals.js'

const DISMISS_KEY = 'rr_festival_dismissed_v2'
// Dismissal is remembered per festival *and* year, so next year's banner shows again.
const dismissToken = (f) => `${f.id}-${new Date().getFullYear()}`

const ICONS = {
  CrescentStar,
  Lantern,
  Heart,
  Diya,
  Rakhi,
  Bouquet,
  PartyPopper,
}

export default function FestivalBanner() {
  const [festival, setFestival] = useState(() => {
    if (typeof window === 'undefined') return null
    const preview = isPreview()
    const f = preview ? FESTIVALS.find((x) => x.id === 'diwali') : getActiveFestival()
    if (!f) return null
    if (!preview) {
      try {
        const raw = localStorage.getItem(DISMISS_KEY)
        if (raw && JSON.parse(raw).token === dismissToken(f)) return null
      } catch {
        // ignore malformed storage
      }
    }
    return f
  })

  function dismiss() {
    if (!festival) return
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify({ token: dismissToken(festival), t: Date.now() }))
    } catch {
      // ignore storage errors
    }
    setFestival(null)
  }

  if (!festival) return null

  const IconComp = ICONS[festival.icon] || Sparkle

  return (
    <div
      className="rr-festival-banner"
      role="region"
      aria-label={`${festival.name} promotion`}
      style={{ background: festival.bg, color: festival.fg }}
    >
      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
        <IconComp size={18} />
      </span>
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
