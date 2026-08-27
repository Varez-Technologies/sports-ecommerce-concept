import { useState, useEffect } from 'react'

/**
 * Like useState, but mirrors the value to localStorage under `key` so it
 * survives reloads. Used for the cart and wishlist today; when the backend
 * arrives, those contexts can sync to the API instead.
 */
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore quota or serialization errors — persistence is best-effort.
    }
  }, [key, value])

  return [value, setValue]
}
