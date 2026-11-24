import { AgencyLandingCta } from "./agency-landing-cta"
import { AgencyLandingFooter } from "./agency-landing-footer"
import { AgencyLandingMotion } from "./agency-landing-motion"
import { AgencyLandingNavbar } from "./agency-landing-navbar"
import { AgencySiteProvider, type AgencyPage } from "./agency-site"

/**
 * The frame every Arcwell page shares: motion settings, colours, the navbar,
 * the page's sections, the contact section and the footer. `page` marks the
 * current page in the navbar.
 */
export function AgencyShell({ page, children, contact = true }: { page: AgencyPage; children: React.ReactNode; contact?: boolean }) {
  return (
    <AgencySiteProvider page={page}>
      <AgencyLandingMotion>
        <div
          data-agency-landing=""
          className="flex min-h-svh flex-col bg-agency-surface text-foreground [--muted-foreground:var(--agency-muted)]"
        >
          <AgencyLandingNavbar />
          <main className="flex-1">
            {children}
            {contact ? <AgencyLandingCta /> : null}
          </main>
          <AgencyLandingFooter />
        </div>
      </AgencyLandingMotion>
    </AgencySiteProvider>
  )
}
