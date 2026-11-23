/** Customer logos. These brands are made up; put your customers' logos here (with their permission). */
const customers = [
  { name: "Northlight", mark: <path d="M4 20 12 4l8 16h-5l-3-6-3 6Z" /> },
  { name: "Brightloop", mark: <path d="M12 3a9 9 0 1 0 9 9h-4a5 5 0 1 1-5-5Z" /> },
  { name: "Kestrel", mark: <path d="M3 12 12 3l9 9-9 9Zm9-4-4 4 4 4 4-4Z" fillRule="evenodd" /> },
  { name: "Fernway", mark: <path d="M12 2c4 4 6 8 6 12a6 6 0 0 1-12 0c0-4 2-8 6-12Z" /> },
  { name: "Oakline", mark: <path d="M3 5h18v4H3Zm0 5h12v4H3Zm0 5h18v4H3Z" /> },
  { name: "Quanta", mark: <path d="M12 2 21 7v10l-9 5-9-5V7Zm0 5-4.5 2.5v5L12 17l4.5-2.5v-5Z" fillRule="evenodd" /> },
  { name: "Tidewell", mark: <path d="M2 14c3-3 5-3 8 0s5 3 8 0 3-3 4-2v4c-1-1-1-1-4 2s-5 3-8 0-5-3-8 0Z" /> },
  { name: "Halden", mark: <path d="M4 3h4v7h8V3h4v18h-4v-7H8v7H4Z" /> },
]

/** A slow, endless strip of customer logos that pauses on hover. It stands still with reduced motion. */
export function SaasLandingLogos() {
  return (
    <section aria-labelledby="saas-landing-logos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 id="saas-landing-logos" className="text-center text-sm font-medium text-muted-foreground">
          Trusted by 2,400+ product teams, from two-person startups to public companies
        </h2>
        <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="flex w-max animate-saas-marquee items-center gap-16 hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-24">
            {[...customers, ...customers].map((customer, i) => (
              <li
                key={`${customer.name}-${i}`}
                aria-hidden={i >= customers.length || undefined}
                className="flex shrink-0 items-center gap-2.5 text-foreground/65 transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
                  {customer.mark}
                </svg>
                <span className="text-xl font-semibold tracking-tight">{customer.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
