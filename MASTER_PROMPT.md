# MASTER PROMPT — paste this into Claude Code (or tell it: "Read MASTER_PROMPT.md and follow it")

You are a senior UI/UX designer + React engineer. Build the complete website for **Resin Art And Decore**,
a small business selling handmade resin art gifts. Reply to me in simple Hinglish. Write code in English.

## 0. How to work (important)
1. First read: `CLAUDE.md`, `DESIGN.md`, `src/data/products.seed.json`, and skim `public/images/` (list the folders, open 1 photo per product folder to see colors/shapes).
2. Then study the reference site in `reference/cake-crumb/` (read-only). Read these ONLY: `src/index.css` (tokens, header, hero, product card, quick-view, gallery, footer sections), `src/App.jsx`, `src/pages/Home.jsx`, `src/pages/Shop.jsx`, `src/pages/Gallery.jsx`, `src/pages/FAQ.jsx`, `src/components/{Navbar,Footer,ScrollReveal,ProductQuickView,SearchOverlay,VideoStrip,GalleryGrid,WhatsAppButton,BackToTop,Skeleton,ErrorBoundary,PageHero,HeartDivider}.jsx`, `src/hooks/{usePageMeta,useJsonLd,useIsMobile}.js`, `scripts/convert-to-webp.js`.
3. **Do not write code yet.** Reply with a plan: pages, component list, file tree, data model, motion list, risks, and anything you need from me. Wait for my "go".
4. Build in phases (section 10). After each phase: run `npm run build`, open the site, screenshot at 390 / 820 / 1280 widths, fix problems, then give me a 5-line summary and ask for the next "go".
5. If a fact is missing (price, delivery time, social links, care instructions), do not invent it. Use the placeholders in section 8 and list all open items at the end.

## 1. What to learn from Cake & Crumb (patterns to reuse, in your own design)
- Data-driven catalog; routes lazy-loaded; one-file product registry; photos resolved by name.
- Scroll-reveal system with an opt-out (`data-no-reveal`) for the hero so the first screen is never hidden.
- Sticky header with a fixed CSS height variable; anything above it sits outside it.
- Product card with quick view; search overlay; filter chips; skeleton loaders; ErrorBoundary that reloads once on a stale chunk.
- Gallery with a video strip played by IntersectionObserver (only on-screen clips play, muted, `playsInline`).
- SEO: `usePageMeta`, JSON-LD (business + products, NO ratings), sitemap, robots, OG card, hero image preload with `imagesrcset`.
- Image pipeline: sharp -> webp at 400 / 800 / full; a script that reports missing/unused photos.
- Copy discipline: nothing invented, say it once, no absolute promises, no opening hours.

## 2. What must be DIFFERENT (this is a new brand — do not clone)
- Palette, fonts, logo, icons, hero, wording, section order, card style, footer layout: all new (see `DESIGN.md`).
- Cake & Crumb is soft rose + cocoa + bakery. Ours is **deep maroon + crimson + blush + gold on marble white**, jewelry/gift-shop feel.
- Not needed (do not build): Firebase, cart, checkout, payments, delivery slabs, offers clock, ChatBot, admin, accounting, order tracking, reviews database.
- New elements unique to us (build them): resin-pour animated hero art; gold-shimmer Arabic calligraphy; Occasion rail; Personalize Builder; Saved list; Process timeline; WhatsApp number chooser; festival banner for Eid / Ramadan / Valentine's / Rakhi; masonry gallery with lightbox; scroll progress bar; "Design preview" label for mockups.

## 3. Tech setup
```
npm create vite@latest . -- --template react
npm i react-router-dom
npm i tailwindcss @tailwindcss/vite
npm i -D sharp eslint
```
`vite.config.js`: react plugin, tailwind plugin, `manualChunks` for a `react-vendor` chunk. `base` = `/` (see section 11 for GitHub Pages).
Fonts: Cormorant Garamond, DM Sans, Amiri (Google Fonts link in `index.html`, `display=swap`).
Add `public/_redirects` (`/* /index.html 200`) and `vercel.json` rewrites so deep links work on Netlify/Vercel.

## 4. Pages & routes (all lazy except Home)
| Route | Page | Notes |
| --- | --- | --- |
| `/` | Home | sections in 4.1 |
| `/shop` | Shop | filter chips by category, sort, search, grid, empty state |
| `/product/:slug` | Product | gallery, details, Personalize form, related, sticky mobile order bar |
| `/custom` | Personalize Builder | choose product -> name/initials/colors/occasion/note -> WhatsApp |
| `/saved` | Saved items | localStorage list -> "Send my list on WhatsApp" (one message, many products) |
| `/gallery` | Gallery | masonry + lightbox + video strip |
| `/about` | About | story placeholders, process timeline, what we make |
| `/faq` | FAQ | accordion, care + ordering questions (answers marked [TO CONFIRM] until owner confirms) |
| `/contact` | Contact | two WhatsApp cards (Makbul Fatema, Asim), social links only if set |
| `*` | NotFound | friendly, links to Shop |

### 4.1 Home sections (each once, in this order)
1. AnnouncementBar (marquee, maroon, gold text)
2. Header (sticky)
3. Hero: eyebrow pill, h1 "Gifts made by hand, for someone special" (italic crimson emphasis), 1 short paragraph, 2 ticks, 2 CTAs (Order on WhatsApp / View collection), right: maroon panel with resin-pour SVG art + gold Arabic calligraphy + 2 floating mini product cards (real products)
4. TrustCard overlapping hero (4 items: Handmade, Custom designs, Every occasion, Order on WhatsApp)
5. Shop by category (6 tiles with real product photos as backgrounds, name + "Explore")
6. Featured products (8 cards, "Bestseller / New / Custom" badges)
7. Personalize banner (maroon band, 3 steps, gold CTA -> `/custom`)
8. Shop by occasion (horizontal rail on mobile)
9. How it's made (4-step timeline, SVG draw-on animation)
10. Gallery teaser (6 photos) + link
11. Reviews (ONLY if real reviews exist in `src/data/reviews.js`; otherwise a "Share your experience on WhatsApp" invitation card)
12. Footer

## 5. Order system (the core feature)
- `src/config.js`:
```js
export const BUSINESS = { name: 'Resin Art And Decore', tagline: 'Handmade resin gifts' }
export const CONTACTS = [
  { id: 'makbul', label: 'Makbul Fatema', phone: '919428213440', display: '+91 94282 13440', default: true },
  { id: 'asim',   label: 'Asim',          phone: '919377308250', display: '+91 93773 08250' },
]
export const SOCIAL = { instagram: '', facebook: '' }   // empty = do not render the icon
```
- `src/utils/whatsapp.js`: `orderLink({ contact, product, options })` builds the message and returns the wa.me URL.
- Message format (English, short, one item per block):
```
Hi Resin Art And Decore! I would like to order:
*Product:* Bismillah Heart Frame
*Name/Initials:* A S
*Colors:* blue + gold
*Occasion:* Birthday
*Note:* ...
(Sent from the website)
```
  Saved list -> one message with a numbered list of products. Never include prices unless a real price is set.
- Every product card/page has "Order on WhatsApp". Click -> if the user already chose a contact (localStorage `rr_contact`) open directly; else show the small **NumberChooser** (two big buttons: Makbul Fatema / Asim) then open WhatsApp. Open `window.open`/location synchronously in the click handler.
- Floating WhatsApp FAB (bottom-right, safe-area aware, pulse), hidden when the sticky order bar is visible.

## 6. Data model
Convert `src/data/products.seed.json` to `src/data/products.js`:
`{ slug, name, category, badge, price|null, description, images[], photoStatus, customizable, options?: { colors[], allowName, allowInitials } }`.
- Helper `productImage(slug, index, size)` returns the webp URL (400 / 800 / 1600) and `productSrcSet(slug, index)`.
- Shop shows only `photoStatus === "ready"`. Products without photos (Mashallah Scalloped Plate, Teardrop Earrings) stay hidden until photos arrive; the build script must warn about them.
- `src/data/categories.js`, `occasions.js`, `faq.js`, `festivals.js` (Eid, Ramadan, Valentine's, Rakhi; banner auto-shows inside a date window), `reviews.js` (empty array by default).
- Category tiles use the first ready product photo of that category as background.

## 7. Images — where everything goes (and what you must automate)
```
public/images/products/<slug>/<slug>-1.jpeg ...   already placed by the owner (folder = slug)
public/images/brand/    logo.svg, favicon.svg, favicon-32.png, apple-touch-icon.png (180), og-card.jpg (1200x630)  <- you generate from SVG
public/images/hero/     any hero photo (optional; hero art is SVG)
public/images/gallery/  extra photos the owner adds (gallery-01.jpeg ...)
public/images/marketing/ the owner's two phone-number posters + collage. NOT product photos. Use only in Gallery as "Our posters" or not at all.
public/videos/          short H.264 mp4 clips (muted, <= 15s, <= 8 MB each) + a poster .webp per clip
media-originals/        big masters; git-ignored; never deployed
```
Write `scripts/convert-images.js` (`npm run images`):
1. For every `.jpg/.jpeg/.png` under `public/images/**`: write `name.webp` (max 1600w, q 82), `name-800.webp`, `name-400.webp`.
2. Move the original to `media-originals/<same path>` so it is not deployed.
3. Print a report: products with no photos, photos not used by any product, files with bad names, and any image wider than 3000px.
4. Name rule: lowercase, dashes, no spaces. Product folder name must equal a slug in `products.js`; warn with a "did you mean" suggestion otherwise.
`npm run check-images` prints the same report without changing files.
Some marketing images contain phone numbers or "Your Picture" placeholders. If any photo is a mockup/render rather than the real item, label it **"Design preview"** in the UI and tell me.

## 8. Content rules and placeholders
- Business name exactly: **Resin Art And Decore**. Tagline: "Handmade resin gifts".
- Voice: warm, simple, short sentences. English UI; optional small Gujarati/Hindi line later.
- Placeholders (visible only in dev, hidden or generic in production): `[SET PRICE]`, `[CUSTOMER REVIEW]`, `[INSTAGRAM LINK]`, `[FACEBOOK LINK]`, `[DELIVERY TIME]`, `[CARE INSTRUCTIONS]`, `[ABOUT STORY]`, `[CITY/AREA]`.
- Create `OPEN_ITEMS.md` listing every placeholder with the file it lives in, so the owner can fill them.
- FAQ topics (answers pending owner): how to order, custom names/photos, how long a custom piece takes, shipping/pickup, payment, how to care for resin (heat, sunlight, cleaning), gifts for occasions.
- No fake counts ("500+ happy customers"), no fake ratings, no invented years or awards, no "100% guaranteed".

## 9. Animations to implement (details in `DESIGN.md` section 4)
Marquee bar, scroll reveal (hero excluded), resin-pour hero art, gold shimmer, floating cards, card lift + image zoom + 2nd-photo crossfade, heart pop, SVG draw-on process icons, FAB pulse, scroll progress bar, page fade, button lift. All must stop under `prefers-reduced-motion`. Keep 60fps: animate only `transform` and `opacity`.

## 10. Phases (stop after each, show screenshots, wait for "go")
0. Plan only (section 0 step 3).
1. Foundation: Vite setup, tokens, fonts, Tailwind theme, router with lazy routes, Layout, AnnouncementBar, Header + mobile menu, Footer, all base SVG components, logo/favicon/OG generation, ErrorBoundary, usePageMeta, NotFound.
2. Data + images: `config.js`, `products.js`, helpers, `npm run images`, run it, fix report.
3. Home page complete (all 12 sections) with real photos.
4. Shop + ProductCard + QuickView + ProductPage + Saved list + NumberChooser + WhatsApp links + SearchOverlay.
5. Custom builder, Gallery (+lightbox, videos), About, FAQ, Contact, FestivalBanner.
6. Motion pass: add/tune every animation in section 9; reduced-motion test.
7. Quality pass: responsive audit at 360/390/768/820/1024/1280/1440, Lighthouse (aim >= 90 mobile Performance/Accessibility/SEO), keyboard-only walkthrough, contrast check, fix CLS, image sizes, bundle size.
8. SEO + deploy: JSON-LD LocalBusiness (no hours, no ratings), Product JSON-LD (no ratings), sitemap, robots, canonical, OG, prerender or SPA rewrites, deploy instructions. Final `OPEN_ITEMS.md`.

## 11. Hosting
Default: **Netlify or Vercel** (free; SPA rewrite files are included). If I choose GitHub Pages: set Vite `base` to `/<repo>/`, copy `dist/index.html` to `dist/404.html`, and use the project-site URL in meta tags. Ask me which one before Phase 8.

## 12. Definition of done
- Looks and feels premium on phone, iPad and laptop; no horizontal scroll; no layout shift.
- Every product with a photo can be ordered in 2 taps: Order -> (choose contact) -> WhatsApp opens with the product name prefilled.
- Theme matches `DESIGN.md`; no hard-coded colors in components; no icon libraries; all SVG hand-built.
- `npm run build` and `npm run lint` pass; `npm run images` leaves no unreported problems.
- `OPEN_ITEMS.md` lists everything I still need to provide.
