import { ZoomLightbox, type LightboxImage } from "@/registry/default/ui/zoom-lightbox"

export const meta = {
  title: "Holiday home listing",
  description: "A zoom lightbox on a holiday-rental listing, so guests can open each room and zoom into the details before booking.",
}

// The house and its rooms are made up.
const rooms: [string, string, string][] = [
  ["1600585154340-be6161a56a0c", "The house at dusk, under the old oak", "A modern glass house lit up at dusk under a large tree"],
  ["1618221195710-dd6b41faaea6", "Living room with garden doors", "A bright living room with a grey sofa and wooden tables"],
  ["1586023492125-27b2c045efd7", "Reading corner on the landing", "A yellow armchair beside a floor lamp in a white room"],
  ["1582719478250-c89cae4dc85b", "Main bedroom, facing east", "A bedroom with a wooden floor and sunlight through sheer curtains"],
  ["1578500494198-246f612d3b3d", "Snug with a deep sofa", "A tan sofa with a grey throw and dried grasses in a vase"],
  ["1556228453-efd6c1ff04f6", "Garden room for long lunches", "A living room with a leather sofa, pink armchairs and plants"],
]

const images: LightboxImage[] = rooms.map(([id, caption, alt]) => ({
  src: `https://images.unsplash.com/photo-${id}?w=2000&auto=format&q=80`,
  thumbnail: `https://images.unsplash.com/photo-${id}?w=700&h=525&fit=crop&auto=format&q=75`,
  alt,
  caption,
}))

export default function HolidayHome() {
  return (
    <div className="mx-auto min-h-svh max-w-5xl bg-background px-6 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Ericeira, Portugal · Sleeps 6</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">The Oak House</h1>
      <ZoomLightbox images={images} className="mt-6 grid-cols-2 md:grid-cols-3" />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <p>
          <span className="text-2xl font-semibold">€240</span> <span className="text-muted-foreground">a night</span>
        </p>
        <button
          type="button"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Check dates
        </button>
      </div>
    </div>
  )
}
