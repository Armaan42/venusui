import { DeckSlider, type DeckSlide } from "@/registry/default/ui/deck-slider"

const rooms = [
  {
    id: "reading",
    name: "Reading corner",
    photo: "1586023492125-27b2c045efd7",
    alt: "A yellow armchair beside a floor lamp in a white room",
  },
  {
    id: "lounge",
    name: "Sunday lounge",
    photo: "1556228453-efd6c1ff04f6",
    alt: "A living room with a leather sofa, pink armchairs and plants",
  },
  {
    id: "living",
    name: "Open living",
    photo: "1618221195710-dd6b41faaea6",
    alt: "A bright living room with a grey sofa and wooden tables",
  },
  { id: "quiet", name: "Quiet sofa", photo: "1578500494198-246f612d3b3d", alt: "A tan sofa with a grey throw and dried grasses in a vase" },
  {
    id: "bedroom",
    name: "Slow mornings",
    photo: "1582719478250-c89cae4dc85b",
    alt: "A bedroom with a wooden floor and sunlight through sheer curtains",
  },
  {
    id: "studio",
    name: "Studio lounge",
    photo: "1524758631624-e2822e304c36",
    alt: "A bright lounge with soft chairs and a black floor lamp",
  },
]

const slides: DeckSlide[] = rooms.map((room) => ({
  id: room.id,
  label: room.name,
  content: (
    <figure className="relative m-0 size-full">
      <img
        src={`https://images.unsplash.com/photo-${room.photo}?w=640&h=860&fit=crop&auto=format&q=80`}
        alt={room.alt}
        draggable={false}
        className="size-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-5 pt-14 text-lg font-medium text-white">
        {room.name}
      </figcaption>
    </figure>
  ),
}))

export default function DeckSliderDemo() {
  return <DeckSlider slides={slides} label="Room ideas" defaultIndex={2} className="max-w-3xl" />
}
