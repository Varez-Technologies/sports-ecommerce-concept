/** Small −/+ quantity control. */
export default function QuantityStepper({ quantity, onChange, min = 1 }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="px-2.5 py-1 text-lg leading-none transition hover:text-emerald-600 disabled:opacity-30"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="px-2.5 py-1 text-lg leading-none transition hover:text-emerald-600"
      >
        +
      </button>
    </div>
  )
}
