import { cn } from "@/lib/utils"

/**
 * Abstract artwork drawn with layered CSS gradients, standing in for 3D
 * renders. No image files: swap an <AgencyLandingArt> for a real <img> of
 * your work whenever you have one.
 */
const ART = {
  ink: [
    "radial-gradient(120% 80% at 15% 110%, #0b2a6f 0%, transparent 60%)",
    "radial-gradient(70% 60% at 85% 20%, #f6efe6 0%, transparent 65%)",
    "linear-gradient(150deg, #f3ebe2 0%, #8fb3e6 38%, #1d4fb8 62%, #071a45 100%)",
  ],
  dune: [
    "radial-gradient(60% 90% at 20% 30%, #f4c6a8 0%, transparent 60%)",
    "radial-gradient(70% 80% at 80% 70%, #a9d6c2 0%, transparent 62%)",
    "repeating-linear-gradient(115deg, rgb(255 255 255 / 0.28) 0 18px, transparent 18px 46px)",
    "linear-gradient(160deg, #f7e3d2 0%, #c9e2d3 55%, #8fbfa6 100%)",
  ],
  prism: [
    "radial-gradient(55% 70% at 35% 45%, #ff6a8a 0%, transparent 60%)",
    "radial-gradient(50% 60% at 65% 35%, #ffb23f 0%, transparent 62%)",
    "radial-gradient(60% 50% at 50% 85%, #6ec3ff 0%, transparent 65%)",
    "linear-gradient(180deg, #ffe7c2 0%, #f7c9d8 50%, #b7d8f5 100%)",
  ],
  haze: [
    "radial-gradient(80% 50% at 50% 60%, #ffb3a1 0%, transparent 60%)",
    "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.35) 0 3px, transparent 3px 14px)",
    "linear-gradient(180deg, #e9e4f7 0%, #f3d6e2 50%, #cfd9f3 100%)",
  ],
  aurora: [
    "radial-gradient(70% 90% at 20% 20%, #ffffff 0%, transparent 55%)",
    "radial-gradient(60% 80% at 70% 40%, #ff9de2 0%, transparent 60%)",
    "radial-gradient(60% 70% at 40% 80%, #7ad9ff 0%, transparent 60%)",
    "linear-gradient(135deg, #f5f0ff 0%, #c9b7ff 50%, #6aa7ff 100%)",
  ],
  rose: [
    "radial-gradient(90% 60% at 70% 30%, #ffd1dc 0%, transparent 60%)",
    "radial-gradient(80% 70% at 30% 90%, #9b1238 0%, transparent 65%)",
    "linear-gradient(170deg, #fbe3ea 0%, #f07aa0 55%, #6d0b2a 100%)",
  ],
  silk: [
    "radial-gradient(60% 50% at 30% 30%, #fff8ee 0%, transparent 60%)",
    "repeating-radial-gradient(circle at 70% 60%, rgb(255 255 255 / 0.35) 0 10px, transparent 10px 28px)",
    "linear-gradient(140deg, #f6e7d6 0%, #f2c9b4 50%, #dfeedd 100%)",
  ],
  night: [
    "radial-gradient(70% 60% at 30% 75%, #3b6cff 0%, transparent 60%)",
    "radial-gradient(60% 50% at 75% 85%, #9ec5ff 0%, transparent 55%)",
    "linear-gradient(180deg, #05060a 0%, #0b1330 60%, #1d3d9e 100%)",
  ],
  dusk: [
    "radial-gradient(80% 60% at 60% 70%, #3a3ad8 0%, transparent 60%)",
    "radial-gradient(70% 50% at 30% 40%, #b9b3f5 0%, transparent 60%)",
    "linear-gradient(180deg, #f0eef7 0%, #d8d2f2 45%, #5b56d6 100%)",
  ],
} as const

export type ArtName = keyof typeof ART

export function AgencyLandingArt({ name, className }: { name: ArtName; className?: string }) {
  return <div aria-hidden="true" className={cn("bg-cover", className)} style={{ backgroundImage: ART[name].join(", ") }} />
}
