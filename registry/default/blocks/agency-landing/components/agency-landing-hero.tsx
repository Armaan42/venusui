import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton } from "./agency-landing-button"
import { heroAvatars, portrait } from "./agency-landing-media"
import { CountUp, HeroWheel, Reveal, RevealWords } from "./agency-landing-motion"

/** Made-up clients, set as plain wordmarks. Swap in real logos once you have permission. */
const clients = [
  { name: "Tidewell", className: "font-semibold tracking-tight" },
  { name: "Halden", className: "font-serif italic" },
  {
    name: "COPPERLEAF",
    className: "text-[0.8em] font-medium tracking-[0.2em]",
  },
  { name: "Kiln Corner", className: "font-serif font-semibold" },
  { name: "oakline", className: "font-bold tracking-tighter" },
]

/** The cards on the hero wheel: a label and a piece of artwork, with a short line on the back. */
const cards: { label: string; art: ArtName; back: string }[] = [
  { label: "Brand identity", art: "silk", back: "Names, logos and systems" },
  { label: "Product design", art: "night", back: "Apps people enjoy using" },
  { label: "Motion & visuals", art: "haze", back: "Brands that move" },
  { label: "Web platforms", art: "ink", back: "Fast sites, easy to edit" },
  { label: "Growth", art: "prism", back: "More of the right customers" },
  { label: "Campaigns", art: "aurora", back: "Launches people remember" },
]

/** Six designs, three times round: 18 cards at 20 degrees fill the wheel. */
const wheel = [0, 1, 2].flatMap((lap) => cards.map((card) => ({ ...card, key: `${card.label}-${lap}` })))

export function AgencyLandingHero() {
  return (
    <section className="overflow-hidden pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1 className="text-[2.6rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
            <RevealWords text="Design, build and grow, with one studio behind you" />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-lg text-pretty text-muted-foreground">
              Arcwell is a team of designers and engineers who turn rough ideas into brands, websites and apps people enjoy using, then help
              them grow after launch.
            </p>
          </Reveal>
          <Reveal delay={0.65} className="mt-9 flex flex-wrap gap-3">
            <AgencyLandingButton href="#contact">Start a project</AgencyLandingButton>
            <AgencyLandingButton href="#projects" variant="secondary">
              See our work
            </AgencyLandingButton>
          </Reveal>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <Reveal delay={0.35}>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {heroAvatars.map((id) => (
                  <img
                    key={id}
                    src={portrait(id, 96)}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-full border-2 border-agency-surface bg-muted object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-medium">
                140+ teams have launched
                <br />
                with us since 2014
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <dt className="sr-only">Projects delivered on time</dt>
                <dd className="text-3xl font-medium tracking-tight">
                  <CountUp value={96} suffix="%" />
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">Projects delivered on time</dd>
              </div>
              <div>
                <dt className="sr-only">Clients who come back</dt>
                <dd className="text-3xl font-medium tracking-tight">
                  <CountUp value={7} suffix=" in 10" duration={1} />
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">Clients who come back for more</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.55}>
            <div
              aria-label="Some of our clients"
              role="group"
              className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            >
              <ul className="flex w-max animate-agency-marquee items-center gap-10 text-lg text-foreground/70 hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[...clients, ...clients].map((client, i) => (
                  <li key={`${client.name}-${i}`} aria-hidden={i >= clients.length || undefined} className={client.className}>
                    {client.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* The fan of tilted service cards. Decorative: the services section lists them properly. */}
      <HeroWheel
        cards={wheel.map((card) => ({
          key: card.key,
          front: (
            <div className="rounded-md bg-agency-card p-3 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.35)]">
              <p className="mb-3 text-sm font-medium sm:text-base">{card.label}</p>
              <AgencyLandingArt name={card.art} className="aspect-[4/5] w-full" />
            </div>
          ),
          back: (
            <div className="flex size-full flex-col justify-between rounded-md bg-agency-accent p-4 text-white shadow-[0_24px_40px_-20px_rgb(0_0_0/0.35)]">
              <svg viewBox="0 0 32 32" className="size-8">
                <circle cx="16" cy="16" r="16" fill="white" />
                <path
                  d="M9 21a7 7 0 0 1 14 0"
                  fill="none"
                  stroke="currentColor"
                  className="text-agency-accent"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <p className="text-lg leading-tight font-medium sm:text-2xl">{card.label}</p>
                <p className="mt-2 text-xs text-white sm:text-sm">{card.back}</p>
              </div>
            </div>
          ),
        }))}
      />

      <Reveal delay={1.1} className="-mt-16 flex justify-center pb-6 sm:-mt-10">
        <a
          href="#projects"
          aria-label="See more of our work"
          className="group relative grid size-28 place-items-center rounded-full bg-agency-card shadow-[0_8px_24px_-12px_rgb(0_0_0/0.3)] transition-transform duration-500 outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-agency-accent/40"
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="absolute inset-0 size-full animate-[spin_18s_linear_infinite] group-hover:[animation-duration:6s] motion-reduce:animate-none"
          >
            <defs>
              <path id="agency-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1 -74 0" />
            </defs>
            <text className="fill-foreground text-[9px] tracking-[0.32em] uppercase">
              <textPath href="#agency-ring" textLength="230" lengthAdjust="spacing">
                See more work · Arcwell ·{" "}
              </textPath>
            </text>
          </svg>
          <span className="grid size-10 place-items-center rounded-full bg-foreground text-background transition-transform group-hover:translate-y-1">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
              <path d="M8 1v11.2l4.2-4.2 1.1 1.1L8 15.4 2.7 9.1l1.1-1.1L8 12.2V1z" />
            </svg>
          </span>
        </a>
      </Reveal>
    </section>
  )
}
