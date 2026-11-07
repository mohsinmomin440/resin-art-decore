import { Link } from 'react-router-dom'
import { Instagram, ArrowRight } from './svg'
import HeartDivider from './HeartDivider'
import { productImage, productSrcSet } from '../utils/productImage'
import { SOCIAL } from '../data/config'

const SHOWCASE_SLUGS = [
  'bismillah-heart-frame',
  'subhanallah-plate',
  'love-letters',
  'personalized-photo-heart',
  'four-qul-set',
  'butterfly-heart-tray',
]

export default function InstagramFeed() {
  const igHandle = SOCIAL.instagramHandle || 'm_ahesan.official'
  const igUrl = SOCIAL.instagram || 'https://www.instagram.com/m_ahesan.official'

  return (
    <section className="rr-home-instagram">
      <div className="container py-5">
        <div className="text-center mb-3">
          <span className="eyebrow">
            <Instagram size={14} /> Follow along
          </span>
          <h2 className="section-title mt-1">From Our Workshop</h2>
          <HeartDivider width={48} />
          <p className="rr-home-instagram__sub">
            Follow us on Instagram for new pieces and behind-the-scenes from the studio
          </p>
        </div>

        <div className="rr-instagram-grid">
          {SHOWCASE_SLUGS.map((slug) => (
            <Link
              key={slug}
              to={`/product/${slug}`}
              className="rr-instagram-tile"
              aria-label={`View ${slug.replace(/-/g, ' ')}`}
              title={slug.replace(/-/g, ' ')}
            >
              <img
                src={productImage(slug, 1, 400)}
                srcSet={productSrcSet(slug, 1)}
                sizes="(min-width: 768px) 150px, 30vw"
                alt=""
                width="400"
                height="400"
                loading="lazy"
              />
              <span className="rr-instagram-tile__overlay">
                <Instagram size={22} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-3">
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rr-btn rr-btn--ghost rr-btn--sm"
          >
            <Instagram size={15} />
            <span>Follow @{igHandle} on Instagram</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
