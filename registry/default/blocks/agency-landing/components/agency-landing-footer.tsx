import { AgencyLandingLogo } from "./agency-landing-logo"

const columns = [
  { title: "Company", links: ["About us", "Team", "Careers"] },
  { title: "Support", links: ["FAQ", "Process", "Contact"] },
  { title: "Legal", links: ["Terms and conditions", "Privacy policy"] },
]

const social = ["Instagram", "LinkedIn", "Newsletter"]

export function AgencyLandingFooter() {
  return (
    <footer className="bg-agency-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <AgencyLandingLogo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Arcwell is a design and engineering studio for brands, websites and apps, from first sketch to growth after launch.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            {social.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="inline-flex h-8 items-center rounded-full bg-agency-surface px-3 text-muted-foreground hover:text-foreground"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-lg font-medium">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto max-w-6xl border-t px-4 py-6 text-center text-sm sm:px-6">© 2026 Arcwell Studio. All rights reserved.</div>
    </footer>
  )
}
