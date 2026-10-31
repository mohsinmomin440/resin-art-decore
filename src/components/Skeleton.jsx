/**
 * Skeleton — shimmering placeholder block.
 *   <Skeleton width="80%" height={20} />
 *   <Skeleton circle size={40} />
 *   <Skeleton width="100%" aspectRatio="1/1" radius={12} />
 */
export default function Skeleton({
  width,
  height,
  size,           // shorthand for circle: width = height = size
  circle = false,
  radius,
  aspectRatio,
  className = '',
  style = {},
}) {
  const finalWidth = size ?? width ?? '100%'
  const finalHeight = size ?? height
  const borderRadius = circle ? '50%' : (radius ?? 14)

  return (
    <span
      aria-hidden
      className={`skeleton ${className}`}
      style={{
        display: 'block',
        width: finalWidth,
        height: finalHeight,
        aspectRatio,
        borderRadius,
        background: 'linear-gradient(90deg, var(--rr-blush-100) 0%, var(--rr-line) 50%, var(--rr-blush-100) 100%)',
        backgroundSize: '200% 100%',
        ...style,
      }}
    />
  )
}