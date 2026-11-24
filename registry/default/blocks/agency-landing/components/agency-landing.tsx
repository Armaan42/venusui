import { AgencyLandingAbout } from "./agency-landing-about"
import { AgencyLandingFaq } from "./agency-landing-faq"
import { AgencyLandingHero } from "./agency-landing-hero"
import { AgencyLandingProcess } from "./agency-landing-process"
import { AgencyLandingProjects } from "./agency-landing-projects"
import { AgencyLandingResults } from "./agency-landing-results"
import { AgencyLandingServices } from "./agency-landing-services"
import { AgencyLandingStats } from "./agency-landing-stats"
import { AgencyLandingTeam } from "./agency-landing-team"
import { AgencyLandingTestimonials } from "./agency-landing-testimonials"
import { AgencyShell } from "./agency-shell"

/**
 * Agency Landing: the home page of the site for Arcwell, a made-up design and
 * engineering studio. The template is a whole site: render this from
 * `app/page.tsx`, and the other pages (`AgencyAbout`, `AgencyServices`,
 * `AgencyProjects`, `AgencyBlog`, `AgencyTeam`, `AgencyPricing`, `AgencyFaq`)
 * from `app/about/page.tsx`, `app/services/page.tsx` and so on. Every
 * section is its own file, so reorder or remove them here.
 */
export function AgencyLanding() {
  return (
    <AgencyShell page="home">
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
    </AgencyShell>
  )
}
