import { FocusGrid, FocusGridItem } from "@/registry/default/ui/focus-grid"

export const meta = {
  title: "Restaurant tasting menu",
  description: "A focus grid for a restaurant's tasting menu: the course you look at comes forward with its description.",
}

// Kiln Corner and its menu are made up.
const courses = [
  {
    name: "Pumpkin velouté",
    note: "Toasted seeds, feta, chilli oil",
    photo: "1476718406336-bb5a9690ee2a",
    alt: "A bowl of orange pumpkin soup topped with seeds and feta",
  },
  {
    name: "Garden salad",
    note: "Charred vegetables, chickpeas, herbs",
    photo: "1512621776951-a57141f2eefd",
    alt: "A bowl of salad with avocado, tomatoes, chickpeas and greens",
  },
  {
    name: "Red curry",
    note: "Slow-cooked squash, basil, rice",
    photo: "1455619452474-d2be8b1e70cd",
    alt: "A bowl of red curry with basil beside dried chillies",
  },
  {
    name: "Prawn linguine",
    note: "Cherry tomatoes, garlic, parsley",
    photo: "1563379926898-05f4575a45d8",
    alt: "Prawn pasta with tomatoes in a black pan",
  },
  {
    name: "Sharing board",
    note: "Grilled beef, flatbread, pickles",
    photo: "1504674900247-0877df9cc836",
    alt: "Plates of grilled beef, salad and flatbread on a wooden table",
  },
  {
    name: "Brioche toast",
    note: "Blueberries, banana, maple",
    photo: "1484723091739-30a097e8f929",
    alt: "Stacked French toast with banana and blueberries",
  },
]

export default function TastingMenu() {
  return (
    <div className="mx-auto min-h-svh max-w-5xl bg-background px-6 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Kiln Corner · Autumn tasting menu · €68</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Six courses</h1>
      <FocusGrid className="mt-8 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <FocusGridItem
            key={course.name}
            tabIndex={0}
            className="rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <img
              src={`https://images.unsplash.com/photo-${course.photo}?w=640&h=480&fit=crop&auto=format&q=80`}
              alt={course.alt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <p className="mt-3 text-xs text-muted-foreground tabular-nums">Course {i + 1}</p>
            <h2 className="font-medium">{course.name}</h2>
            <p className="text-sm text-muted-foreground">{course.note}</p>
          </FocusGridItem>
        ))}
      </FocusGrid>
    </div>
  )
}
