import { Fragment } from 'react'
import { Sparkle, Diamond, Flower, Package, Check } from './svg'

const BADGES = [
  {
    id: 'uv-resin',
    Icon: Diamond,
    label: 'UV-Resistant',
    sub: 'Crystal-Clear Resin',
  },
  {
    id: 'gloss',
    Icon: Sparkle,
    label: 'Glass Finish',
    sub: 'High-Gloss Finish',
  },
  {
    id: 'flowers',
    Icon: Flower,
    label: 'Real Botanicals',
    sub: 'Natural Petals Preserved',
  },
  {
    id: 'shipping',
    Icon: Package,
    label: 'Safe Shipping',
    sub: 'Carefully Packed, All-India',
  },
  {
    id: 'preview',
    Icon: Check,
    label: 'Preview First',
    sub: 'WhatsApp Photo Check',
  },
]

/**
 * CertBadges — Craft & Quality Assurance Badges for Resin Art
 *
 *   variant="pills" (default) — bordered luxury pills with icon, label and subtext.
 *                               Used on Home and About pages.
 *   variant="line"            — compact dot-separated line for product page & footer.
 */
export default function CertBadges({ variant = 'pills', className = '' }) {
  if (variant === 'line') {
    return (
      <div className={`rr-cert-line ${className}`.trim()}>
        <Diamond size={14} className="rr-cert-line__lead-icon" aria-hidden />
        {BADGES.slice(0, 4).map(({ id, label, sub }, i) => (
          <Fragment key={id}>
            {i > 0 && <span className="rr-cert-line__sep" aria-hidden>·</span>}
            <span className="rr-cert-line__item">
              <strong>{label}</strong> {sub}
            </span>
          </Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={`rr-cert-pills ${className}`.trim()}>
      {BADGES.map(({ id, Icon, label, sub }) => (
        <div className="rr-cert-pill" key={id}>
          <span className="rr-cert-pill__icon">
            <Icon size={15} />
          </span>
          <span className="rr-cert-pill__body">
            <span className="rr-cert-pill__label">{label}</span>
            <span className="rr-cert-pill__num">{sub}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
