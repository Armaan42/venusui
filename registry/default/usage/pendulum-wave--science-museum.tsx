import { PendulumWave } from "@/registry/default/ui/pendulum-wave"

export const meta = {
  title: "Science museum exhibit page",
  description: "The pendulum wave on a science museum's exhibit page, swinging in and out of step just like the one in the hall.",
}

// The museum and exhibit are made up.
export default function ScienceMuseum() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">The Engine Shed · Hall of Motion</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">The pendulum wave</h1>
      <p className="mt-2 text-muted-foreground">
        Fifteen pendulums, each a little shorter than the last, so each swings a little faster. They start together, drift into snakes and
        waves, and line up again every minute.
      </p>
      <PendulumWave className="mx-auto mt-8" count={15} cycle={60} />
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-medium">Where</dt>
          <dd className="text-muted-foreground">Ground floor, by the café</dd>
        </div>
        <div>
          <dt className="font-medium">Good for</dt>
          <dd className="text-muted-foreground">Ages 6 and up</dd>
        </div>
        <div>
          <dt className="font-medium">Talk</dt>
          <dd className="text-muted-foreground">Weekends at 11:00 and 15:00</dd>
        </div>
      </dl>
    </div>
  )
}
