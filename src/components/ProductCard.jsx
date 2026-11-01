import { Link } from 'react-router-dom'
import { Heart, HeartFilled, ArrowRight } from './svg'
import { productImage, productSrcSet } from '../utils/productImage'
import { priceLabel } from '../data/products'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function ProductCard({ product }) {
  const [saved, setSaved] = useLocalStorage('rr_saved', [])

  const hasSecond = product.images && product.images.length > 1
  const isSaved = saved.includes(product.slug)

  function toggleSave(e) {
    e.preventDefault()
    e.stopPropagation()
    setSaved(isSaved ? saved.filter((s) => s !== product.slug) : [...saved, product.slug])
  }

  return (
    <article className="product-card" data-reveal="up">
      <div className="product-card__media">
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          className="product-card__save"
        >
          {isSaved ? <HeartFilled size={15} /> : <Heart size={15} />}
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
        <Link
          to={`/product/${product.slug}`}
          className="product-card__btn"
          aria-label={`View ${product.name} details`}
        >
          <span>View Piece</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
