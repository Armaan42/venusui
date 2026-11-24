import { AgencyAboutHero } from "./agency-about-hero"
import { AgencyAboutMission } from "./agency-about-mission"
import { AgencyAboutStory } from "./agency-about-story"
import { AgencyAboutTeam } from "./agency-about-team"
import { AgencyAboutVision } from "./agency-about-vision"
import { AgencyShell } from "./agency-shell"

/** The About page of the Arcwell site. Render it from `app/about/page.tsx`. */
export function AgencyAbout() {
  return (
    <AgencyShell page="about">
      <AgencyAboutHero />
      <AgencyAboutMission />
      <AgencyAboutStory />
      <AgencyAboutVision />
      <AgencyAboutTeam />
    </AgencyShell>
  )
}
