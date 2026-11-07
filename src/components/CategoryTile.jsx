import { Link } from 'react-router-dom'
import { productImage } from '../utils/productImage'
import { ArrowRight } from './svg'
import { shopProducts } from '../data/products'

export default function CategoryTile({ category }) {
  const first = shopProducts.find((p) => p.category === category)
  if (!first) return null
  const photo = productImage(first.slug, 1, 800)

  return (
    <Link to={`/shop?category=${encodeURIComponent(category)}`} className="rr-category-tile">
      <img src={photo} alt={category} className="rr-category-tile__photo" loading="lazy" />
      <div className="rr-category-tile__overlay">
        <span className="rr-category-tile__name">{category}</span>
        <span className="rr-category-tile__explore">Explore <ArrowRight size={13} /></span>
      </div>
    </Link>
  )
}