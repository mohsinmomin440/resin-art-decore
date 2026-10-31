/**
 * StickyOrderBar — bottom bar on product pages. "Order on WhatsApp" + product
 * name. Replaces the FAB so the two never appear together.
 */
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'
import { orderLink } from '../utils/whatsapp'
import { WhatsApp } from './svg'

export default function StickyOrderBar({ product }) {
  const [contact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])
  const href = orderLink({ contact, product })

  return (
    <div className="rr-sticky-order">
      <div className="rr-sticky-order__info">
        <div className="rr-sticky-order__name">{product.name}</div>
        <div className="rr-sticky-order__price">Ask price on WhatsApp</div>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="rr-sticky-order__btn">
        <WhatsApp size={16} /> Order
      </a>
    </div>
  )
}