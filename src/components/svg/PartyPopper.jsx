export default function PartyPopper({ size = 24, className = '' }) {
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
      <path d="M3 21l8-2-6-6-2 8z" />
      <path d="M14 6l3-3" />
      <path d="M17 10l4-2" />
      <path d="M11 11l2-4" />
      <circle cx="19" cy="5" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M9 3l1 2" />
    </svg>
  )
}
