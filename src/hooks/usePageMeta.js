/**
 * usePageMeta — update <title>, meta description, OG and canonical per route.
 * Pass a partial object — falls back to defaults. Cleans up on unmount so a
 * page that forgets to call this doesn't inherit the previous route's tags.
 */

import { useEffect } from 'react'

const DEFAULT_TITLE = 'Resin Art And Decore — Handmade resin gifts'
const DEFAULT_DESC =
  'Handmade resin gifts by Resin Art And Decore — Islamic décor, love letters, keychains, phone cases and custom pieces. Order on WhatsApp.'

export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Resin Art And Decore` : DEFAULT_TITLE
    document.title = fullTitle

    const desc = description || DEFAULT_DESC
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)

    const url = window.location.origin + window.location.pathname
    setLink('canonical', url)
    setMeta('property', 'og:url', url)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('name', 'description', DEFAULT_DESC)
      setMeta('property', 'og:description', DEFAULT_DESC)
    }
  }, [title, description])
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