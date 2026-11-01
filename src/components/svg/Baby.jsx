export default function Baby({ size = 24, className = '' }) {
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
      <path d="M5 12a6 6 0 0 1 6-6h1v6" />
      <path d="M5 12a5 5 0 0 0 5 5h2a5 5 0 0 0 4-2.5" />
      <path d="M16 9.5l3-3.5h2" />
      <circle cx="8" cy="19" r="2" />
      <circle cx="16" cy="19" r="2" />
      <line x1="8" y1="17" x2="10" y2="14" />
      <line x1="16" y1="17" x2="14" y2="14" />
    </svg>
  )
}
