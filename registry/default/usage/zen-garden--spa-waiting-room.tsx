import { ZenGarden } from "@/registry/default/ui/zen-garden"

export const meta = {
  title: "Spa check-in screen",
  description: "The zen garden on a spa's check-in screen, something calm to do with your hands before your treatment.",
}

// The spa, guest and treatment are made up.
export default function SpaWaitingRoom() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Halcyon Spa · Checked in</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Welcome, Ana. Mei will be with you at 15:30.</h1>
      <p className="mt-2 text-muted-foreground">Sixty-minute massage, room 3. Until then, rake the sand, move the stones, and let the day go quiet.</p>
      <ZenGarden className="mt-8" maxStones={5} />
      <p className="mt-6 text-sm text-muted-foreground">Herbal tea and water are by the window. Phones on silent, please.</p>
    </div>
  )
}
