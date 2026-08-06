'use client'

import { motion } from 'motion/react'
import {
  ClipboardList,
  Package,
  CookingPot,
  Bike,
  CheckCircle2,
  RotateCcw,
  Clock,
} from 'lucide-react'
import { useOrders, type OrderStatus } from '@/lib/orders-context'
import { useCart } from '@/lib/cart-context'
import { allDishes } from '@/lib/dishes-extended'
import Link from 'next/link'

const statusSteps: { status: OrderStatus; icon: typeof Package; label: string }[] = [
  { status: 'Placed', icon: Package, label: 'Order Placed' },
  { status: 'Preparing', icon: CookingPot, label: 'Preparing' },
  { status: 'On the way', icon: Bike, label: 'On the Way' },
  { status: 'Delivered', icon: CheckCircle2, label: 'Delivered' },
]

function getStepIndex(status: OrderStatus) {
  return statusSteps.findIndex((s) => s.status === status)
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export default function OrdersPage() {
  const { activeOrders, pastOrders } = useOrders()
  const { addItem } = useCart()

  function reorder(items: { dish: { id: string } }[]) {
    items.forEach((item) => {
      const dish = allDishes.find((d) => d.id === item.dish.id)
      if (dish) addItem(dish)
    })
  }

  const hasOrders = activeOrders.length > 0 || pastOrders.length > 0

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
            Your Orders
          </p>
          <h1 className="font-display text-4xl text-foreground text-balance md:text-5xl">
            Track your feast
          </h1>
        </motion.div>

        {!hasOrders ? (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 py-20 text-center"
          >
            <span className="flex size-24 items-center justify-center rounded-full bg-secondary">
              <ClipboardList className="size-10 text-muted-foreground" />
            </span>
            <div>
              <h2 className="font-display text-2xl text-foreground">No orders yet</h2>
              <p className="mt-2 text-muted-foreground">
                Once you place an order, you&apos;ll see it here with live tracking.
              </p>
            </div>
            <Link
              href="/menu"
              className="rounded-full bg-chili px-6 py-3 font-semibold text-chili-foreground transition-transform hover:scale-105"
            >
              Start Ordering
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* ── Active Orders ── */}
            {activeOrders.length > 0 && (
              <section>
                <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-chili">
                  <Clock className="size-4" />
                  Active Orders
                </h2>
                <div className="flex flex-col gap-6">
                  {activeOrders.map((order, i) => {
                    const currentStep = getStepIndex(order.status)
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-3xl bg-card p-6 shadow-sm"
                      >
                        {/* Order header */}
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              {order.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.timestamp)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-chili">₹{order.grandTotal}</p>
                            <p className="text-xs text-muted-foreground">
                              Est. {order.estimatedDelivery}
                            </p>
                          </div>
                        </div>

                        {/* Status stepper */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between">
                            {statusSteps.map((step, si) => {
                              const isActive = si <= currentStep
                              const isCurrent = si === currentStep
                              return (
                                <div
                                  key={step.status}
                                  className="flex flex-1 flex-col items-center gap-2"
                                >
                                  <div className="relative flex w-full items-center justify-center">
                                    {/* Connector line */}
                                    {si > 0 && (
                                      <div
                                        className={`absolute right-1/2 h-0.5 w-full ${
                                          si <= currentStep ? 'bg-chili' : 'bg-border'
                                        }`}
                                      />
                                    )}
                                    {/* Icon circle */}
                                    <motion.span
                                      animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                                      transition={
                                        isCurrent
                                          ? { repeat: Infinity, duration: 2 }
                                          : {}
                                      }
                                      className={`relative z-10 flex size-10 items-center justify-center rounded-full ${
                                        isActive
                                          ? 'bg-chili text-chili-foreground'
                                          : 'border-2 border-border bg-card text-muted-foreground'
                                      }`}
                                    >
                                      <step.icon className="size-4" />
                                    </motion.span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                                      isActive ? 'text-chili' : 'text-muted-foreground'
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Items summary */}
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item) => (
                            <span
                              key={item.dish.id}
                              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                            >
                              {item.dish.name} × {item.quantity}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── Past Orders ── */}
            {pastOrders.length > 0 && (
              <section>
                <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <CheckCircle2 className="size-4" />
                  Past Orders
                </h2>
                <div className="flex flex-col gap-4">
                  {pastOrders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 items-center justify-center rounded-full bg-leaf/15">
                            <CheckCircle2 className="size-4 text-leaf" />
                          </span>
                          <div>
                            <p className="text-sm font-bold">{order.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(order.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {order.items.map((item) => (
                            <span
                              key={item.dish.id}
                              className="text-xs text-muted-foreground"
                            >
                              {item.dish.name} × {item.quantity}
                              {order.items.indexOf(item) < order.items.length - 1 && ','}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">₹{order.grandTotal}</span>
                        <button
                          onClick={() => reorder(order.items)}
                          className="flex items-center gap-1.5 rounded-full border border-chili px-4 py-2 text-xs font-semibold text-chili transition-colors hover:bg-chili hover:text-chili-foreground"
                        >
                          <RotateCcw className="size-3" />
                          Reorder
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
