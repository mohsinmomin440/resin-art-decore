import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Grid } from './svg'
import ProductCard from './ProductCard'
import { CATEGORIES } from '../data/categories'
import { shopProducts } from '../data/products'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'name', label: 'Name A–Z' },
  { id: 'newest', label: 'Newest first' },
]

export default function ProductGrid() {
  const [searchParams] = useSearchParams()
  const paramCat = searchParams.get('category')
  const [category, setCategory] = useState(
    paramCat && CATEGORIES.includes(paramCat) ? paramCat : 'All',
  )
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = category === 'All' ? shopProducts : shopProducts.filter((p) => p.category === category)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'newest') list = [...list].sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0))
    return list
  }, [category, sort])

  return (
    <div className="rr-shop">
      <div className="rr-shop__toolbar">
        <button
          type="button"
          className="rr-shop__filters-toggle"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
        >
          <Filter size={16} /> Filters
        </button>

        <div className="rr-shop__count">
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
        </div>

        <label className="rr-shop__sort">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      {filtersOpen && (
        <div className="rr-shop__filters">
          <span className="rr-shop__filters-label">Category</span>
          <div className="rr-shop__chips">
            <button
              type="button"
              className={`rr-chip${category === 'All' ? ' is-active' : ''}`}
              onClick={() => setCategory('All')}
            >All</button>
            {CATEGORIES.map((c) => {
              const count = shopProducts.filter((p) => p.category === c).length
              if (count === 0) return null
              return (
                <button
                  key={c}
                  type="button"
                  className={`rr-chip${category === c ? ' is-active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c} <span className="rr-chip__n">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rr-empty">
          <Grid size={48} className="rr-empty__icon" />
          <h2>No products here yet</h2>
          <p>There are no products in this category. Browse everything or order a custom piece.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}