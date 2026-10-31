/**
 * PageFallback — shown while a lazy route chunk is loading.
 */
export default function PageFallback() {
  return (
    <div className="page-fallback" aria-busy="true">
      <div className="page-fallback__bar" />
      <div className="page-fallback__bar page-fallback__bar--short" />
      <div className="page-fallback__grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="page-fallback__card" />
        ))}
      </div>
    </div>
  )
}