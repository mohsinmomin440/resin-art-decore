/**
 * productImage.js — resolve product photos to webp URLs.
 *
 * Folder name = product slug. Never hard-code image paths in components.
 * Files produced by `npm run images`:
 *   <slug>-N-400.webp, <slug>-N-800.webp, <slug>-N.webp (1600w master)
 */

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const SIZES = [400, 800, 1600]

function file(slug, index, size) {
  const suffix = size >= 1600 ? '' : `-${size}`
  return `${BASE}/images/products/${slug}/${slug}-${index}${suffix}.webp`
}

/** Smallest generated variant that is >= the requested width. */
function pickSize(size) {
  return SIZES.find((s) => s >= size) ?? 1600
}

/** URL of one photo (index is 1-based) at the closest generated size. */
export function productImage(slug, index = 1, size = 800) {
  return file(slug, index, pickSize(size))
}

/** srcset string: '<400 file> 400w, <800 file> 800w, <1600 file> 1600w'. */
export function productSrcSet(slug, index = 1) {
  return SIZES.map((s) => `${file(slug, index, s)} ${s}w`).join(', ')
}

export function hasImages(product) {
  return product?.images?.length > 0
}

/** The first photo of a product, or null if none. */
export function firstPhoto(product) {
  return hasImages(product) ? productImage(product.slug, 1) : null
}
