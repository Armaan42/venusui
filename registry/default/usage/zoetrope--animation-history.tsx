import { Zoetrope } from "@/registry/default/ui/zoetrope"

export const meta = {
  title: "Animation history lesson",
  description: "The zoetrope in an online course on the history of animation, showing how a spinning drum makes pictures move.",
}

// The course is made up.
export default function AnimationHistory() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Zoetrope className="mx-auto" defaultSpeed={40} />
      <div>
        <p className="text-sm text-muted-foreground">Paperkite Academy · Animation, from the start · Lesson 1</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Before film, there was the drum</h1>
        <p className="mt-2 text-muted-foreground">
          A zoetrope is a drum with slits and a strip of drawings inside. Spin it and look through the slits: each slit shows you one drawing
          for a split second, and your eye joins them into movement.
        </p>
        <p className="mt-4 text-muted-foreground">Change the speed. Too slow and it flickers; somewhere in the middle it suddenly comes alive.</p>
      </div>
    </div>
  )
}
