import { Link } from 'react-router-dom'
import { OCCASIONS, OCCASION_CATEGORIES } from '../data/occasions'
import { shopProducts } from '../data/products'
import {
  Cake,
  Ring,
  Rose,
  Heart,
  Home,
  Baby,
  Graduation,
  Farewell,
  CrescentStar,
  Lantern,
  Diya,
  Rakhi,
  Bouquet,
  Tie,
  Handshake,
  Gift,
} from './svg'

const ICONS = {
  Cake,
  Ring,
  Rose,
  Heart,
  Home,
  Baby,
  Graduation,
  Farewell,
  CrescentStar,
  Lantern,
  Diya,
  Rakhi,
  Bouquet,
  Tie,
  Handshake,
  Gift,
}

export default function OccasionRail() {
  return (
    <div className="rr-occasion-rail">
      {OCCASIONS.map((o) => {
        const cats = OCCASION_CATEGORIES[o.id] || []
        const first = shopProducts.find((p) => cats.includes(p.category))
        const IconComponent = ICONS[o.icon] || Gift
        return (
          <Link
            key={o.id}
            to={first ? `/shop?category=${encodeURIComponent(first.category)}` : '/shop'}
            className="rr-occasion-tile"
          >
            <span className="rr-occasion-tile__icon-wrap" aria-hidden="true">
              <IconComponent size={24} className="rr-occasion-tile__svg" />
            </span>
            <span className="rr-occasion-tile__name">{o.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
