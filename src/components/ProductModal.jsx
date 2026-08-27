import { useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

/**
 * Product detail modal. Controlled by the parent via `isOpen` / `onClose`.
 * Closes on Escape, on backdrop click, and locks body scroll while open.
 */
export default function ProductModal({ product, isOpen, onClose }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const wished = has(product.id)

  const handleAddToCart = () => {
    addItem(product)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full px-3 py-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ×
          </button>
        </div>
        <div className="grid gap-6 px-6 pb-8 sm:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              {product.brand} · {product.category}
            </span>
            <h2 className="mt-1 text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${product.price}
            </p>
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Details
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => toggle(product)}
                aria-pressed={wished}
                className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <span className={wished ? 'text-red-500' : ''}>{wished ? '♥ Saved' : '♡ Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
