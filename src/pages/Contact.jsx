import { usePageMeta, useJsonLd } from '../hooks'
import { BUSINESS, CONTACTS, SOCIAL } from '../data/config'
import { WhatsApp, Clock, MapPin, Mail, Instagram, Facebook, Sparkle, ArrowRight } from '../components/svg'

export default function Contact() {
  usePageMeta({
    title: `Contact Us — ${BUSINESS.name}`,
    description: `Contact ${BUSINESS.name} in Kakoshi, Gujarat — chat directly with Makbul Fatema & Asim on WhatsApp or email ${BUSINESS.email}.`,
  })

  useJsonLd('contact-page', {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact — ${BUSINESS.name}`,
    description: `Direct WhatsApp contact and atelier workshop address for handmade resin gifts from ${BUSINESS.name}.`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      email: BUSINESS.email,
      telephone: '+919428213440',
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address?.street,
        addressLocality: BUSINESS.address?.city,
        addressRegion: BUSINESS.address?.state,
        postalCode: BUSINESS.address?.pincode,
        addressCountry: 'IN',
      },
    },
  })

  const makbul = CONTACTS.find((c) => c.id === 'makbul') || CONTACTS[0]
  const asim = CONTACTS.find((c) => c.id === 'asim') || CONTACTS[1] || CONTACTS[0]
  const mapsQuery = encodeURIComponent(BUSINESS.address?.full || `${BUSINESS.name}, Kakoshi, Gujarat`)

  return (
    <div className="rr-contact-compact" data-no-reveal>
      <div className="container">
        <div className="rr-contact-compact__box">
          {/* Logo Emblem */}
          <div className="rr-contact-compact__logo-wrap">
            <img
              src="/images/brand/logo-128.webp"
              alt="Aman Resin Art And Decore"
              className="rr-contact-compact__logo"
            />
          </div>

          <span className="eyebrow">Direct Atelier</span>
          <h1 className="rr-contact-compact__title">Get in Touch</h1>
          <p className="rr-contact-compact__desc">
            Har order aur custom design WhatsApp par directly confirm hota hai.
            Neeche diye gaye number par tap karke direct chat start karein!
          </p>

          {/* 2 WhatsApp Direct Action Buttons */}
          <div className="rr-contact-compact__actions">
            <a
              href={`https://wa.me/${makbul.phone}?text=${encodeURIComponent(
                'Hi Makbul! I would like to discuss / place a custom resin order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rr-contact-compact__btn rr-contact-compact__btn--primary"
            >
              <div className="rr-contact-compact__btn-icon">
                <WhatsApp size={24} />
              </div>
              <div className="rr-contact-compact__btn-text">
                <span className="rr-contact-compact__tag">Custom Orders &amp; Designs</span>
                <strong>Chat with Makbul Fatema</strong>
                <span className="rr-contact-compact__num">{makbul.display}</span>
              </div>
            </a>

            <a
              href={`https://wa.me/${asim.phone}?text=${encodeURIComponent(
                'Hi Asim! I have a question regarding order status / delivery.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rr-contact-compact__btn"
            >
              <div className="rr-contact-compact__btn-icon">
                <WhatsApp size={24} />
              </div>
              <div className="rr-contact-compact__btn-text">
                <span className="rr-contact-compact__tag">Delivery &amp; Inquiries</span>
                <strong>Chat with Asim</strong>
                <span className="rr-contact-compact__num">{asim.display}</span>
              </div>
            </a>
          </div>

          {/* Direct Email Action */}
          {BUSINESS.email && (
            <a
              href={`mailto:${BUSINESS.email}`}
              className="rr-contact-compact__email"
              title="Send us an email"
            >
              <span className="rr-contact-compact__email-icon">
                <Mail size={16} />
              </span>
              <span>{BUSINESS.email}</span>
            </a>
          )}

          {/* Studio & Workshop Address Card */}
          {BUSINESS.address?.full && (
            <div className="rr-contact-compact__address">
              <div className="rr-contact-compact__address-head">
                <MapPin size={14} />
                <span>Studio &amp; Workshop Address</span>
              </div>
              <address className="rr-contact-compact__address-text">
                {BUSINESS.address.full}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-contact-compact__address-link"
              >
                <span>View on Google Maps</span>
                <ArrowRight size={12} />
              </a>
            </div>
          )}

          {/* Quick Info Bar */}
          <div className="rr-contact-compact__meta">
            <div className="rr-contact-compact__meta-item">
              <Clock size={16} />
              <span>9:00 AM – 9:00 PM (Daily)</span>
            </div>
            <div className="rr-contact-compact__meta-item">
              <MapPin size={16} />
              <span>Kakoshi, Patan • Pan-India Delivery</span>
            </div>
            <div className="rr-contact-compact__meta-item">
              <Sparkle size={16} />
              <span>100% Hand-Poured to Order</span>
            </div>
          </div>

          {/* Socials */}
          {(SOCIAL.instagram || SOCIAL.facebook) && (
            <div className="rr-contact-compact__socials">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rr-social-pill"
                >
                  <Instagram size={15} />
                  <span>Instagram</span>
                </a>
              )}
              {SOCIAL.facebook && (
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rr-social-pill"
                >
                  <Facebook size={15} />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
