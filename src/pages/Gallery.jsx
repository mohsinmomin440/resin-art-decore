import { useMemo } from 'react'
import { usePageMeta } from '../hooks'
import SectionHeader from '../components/SectionHeader'
import GalleryMasonry from '../components/GalleryMasonry'
import VideoStrip from '../components/VideoStrip'
import HeartDivider from '../components/HeartDivider'
import { productImage } from '../utils/productImage'
import { shopProducts } from '../data/products'

export default function Gallery() {
  usePageMeta({
    title: 'Creations Gallery',
    description:
      'A look at the handmade resin pieces from Aman Resin Art And Decore — Islamic calligraphy frames, customized love letters, floral keychains and custom keepsake gifts.',
  })

  // Build a comprehensive, rich photo list of all finished pieces
  const allPhotos = useMemo(() => {
    const list = []

    // 1. All primary product photos
    shopProducts.forEach((p) => {
      list.push({
        id: productImage(p.slug, 1, 800),
        alt: p.name,
        cat: p.category,
        slug: p.slug,
      })

      // 2. Extra angles / alternate shots
      if (p.images && p.images.length > 1) {
        p.images.slice(1).forEach((_, idx) => {
          list.push({
            id: productImage(p.slug, idx + 2, 800),
            alt: `${p.name} (Detail ${idx + 2})`,
            cat: p.category,
            slug: p.slug,
          })
        })
      }
    })

    // 3. Marketing posters
    const posters = ['marketing-1', 'marketing-2', 'marketing-3'].map((f, i) => ({
      id: `/images/marketing/${f}.webp`,
      alt: `Studio Showcase ${i + 1}`,
      cat: 'Posters',
      slug: null,
    }))

    return [...list, ...posters]
  }, [])

  return (
    <div className="rr-gallery-page">
      {/* Header */}
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Our Visual Showcase</span>
            <h1>A Glimpse of Our Creations</h1>
            <HeartDivider width={48} />
            <p>
              Handcrafted resin treasures — Islamic calligraphy frames, personalized love letters,
              botanical keychains and keepsake preservation. Tap any piece to see it in detail or order.
            </p>
          </div>
        </div>
      </section>

      {/* Main Unified Gallery Section */}
      <section className="container py-4">
        <GalleryMasonry photos={allPhotos} />
      </section>

      {/* Process Videos Strip */}
      <section className="container py-4">
        <SectionHeader
          eyebrow="Behind the Scenes"
          title="Watch How Pieces Are Poured"
          description="From liquid epoxy resin and vibrant mica pigments to finished glassy heirlooms."
        />
        <VideoStrip />
      </section>
    </div>
  )
}
