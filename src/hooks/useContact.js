import { useSyncExternalStore } from 'react'
import { CONTACTS } from '../data/config'
import { defaultContact } from '../utils/whatsapp'

/**
 * Which WhatsApp contact the customer picked, plus the global chooser dialog
 * state. First "Order" tap with no stored choice opens the chooser; afterwards
 * every order link goes straight to the chosen person.
 */
const KEY = 'rr_contact_id'

function readId() {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

let chosenId = typeof window === 'undefined' ? null : readId()
let chooser = { open: false, pending: null }
const subs = new Set()
const emit = () => subs.forEach((fn) => fn())
const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}

const isValid = (id) => CONTACTS.some((c) => c.id === id)

/** Current contact (the chosen one, else the default). */
export function useContact() {
  const id = useSyncExternalStore(subscribe, () => chosenId, () => null)
  const contact = CONTACTS.find((c) => c.id === id) || defaultContact()
  return { contact, chosen: isValid(id) }
}

/** State for the <NumberChooser /> mounted once in Layout. */
export function useChooser() {
  return useSyncExternalStore(subscribe, () => chooser, () => chooser)
}

/**
 * onClick guard for order anchors. If the customer already chose a contact the
 * anchor works normally; otherwise open the chooser and finish the order after
 * they pick. `makeHref(contact)` must build the final wa.me link.
 */
export function guardOrder(e, makeHref) {
  if (isValid(chosenId)) return
  e.preventDefault()
  chooser = { open: true, pending: makeHref }
  emit()
}

export function selectContact(contact) {
  chosenId = contact.id
  try {
    window.localStorage.setItem(KEY, contact.id)
  } catch {
    // storage blocked — choice lasts for this page view
  }
  const pending = chooser.pending
  chooser = { open: false, pending: null }
  emit()
  if (pending) window.open(pending(contact), '_blank', 'noopener,noreferrer')
}

export function closeChooser() {
  chooser = { open: false, pending: null }
  emit()
}
