import { Pager } from "@/registry/default/ui/pager"

export const meta = {
  title: "Restaurant waitlist",
  description: "The pager on a restaurant's waitlist page: messages arrive on the pager when your table is nearly ready.",
}

// The restaurant, guest and times are made up.
const MESSAGES = [{ from: "HALDEN", text: "YOU'RE ON THE LIST. PARTY OF 4. ABOUT 25 MIN.", time: "19:42" }]
const INCOMING = [
  { from: "HALDEN", text: "TWO TABLES AHEAD OF YOU NOW.", time: "19:58" },
  { from: "HALDEN", text: "YOUR TABLE IS READY. COME TO THE BAR.", time: "20:06" },
]

export default function RestaurantWaitlist() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Pager className="mx-auto" messages={MESSAGES} incoming={INCOMING} sound={false} />
      <div>
        <p className="text-sm text-muted-foreground">Halden Kitchen · Waitlist</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Go for a walk, we&apos;ll page you</h1>
        <p className="mt-2 text-muted-foreground">
          Party of 4 for Tomás. The river path is two minutes away. Keep this page open and the pager will buzz when we&apos;re nearly ready.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-y py-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Joined</dt>
            <dd className="mt-1 font-medium tabular-nums">19:42</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Quoted wait</dt>
            <dd className="mt-1 font-medium">About 25 min</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
