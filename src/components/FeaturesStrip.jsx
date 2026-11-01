import { Handmade, Custom, Diamond } from './svg'
import CertBadges from './CertBadges'

const FEATURES = [
  {
    Icon: Handmade,
    title: '100% Hand-Poured',
    text: 'Every piece is poured and polished by hand in small studio batches — never mass-produced.',
  },
  {
    Icon: Custom,
    title: 'Bespoke to Your Story',
    text: 'Names, dates, gold Arabic calligraphy & preserved flowers customized to your brief.',
  },
  {
    Icon: Diamond,
    title: 'Photo Preview Approval',
    text: 'We share photos of your completed resin piece for your approval before careful shatterproof shipping.',
  },
]

export default function FeaturesStrip({ className = '' }) {
  return (
    <section className={`rr-home-features ${className}`.trim()}>
      <div className="container py-4">
        <div className="rr-feature-row">
          {FEATURES.map(({ Icon, title, text }) => (
            <div className="rr-feature-cell" key={title}>
              <span className="rr-feature-icon">
                <Icon size={22} />
              </span>
              <div>
                <div className="tag-badge mb-1">{title}</div>
                <p className="rr-feature-cell__text">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <CertBadges className="mt-3" />
      </div>
    </section>
  )
}
