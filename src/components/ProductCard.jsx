import { useState } from 'react'
import ProductModal from './ProductModal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { getAssetUrl } from '../utils/assetHelper.js'

/** A product tile: image hover-swap, wishlist toggle, add-to-cart, and detail modal. */
export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()

  const wished = has(product.id)
  const showHover = hovered && product.hoverImage

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="block aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
            aria-label={`View details for ${product.name}`}
          >
            <img
              src={getAssetUrl(showHover ? product.hoverImage : product.image)}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getAssetUrl('/img/Comparison/No_Image.png');
              }}
            />
          </button>
          <button
            type="button"
            onClick={() => toggle(product)}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-lg leading-none shadow transition hover:scale-110 dark:bg-gray-900/90"
          >
            <span className={wished ? 'text-red-500' : 'text-gray-400'}>
              {wished ? '♥' : '♡'}
            </span>
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {product.category}
          </span>
          <h3 className="mt-1 font-semibold leading-snug">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <span className="text-lg font-bold">${product.price}</span>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>
      <ProductModal product={product} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
