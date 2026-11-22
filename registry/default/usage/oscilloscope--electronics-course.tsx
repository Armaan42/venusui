import { Oscilloscope } from "@/registry/default/ui/oscilloscope"

export const meta = {
  title: "Electronics course: Lissajous figures",
  description: "The oscilloscope in an electronics course, where students turn the knobs to draw Lissajous figures from two signals.",
}

// The course is made up.
const TRY = [
  ["1 : 1, 90°", "A circle"],
  ["1 : 2", "A figure of eight"],
  ["2 : 3", "A pretzel shape"],
]

export default function ElectronicsCourse() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Kestrel Academy · Electronics 2 · Lab 6</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Two signals, one picture</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Feed one wave to the horizontal input and another to the vertical, and the dot traces a shape. The ratio of the two frequencies sets
        the shape; the phase difference twists it.
      </p>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-[auto_minmax(0,1fr)]">
        <Oscilloscope className="mx-auto" defaultX={1} defaultY={1} defaultPhase={90} />
        <div>
          <h2 className="text-sm font-medium">Try these</h2>
          <dl className="mt-2 divide-y border-y text-sm">
            {TRY.map(([ratio, shape]) => (
              <div key={ratio} className="flex justify-between gap-4 py-3">
                <dt className="font-mono tabular-nums">{ratio}</dt>
                <dd className="text-muted-foreground">{shape}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">Write down what happens to the circle as you move the phase from 90° to 0°.</p>
        </div>
      </div>
    </div>
  )
}
