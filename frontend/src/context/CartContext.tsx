import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '../api/products'

type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  add: (product: Product, qty?: number) => void
  remove: (productId: number) => void
  update: (productId: number, qty: number) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'apple_store_cart'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) as CartItem[] : []
    } catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id)
      if (found) {
        return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { product, quantity: qty }]
    })
  }

  const remove = (productId: number) => setItems((prev) => prev.filter((i) => i.product.id !== productId))

  const update = (productId: number, qty: number) => setItems((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i))

  const clear = () => setItems([])

  const total = items.reduce((s, it) => s + (it.product.price || 0) * it.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
