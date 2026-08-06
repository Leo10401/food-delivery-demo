'use client'

import { motion } from 'motion/react'
import { Bike, CookingPot, Search } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Pick your craving',
    body: 'Browse by dish, region, or mood — from a quick vada pav to a full Sunday biryani.',
  },
  {
    icon: CookingPot,
    title: 'Kitchens fire up',
    body: 'Your order goes straight to the stove. Nothing sits under a heat lamp, ever.',
  },
  {
    icon: Bike,
    title: 'Hot at your door',
    body: 'Insulated delivery in 30 minutes or less, with live tracking from tadka to doorbell.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="mb-12 flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-chili">
          From order to doorbell
        </p>
        <h2 className="font-display text-4xl text-foreground text-balance md:text-5xl">
          Three steps to dinner
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4 rounded-3xl bg-card p-8 shadow-sm"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-marigold text-marigold-foreground">
              <step.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold">
              <span className="mr-2 font-display text-chili">{i + 1}.</span>
              {step.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
