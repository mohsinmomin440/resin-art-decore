/**
 * Layout — site shell: skip link, header, main, footer, scroll progress,
 * back-to-top, WhatsApp FAB, festival banner, scroll reveal.
 */
import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import WhatsAppFab from './WhatsAppFab'
import FestivalBanner from './FestivalBanner'
import MarqueeBar from './MarqueeBar'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'
import PageFallback from './PageFallback'

const NO_FOOTER_ROUTES = ['/custom', '/saved']

const ANNOUNCEMENTS = [
  'Handmade resin keepsakes • Poured with love in Gujarat',
  'Custom names, initials & bridal flower preservation',
  'Crystal-clear UV non-yellowing resin • Shatterproof packaging',
  'Islamic calligraphy, anniversary frames & personalized gifts',
]

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const hideFooter = NO_FOOTER_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))
  // On product pages the sticky bar replaces the FAB.
  const isProduct = /^\/product\//.test(pathname)

  return (
    <div className="rr-layout">
      <a href="#main" className="rr-skip-link">Skip to main content</a>
      <ScrollProgress />
      <FestivalBanner />
      <MarqueeBar items={ANNOUNCEMENTS} />
      <Header />
      <main id="main" className="rr-main">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageFallback />}>
            <ScrollReveal enabled routeKey={pathname} />
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
      {!hideFooter && <Footer />}
      <BackToTop />
      {!isProduct && <WhatsAppFab />}
    </div>
  )
}