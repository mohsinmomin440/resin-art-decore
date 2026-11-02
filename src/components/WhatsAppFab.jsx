/**
 * WhatsAppFab — floating bottom-right WhatsApp button with a pulse ring.
 * Hidden when the sticky order bar is visible (never both on screen).
 * Stops pulsing after the user taps it.
 */
import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'
import { openWhatsAppOrder } from '../utils/whatsapp'
import { WhatsApp } from './svg'

export default function WhatsAppFab({ hidden = false }) {
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const [tapped, setTapped] = useState(false)
  const reduce = useReducedMotion()

  if (hidden) return null

  function handleClick(e) {
    e.preventDefault()
    openWhatsAppOrder(contact)
    setTapped(true)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Chat with Us on WhatsApp"
      className={`rr-wa-fab${tapped ? ' is-tapped' : ''}${reduce ? ' no-pulse' : ''}`}
    >
      <WhatsApp size={22} />
      <span className="rr-wa-fab__label">Chat with Us</span>
    </button>
  )
}