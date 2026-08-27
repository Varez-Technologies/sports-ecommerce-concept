import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/** Navbar search box. Submitting sends the user to /shop with the query. */
export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }

  return (
    <form onSubmit={onSubmit} className={`flex items-center ${className}`} role="search">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-900"
      />
      <button
        type="submit"
        aria-label="Search"
        className="rounded-r-lg border border-l-0 border-gray-300 bg-emerald-600 px-3 py-1.5 text-sm text-white transition hover:bg-emerald-700 dark:border-gray-700"
      >
        🔍
      </button>
    </form>
  )
}
