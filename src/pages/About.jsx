import { Link } from 'react-router-dom'
import { usePageMeta, useJsonLd } from '../hooks'
import SectionHeader from '../components/SectionHeader'
import ProcessTimeline from '../components/ProcessTimeline'
import { BUSINESS } from '../data/config'
import { Check, Handmade, Custom } from '../components/svg'

export default function About() {
  usePageMeta({ title: 'About Us', description: 'Resin Art And Decore — handmade resin gifts. Every piece is poured and finished by hand.' })
  useJsonLd('about-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    description: BUSINESS.tagline,
  })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner">
            <div>
              <span className="eyebrow">About Us</span>
              <h1>Gifts made by hand,<br /><span style={{ color: 'var(--rr-crimson-600)', fontStyle: 'italic' }}>for someone special</span></h1>
              <p>Resin Art And Decore makes handmade resin gifts — Islamic calligraphy, love letters, keychains, phone cases and custom pieces. Every order is poured after you place it.</p>
              <Link to="/shop" className="rr-btn">Browse the shop</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <div className="rr-split">
          <div className="rr-split__text">
            <SectionHeader eyebrow="Our story" title="Handmade, one piece at a time" />
            <p>Resin Art And Decore began as a small home workshop. Every piece — from a Bismillah heart frame to a pressed-flower phone case — is mixed, poured and finished by hand. Nothing is machine-made or pre-made, and nothing sits on a shelf waiting for a customer.</p>
            <p>We make pieces for Islamic décor, for love and for everyday moments. If you have an idea that is not on the site, send it on WhatsApp and we will talk it through.</p>
            <p className="rr-muted">[ABOUT STORY] — the owner's own story, in their own words. Replace this paragraph when it is ready.</p>
          </div>
          <div className="rr-split__facts">
            <div className="rr-fact">
              <Handmade size={24} className="rr-fact__icon" />
              <h3>Handmade</h3>
              <p>Mixed, poured and finished by hand — no machines, no mass production.</p>
            </div>
            <div className="rr-fact">
              <Custom size={24} className="rr-fact__icon" />
              <h3>Custom</h3>
              <p>Add a name, initials or a photo. We build around your idea.</p>
            </div>
            <div className="rr-fact">
              <Check size={24} className="rr-fact__icon" />
              <h3>Made to order</h3>
              <p>Nothing is made until you order it. We confirm the date with you on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <SectionHeader eyebrow="How it's made" title="From idea to your door" />
        <ProcessTimeline />
      </section>

      <section className="container py-6">
        <SectionHeader eyebrow="What we make" title="Pieces for every moment" />
        <div className="rr-what-grid">
          {['Islamic calligraphy frames and plates', 'LOVE and MOM letters', 'Personalised photo and flower hearts', 'Alphabet keychains', 'Pressed-flower phone cases', 'Décor trays, feathers and more'].map((t) => (
            <div key={t} className="rr-what-item"><Check size={16} /> {t}</div>
          ))}
        </div>
      </section>
    </>
  )
}