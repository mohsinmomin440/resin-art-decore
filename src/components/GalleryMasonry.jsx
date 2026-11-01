import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productSrcSet } from '../utils/productImage'
import { WhatsApp, ArrowRight, Sparkle } from './svg'
import { orderLink } from '../utils/whatsapp'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'
import { shopProducts } from '../data/products'

const PAGE_SIZE = 16

export default function GalleryMasonry({ photos }) {
  const [filter, setFilter] = useState('All')
  const [shown, setShown] = useState(PAGE_SIZE)
  const [lightbox, setLightbox] = useState(null)
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])

  // Extract available unique categories
  const categories = useMemo(() => {
    const set = new Set(photos.map((p) => p.cat).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [photos])

  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.cat === filter)),
    [filter, photos],
  )

  const chips = useMemo(
    () =>
      categories.map((c) => ({
        name: c,
        count: c === 'All' ? photos.length : photos.filter((p) => p.cat === c).length,
      })),
    [categories, photos],
  )

  const page = visible.slice(0, shown)
  const more = visible.length - page.length

  function pick(f) {
    setFilter(f)
    setShown(PAGE_SIZE)
  }

  return (
    <div className="rr-gallery-container">
      {/* Category Filter Chips Bar */}
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
            <span>{c.name}</span>
            <span className="rr-gallery-chip__n">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Structured, Responsive Grid */}
      <div className="rr-gallery-grid">
        {page.map((p, i) => (
          <button
            type="button"
            key={p.id + i}
            className="rr-gallery-cell"
            onClick={() => setLightbox(i)}
            aria-label={`View larger: ${p.alt}`}
          >
            <div className="rr-gallery-cell__wrap">
              <img
                src={p.id}
                srcSet={p.slug ? productSrcSet(p.slug, 1) : undefined}
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 30vw, 46vw"
                alt={p.alt}
                loading={i < 8 ? 'eager' : 'lazy'}
                className="rr-gallery-tile"
              />
              <div className="rr-gallery-cell__overlay">
                <span className="rr-gallery-cell__cat">{p.cat}</span>
                <span className="rr-gallery-cell__cap">{p.alt}</span>
              </div>
              <span className="rr-gallery-cell__zoom" aria-hidden>
                <Sparkle size={16} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Show More Button */}
      {more > 0 && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="rr-btn rr-btn--ghost"
            onClick={() => setShown((s) => s + PAGE_SIZE)}
          >
            Show {Math.min(more, PAGE_SIZE)} more pieces
          </button>
        </div>
      )}

      {/* Lightbox Preview */}
      {lightbox != null && (
        <Lightbox
          photos={visible}
          index={lightbox}
          contact={contact}
          onClose={() => setLightbox(null)}
          onMove={setLightbox}
        />
      )}
    </div>
  )
}

function Lightbox({ photos, index, contact, onClose, onMove }) {
  const photo = photos[index]
  const matchedProduct = photo.slug ? shopProducts.find((p) => p.slug === photo.slug) : null
  const href = matchedProduct ? orderLink({ contact, product: matchedProduct }) : null

  // Keyboard navigation & escape listener
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove((i) => (i - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') onMove((i) => (i + 1) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photos.length, onClose, onMove])

  return (
    <div
      className="rr-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="rr-lightbox__x"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      <button
        type="button"
        className="rr-lightbox__nav rr-lightbox__nav--prev"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation()
          onMove((i) => (i - 1 + photos.length) % photos.length)
        }}
      >
        ‹
      </button>

      <figure className="rr-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={photo.id} alt={photo.alt} className="rr-lightbox__img" />
        <figcaption className="rr-lightbox__cap">
          <div>
            <div className="rr-lightbox__cat">{photo.cat}</div>
            <h3 className="rr-lightbox__title">{photo.alt}</h3>
          </div>

          <div className="rr-lightbox__actions">
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-btn rr-btn--wa rr-btn--sm"
              >
                <WhatsApp size={15} /> Order on WhatsApp
              </a>
            )}
            {photo.slug && (
              <Link
                to={`/product/${photo.slug}`}
                onClick={onClose}
                className="rr-btn rr-btn--ghost rr-btn--sm"
              >
                <span>Details</span> <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </figcaption>
      </figure>

      <button
        type="button"
        className="rr-lightbox__nav rr-lightbox__nav--next"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation()
          onMove((i) => (i + 1) % photos.length)
        }}
      >
        ›
      </button>
    </div>
  )
}
