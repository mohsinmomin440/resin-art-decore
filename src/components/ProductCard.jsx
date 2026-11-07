import { Link } from 'react-router-dom'
import { Heart, HeartFilled, WhatsApp } from './svg'
import { productImage, productSrcSet, hasImages } from '../utils/productImage'
import { priceLabel } from '../data/products'
import { orderLink } from '../utils/whatsapp'
import { useSaved } from '../hooks/useSaved'
import { useContact, guardOrder } from '../hooks/useContact'

const SIZES = '(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 46vw'

export default function ProductCard({ product }) {
  const { isSaved: isSavedFn, toggle } = useSaved()
  const { contact } = useContact()
  const isSaved = isSavedFn(product.slug)
  const hasSecond = product.images && product.images.length > 1
  const hasPrice = product.price !== null && product.price !== undefined

  function toggleSave(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.slug)
  }

  return (
    <article className="product-card" data-reveal="up">
      <div className="product-card__media">
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          aria-pressed={isSaved}
          className="product-card__save"
        >
          {isSaved ? <HeartFilled size={15} /> : <Heart size={15} />}
        </button>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}

        {hasImages(product) ? (
          <Link to={`/product/${product.slug}`} className="product-card__link" aria-label={`View ${product.name}`}>
            <img
              src={productImage(product.slug, 1, 400)}
              srcSet={productSrcSet(product.slug, 1)}
              sizes={SIZES}
              width="800"
              height="800"
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="product-card__img"
            />
            {hasSecond && (
              <img
                src={productImage(product.slug, 2, 400)}
                srcSet={productSrcSet(product.slug, 2)}
                sizes={SIZES}
                width="800"
                height="800"
                alt=""
                loading="lazy"
                decoding="async"
                className="product-card__img product-card__img--second"
              />
            )}
          </Link>
        ) : (
          <div className="product-card__no-image">
            <span>Photo coming soon</span>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__cat">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        {hasPrice && <div className="product-card__price">{priceLabel(product)}</div>}
        <a
          href={orderLink({ contact, product })}
          onClick={(e) => guardOrder(e, (c) => orderLink({ contact: c, product }))}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card__btn rr-btn--wa"
          aria-label={hasPrice ? `Order ${product.name} on WhatsApp` : `Ask the price of ${product.name} on WhatsApp`}
        >
          <WhatsApp size={16} />
          <span>{hasPrice ? 'Order' : 'Ask price'}</span>
        </a>
      </div>
    </article>
  )
}
