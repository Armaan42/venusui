import { InkReveal } from "@/registry/default/ui/ink-reveal"

const works = [
  { id: "1541701494587-cb58502866ab", title: "Tide", alt: "Blue and orange ink clouds swirling in water" },
  { id: "1557672172-298e090bd0f1", title: "Bloom", alt: "Pink, blue and white paint marbled together" },
  { id: "1618005182384-a83a8bd57fbe", title: "Dusk", alt: "Smooth waves of violet, pink and blue light" },
]

export default function InkRevealDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
      {works.map((work, i) => (
        <figure key={work.id} className="m-0">
          <InkReveal
            src={`https://images.unsplash.com/photo-${work.id}?w=700&h=875&fit=crop&auto=format&q=80`}
            alt={work.alt}
            delay={i * 220}
            className="aspect-[4/5] rounded-2xl"
          />
          <figcaption className="mt-2 text-sm font-medium">{work.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}
