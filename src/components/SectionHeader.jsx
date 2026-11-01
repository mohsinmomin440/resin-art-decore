/**
 * SectionHeader — eyebrow + h2 + heart divider + lede text.
 * Reusable across all pages with compact, polished spacing.
 */
import Eyebrow from './Eyebrow'
import HeartDivider from './HeartDivider'

export default function SectionHeader({
  eyebrow,
  title,
  text,
  description,
  className = '',
  center = true,
}) {
  const desc = text || description
  return (
    <div className={`rr-section-header ${center ? 'text-center' : ''} ${className}`.trim()}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="rr-section-header__title">{title}</h2>
      <HeartDivider width={48} />
      {desc && <p className="rr-section-header__text">{desc}</p>}
    </div>
  )
}
