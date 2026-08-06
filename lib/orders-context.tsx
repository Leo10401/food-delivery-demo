'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import type { CartItem } from './cart-context'

/* ── Types ─────────────────────────────────────────────── */

export type OrderStatus = 'Placed' | 'Preparing' | 'On the way' | 'Delivered'

export type Order = {
  id: string
  items: CartItem[]
  total: number
  deliveryFee: number
  tax: number
  grandTotal: number
  status: OrderStatus
  timestamp: number
  estimatedDelivery: string
}

type OrdersState = {
  orders: Order[]
}

type OrdersAction =
  | { type: 'PLACE_ORDER'; order: Order }
  | { type: 'UPDATE_STATUS'; orderId: string; status: OrderStatus }
  | { type: 'HYDRATE'; orders: Order[] }

/* ── Reducer ───────────────────────────────────────────── */

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'PLACE_ORDER':
      return { orders: [action.order, ...state.orders] }
    case 'UPDATE_STATUS':
      return {
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, status: action.status } : o,
        ),
      }
    case 'HYDRATE':
      return { orders: action.orders }
    default:
      return state
  }
}

/* ── Context ───────────────────────────────────────────── */

type OrdersContextValue = {
  orders: Order[]
  placeOrder: (items: CartItem[], total: number) => Order
  updateStatus: (orderId: string, status: OrderStatus) => void
  activeOrders: Order[]
  pastOrders: Order[]
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

/* ── Provider ──────────────────────────────────────────── */

const STORAGE_KEY = 'rasoi-orders'

function generateId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [] })

  // Hydrate
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', orders: parsed })
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.orders))
    } catch {
      // ignore
    }
  }, [state.orders])

  const placeOrder = useCallback(
    (items: CartItem[], subtotal: number): Order => {
      const deliveryFee = subtotal >= 500 ? 0 : 40
      const tax = Math.round(subtotal * 0.05)
      const grandTotal = subtotal + deliveryFee + tax

      const order: Order = {
        id: generateId(),
        items: [...items],
        total: subtotal,
        deliveryFee,
        tax,
        grandTotal,
        status: 'Placed',
        timestamp: Date.now(),
        estimatedDelivery: '30–40 min',
      }

      dispatch({ type: 'PLACE_ORDER', order })

      // Simulate status progression
      setTimeout(() => {
        dispatch({ type: 'UPDATE_STATUS', orderId: order.id, status: 'Preparing' })
      }, 5000)
      setTimeout(() => {
        dispatch({ type: 'UPDATE_STATUS', orderId: order.id, status: 'On the way' })
      }, 15000)
      setTimeout(() => {
        dispatch({ type: 'UPDATE_STATUS', orderId: order.id, status: 'Delivered' })
      }, 30000)

      return order
    },
    [],
  )

  const updateStatus = useCallback(
    (orderId: string, status: OrderStatus) =>
      dispatch({ type: 'UPDATE_STATUS', orderId, status }),
    [],
  )

  const activeOrders = state.orders.filter((o) => o.status !== 'Delivered')
  const pastOrders = state.orders.filter((o) => o.status === 'Delivered')

  return (
    <OrdersContext.Provider
      value={{ orders: state.orders, placeOrder, updateStatus, activeOrders, pastOrders }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

/* ── Hook ──────────────────────────────────────────────── */

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider')
  return ctx
}
