"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal } from "./agency-landing-motion"

import { photos } from "./agency-about-media"

const mission =
  "We help ambitious teams turn a good idea into a product people choose. One team plans it, designs it, builds it and stays to grow it, so nothing gets lost between the strategy and the launch."

/** One word that goes from faint to full colour as the paragraph scrolls past. */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="motion-reduce:opacity-100!">
      {word}{" "}
    </motion.span>
  )
}

export function AgencyAboutMission() {
  const textRef = React.useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] })
  const visualRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress: visualProgress } = useScroll({ target: visualRef, offset: ["start end", "end start"] })
  // The cards drift at different speeds as you scroll, for a little depth.
  const back = useTransform(visualProgress, [0, 1], [40, -40])
  const front = useTransform(visualProgress, [0, 1], [90, -90])
  const words = mission.split(" ")

  return (
    <section aria-labelledby="mission-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <AgencyLandingEyebrow align="start">Our mission</AgencyLandingEyebrow>
            <h2 id="mission-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              Help good products find the people who need them
            </h2>
          </Reveal>
          {/* Read out as one sentence; each word brightens as you scroll. */}
          <p ref={textRef} className="mt-8 text-lg leading-8 text-pretty sm:text-xl sm:leading-9">
            <span className="sr-only">{mission}</span>
            <span aria-hidden="true">
              {words.map((word, i) => (
                <Word key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
              ))}
            </span>
          </p>
        </div>

        <div ref={visualRef} aria-hidden="true" className="relative mx-auto h-[26rem] w-full max-w-lg sm:h-[30rem]">
          <motion.div style={{ y: back }} className="absolute top-0 right-0 w-[78%]">
            <img
              src={photos.studio.src}
              alt=""
              width={1000}
              height={760}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]"
            />
          </motion.div>
          <motion.div style={{ y: front }} className="absolute bottom-6 left-0 w-56 sm:w-64">
            <div className="rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)]">
              <p className="text-xs text-white/70">Sign-ups after relaunch</p>
              <p className="mt-1 text-3xl font-medium tracking-tight">+34%</p>
              <svg viewBox="0 0 120 36" className="mt-3 h-9 w-full">
                <path
                  d="M0 30 L20 26 L40 28 L60 18 L80 20 L100 9 L120 4"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-2 text-[11px] text-white/60">Halden Retreats, 90 days after launch</p>
            </div>
          </motion.div>
          <motion.div style={{ y: back }} className="absolute right-4 bottom-0 hidden sm:right-8 sm:block">
            <div className="rounded-2xl bg-agency-card p-4 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.35)] ring-1 ring-border/60">
              <div className="flex gap-0.5 text-agency-accent">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1.5 text-sm font-medium">4.9 from 120 reviews</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
