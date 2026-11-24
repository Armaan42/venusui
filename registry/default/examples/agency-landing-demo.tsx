"use client"

import * as React from "react"

import { AgencyAbout } from "@/registry/default/blocks/agency-landing/components/agency-about"
import { AgencyLanding } from "@/registry/default/blocks/agency-landing/components/agency-landing"

// In your app these are two routes:
//   app/page.tsx        → <AgencyLanding />
//   app/about/page.tsx  → <AgencyAbout />
// This preview shows both in one place: `?page=about` opens the About page,
// and the navbar links switch between them (keeping any other query, like the theme).

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
  const page = new URLSearchParams(search).get("page") === "about" ? "about" : "home"

  const to = (target: "home" | "about", hash = "") => {
    const params = new URLSearchParams(search)
    params.set("page", target)
    return `?${params.toString()}${hash}`
  }

  if (page === "about") {
    return (
      <AgencyAbout
        links={[
          { label: "Home", href: to("home") },
          { label: "About us", href: to("about"), current: true },
          { label: "Services", href: to("home", "#services") },
          { label: "Projects", href: to("home", "#projects") },
          { label: "Team", href: "#team" },
        ]}
      />
    )
  }
  return (
    <AgencyLanding
      links={[
        { label: "About us", href: to("about") },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "Team", href: "#team" },
        { label: "FAQ", href: "#faq" },
      ]}
    />
  )
}
