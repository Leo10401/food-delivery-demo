'use client'

import { motion } from 'motion/react'
import { Flame } from 'lucide-react'
import Link from 'next/link'

export function CtaFooter() {
  return (
    <footer className="bg-ink pb-20 text-ink-foreground md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="font-display text-4xl text-marigold text-balance md:text-6xl">
            Bhookh lagi hai?
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink-foreground/75 text-pretty">
            Your first delivery is free. The tandoor is already hot — the only
            thing missing is your order.
          </p>
          <Link
            href="/menu"
            className="rounded-full bg-chili px-8 py-4 text-lg font-semibold text-chili-foreground transition-transform hover:scale-105"
          >
            Start your order
          </Link>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-ink-foreground/15 pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-chili text-chili-foreground">
              <Flame className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg text-marigold">
              Rasoi Express
            </span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm">
            <Link href="/menu" className="text-ink-foreground/70 transition-colors hover:text-marigold">
              Menu
            </Link>
            <Link href="/orders" className="text-ink-foreground/70 transition-colors hover:text-marigold">
              Orders
            </Link>
            <Link href="/profile" className="text-ink-foreground/70 transition-colors hover:text-marigold">
              Profile
            </Link>
          </nav>
          <p className="text-sm text-ink-foreground/50">
            © 2026 Rasoi Express. Made with extra mirchi.
          </p>
        </div>
      </div>
    </footer>
  )
}
