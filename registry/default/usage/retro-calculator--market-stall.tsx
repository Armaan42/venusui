import { RetroCalculator } from "@/registry/default/ui/retro-calculator"

export const meta = {
  title: "Market stall till",
  description: "The retro calculator beside today's price list in a market stall's simple selling app.",
}

// The stall and prices are made up.
const PRICES = [
  ["Tomatoes", "€3.20 / kg"],
  ["New potatoes", "€1.80 / kg"],
  ["Lettuce", "€1.10 each"],
  ["Strawberries", "€4.50 / punnet"],
  ["Eggs, half dozen", "€2.40"],
]

export default function MarketStall() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-start gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <p className="text-sm text-muted-foreground">Oakline Farm · Saturday market</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Today&apos;s prices</h1>
        <dl className="mt-6 divide-y border-y text-sm">
          {PRICES.map(([item, price]) => (
            <div key={item} className="flex justify-between gap-4 py-3">
              <dt>{item}</dt>
              <dd className="tabular-nums">{price}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">Cash or card. Bring your own bag and we&apos;ll take 10 cents off.</p>
      </div>
      <RetroCalculator className="mx-auto" />
    </div>
  )
}
