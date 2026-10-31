import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Close, Search, ArrowRight } from './svg'
import { shopProducts } from '../data/products.js'
import { productImage, productSrcSet } from '../utils/productImage.js'

const MAX_RESULTS = 12

const haystack = (p) =>
  [p.name, p.category, p.badge, p.description]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

function findProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return shopProducts
  const words = q.split(/\s+/)
  return shopProducts.filter((p) => words.every((w) => haystack(p).includes(w)))
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [everOpened, setEverOpened] = useState(false)
  if (open && !everOpened) setEverOpened(true)
  const panelRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!open) return
    queueMicrotask(() => setQuery(''))
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Scroll lock — event-based, never mutate html/body overflow.
  useEffect(() => {
    if (!open) return
    const blockOutside = (e) => {
      const list = listRef.current
      if (!list || !list.contains(e.target)) { e.preventDefault(); return }
      if (e.type !== 'wheel') return
      const atTop = list.scrollTop <= 0
      const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
      if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) e.preventDefault()
    }
    document.addEventListener('touchmove', blockOutside, { passive: false })
    document.addEventListener('wheel', blockOutside, { passive: false })
    return () => {
      document.removeEventListener('touchmove', blockOutside)
      document.removeEventListener('wheel', blockOutside)
    }
  }, [open])

  const matches = useMemo(() => findProducts(query), [query])
  const results = matches.slice(0, MAX_RESULTS)
  const hidden = matches.length - results.length

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (results.length === 0) return
        e.preventDefault()
        setActive((i) => {
          const next = e.key === 'ArrowDown' ? i + 1 : i - 1
          return (next + results.length) % results.length
        })
      } else if (e.key === 'Enter' && active >= 0) {
        listRef.current?.querySelectorAll('.rr-search-result')[active]?.click()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, results.length, active])

  return createPortal(
    <div
      className={`rr-search-overlay${open ? ' is-open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        className="rr-search-overlay__panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className="rr-search-overlay__header">
          <Search size={18} className="rr-search-overlay__icon" />
          <input
            type="text"
            autoFocus={open}
            placeholder="Search products, occasions…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(-1) }}
            className="rr-search-overlay__input"
            aria-label="Search"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="rr-search-overlay__close">
            <Close size={18} />
          </button>
        </div>

        <div className="rr-search-overlay__hint">
          {query
            ? `${matches.length} result${matches.length === 1 ? '' : 's'}${hidden > 0 ? ` — showing ${results.length}` : ''}`
            : 'Popular products'}
        </div>

        <div className="rr-search-overlay__results" ref={listRef}>
          {!everOpened ? null : results.length === 0 ? (
            <div className="rr-search-overlay__empty">
              <p>No products match "{query}".</p>
              <Link to="/shop" onClick={onClose} className="rr-btn mt-3">
                <ArrowRight size={14} /> Browse all products
              </Link>
            </div>
          ) : (
            results.map((p, i) => (
              <Link
                key={p.slug}
                to={`/shop?category=${encodeURIComponent(p.category)}&product=${encodeURIComponent(p.slug)}`}
                onClick={onClose}
                className={`rr-search-result${i === active ? ' is-active' : ''}`}
              >
                <img
                  src={productImage(p.slug, 1, 160)}
                  srcSet={productSrcSet(p.slug, 1)}
                  sizes="50px"
                  alt=""
                  className="rr-search-result__thumb"
                />
                <div className="rr-search-result__meta">
                  <div className="rr-search-result__cat">{p.category}</div>
                  <div className="rr-search-result__name">{p.name}</div>
                </div>
              </Link>
            ))
          )}

          {hidden > 0 && (
            <Link to={`/shop?q=${encodeURIComponent(query.trim())}`} onClick={onClose} className="rr-search-overlay__more">
              See all {matches.length} matches in the shop <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}