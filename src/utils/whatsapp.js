/**
 * whatsapp.js — WhatsApp order link helpers
 *
 * Order = WhatsApp link. https://wa.me/<number>?text=<encodeURIComponent(message)>
 * Numbers live ONLY in src/config.js. Open the link synchronously inside the click handler,
 * or mobile blocks it.
 */

import { CONTACTS } from '../data/config'

export function orderLink({ contact, product = null, customMessage = '' }) {
  const c = contact || CONTACTS.find(c => c.default) || CONTACTS[0]
  let message = customMessage

  if (product) {
    message = `Hi, I'm interested in ${product.name}. Please share details and pricing.`
  }

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${c.phone}?text=${encodedMessage}`
}

export function savedListLink({ contact, items = [] }) {
  const list = items.map((item, index) => `${index + 1}. ${item.name}`).join('\n')
  const customMessage = list
    ? `Hi, I'm interested in these saved pieces:\n${list}\nPlease share details and pricing.`
    : "Hi, I'd like to know more about your resin pieces."

  return orderLink({ contact, customMessage })
}

export function openWhatsAppOrder(contact, product) {
  const url = orderLink({ contact, product })
  // Open synchronously before any await to avoid mobile blocking
  window.location.href = url
}
