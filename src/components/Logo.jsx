/**
 * Logo — official brand emblem + wordmark.
 * Size prop: 'sm' | 'md' (default) | 'lg' | 'header' | 'footer'.
 */
import { Link } from 'react-router-dom'

const SIZES = {
  sm: { mark: 36, word: 13, tagline: 8.5 },
  md: { mark: 46, word: 16, tagline: 9.5 },
  lg: { mark: 64, word: 22, tagline: 12 },
  header: { mark: 44, word: 16.5, tagline: 9.5 },
  footer: { mark: 52, word: 18, tagline: 10 },
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function Logo({ size = 'md' }) {
  const s = SIZES[size] || SIZES.md
  return (
    <Link to="/" className="rr-logo" aria-label="Aman Resin Art And Decore — home">
      <img
        src={`${BASE}/images/brand/logo-128.webp`}
        alt="Aman Resin Art And Decore official emblem"
        width={s.mark}
        height={s.mark}
        className="rr-logo__img"
        loading="eager"
      />
      <div className="rr-logo__text">
        <span className="rr-logo__word" style={{ fontSize: `${s.word}px` }}>
          Aman Resin Art And Decore
        </span>
        <span className="rr-logo__tagline" style={{ fontSize: `${s.tagline}px` }}>
          Create • Decorate • Inspire
        </span>
      </div>
    </Link>
  )
}
