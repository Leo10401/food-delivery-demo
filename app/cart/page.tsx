'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { useOrders } from '@/lib/orders-context'

export default function CartPage() {
  const router = useRouter()
  const { items, addItem, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const { placeOrder } = useOrders()

  const deliveryFee = totalPrice >= 500 ? 0 : 40
  const tax = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + tax

  function handlePlaceOrder() {
    if (items.length === 0) return
    placeOrder(items, totalPrice)
    clearCart()
    router.push('/orders')
  }

  return (
    <main className="min-h-svh bg-background pb-24 pt-20 md:pt-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-chili">
            Your Cart
          </p>
          <h1 className="font-display text-4xl text-foreground text-balance md:text-5xl">
            Ready to feast?
          </h1>
        </motion.div>

        {items.length === 0 ? (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 py-20 text-center"
          >
            <span className="flex size-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </span>
            <div>
              <h2 className="font-display text-2xl text-foreground">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Looks like you haven&apos;t added anything yet. The tandoor is waiting!
              </p>
            </div>
            <Link
              href="/menu"
              className="flex items-center gap-2 rounded-full bg-chili px-6 py-3 font-semibold text-chili-foreground transition-transform hover:scale-105"
            >
              Browse Menu
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* ── Cart Items ── */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                </p>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-xs font-medium text-chili hover:underline"
                >
                  <Trash2 className="size-3" />
                  Clear all
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.dish.id}
                    layout
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item.dish.image || '/placeholder.svg'}
                        alt={item.dish.name}
                        className="size-full object-cover"
                      />
                      <span
                        className={`absolute left-1 top-1 flex size-4 items-center justify-center rounded-sm border bg-card ${
                          item.dish.veg ? 'border-leaf' : 'border-chili'
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${item.dish.veg ? 'bg-leaf' : 'bg-chili'}`} />
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-bold leading-tight">{item.dish.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.dish.hindi}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          ₹{item.dish.price * item.quantity}
                        </span>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              item.quantity === 1
                                ? removeItem(item.dish.id)
                                : updateQuantity(item.dish.id, item.quantity - 1)
                            }
                            className="flex size-7 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-chili hover:text-chili-foreground hover:border-chili"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="size-3" />
                            ) : (
                              <Minus className="size-3" />
                            )}
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item.dish)}
                            className="flex size-7 items-center justify-center rounded-full bg-chili text-chili-foreground transition-transform hover:scale-110"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Order Summary ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-fit rounded-3xl bg-card p-6 shadow-sm lg:sticky lg:top-24"
            >
              <h2 className="mb-5 font-display text-xl">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-leaf' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{500 - totalPrice} more for free delivery
                  </p>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                <div className="my-2 border-t border-border" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-chili">₹{grandTotal}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="mt-5 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-chili focus:outline-none focus:ring-2 focus:ring-chili/20"
                  />
                </div>
                <button className="rounded-xl border border-marigold px-4 text-sm font-semibold text-marigold transition-colors hover:bg-marigold hover:text-marigold-foreground">
                  Apply
                </button>
              </div>

              {/* Place order */}
              <button
                onClick={handlePlaceOrder}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-chili py-4 text-lg font-semibold text-chili-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Place Order
                <ArrowRight className="size-5" />
              </button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Your first delivery is free! 🎉
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}
