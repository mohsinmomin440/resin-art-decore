export default function Cake({ size = 24, className = '' }) {
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
      <path d="M3 21h18" />
      <path d="M4 21v-4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4" />
      <path d="M7 16v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4" />
      <line x1="12" y1="11" x2="12" y2="7" />
      <path d="M12 7c-1-1-1-2.5 0-3.5 1 1 1 2.5 0 3.5z" />
      <path d="M7 13.5c1 .5 2 .5 3 0s2-.5 3 0 2-.5 3 0" />
    </svg>
  )
}
