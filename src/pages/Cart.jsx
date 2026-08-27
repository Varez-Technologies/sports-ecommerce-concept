import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { getAssetUrl } from '../utils/assetHelper.js'

const FREE_SHIPPING_THRESHOLD = 80
const SHIPPING_FEE = 9

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">Your cart is empty.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          Browse products
        </Link>
      </section>
    )
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Your Cart ({itemCount})</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <img
                src={getAssetUrl(product.image)}
                alt={product.name}
                className="h-24 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="h-fit text-sm text-red-500 transition hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <QuantityStepper
                    quantity={quantity}
                    onChange={(q) => updateQuantity(product.id, q)}
                  />
                  <span className="font-bold">${product.price * quantity}</span>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-gray-500 transition hover:text-red-500 hover:underline"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 p-6 dark:border-gray-800">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Subtotal</dt>
              <dd>${subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : `$${shipping}`}</dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Add ${FREE_SHIPPING_THRESHOLD - subtotal} more for free shipping.
              </p>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-700">
              <dt>Total</dt>
              <dd>${total}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700"
          >
            Proceed to Checkout
          </button>
          <p className="mt-2 text-center text-xs text-gray-400">
            Checkout connects once the backend is added.
          </p>
        </aside>
      </div>
    </section>
  )
}
