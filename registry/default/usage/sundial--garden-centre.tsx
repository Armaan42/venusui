import { Button } from "@/components/ui/button"
import { Sundial } from "@/registry/default/ui/sundial"

export const meta = {
  title: "Garden centre product page",
  description: "The sundial on a garden centre's product page, laid out for the buyer's latitude so it tells the right time.",
}

// The shop and product are made up.
export default function GardenCentre() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Sundial className="mx-auto" latitude={38.7} />
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Garden · Ornaments</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Brass sundial, made for your garden</h1>
        <p className="mt-2 text-muted-foreground">
          A sundial only tells the right time at the latitude it&apos;s made for. Tell us where you live and we cut the hour lines to match.
          This one is set for 38.7° north.
        </p>
        <p className="mt-4 text-2xl font-semibold">€145</p>
        <Button className="mt-4">Choose your latitude</Button>
        <p className="mt-3 text-xs text-muted-foreground">Point the tall edge true north when you set it up. Instructions in the box.</p>
      </div>
    </div>
  )
}
