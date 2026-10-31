/**
 * festivals.js — date-windowed banners.
 * A festival banner shows only inside its window. Dates are approximate and
 * MUST be confirmed by the owner before they go live; the banner is harmless
 * outside its window (it renders nothing).
 *
 * `?festival=preview` on the dev server shows a named banner on any date.
 */

// Approximate 2026 windows — confirm with the owner before relying on them.
export const FESTIVALS = [
  {
    id: 'ramadan',
    name: 'Ramadan',
    icon: '🌙',
    message: 'Ramadan Mubarak — spiritual resin pieces for the holy month.',
    cta: 'Shop Islamic Décor',
    to: '/shop?category=Islamic%20Décor',
    start: new Date(2026, 1, 17),   // Feb 17 — approximate
    end: new Date(2026, 2, 20),     // Mar 20 — approximate
    bg: 'var(--rr-maroon-700)',
    fg: 'var(--rr-gold-500)',
    accent: 'var(--rr-gold-500)',
  },
  {
    id: 'eid',
    name: 'Eid',
    icon: '🌙',
    message: 'Eid Mubarak — gifts that travel well and last forever.',
    cta: 'Shop Eid Gifts',
    to: '/shop?category=Islamic%20Décor',
    start: new Date(2026, 3, 20),   // Apr 20 — approximate
    end: new Date(2026, 4, 4),      // May 4 — approximate
    bg: 'var(--rr-maroon-700)',
    fg: 'var(--rr-gold-500)',
    accent: 'var(--rr-gold-500)',
  },
  {
    id: 'valentine',
    name: "Valentine's Day",
    icon: '❤️',
    message: 'Say it in resin — hearts, letters and photo pieces made to order.',
    cta: 'Shop Love & Gifts',
    to: '/shop?category=Love%20%26%20Gifts',
    start: new Date(2026, 1, 1),
    end: new Date(2026, 1, 15),
    bg: 'var(--rr-crimson-600)',
    fg: '#fff',
    accent: 'var(--rr-gold-500)',
  },
  {
    id: 'rakhi',
    name: 'Rakhi',
    icon: '🧵',
    message: 'Raksha Bandhan — a handmade token for your brother.',
    cta: 'Shop Rakhi Gifts',
    to: '/shop?category=Keychains',
    start: new Date(2026, 7, 8),    // Aug 8 — approximate
    end: new Date(2026, 7, 22),
    bg: 'var(--rr-maroon-700)',
    fg: 'var(--rr-gold-500)',
    accent: 'var(--rr-gold-500)',
  },
  {
    id: 'mothers-day',
    name: "Mother's Day",
    icon: '💐',
    message: 'For the person who kept you in resin and in heart.',
    cta: 'Shop Mother\'s Day',
    to: '/shop?category=Love%20%26%20Gifts',
    start: new Date(2026, 4, 9),    // May 9 — approximate
    end: new Date(2026, 4, 12),
    bg: 'var(--rr-crimson-600)',
    fg: '#fff',
    accent: 'var(--rr-gold-500)',
  },
  {
    id: 'new-year',
    name: 'New Year',
    icon: '🎉',
    message: 'A handmade start to the new year.',
    cta: 'Shop New Year',
    to: '/shop',
    start: new Date(2025, 11, 28),
    end: new Date(2026, 0, 5),
    bg: 'var(--rr-maroon-700)',
    fg: 'var(--rr-gold-500)',
    accent: 'var(--rr-gold-500)',
  },
]

/** Now, honouring ?testdate=YYYY-MM-DD and ?festival=preview on the dev server. */
export function offerNow() {
  if (typeof window === 'undefined') return new Date()
  const params = new URLSearchParams(window.location.search)
  const test = params.get('testdate')
  if (test) {
    const d = new Date(test)
    if (!isNaN(d.getTime())) return d
  }
  return new Date()
}

export function isPreview() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('festival') === 'preview'
}

export function getActiveFestival(now = offerNow()) {
  return FESTIVALS.find((f) => now >= f.start && now <= f.end) || null
}

export function getFestival(id) {
  return FESTIVALS.find((f) => f.id === id) || null
}

export function allFestivals() {
  return FESTIVALS
}