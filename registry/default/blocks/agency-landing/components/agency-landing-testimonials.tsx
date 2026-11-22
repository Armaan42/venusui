import { Star } from "lucide-react"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"

type Review = { name: string; role: string; photo: string; stars: number; quote: string }

/** Made-up client reviews, in three columns. */
const columns: Review[][] = [
  [
    {
      name: "Rosa Ribeiro",
      role: "Owner, Halden Retreats",
      photo: "1438761681033-6461ffad8d80",
      stars: 5,
      quote: "Bookings from phones doubled in the first month, and the calls asking how to book stopped.",
    },
    {
      name: "Lars Holm",
      role: "Managing director, Copperleaf",
      photo: "1500648767791-00dcc994a43e",
      stars: 5,
      quote: "They asked to meet our engineers before showing us a single logo. It shows in the result.",
    },
  ],
  [
    {
      name: "Mei Lin",
      role: "Marketing lead, Tidewell Audio",
      photo: "1544005313-94ddf0286df2",
      stars: 5,
      quote: "We change the site every week on our own now, which is exactly what we asked for.",
    },
    {
      name: "Tomás Rivera",
      role: "Owner, Kiln Corner Café",
      photo: "1560250097-0b93528c311a",
      stars: 4,
      quote: "The queue out the door is shorter, and the order-ahead app paid for itself before summer.",
    },
  ],
  [
    {
      name: "Priya Raman",
      role: "Head of product, Brightwater",
      photo: "1531123897727-8f129e1688ce",
      stars: 5,
      quote: "Weekly demos meant no surprises. We knew exactly what we were getting long before launch.",
    },
    {
      name: "Jonas Keller",
      role: "Founder, Kestrel Bikes",
      photo: "1472099645785-5658abf4ff4e",
      stars: 5,
      quote: "Checkout used to be the bit we apologised for. Now it's the bit customers mention.",
    },
  ],
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex min-h-64 flex-col justify-between rounded-md bg-agency-card p-5">
      <figcaption className="flex items-center gap-3">
        <img src={portrait(review.photo, 96)} alt="" width={40} height={40} loading="lazy" className="size-10 rounded-sm bg-muted object-cover" />
        <span className="text-sm">
          <span className="block font-medium">{review.name}</span>
          <span className="text-xs text-muted-foreground">{review.role}</span>
        </span>
      </figcaption>
      <div className="mt-10">
        <p role="img" className="flex gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} aria-hidden="true" className={i < review.stars ? "size-4 fill-foreground text-foreground" : "size-4 fill-border text-border"} />
          ))}
        </p>
        <blockquote className="mt-3 text-sm text-pretty text-muted-foreground">&ldquo;{review.quote}&rdquo;</blockquote>
      </div>
    </figure>
  )
}

export function AgencyLandingTestimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Reviews</AgencyLandingEyebrow>
        <h2 id="testimonials-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          What clients say once the work is live
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          Written by the people we worked with, months after launch, when the results were in.
        </p>
        <AgencyLandingButton href="#contact" variant="secondary" className="mt-8">
          Become the next one
        </AgencyLandingButton>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-3 px-4 sm:px-6 md:grid-cols-3">
        <div className="grid gap-3 md:mt-24">
          {columns[0].map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
        <div className="grid gap-3">
          <ReviewCard review={columns[1][0]} />
          <div className="flex items-center justify-between gap-4 rounded-md bg-agency-card p-5">
            <div>
              <p className="text-4xl font-medium tracking-tight">
                4.9<span className="text-base text-muted-foreground">/5</span>
              </p>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">From 120 client reviews</p>
            </div>
          </div>
          <ReviewCard review={columns[1][1]} />
        </div>
        <div className="grid gap-3 md:mt-24">
          {columns[2].map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
