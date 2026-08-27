import express from 'express'
import { db } from '../db.js'

const router = express.Router()

// GET /api/brands
router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT * FROM brands').all())
})

// GET /api/brands/:id
router.get('/:id', (req, res) => {
  const brand = db.prepare('SELECT * FROM brands WHERE id = ?').get(req.params.id)
  if (!brand) {
    res.status(404).json({ error: 'Brand not found' })
    return
  }
  res.json(brand)
})

export default router
