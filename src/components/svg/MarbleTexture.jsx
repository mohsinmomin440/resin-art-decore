/**
 * MarbleTexture — very low-opacity noise filter for section backgrounds.
 * Rendered as a fixed-position div behind everything. Pure decoration.
 */
export default function MarbleTexture() {
  return (
    <div className="rr-marble-texture" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="rr-marble">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feBlend mode="soft-light" in="gray" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#rr-marble)" opacity="0.04" />
      </svg>
    </div>
  )
}