import { PhotoFolder } from "@/registry/default/ui/photo-folder"

export const meta = {
  title: "Photographer's client galleries",
  description: "Photo folders as the gallery list in a photographer's client area, one folder per shoot.",
}

// Sample photos. Swap in your own. The photographer and clients are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&auto=format&q=75`

const GALLERIES = [
  {
    label: "Lena & Tomás",
    description: "Wedding · 214 photos",
    color: "#d8b878",
    images: [
      { src: photo("1519741497674-611481863552"), alt: "A couple holding a bouquet in warm evening light" },
      { src: photo("1507525428034-b723cf961d3e"), alt: "Gentle waves on a beach at sunrise" },
      { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake below mountains" },
    ],
  },
  {
    label: "Kestrel Bikes",
    description: "Outdoor catalogue · 86 photos",
    color: "#5f6b78",
    images: [
      { src: photo("1469474968028-56623f02e42e"), alt: "A lone hiker on a rock above misty green hills" },
      { src: photo("1470071459604-3b5ec3a7fe05"), alt: "Green hills and cliffs under low cloud" },
      { src: photo("1504893524553-b855bce32c67"), alt: "A river winding through a mossy canyon" },
    ],
  },
  {
    label: "Up north",
    description: "Personal · 41 photos",
    color: "#a9774f",
    images: [
      { src: photo("1476610182048-b716b8518aae"), alt: "A waterfall over green cliffs at sunset" },
      { src: photo("1531366936337-7c912a4589a7"), alt: "Green and purple northern lights over snow" },
      { src: photo("1506905925346-21bda4d32df4"), alt: "Snowy peaks above a sea of cloud" },
    ],
  },
]

export default function ClientGalleries() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Ines Varga Photography · Client area</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Galleries</h1>
      <p className="mt-2 text-muted-foreground">Hover a folder for a peek, click to open. Each gallery stays online for a year.</p>
      <ul className="mt-10 grid grid-cols-1 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-3">
        {GALLERIES.map((gallery) => (
          <li key={gallery.label}>
            <PhotoFolder label={gallery.label} description={gallery.description} color={gallery.color} images={gallery.images} />
          </li>
        ))}
      </ul>
    </div>
  )
}
