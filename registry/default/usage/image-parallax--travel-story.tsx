import { ImageParallax } from "@/registry/default/ui/image-parallax"

export const meta = {
  title: "Travel story",
  description:
    "Parallax photos between the paragraphs of a long-read travel article, so each image breaks up the text with a sense of depth.",
}

// The magazine and writer are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=1800&h=1400&fit=crop&auto=format&q=80`

export default function TravelStory() {
  return (
    <article className="min-h-svh bg-background pb-24 text-foreground">
      <header className="mx-auto max-w-2xl px-6 pt-14 pb-10">
        <p className="text-sm text-muted-foreground">Field Notes · Issue 12 · Words by Ilse Varga</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Four days on the edge of the Highlands</h1>
        <p className="mt-4 text-lg text-muted-foreground">Rain, ridges and one perfect morning on the Isle of Skye.</p>
      </header>

      <ImageParallax
        src={photo("1470071459604-3b5ec3a7fe05")}
        alt="Green cliffs and morning mist above a winding valley"
        zoom
        className="mx-auto aspect-[16/9] max-w-6xl sm:rounded-3xl"
      />

      <div className="mx-auto max-w-2xl space-y-5 px-6 py-12 text-lg leading-8">
        <p>
          We left the car at the bottom of the glen before six. The forecast said rain by ten, so the plan was simple: walk fast, look up
          often and be back for breakfast.
        </p>
        <p>By the second ridge the mist had started to lift from the valley floor, slowly, like someone pulling a sheet off furniture.</p>
      </div>

      <ImageParallax
        src={photo("1464822759023-fed622ff2c3b")}
        alt="A wide valley of pine forest below snowy peaks"
        speed={0.25}
        className="mx-auto h-[70svh] max-w-6xl sm:rounded-3xl"
      >
        <p className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-sm text-white backdrop-blur">
          The view from the second ridge, 07:40
        </p>
      </ImageParallax>

      <div className="mx-auto max-w-2xl space-y-5 px-6 py-12 text-lg leading-8">
        <p>
          The rain arrived at ten past ten, exactly as promised. We were already in the café by then, drying our socks on the radiator and
          arguing about which ridge had the better view.
        </p>
      </div>
    </article>
  )
}
