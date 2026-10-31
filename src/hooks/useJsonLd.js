/**
 * useJsonLd — inject a <script type="application/ld+json"> tag.
 * Removes the tag on unmount so other pages don't inherit stale schema.
 */

import { useEffect } from 'react'

export function useJsonLd(id, data) {
  const jsonString = data ? JSON.stringify(data) : ''

  useEffect(() => {
    if (!jsonString) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.jsonldId = id
    el.text = jsonString
    document.head.appendChild(el)
    return () => {
      const live = document.head.querySelector(`script[data-jsonld-id="${id}"]`)
      if (live) live.remove()
    }
  }, [id, jsonString])
}