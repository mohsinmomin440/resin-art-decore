import { usePageMeta } from '../hooks'
import { BUSINESS, CONTACTS, SOCIAL } from '../data/config'
import { Phone, WhatsApp, Mail, Instagram, Facebook, MapPin } from '../components/svg'

export default function Contact() {
  usePageMeta({ title: 'Contact', description: 'Contact Resin Art And Decore — order on WhatsApp with Makbul Fatema or Asim.' })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner">
            <div>
              <span className="eyebrow">Contact</span>
              <h1>Get in touch</h1>
              <p>Order on WhatsApp, or ask about a custom piece. We reply on WhatsApp — that is how every order is placed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <div className="rr-contact-grid">
          <div className="rr-contact-card">
            <h2>Order on WhatsApp</h2>
            <p className="rr-muted">Tap a number. The product name and your note are already filled in.</p>
            {CONTACTS.map((c) => (
              <a
                key={c.id}
                href={`https://wa.me/${c.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-contact-btn"
              >
                <span className="rr-contact-btn__icon"><WhatsApp size={20} /></span>
                <span>
                  <span className="rr-contact-btn__label">{c.label}</span>
                  <span className="rr-contact-btn__num">{c.display}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="rr-contact-card">
            <h2>Write to us</h2>
            <ul className="rr-info-list">
              <li><span className="rr-info-list__icon"><Phone size={16} /></span><span>Call on WhatsApp — it is how we confirm every order.</span></li>
              {BUSINESS.email && (
                <li><span className="rr-info-list__icon"><Mail size={16} /></span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
              )}
              <li><span className="rr-info-list__icon"><MapPin size={16} /></span><span>Based in {BUSINESS.area} — pickup details shared on WhatsApp.</span></li>
            </ul>

            <div className="rr-socials">
              {SOCIAL.instagram && (
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="rr-social-link">
                  <Instagram size={18} /> Instagram
                </a>
              )}
              {SOCIAL.facebook && (
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="rr-social-link">
                  <Facebook size={18} /> Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}