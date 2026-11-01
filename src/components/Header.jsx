import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Close, Heart } from './svg'
import Logo from './Logo'
import { useIsMobile } from '../hooks/useIsMobile'
import { useLocalStorage } from '../hooks/useLocalStorage'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [saved] = useLocalStorage('rr_saved', [])
  const isMobile = useIsMobile()
  const location = useLocation()

  useEffect(() => { queueMicrotask(() => setOpen(false)) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll lock for the mobile menu — event-based, so we never mutate
  // html/body overflow (which snaps scroll position on iOS).
  const panelRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const isOutside = (target) => !panelRef.current?.contains(target)
    const block = (e) => { if (isOutside(e.target)) e.preventDefault() }
    document.addEventListener('touchmove', block, { passive: false })
    document.addEventListener('wheel', block, { passive: false })
    return () => {
      document.removeEventListener('touchmove', block)
      document.removeEventListener('wheel', block)
    }
  }, [open])

  // Focus trap for the mobile menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        last.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`rr-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="rr-header__bar">
        <Logo size="header" />

        <nav className="rr-header__nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `rr-nav-link${isActive ? ' is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="rr-header__actions">
          <Link
            to="/saved"
            className="rr-header__saved-btn"
            aria-label={`Saved pieces (${saved.length})`}
            title="View saved wishlist"
          >
            <Heart size={18} />
            {saved.length > 0 && (
              <span className="rr-header__saved-badge">{saved.length}</span>
            )}
          </Link>

          <Link to="/custom" className="rr-btn rr-btn--primary rr-header__custom-cta">
            Custom Order
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rr-hamburger"
          >
            <span className="rr-hamburger__lines" aria-hidden>
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {isMobile && (
        <div
          className={`rr-mobile-menu${open ? ' is-open' : ''}`}
          onClick={() => setOpen(false)}
        >
          <div ref={panelRef} className="rr-mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rr-mobile-menu__close"
            >
              <Close size={18} />
            </button>

            <nav className="rr-mobile-menu__nav" aria-label="Mobile navigation">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `rr-mobile-menu__link${isActive ? ' is-active' : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/saved"
                onClick={() => setOpen(false)}
                className={({ isActive }) => `rr-mobile-menu__link${isActive ? ' is-active' : ''}`}
              >
                Saved Wishlist {saved.length > 0 ? `(${saved.length})` : ''}
              </NavLink>
            </nav>

            <div className="rr-mobile-menu__footer">
              <Link
                to="/custom"
                onClick={() => setOpen(false)}
                className="rr-btn rr-btn--primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Start a Custom Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
