"use client"

import {
  Building2,
  Check,
  Code2,
  Compass,
  HeartPulse,
  Megaphone,
  PenTool,
  Search,
  Shapes,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { motion } from "motion/react"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { CountUp, Reveal, RevealItem, RevealList } from "./agency-landing-motion"
import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: PenTool,
    title: "Product design",
    text: "Research, prototypes and interfaces that make the hard part of your product feel easy.",
  },
  { icon: Code2, title: "Web development", text: "Fast, accessible websites and web apps, built so your team can keep them up to date." },
  { icon: Compass, title: "Brand strategy", text: "Positioning and messaging that give your brand a clear voice people remember." },
  { icon: Megaphone, title: "Digital marketing", text: "Campaigns across search, social and email that bring in the right customers." },
  { icon: ShoppingBag, title: "E-commerce", text: "Shops and checkouts tuned for conversion, repeat orders and smooth fulfilment." },
  { icon: Smartphone, title: "Mobile apps", text: "Native-feeling apps for iOS and Android, designed for daily use and built to last." },
  { icon: Search, title: "Search and content", text: "Site structure and writing that earn search traffic and answer real questions." },
  { icon: Shapes, title: "Brand identity", text: "Logos, type and colour systems that hold up on a phone screen and a shop sign." },
  { icon: TrendingUp, title: "Growth marketing", text: "Experiments, landing pages and lifecycle email that keep customers coming back." },
]

const industries: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShoppingBag,
    title: "Retail and e-commerce",
    text: "Product pages, size guides and checkouts that lift order value and repeat purchases.",
  },
  {
    icon: Building2,
    title: "SaaS and startups",
    text: "Marketing sites, design systems and product interfaces that help software teams ship faster.",
  },
  {
    icon: HeartPulse,
    title: "Health and public services",
    text: "Accessible booking, records and information that people can use under pressure.",
  },
]

const stack = ["Design and prototyping tools", "Modern web frameworks", "Analytics and CRM platforms"]

/** A small, decorative dashboard collage for the tools section. */
function ToolsCollage() {
  const bars = [40, 62, 48, 80, 58, 92, 70]
  return (
    <div aria-hidden="true" className="relative mx-auto h-[26rem] w-full max-w-lg">
      <motion.div
        className="absolute top-12 left-0 w-64 rounded-3xl bg-agency-card p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.4)] ring-1 ring-border/60"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-lg font-medium">Project budget</p>
        <p className="mt-3 text-xs text-muted-foreground">Spent this quarter</p>
        <p className="text-2xl font-medium tracking-tight text-agency-accent">
          <CountUp value={48260} prefix="€" />
        </p>
        <div className="mt-5 flex items-center gap-3 border-t pt-4">
          <img
            src={portrait("1506794778202-cad84cf45f1d", 80)}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">Leo Martins</p>
            <p className="text-xs text-muted-foreground">Product designer</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1.5 text-center text-[11px]">
          {["Design", "Build", "Test", "Launch"].map((step, i) => (
            <span key={step} className={i < 3 ? "rounded-md bg-agency-accent/15 py-1 font-medium" : "rounded-md bg-agency-surface py-1"}>
              {step}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-0 right-6 w-56 rounded-2xl bg-neutral-950 p-4 text-white shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-white/70">Weekly sessions</p>
            <p className="text-lg font-medium">41,379</p>
          </div>
          <span className="rotate-6 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-neutral-950">+20%</span>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2">
          {bars.map((height, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-md bg-linear-to-t from-emerald-500 to-emerald-300"
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0 bottom-10 w-48 rounded-2xl bg-agency-card p-4 text-center shadow-[0_30px_60px_-30px_rgb(0_0_0/0.4)] ring-1 ring-border/60"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <svg viewBox="0 0 120 64" className="mx-auto w-32">
          <path
            d="M10 60a50 50 0 0 1 100 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-agency-surface"
            strokeLinecap="round"
          />
          <motion.path
            d="M10 60a50 50 0 0 1 100 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-agency-accent"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.75 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <p className="-mt-2 text-xl font-medium">75%</p>
        <p className="text-xs text-muted-foreground">Tasks shipped this sprint</p>
      </motion.div>
    </div>
  )
}

/** Everything the studio does, how it fits your tools, and who it works for. Render it from `app/services/page.tsx`. */
export function AgencyServices() {
  return (
    <AgencyShell page="services">
      <section aria-labelledby="services-page-title" className="pb-20 sm:pb-28">
        <AgencyPageHeader
          id="services-page-title"
          eyebrow="Our services"
          title="Full-service digital work,"
          muted="built to grow your brand"
          lead="From the first impression to the last click of checkout, we help ambitious brands design, build and market the products people use every day."
        />
        <RevealList className="mx-auto mt-16 grid max-w-6xl gap-x-8 gap-y-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.title} className="group">
              <span className="grid size-12 place-items-center rounded-2xl bg-agency-card ring-1 ring-border/60 transition-[background-color,color,rotate] duration-300 group-hover:-rotate-6 group-hover:bg-agency-accent group-hover:text-white">
                <service.icon aria-hidden="true" className="size-5" />
              </span>
              <h2 className="mt-5 text-xl font-medium">{service.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.text}</p>
              <AgencyLandingButton href="#contact" className="mt-5 h-10 [&>span]:size-8">
                Read more
                <span className="sr-only"> about {service.title.toLowerCase()}</span>
              </AgencyLandingButton>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      <section aria-labelledby="tools-title" className="bg-agency-card py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <ToolsCollage />
          <Reveal>
            <AgencyLandingEyebrow align="start">Tools and tech</AgencyLandingEyebrow>
            <h2 id="tools-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              Built with the tools your team already uses
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              We work inside your design, development and analytics setup, so every project fits your stack and keeps scaling after we hand
              it over.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {stack.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-agency-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <AgencyLandingButton href="#contact" className="mt-10">
              Ask about your stack
            </AgencyLandingButton>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cases-title" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <AgencyLandingEyebrow align="start">Use cases</AgencyLandingEyebrow>
              <h2 id="cases-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
                Digital work shaped to your industry
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-pretty text-muted-foreground">
                Every sector has its own rules and its own customers. We bring experience from retail, software and health, so you
                don&apos;t pay for us to learn your world.
              </p>
            </Reveal>
          </div>
          <RevealList className="mt-14 grid gap-6 md:grid-cols-3">
            {industries.map((industry) => (
              <RevealItem
                key={industry.title}
                className="group rounded-3xl bg-agency-card p-7 ring-1 ring-border/60 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.4)]"
              >
                <industry.icon
                  aria-hidden="true"
                  className="size-8 text-agency-accent transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="mt-6 text-xl font-medium">{industry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{industry.text}</p>
                <AgencyLandingButton href="#contact" variant="secondary" className="mt-6 h-10 [&>span]:size-8">
                  <Sparkles aria-hidden="true" className="-ml-1 size-4 text-agency-accent" />
                  See how we help
                </AgencyLandingButton>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>
    </AgencyShell>
  )
}
