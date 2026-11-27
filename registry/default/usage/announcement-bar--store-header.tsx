import { Search, ShoppingBag } from "lucide-react"

import { AnnouncementBar } from "@/registry/default/ui/announcement-bar"

export const meta = {
  title: "Online store header",
  description:
    "An announcement bar above a homeware shop's header, rotating delivery, sale and returns news, and remembering when it's closed.",
}

// Hearth & Grain is a made-up shop.
const announcements = [
  { id: "delivery", content: "Free delivery on orders over €60", href: "#", linkLabel: "Delivery info" },
  { id: "sale", content: "Winter sale: up to 30% off throws and cushions", href: "#", linkLabel: "Shop the sale" },
  { id: "returns", content: "Free returns for 60 days" },
  { id: "stores", content: "Our Porto shop is now open on Sundays", href: "#", linkLabel: "Find us" },
]

export default function StoreHeader() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <AnnouncementBar announcements={announcements} storageKey="hearth-grain-winter-2026" className="bg-emerald-950 text-emerald-50" />
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <span className="text-lg font-semibold tracking-tight">Hearth &amp; Grain</span>
          <nav aria-label="Shop" className="hidden md:block">
            <ul className="flex gap-6 text-sm">
              {["Living", "Bedroom", "Kitchen", "Lighting", "Sale"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" className="grid size-10 place-items-center rounded-full hover:bg-muted">
              <Search aria-hidden="true" className="size-5" />
            </button>
            <button type="button" aria-label="Basket, 2 items" className="grid size-10 place-items-center rounded-full hover:bg-muted">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Slow furniture for warm rooms</h1>
        <p className="mt-4 max-w-md text-muted-foreground">Made to order in oak, linen and wool, and built to last a lifetime.</p>
      </main>
    </div>
  )
}
