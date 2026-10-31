export default function Earring({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="2" /><path d="M12 7v6" />
      <path d="M8 13c0-2 1.5-4 4-4s4 2 4 4v2c0 3-2 6-4 6s-4-3-4-6v-2z" />
    </svg>
  )
}