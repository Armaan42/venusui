import { AgencyLandingCta } from "./agency-landing-cta"
import { AgencyLandingFooter } from "./agency-landing-footer"
import { AgencyLandingMotion } from "./agency-landing-motion"
import { AgencyLandingNavbar, type AgencyLandingNavLink } from "./agency-landing-navbar"
import { AgencyAboutHero } from "./agency-about-hero"
import { AgencyAboutMission } from "./agency-about-mission"
import { AgencyAboutStory } from "./agency-about-story"
import { AgencyAboutTeam } from "./agency-about-team"
import { AgencyAboutVision } from "./agency-about-vision"

/** The navbar's links on the About page: back to the home page's sections, and this page marked as current. */
const aboutLinks: AgencyLandingNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about", current: true },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "#team" },
]

/**
 * The About page of the Arcwell site, the second page of the Agency Landing
 * template. It shares the home page's navbar, contact section and footer, so
 * the two pages match. Render it from `app/about/page.tsx`.
 *
 * `links` replaces the navbar's links, for example to point them at other routes.
 */
export function AgencyAbout({ links = aboutLinks }: { links?: AgencyLandingNavLink[] }) {
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
