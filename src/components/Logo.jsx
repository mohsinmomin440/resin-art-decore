/**
 * Logo — wordmark + mark.
 * Size prop: 'sm' | 'md' (default) | 'lg' | 'footer'.
 * The mark is LogoMark (SVG). The wordmark uses Cormorant Garamond.
 */
import LogoMark from './svg/LogoMark'

const SIZES = {
  sm: { mark: 32, word: 14, tagline: 10 },
  md: { mark: 48, word: 18, tagline: 11 },
  lg: { mark: 64, word: 22, tagline: 12 },
  footer: { mark: 40, word: 16, tagline: 10 },
}

export default function Logo({ size = 'md' }) {
  const s = SIZES[size] || SIZES.md
  return (
    <a href="/" className="rr-logo" aria-label="Resin Art And Decore — home">
      <LogoMark size={s.mark} className="rr-logo__mark" />
      <div className="rr-logo__text">
        <span className="rr-logo__word">Resin Art And Decore</span>
        <span className="rr-logo__tagline" style={{ fontSize: s.tagline }}>Handmade resin gifts</span>
      </div>
    </a>
  )
}