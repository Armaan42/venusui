"use client"

import * as React from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Users, Workflow, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"
import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

function photo(id: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

/** Client work. Made up; swap in your own projects. Each has a photo or a piece of artwork. */
type Project = { title: string; client: string; industry: string; text: string } & ({ src: string; alt: string } | { art: ArtName })

const projects: Project[] = [
  {
    title: "A launch site you can hear",
    client: "Tidewell Audio",
    industry: "Consumer tech",
    text: "Product pages that play each headphone's sound profile, and 3× the pre-orders of the last launch.",
    src: photo("1505740420928-5e560c06d30e", 900, 700),
    alt: "Black over-ear headphones on a yellow background",
  },
  {
    title: "Booking in three taps",
    client: "Halden Retreats",
    industry: "Travel",
    text: "A booking flow for twelve island villas that doubled bookings from phones in the first month.",
    src: photo("1566073771259-6a8506099945", 1300, 700),
    alt: "A wooden villa beside a pool at sunset",
  },
  {
    title: "A quieter brand for a fitness watch",
    client: "Copperleaf",
    industry: "Wearables",
    text: "Identity, packaging and an app home screen that stopped shouting at people about their steps.",
    src: photo("1523275335684-37898b6baf30", 1300, 700),
    alt: "A white minimalist wristwatch",
  },
  {
    title: "Ordering ahead, without the queue",
    client: "Kiln Corner Café",
    industry: "Hospitality",
    text: "An order-ahead app for a café with one very long queue. It paid for itself before summer.",
    src: photo("1517248135467-4c7edcad34c4", 900, 700),
    alt: "A restaurant with dark wooden floors, pendant lamps and tall chairs",
  },
  {
    title: "Account app for a family bank",
    client: "Brightwater",
    industry: "Finance",
    text: "A calmer banking app for families, with spending pots children can see and parents can set.",
    art: "night",
  },
  {
    title: "A portfolio that steps aside",
    client: "Oakline Architects",
    industry: "Architecture",
    text: "A portfolio where the buildings do the talking, and the studio can add a project in minutes.",
    src: photo("1487958449943-2429e8be8625", 1300, 700),
    alt: "An angular white building with glass walls",
  },
  {
    title: "Checkout people mention",
    client: "Kestrel Bikes",
    industry: "Retail",
    text: "A rebuilt checkout and size guide that cut abandoned carts by 28%.",
    art: "aurora",
  },
  {
    title: "Brand and shop for a stationery maker",
    client: "Paperkite",
    industry: "Retail",
    text: "A brand system and shop for hand-bound notebooks, and 41% fewer support emails.",
    art: "dune",
  },
  {
    title: "Patient booking, made plain",
    client: "Ridgeway Clinics",
    industry: "Health",
    text: "Booking and reminders for six clinics, written so people can use them in a waiting room.",
    art: "haze",
  },
  {
    title: "A learning app that remembers",
    client: "Fernhill School",
    industry: "Education",
    text: "Lessons that pick up where each pupil left off, and a dashboard teachers actually open.",
    art: "dusk",
  },
  {
    title: "Live departures for a ferry line",
    client: "Tidewell Ferries",
    industry: "Transport",
    text: "Real-time sailings, tickets on the phone and a status page that stays up when the sea doesn't.",
    art: "ink",
  },
  {
    title: "Menus that change with the season",
    client: "Halcyon Kitchens",
    industry: "Hospitality",
    text: "A menu and ordering system four restaurants update themselves, every season.",
    art: "rose",
  },
]

const perPage = 6
/** The grid alternates narrow and wide tiles, like a magazine spread. */
const spans = ["md:col-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-3"]

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Users, title: "One team from strategy to launch", text: "The people on your first call design, build and look after it." },
  { icon: Layers, title: "Design systems that scale", text: "Every project leaves you with components your team can reuse." },
  { icon: Workflow, title: "A clear process, no black box", text: "Working pages every Friday, and a shared channel with the team." },
]

function ReasonIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-11 place-items-center rounded-xl bg-agency-surface text-agency-accent ring-1 ring-border/60 transition-[rotate,background-color,color] duration-300 group-hover:-rotate-6 group-hover:bg-agency-accent group-hover:text-white dark:text-violet-300 dark:group-hover:text-white">
      <Icon aria-hidden="true" className="size-5" />
    </span>
  )
}

function ProjectCard({ project, span }: { project: Project; span: string }) {
  return (
    <a
      href="#"
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-agency-card ring-1 ring-border/60 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40",
        span,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-72">
        {"src" in project ? (
          <img
            src={project.src}
            alt={project.alt}
            width={1300}
            height={700}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <AgencyLandingArt name={project.art} className="size-full transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
        <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.industry}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 grid size-10 scale-75 place-items-center rounded-full bg-white text-neutral-900 opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
        <p className="text-xs text-muted-foreground">{project.client}</p>
        <h2 className="mt-1 text-lg font-medium">{project.title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{project.text}</p>
      </div>
    </a>
  )
}

/** All the studio's work, six at a time with pagination, then why clients choose Arcwell. Render it from `app/projects/page.tsx`. */
export function AgencyProjects() {
  const [pageIndex, setPageIndex] = React.useState(0)
  const pages = Math.ceil(projects.length / perPage)
  const listRef = React.useRef<HTMLDivElement>(null)
  const shown = projects.slice(pageIndex * perPage, pageIndex * perPage + perPage)

  const go = (next: number) => {
    setPageIndex(next)
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <AgencyShell page="projects">
      <section aria-labelledby="projects-title" className="pb-20 sm:pb-28">
        <AgencyPageHeader
          id="projects-title"
          eyebrow="Projects"
          title="Selected work"
          muted="across industries"
          lead="Brands, websites and apps for teams in travel, retail, finance, health and more. Each one started with a short call and a clear goal."
        >
          <AgencyLandingButton href="#contact">Start a project</AgencyLandingButton>
        </AgencyPageHeader>

        <div ref={listRef} className="mx-auto mt-16 max-w-6xl scroll-mt-28 px-4 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={pageIndex}
              aria-label={`Projects, page ${pageIndex + 1} of ${pages}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 md:grid-cols-5"
            >
              {shown.map((project, i) => (
                <li key={project.title} className={cn("flex", spans[i % spans.length])}>
                  <ProjectCard project={project} span="w-full" />
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <nav aria-label="Projects pages" className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => go(pageIndex - 1)}
              disabled={pageIndex === 0}
              aria-label="Previous page"
              className="grid size-10 place-items-center rounded-full bg-agency-card ring-1 ring-border/60 outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40 disabled:opacity-40"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={pageIndex === i ? "page" : undefined}
                className="grid size-10 place-items-center rounded-full text-sm tabular-nums ring-1 ring-border/60 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-[current=page]:bg-foreground aria-[current=page]:text-background aria-[current=page]:ring-foreground"
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go(pageIndex + 1)}
              disabled={pageIndex === pages - 1}
              aria-label="Next page"
              className="grid size-10 place-items-center rounded-full bg-agency-card ring-1 ring-border/60 outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40 disabled:opacity-40"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </nav>
        </div>
      </section>

      <section aria-labelledby="why-title" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Reveal>
            <AgencyLandingEyebrow>Why Arcwell</AgencyLandingEyebrow>
            <h2 id="why-title" className="mt-6 text-3xl font-medium tracking-tight sm:text-5xl">
              Why teams <span className="text-muted-foreground">choose us</span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {["1531123897727-8f129e1688ce", "1500648767791-00dcc994a43e", "1544005313-94ddf0286df2", "1560250097-0b93528c311a"].map(
                  (id) => (
                    <img
                      key={id}
                      src={portrait(id, 72)}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full border-2 border-agency-surface object-cover"
                    />
                  ),
                )}
              </div>
              <p className="text-left text-sm">
                <span className="block font-medium">Trusted by 60+ brands</span>
                <span className="text-muted-foreground">Across Europe and beyond</span>
              </p>
            </div>
          </Reveal>
          <RevealList as="div" className="mt-14 grid items-end gap-4 text-left md:grid-cols-3">
            <RevealItem as="div" className="group flex min-h-52 flex-col rounded-2xl bg-agency-card p-6 ring-1 ring-border/60 md:min-h-60">
              <ReasonIcon icon={reasons[0].icon} />
              <h3 className="mt-auto pt-8 text-xl font-medium">{reasons[0].title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{reasons[0].text}</p>
            </RevealItem>
            <div className="grid gap-4">
              {reasons.slice(1).map((reason) => (
                <RevealItem
                  as="div"
                  key={reason.title}
                  className="group flex min-h-52 flex-col rounded-2xl bg-agency-card p-6 ring-1 ring-border/60"
                >
                  <ReasonIcon icon={reason.icon} />
                  <h3 className="mt-auto pt-8 text-xl font-medium">{reason.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{reason.text}</p>
                </RevealItem>
              ))}
            </div>
            <RevealItem
              as="div"
              className="relative isolate flex min-h-52 flex-col justify-end overflow-hidden rounded-2xl p-6 text-white md:min-h-60"
            >
              <AgencyLandingArt name="night" className="absolute inset-0 -z-10 animate-agency-drift motion-reduce:animate-none" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 to-transparent" />
              <h3 className="text-xl font-medium">Results you can measure after launch</h3>
              <p className="mt-2 text-sm text-white/85">We agree the numbers that matter before we start, then report on them.</p>
            </RevealItem>
          </RevealList>
          <Reveal className="mt-12">
            <AgencyLandingButton href="#contact">Talk to our team</AgencyLandingButton>
          </Reveal>
        </div>
      </section>
    </AgencyShell>
  )
}
