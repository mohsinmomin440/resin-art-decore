/**
 * LogoMark — resin drop containing a heart. Used as favicon, app icon, OG card.
 */
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function LogoMark({ size = 64, className = '', style = {}, decorative = false }) {
  const reduce = useReducedMotion()
  const attrs = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', ...style }
  if (decorative) attrs['aria-hidden'] = true
  return (
    <svg {...attrs} className={className}>
      <defs>
        <linearGradient id="rr-drop-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--rr-gold-500)" />
          <stop offset="100%" stopColor="var(--rr-crimson-600)" />
        </linearGradient>
      </defs>
      {/* Drop shape */}
      <path
        d="M32 4 C32 4 8 28 8 40 A24 24 0 0 0 56 40 C56 28 32 4 32 4Z"
        fill="url(#rr-drop-grad)"
        className={reduce ? '' : 'rr-logo-mark-drop'}
      />
      {/* Heart inside */}
      <path
        d="M32 44 C32 44 18 36 18 28 A8 8 0 0 1 32 24 A8 8 0 0 1 46 28 C46 36 32 44 32 44Z"
        fill="var(--rr-white)"
      />
    </svg>
  )
}