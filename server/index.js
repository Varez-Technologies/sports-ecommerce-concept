import express from 'express'
import cors from 'cors'
import { seedIfEmpty } from './seed.js'
import productsRouter from './routes/products.js'
import brandsRouter from './routes/brands.js'

// Create tables (db.js) and populate them if the database is empty.
seedIfEmpty()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/products', productsRouter)
app.use('/api/brands', brandsRouter)

app.listen(PORT, () => {
  console.log(`Wilson Sporting Goods API running on http://localhost:${PORT}`)
})
