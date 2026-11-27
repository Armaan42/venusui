import { ShowreelPlayer } from "@/registry/default/ui/showreel-player"

export const meta = {
  title: "Studio home page reel",
  description: "A showreel player at the top of a design studio's home page, with each chapter naming the project on screen.",
}

// Arcwell is a made-up studio. The footage shows VenusUI's own templates.
const chapters = [
  { start: 0, title: "Arcwell studio site" },
  { start: 4.5, title: "Pulsewise launch" },
  { start: 9, title: "Night Shelf" },
  { start: 13.5, title: "Orrery motion wall" },
  { start: 18, title: "Arcwell about page" },
]

export default function StudioHome() {
  return (
    <div className="dark min-h-svh bg-background px-4 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold tracking-tight">Arcwell</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Sites and products people enjoy using</h1>
          <p className="max-w-xs text-sm text-muted-foreground">
            Five recent projects in twenty-three seconds. Pick a chapter to jump straight to one.
          </p>
        </div>
        <ShowreelPlayer
          src="/media/venusui-showreel.webm"
          poster="/media/venusui-showreel-poster.jpg"
          title="Arcwell showreel"
          description="2026 · Selected work"
          chapters={chapters}
          className="mt-8"
        />
      </div>
    </div>
  )
}
