import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import QuantityStepper from './QuantityStepper.jsx'

/** Slide-in cart panel. Rendered once in Layout; opened via the navbar cart button. */
export default function CartDrawer() {
  const {
    items,
    drawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
  } = useCart()

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-lg font-bold">Your Cart ({itemCount})</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="rounded-full px-3 py-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={closeDrawer}
                className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
              >
                Browse products
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3 border-b border-gray-100 p-4 dark:border-gray-800"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="shrink-0 text-gray-400 transition hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <QuantityStepper
                      quantity={quantity}
                      onChange={(q) => updateQuantity(product.id, q)}
                    />
                    <span className="text-sm font-bold">${product.price * quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="flex justify-between text-base font-bold">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Shipping calculated at checkout.
            </p>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="mt-3 block rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-medium text-white transition hover:bg-emerald-700"
            >
              View Cart &amp; Checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  )
}
