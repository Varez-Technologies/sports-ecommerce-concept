import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts } from '../services/productService.js'
import { brands } from '../data/brands.js'
import ProductCard from '../components/ProductCard.jsx'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

function sortProducts(list, sort) {
  switch (sort) {
    case 'price-asc':
      return [...list].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...list].sort((a, b) => b.price - a.price)
    case 'name-asc':
      return [...list].sort((a, b) => a.name.localeCompare(b.name))
    default:
      return list
  }
}

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {options.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={selected.includes(o.value)}
                onChange={() => onToggle(o.value)}
                className="accent-emerald-600"
              />
              {o.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('q') ?? ''

  const [allProducts, setAllProducts] = useState([])
  const [query, setQuery] = useState(queryParam)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sort, setSort] = useState('featured')
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    getAllProducts()
      .then((list) => {
        if (active) setAllProducts(list)
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [])

  // Reflect the navbar search (?q=) into the local filter state.
  useEffect(() => {
    setQuery(queryParam)
  }, [queryParam])

  const categories = useMemo(
    () => [...new Set(allProducts.map((p) => p.category))].sort(),
    [allProducts],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = allProducts.filter((p) => {
      if (
        q &&
        !`${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q)
      ) {
        return false
      }
      if (selectedBrands.length && !selectedBrands.includes(p.brandId)) return false
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false
      return true
    })
    return sortProducts(filtered, sort)
  }, [allProducts, query, selectedBrands, selectedCategories, sort])

  const toggleValue = (value, list, setList) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const hasFilters =
    Boolean(query.trim()) || selectedBrands.length > 0 || selectedCategories.length > 0

  const clearAll = () => {
    setQuery('')
    setSelectedBrands([])
    setSelectedCategories([])
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Shop</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[15rem_1fr]">
        <aside className="space-y-6">
          <div>
            <label htmlFor="shop-search" className="text-sm font-semibold">
              Search
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
          <FilterGroup
            title="Brand"
            options={brands.map((b) => ({ value: b.id, label: b.name }))}
            selected={selectedBrands}
            onToggle={(v) => toggleValue(v, selectedBrands, setSelectedBrands)}
          />
          <FilterGroup
            title="Category"
            options={categories.map((c) => ({ value: c, label: c }))}
            selected={selectedCategories}
            onToggle={(v) => toggleValue(v, selectedCategories, setSelectedCategories)}
          />
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-emerald-600 transition hover:underline dark:text-emerald-400"
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {results.length} product{results.length === 1 ? '' : 's'}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="py-20 text-center text-red-500">
              Couldn’t load products — make sure the API server is running.
            </p>
          ) : results.length === 0 ? (
            <p className="py-20 text-center text-gray-500 dark:text-gray-400">
              No products match your filters.
            </p>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
