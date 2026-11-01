import { useState } from 'react'
import { usePageMeta, useJsonLd } from '../hooks'
import { WhatsApp, ChevronDown } from '../components/svg'
import { FAQ_SECTIONS } from '../data/faq'
import { orderLink } from '../utils/whatsapp'
import { CONTACTS } from '../data/config'

export default function FAQ() {
  usePageMeta({ title: 'FAQ', description: 'Frequently asked questions about Aman Resin Art And Decore — ordering, custom pieces, shipping, payment and caring for resin.' })
  useJsonLd('faq-page', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SECTIONS.flatMap((s) => s.questions).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  })

  const [expanded, setExpanded] = useState('ordering')
  const waHref = orderLink({ contact: CONTACTS.find((c) => c.default) || CONTACTS[0] })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Help &amp; FAQ</span>
            <h1>Got Questions? We've Got Answers</h1>
            <p>Everything you need to know about ordering, custom pieces, shipping, payment and caring for resin. Still stuck? WhatsApp us.</p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="rr-accordion">
          {FAQ_SECTIONS.map((s) => (
            <div key={s.id} className="rr-accordion__item">
              <button
                type="button"
                className="rr-accordion__head"
                aria-expanded={expanded === s.id}
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              >
                <span>{s.title}</span>
                <ChevronDown size={18} className={`rr-accordion__chevron${expanded === s.id ? ' is-open' : ''}`} />
              </button>
              {expanded === s.id && (
                <div className="rr-accordion__body">
                  {s.questions.map((qa, i) => (
                    <details key={i} className="rr-faq-q">
                      <summary>{qa.q}<ChevronDown size={14} className="rr-faq-q__arrow" /></summary>
                      <p>{qa.a}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rr-faq-cta">
          <div>
            <h3>Still have questions?</h3>
            <p>We usually reply on WhatsApp. Ask us anything.</p>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="rr-btn rr-btn--wa">
            <WhatsApp size={16} /> WhatsApp Us
          </a>
        </div>
      </section>
    </>
  )
}