import { Button } from "@/components/ui/button"
import { NeonSign } from "@/registry/default/ui/neon-sign"

export const meta = {
  title: "Custom neon sign shop",
  description: "The neon sign as a live preview in a sign maker's configurator: type your words and pick the tube colour.",
}

// The shop and prices are made up.
const SIZES = [
  ["Small", "60 cm wide", "€190"],
  ["Medium", "90 cm wide", "€260"],
  ["Large", "120 cm wide", "€340"],
]

export default function SignMaker() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Copperleaf Signs · Make your own</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Design your neon sign</h1>
      <p className="mt-2 text-muted-foreground">Type up to 24 characters and pick a colour. What you see is what we bend.</p>
      <NeonSign className="mt-8" defaultText="Open late" editable flickerAt={5} />
      <fieldset className="mt-8">
        <legend className="text-sm font-medium">Size</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {SIZES.map(([name, width, price], i) => (
            <label key={name} className="flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm has-[:checked]:border-foreground has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
              <span>
                <input type="radio" name="size" defaultChecked={i === 1} className="sr-only" />
                <span className="font-medium">{name}</span>
                <span className="block text-muted-foreground">{width}</span>
              </span>
              <span className="tabular-nums">{price}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Button className="mt-6">Order this sign</Button>
    </div>
  )
}
