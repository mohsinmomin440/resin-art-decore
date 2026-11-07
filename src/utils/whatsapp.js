/**
 * whatsapp.js — WhatsApp order link helpers.
 *
 * Order = WhatsApp link: https://wa.me/<number>?text=<encodeURIComponent(message)>
 * Numbers live ONLY in src/data/config.js. Links are plain <a target="_blank">
 * so the customer never loses the site and mobile popup blockers stay quiet.
 */

import { CONTACTS } from '../data/config'

const FIELD_LABELS = {
  qty: 'Quantity',
  name: 'Name',
  initials: 'Initials',
  colors: 'Colors',
  occasion: 'Occasion',
  note: 'Note',
}

export function defaultContact() {
  return CONTACTS.find((c) => c.default) || CONTACTS[0]
}

function waUrl(contact, message) {
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`
}

/**
 * @param {object}  args
 * @param {object=} args.contact   entry from CONTACTS (defaults to the default contact)
 * @param {object=} args.product   product being ordered
 * @param {object=} args.options   { qty, name, initials, colors, occasion, note } — empty values are skipped
 * @param {string=} args.intro     overrides the first line of the message
 * @param {string=} args.customMessage  used when there is no product
 */
export function orderLink({ contact, product = null, options = {}, intro = '', customMessage = '' } = {}) {
  const c = contact || defaultContact()
  const first =
    intro ||
    (product
      ? `Hi, I'm interested in ${product.name}.`
      : customMessage || "Hi, I'd like to know more about your resin pieces.")

  const details = Object.entries(FIELD_LABELS)
    .filter(([key]) => options[key] !== undefined && String(options[key]).trim() !== '')
    .map(([key, label]) => `${label}: ${String(options[key]).trim()}`)

  const lines = [first]
  if (details.length) lines.push('', ...details)
  if (product) lines.push('', 'Please share details and pricing.')

  return waUrl(c, lines.join('\n'))
}

export function savedListLink({ contact, items = [] } = {}) {
  const c = contact || defaultContact()
  const listText = items.map((p, i) => `${i + 1}. ${p.name}`).join('\n')
  const message = `Hi, I am interested in these pieces I saved from your collection:\n\n${listText}\n\nPlease let me know the pricing and customization details.`
  return waUrl(c, message)
}
