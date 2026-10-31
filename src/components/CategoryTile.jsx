import { Link } from 'react-router-dom'
import { productImage } from '../utils/productImage'
import { shopProducts } from '../data/products'
import { Grid } from './svg'

export default function CategoryTile({ category }) {
  const first = shopProducts.find((p) => p.category === category)
  if (!first) return null
  const photo = productImage(first.slug, 1, 800)

  return (
    <Link to={`/shop?category=${encodeURIComponent(category)}`} className="rr-category-tile">
      <img src={photo} alt={category} className="rr-category-tile__photo" loading="lazy" />
      <div className="rr-category-tile__overlay">
        <span className="rr-category-tile__icon"><Grid size={20} /></span>
        <span className="rr-category-tile__name">{category}</span>
        <span className="rr-category-tile__explore">Explore</span>
      </div>
    </Link>
  )
}