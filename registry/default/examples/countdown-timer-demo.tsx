import { CountdownTimer } from "@/registry/default/ui/countdown-timer"

const nextNewYear = new Date(new Date().getFullYear() + 1, 0, 1)

export default function CountdownTimerDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">Until the new year</p>
      <CountdownTimer
        to={nextNewYear}
        label="Time until the new year"
        completed={<p className="text-2xl font-semibold">Happy new year!</p>}
      />
    </div>
  )
}
