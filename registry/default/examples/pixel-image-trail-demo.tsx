import { PixelImageTrail } from "@/registry/default/ui/pixel-image-trail"

const images = [
  "1493976040374-85c8e12f0c0e",
  "1533105079780-92b9be482077",
  "1501785888041-af3ef285b470",
  "1523906834658-6e24ef2386f9",
  "1476610182048-b716b8518aae",
  "1490806843957-31f4c9a91c65",
].map((id) => `https://images.unsplash.com/photo-${id}?w=400&h=500&fit=crop&auto=format&q=75`)

export default function PixelImageTrailDemo() {
  return (
    <PixelImageTrail images={images} className="grid h-[26rem] w-full max-w-4xl place-items-center rounded-3xl border bg-muted/40">
      <div className="pointer-events-none text-center">
        <p className="text-4xl font-semibold tracking-tight sm:text-6xl">Places we&apos;ve been</p>
        <p className="mt-3 text-muted-foreground">Move your pointer across the box.</p>
      </div>
    </PixelImageTrail>
  )
}
