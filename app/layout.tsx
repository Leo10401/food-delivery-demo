import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { OrdersProvider } from '@/lib/orders-context'
import { Navbar } from '@/components/navbar'
import { BottomNav } from '@/components/bottom-nav'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'Rasoi Express — Ghar ka swaad, delivered garam',
  description:
    'Order fresh Indian food from tandoori classics to South Indian dosas. Hot, fast delivery from real kitchens near you.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#fff4e2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${dmSans.variable} ${fraunces.variable}`}
    >
      <body className="antialiased">
        <CartProvider>
          <OrdersProvider>
            <Navbar />
            {children}
            <BottomNav />
          </OrdersProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
