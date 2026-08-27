import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { usePersistentState } from '../hooks/usePersistentState.js'

const CartContext = createContext(null)

/** Cart items are stored as { product, quantity } and persisted to localStorage. */
export function CartProvider({ children }) {
  const [items, setItems] = usePersistentState('wsg-cart', [])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const addItem = useCallback(
    (product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((it) => it.product.id === product.id)
        if (existing) {
          return current.map((it) =>
            it.product.id === product.id
              ? { ...it, quantity: it.quantity + quantity }
              : it,
          )
        }
        return [...current, { product, quantity }]
      })
      setDrawerOpen(true)
    },
    [setItems],
  )

  const removeItem = useCallback(
    (productId) => {
      setItems((current) => current.filter((it) => it.product.id !== productId))
    },
    [setItems],
  )

  const updateQuantity = useCallback(
    (productId, quantity) => {
      setItems((current) =>
        quantity <= 0
          ? current.filter((it) => it.product.id !== productId)
          : current.map((it) =>
              it.product.id === productId ? { ...it, quantity } : it,
            ),
      )
    },
    [setItems],
  )

  const clearCart = useCallback(() => setItems([]), [setItems])

  const itemCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, drawerOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
