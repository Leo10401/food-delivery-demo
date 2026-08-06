'use client'

import { motion } from 'motion/react'
import { Check, Clock, Plus, Minus, Star } from 'lucide-react'
import { allDishes } from '@/lib/dishes-extended'
import { useCart } from '@/lib/cart-context'

// Show first 6 dishes as "popular" on the landing page
const popularDishes = allDishes.slice(0, 6)

export function DishesGrid() {
  const { addItem, removeItem, getItemQuantity } = useCart()

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="mb-12 flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-chili">
          Most ordered this week
        </p>
        <h2 className="font-display text-4xl text-foreground text-balance md:text-5xl">
          Plates people fight over
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popularDishes.map((dish, i) => {
          const qty = getItemQuantity(dish.id)
          return (
            <motion.article
              key={dish.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image || '/placeholder.svg'}
                  alt={dish.name}
                  width={640}
                  height={480}
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 flex size-6 items-center justify-center rounded-md border-2 bg-card ${
                    dish.veg ? 'border-leaf' : 'border-chili'
                  }`}
                  title={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
                >
                  <span
                    className={`size-2.5 rounded-full ${dish.veg ? 'bg-leaf' : 'bg-chili'}`}
                  />
                  <span className="sr-only">
                    {dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
                  </span>
                </span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-semibold text-marigold">
                  <Star className="size-3 fill-marigold" aria-hidden="true" />
                  {dish.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold">{dish.name}</h3>
                  <span className="font-display text-sm text-chili">
                    {dish.hindi}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">₹{dish.price}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {dish.time}
                    </span>
                  </div>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => addItem(dish)}
                      className="flex items-center gap-1.5 rounded-full bg-chili px-4 py-2 text-sm font-semibold text-chili-foreground transition-all hover:scale-105"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => removeItem(dish.id)}
                        className="flex size-8 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-chili hover:text-chili-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-bold">{qty}</span>
                      <button
                        type="button"
                        onClick={() => addItem(dish)}
                        className="flex size-8 items-center justify-center rounded-full bg-chili text-chili-foreground transition-transform hover:scale-110"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
