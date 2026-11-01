export default function Diya({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 13.5c0 4.5 4 7.5 9 7.5s9-3 9-7.5H3z" />
      <path d="M3 13.5c0-1.5 4-2.5 9-2.5s9 1 9 2.5" />
      <path d="M12 2.5c-1.5 2-2 3.5-2 5a2 2 0 0 0 4 0c0-1.5-.5-3-2-5z" />
      <line x1="8" y1="18.5" x2="6" y2="21" />
      <line x1="16" y1="18.5" x2="18" y2="21" />
    </svg>
  )
}
