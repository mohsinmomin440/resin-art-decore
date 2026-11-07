/**
 * StickyOrderBar — bottom bar on product pages. "Order on WhatsApp" + product
 * name. Replaces the FAB so the two never appear together.
 */
import { useContact, guardOrder } from '../hooks/useContact'
import { orderLink } from '../utils/whatsapp'
import { priceLabel } from '../data/products'
import { WhatsApp } from './svg'

export default function StickyOrderBar({ product, options }) {
  const { contact } = useContact()

  return (
    <div className="rr-sticky-order">
      <div className="rr-sticky-order__info">
        <div className="rr-sticky-order__name">{product.name}</div>
        <div className="rr-sticky-order__price">{priceLabel(product)}</div>
      </div>
      <a
        href={orderLink({ contact, product, options })}
        onClick={(e) => guardOrder(e, (c) => orderLink({ contact: c, product, options }))}
        target="_blank"
        rel="noopener noreferrer"
        className="rr-sticky-order__btn"
      >
        <WhatsApp size={16} /> Order
      </a>
    </div>
  )
}
