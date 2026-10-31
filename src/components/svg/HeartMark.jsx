/**
 * HeartMark — small filled heart glyph used in the heart divider and as a
 * decorative accent. Drawn to match the brand mark (not a unicode glyph).
 */
export default function HeartMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="var(--rr-crimson-600)"
      className={className}
      aria-hidden
    >
      <path d="M12 21s-7-4.35-9.5-8.5A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9.5 7C19 16.65 12 21 12 21z" />
    </svg>
  )
}