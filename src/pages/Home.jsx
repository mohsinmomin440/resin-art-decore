import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta, useJsonLd } from '../hooks'
import { shopProducts } from '../data/products'
import { CATEGORY_TILES } from '../data/categories'
import { REVIEWS } from '../data/reviews'
import { CONTACTS, BUSINESS } from '../data/config'
import { orderLink } from '../utils/whatsapp'
import { productImage } from '../utils/productImage'
import { useLocalStorage } from '../hooks/useLocalStorage'

import Eyebrow from '../components/Eyebrow'
import SectionHeader from '../components/SectionHeader'
import TrustCard from '../components/TrustCard'
import CategoryTile from '../components/CategoryTile'
import ProductCard from '../components/ProductCard'
import OccasionRail from '../components/OccasionRail'
import ProcessTimeline from '../components/ProcessTimeline'
import NumberChooser from '../components/NumberChooser'
import ResinPourBlobs from '../components/svg/ResinPourBlobs'
import { Check, WhatsApp, ArrowRight, Sparkle, Heart } from '../components/svg'

export default function Home() {
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const [chooserOpen, setChooserOpen] = useState(false)

  usePageMeta({
    title: 'Handmade Resin Gifts & Décor',
    description:
      'Resin Art And Decore — handcrafted Islamic calligraphy frames, customized love letters, floral keychains and keepsake gifts. Direct ordering on WhatsApp.',
  })

  useJsonLd('home-business', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    url: typeof window !== 'undefined' ? window.location.origin : 'https://resinartanddecore.com',
    priceRange: '₹₹',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919428213440',
      contactType: 'customer service',
    },
  })

  // 8 featured products (prefer items with badges)
  const featured = shopProducts
    .filter((p) => p.badge || p.customizable)
    .slice(0, 8)

  // 6 gallery teaser photos
  const galleryTeaser = shopProducts.slice(0, 6)

  // Two floating real products for the hero right panel
  const heroCard1 = shopProducts.find((p) => p.slug === 'bismillah-heart-frame') || shopProducts[0]
  const heroCard2 = shopProducts.find((p) => p.slug === 'love-letters') || shopProducts[1]

  const heroWaHref = orderLink({ contact })

  return (
    <div className="rr-home">
      {/* ─── 3. HERO SECTION ─── */}
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
              <p className="rr-hero__lede">
                Unique resin art pieces poured by hand. From gold-accented Islamic calligraphy to
                personalized names, pressed flowers, and timeless keepsake gifts.
              </p>

              <ul className="rr-hero__ticks">
                <li>
                  <span className="rr-hero__tick-icon"><Check size={16} /></span>
                  <span>Handcrafted & custom poured in India</span>
                </li>
                <li>
                  <span className="rr-hero__tick-icon"><Check size={16} /></span>
                  <span>Direct orders & personal touch on WhatsApp</span>
                </li>
              </ul>

              <div className="rr-hero__ctas">
                <a
                  href={heroWaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rr-btn rr-btn--wa rr-btn--lg"
                  onClick={() => setChooserOpen(false)}
                >
                  <WhatsApp size={18} /> Order on WhatsApp
                </a>
                <Link to="/shop" className="rr-btn rr-btn--ghost rr-btn--lg">
                  View collection <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Maroon Luxury Panel */}
            <div className="rr-hero__panel">
              <ResinPourBlobs className="rr-hero__blobs" />

              {/* Calligraphy Ornament */}
              <div className="rr-hero__calligraphy" dir="rtl" lang="ar">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>

              {/* Floating Mini Product Card 1 */}
              {heroCard1 && (
                <Link
                  to={`/product/${heroCard1.slug}`}
                  className="rr-hero__float-card rr-hero__float-card--1"
                >
                  <img
                    src={productImage(heroCard1.slug, 1, 400)}
                    alt={heroCard1.name}
                    className="rr-hero__float-img"
                  />
                  <div className="rr-hero__float-info">
                    <span className="rr-hero__float-badge">Bestseller</span>
                    <strong className="rr-hero__float-name">{heroCard1.name}</strong>
                  </div>
                </Link>
              )}

              {/* Floating Mini Product Card 2 */}
              {heroCard2 && (
                <Link
                  to={`/product/${heroCard2.slug}`}
                  className="rr-hero__float-card rr-hero__float-card--2"
                >
                  <img
                    src={productImage(heroCard2.slug, 1, 400)}
                    alt={heroCard2.name}
                    className="rr-hero__float-img"
                  />
                  <div className="rr-hero__float-info">
                    <span className="rr-hero__float-badge">Custom</span>
                    <strong className="rr-hero__float-name">{heroCard2.name}</strong>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. TRUST CARD (Overlaps Hero) ─── */}
      <section className="container rr-trust-section">
        <TrustCard />
      </section>

      {/* ─── 5. SHOP BY CATEGORY ─── */}
      <section className="container py-6">
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
      </section>

      {/* ─── 6. FEATURED PRODUCTS ─── */}
      <section className="container py-6">
        <SectionHeader
          eyebrow="Our favorites"
          title="Featured creations"
          description="Most loved pieces, custom orders, and fresh additions to our workshop."
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
      </section>

      {/* ─── 7. PERSONALIZE BANNER ─── */}
      <section className="container py-6">
        <div className="rr-custom-banner" data-reveal="up">
          <div className="rr-custom-banner__content">
            <span className="rr-custom-banner__eyebrow">
              <Sparkle size={14} /> Made To Order
            </span>
            <h2 className="rr-custom-banner__title">
              Want a custom resin piece designed just for you?
            </h2>
            <p className="rr-custom-banner__desc">
              Whether it is a loved one's initials, real pressed flowers, or a special anniversary date,
              we bring your vision to life in liquid resin and gold.
            </p>

            <div className="rr-custom-banner__steps">
              <div className="rr-custom-banner__step">
                <span className="rr-custom-banner__num">1</span>
                <div>
                  <strong>Pick a style</strong>
                  <p>Heart frame, plate, letters or keychain</p>
                </div>
              </div>
              <div className="rr-custom-banner__step">
                <span className="rr-custom-banner__num">2</span>
                <div>
                  <strong>Personalize</strong>
                  <p>Names, initials, color pigments & flowers</p>
                </div>
              </div>
              <div className="rr-custom-banner__step">
                <span className="rr-custom-banner__num">3</span>
                <div>
                  <strong>Poured with love</strong>
                  <p>Hand-poured, cured, polished & delivered</p>
                </div>
              </div>
            </div>

            <div className="rr-custom-banner__cta">
              <Link to="/custom" className="rr-btn rr-btn--gold rr-btn--lg">
                <Sparkle size={16} /> Start Customizing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. SHOP BY OCCASION ─── */}
      <section className="container py-6">
        <SectionHeader
          eyebrow="Gifting moments"
          title="Shop by occasion"
          description="Find meaningful resin gifts for life's most precious celebrations."
        />
        <OccasionRail />
      </section>

      {/* ─── 9. HOW IT'S MADE ─── */}
      <section className="container py-6">
        <SectionHeader
          eyebrow="Craftsmanship"
          title="How it is made"
          description="From liquid resin and pigments to a finished heirloom piece."
        />
        <ProcessTimeline />
      </section>

      {/* ─── 10. GALLERY TEASER ─── */}
      <section className="container py-6">
        <SectionHeader
          eyebrow="From our workshop"
          title="A glimpse of our work"
          description="Explore finished custom orders and pieces crafted for customers."
        />
        <div className="rr-gallery-teaser">
          {galleryTeaser.map((p) => (
            <Link
              key={p.slug}
              to={`/product/${p.slug}`}
              className="rr-gallery-teaser__tile"
              data-reveal="up"
            >
              <img
                src={productImage(p.slug, 1, 400)}
                alt={p.name}
                loading="lazy"
                className="rr-gallery-teaser__img"
              />
              <div className="rr-gallery-teaser__overlay">
                <span>{p.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/gallery" className="rr-btn rr-btn--ghost">
            View full gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── 11. REVIEWS / SHARE YOUR EXPERIENCE ─── */}
      <section className="container py-6">
        {REVIEWS.length > 0 ? (
          <div>
            <SectionHeader eyebrow="Kind Words" title="Customer Stories" />
            <div className="rr-reviews-grid">
              {REVIEWS.map((r, i) => (
                <div key={i} className="rr-review-card">
                  <p>"{r.text}"</p>
                  <strong>{r.author}</strong>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rr-experience-card" data-reveal="up">
            <div className="rr-experience-card__icon">
              <Heart size={32} />
            </div>
            <h2 className="rr-experience-card__title">Received your resin piece?</h2>
            <p className="rr-experience-card__desc">
              We would love to know how it looks in your home! Share your photos or kind feedback with
              us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(
                'Hi! I wanted to share a photo and feedback for my resin piece.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rr-btn rr-btn--wa"
            >
              <WhatsApp size={16} /> Share on WhatsApp
            </a>
          </div>
        )}
      </section>

      <NumberChooser
        open={chooserOpen}
        onClose={() => setChooserOpen(false)}
        onSelect={() => {}}
      />
    </div>
  )
}
