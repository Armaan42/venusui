"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

import { MotionLibraryLogo } from "./motion-library-logo"
import { Scramble } from "./motion-library-motion"

const links = [
  { label: "Library", href: "#library", count: 86 },
  { label: "Assistant", href: "#assistant" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#" },
]

/**
 * A slim fixed bar. It turns solid once the page scrolls, slides away while
 * you scroll down and returns as soon as you scroll up. Link labels scramble
 * on hover. Below `md` the links move into a disclosure menu.
 */
export function MotionLibraryNavbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = React.useState(false)
  const [away, setAway] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const menuId = React.useId()

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setAway(y > 320 && y > previous)
  })

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: away && !open ? -80 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "flex h-14 items-center gap-6 border-b px-4 transition-[background-color,border-color] duration-500 sm:px-6",
          solid || open ? "border-ml-line bg-ml-bg/85 backdrop-blur-md" : "border-transparent",
        )}
      >
        <a href="#top" aria-label="Orrery home" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ml-accent">
          <MotionLibraryLogo />
        </a>
        <nav aria-label="Main" className="mx-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-start gap-1 rounded-md px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-ml-muted uppercase transition-colors outline-none hover:text-ml-ink focus-visible:ring-2 focus-visible:ring-ml-accent"
                >
                  <Scramble text={link.label} trigger="hover" duration={0.45} />
                  {link.count ? <span className="text-[9px] text-ml-ink">{link.count}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm text-ml-muted outline-none hover:text-ml-ink focus-visible:ring-2 focus-visible:ring-ml-accent"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="group relative inline-flex h-9 items-center overflow-hidden rounded-md bg-ml-accent px-4 text-sm font-medium text-ml-on-accent outline-none focus-visible:ring-2 focus-visible:ring-ml-ink"
          >
            {/* The label rolls up and a copy rolls in from below on hover. */}
            <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[150%]">
              Get access
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-4 translate-y-[150%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            >
              Get access
            </span>
          </a>
        </div>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid size-10 place-items-center rounded-md outline-none hover:bg-ml-ink/10 focus-visible:ring-2 focus-visible:ring-ml-accent md:hidden"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-b border-ml-line bg-ml-bg/95 px-4 pt-2 pb-5 backdrop-blur-md md:hidden"
          >
            <nav aria-label="Main">
              <ul className="divide-y divide-ml-line">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3 font-mono text-xs tracking-[0.12em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-ml-accent"
                    >
                      {link.label}
                      {link.count ? <span className="text-ml-muted">{link.count}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href="#" className="grid h-11 place-items-center rounded-md border border-ml-line text-sm">
                  Sign in
                </a>
                <a
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="grid h-11 place-items-center rounded-md bg-ml-accent text-sm font-medium text-ml-on-accent"
                >
                  Get access
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
