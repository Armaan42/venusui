import { ZoomLightbox, type LightboxImage } from "@/registry/default/ui/zoom-lightbox"

const photos: [string, string][] = [
  ["1586023492125-27b2c045efd7", "A yellow armchair beside a floor lamp in a white room"],
  ["1556228453-efd6c1ff04f6", "A living room with a leather sofa, pink armchairs and plants"],
  ["1618221195710-dd6b41faaea6", "A bright living room with a grey sofa and wooden tables"],
  ["1578500494198-246f612d3b3d", "A tan sofa with a grey throw and dried grasses in a vase"],
  ["1582719478250-c89cae4dc85b", "A bedroom with a wooden floor and sunlight through sheer curtains"],
  ["1524758631624-e2822e304c36", "A bright lounge with soft chairs and a black floor lamp"],
]

const images: LightboxImage[] = photos.map(([id, alt]) => ({
  src: `https://images.unsplash.com/photo-${id}?w=1800&auto=format&q=80`,
  thumbnail: `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&auto=format&q=75`,
  alt,
}))

export default function ZoomLightboxDemo() {
  return <ZoomLightbox images={images} className="w-full max-w-3xl" />
}
