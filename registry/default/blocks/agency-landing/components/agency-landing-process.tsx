import { AgencyLandingArt } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"

const steps = [
  { when: "Weeks 1–2", title: "Discovery and a clear plan" },
  { when: "Weeks 3–8", title: "Design and build, side by side" },
  { when: "Launch and after", title: "Launch, measure and improve" },
]

export function AgencyLandingProcess() {
  return (
    <section aria-labelledby="process-title" className="bg-agency-card pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <AgencyLandingEyebrow align="start">Process</AgencyLandingEyebrow>
            <h2 id="process-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              A simple process, with you in the room
            </h2>
          </div>
          <div>
            <p className="text-sm text-pretty text-muted-foreground">
              Most projects take eight to twelve weeks. You see real, working pages every Friday instead of one big reveal at
              the end.
            </p>
            <AgencyLandingButton href="#contact" className="mt-6">
              Start a project
            </AgencyLandingButton>
          </div>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {steps.map((step, i) =>
            i === 0 ? (
              <li key={step.title} className="relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-md p-5 text-white">
                <AgencyLandingArt name="prism" className="absolute inset-0 -z-10" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-white/80">{step.when}</p>
                    <h3 className="mt-1 text-lg font-medium">{step.title}</h3>
                  </div>
                  <span className="text-4xl font-medium tabular-nums">.0{i + 1}</span>
                </div>
              </li>
            ) : (
              <li key={step.title} className="flex min-h-80 flex-col justify-between rounded-md border bg-agency-card p-5">
                <div>
                  <p className="text-xs text-muted-foreground">{step.when}</p>
                  <h3 className="mt-1 text-lg font-medium">{step.title}</h3>
                </div>
                <span className="self-end text-4xl font-medium tabular-nums">.0{i + 1}</span>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  )
}
