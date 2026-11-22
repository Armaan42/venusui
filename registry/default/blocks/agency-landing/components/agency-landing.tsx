import { AgencyLandingAbout } from "./agency-landing-about"
import { AgencyLandingCta } from "./agency-landing-cta"
import { AgencyLandingFaq } from "./agency-landing-faq"
import { AgencyLandingFooter } from "./agency-landing-footer"
import { AgencyLandingHero } from "./agency-landing-hero"
import { AgencyLandingMotion } from "./agency-landing-motion"
import { AgencyLandingNavbar } from "./agency-landing-navbar"
import { AgencyLandingProcess } from "./agency-landing-process"
import { AgencyLandingProjects } from "./agency-landing-projects"
import { AgencyLandingResults } from "./agency-landing-results"
import { AgencyLandingServices } from "./agency-landing-services"
import { AgencyLandingStats } from "./agency-landing-stats"
import { AgencyLandingTeam } from "./agency-landing-team"
import { AgencyLandingTestimonials } from "./agency-landing-testimonials"

/**
 * Agency Landing: the full site for Arcwell, a made-up design and
 * engineering studio. Every section is its own file, so reorder or remove
 * them here and edit the copy in each file. Render it from `app/page.tsx`.
 */
export function AgencyLanding() {
  return (
    <AgencyLandingMotion>
      <div className="flex min-h-svh flex-col bg-agency-surface text-foreground [--muted-foreground:var(--agency-muted)]">
        <AgencyLandingNavbar />
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
