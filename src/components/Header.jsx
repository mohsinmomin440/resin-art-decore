import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Close, Search, WhatsApp } from './svg'
import Logo from './Logo'
import SearchOverlay from './SearchOverlay'
import { useIsMobile } from '../hooks/useIsMobile'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'
import { orderLink } from '../utils/whatsapp'

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
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
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => panelRef.current?.querySelector('.rr-mobile-menu__close')?.focus(), 100)
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [open])

  const waHref = orderLink({ contact })

  return (
    <header className={`rr-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="rr-header__bar">
        <Logo size="md" />

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
          <button
            type="button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
            className="rr-icon-btn"
          >
            <Search size={20} />
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rr-btn rr-btn--wa"
          >
            <WhatsApp size={16} /> Order on WhatsApp
          </a>

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
            </nav>

            <div className="rr-mobile-menu__footer">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="rr-mobile-menu__wa">
                <WhatsApp size={15} /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}