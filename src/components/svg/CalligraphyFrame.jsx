/**
 * CalligraphyFrame — ornamental corner pieces for the Arabic calligraphy
 * accent in the hero panel.
 */
export default function CalligraphyFrame({ className = '' }) {
  return (
    <svg className={`rr-calligraphy-frame${className ? ' ' + className : ''}`} viewBox="0 0 200 200" fill="none" aria-hidden>
      {/* Top-left corner */}
      <path d="M10 10 Q10 50 50 50" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      <path d="M10 10 Q50 10 50 50" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      {/* Top-right corner */}
      <path d="M190 10 Q190 50 150 50" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      <path d="M190 10 Q150 10 150 50" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      {/* Bottom-left corner */}
      <path d="M10 190 Q10 150 50 150" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      <path d="M10 190 Q50 190 50 150" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      {/* Bottom-right corner */}
      <path d="M190 190 Q190 150 150 150" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
      <path d="M190 190 Q150 190 150 150" stroke="var(--rr-gold-500)" strokeWidth="1.5" />
    </svg>
  )
}