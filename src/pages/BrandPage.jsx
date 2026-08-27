import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBrand } from '../data/brands.js'
import { getProductsByBrand } from '../services/productService.js'
import ProductCard from '../components/ProductCard.jsx'

export default function BrandPage() {
  const { brandId } = useParams()
  const brand = getBrand(brandId)
  const [products, setProducts] = useState(null) // null = loading
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setProducts(null)
    setError(false)
    getProductsByBrand(brandId)
      .then((list) => {
        if (active) setProducts(list)
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [brandId])

  if (!brand) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Brand not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-emerald-600 hover:underline dark:text-emerald-400"
        >
          Back to home
        </Link>
      </section>
    )
  }

  // Group products by category, preserving first-seen order.
  const grouped = (products ?? []).reduce((acc, p) => {
    ;(acc[p.category] ??= []).push(p)
    return acc
  }, {})
  const categories = Object.keys(grouped)

  return (
    <>
      <div className="relative h-48 sm:h-64">
        <img
          src={brand.banner}
          alt={brand.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
          <h1 className="text-4xl font-bold text-white drop-shadow sm:text-5xl">
            {brand.name}
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12">
        {error && (
          <p className="py-12 text-center text-red-500">
            Couldn’t load products — make sure the API server is running.
          </p>
        )}

        {!error && products === null && (
          <p className="py-12 text-center text-gray-500 dark:text-gray-400">
            Loading products…
          </p>
        )}

        {!error && products && products.length === 0 && (
          <p className="py-12 text-center text-gray-500 dark:text-gray-400">
            No products available for this brand yet.
          </p>
        )}

        {!error &&
          products &&
          categories.map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold dark:border-gray-800">
                {cat}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {grouped[cat].map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  )
}
