import { usePageMeta, useJsonLd } from '../hooks'
import ProductGrid from '../components/ProductGrid'
import HeartDivider from '../components/HeartDivider'
import { shopProducts } from '../data/products'
import { productImage } from '../utils/productImage'

export default function Shop() {
  usePageMeta({
    title: 'Shop Handmade Resin Pieces',
    description: 'Handmade resin pieces from Aman Resin Art And Decore — Islamic décor, love letters, keychains, phone cases and custom gifts. Order on WhatsApp.',
  })
  useJsonLd('shop-products', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Aman Resin Art And Decore — Shop',
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
        brand: { '@type': 'Brand', name: 'Aman Resin Art And Decore' },
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
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Our Catalogue</span>
            <h1>Handmade Resin Pieces</h1>
            <HeartDivider width={48} />
            <p>
              Islamic calligraphy, personalized love letters, keychains, and timeless keepsake gifts.
              Every single piece is hand-poured with crystal-clear UV resin, preserved florals, and crafted for your milestones.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <ProductGrid />
      </section>
    </>
  )
}
