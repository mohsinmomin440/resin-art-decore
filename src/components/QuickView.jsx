import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Close, WhatsApp } from './svg'
import { productImage, productSrcSet } from '../utils/productImage'
import { priceLabel } from '../data/products'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'
import { orderLink } from '../utils/whatsapp'
import NumberChooser from './NumberChooser'

export default function QuickView({ product, onClose }) {
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const [chooserOpen, setChooserOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!product) return
    panelRef.current?.focus?.()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [product, onClose])

  if (!product) return null

  const href = orderLink({ contact, product })

  return (
    <div className="rr-qv" role="dialog" aria-modal="true" aria-label={product.name} onClick={onClose}>
      <div
        ref={panelRef}
        className="rr-qv__panel"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="rr-qv__x">
          <Close size={18} />
        </button>

        <div className="rr-qv__media">
          <img
            src={productImage(product.slug, 1, 800)}
            srcSet={productSrcSet(product.slug, 1)}
            sizes="(min-width: 768px) 420px, 90vw"
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="rr-qv__body">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          {product.badge && <span className="rr-badge">{product.badge}</span>}
          <p className="rr-qv__price">{priceLabel(product)}</p>
          <p className="rr-qv__desc">{product.description}</p>

          <div className="rr-qv__actions">
            <a href={href} target="_blank" rel="noopener noreferrer" className="rr-btn rr-btn--wa" onClick={() => setChooserOpen(false)}>
              <WhatsApp size={16} /> Order on WhatsApp
            </a>
            <Link to={`/product/${product.slug}`} className="rr-btn rr-btn--ghost" onClick={onClose}>View full page</Link>
          </div>
        </div>
      </div>
      <NumberChooser open={chooserOpen} onClose={() => setChooserOpen(false)} onSelect={() => {}} />
    </div>
  )
}
