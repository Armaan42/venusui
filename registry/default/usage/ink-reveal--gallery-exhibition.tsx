import { InkReveal } from "@/registry/default/ui/ink-reveal"

export const meta = {
  title: "Gallery exhibition",
  description: "Ink reveals on a gallery's exhibition page: each work bleeds into view as you scroll to it, like ink on paper.",
}

// The gallery, exhibition and works are made up.
const works = [
  {
    id: "1541701494587-cb58502866ab",
    title: "Tide I",
    medium: "Ink in water, archival print",
    alt: "Blue and orange ink clouds swirling in water",
  },
  { id: "1557672172-298e090bd0f1", title: "Bloom", medium: "Poured acrylic on panel", alt: "Pink, blue and white paint marbled together" },
  {
    id: "1618005182384-a83a8bd57fbe",
    title: "Dusk study",
    medium: "Digital print on cotton rag",
    alt: "Smooth waves of violet, pink and blue light",
  },
  {
    id: "1614850523459-c2f4c699c52e",
    title: "Afterglow",
    medium: "Digital print on cotton rag",
    alt: "A soft gradient from deep blue through violet to pink",
  },
]

export default function GalleryExhibition() {
  return (
    <div className="min-h-svh bg-background px-6 py-14 text-foreground">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-muted-foreground">Kiln Street Gallery · 14 January – 2 March</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">Wet Edges</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">Four works about colour that won&apos;t stay where it&apos;s put.</p>
        <ul className="mt-12 grid list-none gap-10 p-0 sm:grid-cols-2">
          {works.map((work, i) => (
            <li key={work.id} className={i % 2 === 1 ? "sm:mt-24" : undefined}>
              <InkReveal
                src={`https://images.unsplash.com/photo-${work.id}?w=900&h=1125&fit=crop&auto=format&q=80`}
                alt={work.alt}
                className="aspect-[4/5] rounded-xl"
              />
              <h2 className="mt-4 font-medium">{work.title}</h2>
              <p className="text-sm text-muted-foreground">{work.medium}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
