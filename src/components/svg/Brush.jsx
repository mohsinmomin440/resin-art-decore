export default function Brush({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2l4 4-10 10-4 4L18 2z" /><path d="M14 6l4 4" /><path d="M10 18l-4 4" />
    </svg>
  )
}