/**
 * whatsapp.js — build wa.me order links.
 *
 * One message per block, short, no invented prices. The message is built
 * synchronously inside a click handler so the browser opens the tab itself.
 */

const BUSINESS_NAME = 'Aman Resin Art And Decore'

/** Encode once, never twice. */
export function waText(message) {
  return encodeURIComponent(message || `Hi ${BUSINESS_NAME}! I would like to order.`)
}

/**
 * Build a full wa.me URL for a single product order.
 * `options` may carry: name, initials, colors, occasion, note, qty.
 */
export function orderLink({ contact, product, options = {} } = {}) {
  const phone = contact?.phone || '919428213440'
  const lines = [`Hi ${BUSINESS_NAME}! I would like to order:`]

  if (product?.name) {
    lines.push(`*Product:* ${product.name}`)
  }
  if (options.name) lines.push(`*Name:* ${options.name}`)
  if (options.initials) lines.push(`*Initials:* ${options.initials}`)
  if (options.colors) lines.push(`*Colors:* ${options.colors}`)
  if (options.occasion) lines.push(`*Occasion:* ${options.occasion}`)
  if (options.qty) lines.push(`*Quantity:* ${options.qty}`)
  if (options.note) lines.push(`*Note:* ${options.note}`)

  lines.push('(Sent from the website)')

  return `https://wa.me/${phone}?text=${waText(lines.join('\n'))}`
}

/**
 * Build a wa.me URL for the saved list — one message, numbered products.
 */
export function savedListLink({ contact, items = [] } = {}) {
  const phone = contact?.phone || '919428213440'
  const lines = [`Hi ${BUSINESS_NAME}! I would like to order these items:`]
  items.forEach((p, i) => lines.push(`${i + 1}. ${p.name}`))
  lines.push('(Sent from the website)')
  return `https://wa.me/${phone}?text=${waText(lines.join('\n'))}`
}

/** Open WhatsApp synchronously inside a click handler. */
export function openWhatsApp(url) {
  if (!url) return
  // Synchronous open — mobile browsers block popups after an await.
  window.open(url, '_blank', 'noopener,noreferrer')
}