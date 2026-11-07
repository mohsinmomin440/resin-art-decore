import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * MarqueeBar — slow left-scrolling announcement strip. The items are rendered
 * twice (the second copy is aria-hidden) so translateX(-50%) loops seamlessly
 * without touching React-managed DOM. Pauses on hover/focus; under
 * prefers-reduced-motion it becomes a static strip showing each item once.
 */
export default function MarqueeBar({ items }) {
  const reduce = useReducedMotion()
  const copies = reduce ? [false] : [false, true]

  return (
    <div className="rr-announce" role="region" aria-label="Announcements">
      <div className={`rr-announce__track${reduce ? ' rr-announce__track--static' : ''}`}>
        {copies.map((hidden) =>
          items.map((item, i) => (
            <span key={`${hidden ? 'b' : 'a'}${i}`} className="rr-announce__item" aria-hidden={hidden || undefined}>
              {item}
            </span>
          )),
        )}
      </div>
    </div>
  )
}
