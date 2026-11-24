"use client"

import * as React from "react"

import { AgencyAbout } from "@/registry/default/blocks/agency-landing/components/agency-about"
import { AgencyBlog } from "@/registry/default/blocks/agency-landing/components/agency-blog"
import { AgencyFaq } from "@/registry/default/blocks/agency-landing/components/agency-faq"
import { AgencyLanding } from "@/registry/default/blocks/agency-landing/components/agency-landing"
import { AgencyPricing } from "@/registry/default/blocks/agency-landing/components/agency-pricing"
import { AgencyProjects } from "@/registry/default/blocks/agency-landing/components/agency-projects"
import { AgencyServices } from "@/registry/default/blocks/agency-landing/components/agency-services"
import { AgencySiteProvider, agencyPages, type AgencyPage } from "@/registry/default/blocks/agency-landing/components/agency-site"
import { AgencyTeam } from "@/registry/default/blocks/agency-landing/components/agency-team"

// In your app every page is its own route (app/page.tsx, app/about/page.tsx, app/projects/page.tsx…),
// and the links need no setup. This preview shows all eight pages at one address instead:
// `?page=projects` opens Projects, and the navbar and footer links switch pages, keeping the rest of the query.

const pages: Record<AgencyPage, () => React.ReactElement> = {
  home: AgencyLanding,
  about: AgencyAbout,
  services: AgencyServices,
  projects: AgencyProjects,
  blog: AgencyBlog,
  team: AgencyTeam,
  pricing: AgencyPricing,
  faq: AgencyFaq,
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange)
  return () => window.removeEventListener("popstate", onChange)
}

export default function Page() {
  // The server render (and the first client render) is the home page; the URL decides after that.
  const search = React.useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  )
  const requested = new URLSearchParams(search).get("page")
  const page: AgencyPage = requested && Object.hasOwn(agencyPages, requested) ? (requested as AgencyPage) : "home"

  const href = React.useCallback(
    (target: AgencyPage, hash = "") => {
      const params = new URLSearchParams(search)
      params.set("page", target)
      return `?${params.toString()}${hash}`
    },
    [search],
  )

  const Current = pages[page]
  return (
    <AgencySiteProvider href={href}>
      <Current />
    </AgencySiteProvider>
  )
}
