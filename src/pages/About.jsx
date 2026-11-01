import { Link } from 'react-router-dom'
import { usePageMeta, useJsonLd } from '../hooks'
import Eyebrow from '../components/Eyebrow'
import HeartDivider from '../components/HeartDivider'
import CertBadges from '../components/CertBadges'
import ProcessTimeline from '../components/ProcessTimeline'
import { BUSINESS, CONTACTS } from '../data/config'
import { productImage } from '../utils/productImage'
import { orderLink } from '../utils/whatsapp'
import {
  Heart,
  Handmade,
  Flower,
  Sparkle,
  Gift,
  Package,
  Diamond,
  WhatsApp,
  ShoppingBag,
  ArrowRight,
} from '../components/svg'

const STORY_FEATURES = [
  {
    Icon: Handmade,
    title: 'Handmade by Artisan',
    text: 'Mixed, layered, poured and polished entirely by hand in our studio — never machine-made.',
  },
  {
    Icon: Flower,
    title: 'Real Botanicals & Gold',
    text: 'Real preserved rose petals, baby’s breath florals and radiant 24k gold foil leaf accents.',
  },
  {
    Icon: Sparkle,
    title: 'Poured Fresh to Order',
    text: 'Nothing sits collecting dust on a warehouse shelf. Your piece is poured fresh for your milestone.',
  },
]

const WHY_FEATURES = [
  {
    Icon: Gift,
    title: 'Custom Keepsakes',
    text: 'Wedding Varmala preservation, baby names, nikah frames & personalized photo hearts.',
  },
  {
    Icon: Package,
    title: 'Pan-India Delivery',
    text: 'Multi-layer bubble wrap and shatterproof boxed packaging delivered safely across India.',
  },
  {
    Icon: Diamond,
    title: 'Non-Yellowing Resin',
    text: 'Premium crystal-clear epoxy with UV resistance that preserves timeless clarity for years.',
  },
  {
    Icon: WhatsApp,
    title: 'Direct WhatsApp Chat',
    text: 'Every order, draft photo and question is answered personally by Makbul & Asim.',
  },
]

const ATELIER_THUMBS = [
  { slug: 'bismillah-heart-frame', name: 'Bismillah Heart Frame' },
  { slug: 'personalized-flower-heart', name: 'Preserved Floral Heart' },
  { slug: 'love-letters', name: 'LOVE Floral Letters' },
  { slug: 'butterfly-heart-tray', name: 'Butterfly Resin Tray' },
  { slug: 'alphabet-keychain', name: 'Gold Flake Keychain' },
  { slug: 'four-qul-set', name: 'Four Qul Islamic Set' },
]

export default function About() {
  const contact = CONTACTS.find((c) => c.default) || CONTACTS[0]
  const waHref = orderLink({ contact })

  usePageMeta({
    title: 'About Our Studio — Our Story & Craft',
    description:
      'Aman Resin Art And Decore — handcrafted resin keepsakes, bridal floral preservation, and Islamic calligraphy art poured with love in Gujarat, India.',
  })

  useJsonLd('about-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address?.street,
      addressLocality: BUSINESS.address?.city,
      addressRegion: BUSINESS.address?.state,
      postalCode: BUSINESS.address?.pincode,
      addressCountry: 'IN',
    },
  })

  return (
    <div className="rr-about-page">
      {/* ─── 1. HERO — Soft Blush Gradient Split ─── */}
      <section className="rr-about-hero" data-no-reveal>
        <div className="container">
          <div className="rr-about-hero__grid">
            <div className="rr-about-hero__content">
              <Eyebrow text="About Our Studio" />
              <h1 className="rr-about-hero__title">
                Our Story is<br />
                <span className="rr-about-hero__emphasis">Poured with Love</span>
              </h1>
              <HeartDivider width={48} />
              <p className="rr-about-hero__lede">
                At Aman Resin Art And Decore, we believe every keepsake preserves a precious memory.
                From real bridal flower preservation to timeless Islamic Ayahs and personalized family gifts,
                each piece is hand-poured with passion, crystal-clear epoxy resin, and devotion to fine craftsmanship.
              </p>
              <div className="rr-about-hero__ctas">
                <a href="#our-story" className="rr-btn rr-btn--primary">
                  <Heart size={16} /> Our Journey
                </a>
                <Link to="/shop" className="rr-btn rr-btn--ghost">
                  <ShoppingBag size={16} /> Browse Collection
                </Link>
              </div>
            </div>

            <div className="rr-about-hero__img-wrap">
              <img
                src={productImage('personalized-flower-heart', 1, 800)}
                alt="Handcrafted floral resin keepsake heart"
                className="rr-about-hero__img"
                fetchPriority="high"
              />
              <div className="rr-about-hero__badge">
                <Sparkle size={15} /> Signature Keepsake
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. OUR STORY — 3 Columns: Photo / Text / Features Card ─── */}
      <section className="rr-about-story" id="our-story">
        <div className="container">
          <div className="rr-about-story__grid">
            <div className="rr-about-story__photo-wrap">
              <img
                src={productImage('bismillah-heart-frame', 1, 800)}
                alt="Hand-poured Islamic Bismillah calligraphy resin frame"
                className="rr-about-story__photo"
                loading="lazy"
              />
            </div>

            <div className="rr-about-story__content">
              <Eyebrow text="Our Story" />
              <h2 className="rr-about-story__title">A Passion for Preservation &amp; Art</h2>
              <p>
                Aman Resin Art And Decore was born from a deep love for handcrafted art and the beauty of
                freezing special moments in time. What began in our home studio in Kakoshi (Patan District, Gujarat) as a passion project
                has blossomed into an atelier trusted by families and brides across India.
              </p>
              <p>
                We specialize in preserving what matters most to you — wedding varmalas, anniversary petals,
                personalized names, and sacred Islamic calligraphy. Nothing is mass-produced, and no two pieces
                are ever identical. Every single pour is planned, cured for 48 hours, and hand-finished with care.
              </p>
              <div className="mt-2">
                <Link to="/contact" className="rr-btn rr-btn--primary">
                  <Heart size={16} /> Talk to Our Artisan
                </Link>
              </div>
            </div>

            <div className="rr-features-card">
              {STORY_FEATURES.map(({ Icon, title, text }) => (
                <div key={title} className="rr-features-card__row">
                  <span className="rr-features-card__icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="rr-features-card__heading">{title}</div>
                    <p className="rr-features-card__text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHY CHOOSE US — 4 Feature Pillars ─── */}
      <section className="rr-about-why">
        <div className="container">
          <div className="text-center">
            <Eyebrow text="Why Choose Us" />
            <h2 className="section-title mt-2">More Than Just Décor</h2>
            <HeartDivider width={46} />
          </div>

          <div className="rr-about-why__grid">
            {WHY_FEATURES.map(({ Icon, title, text }) => (
              <div key={title} className="rr-about-why__cell">
                <span className="rr-about-why__icon">
                  <Icon size={22} />
                </span>
                <div className="rr-about-why__title">{title}</div>
                <p className="rr-about-why__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CRAFT GUARANTEES ─── */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <Eyebrow text="Studio Standards" />
          <h2 className="section-title mt-2">Our Craft Guarantees</h2>
          <HeartDivider width={46} />
          <p className="text-muted" style={{ maxWidth: '520px', margin: '10px auto 0' }}>
            We adhere to strict artisanal benchmarks — ensuring non-yellowing crystal transparency,
            shatterproof durability, and flawless glass-smooth finishes.
          </p>
        </div>
        <CertBadges variant="pills" />
      </section>

      {/* ─── 5. HOW IT IS MADE (PROCESS TIMELINE) ─── */}
      <section className="container py-5" style={{ borderTop: '1px solid rgba(212, 163, 89, 0.18)' }}>
        <div className="text-center mb-4">
          <Eyebrow text="How It's Made" />
          <h2 className="section-title mt-2">From Idea to Your Door</h2>
          <HeartDivider width={46} />
        </div>
        <ProcessTimeline />
      </section>

      {/* ─── 6. A PEEK INTO OUR ATELIER (6 CREATIONS) ─── */}
      <section className="rr-about-atelier">
        <div className="container">
          <div className="text-center">
            <Eyebrow text="From The Studio" />
            <h2 className="section-title mt-2">A Peek Into Our Atelier</h2>
            <HeartDivider width={46} />
            <p className="text-muted" style={{ maxWidth: '480px', margin: '8px auto 0' }}>
              A small glimpse of signature pieces poured, cured, and sent with love to our customers.
            </p>
          </div>

          <div className="rr-about-atelier__grid">
            {ATELIER_THUMBS.map((item) => (
              <Link
                key={item.slug}
                to={`/product/${item.slug}`}
                className="rr-about-atelier__item"
                title={item.name}
              >
                <img
                  src={productImage(item.slug, 1, 400)}
                  alt={item.name}
                  className="rr-about-atelier__img"
                  loading="lazy"
                />
                <span className="rr-about-atelier__label">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/gallery" className="rr-btn rr-btn--ghost">
              Explore our full gallery <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. CLOSING CTA ─── */}
      <section className="rr-about-cta">
        <div className="container">
          <h2 className="rr-about-cta__title">Shall We Pour Something Special for You?</h2>
          <HeartDivider width={48} />
          <p className="rr-about-cta__lede">
            Browse what we make in our ready collection, or share your custom ideas, names,
            or preserved flowers directly on WhatsApp.
          </p>
          <div className="rr-about-cta__actions">
            <Link to="/shop" className="rr-btn rr-btn--primary rr-btn--lg">
              <ShoppingBag size={17} /> Browse the shop
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rr-btn rr-btn--wa rr-btn--lg"
            >
              <WhatsApp size={17} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
