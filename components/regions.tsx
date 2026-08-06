'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { regions } from '@/lib/dishes'

export function Regions() {
  const [activeId, setActiveId] = useState(regions[0].id)
  const active = regions.find((r) => r.id === activeId) ?? regions[0]

  return (
    <section id="regions" className="bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-marigold">
            One country, four kitchens
          </p>
          <h2 className="font-display text-4xl text-marigold text-balance md:text-5xl">
            Eat your way across India
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Regional cuisines"
          className="mb-10 flex flex-wrap gap-3"
        >
          {regions.map((region) => (
            <button
              key={region.id}
              role="tab"
              aria-selected={region.id === activeId}
              onClick={() => setActiveId(region.id)}
              className={`rounded-full px-5 py-2.5 font-display text-lg transition-colors ${
                region.id === activeId
                  ? 'bg-marigold text-marigold-foreground'
                  : 'border border-ink-foreground/25 text-ink-foreground/70 hover:border-marigold hover:text-marigold'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div className="overflow-hidden rounded-3xl">
              <img
                src={active.image || '/placeholder.svg'}
                alt={`${active.label} Indian cuisine`}
                width={720}
                height={520}
                className="aspect-4/3 w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-display text-3xl text-chili">
                {active.tagline}
              </h3>
              <p className="text-lg leading-relaxed text-ink-foreground/75 text-pretty">
                {active.description}
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {active.dishes.map((dish) => (
                  <li
                    key={dish}
                    className="rounded-full border border-marigold/40 px-4 py-1.5 text-sm text-marigold"
                  >
                    {dish}
                  </li>
                ))}
              </ul>
              <a
                href="#menu"
                className="mt-2 w-fit rounded-full bg-chili px-6 py-3 font-semibold text-chili-foreground transition-transform hover:scale-105"
              >
                Browse {active.label} Indian dishes
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
