/**
 * festivals.js — date-windowed banners.
 *
 * Each festival lists its window per year. Fixed-date festivals work for every
 * year automatically; moveable ones (Islamic / lunar calendar) are looked up
 * in MOVEABLE below. Dates marked "approx" MUST be confirmed with the owner
 * and a new year's row added every January — a festival with no row for the
 * current year simply shows no banner (never a wrong one).
 *
 * `?festival=preview` and `?testdate=YYYY-MM-DD` work on the dev server only.
 */

const start = (y, m, d) => new Date(y, m - 1, d)
const end = (y, m, d) => new Date(y, m - 1, d, 23, 59, 59)
const win = (y, m1, d1, m2, d2) => [start(y, m1, d1), end(y, m2, d2)]

// year → [m1, d1, m2, d2]   (approx — confirm each year)
const MOVEABLE = {
  ramadan: { 2026: [2, 17, 3, 19], 2027: [2, 7, 3, 9] },
  eid: { 2026: [3, 19, 3, 25], 2027: [3, 9, 3, 15] }, // Eid al-Fitr
  'eid-adha': { 2026: [5, 24, 5, 30], 2027: [5, 14, 5, 20] },
  rakhi: { 2026: [8, 18, 8, 28], 2027: [8, 7, 8, 17] },
  diwali: { 2026: [10, 25, 11, 9], 2027: [10, 15, 10, 29] },
}

const moveable = (id) => (y) => (MOVEABLE[id]?.[y] ? [win(y, ...MOVEABLE[id][y])] : [])

/** Second Sunday of May → Wed..Sun window. */
function mothersDay(y) {
  const may1 = new Date(y, 4, 1).getDay()
  const secondSunday = 1 + ((7 - may1) % 7) + 7
  return [[start(y, 5, secondSunday - 4), end(y, 5, secondSunday)]]
}

const MAROON = { bg: 'var(--rr-maroon-700)', fg: 'var(--rr-gold-500)', accent: 'var(--rr-gold-500)' }
const CRIMSON = { bg: 'var(--rr-crimson-600)', fg: '#fff', accent: 'var(--rr-gold-500)' }

export const FESTIVALS = [
  {
    id: 'ramadan',
    name: 'Ramadan',
    icon: 'CrescentStar',
    message: 'Ramadan Mubarak — spiritual resin pieces for the holy month.',
    cta: 'Shop Islamic Décor',
    to: '/shop?category=Islamic%20Décor',
    windows: moveable('ramadan'),
    ...MAROON,
  },
  {
    id: 'eid',
    name: 'Eid',
    icon: 'Lantern',
    message: 'Eid Mubarak — handmade gifts that last.',
    cta: 'Shop Eid Gifts',
    to: '/shop?category=Islamic%20Décor',
    windows: (y) => [...moveable('eid')(y), ...moveable('eid-adha')(y)],
    ...MAROON,
  },
  {
    id: 'valentine',
    name: "Valentine's Day",
    icon: 'Heart',
    message: 'Say it in resin — hearts, letters and photo pieces made to order.',
    cta: 'Shop Love & Gifts',
    to: '/shop?category=Love%20%26%20Gifts',
    windows: (y) => [win(y, 2, 1, 2, 14)],
    ...CRIMSON,
  },
  {
    id: 'diwali',
    name: 'Diwali',
    icon: 'Diya',
    message: 'Diwali gifts — hand-poured trays, keepsakes & custom pieces.',
    cta: 'Shop Festive Décor',
    to: '/shop?category=Décor%20%26%20Accessories',
    windows: moveable('diwali'),
    ...MAROON,
  },
  {
    id: 'rakhi',
    name: 'Rakhi',
    icon: 'Rakhi',
    message: 'Raksha Bandhan — a handmade token for your brother.',
    cta: 'Shop Rakhi Gifts',
    to: '/shop?category=Keychains',
    windows: moveable('rakhi'),
    ...MAROON,
  },
  {
    id: 'mothers-day',
    name: "Mother's Day",
    icon: 'Bouquet',
    message: 'A handmade keepsake for the person who means the world.',
    cta: "Shop Mother's Day",
    to: '/shop?category=Love%20%26%20Gifts',
    windows: mothersDay,
    ...CRIMSON,
  },
  {
    id: 'new-year',
    name: 'New Year',
    icon: 'PartyPopper',
    message: 'A handmade start to the new year.',
    cta: 'Shop New Year',
    to: '/shop',
    windows: (y) => [[start(y, 12, 28), end(y + 1, 1, 5)]],
    ...MAROON,
  },
]

/** Now, honouring ?testdate=YYYY-MM-DD on the dev server only. */
export function offerNow() {
  if (typeof window === 'undefined') return new Date()
  if (import.meta.env.DEV) {
    const test = new URLSearchParams(window.location.search).get('testdate')
    if (test) {
      const d = new Date(test)
      if (!isNaN(d.getTime())) return d
    }
  }
  return new Date()
}

export function isPreview() {
  if (typeof window === 'undefined' || !import.meta.env.DEV) return false
  return new URLSearchParams(window.location.search).get('festival') === 'preview'
}

export function getActiveFestival(now = offerNow()) {
  const year = now.getFullYear()
  return (
    FESTIVALS.find((f) =>
      [...f.windows(year - 1), ...f.windows(year)].some(([from, to]) => now >= from && now <= to),
    ) || null
  )
}

export function getFestival(id) {
  return FESTIVALS.find((f) => f.id === id) || null
}

export function allFestivals() {
  return FESTIVALS
}
