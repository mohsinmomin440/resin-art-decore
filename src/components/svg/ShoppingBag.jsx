/**
 * ShoppingBag — browse-the-shop icon.
 */
export default function ShoppingBag({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 6h15v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
      <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  )
}