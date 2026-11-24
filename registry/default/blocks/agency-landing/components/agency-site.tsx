"use client"

import * as React from "react"

/**
 * The Arcwell site's pages and how to link between them. In your app each
 * page is its own route; `AgencyLink` and the navbar build every internal
 * link through `href`, so you can change the routes in one place.
 */
export type AgencyPage = "home" | "about" | "services" | "projects" | "blog" | "team" | "pricing" | "faq"

export const agencyPages: Record<AgencyPage, { label: string; description: string }> = {
  home: { label: "Home", description: "The studio at a glance" },
  about: { label: "About us", description: "Who we are and how we work" },
  services: { label: "Services", description: "What we design, build and grow" },
  projects: { label: "Projects", description: "Selected client work" },
  blog: { label: "Blog", description: "Notes from the studio" },
  team: { label: "Team", description: "The people you'll work with" },
  pricing: { label: "Pricing", description: "Retainers and project scopes" },
  faq: { label: "FAQ", description: "Answers before you get in touch" },
}

/** The default routes: `/` for home, `/about`, `/projects` and so on. */
export function defaultAgencyHref(page: AgencyPage, hash = "") {
  return page === "home" ? `/${hash}` : `/${page}${hash}`
}

type AgencySite = { page: AgencyPage; href: (page: AgencyPage, hash?: string) => string }

const AgencySiteContext = React.createContext<AgencySite>({ page: "home", href: defaultAgencyHref })

/**
 * Tells the navbar and links which page is showing. Pass `href` to change how
 * pages are linked (for example to add a base path); nested providers keep it.
 */
export function AgencySiteProvider({
  page,
  href,
  children,
}: {
  page?: AgencyPage
  href?: (page: AgencyPage, hash?: string) => string
  children: React.ReactNode
}) {
  const parent = React.useContext(AgencySiteContext)
  const value = React.useMemo(() => ({ page: page ?? parent.page, href: href ?? parent.href }), [page, href, parent])
  return <AgencySiteContext.Provider value={value}>{children}</AgencySiteContext.Provider>
}

export function useAgencySite() {
  return React.useContext(AgencySiteContext)
}

/** A link to one of the site's pages; it marks itself as current when that page is showing. */
export function AgencyLink({ to, hash, children, ...props }: { to: AgencyPage; hash?: string } & Omit<React.ComponentProps<"a">, "href">) {
  const site = useAgencySite()
  return (
    <a href={site.href(to, hash)} aria-current={site.page === to && !hash ? "page" : undefined} {...props}>
      {children}
    </a>
  )
}
