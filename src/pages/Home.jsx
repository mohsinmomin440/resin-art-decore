import { Link } from 'react-router-dom'
import { usePageMeta, useJsonLd } from '../hooks'
import { shopProducts } from '../data/products'
import { CATEGORY_TILES } from '../data/categories'
import { BUSINESS, SITE_URL, CONTACTS } from '../data/config'
import { productImage, productSrcSet } from '../utils/productImage'

import Eyebrow from '../components/Eyebrow'
import SectionHeader from '../components/SectionHeader'
import HeartDivider from '../components/HeartDivider'
import FeaturesStrip from '../components/FeaturesStrip'
import HowItWorks from '../components/HowItWorks'
import InstagramFeed from '../components/InstagramFeed'
import CategoryTile from '../components/CategoryTile'
import ProductCard from '../components/ProductCard'
import { Check, ArrowRight, Sparkle } from '../components/svg'

export default function Home() {
  usePageMeta({
    title: 'Handmade Resin Gifts & Décor',
    description:
      'Aman Resin Art And Decore — handcrafted Islamic calligraphy frames, customized love letters, floral keychains and keepsake gifts. Direct ordering on WhatsApp.',
  })

  useJsonLd('home-business', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: `+${CONTACTS[0].phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address?.street,
      addressLocality: BUSINESS.address?.city,
      addressRegion: BUSINESS.address?.state,
      postalCode: BUSINESS.address?.pincode,
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${CONTACTS[0].phone}`,
      contactType: 'customer service',
      email: BUSINESS.email,
    },
  })

  // 6 featured signature products
  const featured = shopProducts
    .filter((p) => p.badge || p.customizable)
    .slice(0, 6)

  // Two floating real products for the hero right panel
  const heroCard1 = shopProducts.find((p) => p.slug === 'bismillah-heart-frame') || shopProducts[0]
  const heroCard2 = shopProducts.find((p) => p.slug === 'love-letters') || shopProducts[1]

  return (
    <div className="rr-home">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="rr-hero" data-no-reveal>
        <div className="container">
          <div className="rr-hero__grid">
            {/* Left Content */}
            <div className="rr-hero__content">
              <Eyebrow text="Handmade Resin Keepsakes" />
              <h1 className="rr-hero__title">
                Gifts made by hand,<br />
                <span className="rr-hero__emphasis">for someone special</span>
              </h1>
              <HeartDivider width={48} className="rr-hero__divider" />
              <p className="rr-hero__lede">
                Unique resin art pieces poured by hand in Gujarat. From gold-accented Islamic calligraphy to
                personalized names, preserved flowers, and timeless milestone keepsake gifts.
              </p>

              <ul className="rr-hero__ticks">
                <li>
                  <span className="rr-hero__tick-icon"><Check size={15} /></span>
                  <span>Crystal-clear UV-resistant epoxy resin</span>
                </li>
                <li>
                  <span className="rr-hero__tick-icon"><Check size={15} /></span>
                  <span>Real preserved flowers &amp; radiant gold leaf accents</span>
                </li>
              </ul>

              <div className="rr-hero__ctas">
                <Link to="/shop" className="rr-btn rr-btn--primary rr-btn--lg">
                  Explore Collection <ArrowRight size={16} />
                </Link>
                <Link to="/custom" className="rr-btn rr-btn--ghost rr-btn--lg">
                  <Sparkle size={15} /> Custom Piece Builder
                </Link>
              </div>
            </div>

            {/* Right: real product photography */}
            <div className="rr-hero__panel">
              {heroCard1 && (
                <Link
                  to={`/product/${heroCard1.slug}`}
                  className="rr-hero__photo rr-hero__photo--main"
                  aria-label={`View ${heroCard1.name}`}
                >
                  <img
                    src={productImage(heroCard1.slug, 1, 800)}
                    srcSet={productSrcSet(heroCard1.slug, 1)}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    width="800"
                    height="800"
                    alt={heroCard1.name}
                    fetchPriority="high"
                    decoding="async"
                  />
                </Link>
              )}
              {heroCard2 && (
                <Link
                  to={`/product/${heroCard2.slug}`}
                  className="rr-hero__photo rr-hero__photo--side"
                  aria-label={`View ${heroCard2.name}`}
                >
                  <img
                    src={productImage(heroCard2.slug, 1, 400)}
                    srcSet={productSrcSet(heroCard2.slug, 1)}
                    sizes="(min-width: 1024px) 16vw, 34vw"
                    width="400"
                    height="400"
                    alt={heroCard2.name}
                    decoding="async"
                  />
                </Link>
              )}
              {heroCard1 && (
                <Link to={`/product/${heroCard1.slug}`} className="rr-hero__caption">
                  {heroCard1.badge && <span className="rr-hero__caption-badge">{heroCard1.badge}</span>}
                  <strong className="rr-hero__caption-name">{heroCard1.name}</strong>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. QUALITY PILLARS & CRAFT ASSURANCES ─── */}
      <FeaturesStrip />

      {/* ─── 3. SHOP BY CATEGORY ─── */}
      <section className="rr-home-categories">
        <div className="container py-5">
          <SectionHeader
            eyebrow="Explore collections"
            title="Shop by category"
            description="Browse handmade resin treasures across our signature collections."
          />
          <div className="rr-category-grid">
            {CATEGORY_TILES.map((cat) => (
              <CategoryTile key={cat.name} category={cat.name} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SIGNATURE CREATIONS / FEATURED (6 Top Pieces) ─── */}
      <section className="rr-home-signature">
        <div className="container py-5">
          <SectionHeader
            eyebrow="Artisan Favorites"
            title="Signature Creations"
            description="Our most cherished handcrafted designs, personalized gifts, and bridal keepsakes."
          />
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/shop" className="rr-btn rr-btn--ghost rr-btn--lg">
              Explore all pieces <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. HOW IT WORKS (3 Simple Steps) ─── */}
      <HowItWorks />

      {/* ─── 6. ATELIER COMMUNITY & INSTAGRAM ─── */}
      <InstagramFeed />
    </div>
  )
}
