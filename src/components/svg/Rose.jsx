export default function Rose({ size = 24, className = '' }) {
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
      <path d="M12 4a3 3 0 0 1 3 3c0 2-2 3.5-3 4-1-.5-3-2-3-4a3 3 0 0 1 3-3z" />
      <path d="M9 7.5C7 8.5 6.5 10 7 12c.8 2.5 3 3.5 5 3.5s4.2-1 5-3.5c.5-2 0-3.5-2-4.5" />
      <path d="M12 15.5v6.5" />
      <path d="M12 17.5c2-.5 3.5-.2 4 1-1 1-2.5 1-4-.5" />
      <path d="M12 19.5c-2-.5-3.5-.2-4 1 1 1 2.5 1 4-.5" />
    </svg>
  )
}
