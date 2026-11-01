import { Link } from 'react-router-dom'
import { Search, Custom, Sparkle, Clock, Check, Package, ArrowRight } from './svg'
import HeartDivider from './HeartDivider'

const STEPS = [
  {
    step: '01',
    Icon: Search,
    title: 'Choose your style',
    text: 'Browse our collection of calligraphy frames, clocks, letters or keychains — or send your own custom concept.',
  },
  {
    Icon: Custom,
    step: '02',
    title: 'Personalize your details',
    text: 'Share your names, special dates, floral requests or color theme. We confirm every detail with you directly.',
  },
  {
    Icon: Sparkle,
    step: '03',
    title: 'Hand-poured for you',
    text: 'Every piece is hand-poured, cured 48 hours for glass-like clarity, and shared via photo before safe shipping.',
  },
]

export default function HowItWorks() {
  return (
    <section className="rr-home-how">
      <div className="container py-5">
        <div className="text-center mb-3">
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title mt-1">Ordering Is Simple & Personal</h2>
          <HeartDivider width={48} />
        </div>

        <div className="rr-home-how__steps">
          {STEPS.map(({ step, Icon, title, text }) => (
            <div key={step} className="rr-home-how__step">
              <span className="rr-home-how__num">{step}</span>
              <span className="rr-home-how__icon">
                <Icon size={22} />
              </span>
              <h3 className="rr-home-how__step-title">{title}</h3>
              <p className="rr-home-how__step-text">{text}</p>
            </div>
          ))}
        </div>

        <ul className="rr-home-how__facts">
          <li>
            <Clock size={15} aria-hidden />
            <span>Standard pieces cure in 3–5 days · Varmala preservation takes 7–10 days</span>
          </li>
          <li>
            <Check size={15} aria-hidden />
            <span>Book with 50% advance via UPI · Balance on photo preview</span>
          </li>
          <li>
            <Package size={15} aria-hidden />
            <span>Multi-layer bubble wrap & shatterproof delivery across India</span>
          </li>
        </ul>

        <div className="rr-home-how__cta">
          <Link to="/custom" className="rr-btn rr-btn--gold">
            <Sparkle size={15} /> Start a custom order
          </Link>
          <Link to="/shop" className="rr-home-how__link">
            <span>Browse full catalogue</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
