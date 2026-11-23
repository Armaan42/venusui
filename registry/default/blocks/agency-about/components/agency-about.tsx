import { AgencyLandingCta } from "@/registry/default/blocks/agency-landing/components/agency-landing-cta"
import { AgencyLandingFooter } from "@/registry/default/blocks/agency-landing/components/agency-landing-footer"
import { AgencyLandingMotion } from "@/registry/default/blocks/agency-landing/components/agency-landing-motion"
import { AgencyLandingNavbar } from "@/registry/default/blocks/agency-landing/components/agency-landing-navbar"

import { AgencyAboutHero } from "./agency-about-hero"
import { AgencyAboutMission } from "./agency-about-mission"
import { AgencyAboutStory } from "./agency-about-story"
import { AgencyAboutTeam } from "./agency-about-team"
import { AgencyAboutVision } from "./agency-about-vision"

/** The navbar's links on the About page: back to the home page's sections, and this page marked as current. */
const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about", current: true },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "#team" },
]

/**
 * Agency About: the About page for Arcwell, the made-up studio from Agency
 * Landing. It reuses that template's navbar, contact section and footer, so
 * the two pages match. Render it from `app/about/page.tsx`.
 */
export function AgencyAbout() {
  return (
    <AgencyLandingMotion>
      <div
        data-agency-landing=""
        className="flex min-h-svh flex-col bg-agency-surface text-foreground [--muted-foreground:var(--agency-muted)]"
      >
        <AgencyLandingNavbar links={links} />
        <main className="flex-1">
          <AgencyAboutHero />
          <AgencyAboutMission />
          <AgencyAboutStory />
          <AgencyAboutVision />
          <AgencyAboutTeam />
          <AgencyLandingCta />
        </main>
        <AgencyLandingFooter />
      </div>
    </AgencyLandingMotion>
  )
}
