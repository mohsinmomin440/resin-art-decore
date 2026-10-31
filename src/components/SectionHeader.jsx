/**
 * SectionHeader — eyebrow + h2 + gold flourish divider. Reusable across pages.
 */
import Eyebrow from './Eyebrow'
import GoldFlourishDivider from './svg/GoldFlourishDivider'

export default function SectionHeader({ eyebrow, title, text, className = '' }) {
  return (
    <div className={`rr-section-header ${className}`.trim()}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="rr-section-header__title">{title}</h2>
      <GoldFlourishDivider className="rr-section-header__divider" />
      {text && <p className="rr-section-header__text">{text}</p>}
    </div>
  )
}