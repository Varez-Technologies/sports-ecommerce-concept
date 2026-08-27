import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      {/* Promo bar (replaces the old <marquee>) */}
      <div className="flex items-center justify-between gap-2 bg-gray-900 px-4 py-1.5 text-xs text-gray-200 sm:text-sm dark:bg-black">
        <p className="font-medium">Free shipping on orders over $80</p>
        <Link to="/about#faqs" className="shrink-0 hover:text-white hover:underline">
          Help
        </Link>
      </div>

      {/* Logo */}
      <div className="flex justify-center bg-white py-6 dark:bg-gray-950">
        <Link to="/" aria-label="Wilson Sporting Goods home">
          <img
            src="/img/logo2.png"
            alt="Wilson Sporting Goods"
            className="h-20 w-auto md:h-28"
          />
        </Link>
      </div>
    </>
  )
}
