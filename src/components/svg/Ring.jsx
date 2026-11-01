export default function Ring({ size = 24, className = '' }) {
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
      <path d="M8.5 7.5L10.5 4h3l2 3.5H8.5z" />
      <line x1="12" y1="4" x2="12" y2="7.5" />
      <line x1="8.5" y1="7.5" x2="7" y2="10.5" />
      <line x1="15.5" y1="7.5" x2="17" y2="10.5" />
      <path d="M7 10.5a7 7 0 1 0 10 0" />
      <path d="M4 4.5l1 1" />
      <path d="M20 4.5l-1 1" />
    </svg>
  )
}
