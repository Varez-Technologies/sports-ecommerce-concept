import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/productService.js'
import { brands } from '../data/brands.js'

function ProductSelector({ products, selectedId, onSelect, label }) {
  const product = products.find((p) => p.id === selectedId) ?? null

  return (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
      >
        <option value="">— Select a product —</option>
        {brands.map((b) => (
          <optgroup key={b.id} label={b.name}>
            {products
              .filter((p) => p.brandId === b.id)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>

      {product ? (
        <div className="mt-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
          />
          <h3 className="mt-3 text-lg font-bold">{product.name}</h3>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ${product.price}
          </p>
          <dl className="mt-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 py-1.5 dark:border-gray-800">
              <dt className="text-gray-500 dark:text-gray-400">Brand</dt>
              <dd>{product.brand}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-1.5 dark:border-gray-800">
              <dt className="text-gray-500 dark:text-gray-400">Category</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
        </div>
      ) : (
        <div className="mt-4 flex aspect-square items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 dark:border-gray-700">
          No product selected
        </div>
      )}
    </div>
  )
}

export default function Comparison() {
  const [products, setProducts] = useState([])
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')

  useEffect(() => {
    let active = true
    getAllProducts()
      .then((list) => {
        if (active) setProducts(list)
      })
      .catch(() => {
        // Leave the product list empty; the selectors simply show no options.
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-center text-3xl font-bold">Compare Products</h1>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
        Pick two products to see them side by side.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ProductSelector products={products} selectedId={first} onSelect={setFirst} label="Product 1" />
        <ProductSelector products={products} selectedId={second} onSelect={setSecond} label="Product 2" />
      </div>
    </section>
  )
}
