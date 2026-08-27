import { products as localProducts } from '../data/products.js'

const API_BASE = '/api'

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`API request failed (${res.status}): ${path}`)
  return res.json()
}

export async function getAllProducts() {
  try {
    return await getJSON('/products')
  } catch (e) {
    console.warn('API server unavailable, using local product catalog fallback:', e.message)
    return localProducts
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`API request failed (${res.status})`)
    return await res.json()
  } catch (e) {
    console.warn('API server unavailable, using local product lookup fallback:', e.message)
    return localProducts.find((p) => p.id === id) ?? null
  }
}

export async function getProductsByBrand(brandId) {
  try {
    return await getJSON(`/products?brand=${encodeURIComponent(brandId)}`)
  } catch (e) {
    console.warn('API server unavailable, using local brand filter fallback:', e.message)
    return localProducts.filter((p) => p.brandId === brandId)
  }
}

export async function searchProducts(query) {
  try {
    const q = (query ?? '').trim()
    return await getJSON(`/products?q=${encodeURIComponent(q)}`)
  } catch (e) {
    console.warn('API server unavailable, using local search fallback:', e.message)
    const q = (query ?? '').trim().toLowerCase()
    if (!q) return localProducts
    return localProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    )
  }
}
