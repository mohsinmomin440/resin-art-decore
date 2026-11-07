#!/usr/bin/env node
/**
 * prerender.js — runs after `vite build` (see package.json "build").
 *
 * The site is a client-rendered SPA, so link crawlers (WhatsApp, Facebook,
 * Telegram, Google's first pass) only see the static <head> of index.html and
 * every shared product link would preview as the home page. This script writes
 * a copy of dist/index.html per route with the right <title>, description,
 * canonical and Open Graph tags (dist/product/<slug>/index.html, dist/shop/...).
 * The React app then boots as normal. It also generates dist/sitemap.xml from
 * the catalogue, so the sitemap can never drift from products.js.
 *
 * Dependency-free on purpose. Keep ROUTES in sync with page titles in src/pages.
 */

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'dist')
const SUFFIX = ' | Aman Resin Art And Decore'

const { SITE_URL } = await import(pathToFileURL(path.join(ROOT, 'src/data/config.js')).href)
const { shopProducts } = await import(pathToFileURL(path.join(ROOT, 'src/data/products.js')).href)

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const DEFAULT_IMAGE = `${SITE_URL}/images/brand/og-card.jpg`

const ROUTES = [
  { path: '/shop', title: 'Shop Handmade Resin Pieces', description: 'Handmade resin pieces from Aman Resin Art And Decore — Islamic décor, love letters, keychains, phone cases and custom gifts. Order on WhatsApp.', priority: '0.9', changefreq: 'weekly' },
  { path: '/custom', title: 'Custom resin piece', description: 'Design your own resin piece — pick a product, add a name, initials, colors and occasion. We build it and message you on WhatsApp.', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', title: 'Creations Gallery', description: 'A look at the handmade resin pieces from Aman Resin Art And Decore — Islamic calligraphy frames, customized love letters, floral keychains and custom keepsake gifts.', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', title: 'About', description: 'The story behind Aman Resin Art And Decore — handmade resin keepsakes poured in Kakoshi, Gujarat.', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', title: 'FAQ', description: 'Answers about ordering, custom pieces, making time, shipping and care for handmade resin gifts.', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', title: 'Contact', description: 'Chat with Aman Resin Art And Decore on WhatsApp or email. Studio in Kakoshi, Gujarat.', priority: '0.7', changefreq: 'monthly' },
  { path: '/policies', title: 'Shipping, Payment & Privacy', description: 'How ordering, payment, shipping, care and privacy work at Aman Resin Art And Decore. Every order is confirmed on WhatsApp.', priority: '0.4', changefreq: 'yearly' },
]

const PRODUCT_ROUTES = shopProducts.map((p) => ({
  path: `/product/${p.slug}`,
  title: p.name,
  description: `${p.name} — ${p.category}. ${p.description} Order on WhatsApp.`,
  image: `${SITE_URL}/images/products/${p.slug}/${p.slug}-1-800.webp`,
  priority: '0.8',
  changefreq: 'weekly',
}))

function render(route) {
  const title = `${route.title}${SUFFIX}`
  const url = `${SITE_URL}${route.path}`
  const image = route.image || DEFAULT_IMAGE
  const meta = (attr, name, content) => `<meta ${attr}="${name}" content="${esc(content)}" />`

  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`],
    [/<meta\s+name="description"[\s\S]*?\/>/, meta('name', 'description', route.description)],
    [/<link\s+rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`],
    [/<meta\s+property="og:title"[\s\S]*?\/>/, meta('property', 'og:title', title)],
    [/<meta\s+property="og:description"[\s\S]*?\/>/, meta('property', 'og:description', route.description)],
    [/<meta\s+property="og:url"[^>]*\/>/, meta('property', 'og:url', url)],
    [/<meta\s+property="og:image"\s+content[^>]*\/>/, meta('property', 'og:image', image)],
    [/<meta\s+name="twitter:title"[\s\S]*?\/>/, meta('name', 'twitter:title', title)],
    [/<meta\s+name="twitter:description"[\s\S]*?\/>/, meta('name', 'twitter:description', route.description)],
    [/<meta\s+name="twitter:image"[^>]*\/>/, meta('name', 'twitter:image', image)],
  ]

  let html = template
  if (route.image) {
    // Default card is 1200x630; a product photo is not — drop the stale size hints.
    html = html.replace(/\s*<meta\s+property="og:image:(width|height)"[^>]*\/>/g, '')
  }
  for (const [re, value] of swaps) {
    if (!re.test(html)) console.warn(`  ! tag not found for ${route.path}: ${re}`)
    html = html.replace(re, value)
  }
  return html
}

let count = 0
for (const route of [...ROUTES, ...PRODUCT_ROUTES]) {
  const dir = path.join(DIST, route.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), render(route))
  count++
}

// ── sitemap ──
const today = new Date().toISOString().slice(0, 10)
const entry = (loc, changefreq, priority) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
const urls = [
  entry('/', 'weekly', '1.0'),
  ...ROUTES.map((r) => entry(r.path, r.changefreq, r.priority)),
  ...PRODUCT_ROUTES.map((r) => entry(r.path, r.changefreq, r.priority)),
]
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)

console.log(`prerender: wrote ${count} route pages + sitemap.xml (${urls.length} urls)`)
