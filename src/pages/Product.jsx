import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta, useJsonLd, useLocalStorage } from '../hooks'
import { productById, relatedProducts, priceLabel } from '../data/products'
import { productImage, productSrcSet } from '../utils/productImage'
import { orderLink } from '../utils/whatsapp'
import { CONTACTS } from '../data/config'
import { WhatsApp, Heart, HeartFilled, Sparkle } from '../components/svg'
import StickyOrderBar from '../components/StickyOrderBar'
import ProductCard from '../components/ProductCard'
import NumberChooser from '../components/NumberChooser'

export default function Product() {
  const { slug = '' } = useParams()
  const product = productById(slug)
  const [saved, setSaved] = useLocalStorage('rr_saved', [])
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const [chooserOpen, setChooserOpen] = useState(false)
  const [qty, setQty] = useState(1)

  usePageMeta({
    title: product?.name || 'Product',
    description: product
      ? `${product.name} — ${product.category}. Handmade resin piece. Order on WhatsApp.`
      : 'Handmade resin piece. Order on WhatsApp.',
  })

  useJsonLd('product', product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    image: typeof window !== 'undefined'
      ? new URL(productImage(product.slug, 1, 800), window.location.origin).href
      : productImage(product.slug, 1, 800),
    brand: { '@type': 'Brand', name: 'Resin Art And Decore' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock' },
  } : null)

  if (!product) {
    return (
      <section className="container py-6">
        <div className="rr-empty">
          <Sparkle size={48} className="rr-empty__icon" />
          <h2>Product not found</h2>
          <p>That piece is not in the catalogue.</p>
          <Link to="/shop" className="rr-btn mt-4">Browse the shop</Link>
        </div>
      </section>
    )
  }

  const isSaved = saved.includes(product.slug)
  const related = relatedProducts(product)
  const href = orderLink({ contact, product, options: { qty: String(qty) } })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <nav className="rr-breadcrumb" aria-label="Breadcrumb">
            <Link to="/shop">Shop</Link> <span>/</span> <span>{product.name}</span>
          </nav>
          <div className="rr-page-hero__inner">
            <div>
              <span className="eyebrow">{product.category}</span>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <div className="rr-page-hero__price">{priceLabel(product)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <div className="rr-product">
          <div className="rr-product__media">
            <img
              src={productImage(product.slug, 1, 800)}
              srcSet={productSrcSet(product.slug, 1)}
              sizes="(min-width: 768px) 460px, 90vw"
              alt={product.name}
              loading="eager"
              className="rr-product__img"
            />
            {(product.images || []).slice(1).map((_, i) => (
              <img
                key={i}
                src={productImage(product.slug, i + 2, 800)}
                srcSet={productSrcSet(product.slug, i + 2)}
                sizes="(min-width: 768px) 460px, 90vw"
                alt=""
                loading="lazy"
                className="rr-product__img rr-product__img--second"
              />
            ))}
          </div>

          <div className="rr-product__body">
            {product.badge && <span className="rr-badge">{product.badge}</span>}
            <h2>{product.name}</h2>
            <p className="rr-product__desc">{product.description}</p>
            <div className="rr-product__price">{priceLabel(product)}</div>

            {product.customizable && (
              <div className="rr-product__note">
                <Sparkle size={16} /> This piece can be customised — add a name, initials or a photo when you order.
              </div>
            )}

            <div className="rr-product__qty">
              <span>Quantity</span>
              <div className="rr-qty">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <a href={href} target="_blank" rel="noopener noreferrer" className="rr-btn rr-btn--wa rr-btn--lg" onClick={() => setChooserOpen(true)}>
              <WhatsApp size={18} /> Order on WhatsApp
            </a>

            <button
              type="button"
              className="rr-btn rr-btn--ghost"
              onClick={() => setSaved(isSaved ? saved.filter((s) => s !== product.slug) : [...saved, product.slug])}
            >
              {isSaved ? <HeartFilled size={16} /> : <Heart size={16} />}
              {isSaved ? 'Saved' : 'Save for later'}
            </button>

            <Link to="/custom" className="rr-btn rr-btn--ghost">
              <Sparkle size={16} /> Design a custom piece
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container py-6">
          <h2 className="rr-section-title">You may also like</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <StickyOrderBar product={product} />
      <NumberChooser open={chooserOpen} onClose={() => setChooserOpen(false)} onSelect={() => {}} />
    </>
  )
}