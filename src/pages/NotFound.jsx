import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Sparkle } from '../components/svg'

export default function NotFound() {
  usePageMeta({ title: 'Page not found', description: 'That page does not exist. Visit the Resin Art And Decore shop.' })
  return (
    <section className="rr-page-center">
      <Sparkle size={56} className="rr-page-center__icon" />
      <h1>Page not found</h1>
      <p>That page does not exist. Let us help you find what you were looking for.</p>
      <div className="rr-page-center__actions">
        <Link to="/shop" className="rr-btn">Browse the shop</Link>
        <Link to="/" className="rr-btn rr-btn--ghost">Back home</Link>
      </div>
    </section>
  )
}