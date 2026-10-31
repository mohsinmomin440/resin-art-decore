#!/usr/bin/env node
/**
 * check-images.js — `npm run check-images`
 * Same report as `npm run images` but changes nothing.
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = process.cwd()
const IMAGES = path.join(ROOT, 'public', 'images')
const MAX_WIDTH = 3000

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(full)
  }
  return out
}

function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/') }
function badName(file) {
  const base = file.replace(/\.(jpe?g|png|webp)$/i, '')
  if (/[A-Z_ ]/.test(base)) return true
  if (/\.{2,}/.test(base)) return true
  return false
}

async function importProducts() {
  const mod = await import(path.join(ROOT, 'src/data/products.js'))
  return mod
}

async function main() {
  if (!fs.existsSync(IMAGES)) { console.log('No public/images folder.'); return }

  const files = walk(IMAGES)
  const warnings = []
  const errors = []

  for (const src of files) {
    const file = path.basename(src)
    if (badName(file)) warnings.push(`Bad name (lowercase dashes only): ${rel(src)}`)
    let meta
    try { meta = sharp(src).metadata() } catch (e) { errors.push(`Cannot read ${rel(src)}: ${e.message}`); continue }
    if (meta.width > MAX_WIDTH) warnings.push(`${meta.width}px wide (> ${MAX_WIDTH}): ${rel(src)}`)
  }

  let products
  try { products = await importProducts() } catch { products = null }

  console.log('\n═══ IMAGE CHECK REPORT ═══')
  console.log(`Files scanned: ${files.length}`)
  if (errors.length) { console.log('\n── ERRORS ──'); errors.forEach((e) => console.log('  ✗ ' + e)); }
  if (warnings.length) { console.log('\n── WARNINGS ──'); warnings.forEach((w) => console.log('  ! ' + w)); }
  else console.log('  ✓ No warnings.')

  if (products) {
    const list = Array.isArray(products.products) ? products.products : products.shopProducts || []
    const noPhoto = list.filter((p) => !p.images || p.images.length === 0)
    if (noPhoto.length) {
      console.log('\n── PRODUCTS WITH NO PHOTO (hidden from shop) ──')
      noPhoto.forEach((p) => console.log(`  · ${p.name} (${p.slug}) — ${p.photoStatus}`))
    } else {
      console.log('\n✓ Every product has at least one photo.')
    }
  }
  console.log('')
}

main()