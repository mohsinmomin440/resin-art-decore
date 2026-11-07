import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta, useJsonLd, useSaved, useContact, guardOrder } from '../hooks'
import { productById, relatedProducts, priceLabel } from '../data/products'
import { productImage, productSrcSet } from '../utils/productImage'
import { orderLink } from '../utils/whatsapp'
import { SITE_URL } from '../data/config'
import { WhatsApp, Heart, HeartFilled, Sparkle, Flower, Package } from '../components/svg'
import HeartDivider from '../components/HeartDivider'
import CertBadges from '../components/CertBadges'
import SectionHeader from '../components/SectionHeader'
import StickyOrderBar from '../components/StickyOrderBar'
import ProductCard from '../components/ProductCard'

const FLOWER_WORDS = /flower|petal|botanical|daisies|fern/i

export default function Product() {
  const { slug = '' } = useParams()
  const product = productById(slug)
  const { isSaved: isSavedFn, toggle } = useSaved()
  const { contact } = useContact()
  const [activeImage, setActiveImage] = useState({ slug, index: 0 })
  const [qty, setQty] = useState(1)

  usePageMeta({
    title: product?.name || 'Product',
    description: product
      ? `${product.name} — ${product.category}. Handmade resin piece. Order on WhatsApp.`
      : 'Handmade resin piece. Order on WhatsApp.',
    image: product ? productImage(product.slug, 1, 800) : undefined,
    noindex: !product,
  })

  useJsonLd('product', product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    image: new URL(productImage(product.slug, 1, 800), window.location.origin).href,
    brand: { '@type': 'Brand', name: 'Aman Resin Art And Decore' },
    // Only publish an Offer when a real price exists — Google rejects price-less offers.
    ...(product.price != null && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: String(product.price),
        url: `${SITE_URL}/product/${product.slug}`,
        availability: 'https://schema.org/InStock',
      },
    }),
  } : null)

  if (!product) {
    return (
      <div className="container py-5">
        <div className="rr-empty">
          <Sparkle size={48} className="rr-empty__icon" />
          <h2>Product not found</h2>
          <p>That piece is not in the catalogue.</p>
          <Link to="/shop" className="rr-btn mt-3">Browse the shop</Link>
        </div>
      </div>
    )
  }

  const isSaved = isSavedFn(product.slug)
  const related = relatedProducts(product)
  const orderOptions = { qty: qty > 1 ? String(qty) : '' }
  const href = orderLink({ contact, product, options: orderOptions })
  const images = product.images && product.images.length > 0 ? product.images : [1]
  // Selected thumbnail resets automatically when navigating to another product.
  const activeImageIndex = activeImage.slug === product.slug ? activeImage.index : 0
  const mentionsFlowers = FLOWER_WORDS.test(product.description)

  return (
    <div className="rr-product-page">
      <div className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav className="rr-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>›</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden>›</span>
          <span className="rr-breadcrumb__current">{product.name}</span>
        </nav>

        {/* Unified 2-Column Product Stage */}
        <div className="rr-product-stage">
          {/* Left Media Gallery */}
          <div className="rr-product-stage__gallery">
            <div className="rr-product-stage__main-wrap">
              {product.badge && <span className="product-card__badge">{product.badge}</span>}
              <button
                type="button"
                onClick={() => toggle(product.slug)}
                aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
                aria-pressed={isSaved}
                className="product-card__save"
              >
                {isSaved ? <HeartFilled size={16} /> : <Heart size={16} />}
              </button>
              <img
                src={productImage(product.slug, activeImageIndex + 1, 800)}
                srcSet={productSrcSet(product.slug, activeImageIndex + 1)}
                sizes="(min-width: 992px) 480px, 92vw"
                width="800"
                height="800"
                alt={product.name}
                className="rr-product-stage__main-img"
              />
            </div>

            {images.length > 1 && (
              <div className="rr-product-stage__thumbs">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage({ slug: product.slug, index: i })}
                    className={`rr-product-stage__thumb${activeImageIndex === i ? ' is-active' : ''}`}
                    aria-label={`Show photo ${i + 1}`}
                  >
                    <img
                      src={productImage(product.slug, i + 1, 140)}
                      alt=""
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="rr-product-stage__details">
            <span className="eyebrow">{product.category}</span>
            <h1 className="rr-product-stage__title">{product.name}</h1>
            <div className="rr-product-stage__price">{priceLabel(product)}</div>
            <HeartDivider width={44} className="rr-product-stage__divider" />

            <p className="rr-product-stage__desc">{product.description}</p>

            <div className="rr-infochips">
              <span className="rr-infochip">
                <Sparkle size={13} /> Handmade
              </span>
              {mentionsFlowers && (
                <span className="rr-infochip">
                  <Flower size={13} /> Real pressed flowers
                </span>
              )}
              {product.customizable && (
                <span className="rr-infochip">
                  <Package size={13} /> Made to order
                </span>
              )}
            </div>

            {product.customizable && (
              <div className="rr-product-stage__custom-note">
                <Sparkle size={15} />
                <span>
                  <strong>Personalize this piece:</strong> Custom names, dates, color pigments or preserved flowers can be tailored to your preference.
                </span>
              </div>
            )}

            {/* Quantity */}
            <div className="rr-product__qty">
              <span className="rr-product__qty-label">Quantity:</span>
              <div className="rr-qty">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rr-product-stage__actions">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-btn rr-btn--wa rr-btn--lg rr-product-stage__order-btn"
                onClick={(e) => guardOrder(e, (c) => orderLink({ contact: c, product, options: orderOptions }))}
              >
                <WhatsApp size={18} /> Order on WhatsApp
              </a>

              <div className="rr-product-stage__sub-actions">
                <button
                  type="button"
                  className="rr-btn rr-btn--ghost rr-btn--sm"
                  onClick={() => toggle(product.slug)}
                >
                  {isSaved ? <HeartFilled size={15} /> : <Heart size={15} />}
                  <span>{isSaved ? 'Saved in Wishlist' : 'Save for later'}</span>
                </button>

                <Link to="/custom" className="rr-btn rr-btn--ghost rr-btn--sm">
                  <Sparkle size={15} />
                  <span>Custom piece builder</span>
                </Link>
              </div>
            </div>

            {/* Trust line */}
            <div className="rr-product-stage__trust">
              <CertBadges variant="line" />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="rr-product-stage__related">
            <SectionHeader
              eyebrow="You may also love"
              title="More Handmade Pieces"
            />
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <StickyOrderBar product={product} options={orderOptions} />
    </div>
  )
}
