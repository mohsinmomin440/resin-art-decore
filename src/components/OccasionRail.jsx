import { Link } from 'react-router-dom'
import { OCCASIONS, OCCASION_CATEGORIES } from '../data/occasions'
import { shopProducts } from '../data/products'

export default function OccasionRail() {
  return (
    <div className="rr-occasion-rail">
      {OCCASIONS.map((o) => {
        const cats = OCCASION_CATEGORIES[o.id] || []
        const first = shopProducts.find((p) => cats.includes(p.category))
        return (
          <Link key={o.id} to={first ? `/shop?category=${encodeURIComponent(first.category)}` : '/shop'} className="rr-occasion-tile">
            <span className="rr-occasion-tile__emoji" aria-hidden>{o.emoji}</span>
            <span className="rr-occasion-tile__name">{o.name}</span>
          </Link>
        )
      })}
    </div>
  )
}