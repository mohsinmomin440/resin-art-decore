/**
 * GoldFlourishDivider — decorative gold line + flourish, used between sections.
 * The shimmer sweeps across the gold part every 6s.
 */
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function GoldFlourishDivider({ width = '100%', className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`rr-gold-flourish${className ? ' ' + className : ''}`} style={{ width }} aria-hidden>
      <span className="rr-gold-flourish__line" />
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`rr-gold-flourish__icon${reduce ? '' : ' rr-shimmer'}`}>
        <path d="M16 4c-4 6-8 8-8 12s4 12 8 12 8-6 8-12-4-6-8-12z" stroke="var(--rr-gold-500)" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="3" fill="var(--rr-gold-500)" />
      </svg>
      <span className="rr-gold-flourish__line" />
    </div>
  )
}