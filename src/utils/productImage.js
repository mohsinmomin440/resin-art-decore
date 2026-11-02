/**
 * productImage.js — resolve product photos to webp URLs.
 *
 * Folder name = product slug. Never hard-code image paths in components.
 *   productImage(slug, index, size) → '/images/products/<slug>/<slug>-N.webp'
 *   productSrcSet(slug, index)      → '400w 800w 1600w' descriptor list
 */

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const SIZES = [400, 800, 1600]

/** Photo filename for a product at a given index (1-based). */
export function photoName(slug, index = 1) {
  return `${slug}-${index}.webp`
}

/** Full URL for one photo variant. */
export function productImage(slug, index = 1, size = 800) {
  const s = SIZES.includes(size) ? size : 800
  return `${BASE}/images/products/${slug}/${photoName(slug, index)}?v=${s}`
}

/** Check if product has images */
export function hasImages(product) {
  return product?.images?.length > 0
}

/** srcset string: 'file 400w, file 800w, file 1600w'. */
export function productSrcSet(slug, index = 1) {
  return SIZES.map((s) => `${BASE}/images/products/${slug}/${photoName(slug, index)}?v=${s} ${s}w`).join(', ')
}

/** sizes attribute for a grid card. */
export function productSizes(cols) {
  if (cols >= 4) return '(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 46vw'
  if (cols >= 3) return '(min-width: 768px) 30vw, 46vw'
  return '46vw'
}

/** The first photo of a product, or null if none. */
export function firstPhoto(product) {
  if (!product?.images?.length) return null
  return productImage(product.slug, 1)
}