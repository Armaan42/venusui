import { Playground } from "@/components/home/playground"
import { PlaygroundParticles } from "@/components/home/playground-particles"
import { PlaygroundStage } from "@/components/home/playground-stage"
import { installCommand } from "@/config/site"

const NAMES = ["dotted-globe", "border-beam", "aurora-background", "spotlight-card"]

/**
 * The homepage playground on a dark stage: a three.js field of dots behind it
 * and a GSAP scroll entrance in front. Install commands are built here on the
 * server, where the production site URL is known, and passed to the client.
 */
export function HomePlayground() {
  const commands = Object.fromEntries(NAMES.map((name) => [name, installCommand(name)]))

  return (
    <section aria-labelledby="playground" className="dark relative isolate overflow-hidden border-b bg-background text-foreground">
      <PlaygroundParticles className="-z-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_70%,transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]"
      />
      <PlaygroundStage className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p data-pg-eyebrow className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Playground
          </p>
          <h2 id="playground" data-pg-title className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Tune it, then take the code
          </h2>
          <p data-pg-lead className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Change the props and watch the component and its code update together. Copy the result straight into your project.
          </p>
        </div>
        <Playground commands={commands} />
      </PlaygroundStage>
    </section>
  )
}
