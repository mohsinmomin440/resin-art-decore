/**
 * Footer — luxury boutique brand block, navigation, collections, atelier contact,
 * craft assurances, and copyright.
 */
import { Link } from 'react-router-dom'
import { Phone, Mail, WhatsApp, Instagram, Facebook, MapPin } from './svg'
import Logo from './Logo'
import CertBadges from './CertBadges'
import { BUSINESS, CONTACTS, SOCIAL } from '../data/config'
import { orderLink } from '../utils/whatsapp'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All Gifts' },
  { to: '/custom', label: 'Bespoke Orders' },
  { to: '/gallery', label: 'Atelier Gallery' },
  { to: '/about', label: 'Our Story' },
  { to: '/faq', label: 'Craft & FAQ' },
  { to: '/contact', label: 'Contact Us' },
]

const COLLECTION_LINKS = [
  { to: '/shop?category=Love%20%26%20Gifts', label: 'Bridal & Love Keepsakes' },
  { to: '/shop?category=Islamic%20Décor', label: 'Islamic Ayah Frames' },
  { to: '/shop?category=Keychains', label: 'Custom Name Keychains' },
  { to: '/shop?category=Décor%20%26%20Accessories', label: 'Wall Clocks & Décor' },
  { to: '/custom', label: 'Floral Preservation' },
]

const year = new Date().getFullYear()

export default function Footer() {
  const waHref = orderLink({ contact: CONTACTS.find((c) => c.default) || CONTACTS[0] })

  return (
    <footer className="rr-footer">
      <div className="rr-footer__inner">
        {/* Col 1: Brand & Atelier Story */}
        <div className="rr-footer__col rr-footer__brand">
          <Logo size="footer" />
          <p className="rr-footer__description">
            Bespoke resin keepsakes, floral bridal preservation, Islamic wall art & personalized gifts, handcrafted to order with crystal-clear non-yellowing epoxy resin.
          </p>
          <div className="rr-footer__socials">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="rr-footer__social"
              title="Chat on WhatsApp"
            >
              <WhatsApp size={17} />
            </a>
            {SOCIAL.instagram ? (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rr-footer__social"
              >
                <Instagram size={17} />
              </a>
            ) : null}
            {SOCIAL.facebook ? (
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rr-footer__social"
              >
                <Facebook size={17} />
              </a>
            ) : null}
            {BUSINESS.email ? (
              <a
                href={`mailto:${BUSINESS.email}`}
                aria-label="Email"
                className="rr-footer__social"
              >
                <Mail size={17} />
              </a>
            ) : null}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="rr-footer__col">
          <h3 className="rr-footer__heading">Explore</h3>
          <ul className="rr-footer__list">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rr-footer__link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Collections */}
        <div className="rr-footer__col">
          <h3 className="rr-footer__heading">Collections</h3>
          <ul className="rr-footer__list">
            {COLLECTION_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rr-footer__link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Atelier & WhatsApp Ordering */}
        <div className="rr-footer__col rr-footer__atelier">
          <h3 className="rr-footer__heading">Direct Atelier</h3>
          <div className="rr-footer__contact-cards">
            {CONTACTS.map((c) => (
              <a
                key={c.id}
                href={`https://wa.me/${c.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-footer__contact-card"
              >
                <span className="rr-footer__contact-icon">
                  <Phone size={14} />
                </span>
                <div className="rr-footer__contact-details">
                  <span className="rr-footer__contact-name">{c.label}</span>
                  <span className="rr-footer__contact-num">{c.display}</span>
                </div>
              </a>
            ))}

            {BUSINESS.email && (
              <a
                href={`mailto:${BUSINESS.email}`}
                className="rr-footer__contact-card"
                title="Send us an email"
              >
                <span className="rr-footer__contact-icon">
                  <Mail size={14} />
                </span>
                <div className="rr-footer__contact-details">
                  <span className="rr-footer__contact-name">Direct Email</span>
                  <span className="rr-footer__contact-num rr-footer__contact-num--email">
                    {BUSINESS.email}
                  </span>
                </div>
              </a>
            )}
          </div>

          {BUSINESS.address?.full && (
            <div className="rr-footer__order-note">
              <span className="rr-footer__contact-icon">
                <MapPin size={14} />
              </span>
              <div className="rr-footer__contact-details">
                <span className="rr-footer__contact-name">Atelier Workshop</span>
                <span className="rr-footer__contact-num">Kakoshi, Patan, Gujarat (384290)</span>
              </div>
            </div>
          )}

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rr-footer__cta-btn"
          >
            <WhatsApp size={16} /> Direct WhatsApp Order
          </a>
        </div>
      </div>

      {/* Craft Assurances Band */}
      <div className="rr-footer__cert-band">
        <CertBadges variant="line" />
      </div>

      {/* Bottom Sub-bar */}
      <div className="rr-footer__bottom">
        <span className="rr-footer__copyright">
          © {year} {BUSINESS.name}. All rights reserved.
        </span>
        <span className="rr-footer__origin">
          Handmade with care in Kakoshi, Gujarat • Pan-India Delivery
        </span>
        <nav aria-label="Legal" className="rr-footer__legal">
          <Link to="/faq">FAQ</Link>
          <span className="rr-footer__sep">·</span>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
