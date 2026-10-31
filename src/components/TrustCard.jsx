/**
 * TrustCard — 4 items that overlap the hero band. Handmade / Custom / Every
 * occasion / Order on WhatsApp. Each claim appears once per page.
 */
import { Handmade, Custom, Occasion, WhatsApp } from './svg'

const ITEMS = [
  { icon: Handmade, title: 'Handmade', text: 'Every piece is poured and finished by hand — nothing is machine-made or pre-made.' },
  { icon: Custom, title: 'Custom designs', text: 'Add a name, initials or a photo. Send your idea on WhatsApp and we will build it.' },
  { icon: Occasion, title: 'Every occasion', text: 'Birthdays, weddings, festivals, housewarmings — a resin piece fits them all.' },
  { icon: WhatsApp, title: 'Order on WhatsApp', text: 'Pick a piece, tap Order, and we confirm the details and the date with you.' },
]

export default function TrustCard({ className = '' }) {
  return (
    <div className={`rr-trust-card ${className}`.trim()}>
      <div className="rr-trust-card__grid">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rr-trust-card__item">
            <span className="rr-trust-card__icon"><Icon size={22} /></span>
            <h3 className="rr-trust-card__title">{title}</h3>
            <p className="rr-trust-card__text">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}