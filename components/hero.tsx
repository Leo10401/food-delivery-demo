'use client'

import { motion } from 'motion/react'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-ink">
      {/* Full-bleed food photography */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-food.jpg"
          alt="Overhead view of steaming Indian curries and basmati rice on a wooden tray"
          className="size-full object-cover"
        />
      </motion.div>

      {/* Cinematic scrim for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-ink/60 to-transparent"
      />

      {/* Vertical Devanagari accent, right edge */}
      <motion.p
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-24 hidden select-none text-4xl leading-loose tracking-[0.5em] text-ink-foreground/85 [writing-mode:vertical-rl] md:block lg:right-12 lg:text-5xl"
        aria-hidden="true"
      >
        {'स्वाद·घर·का'}
      </motion.p>

      {/* Editorial copy, bottom-left */}
      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-2xl flex-col items-start gap-7"
        >
          <motion.h1
            variants={item}
            className="font-display text-6xl leading-[1.02] text-ink-foreground text-balance md:text-7xl lg:text-8xl"
          >
            Ghar ka{' '}
            <span className="italic text-marigold">swaad,</span>
            <br />
            delivered garam.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-sm text-sm leading-relaxed text-ink-foreground/70 md:text-base"
          >
            Tandoori classics, dosa mornings, biryani nights. Cooked in real
            kitchens, rushed to your door while the tadka is still crackling.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-2 flex flex-wrap items-center gap-8"
          >
            <a
              href="#menu"
              className="rounded-full border border-ink-foreground/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink-foreground transition-colors hover:border-marigold hover:bg-marigold hover:text-marigold-foreground"
            >
              Order now
            </a>

            <a
              href="#menu"
              className="group flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink-foreground/60 transition-colors hover:text-marigold"
            >
              <span
                aria-hidden="true"
                className="h-px w-10 bg-ink-foreground/40 transition-all group-hover:w-16 group-hover:bg-marigold"
              />
              Scroll to feast
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
