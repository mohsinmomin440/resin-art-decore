/**
 * Eyebrow — 13px, 700, uppercase, letter-spacing .14em, gold-700.
 * Supports both children and text prop.
 */
export default function Eyebrow({ children, text, className = '' }) {
  const content = children ?? text
  if (!content) return null
  return (
    <span className={`eyebrow ${className}`.trim()}>{content}</span>
  )
}
