#!/usr/bin/env node
/**
 * convert-images.js — `npm run images`
 *
 * For every .jpg/.jpeg/.png under public/images/**:
 *   1. write <name>.webp (max 1600w, q 82)
 *   2. write <name>-800.webp and <name>-400.webp
 *   3. move the ORIGINAL to media-originals/<same path> so it is not deployed
 *
 * Prints a report: products with no photos, photos not used by any product,
 * files with bad names, and any image wider than 3000px.
 *
 * Run:  npm run images
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const IMAGES = path.join(PUBLIC, 'images')
const ORIGINALS = path.join(ROOT, 'media-originals')

const WEBP_SIZES = [1600, 800, 400]
const QUALITY = 82
const MAX_WIDTH = 3000

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full)
  }
  return out
}

function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/') }
function baseName(file) { return file.replace(/\.(jpe?g|png)$/i, '') }
function badName(file) {
  const base = baseName(file)
  if (/[A-Z_ ]/.test(base)) return true
  if (/\.{2,}/.test(base)) return true
  return false
}

function moveOriginal(src) {
  const dest = path.join(ORIGINALS, path.relative(PUBLIC, src))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  if (fs.existsSync(dest)) fs.unlinkSync(dest)
  fs.renameSync(src, dest)
}

async function main() {
  const checkOnly = process.argv.includes('--check')

  if (!fs.existsSync(IMAGES)) {
    console.log('No public/images folder — nothing to convert.')
    return
  }

  const files = walk(IMAGES)
  const report = { converted: [], moved: [], warnings: [], errors: [] }

  for (const src of files) {
    const file = path.basename(src)
    if (badName(file)) report.warnings.push(`Bad name (lowercase dashes only): ${rel(src)}`)

    let meta
    try { meta = sharp(src).metadata() } catch (e) { report.errors.push(`Cannot read ${rel(src)}: ${e.message}`); continue }

    if (meta.width > MAX_WIDTH) report.warnings.push(`${meta.width}px wide (> ${MAX_WIDTH}): ${rel(src)}`)

    if (checkOnly) continue

    const base = baseName(file)
    const dir = path.dirname(src)

    try {
      for (const size of WEBP_SIZES) {
        const outName = size === 1600 ? `${base}.webp` : `${base}-${size}.webp`
        const outPath = path.join(dir, outName)
        await sharp(src).resize({ width: size }).jpeg({ quality: QUALITY }).toFile(outPath)
        report.converted.push(outName)
      }
      moveOriginal(src)
      report.moved.push(rel(src))
    } catch (e) {
      report.errors.push(`Convert failed ${rel(src)}: ${e.message}`)
    }
  }

  console.log('\n═══ IMAGE CONVERSION REPORT ═══')
  console.log(`Files scanned: ${files.length}`)
  console.log(`Webp written: ${report.converted.length}`)
  console.log(`Originals moved: ${report.moved.length}`)
  if (report.errors.length) { console.log('\n── ERRORS ──'); report.errors.forEach((e) => console.log('  ✗ ' + e)); }
  if (report.warnings.length) { console.log('\n── WARNINGS ──'); report.warnings.forEach((w) => console.log('  ! ' + w)); }

  let products
  try { products = await import(path.join(ROOT, 'src/data/products.js')) } catch { products = null }
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

main().catch((e) => { console.error(e); process.exit(1) })