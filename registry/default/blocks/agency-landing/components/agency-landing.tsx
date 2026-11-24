import { AgencyLandingAbout } from "./agency-landing-about"
import { AgencyLandingCta } from "./agency-landing-cta"
import { AgencyLandingFaq } from "./agency-landing-faq"
import { AgencyLandingFooter } from "./agency-landing-footer"
import { AgencyLandingHero } from "./agency-landing-hero"
import { AgencyLandingMotion } from "./agency-landing-motion"
import { AgencyLandingNavbar, type AgencyLandingNavLink } from "./agency-landing-navbar"
import { AgencyLandingProcess } from "./agency-landing-process"
import { AgencyLandingProjects } from "./agency-landing-projects"
import { AgencyLandingResults } from "./agency-landing-results"
import { AgencyLandingServices } from "./agency-landing-services"
import { AgencyLandingStats } from "./agency-landing-stats"
import { AgencyLandingTeam } from "./agency-landing-team"
import { AgencyLandingTestimonials } from "./agency-landing-testimonials"

/**
 * Agency Landing: the home page of the site for Arcwell, a made-up design and
 * engineering studio. Every section is its own file, so reorder or remove
 * them here and edit the copy in each file. Render it from `app/page.tsx`,
 * and the About page (`<AgencyAbout />`) from `app/about/page.tsx`.
 *
 * `links` replaces the navbar's links, for example to point them at other routes.
 */
export function AgencyLanding({ links }: { links?: AgencyLandingNavLink[] }) {
  return (
    <AgencyLandingMotion>
      <div
        data-agency-landing=""
        className="flex min-h-svh flex-col bg-agency-surface text-foreground [--muted-foreground:var(--agency-muted)]"
      >
        <AgencyLandingNavbar links={links} />
        <main className="flex-1">
          <AgencyLandingHero />
          <AgencyLandingAbout />
          <AgencyLandingServices />
          <AgencyLandingProcess />
          <AgencyLandingProjects />
          <AgencyLandingResults />
          <AgencyLandingTeam />
          <AgencyLandingStats />
          <AgencyLandingTestimonials />
          <AgencyLandingFaq />
          <AgencyLandingCta />
        </main>
        <AgencyLandingFooter />
      </div>
    </AgencyLandingMotion>
  )
}
