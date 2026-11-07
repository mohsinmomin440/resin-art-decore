/**
 * usePageMeta — update <title>, meta description, OG/Twitter tags, canonical
 * and robots per route. Canonical always points at the public SITE_URL (not
 * whichever host the build is currently served from). Cleans up on unmount.
 *
 *   usePageMeta({ title, description, image?, noindex? })
 *   image: a site-relative or absolute URL (e.g. productImage(slug)).
 */

import { useEffect } from 'react'
import { SITE_URL } from '../data/config'

const DEFAULT_TITLE = 'Aman Resin Art And Decore — Handmade resin gifts'
const DEFAULT_DESC =
  'Handmade resin gifts by Aman Resin Art And Decore — Islamic décor, love letters, keychains, phone cases and custom pieces. Order on WhatsApp.'
const DEFAULT_IMAGE = `${SITE_URL}/images/brand/og-card.jpg`

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Path of the current page without the deploy sub-path (e.g. /resin-art-decore). */
function sitePath() {
  const path = window.location.pathname
  return BASE && path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path
}

/** Absolute public URL for an image path that may carry the deploy sub-path. */
function publicImageUrl(image) {
  if (!image) return DEFAULT_IMAGE
  if (/^https?:/.test(image)) return image
  const rel = BASE && image.startsWith(BASE) ? image.slice(BASE.length) : image
  return `${SITE_URL}${rel}`
}

export function usePageMeta({ title, description, image, noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Aman Resin Art And Decore` : DEFAULT_TITLE
    document.title = fullTitle

    const desc = description || DEFAULT_DESC
    const img = publicImageUrl(image)
    const url = `${SITE_URL}${sitePath()}`

    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('name', 'description', DEFAULT_DESC)
      setMeta('property', 'og:title', DEFAULT_TITLE)
      setMeta('property', 'og:description', DEFAULT_DESC)
      setMeta('property', 'og:image', DEFAULT_IMAGE)
      setMeta('name', 'twitter:title', DEFAULT_TITLE)
      setMeta('name', 'twitter:description', DEFAULT_DESC)
      setMeta('name', 'twitter:image', DEFAULT_IMAGE)
      setMeta('name', 'robots', 'index, follow')
    }
  }, [title, description, image, noindex])
}

function setMeta(attrKey, attrValue, content) {
  let el = document.head.querySelector(`meta[${attrKey}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrKey, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
