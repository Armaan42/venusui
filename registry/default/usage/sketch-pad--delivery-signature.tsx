import { Button } from "@/components/ui/button"
import { SketchPad } from "@/registry/default/ui/sketch-pad"

export const meta = {
  title: "Delivery signature",
  description: "The sketch pad as the signature box in a courier's delivery app, signed by the customer at the door.",
}

// The courier, customer and parcel are made up.
export default function DeliverySignature() {
  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <p className="text-sm text-muted-foreground">Kestrel Courier · Stop 14 of 22</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Sign for your parcel</h1>
      <dl className="mt-4 grid grid-cols-2 gap-4 border-y py-4 text-sm">
        <div>
          <dt className="text-muted-foreground">For</dt>
          <dd className="mt-1 font-medium">Priya Raman</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Parcel</dt>
          <dd className="mt-1 font-medium">1 box, 4.2 kg</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm font-medium">Sign with your finger</p>
      <SketchPad className="mt-2" width={320} height={160} />
      <Button className="mt-6 w-full">Confirm delivery</Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">We&apos;ll email a photo of the parcel and your signature.</p>
    </div>
  )
}
