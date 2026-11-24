"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingButton } from "./agency-landing-button"
import { AgencyLandingLogo } from "./agency-landing-logo"

export type AgencyLandingNavLink = { label: string; href: string; /** Marks the page you're on. */ current?: boolean }

const defaultLinks: AgencyLandingNavLink[] = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
]

/**
 * A floating header bar. Below `md` the links move into a disclosure menu
 * that closes on Escape (returning focus to the toggle) or when a link is chosen.
 * Pass `links` to point it at other pages, e.g. from the About page.
 */
export function AgencyLandingNavbar({ links = defaultLinks }: { links?: AgencyLandingNavLink[] }) {
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const menuId = React.useId()
  const [scrolled, setScrolled] = React.useState(false)

  // A stronger shadow and a slimmer bar once the page has scrolled.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <motion.header
      className="sticky top-3 z-40 px-3 sm:px-6"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "mx-auto rounded-full bg-agency-card/90 ring-1 ring-border/60 backdrop-blur-md transition-[max-width,box-shadow] duration-500",
          scrolled
            ? "max-w-5xl shadow-[0_1px_2px_rgb(0_0_0/0.06),0_14px_34px_-14px_rgb(0_0_0/0.3)]"
            : "max-w-6xl shadow-[0_1px_2px_rgb(0_0_0/0.05),0_8px_24px_-12px_rgb(0_0_0/0.2)]",
        )}
      >
        <div className={cn("flex items-center gap-6 pr-2 pl-4 transition-[height] duration-500 sm:pl-5", scrolled ? "h-13" : "h-14")}>
          <a
            href="#"
            aria-label="Arcwell home"
            className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
          >
            <AgencyLandingLogo />
          </a>

          <nav aria-label="Main" className="ml-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={link.current ? "page" : undefined}
                    className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <AgencyLandingButton href="#contact" className="hidden h-10 md:inline-flex [&>span]:size-8">
            Contact us
          </AgencyLandingButton>

          <button
            ref={toggleRef}
            type="button"
            className="ml-auto grid size-10 place-items-center rounded-full outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-3xl bg-agency-card p-3 shadow-lg ring-1 ring-border/60 md:hidden"
      >
        <nav aria-label="Main">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-2.5 text-sm font-medium outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <AgencyLandingButton href="#contact" className="mt-3 w-full justify-between">
            Contact us
          </AgencyLandingButton>
        </nav>
      </div>
    </motion.header>
  )
}
