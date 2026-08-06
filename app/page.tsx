import { Hero } from '@/components/hero'
import { MarqueeStrip } from '@/components/marquee-strip'
import { DishesGrid } from '@/components/dishes-grid'
import { Regions } from '@/components/regions'
import { HowItWorks } from '@/components/how-it-works'
import { CtaFooter } from '@/components/cta-footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <DishesGrid />
      <Regions />
      <HowItWorks />
      <CtaFooter />
    </main>
  )
}
