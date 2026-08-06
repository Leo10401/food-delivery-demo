'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const links = [
  { label: 'Menu', href: '/menu' },
  { label: 'Orders', href: '/orders' },
  { label: 'Profile', href: '/profile' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isHome
          ? scrolled
            ? 'bg-ink/90 text-ink-foreground backdrop-blur-md'
            : 'bg-transparent text-ink-foreground'
          : 'bg-card/95 text-foreground shadow-sm backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-18 md:px-10"
      >
        <Link
          href="/"
          className={`font-display text-sm uppercase tracking-[0.45em] ${
            isHome ? 'text-ink-foreground' : 'text-foreground'
          }`}
        >
          Rasoi Express
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.25em] transition-colors ${
                  isActive
                    ? 'text-marigold'
                    : isHome
                      ? 'text-ink-foreground/75 hover:text-marigold'
                      : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* Cart icon with badge */}
          <Link
            href="/cart"
            className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              isHome
                ? 'text-ink-foreground/75 hover:text-marigold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShoppingBag className="size-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-chili text-[10px] font-bold text-chili-foreground"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </motion.span>
            )}
          </Link>

          <Link
            href="/menu"
            className={`hidden rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors md:inline-flex ${
              isHome
                ? 'border-ink-foreground/50 text-ink-foreground hover:border-marigold hover:bg-marigold hover:text-marigold-foreground'
                : 'border-chili text-chili hover:bg-chili hover:text-chili-foreground'
            }`}
          >
            Order now
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
