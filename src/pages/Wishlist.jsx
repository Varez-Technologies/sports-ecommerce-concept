import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          You haven&apos;t saved any products yet. Tap the ♡ on a product to add it here.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Your Wishlist ({items.length})</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Tap the ♥ on a card to remove it.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
