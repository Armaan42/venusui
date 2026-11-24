"use client"

import * as React from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingButton } from "./agency-landing-button"
import { AgencyLandingLogo } from "./agency-landing-logo"
import { agencyPages, useAgencySite, type AgencyPage } from "./agency-site"

/** The main links, and the pages tucked into the "Pages" menu. */
const mainPages: AgencyPage[] = ["about", "services", "projects", "blog"]
const morePages: AgencyPage[] = ["team", "pricing", "faq"]

const linkClass =
  "rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-[current=page]:font-medium aria-[current=page]:text-foreground"

/**
 * A floating header bar with the site's pages. The "Pages" menu holds the
 * rest; it opens on click, closes on Escape or a click outside, and returns
 * focus to its button. Below `md` everything moves into one disclosure menu.
 */
export function AgencyLandingNavbar() {
  const site = useAgencySite()
  const [open, setOpen] = React.useState(false)
  const [moreOpen, setMoreOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const moreRef = React.useRef<HTMLButtonElement>(null)
  const moreBoxRef = React.useRef<HTMLLIElement>(null)
  const menuId = React.useId()
  const moreId = React.useId()
  const [scrolled, setScrolled] = React.useState(false)

  // A stronger shadow and a slimmer bar once the page has scrolled.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!open && !moreOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      if (moreOpen) {
        setMoreOpen(false)
        moreRef.current?.focus()
      } else {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (moreOpen && !moreBoxRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open, moreOpen])

  const moreCurrent = morePages.includes(site.page)

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
            href={site.href("home")}
            aria-label="Arcwell home"
            className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
          >
            <AgencyLandingLogo />
          </a>

          <nav aria-label="Main" className="ml-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {mainPages.map((page) => (
                <li key={page}>
                  <a href={site.href(page)} aria-current={site.page === page ? "page" : undefined} className={linkClass}>
                    {agencyPages[page].label}
                  </a>
                </li>
              ))}
              <li ref={moreBoxRef} className="relative">
                <button
                  ref={moreRef}
                  type="button"
                  aria-expanded={moreOpen}
                  aria-controls={moreId}
                  onClick={() => setMoreOpen((value) => !value)}
                  className={cn(linkClass, "inline-flex items-center gap-1", moreCurrent && "font-medium text-foreground")}
                >
                  Pages
                  <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform", moreOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {moreOpen ? (
                    <motion.ul
                      id={moreId}
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-3 w-64 origin-top-right rounded-2xl bg-agency-card p-2 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.35)] ring-1 ring-border/60"
                    >
                      {morePages.map((page) => (
                        <li key={page}>
                          <a
                            href={site.href(page)}
                            aria-current={site.page === page ? "page" : undefined}
                            onClick={() => setMoreOpen(false)}
                            className="block rounded-xl px-3 py-2.5 outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-[current=page]:bg-agency-surface"
                          >
                            <span className="block text-sm font-medium">{agencyPages[page].label}</span>
                            <span className="block text-xs text-muted-foreground">{agencyPages[page].description}</span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </li>
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
          <ul className="grid grid-cols-2 gap-1">
            {(["home", ...mainPages, ...morePages] as AgencyPage[]).map((page) => (
              <li key={page}>
                <a
                  href={site.href(page)}
                  aria-current={site.page === page ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-2.5 text-sm font-medium outline-none hover:bg-agency-surface focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-[current=page]:bg-agency-surface"
                >
                  {agencyPages[page].label}
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
