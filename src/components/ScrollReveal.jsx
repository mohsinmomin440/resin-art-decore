import { useLayoutEffect } from 'react'

/**
 * ScrollReveal — text and images fade/slide in as they enter the screen.
 *
 * Site-wide and automatic: it tags the blocks inside <main> that match
 * REVEAL_SELECTOR and animates each one the first time it scrolls into view.
 * Whatever is on screen when a page opens animates straight away, staggered.
 *
 * - An element can choose its own motion with data-reveal="up|down|left|right|zoom".
 * - data-no-reveal on an ancestor opts a whole block out (hero = LCP).
 * - Only the OUTERMOST match animates — a card's own heading doesn't animate twice.
 * - Once finished, every trace is removed so hover transitions come back intact.
 * - Under prefers-reduced-motion or JS off, nothing is ever hidden.
 * - useLayoutEffect + MutationObserver tag new content before it paints, so a
 *   lazy route or a "Show more" batch never flashes visible-then-hidden.
 */

const REVEAL_SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'h5',
  '.eyebrow', 'p', 'img', 'blockquote',
  '.rr-btn', '.rr-btn-ghost',
  '.product-card', '.category-tile', '.feature-cell', '.card',
  '[class*="__step"]', '[class*="-card"]', 'li',
].join(',')

const SKIP_INSIDE = 'nav, [role="dialog"], .modal, [aria-busy="true"], [data-no-reveal], .skeleton'

// Form fields never fade — a block holding one is skipped, its text tagged alone.
const CONTROLS = 'input, select, textarea'

const DURATION = 600
const STAGGER = 80
const MAX_DELAY = 400

function directionFor(el) {
  const col = el.closest('[class*="col-lg-6"], [class*="col-md-6"]')
  const row = col?.parentElement
  if (row?.classList.contains('row') && row.children.length === 2) {
    return row.children[0] === col ? 'left' : 'right'
  }
  return el.tagName === 'IMG' ? 'zoom' : 'up'
}

function finish(el) {
  el.removeAttribute('data-reveal')
  el.classList.remove('is-revealed')
  el.style.removeProperty('--rr-reveal-delay')
}

export default function ScrollReveal({ enabled = true, routeKey }) {
  useLayoutEffect(() => {
    const root = document.getElementById('main')
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!enabled || !root || reduce || !('IntersectionObserver' in window)) return undefined

    const html = document.documentElement
    html.classList.add('rr-reveal')
    const timers = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        let i = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target
          io.unobserve(el)
          const delay = Math.min(i++ * STAGGER, MAX_DELAY)
          el.style.setProperty('--rr-reveal-delay', `${delay}ms`)
          el.classList.add('is-revealed')
          const t = setTimeout(() => { timers.delete(t); finish(el) }, DURATION + delay + 80)
          timers.add(t)
        }
      },
      // A small POSITIVE bottom margin: at -8% plus the 24px hidden shift, a
      // heading at the foot of the first screen stayed invisible until scrolled.
      { rootMargin: '0px 0px 60px 0px', threshold: 0 },
    )

    const tag = () => {
      for (const el of root.querySelectorAll(REVEAL_SELECTOR)) {
        if (el.dataset.revealDone || el.closest(SKIP_INSIDE)) continue
        el.dataset.revealDone = '1'
        if (el.querySelector(CONTROLS)) continue
        if (el.parentElement?.closest('[data-reveal]')) continue
        if (!el.dataset.reveal) el.dataset.reveal = directionFor(el)
        io.observe(el)
      }
    }

    tag()
    const mo = new MutationObserver(tag)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      timers.forEach(clearTimeout)
      html.classList.remove('rr-reveal')
      root.querySelectorAll('[data-reveal]').forEach(finish)
      root.querySelectorAll('[data-reveal-done]').forEach((el) => el.removeAttribute('data-reveal-done'))
    }
  }, [enabled, routeKey])

  return null
}