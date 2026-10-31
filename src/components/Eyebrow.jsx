/**
 * Eyebrow — 13px, 700, uppercase, letter-spacing .14em, gold-700.
 * Never below 14px for anything a customer must read.
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow ${className}`.trim()}>{children}</span>
  )
}