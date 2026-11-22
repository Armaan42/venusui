import { Button } from "@/components/ui/button"
import { WindChimes } from "@/registry/default/ui/wind-chimes"

export const meta = {
  title: "Garden shop product page",
  description: "The wind chimes on a garden shop's product page, so you can hear the tuning before you buy.",
}

// The shop and product are made up.
export default function GardenShop() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <WindChimes className="mx-auto" />
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Garden · Outdoor living</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Six-tube garden chimes</h1>
        <p className="mt-2 text-muted-foreground">
          Aluminium tubes tuned to a pentatonic scale, so any notes that ring together sound good. Brush across them to hear the tuning.
        </p>
        <p className="mt-4 text-2xl font-semibold">€46</p>
        <Button className="mt-4">Add to basket</Button>
        <p className="mt-3 text-xs text-muted-foreground">Hang them somewhere sheltered from strong gusts. Your neighbours will thank you.</p>
      </div>
    </div>
  )
}
