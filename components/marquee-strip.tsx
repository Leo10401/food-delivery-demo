const items = [
  'Biryani',
  'Butter Chicken',
  'Masala Dosa',
  'Chole Bhature',
  'Pav Bhaji',
  'Rogan Josh',
  'Paneer Tikka',
  'Gulab Jamun',
]

export function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-y-2 border-ink bg-chili py-3 text-chili-foreground"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
        {doubled.map((label, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-xl md:text-2xl">{label}</span>
            <span className="text-marigold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
