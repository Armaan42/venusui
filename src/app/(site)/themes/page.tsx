import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { ComponentPreview } from "@/components/site/component-preview"
import { ThemeCss } from "@/components/site/theme-css"
import { ThemePanel } from "@/components/site/theme-customizer"
import { ThemePresets } from "@/components/site/theme-presets"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getItem } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Start from a ready-made theme or pick your own brand color, surface tint, chart colors and radius. Every VenusUI component, block and preview follows it live; copy the CSS into your project.",
}

/** Live demos shown in the gallery: components that use the primary color, borders and radius. */
const GALLERY = [
  "shimmer-button",
  "segmented-control",
  "toggle-switch",
  "timeline",
  "stepper",
  "rating",
  "number-stepper",
  "tag-input",
  "progress-ring",
  "animated-tabs",
  "floating-label-input",
  "like-button",
]

/** Bar heights (percent) for the sample chart: four groups of five series. */
const CHART_GROUPS = [
  [45, 70, 55, 85, 40],
  [60, 50, 75, 65, 55],
  [80, 65, 90, 50, 70],
  [55, 85, 60, 95, 65],
]

export default function ThemesPage() {
  const tiles = GALLERY.flatMap((name) => {
    const item = getItem("components", name)
    return item ? [{ name, title: item.title }] : []
  })

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Themes</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Make it yours</h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          Start from a ready-made theme or pick your own colors. Every component, block and preview on VenusUI follows it live, in light and
          dark. When you like it, copy the CSS into your project&apos;s <code className="font-mono text-sm">globals.css</code>.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <ThemePanel title="Customize" className="lg:max-h-[calc(100svh-6.5rem)]" />
        </aside>

        <div className="min-w-0 space-y-10">
          <ThemePresets />

          <section aria-labelledby="gallery" className="space-y-4">
            <h2 id="gallery" className="text-lg font-semibold tracking-tight">
              Live components
            </h2>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-medium">Buttons and badges</h3>
              <p className="mt-1 text-sm text-muted-foreground">The accent sets the primary color; the radius rounds every corner.</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Delete</Button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge>New</Badge>
                <Badge variant="secondary">Beta</Badge>
                <Badge variant="outline">v0.1.0</Badge>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-medium">Charts</h3>
              <p className="mt-1 text-sm text-muted-foreground">The chart palette colors each series, from --chart-1 to --chart-5.</p>
              <div aria-hidden="true" className="mt-5 flex h-36 items-end gap-6 border-b pb-px">
                {CHART_GROUPS.map((group, g) => (
                  <div key={g} className="flex h-full flex-1 items-end gap-1">
                    {group.map((height, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-[calc(var(--radius)*0.5)] transition-[height] duration-500"
                        style={{ height: `${height}%`, background: `var(--chart-${i + 1})` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="size-2.5 rounded-sm" style={{ background: `var(--chart-${n})` }} />
                    Series {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {tiles.map((tile) => (
                <article key={tile.name} className="flex flex-col overflow-hidden rounded-xl border bg-card">
                  <ComponentPreview name={tile.name} className="min-h-48 flex-1 border-b" />
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <h3 className="text-sm font-medium">
                      <Link href={`/components/${tile.name}`} className="hover:underline hover:underline-offset-4">
                        {tile.title}
                      </Link>
                    </h3>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="css" className="space-y-4">
            <div>
              <h2 id="css" className="text-lg font-semibold tracking-tight">
                Your theme as CSS
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Replace the <code className="font-mono">:root</code> and <code className="font-mono">.dark</code> blocks in your{" "}
                <code className="font-mono">globals.css</code> with these. Every VenusUI and shadcn component picks them up.
              </p>
            </div>
            <ThemeCss />
          </section>
        </div>
      </div>
    </div>
  )
}
