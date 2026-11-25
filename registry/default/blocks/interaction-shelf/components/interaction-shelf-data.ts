/**
 * Night Shelf's books. Six open into live interaction demos; the rest are
 * scenery. Everything here is made up: rename the shelf, rewrite the notes
 * and swap the photos for your own work.
 */

export type DemoId = "drift" | "lens" | "ripple" | "stretch" | "toss" | "bloom"

export type ShelfBook = {
  id: DemoId
  number: string
  title: string
  subtitle: string
  /** What the interaction was sketched for. */
  meantFor: string
  description: string
  howTo: string
  builtWith: string
  /** Spine color in lamplight; the cover uses it too. */
  color: string
  /** Text color on the spine and cover. */
  ink: string
}

export const books: ShelfBook[] = [
  {
    id: "drift",
    number: "01",
    title: "Drift",
    subtitle: "Endless photo wall",
    meantFor: "Meant for a travel journal",
    description:
      "A wall of photographs with no edges, so nothing ends up on page two. It keeps gliding after you let go, and each picture slides inside its frame as it passes.",
    howTo: "Drag in any direction, or scroll.",
    builtWith: "DOM transforms and a little momentum",
    color: "#c9893f",
    ink: "#2a1a0c",
  },
  {
    id: "lens",
    number: "02",
    title: "Lens",
    subtitle: "Magnifying index",
    meantFor: "Meant for an exhibition's list of works",
    description:
      "Move along the list and the line under your pointer swells, like a lens passing over a printed page. The lines around it lean in, then settle.",
    howTo: "Move your pointer over the list, or use the arrow keys.",
    builtWith: "DOM and springs",
    color: "#e6dcc8",
    ink: "#2b2620",
  },
  {
    id: "ripple",
    number: "03",
    title: "Ripple",
    subtitle: "Parting field",
    meantFor: "Meant for a studio landing page",
    description: "A field of dots that parts around your pointer like water around a hand, then drifts back into place when you leave.",
    howTo: "Move your pointer through the field.",
    builtWith: "Canvas 2D",
    color: "#b5573a",
    ink: "#fbeee4",
  },
  {
    id: "stretch",
    number: "04",
    title: "Stretch",
    subtitle: "Velocity reel",
    meantFor: "Meant for a photographer's portfolio",
    description: "Photographs stretch with the speed of your drag and settle on one when you stop. The faster you go, the more they lean.",
    howTo: "Drag sideways, scroll, or use the arrow keys.",
    builtWith: "DOM transforms",
    color: "#8a9a7b",
    ink: "#1c2416",
  },
  {
    id: "toss",
    number: "05",
    title: "Toss",
    subtitle: "Light table",
    meantFor: "Meant for a picture editor's desk",
    description:
      "Pick up a print and it turns from where you hold it. Throw it and it slides to rest, or bounces off the edge of the table.",
    howTo: "Drag a print and let go mid-move to throw it.",
    builtWith: "Canvas 2D and simple physics",
    color: "#e2b85c",
    ink: "#2a200b",
  },
  {
    id: "bloom",
    number: "06",
    title: "Bloom",
    subtitle: "Drawn line",
    meantFor: "Meant for an exhibition's interactive wall",
    description: "Draw a line and photographs open out along it, one after another, then fade in the order they arrived.",
    howTo: "Press and draw anywhere on the page.",
    builtWith: "DOM and a pool of images",
    color: "#5c7491",
    ink: "#eef2f7",
  },
]

/** Sample photos (remote image CDN). One size each, so repeats come from the cache. */
export const photos = [
  "1473580044384-7ba9967e16a0",
  "1500530855697-b586d89ba3ee",
  "1578500494198-246f612d3b3d",
  "1586023492125-27b2c045efd7",
  "1610701596007-11502861dcfa",
  "1565193566173-7a0ee3dbe261",
  "1504198266287-1659872e6590",
  "1618221195710-dd6b41faaea6",
  "1556228453-efd6c1ff04f6",
  "1600585154340-be6161a56a0c",
  "1495474472287-4d71bcdd2085",
  "1447933601403-0c6688de566e",
  "1542718610-a1d656d1884c",
  "1517248135467-4c7edcad34c4",
] as const

export function photo(index: number, width = 480, height = 360) {
  const id = photos[((index % photos.length) + photos.length) % photos.length]
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=75`
}

/** Captions for the photographs, used by the demos. */
export const captions = [
  "Dunes at noon",
  "Canyon road",
  "Linen sofa",
  "Yellow chair",
  "Stoneware",
  "Three vessels",
  "One leaf",
  "Afternoon room",
  "Reading corner",
  "House at dusk",
  "Four cups",
  "Morning roast",
  "Cabin light",
  "Dining hall",
]

/** The list in the Lens demo: a made-up exhibition. */
export const works = [
  ["Salt on the window", "2019"],
  ["A chair for waiting", "2020"],
  ["Low tide, Tuesday", "2020"],
  ["The quiet kiln", "2021"],
  ["Paper boats", "2021"],
  ["Every orange in the market", "2021"],
  ["North light", "2022"],
  ["Things that hum", "2022"],
  ["A map of my street", "2022"],
  ["Small weather", "2023"],
  ["The long table", "2023"],
  ["Folded blue", "2023"],
  ["Night bus home", "2024"],
  ["Ten minutes of rain", "2024"],
  ["Borrowed rooms", "2025"],
  ["What the garden kept", "2025"],
] as const
