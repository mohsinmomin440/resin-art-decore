import { useState } from 'react'
import { ChevronDown } from './svg'
import { FAQ_SECTIONS } from '../data/faq'

export default function FAQAccordion() {
  const [expanded, setExpanded] = useState('ordering')

  return (
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
  )
}