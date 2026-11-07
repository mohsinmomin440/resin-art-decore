import { useState } from 'react'
import { usePageMeta, useContact, guardOrder } from '../hooks'
import { shopProducts } from '../data/products'
import { productImage } from '../utils/productImage'
import { orderLink } from '../utils/whatsapp'
import { WhatsApp } from '../components/svg'

// Only pieces that can actually be personalised appear in the builder.
const customizableProducts = shopProducts.filter((p) => p.customizable)

export default function Custom() {
  usePageMeta({ title: 'Custom resin piece', description: 'Design your own resin piece — pick a product, add a name, initials, colors and occasion. We build it and message you on WhatsApp.' })
  const [step, setStep] = useState(1)
  const [productSlug, setProductSlug] = useState('')
  const [form, setForm] = useState({ name: '', initials: '', colors: '', occasion: '', note: '' })

  const product = customizableProducts.find((p) => p.slug === productSlug)
  const { contact } = useContact()
  const build = (c) =>
    orderLink({ contact: c, product, intro: product ? `Hi, I'd like a custom ${product.name}.` : '', options: form })
  const href = build(contact)

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Custom Creation</span>
            <h1>Design Your Own Piece</h1>
            <p>Pick a shape or piece, add custom names, initials, colors and celebration occasion. We build it and confirm with you on WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="rr-builder">
          <div className="rr-builder__steps">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`rr-builder__step${step >= n ? ' is-active' : ''}`} aria-current={step === n ? 'step' : undefined}>
                <span className="rr-builder__step-num">{n}</span>
                <span className="rr-builder__step-label">{n === 1 ? 'Choose' : n === 2 ? 'Personalise' : 'Send'}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="rr-builder__title">Choose a product</h2>
              <div className="rr-builder__grid">
                {customizableProducts.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    className={`rr-builder__tile${productSlug === p.slug ? ' is-selected' : ''}`}
                    onClick={() => setProductSlug(p.slug)}
                  >
                    <img src={productImage(p.slug, 1, 400)} width="400" height="400" loading="lazy" alt={p.name} className="rr-builder__tile-img" />
                    <span className="rr-builder__tile-name">{p.name}</span>
                  </button>
                ))}
              </div>
              <div className="rr-builder__nav">
                <button type="button" disabled className="rr-btn rr-btn--ghost">Back</button>
                <button type="button" className="rr-btn" onClick={() => setStep(2)} disabled={!productSlug}>Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="rr-builder__title">Personalise it</h2>
              <div className="rr-builder__form">
                <label className="rr-field">
                  <span>Name</span>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aisha" />
                </label>
                <label className="rr-field">
                  <span>Initials</span>
                  <input type="text" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="e.g. AS" maxLength={4} />
                </label>
                <label className="rr-field">
                  <span>Colors</span>
                  <input type="text" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="e.g. blue + gold" />
                </label>
                <label className="rr-field">
                  <span>Occasion</span>
                  <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}>
                    <option value="">Select…</option>
                    <option>Birthday</option><option>Wedding</option><option>Anniversary</option>
                    <option>Valentine's</option><option>Housewarming</option><option>Eid</option>
                    <option>Ramadan</option><option>Rakhi</option><option>Just because</option>
                  </select>
                </label>
                <label className="rr-field rr-field--full">
                  <span>Note</span>
                  <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} placeholder="Anything else we should know?" />
                </label>
              </div>
              <div className="rr-builder__nav">
                <button type="button" className="rr-btn rr-btn--ghost" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="rr-btn" onClick={() => setStep(3)}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && product && (
            <div>
              <h2 className="rr-builder__title">Your order</h2>
              <div className="rr-builder__summary">
                <img src={productImage(product.slug, 1, 400)} alt={product.name} className="rr-builder__summary-img" />
                <div className="rr-builder__summary-text">
                  <div className="rr-builder__summary-name">{product.name}</div>
                  {form.name && <div>Name: {form.name}</div>}
                  {form.initials && <div>Initials: {form.initials}</div>}
                  {form.colors && <div>Colors: {form.colors}</div>}
                  {form.occasion && <div>Occasion: {form.occasion}</div>}
                  {form.note && <div>Note: {form.note}</div>}
                </div>
              </div>
              <div className="rr-builder__nav">
                <button type="button" className="rr-btn rr-btn--ghost" onClick={() => setStep(2)}>Back</button>
                <a href={href} onClick={(e) => guardOrder(e, build)} target="_blank" rel="noopener noreferrer" className="rr-btn rr-btn--wa">
                  <WhatsApp size={16} /> Send on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}