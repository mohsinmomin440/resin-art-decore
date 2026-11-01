export default function Bouquet({ size = 24, className = '' }) {
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
      <path d="M8 12.5l4 8.5 4-8.5" />
      <path d="M7 12.5h10" />
      <path d="M12 3a3 3 0 0 1 3 3c0 2-3 3.5-3 3.5S9 8 9 6a3 3 0 0 1 3-3z" />
      <path d="M6 7.5a2.5 2.5 0 0 1 3.5 1c0 1.5-2.5 3-2.5 3s-2.5-1.5-2.5-3A2.5 2.5 0 0 1 6 7.5z" />
      <path d="M18 7.5a2.5 2.5 0 0 0-3.5 1c0 1.5 2.5 3 2.5 3s2.5-1.5 2.5-3A2.5 2.5 0 0 0 18 7.5z" />
    </svg>
  )
}
