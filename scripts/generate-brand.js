#!/usr/bin/env node
/**
 * generate-brand.js — `npm run generate-brand`
 * Generates all brand assets from media-originals/images/brand/logo.jpg
 * Outputs: logo.jpg, logo.webp (multiple sizes), apple-touch-icon, favicon-32, icon-512, og-card.
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const BRAND_SRC = path.join(process.cwd(), 'media-originals', 'images', 'brand', 'logo.jpg')
const OUT = path.join(process.cwd(), 'public', 'images', 'brand')
fs.mkdirSync(OUT, { recursive: true })

async function generate() {
  if (!fs.existsSync(BRAND_SRC)) {
    console.warn('Source logo not found at:', BRAND_SRC)
    return
  }

  // Copy raw logo.jpg
  fs.copyFileSync(BRAND_SRC, path.join(OUT, 'logo.jpg'))

  // 1. WebP Logo Variants
  await sharp(BRAND_SRC).resize(64, 64).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-64.webp'))
  await sharp(BRAND_SRC).resize(128, 128).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-128.webp'))
  await sharp(BRAND_SRC).resize(256, 256).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-256.webp'))
  await sharp(BRAND_SRC).resize(512, 512).webp({ quality: 90 }).toFile(path.join(OUT, 'logo-512.webp'))
  await sharp(BRAND_SRC).resize(1024, 1024).webp({ quality: 90 }).toFile(path.join(OUT, 'logo.webp'))

  // 2. Apple Touch Icons (180x180 standard)
  await sharp(BRAND_SRC).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'))
  await sharp(BRAND_SRC).resize(180, 180).webp({ quality: 90 }).toFile(path.join(OUT, 'apple-touch-icon.webp'))
  await sharp(BRAND_SRC).resize(400, 400).webp({ quality: 90 }).toFile(path.join(OUT, 'apple-touch-icon-400.webp'))
  await sharp(BRAND_SRC).resize(800, 800).webp({ quality: 90 }).toFile(path.join(OUT, 'apple-touch-icon-800.webp'))

  // 3. Favicon (32x32 standard)
  await sharp(BRAND_SRC).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'))
  await sharp(BRAND_SRC).resize(32, 32).webp({ quality: 90 }).toFile(path.join(OUT, 'favicon-32.webp'))
  await sharp(BRAND_SRC).resize(400, 400).webp({ quality: 90 }).toFile(path.join(OUT, 'favicon-32-400.webp'))
  await sharp(BRAND_SRC).resize(800, 800).webp({ quality: 90 }).toFile(path.join(OUT, 'favicon-32-800.webp'))

  // 4. PWA Icon 512
  await sharp(BRAND_SRC).resize(512, 512).png().toFile(path.join(OUT, 'icon-512.png'))
  await sharp(BRAND_SRC).resize(512, 512).webp({ quality: 90 }).toFile(path.join(OUT, 'icon-512.webp'))
  await sharp(BRAND_SRC).resize(400, 400).webp({ quality: 90 }).toFile(path.join(OUT, 'icon-512-400.webp'))
  await sharp(BRAND_SRC).resize(800, 800).webp({ quality: 90 }).toFile(path.join(OUT, 'icon-512-800.webp'))

  // 5. OpenGraph Social Share Card (1200x630)
  const logo500 = await sharp(BRAND_SRC).resize(480, 480).png().toBuffer()
  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 255, g: 248, b: 246 }
    }
  }).jpeg().toBuffer()

  const textSvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1180" height="610" fill="none" stroke="#D4A359" stroke-width="4" rx="20" x="10" y="10"/>
      <text x="570" y="250" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#3F0714">Aman Resin Art</text>
      <text x="570" y="315" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#3F0714">&amp; Decore</text>
      <text x="570" y="375" font-family="Georgia, serif" font-size="24" font-style="italic" fill="#B3213B">Handcrafted Keepsakes &amp; Luxury Decor</text>
      <text x="570" y="450" font-family="system-ui, sans-serif" font-size="19" font-weight="600" fill="#8C6320">Kakoshi, Gujarat • Pan-India Delivery • WhatsApp Ordering</text>
    </svg>
  `)

  await sharp(bg)
    .composite([
      { input: logo500, top: 75, left: 50 },
      { input: textSvg, top: 0, left: 0 }
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, 'og-card.jpg'))

  await sharp(path.join(OUT, 'og-card.jpg'))
    .webp({ quality: 90 })
    .toFile(path.join(OUT, 'og-card.webp'))

  console.log('Brand assets generated successfully from official logo!')
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
