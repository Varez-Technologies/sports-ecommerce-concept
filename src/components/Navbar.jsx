import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import { brands } from '../data/brands.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

const sportsBrands = brands.filter((b) => b.type === 'Sports')
const clothesBrands = brands.filter((b) => b.type === 'Clothes')

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 font-medium transition hover:text-emerald-600 dark:hover:text-emerald-400 ${
    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-200'
  }`

const iconButtonClass =
  'relative rounded-full p-2 text-xl leading-none text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'

function CountBadge({ count }) {
  if (!count) return null
  return (
    <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
      {count > 99 ? '99+' : count}
    </span>
  )
}

function DesktopDropdown({ label, items }) {
  return (
    <li className="group relative">
      <button className="flex items-center gap-1 px-3 py-2 font-medium text-gray-700 transition hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400">
        {label}
        <span className="text-xs">▾</span>
      </button>
      <ul className="invisible absolute left-0 top-full z-30 min-w-48 overflow-hidden rounded-lg border border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-900">
        {items.map((b) => (
          <li key={b.id}>
            <Link
              to={`/brand/${b.id}`}
              className="block px-4 py-2.5 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
            >
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)
  const { itemCount, openDrawer } = useCart()
  const { count: wishlistCount } = useWishlist()

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5">
        <button
          type="button"
          className="rounded p-2 text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          <DesktopDropdown label="Sports" items={sportsBrands} />
          <DesktopDropdown label="Clothes" items={clothesBrands} />
          <li><NavLink to="/shop" className={navLinkClass}>Shop</NavLink></li>
          <li><NavLink to="/compare" className={navLinkClass}>Compare</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink></li>
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <SearchBar className="hidden w-52 md:flex" />
          <NavLink to="/wishlist" className={iconButtonClass} aria-label="Wishlist" title="Wishlist">
            ♡
            <CountBadge count={wishlistCount} />
          </NavLink>
          <button type="button" onClick={openDrawer} className={iconButtonClass} aria-label="Open cart" title="Cart">
            🛒
            <CountBadge count={itemCount} />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {mobileOpen && (
        <div className="space-y-3 border-t border-gray-200 px-4 py-3 lg:hidden dark:border-gray-800">
          <SearchBar />
          <ul className="space-y-1">
            <li className="pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Sports</li>
            {sportsBrands.map((b) => (
              <li key={b.id}>
                <Link to={`/brand/${b.id}`} className="block py-1.5 pl-3 text-gray-700 dark:text-gray-200" onClick={closeMobile}>
                  {b.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Clothes</li>
            {clothesBrands.map((b) => (
              <li key={b.id}>
                <Link to={`/brand/${b.id}`} className="block py-1.5 pl-3 text-gray-700 dark:text-gray-200" onClick={closeMobile}>
                  {b.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/shop" className="block py-1.5 font-medium text-gray-700 dark:text-gray-200" onClick={closeMobile}>Shop</Link>
            </li>
            <li>
              <Link to="/compare" className="block py-1.5 font-medium text-gray-700 dark:text-gray-200" onClick={closeMobile}>Compare</Link>
            </li>
            <li>
              <Link to="/about" className="block py-1.5 font-medium text-gray-700 dark:text-gray-200" onClick={closeMobile}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-1.5 font-medium text-gray-700 dark:text-gray-200" onClick={closeMobile}>Contact Us</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
