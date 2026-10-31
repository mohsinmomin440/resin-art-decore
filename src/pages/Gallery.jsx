import { usePageMeta } from '../hooks'
import SectionHeader from '../components/SectionHeader'
import GalleryMasonry from '../components/GalleryMasonry'
import VideoStrip from '../components/VideoStrip'
import { productImage } from '../utils/productImage'
import { shopProducts } from '../data/products'

export default function Gallery() {
  usePageMeta({ title: 'Gallery', description: 'A look at the handmade resin pieces from Resin Art And Decore — frames, letters, keychains and custom work.' })

  // Product photos lead the gallery; marketing posters follow.
  const productPhotos = shopProducts.map((p) => ({
    id: productImage(p.slug, 1, 800),
    alt: p.name,
    cat: p.category,
    slug: p.slug,
  }))

  const posterPhotos = ['marketing-1', 'marketing-2', 'marketing-3'].map((f) => ({
    id: `/images/marketing/${f}.webp`,
    alt: 'Our poster',
    cat: 'Posters',
    slug: null,
  }))

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner">
            <div>
              <span className="eyebrow">Our Gallery</span>
              <h1>A look at our work</h1>
              <p>Handmade resin pieces — frames, letters, keychains, phone cases and custom work. Tap any photo to see it larger.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <SectionHeader eyebrow="From our workshop" title="Our pieces" />
        <GalleryMasonry photos={productPhotos} />
      </section>

      <section className="container py-6">
        <SectionHeader eyebrow="Watch it being made" title="Process videos" />
        <VideoStrip />
      </section>

      <section className="container py-6">
        <SectionHeader eyebrow="Our posters" title="Promotional art" />
        <GalleryMasonry photos={posterPhotos} />
      </section>
    </>
  )
}