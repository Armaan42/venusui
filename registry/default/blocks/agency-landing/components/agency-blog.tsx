"use client"

import * as React from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton } from "./agency-landing-button"
import { Reveal } from "./agency-landing-motion"
import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

function photo(id: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

const categories = ["All", "Design", "Development", "Marketing", "Brand"] as const
type Category = Exclude<(typeof categories)[number], "All">

/** Made-up articles. Swap in your own, or load them from your CMS. */
const featured = [
  {
    category: "Brand" as Category,
    author: "Hana Sato",
    date: "12 Nov 2026",
    title: "Building a brand system that scales across every touchpoint",
    text: "From logo lockups to tone of voice: how we write brand guidelines teams actually open.",
    src: photo("1552664730-d307ca884978", 1600, 800),
    alt: "A team meeting in a bright office, with sticky notes on the wall",
  },
  {
    category: "Development" as Category,
    author: "Amara Diallo",
    date: "4 Nov 2026",
    title: "How we keep marketing sites fast as they grow",
    text: "Budgets, image rules and the three checks that run before anything ships.",
    src: photo("1531973576160-7125cd663d86", 1600, 800),
    alt: "An open-plan office with long desks and strip lights on the ceiling",
  },
  {
    category: "Design" as Category,
    author: "Leo Martins",
    date: "28 Oct 2026",
    title: "The case for designing in the browser sooner",
    text: "Why our prototypes become real pages by week three, and what that saves our clients.",
    src: photo("1497366216548-37526070297c", 1600, 800),
    alt: "A bright open lobby with a kitchen counter and a long corridor",
  },
]

const posts: { category: Category; title: string; text: string; minutes: number; art: ArtName }[] = [
  {
    category: "Design",
    title: "Designing for conversion",
    text: "How we audit sign-up flows, find the drop-off and test a fix.",
    minutes: 6,
    art: "ink",
  },
  {
    category: "Marketing",
    title: "Our campaign launch playbook",
    text: "Briefing, production, rollout and the week after launch.",
    minutes: 7,
    art: "prism",
  },
  {
    category: "Development",
    title: "Building marketing sites people can edit",
    text: "Content models that marketing teams don't need us for.",
    minutes: 8,
    art: "silk",
  },
  {
    category: "Brand",
    title: "Brand identity essentials",
    text: "What goes into a visual identity that lasts: type, colour, voice and rules.",
    minutes: 5,
    art: "rose",
  },
  {
    category: "Design",
    title: "UX research on a small budget",
    text: "Five lightweight methods to test an idea before you build it.",
    minutes: 6,
    art: "haze",
  },
  {
    category: "Marketing",
    title: "Measuring what matters after launch",
    text: "The handful of numbers we report on, and the ones we ignore.",
    minutes: 6,
    art: "aurora",
  },
  {
    category: "Development",
    title: "Accessibility we check on every page",
    text: "Our checklist, from contrast to keyboard focus to motion.",
    minutes: 9,
    art: "night",
  },
  {
    category: "Brand",
    title: "Naming a product without a fight",
    text: "A workshop format that gets a shortlist in one afternoon.",
    minutes: 4,
    art: "dune",
  },
]

/** The featured posts, one at a time; it moves on by itself unless you hover it or prefer reduced motion. */
function Featured() {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const reduce = useReducedMotion()

  React.useEffect(() => {
    if (paused || reduce) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % featured.length), 6000)
    return () => window.clearTimeout(timer)
  }, [index, paused, reduce])

  const post = featured[index]
  return (
    <div
      className="mx-auto mt-14 max-w-6xl px-4 sm:px-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-3xl bg-agency-card ring-1 ring-border/60"
        aria-roledescription="carousel"
        aria-label="Featured articles"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${featured.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="overflow-hidden">
              <motion.img
                src={post.src}
                alt={post.alt}
                width={1600}
                height={800}
                className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-agency-accent/12 px-2.5 py-1 font-medium text-violet-800 uppercase dark:text-violet-200">
                  {post.category}
                </span>
                {post.author} · {post.date}
              </p>
              <h2 className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-balance sm:text-3xl">{post.title}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{post.text}</p>
              <AgencyLandingButton href="#" className="mt-6">
                Read the article
              </AgencyLandingButton>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous article"
          onClick={() => setIndex((i) => (i - 1 + featured.length) % featured.length)}
          className="grid size-9 place-items-center rounded-full bg-agency-card ring-1 ring-border/60 outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        {featured.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show article ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className="grid h-6 place-items-center px-0.5 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
          >
            <span
              className={cn("block h-2 rounded-full transition-all duration-300", i === index ? "w-6 bg-agency-accent" : "w-2 bg-border")}
            />
          </button>
        ))}
        <button
          type="button"
          aria-label="Next article"
          onClick={() => setIndex((i) => (i + 1) % featured.length)}
          className="grid size-9 place-items-center rounded-full bg-agency-card ring-1 ring-border/60 outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}

/** The studio's blog: a featured carousel, then every article filtered by topic. Render it from `app/blog/page.tsx`. */
export function AgencyBlog() {
  const [category, setCategory] = React.useState<(typeof categories)[number]>("All")
  const [limit, setLimit] = React.useState(6)
  const filtered = posts.filter((post) => category === "All" || post.category === category)
  const shown = filtered.slice(0, limit)

  return (
    <AgencyShell page="blog">
      <section aria-labelledby="blog-title">
        <AgencyPageHeader
          id="blog-title"
          eyebrow="Blog"
          title="Notes from"
          muted="the Arcwell studio"
          lead="What we learn on client work: design, engineering, marketing and the odd strong opinion about naming things."
        />
        <Featured />
      </section>

      <section aria-labelledby="articles-title" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="articles-title" className="sr-only">
            All articles
          </h2>
          <div role="group" aria-label="Filter by topic" className="flex flex-wrap justify-center gap-2 border-b pb-4 sm:gap-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => {
                  setCategory(item)
                  setLimit(6)
                }}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-pressed:font-medium aria-pressed:text-foreground"
              >
                {item}
                {category === item ? (
                  <motion.span layoutId="blog-tab" className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-agency-accent" />
                ) : null}
              </button>
            ))}
          </div>

          <p role="status" className="sr-only">
            {filtered.length} articles
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((post) => (
                <motion.li
                  key={post.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href="#"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-agency-card ring-1 ring-border/60 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                  >
                    <div className="overflow-hidden">
                      <AgencyLandingArt
                        name={post.art}
                        className="aspect-[16/10] w-full transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium text-agency-accent uppercase dark:text-violet-300">{post.category}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock aria-hidden="true" className="size-3.5" />
                          {post.minutes} min read
                        </span>
                      </p>
                      <h3 className="mt-3 text-lg font-medium group-hover:underline group-hover:underline-offset-4">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.text}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                        Read more
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {filtered.length > limit ? (
            <Reveal className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + 6)}
                className="group inline-flex h-11 items-center gap-3 rounded-full bg-agency-accent py-1 pr-1 pl-5 text-sm font-medium text-white outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
              >
                Load more articles
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-white text-agency-accent transition-transform group-hover:rotate-90"
                >
                  <ChevronRight className="size-4 rotate-90" />
                </span>
              </button>
            </Reveal>
          ) : null}
        </div>
      </section>
    </AgencyShell>
  )
}
