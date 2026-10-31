/**
 * Footer — brand block, quick links, contact, ordering note, socials.
 * No opening hours, no "All rights reserved", no (R) marks.
 */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, WhatsApp, Clock, Instagram, Facebook } from './svg'
import Logo from './Logo'
import { BUSINESS, CONTACTS, SOCIAL } from '../data/config'
import { orderLink } from '../utils/whatsapp'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const LEGAL_LINKS = [
  { to: '/faq', label: 'FAQ' },
]

const year = new Date().getFullYear()

export default function Footer() {
  const waHref = orderLink({ contact: CONTACTS.find((c) => c.default) || CONTACTS[0] })

  return (
    <footer className="rr-footer">
      <div className="rr-footer__inner">
        <div className="rr-footer__brand">
          <Logo size="footer" />
          <p className="rr-footer__tagline">{BUSINESS.tagline}</p>
          <div className="rr-footer__socials">
            <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp" className="rr-footer__social">
              <WhatsApp size={16} />
            </a>
            {SOCIAL.instagram && (
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rr-footer__social">
                <Instagram size={16} />
              </a>
            )}
            {SOCIAL.facebook && (
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rr-footer__social">
                <Facebook size={16} />
              </a>
            )}
            {BUSINESS.email && (
              <a href={`mailto:${BUSINESS.email}`} aria-label="Email" className="rr-footer__social">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>

        <nav className="rr-footer__links" aria-label="Footer">
          {QUICK_LINKS.map((l, i) => (
            <Fragment key={l.to}>
              {i > 0 && <span aria-hidden>·</span>}
              <Link to={l.to}>{l.label}</Link>
            </Fragment>
          ))}
        </nav>

        <div className="rr-footer__contact">
          <h3 className="rr-footer__heading">Contact</h3>
          <ul className="rr-footer__info">
            {CONTACTS.map((c) => (
              <li key={c.id}>
                <span className="rr-footer__icon"><Phone size={14} /></span>
                <a href={`https://wa.me/${c.phone}`} target="_blank" rel="noopener noreferrer" className="rr-footer__row">
                  <span className="rr-footer__label">{c.label}</span>
                  <span className="rr-footer__value">{c.display}</span>
                </a>
              </li>
            ))}
            {BUSINESS.email && (
              <li>
                <span className="rr-footer__icon"><Mail size={14} /></span>
                <a href={`mailto:${BUSINESS.email}`} className="rr-footer__row">
                  <span className="rr-footer__label">Email</span>
                  <span className="rr-footer__value">{BUSINESS.email}</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="rr-footer__order">
          <h3 className="rr-footer__heading">Ordering</h3>
          <ul className="rr-footer__info">
            <li>
              <span className="rr-footer__icon"><Clock size={14} /></span>
              <span className="rr-footer__row">
                <span className="rr-footer__label">Order any day</span>
                <span className="rr-footer__value">Order on WhatsApp — we confirm the date when you write</span>
              </span>
            </li>
          </ul>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="rr-footer__cta">
            <WhatsApp size={16} /> Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="rr-footer__bottom">
        <span>© {year} {BUSINESS.name}</span>
        <nav aria-label="Legal" className="rr-footer__legal">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}