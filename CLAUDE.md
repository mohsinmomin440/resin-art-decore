# CLAUDE.md — Resin Art And Decore (standing rules; read every session)

Handmade resin gifts storefront. Orders happen on WhatsApp. No backend.

## Stack
Vite + React 19 + React Router + Tailwind CSS v4 (`@tailwindcss/vite`). Plain JS (JSX). `sharp` for images.
NO Firebase, NO Bootstrap, NO icon libraries, NO animation libraries, NO cart/checkout/payments, NO admin.
All SVG icons/art are drawn by you in `src/components/svg/`.

## Read first
`MASTER_PROMPT.md` (the brief) -> `DESIGN.md` (tokens, motion, responsive) -> `src/data/products.seed.json` (catalog).
`reference/cake-crumb/` is READ-ONLY inspiration for patterns. Never copy its colors, copy text, icons or business logic. Never edit it.

## Hard rules
1. **Order = WhatsApp link.** `https://wa.me/<number>?text=<encodeURIComponent(message)>`. Numbers live ONLY in `src/config.js`. Open the link synchronously inside the click handler (before any await), or mobile blocks it.
2. **Theme from `src/styles/tokens.css` only.** No hard-coded hex in components. Gold is never body text on light backgrounds.
3. **Products come from `src/data/products.js`.** Image folder name = product slug. Never hard-code image paths in components; use the `productImage()` helper.
4. **Nothing invented.** No fake reviews, ratings, customer counts, "since 20xx", awards, delivery times, or prices. Unknown facts render as `[TO CONFIRM]` in dev and are hidden or generic in production. Price `null` -> "Ask price on WhatsApp".
5. **Only advertise what can be bought.** Products without photos stay hidden from the shop until a photo exists (`photoStatus: "ready"`).
6. **No absolute guarantees, no opening hours, hedge reply times** ("usually replies within a few hours" only if the owner confirms). No (R) or trademark marks.
7. **Say it once.** A claim (handmade, custom, order on WhatsApp) appears once per page, not in three strips.
8. **Responsive is not optional.** Verify 360, 390, 768, 820, 1024, 1280, 1440 widths. No horizontal scroll. 44px tap targets.
9. **Accessibility.** Contrast >= 4.5:1 for text, visible focus ring, `alt` on every photo, `prefers-reduced-motion` respected, buttons are `<button>`, links are `<a>`.
10. **Performance.** Route-level `lazy()`, images served as webp (400/800/1600) with `srcset`, `loading="lazy"` except the hero, hero image preloaded, no layout shift. Keep the entry chunk small.
11. **Every page** calls `usePageMeta({ title, description })` (plain string literals).
12. Reply to the owner in simple Hinglish. Code, comments and commit messages in English.

## Commands
`npm run dev` · `npm run build` · `npm run preview` · `npm run images` (convert photos to webp, move originals to `media-originals/`) · `npm run lint`

## Folders
```
public/images/products/<slug>/<slug>-N.(jpeg|webp)   product photos (folder name = slug)
public/images/{brand,hero,gallery}/                   logo, hero art, gallery photos
public/videos/                                        H.264 mp4, muted, short
media-originals/                                      big masters, git-ignored, NOT deployed
src/{components,components/svg,pages,hooks,data,styles,utils}
```
