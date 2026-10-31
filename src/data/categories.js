/**
 * categories.js — shop filter categories + category tiles.
 * Each tile uses the first ready product photo of that category as its background.
 */

import { shopProducts } from './products.js'
import { productImage } from '../utils/productImage.js'

// Filter order — what a customer looks for first.
export const CATEGORIES = [
  'Islamic Décor',
  'Love & Gifts',
  'Keychains',
  'Phone Cases',
  'Décor & Accessories',
  'Jewellery',
]

export function categoryProducts(category) {
  return shopProducts.filter((p) => p.category === category)
}

/** First ready product photo for a category tile background, or null. */
export function categoryPhoto(category) {
  const first = shopProducts.find((p) => p.category === category)
  return first ? productImage(first.slug, 1, 800) : null
}

/** Category tiles for the Home "Shop by category" band. */
export const CATEGORY_TILES = CATEGORIES.map((cat) => {
  const first = shopProducts.find((p) => p.category === cat)
  return {
    name: cat,
    to: `/shop?category=${encodeURIComponent(cat)}`,
    photo: first ? productImage(first.slug, 1, 800) : null,
    count: shopProducts.filter((p) => p.category === cat).length,
  }
}).filter((t) => t.count > 0)