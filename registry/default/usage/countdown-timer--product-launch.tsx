import { CountdownTimer } from "@/registry/default/ui/countdown-timer"

export const meta = {
  title: "Product launch page",
  description: "A countdown on a pre-launch page for a new pair of headphones, with a sign-up for the launch email.",
}

// Tidewell Audio and the launch are made up.
const LAUNCH = "2027-03-12T17:00:00Z"

export default function ProductLaunch() {
  return (
    <div className="dark relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center text-foreground">
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=1200&fit=crop&auto=format&q=80"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover opacity-25 grayscale"
      />
      <p className="text-sm tracking-widest text-muted-foreground uppercase">Tidewell Audio</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Hear the room, not the noise</h1>
      <p className="mt-4 max-w-md text-muted-foreground">Our first over-ear headphones go on sale on 12 March at 5 pm GMT.</p>
      <CountdownTimer
        to={LAUNCH}
        label="Time until the launch"
        className="mt-10"
        completed={<p className="mt-10 text-2xl font-semibold">On sale now</p>}
      />
      <form className="mt-10 flex w-full max-w-sm gap-2" aria-label="Launch email">
        <label htmlFor="launch-email" className="sr-only">
          Email address
        </label>
        <input
          id="launch-email"
          type="email"
          required
          placeholder="you@example.com"
          className="h-11 min-w-0 flex-1 rounded-full border bg-background/60 px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-full bg-foreground px-5 text-sm font-medium text-background outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Remind me
        </button>
      </form>
    </div>
  )
}
