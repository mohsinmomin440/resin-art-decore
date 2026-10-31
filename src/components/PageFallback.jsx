import Skeleton from './Skeleton'

/**
 * PageFallback — shown while a lazy-loaded route chunk is fetching.
 * Mimics hero band + product card placeholders.
 */
export default function PageFallback() {
  return (
    <div className="page-fallback" aria-busy="true" aria-live="polite">
      <div className="container py-8">
        <div style={{ maxWidth: '600px', marginBottom: '2.5rem' }}>
          <Skeleton width="140px" height="20px" className="mb-3" />
          <Skeleton width="90%" height="40px" className="mb-3" />
          <Skeleton width="70%" height="18px" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--rr-white)',
                borderRadius: '22px',
                padding: '1rem',
                border: '1px solid var(--rr-line)',
              }}
            >
              <Skeleton aspectRatio="1/1" radius={16} className="mb-3" />
              <Skeleton width="50%" height="14px" className="mb-2" />
              <Skeleton width="85%" height="20px" className="mb-3" />
              <Skeleton width="40%" height="18px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
