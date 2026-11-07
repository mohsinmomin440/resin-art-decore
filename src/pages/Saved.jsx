import { Link } from 'react-router-dom'
import { usePageMeta, useSaved, useContact, guardOrder } from '../hooks'
import { savedListLink } from '../utils/whatsapp'
import { productById } from '../data/products'
import { HeartFilled, ShoppingBag, Trash, WhatsApp } from '../components/svg'

export default function Saved() {
  usePageMeta({ title: 'Saved items', description: 'Your saved resin pieces. Send the whole list on WhatsApp in one message.' })
  const { saved, remove, clear } = useSaved()
  const { contact } = useContact()

  // Drop slugs that no longer exist in the catalogue.
  const products = saved.map((slug) => productById(slug)).filter(Boolean)
  const waHref = savedListLink({ contact, items: products })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Wishlist</span>
            <h1>Saved Pieces</h1>
            <p>Pieces you have hearted. Send the whole list on WhatsApp in one message — we will confirm the details with you.</p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        {products.length === 0 ? (
          <div className="rr-empty">
            <HeartFilled size={48} className="rr-empty__icon" />
            <h2>No saved items yet</h2>
            <p>Heart a product on the shop page to save it here.</p>
            <Link to="/shop" className="rr-btn mt-4">
              <ShoppingBag size={16} /> Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="rr-saved-list">
              {products.map((p, i) => {
                const slug = p.slug
                return (
                  <li key={slug} className="rr-saved-item">
                    <div className="rr-saved-item__info">
                      <span className="rr-saved-item__num">{i + 1}.</span>
                      <Link to={`/product/${slug}`} className="rr-saved-item__name">{p.name}</Link>
                    </div>
                    <button type="button" onClick={() => remove(slug)} aria-label={`Remove ${p.name}`} className="rr-saved-item__remove">
                      <Trash size={16} />
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="rr-saved-actions">
              <button type="button" onClick={clear} className="rr-btn rr-btn--ghost">
                <Trash size={14} /> Clear list
              </button>
              <a
                href={waHref}
                onClick={(e) => guardOrder(e, (c) => savedListLink({ contact: c, items: products }))}
                target="_blank"
                rel="noopener noreferrer"
                className="rr-btn rr-btn--wa"
              >
                <WhatsApp size={16} /> Send my list on WhatsApp
              </a>
            </div>
          </>
        )}
      </section>
    </>
  )
}