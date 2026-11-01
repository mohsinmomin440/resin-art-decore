import { Instagram, ArrowRight } from './svg'
import { SOCIAL } from '../data/config'

export default function VideoStrip() {
  const igUrl = SOCIAL.instagram || 'https://www.instagram.com/m_ahesan.official'
  const igHandle = SOCIAL.instagramHandle || 'm_ahesan.official'

  return (
    <div className="rr-reels-invite">
      <div className="rr-reels-invite__icon">
        <Instagram size={28} />
      </div>
      <h3 className="rr-reels-invite__title">Watch Live Pours &amp; Reels</h3>
      <p className="rr-reels-invite__desc">
        We record the liquid epoxy swirl, gold leaf layering, and demolding process for our custom pieces.
        Follow our studio journey on Instagram to see every creation come to life.
      </p>
      <a
        href={igUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rr-btn rr-btn--primary"
      >
        <Instagram size={16} />
        <span>Watch Reels @{igHandle}</span>
        <ArrowRight size={14} />
      </a>
    </div>
  )
}