/**
 * whatsapp.js — WhatsApp order link helpers
 *
 * Order = WhatsApp link. https://wa.me/<number>?text=<encodeURIComponent(message)>
 * Numbers live ONLY in src/config.js. Open the link synchronously inside the click handler,
 * or mobile blocks it.
 */

import { CONTACTS } from '../data/config'

export function orderLink({ contact, product = null, customMessage = '' }) {
  const c = contact || CONTACTS.find((c) => c.default) || CONTACTS[0]
  let message = customMessage

  if (product) {
    message = `Hi, I'm interested in ${product.name}. Please share details and pricing.`
  }

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${c.phone}?text=${encodedMessage}`
}

export function openWhatsAppOrder(contact, product) {
  const url = orderLink({ contact, product })
  // Open synchronously before any await to avoid mobile blocking
  window.location.href = url
}

export function savedListLink({ contact, items = [] }) {
  const c = contact || CONTACTS.find((c) => c.default) || CONTACTS[0]
  const listText = items.map((p, i) => `${i + 1}. ${p.name}`).join('\n')
  const message = `Hi, I am interested in these pieces I saved from your collection:\n\n${listText}\n\nPlease let me know the pricing and customization details.`
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${c.phone}?text=${encodedMessage}`
}
