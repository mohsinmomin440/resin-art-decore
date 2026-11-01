/**
 * HeartDivider — line + heart + line, used under section headings.
 * The heart is a hand-drawn SVG so it matches the brand mark, not a unicode glyph.
 */
import { HeartMark } from './svg'

export default function HeartDivider({ width = 50, className = '' }) {
  return (
    <div
      className={`rr-heart-divider ${className}`.trim()}
      aria-hidden="true"
      style={{ '--rr-hd-w': `${width}px` }}
    >
      <span className="rr-heart-divider__line" />
      <span className="rr-heart-divider__heart">
        <HeartMark size={13} />
      </span>
      <span className="rr-heart-divider__line" />
    </div>
  )
}
