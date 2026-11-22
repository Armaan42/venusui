import { SnowGlobe } from "@/registry/default/ui/snow-globe"

export const meta = {
  title: "Company holiday e-card",
  description: "The snow globe as the front of a company's holiday e-card to its customers, with a short note from the team.",
}

// Sample photo. Swap in your own. The company and team are made up.
const PHOTO = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop&auto=format&q=80"

export default function HolidayCard() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-center">
      <SnowGlobe className="mx-auto" src={PHOTO} alt="A wide valley below snow-capped mountains" label="Kestrel 2026" />
      <h1 className="mt-10 font-serif text-3xl">Happy holidays</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Thank you for riding with us this year. The workshop closes from 24 December to 2 January. See you on the trails in the new year.
      </p>
      <p className="mt-4 text-sm">From all of us at Kestrel Bikes</p>
    </div>
  )
}
