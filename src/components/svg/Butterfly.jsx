export default function Butterfly({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 12c0-3 2.5-7 5-7s3 4 3 5c0 2-1.5 4-3 4s-5-2-5-2" />
      <path d="M12 12c0-3-2.5-7-5-7s-3 4-3 5c0 2 1.5 4 3 4s5-2 5-2" />
      <path d="M12 12c0 3 1.5 6 4 6s4-2 4-3c0-1-1.5-2-3-2s-5 1-5 1" />
      <path d="M12 12c0 3-1.5 6-4 6s-4-2-4-3c0-1 1.5-2 3-2s5 1 5 1" />
      <line x1="12" y1="12" x2="12" y2="22" />
    </svg>
  )
}