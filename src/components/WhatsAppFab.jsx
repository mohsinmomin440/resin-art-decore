/**
 * WhatsAppFab — floating bottom-right WhatsApp button with a pulse ring.
 * Hidden on product pages (the sticky order bar replaces it). Stops pulsing
 * after the user taps it.
 */
import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useContact, guardOrder } from '../hooks/useContact'
import { orderLink } from '../utils/whatsapp'
import { WhatsApp } from './svg'

export default function WhatsAppFab({ hidden = false }) {
  const { contact } = useContact()
  const [tapped, setTapped] = useState(false)
  const reduce = useReducedMotion()

  if (hidden) return null

  return (
    <a
      href={orderLink({ contact })}
      onClick={(e) => {
        guardOrder(e, (c) => orderLink({ contact: c }))
        setTapped(true)
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`rr-wa-fab${tapped ? ' is-tapped' : ''}${reduce ? ' no-pulse' : ''}`}
    >
      <WhatsApp size={22} />
      <span className="rr-wa-fab__label">Chat with Us</span>
    </a>
  )
}
