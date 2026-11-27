import { ImageParallax } from "@/registry/default/ui/image-parallax"

export default function ImageParallaxDemo() {
  return (
    <ImageParallax
      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=1300&fit=crop&auto=format&q=80"
      alt="Green cliffs and morning mist above a winding valley"
      speed={0.2}
      zoom
      className="aspect-[16/10] w-full max-w-3xl rounded-3xl"
    >
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-6 pt-20 text-white sm:p-8">
        <p className="text-sm text-white/85">Isle of Skye · Day 3</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Into the mist before breakfast</p>
      </div>
    </ImageParallax>
  )
}
