import { PixelImageTrail } from "@/registry/default/ui/pixel-image-trail"

export const meta = {
  title: "Photographer's home page",
  description:
    "A pixel image trail across a landscape photographer's hero, giving visitors a glimpse of the work as they move the pointer.",
}

// Ilse Varga is a made-up photographer.
const images = [
  "1464822759023-fed622ff2c3b",
  "1506905925346-21bda4d32df4",
  "1507525428034-b723cf961d3e",
  "1510798831971-661eb04b3739",
  "1531366936337-7c912a4589a7",
  "1473580044384-7ba9967e16a0",
  "1504893524553-b855bce32c67",
  "1542718610-a1d656d1884c",
].map((id) => `https://images.unsplash.com/photo-${id}?w=400&h=500&fit=crop&auto=format&q=75`)

export default function PhotographerHero() {
  return (
    <div className="dark min-h-svh bg-background text-foreground">
      <PixelImageTrail images={images} size={200} className="flex min-h-svh flex-col px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <span className="font-semibold tracking-tight">Ilse Varga</span>
          <nav aria-label="Main">
            <ul className="flex gap-5 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Prints
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="my-auto max-w-3xl py-20">
          <h1 className="text-5xl leading-[0.95] font-semibold tracking-tight sm:text-8xl">Landscapes, slowly.</h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Ten years of mountains, coastlines and northern skies, shot on early mornings and long walks.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Move your pointer to look around.</p>
      </PixelImageTrail>
    </div>
  )
}
