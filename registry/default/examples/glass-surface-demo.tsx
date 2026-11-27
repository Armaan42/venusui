import { CloudSun, MapPin } from "lucide-react"

import { GlassSurface } from "@/registry/default/ui/glass-surface"

export default function GlassSurfaceDemo() {
  return (
    <div className="relative isolate w-full max-w-3xl overflow-hidden rounded-3xl">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop&auto=format&q=80"
        alt="Mountain peaks rising above a sea of clouds at sunrise"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
        <GlassSurface className="p-6">
          <p className="flex items-center gap-1.5 text-sm text-white/85">
            <MapPin aria-hidden="true" className="size-4" />
            Alpine ridge, 2,340 m
          </p>
          <p className="mt-6 text-6xl font-light tracking-tight">4°</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm">
            <CloudSun aria-hidden="true" className="size-4" />
            Clearing by noon
          </p>
        </GlassSurface>
        <GlassSurface tint="light" className="flex flex-col justify-between p-6">
          <div>
            <p className="text-sm font-medium">Sunrise hike</p>
            <p className="mt-1 text-sm text-neutral-700">Meet at the lower station, 05:40</p>
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-sm text-neutral-700">8 going</span>
            <button
              type="button"
              className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white outline-none hover:bg-neutral-800 focus-visible:ring-3 focus-visible:ring-neutral-950/40"
            >
              Join
            </button>
          </div>
        </GlassSurface>
      </div>
    </div>
  )
}
