import { useState } from 'react'

/**
 * Single-open accordion. `items` is an array of { question, answer }.
 * Resets to all-closed whenever the items change (e.g. switching FAQ category).
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left font-medium transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <span>{item.question}</span>
              <span
                className={`shrink-0 text-2xl leading-none text-emerald-600 transition-transform duration-200 dark:text-emerald-400 ${
                  open ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {open && (
              <div className="px-4 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
