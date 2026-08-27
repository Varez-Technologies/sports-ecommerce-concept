import { Link } from 'react-router-dom'
import { brands } from '../data/brands.js'

const sportsBrands = brands.filter((b) => b.type === 'Sports')
const clothesBrands = brands.filter((b) => b.type === 'Clothes')

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Wilson Sporting Goods</h3>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            An American sports equipment manufacturer based in Chicago, Illinois — gear for
            cricket, soccer, basketball and the athletes who love them.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Sports Brands</h3>
          <ul className="space-y-2 text-sm">
            {sportsBrands.map((b) => (
              <li key={b.id}>
                <Link to={`/brand/${b.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Clothes Brands</h3>
          <ul className="space-y-2 text-sm">
            {clothesBrands.map((b) => (
              <li key={b.id}>
                <Link to={`/brand/${b.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Chicago, Illinois, U.S.</li>
            <li>
              <a href="mailto:wilson-sports@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                wilson-sports@gmail.com
              </a>
            </li>
            <li>+ 01 234 567 88</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Wilson Sporting Goods — practice project.
      </div>
    </footer>
  )
}
