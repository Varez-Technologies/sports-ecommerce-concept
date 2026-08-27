import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { brands } from '../data/brands.js'
import { getAllProducts } from '../services/productService.js'

const carouselSlides = [
  { image: '/img/carousel/cricket3.jpg', alt: 'Cricket equipment' },
  { image: '/img/carousel/soccer1.jpg', alt: 'Soccer equipment' },
  { image: '/img/carousel/basketball2.jpg', alt: 'Basketball equipment' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    let active = true
    getAllProducts()
      .then((all) => {
        if (!active) return
        // One featured product per brand.
        const picks = brands
          .map((b) => all.find((p) => p.brandId === b.id))
          .filter(Boolean)
        setFeatured(picks)
      })
      .catch(() => {
        if (active) setFeatured([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Carousel slides={carouselSlides} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold">Shop by Brand</h2>
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Sports equipment and athletic apparel from six brands.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <Link
              key={b.id}
              to={`/brand/${b.id}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <img
                src={b.banner}
                alt={b.name}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-end p-4"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.05))',
                }}
              >
                <div>
                  <h3 className="text-lg font-bold text-white">{b.name}</h3>
                  <p className="text-sm text-gray-200">{b.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <h2 className="text-center text-3xl font-bold">Featured Products</h2>
            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
              A pick from every brand.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
