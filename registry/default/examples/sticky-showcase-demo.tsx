import { StickyShowcase, type ShowcaseStep } from "@/registry/default/ui/sticky-showcase"

const photo = (id: string, alt: string) => (
  <img
    src={`https://images.unsplash.com/photo-${id}?w=900&h=1100&fit=crop&auto=format&q=80`}
    alt={alt}
    className="aspect-[4/5] w-full object-cover"
  />
)

const steps: ShowcaseStep[] = [
  {
    id: "plan",
    title: "Plan the room around the light",
    description: "Start with where the sun falls in the morning and the evening, then place the pieces you'll use most.",
    media: photo("1524758631624-e2822e304c36", "A bright lounge with soft chairs by tall windows"),
  },
  {
    id: "anchor",
    title: "Anchor it with one big piece",
    description: "A sofa or a bed sets the scale. Everything else is chosen to sit comfortably around it.",
    media: photo("1618221195710-dd6b41faaea6", "A grey sofa with wooden tables in a bright living room"),
  },
  {
    id: "colour",
    title: "Add one colour you love",
    description: "A single chair or lamp in a strong colour does more than a room full of accents.",
    media: photo("1586023492125-27b2c045efd7", "A yellow armchair beside a floor lamp in a white room"),
  },
]

export default function StickyShowcaseDemo() {
  return <StickyShowcase steps={steps} className="w-full max-w-5xl" />
}
