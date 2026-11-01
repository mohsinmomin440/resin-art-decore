export default function Tie({ size = 24, className = '' }) {
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
      <path d="M5 4h14l-3 4H8L5 4z" />
      <path d="M10.5 8h3l-0.5 3h-2z" />
      <path d="M11 11l-2 8 3 3 3-3-2-8z" />
    </svg>
  )
}
