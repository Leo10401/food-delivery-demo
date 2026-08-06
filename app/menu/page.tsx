'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Star, Clock, Plus, Minus, SlidersHorizontal, X } from 'lucide-react'
import { allDishes, categories, dishRegions, type DishCategory, type DishRegion } from '@/lib/dishes-extended'
import { useCart } from '@/lib/cart-context'

type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'time'

const sortLabels: Record<SortOption, string> = {
  'rating': 'Top Rated',
  'price-asc': 'Price: Low–High',
  'price-desc': 'Price: High–Low',
  'time': 'Fastest',
}

export default function MenuPage() {
  const { addItem, removeItem, getItemQuantity } = useCart()
  const [search, setSearch] = useState('')
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all')
  const [regionFilter, setRegionFilter] = useState<DishRegion | 'All'>('All')
  const [categoryFilter, setCategoryFilter] = useState<DishCategory | 'All'>('All')
  const [sort, setSort] = useState<SortOption>('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filteredDishes = useMemo(() => {
    let dishes = [...allDishes]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      dishes = dishes.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.hindi.includes(q) ||
          d.description.toLowerCase().includes(q),
      )
    }

    // Veg filter
    if (vegFilter === 'veg') dishes = dishes.filter((d) => d.veg)
    if (vegFilter === 'non-veg') dishes = dishes.filter((d) => !d.veg)

    // Region filter
    if (regionFilter !== 'All') dishes = dishes.filter((d) => d.region === regionFilter)

    // Category filter
    if (categoryFilter !== 'All') dishes = dishes.filter((d) => d.category === categoryFilter)

    // Sort
    switch (sort) {
      case 'rating':
        dishes.sort((a, b) => b.rating - a.rating)
        break
      case 'price-asc':
        dishes.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        dishes.sort((a, b) => b.price - a.price)
        break
      case 'time':
        dishes.sort((a, b) => parseInt(a.time) - parseInt(b.time))
        break
    }

    return dishes
  }, [search, vegFilter, regionFilter, categoryFilter, sort])

  const activeFilterCount = [
    vegFilter !== 'all',
    regionFilter !== 'All',
    categoryFilter !== 'All',
  ].filter(Boolean).length

  return (
    <main className="min-h-svh bg-background pb-24 pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-chili">
            Full Menu
          </p>
          <h1 className="font-display text-4xl text-foreground text-balance md:text-5xl">
            Every craving, covered
          </h1>
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-16 z-30 -mx-4 mb-8 bg-background/95 px-4 py-4 backdrop-blur-md md:top-18 md:-mx-6 md:px-6"
        >
          {/* Search input */}
          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-chili focus:outline-none focus:ring-2 focus:ring-chili/20"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'border-chili bg-chili/10 text-chili'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-chili text-[10px] font-bold text-chili-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Veg / Non-veg + Sort row (always visible) */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'veg', 'non-veg'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setVegFilter(opt)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all ${
                  vegFilter === opt
                    ? opt === 'veg'
                      ? 'bg-leaf text-leaf-foreground'
                      : opt === 'non-veg'
                        ? 'bg-chili text-chili-foreground'
                        : 'bg-foreground text-background'
                    : 'border border-border bg-card text-muted-foreground hover:border-foreground/30'
                }`}
              >
                {opt === 'veg' && <span className="size-2 rounded-full bg-leaf-foreground" />}
                {opt === 'non-veg' && <span className="size-2 rounded-full bg-chili-foreground" />}
                {opt === 'all' ? 'All' : opt === 'veg' ? 'Veg' : 'Non-Veg'}
              </button>
            ))}

            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />

            {/* Sort dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground focus:border-chili focus:outline-none"
            >
              {(Object.entries(sortLabels) as [SortOption, string][]).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Expandable filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
                  {/* Region */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Region</p>
                    <div className="flex flex-wrap gap-2">
                      {(['All', ...dishRegions] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRegionFilter(r)}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            regionFilter === r
                              ? 'bg-marigold text-marigold-foreground'
                              : 'border border-border text-muted-foreground hover:border-marigold hover:text-marigold'
                          }`}
                        >
                          {r === 'All' ? 'All Regions' : `${r} India`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {(['All', ...categories] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategoryFilter(c)}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            categoryFilter === c
                              ? 'bg-marigold text-marigold-foreground'
                              : 'border border-border text-muted-foreground hover:border-marigold hover:text-marigold'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear all */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        setVegFilter('all')
                        setRegionFilter('All')
                        setCategoryFilter('All')
                      }}
                      className="self-start text-xs font-medium text-chili underline underline-offset-2 hover:text-chili/80"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Results count ── */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredDishes.length}</span>{' '}
          {filteredDishes.length === 1 ? 'dish' : 'dishes'}
        </p>

        {/* ── Dish Grid ── */}
        {filteredDishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <span className="text-6xl">🍽️</span>
            <h3 className="font-display text-2xl text-foreground">No dishes found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, i) => {
                const qty = getItemQuantity(dish.id)
                return (
                  <motion.article
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.04, 0.3),
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
                      {/* Veg/Non-veg badge */}
                      <span
                        className={`absolute left-3 top-3 flex size-6 items-center justify-center rounded-md border-2 bg-card ${
                          dish.veg ? 'border-leaf' : 'border-chili'
                        }`}
                        title={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
                      >
                        <span className={`size-2.5 rounded-full ${dish.veg ? 'bg-leaf' : 'bg-chili'}`} />
                      </span>
                      {/* Rating */}
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-semibold text-marigold">
                        <Star className="size-3 fill-marigold" aria-hidden="true" />
                        {dish.rating}
                      </span>
                      {/* Region + Category tags */}
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        <span className="rounded-full bg-ink/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-foreground/90 backdrop-blur-sm">
                          {dish.region}
                        </span>
                        <span className="rounded-full bg-ink/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-marigold backdrop-blur-sm">
                          {dish.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold">{dish.name}</h3>
                        <span className="font-display text-sm text-chili">{dish.hindi}</span>
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
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
