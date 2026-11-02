# DESIGN.md — Resin Art And Decore

Mood: warm, giftable, handmade luxury. Deep red + blush + gold on warm marble white.
It must NOT look like Cake & Crumb (rose-pink / cream / cocoa). Different palette, fonts,
layout, icons and wording. Reference is for patterns only.

## 1. Color tokens (put in `src/styles/tokens.css` as CSS variables, expose to Tailwind via `@theme`)

| Token | Hex | Use |
| --- | --- | --- |
| --rr-maroon-900 | #3F0714 | footer base, deepest surfaces |
| --rr-maroon-800 | #5A0B1E | dark panels, hover of primary |
| --rr-maroon-700 | #6E0F25 | PRIMARY brand, headings, header text, dark bands |
| --rr-crimson-600 | #B3213B | accent text on light bg (4.5:1+), links, italic emphasis |
| --rr-red-500 | #C23A4A | fills, tiles, badges (not small text) |
| --rr-rose-300 | #E58AA0 | soft fills, illustrations |
| --rr-blush-100 | #FDE9E9 | alternate section background, chips |
| --rr-blush-50 | #FFF4F2 | cards on blush, hover tint |
| --rr-marble | #FFF8F6 | default page background |
| --rr-white | #FFFFFF | cards, header |
| --rr-gold-500 | #E0B04A | highlights, borders, dividers, buttons on dark |
| --rr-gold-600 | #C9962B | gold hover |
| --rr-gold-700 | #7A5A12 | gold used as TEXT on light bg |
| --rr-ink | #2B0A12 | body text |
| --rr-muted | #6B4A50 | secondary text (>= 6:1 on marble) |
| --rr-line | #F2D4D8 | borders, dividers |
| --rr-order-bg | gold gradient (#F3D17A → #E0B04A → #C9962B) | WhatsApp / order buttons ONLY, with --rr-order-ink (#3F0714) text |

Rules
- Gold is never body text on light backgrounds (use gold-700). Gold on maroon is fine.
- Red fills carry large/bold text only. Small red text uses crimson-600 or maroon-700.
- Gold order buttons appear only on order/contact actions so people learn "gold = order". No green anywhere.
- No purple/blue gradient washes. Flat color, soft shadows, one subtle marble/noise texture (SVG).
- Section rhythm alternates: marble -> white -> blush -> marble -> maroon band -> blush -> footer maroon-900.
- Product photo backdrops are NEVER recolored; the UI frames photos, it does not tint them.

## 2. Typography
- Display / headings: **Cormorant Garamond** 600/700 (italic for emphasis words, color crimson-600).
- Body / UI: **DM Sans** 400/500/700.
- Arabic calligraphy accents: **Amiri** (or Noto Naskh Arabic), `dir="rtl" lang="ar"` on the element.
- Load via one Google Fonts `<link>` with `display=swap`, subset to what is used; fallbacks Georgia / system-ui.
- Scale (fluid, `clamp`): h1 40->68px, h2 30->46, h3 22->28, body 16-17, small 13-14. Line height 1.05-1.15 for display, 1.55-1.65 body.
- Eyebrow label: 13px, 700, uppercase, letter-spacing .14em, color gold-700.
- Never below 14px for anything a customer must read (13px only for eyebrows/badges).

## 3. Space, shape, depth
- 8pt grid. Section padding: mobile 48px, tablet 64px, laptop+ 88px. Container max 1240px, side padding 20 / 40 / 64.
- Radius: chips 999px, buttons 999px, cards 22px, media 16px, big panels 32px.
- Shadows: `--rr-shadow-sm: 0 2px 14px rgba(110,15,37,.10)`, `--rr-shadow-md: 0 16px 40px rgba(110,15,37,.14)`, `--rr-shadow-lg: 0 24px 50px rgba(110,15,37,.28)`.
- Minimum tap target 44x44px. Focus ring: 3px solid gold-500, offset 2px, on every interactive element.

## 4. Motion (CSS + IntersectionObserver; no animation library)
Easing `cubic-bezier(.22,.8,.24,1)`; durations 250ms (hover), 600-900ms (reveal), 4-6s (ambient loops).
All motion wrapped so `prefers-reduced-motion: reduce` turns loops off and reveals into plain fades/instant.

| Name | Where | Behavior |
| --- | --- | --- |
| Reveal | every section | fade-up 24px once per element, staggered 80ms in grids; hero is excluded (LCP) |
| Marquee | announcement bar | continuous slow left scroll, pauses on hover/focus |
| Resin pour | hero | SVG blobs morph slowly (SMIL or CSS path/transform), looks like liquid resin settling |
| Gold shimmer | calligraphy text, section dividers | a highlight sweeps across every ~6s |
| Float | hero cards, badges | translateY +-12px, 5s ease-in-out, staggered delays |
| Card lift | product / category cards | translateY(-8px) + shadow-md, 350ms; image zooms 1.05 inside overflow hidden |
| Image flip | product card | on hover/focus show 2nd photo (crossfade) when one exists |
| Heart pop | save/wishlist | scale .8 -> 1.25 -> 1 with fill transition |
| Draw-on | "How it's made" icons | SVG stroke-dashoffset draws when scrolled into view |
| Counter-free | -- | do NOT animate invented numbers/stats |
| FAB pulse | floating WhatsApp | ring pulse every 4s, stops after the user taps it |
| Page transition | route change | 200ms fade; scroll to top |
| Scroll progress | top of page | 3px gold bar under header |
| Button | all | lift 2px + soft shadow; press = scale .98 |

## 5. Layout & responsive (mobile-first)
Test widths: 360, 390, 768, 820, 1024, 1280, 1440. No horizontal scroll at any width.
- Product grid: 2 cols (<640), 3 cols (640-1023), 4 cols (>=1024). Category tiles: 2 / 3 / 6.
- Header: logo + menu button on mobile (full-screen menu sheet); inline nav + search + Order on >=1024.
- Mobile: sticky bottom "Order on WhatsApp" bar on product pages; floating FAB elsewhere (never both on screen at once).
- Tablet (iPad): 2-column hero, 3-col grids, side-by-side product page; hover effects also work on focus/tap.
- Use `100svh`/`dvh`, `env(safe-area-inset-*)`, `aspect-ratio`; every image has width/height or aspect-ratio (no layout shift).
- Tables never overflow: wrap in `overflow-x:auto`.

## 6. Components (build all as own React components; names are guidance)
AnnouncementBar - Header(+MobileMenu, SearchOverlay) - Hero (resin-pour art, headline, 2 CTAs, floating mini product cards) -
TrustCard (4 items, overlaps hero) - CategoryTiles - OccasionRail (Eid, Valentine's, Birthday, Wedding, Anniversary, Housewarming) -
ProductCard - ProductGrid(+filter chips, sort, search) - QuickView modal - ProductPage(gallery, details, Personalize form) -
PersonalizeBuilder (/custom) - SavedList (/saved) - ProcessTimeline (Design, Pour, Cure, Finish) - BeforeAfter (optional) -
GalleryMasonry(+Lightbox, VideoStrip) - FAQAccordion - ReviewCards (only real) - ContactCards - FestivalBanner - WhatsAppFab(+NumberChooser) -
BackToTop - ScrollProgress - Footer - Skeletons - ErrorBoundary - NotFound.

## 7. SVG & icons (Claude Code draws ALL of them; no icon library)
- One file per concept in `src/components/svg/`, each a React component, 24x24 viewBox, `stroke="currentColor"`, 1.75 stroke, round caps/joins, accept `size` and `className`, decorative ones `aria-hidden`, meaningful ones get `role="img"` + `<title>`.
- Needed: LogoMark (resin drop + heart), Heart, HeartFilled, WhatsApp, Search, Menu, Close, ArrowRight, ChevronDown, Sparkle, Gift, Diamond, Check, Phone, Instagram, Facebook, Share, Filter, Grid, Flower, Butterfly, Leaf, Feather, Key, Letters(A), Earring, PhoneCase, Crescent+Star, Lantern, Droplet, Brush, Sun, Clock(no hours text), Package, Mail.
- Decorative art: ResinPourBlobs (hero), GoldFlourishDivider, MarbleTexture (feTurbulence, very low opacity), CalligraphyFrame corners, process icons (Design/Pour/Cure/Finish), ornamental heart divider, floating resin shapes.
- Brand logo: wordmark "Resin Art And Decore" in Cormorant + LogoMark. Provide `public/images/brand/logo.svg`, `favicon.svg` (+ png 32/180/512) and `og-card` (1200x630) generated from SVG.
