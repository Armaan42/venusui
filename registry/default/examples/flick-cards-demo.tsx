import { FlickCards, type FlickCard } from "@/registry/default/ui/flick-cards"

const places = [
  {
    id: "kyoto",
    name: "Kyoto",
    note: "Old streets and temples",
    photo: "1493976040374-85c8e12f0c0e",
    alt: "A narrow street of wooden houses in Kyoto at dusk, with a pagoda behind",
  },
  {
    id: "santorini",
    name: "Santorini",
    note: "White houses over the sea",
    photo: "1533105079780-92b9be482077",
    alt: "White houses on a cliff above a deep blue sea",
  },
  {
    id: "dolomites",
    name: "Dolomites",
    note: "Lakes and high peaks",
    photo: "1501785888041-af3ef285b470",
    alt: "A rowing boat on a turquoise lake below steep mountains",
  },
  {
    id: "venice",
    name: "Venice",
    note: "Canals and bridges",
    photo: "1523906834658-6e24ef2386f9",
    alt: "A stone bridge over a canal lined with old buildings",
  },
  {
    id: "iceland",
    name: "South Iceland",
    note: "Waterfalls and green cliffs",
    photo: "1476610182048-b716b8518aae",
    alt: "A tall waterfall falling from a green cliff at sunset",
  },
]

const cards: FlickCard[] = places.map((place) => ({
  id: place.id,
  label: place.name,
  content: (
    <div className="relative size-full">
      <img
        src={`https://images.unsplash.com/photo-${place.photo}?w=600&h=800&fit=crop&auto=format&q=80`}
        alt={place.alt}
        draggable={false}
        className="size-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-5 pt-16 text-white">
        <p className="text-2xl font-semibold tracking-tight">{place.name}</p>
        <p className="text-sm text-white/85">{place.note}</p>
      </div>
    </div>
  ),
}))

export default function FlickCardsDemo() {
  return <FlickCards cards={cards} leftLabel="Skip" rightLabel="Go" empty="That's every trip. Press undo to look again." />
}
