import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WhatsApp, Heart, HeartFilled } from './svg'
import { productImage, productSrcSet } from '../utils/productImage'
import { priceLabel } from '../data/products'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { orderLink } from '../utils/whatsapp'
import { CONTACTS } from '../data/config'
import NumberChooser from './NumberChooser'

export default function ProductCard({ product }) {
  const [saved, setSaved] = useLocalStorage('rr_saved', [])
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const [chooserOpen, setChooserOpen] = useState(false)
  const [tapped, setTapped] = useState(false)
  const href = orderLink({ contact, product })

  const hasSecond = product.images && product.images.length > 1
  const isSaved = saved.includes(product.slug)

  function toggleSave(e) {
    e.stopPropagation()
    setSaved(isSaved ? saved.filter((s) => s !== product.slug) : [...saved, product.slug])
  }

  return (
    <article className={`product-card${tapped ? ' is-tapped' : ''}`} data-reveal="up">
      <div className="product-card__media">
        <button
          type="button"
          onClick={() => setTapped(true)}
          aria-label={`Order ${product.name} on WhatsApp`}
          className="product-card__order"
          title="Order on WhatsApp"
        >
          <WhatsApp size={14} /> Order
        </button>
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          className="product-card__save"
        >
          {isSaved ? <HeartFilled size={16} /> : <Heart size={16} />}
        </button>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}

        <Link to={`/product/${product.slug}`} className="product-card__link" aria-label={`View ${product.name}`}>
          <img
            src={productImage(product.slug, 1, 500)}
            srcSet={productSrcSet(product.slug, 1)}
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 46vw"
            alt={product.name}
            loading="lazy"
            className="product-card__img"
          />
          {hasSecond && (
            <img
              src={productImage(product.slug, 2, 500)}
              srcSet={productSrcSet(product.slug, 2)}
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 46vw"
              alt=""
              loading="lazy"
              className="product-card__img product-card__img--second"
            />
          )}
        </Link>
      </div>

      <div className="product-card__body">
        <span className="product-card__cat">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <div className="product-card__price">{priceLabel(product)}</div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card__btn"
          onClick={() => setChooserOpen(true)}
        >
          <WhatsApp size={14} /> Order on WhatsApp
        </a>
      </div>
      <NumberChooser open={chooserOpen} onClose={() => setChooserOpen(false)} onSelect={() => {}} />
    </article>
  )
}