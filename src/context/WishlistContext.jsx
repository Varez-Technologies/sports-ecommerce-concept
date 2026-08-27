import { createContext, useContext, useCallback, useMemo } from 'react'
import { usePersistentState } from '../hooks/usePersistentState.js'

const WishlistContext = createContext(null)

/** Wishlist stores full product objects, persisted to localStorage. */
export function WishlistProvider({ children }) {
  const [items, setItems] = usePersistentState('wsg-wishlist', [])

  const toggle = useCallback(
    (product) => {
      setItems((current) =>
        current.some((p) => p.id === product.id)
          ? current.filter((p) => p.id !== product.id)
          : [...current, product],
      )
    },
    [setItems],
  )

  const remove = useCallback(
    (productId) => {
      setItems((current) => current.filter((p) => p.id !== productId))
    },
    [setItems],
  )

  const has = useCallback((productId) => items.some((p) => p.id === productId), [items])

  const value = useMemo(
    () => ({ items, toggle, remove, has, count: items.length }),
    [items, toggle, remove, has],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
