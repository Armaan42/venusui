import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Playground } from "@/components/home/playground"
import { PlaygroundStage } from "@/components/home/playground-stage"
import { installCommand } from "@/config/site"

const NAMES = ["dotted-globe", "border-beam", "aurora-background", "spotlight-card"]

/**
 * The homepage playground, laid out like the other homepage sections and
 * following the site theme, with a short GSAP entrance. Install commands are
 * built here on the server, where the production site URL is known.
 */
export function HomePlayground() {
  const commands = Object.fromEntries(NAMES.map((name) => [name, installCommand(name)]))

  return (
    <section aria-labelledby="playground" className="border-b">
      <PlaygroundStage className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p data-pg-reveal className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Playground
            </p>
            <h2 id="playground" data-pg-title className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Tune it, then take the code
            </h2>
            <p data-pg-reveal className="mt-3 text-pretty text-muted-foreground">
              Change the props and watch the component and its code update together. Copy the result straight into your project.
            </p>
          </div>
          <Link
            data-pg-reveal
            href="/components"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Browse components <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <div data-pg-block className="mt-12">
          <Playground commands={commands} />
        </div>
      </PlaygroundStage>
    </section>
  )
}
