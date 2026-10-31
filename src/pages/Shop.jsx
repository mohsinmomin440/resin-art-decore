import { usePageMeta, useJsonLd } from '../hooks'
import ProductGrid from '../components/ProductGrid'
import { shopProducts } from '../data/products'
import { productImage } from '../utils/productImage'

export default function Shop() {
  usePageMeta({
    title: 'Shop',
    description: 'Handmade resin pieces from Resin Art And Decore — Islamic décor, love letters, keychains, phone cases and custom gifts. Order on WhatsApp.',
  })
  useJsonLd('shop-products', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Resin Art And Decore — Shop',
    numberOfItems: shopProducts.length,
    itemListElement: shopProducts.slice(0, 30).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        category: p.category,
        image: typeof window !== 'undefined'
          ? new URL(productImage(p.slug, 1, 800), window.location.origin).href
          : productImage(p.slug, 1, 800),
        brand: { '@type': 'Brand', name: 'Resin Art And Decore' },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner">
            <div>
              <span className="eyebrow">Shop</span>
              <h1>Handmade resin pieces</h1>
              <p>Islamic calligraphy, love letters, keychains, phone cases and custom gifts. Every piece is poured by hand and ordered on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <ProductGrid />
      </section>
    </>
  )
}