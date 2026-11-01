import { Link } from 'react-router-dom'
import { Sparkle, Flower, Gift, Heart, ArrowRight } from './svg'
import HeartDivider from './HeartDivider'
import { productImage, productSrcSet } from '../utils/productImage'

export default function KeepsakeSpotlight() {
  return (
    <section className="rr-home-gift">
      <div className="container py-5">
        <div className="rr-home-gift__grid">
          {/* Media image */}
          <div className="rr-home-gift__media">
            <img
              src={productImage('bismillah-heart-frame', 1, 800)}
              srcSet={productSrcSet('bismillah-heart-frame', 1)}
              sizes="(min-width: 992px) 440px, 92vw"
              alt="Handcrafted Bismillah Heart Frame"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="rr-home-gift__text">
            <span className="eyebrow">Signature Keepsake</span>
            <h2 className="section-title">The Bismillah & Floral Keepsake Frame</h2>
            <HeartDivider width={48} />
            <p className="rr-home-gift__lede">
              Sacred Arabic calligraphy suspended with shimmering gold leaf and delicate preserved rose petals
              in crystal-clear epoxy resin. An everlasting heirloom piece for new homes, weddings, and special milestones.
            </p>

            <div className="rr-infochips">
              <span className="rr-infochip">
                <Sparkle size={13} /> Handcrafted to order
              </span>
              <span className="rr-infochip">
                <Flower size={13} /> Real preserved petals
              </span>
              <span className="rr-infochip">
                <Gift size={13} /> Free wooden easel stand
              </span>
              <span className="rr-infochip">
                <Heart size={13} /> Custom names & dates
              </span>
            </div>

            {/* Buying box */}
            <div className="rr-home-gift__buy">
              <div className="rr-home-gift__price">
                Signature Keepsake Heirloom
              </div>
              <p className="rr-home-gift__adv">
                <strong>Handcrafted to order</strong>
                <span className="rr-home-gift__sep"> · </span>
                <span className="rr-home-gift__bal">photo preview approved before courier dispatch</span>
              </p>
              <div className="rr-home-gift__ctas">
                <Link
                  to="/product/bismillah-heart-frame"
                  className="rr-btn rr-btn--primary rr-home-gift__btn"
                >
                  <span>View Keepsake Details</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/custom"
                  className="rr-btn rr-btn--ghost rr-btn--sm"
                >
                  Personalize Your Own
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
