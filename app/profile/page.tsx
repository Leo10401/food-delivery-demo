'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  User,
  MapPin,
  CreditCard,
  Flame,
  Bell,
  Globe,
  ChevronRight,
  LogOut,
  Heart,
  Package,
  Calendar,
} from 'lucide-react'
import { useOrders } from '@/lib/orders-context'

/* ── Mock user data ── */
const user = {
  name: 'Kanha',
  email: 'kanha@rasoi.express',
  phone: '+91 98765 43210',
  memberSince: 'Aug 2026',
  favoriteDish: 'Hyderabadi Biryani',
}

const addresses = [
  { label: 'Home', address: '42 MG Road, Indira Nagar, Bangalore 560038' },
  { label: 'Work', address: '7th Floor, WeWork Galaxy, Residency Road, Bangalore 560025' },
]

const paymentMethods = [
  { type: 'UPI', detail: 'kanha@okaxis', icon: '⚡' },
  { type: 'Card', detail: '•••• 4242', icon: '💳' },
]

const spiceLevels = ['Mild 🌶️', 'Medium 🌶️🌶️', 'Hot 🌶️🌶️🌶️', 'Extra Hot 🔥']

export default function ProfilePage() {
  const { orders } = useOrders()
  const [vegOnly, setVegOnly] = useState(false)
  const [spiceLevel, setSpiceLevel] = useState(1)
  const [notifications, setNotifications] = useState(true)

  const totalOrders = orders.length

  return (
    <main className="min-h-svh bg-background pb-24 pt-20 md:pt-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col items-center gap-4 text-center"
        >
          {/* Avatar */}
          <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-chili to-marigold text-3xl font-bold text-chili-foreground shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-3xl text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 grid grid-cols-3 gap-3"
        >
          {[
            { icon: Package, label: 'Orders', value: totalOrders.toString() },
            { icon: Heart, label: 'Favourite', value: user.favoriteDish.split(' ')[0] },
            { icon: Calendar, label: 'Member Since', value: user.memberSince },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-card p-4 text-center shadow-sm"
            >
              <stat.icon className="size-5 text-chili" />
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Settings Sections ── */}
        <div className="flex flex-col gap-6">
          {/* Delivery Addresses */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-card p-5 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
              <MapPin className="size-4 text-chili" />
              Delivery Addresses
            </h2>
            <div className="flex flex-col gap-3">
              {addresses.map((addr) => (
                <div
                  key={addr.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-bold">{addr.label}</p>
                    <p className="text-xs text-muted-foreground">{addr.address}</p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
              ))}
              <button className="mt-1 self-start text-xs font-semibold text-chili hover:underline">
                + Add new address
              </button>
            </div>
          </motion.section>

          {/* Payment Methods */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-card p-5 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
              <CreditCard className="size-4 text-chili" />
              Payment Methods
            </h2>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.detail}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{pm.icon}</span>
                    <div>
                      <p className="text-sm font-bold">{pm.type}</p>
                      <p className="text-xs text-muted-foreground">{pm.detail}</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.section>

          {/* Preferences */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-card p-5 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
              <Flame className="size-4 text-chili" />
              Preferences
            </h2>
            <div className="flex flex-col gap-5">
              {/* Veg only */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Vegetarian only</p>
                  <p className="text-xs text-muted-foreground">
                    Only show vegetarian dishes
                  </p>
                </div>
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    vegOnly ? 'bg-leaf' : 'bg-border'
                  }`}
                >
                  <motion.span
                    animate={{ x: vegOnly ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 size-6 rounded-full bg-card shadow-sm"
                  />
                </button>
              </div>

              {/* Spice level */}
              <div>
                <p className="mb-2 text-sm font-bold">Spice Level</p>
                <div className="flex gap-2">
                  {spiceLevels.map((level, i) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(i)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        spiceLevel === i
                          ? 'bg-chili text-chili-foreground'
                          : 'border border-border text-muted-foreground hover:border-chili/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* App Settings */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-card p-5 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground">
              <User className="size-4 text-chili" />
              App Settings
            </h2>
            <div className="flex flex-col gap-5">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-bold">Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Order updates and offers
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    notifications ? 'bg-chili' : 'bg-border'
                  }`}
                >
                  <motion.span
                    animate={{ x: notifications ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 size-6 rounded-full bg-card shadow-sm"
                  />
                </button>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-bold">Language</p>
                    <p className="text-xs text-muted-foreground">English</p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </div>
          </motion.section>

          {/* Sign Out */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-chili/30 py-4 text-sm font-semibold text-chili transition-colors hover:border-chili hover:bg-chili/10"
          >
            <LogOut className="size-4" />
            Sign Out
          </motion.button>

          <p className="pb-4 text-center text-xs text-muted-foreground">
            Made with extra mirchi 🌶️ · v1.0
          </p>
        </div>
      </div>
    </main>
  )
}
