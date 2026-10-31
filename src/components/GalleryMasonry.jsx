import { useMemo, useState } from 'react'
import { productSrcSet } from '../utils/productImage'

const PAGE_SIZE = 12

const FILTERS = ['All', 'Islamic Décor', 'Love & Gifts', 'Keychains', 'Phone Cases', 'Décor & Accessories', 'Jewellery', 'Posters']

export default function GalleryMasonry({ photos }) {
  const [filter, setFilter] = useState('All')
  const [shown, setShown] = useState(PAGE_SIZE)
  const [lightbox, setLightbox] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.cat === filter)),
    [filter, photos],
  )

  const chips = useMemo(
    () => FILTERS.map((f) => ({
      name: f,
      count: f === 'All' ? photos.length : photos.filter((p) => p.cat === f).length,
    })).filter((c) => c.count > 0),
    [photos],
  )

  const page = visible.slice(0, shown)
  const more = visible.length - page.length

  function pick(f) { setFilter(f); setShown(PAGE_SIZE) }

  return (
    <>
      <div className="rr-gallery-filters" role="tablist" aria-label="Filter photos">
        {chips.map((c) => (
          <button
            key={c.name}
            type="button"
            role="tab"
            aria-selected={filter === c.name}
            className={`rr-gallery-chip${filter === c.name ? ' is-active' : ''}`}
            onClick={() => pick(c.name)}
          >
            {c.name}
            <span className="rr-gallery-chip__n">{c.count}</span>
          </button>
        ))}
      </div>

      <div className="rr-gallery-masonry">
        {page.map((p, i) => (
          <button
            type="button"
            key={p.id + i}
            className="rr-gallery-cell"
            onClick={() => setLightbox(i)}
            aria-label={`View larger: ${p.alt}`}
          >
            <img
              src={p.id}
              srcSet={p.slug ? productSrcSet(p.slug, 1) : undefined}
              sizes="(min-width: 1024px) 19vw, (min-width: 768px) 24vw, 46vw"
              alt=""
              loading={i < 12 ? 'eager' : 'lazy'}
              className="rr-gallery-tile"
            />
            <span className="rr-gallery-cell__cap">{p.alt}</span>
          </button>
        ))}
      </div>

      {more > 0 && (
        <div className="text-center mt-4">
          <button type="button" className="rr-btn rr-btn--ghost" onClick={() => setShown((s) => s + PAGE_SIZE)}>
            Show {Math.min(more, PAGE_SIZE)} more
          </button>
        </div>
      )}

      {lightbox != null && (
        <Lightbox photos={visible} index={lightbox} onClose={() => setLightbox(null)} onMove={setLightbox} />
      )}
    </>
  )
}

function Lightbox({ photos, index, onClose, onMove }) {
  const photo = photos[index]
  return (
    <div
      className="rr-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button type="button" className="rr-lightbox__x" onClick={onClose} aria-label="Close">×</button>
      <button
        type="button"
        className="rr-lightbox__nav rr-lightbox__nav--prev"
        aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); onMove((i) => (i - 1 + photos.length) % photos.length) }}
      >‹</button>
      <figure className="rr-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={photo.id} alt={photo.alt} className="rr-lightbox__img" />
        <figcaption className="rr-lightbox__cap">
          {photo.alt}
          <span className="rr-lightbox__count">{index + 1} / {photos.length}</span>
        </figcaption>
      </figure>
      <button
        type="button"
        className="rr-lightbox__nav rr-lightbox__nav--next"
        aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); onMove((i) => (i + 1) % photos.length) }}
      >›</button>
    </div>
  )
}