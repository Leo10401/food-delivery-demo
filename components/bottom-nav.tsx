'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Home, UtensilsCrossed, ShoppingBag, ClipboardList, User } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { label: 'Cart', href: '/cart', icon: ShoppingBag, hasBadge: true },
  { label: 'Orders', href: '/orders', icon: ClipboardList },
  { label: 'Profile', href: '/profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <nav
      aria-label="App navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href)

          return (
            <li key={tab.href} className="relative">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'text-chili'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative">
                  <tab.icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                  {tab.hasBadge && totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-chili text-[9px] font-bold text-chili-foreground"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </span>
                <span>{tab.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="bottomNavIndicator"
                    className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-chili"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
      {/* Safe area for phones with gesture bars */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
