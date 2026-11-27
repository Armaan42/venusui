import { CalendarDays, MapPin, Search, Users } from "lucide-react"

import { GlassSurface } from "@/registry/default/ui/glass-surface"

export const meta = {
  title: "Hotel search over a hero photo",
  description: "A glass search bar on a lakeside hotel's home page, so the photo stays the star while the form stays readable.",
}

// Stillwater Lodges is a made-up hotel group.
const fields = [
  { id: "where", label: "Where", icon: MapPin, value: "Lake Braies, Dolomites" },
  { id: "when", label: "When", icon: CalendarDays, value: "12 – 15 June" },
  { id: "who", label: "Guests", icon: Users, value: "2 adults" },
]

export default function HotelSearch() {
  return (
    <div className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-4 py-10 sm:px-10">
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000&h=1300&fit=crop&auto=format&q=80"
        alt="A rowing boat on a turquoise lake below steep mountains"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/50 via-black/10 to-black/20" />

      <p className="absolute top-8 left-4 text-lg font-semibold tracking-tight text-white sm:left-10">Stillwater Lodges</p>

      <div className="mx-auto w-full max-w-4xl">
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">Wake up on the water</h1>
        <p className="mt-3 max-w-md text-white/90">Twelve wooden lodges on the shore, each with its own jetty.</p>

        <GlassSurface className="mt-8 p-2 sm:rounded-full">
          <form
            className="grid gap-1 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto]"
            onSubmit={(event) => event.preventDefault()}
            aria-label="Find a lodge"
          >
            {fields.map((field) => (
              <label key={field.id} className="flex items-center gap-3 rounded-2xl px-4 py-2.5 hover:bg-white/10 sm:rounded-full">
                <field.icon aria-hidden="true" className="size-4 shrink-0 text-white/80" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-white/80">{field.label}</span>
                  <input
                    name={field.id}
                    defaultValue={field.value}
                    className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/60"
                  />
                </span>
              </label>
            ))}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 outline-none hover:bg-white/90 focus-visible:ring-3 focus-visible:ring-white/60"
            >
              <Search aria-hidden="true" className="size-4" />
              Search
            </button>
          </form>
        </GlassSurface>
      </div>
    </div>
  )
}
