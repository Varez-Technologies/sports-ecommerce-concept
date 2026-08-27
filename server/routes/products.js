import express from 'express'
import { db } from '../db.js'

const router = express.Router()

// GET /api/products  — optional filters: ?brand= ?category= ?q=
router.get('/', (req, res) => {
  const { brand, category, q } = req.query
  const clauses = []
  const params = []

  if (brand) {
    clauses.push('brandId = ?')
    params.push(brand)
  }
  if (category) {
    clauses.push('category = ?')
    params.push(category)
  }
  if (q) {
    const like = `%${String(q).toLowerCase()}%`
    clauses.push(
      '(LOWER(name) LIKE ? OR LOWER(brand) LIKE ? OR LOWER(category) LIKE ? OR LOWER(description) LIKE ?)',
    )
    params.push(like, like, like, like)
  }

  const where = clauses.length ? ` WHERE ${clauses.join(' AND ')}` : ''
  const rows = db.prepare(`SELECT * FROM products${where} ORDER BY brandId, category`).all(...params)
  res.json(rows)
})

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  res.json(product)
})

export default router
