import { db } from './db.js'
import { products } from '../src/data/products.js'
import { brands } from '../src/data/brands.js'

/** Populate the database from the catalog files. Idempotent (INSERT OR REPLACE). */
export function seed() {
  const insertBrand = db.prepare(
    'INSERT OR REPLACE INTO brands (id, name, type, logo, banner) VALUES (?, ?, ?, ?, ?)',
  )
  for (const b of brands) {
    insertBrand.run(b.id, b.name, b.type, b.logo, b.banner)
  }

  const insertProduct = db.prepare(
    `INSERT OR REPLACE INTO products
       (id, name, brand, brandId, category, price, image, hoverImage, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const p of products) {
    insertProduct.run(
      p.id,
      p.name,
      p.brand,
      p.brandId,
      p.category,
      p.price,
      p.image,
      p.hoverImage,
      p.description,
    )
  }

  return { brands: brands.length, products: products.length }
}

/** Seed only when the database is empty — called on server startup. */
export function seedIfEmpty() {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM products').get()
  if (count === 0) {
    const result = seed()
    console.log(`Seeded database: ${result.products} products, ${result.brands} brands.`)
  }
}

// `npm run seed` (running this file directly) forces a full reseed.
if (process.argv[1] === import.meta.filename) {
  const result = seed()
  console.log(`Reseeded database: ${result.products} products, ${result.brands} brands.`)
}
