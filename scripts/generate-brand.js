#!/usr/bin/env node
/**
 * generate-brand.js — `npm run generate-brand`
 * Writes public/images/brand/logo.svg, favicon.svg, favicon-32.png,
 * apple-touch-icon.png (180), icon-512.png, og-card.jpg (1200x630).
 * Logo = resin-drop + heart mark + "Resin Art And Decore" wordmark in maroon/gold.
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const OUT = path.join(process.cwd(), 'public', 'images', 'brand')
fs.mkdirSync(OUT, { recursive: true })

const MAROON = '#3F0714'
const CRIMSON = '#B3213B'
const GOLD = '#E0B04A'
const WHITE = '#FFFFFF'

const LOGO_SVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${CRIMSON}"/>
    </linearGradient>
  </defs>
  <path d="M60 6 C60 6 16 48 16 72 A44 44 0 0 0 104 72 C104 48 60 6 60 6Z" fill="url(#g)"/>
  <path d="M60 72 C60 72 32 58 32 46 A14 14 0 0 1 60 40 A14 14 0 0 1 88 46 C88 58 60 72 60 72Z" fill="${WHITE}"/>
</svg>`

const FAVICON_SVG = LOGO_SVG(32)

fs.writeFileSync(path.join(OUT, 'logo.svg'), LOGO_SVG(512))
fs.writeFileSync(path.join(OUT, 'favicon.svg'), FAVICON_SVG)

async function svgToPng(svg, w, h, out) {
  const png = sharp(Buffer.from(svg)).resize(w, h).png().toBuffer()
  fs.writeFileSync(out, await png)
}

await svgToPng(LOGO_SVG(512), 512, 512, path.join(OUT, 'icon-512.png'))
await svgToPng(LOGO_SVG(512), 180, 180, path.join(OUT, 'apple-touch-icon.png'))
await svgToPng(LOGO_SVG(512), 32, 32, path.join(OUT, 'favicon-32.png'))

// OG card — 1200x630, marble background + mark + wordmark.
const OG_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFF8F6"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#ogNoise)" opacity="0.04"/>
  <defs>
    <filter id="ogNoise"><feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4"/></filter>
    <linearGradient id="ogMark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GOLD}"/><stop offset="100%" stop-color="${CRIMSON}"/>
    </linearGradient>
  </defs>
  <g transform="translate(120,150) scale(2)">
    <path d="M60 6 C60 6 16 48 16 72 A44 44 0 0 0 104 72 C104 48 60 6 60 6Z" fill="url(#ogMark)"/>
    <path d="M60 72 C60 72 32 58 32 46 A14 14 0 0 1 60 40 A14 14 0 0 1 88 46 C88 58 60 72 60 72Z" fill="${WHITE}"/>
  </g>
  <text x="360" y="260" font-family="Georgia, serif" font-size="64" font-weight="700" fill="${MAROON}">Resin Art And Decore</text>
  <text x="360" y="330" font-family="Georgia, serif" font-size="32" fill="${CRIMSON}" font-style="italic">Handmade resin gifts</text>
  <text x="120" y="520" font-family="sans-serif" font-size="22" fill="${GOLD}">Order on WhatsApp</text>
</svg>`

fs.writeFileSync(path.join(OUT, 'og-card.svg'), OG_SVG)
await sharp(Buffer.from(OG_SVG)).resize(1200, 630).jpeg({ quality: 85 }).toFile(path.join(OUT, 'og-card.jpg'))

console.log('Brand assets written to public/images/brand/')