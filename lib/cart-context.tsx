'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import type { ExtendedDish } from './dishes-extended'

/* ── Types ─────────────────────────────────────────────── */

export type CartItem = {
  dish: ExtendedDish
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; dish: ExtendedDish }
  | { type: 'REMOVE_ITEM'; dishId: string }
  | { type: 'UPDATE_QUANTITY'; dishId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] }

/* ── Reducer ───────────────────────────────────────────── */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.dish.id === action.dish.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.dish.id === action.dish.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return { items: [...state.items, { dish: action.dish, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.dish.id !== action.dishId) }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.dish.id !== action.dishId) }
      }
      return {
        items: state.items.map((i) =>
          i.dish.id === action.dishId ? { ...i, quantity: action.quantity } : i,
        ),
      }
    }
    case 'CLEAR_CART':
      return { items: [] }
    case 'HYDRATE':
      return { items: action.items }
    default:
      return state
  }
}

/* ── Context ───────────────────────────────────────────── */

type CartContextValue = {
  items: CartItem[]
  addItem: (dish: ExtendedDish) => void
  removeItem: (dishId: string) => void
  updateQuantity: (dishId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  getItemQuantity: (dishId: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

/* ── Provider ──────────────────────────────────────────── */

const STORAGE_KEY = 'rasoi-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed })
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const addItem = useCallback(
    (dish: ExtendedDish) => dispatch({ type: 'ADD_ITEM', dish }),
    [],
  )
  const removeItem = useCallback(
    (dishId: string) => dispatch({ type: 'REMOVE_ITEM', dishId }),
    [],
  )
  const updateQuantity = useCallback(
    (dishId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', dishId, quantity }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.dish.price * i.quantity,
    0,
  )
  const getItemQuantity = useCallback(
    (dishId: string) => state.items.find((i) => i.dish.id === dishId)?.quantity ?? 0,
    [state.items],
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ── Hook ──────────────────────────────────────────────── */

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
