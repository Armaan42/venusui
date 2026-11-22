import { NewtonsCradle } from "@/registry/default/ui/newtons-cradle"

export const meta = {
  title: "Physics lesson: momentum",
  description: "Newton's cradle in an online physics lesson about momentum and energy, with questions to think about as it swings.",
}

// The course is made up.
const QUESTIONS = [
  "Lift one ball and let go. Why does only one ball fly out at the other end?",
  "Now lift two. What changes, and what stays the same?",
  "It always stops in the end. Where does the energy go?",
]

export default function PhysicsLesson() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Oakline Learning · Physics · Forces and motion</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Momentum goes somewhere</h1>
      <p className="mt-2 text-muted-foreground">
        When one ball hits the row, its momentum passes through the still balls and out the far end. Pull a ball aside to try it.
      </p>
      <NewtonsCradle className="mx-auto mt-8" balls={5} duration={20} />
      <ol className="mt-8 space-y-3">
        {QUESTIONS.map((question, i) => (
          <li key={question} className="flex gap-3 text-sm">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border text-xs tabular-nums">{i + 1}</span>
            <span className="pt-0.5">{question}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
