import { StickyShowcase, type ShowcaseStep } from "@/registry/default/ui/sticky-showcase"

export const meta = {
  title: "From farm to cup",
  description:
    "A coffee roastery's story page: four steps scroll past while the photo beside them follows the bean from the farm to the cup.",
}

// Slow Hours Coffee is a made-up roastery.
const photo = (id: string, alt: string) => (
  <img
    src={`https://images.unsplash.com/photo-${id}?w=1000&h=1250&fit=crop&auto=format&q=80`}
    alt={alt}
    className="aspect-[4/5] w-full object-cover"
  />
)

const steps: ShowcaseStep[] = [
  {
    id: "farm",
    title: "Picked by hand on the slopes",
    description: "We buy from six family farms at 1,600 to 1,900 metres, where the cherries ripen slowly and taste sweeter for it.",
    media: photo("1464822759023-fed622ff2c3b", "Forested mountain slopes below snowy peaks"),
  },
  {
    id: "roast",
    title: "Roasted in small batches",
    description: "Twelve kilos at a time, three days a week, so every bag on the shelf is less than a fortnight old.",
    media: photo("1447933601403-0c6688de566e", "A close-up of dark roasted coffee beans"),
  },
  {
    id: "bar",
    title: "Tasted at our bar first",
    description: "Every new roast goes on the bar for a week. If our regulars don't ask for it again, it doesn't go in the shop.",
    media: photo("1517248135467-4c7edcad34c4", "A café interior with wooden tables and warm lights"),
  },
  {
    id: "cup",
    title: "Made the way you like it",
    description: "Order beans ground for your brewer, or whole if you'd rather grind them fresh each morning.",
    media: photo("1495474472287-4d71bcdd2085", "Hands holding cups of coffee with latte art over a table"),
  },
]

export default function CoffeeRoastery() {
  return (
    <div className="min-h-svh bg-background px-6 py-14 text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold tracking-tight">Slow Hours Coffee</p>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">From the farm to your cup</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">How a bag of our coffee gets made, in four steps.</p>
        <StickyShowcase steps={steps} className="mt-10 lg:mt-0" />
      </div>
    </div>
  )
}
