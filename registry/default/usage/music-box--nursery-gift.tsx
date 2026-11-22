import { Button } from "@/components/ui/button"
import { MusicBox } from "@/registry/default/ui/music-box"

export const meta = {
  title: "Nursery gift shop",
  description: "The music box on a gift shop's product page: turn the crank to hear the tune before you buy.",
}

// The shop and product are made up.
export default function NurseryGift() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <MusicBox className="mx-auto" />
      <div>
        <p className="text-sm text-muted-foreground">Paperkite Toys · New baby</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Wooden crank music box</h1>
        <p className="mt-2 text-muted-foreground">
          A walnut box with a brass movement that plays Twinkle, Twinkle. Turn the crank to hear it. We engrave a name inside the lid for free.
        </p>
        <p className="mt-4 text-2xl font-semibold">€38</p>
        <div className="mt-4 flex gap-3">
          <Button>Add to basket</Button>
          <Button variant="outline">Add engraving</Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Not a toy for under 3s: the crank has small parts.</p>
      </div>
    </div>
  )
}
