/**
 * Everything in the room that needs a picture is drawn on a canvas here, so
 * the template ships with no image files: book spines, the night sky, the
 * clock face, a framed print, the moonlight on the wall and a box label.
 */

/** A small seeded random, so the room looks the same on every visit. */
export function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function canvas(width: number, height: number) {
  const el = document.createElement("canvas")
  el.width = width
  el.height = height
  const ctx = el.getContext("2d")!
  return { el, ctx }
}

const FONT = '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'

/** A book spine: cloth color with a soft sheen, number at the top, title running down. */
export function spineCanvas({
  color,
  ink,
  number,
  title,
  subtitle,
  accent = "#e0782f",
}: {
  color: string
  ink: string
  number?: string
  title?: string
  subtitle?: string
  accent?: string
}) {
  const { el, ctx } = canvas(128, 1024)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 128, 1024)
  // Rounded spine: darker edges, a lighter band down the middle.
  const sheen = ctx.createLinearGradient(0, 0, 128, 0)
  sheen.addColorStop(0, "rgba(0,0,0,0.28)")
  sheen.addColorStop(0.35, "rgba(255,255,255,0.08)")
  sheen.addColorStop(0.65, "rgba(255,255,255,0.02)")
  sheen.addColorStop(1, "rgba(0,0,0,0.32)")
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, 128, 1024)
  // Cloth grain.
  const rand = seeded(title ? title.length * 97 : 7)
  ctx.globalAlpha = 0.06
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = rand() > 0.5 ? "#fff" : "#000"
    ctx.fillRect(rand() * 128, rand() * 1024, 1, 2 + rand() * 4)
  }
  ctx.globalAlpha = 1
  // Bands at head and tail.
  ctx.fillStyle = "rgba(0,0,0,0.18)"
  ctx.fillRect(0, 40, 128, 3)
  ctx.fillRect(0, 980, 128, 3)
  if (number) {
    ctx.fillStyle = accent
    ctx.font = `600 34px ${FONT}`
    ctx.textAlign = "center"
    ctx.fillText(number, 64, 110)
  }
  if (title) {
    ctx.save()
    ctx.translate(64, 160)
    ctx.rotate(Math.PI / 2)
    ctx.fillStyle = ink
    ctx.font = `600 64px ${FONT}`
    ctx.textBaseline = "middle"
    ctx.fillText(title, 0, 6)
    const titleWidth = ctx.measureText(title).width
    if (subtitle) {
      ctx.globalAlpha = 0.7
      ctx.font = `400 26px ${FONT}`
      ctx.fillText(subtitle, titleWidth + 28, 10)
    }
    ctx.restore()
  }
  return el
}

/** A plain background book: muted cloth, sometimes a gilt band or a short title. */
export function plainSpineCanvas(color: string, seed: number, label?: string) {
  const { el, ctx } = canvas(64, 512)
  const rand = seeded(seed)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 64, 512)
  const sheen = ctx.createLinearGradient(0, 0, 64, 0)
  sheen.addColorStop(0, "rgba(0,0,0,0.35)")
  sheen.addColorStop(0.4, "rgba(255,255,255,0.06)")
  sheen.addColorStop(1, "rgba(0,0,0,0.35)")
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, 64, 512)
  ctx.fillStyle = "rgba(214,178,110,0.55)"
  if (rand() > 0.4) {
    ctx.fillRect(6, 40, 52, 2)
    ctx.fillRect(6, 470, 52, 2)
  }
  if (label) {
    ctx.save()
    ctx.translate(32, 90)
    ctx.rotate(Math.PI / 2)
    ctx.font = `500 22px ${FONT}`
    ctx.textBaseline = "middle"
    ctx.fillText(label, 0, 0)
    ctx.restore()
  }
  return el
}

/** The view through the window: deep blue sky, stars, a moon, hills and a few warm windows. */
export function skyCanvas() {
  const { el, ctx } = canvas(512, 640)
  const sky = ctx.createLinearGradient(0, 0, 0, 640)
  sky.addColorStop(0, "#08122a")
  sky.addColorStop(0.6, "#13254a")
  sky.addColorStop(1, "#1c2f52")
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, 512, 640)
  const rand = seeded(42)
  for (let i = 0; i < 140; i++) {
    const r = rand() * 1.4 + 0.3
    ctx.globalAlpha = 0.35 + rand() * 0.65
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(rand() * 512, rand() * 420, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
  const glow = ctx.createRadialGradient(340, 150, 10, 340, 150, 120)
  glow.addColorStop(0, "rgba(220,230,255,0.45)")
  glow.addColorStop(1, "rgba(220,230,255,0)")
  ctx.fillStyle = glow
  ctx.fillRect(200, 20, 280, 280)
  ctx.fillStyle = "#f4f1e6"
  ctx.beginPath()
  ctx.arc(340, 150, 26, 0, Math.PI * 2)
  ctx.fill()
  // Hills.
  ctx.fillStyle = "#0a1428"
  ctx.beginPath()
  ctx.moveTo(0, 520)
  for (let x = 0; x <= 512; x += 16) ctx.lineTo(x, 500 - Math.sin(x / 70) * 26 - Math.sin(x / 23) * 6)
  ctx.lineTo(512, 640)
  ctx.lineTo(0, 640)
  ctx.fill()
  // Town lights.
  for (let i = 0; i < 26; i++) {
    ctx.fillStyle = rand() > 0.3 ? "#ffb35c" : "#ffd89a"
    ctx.globalAlpha = 0.5 + rand() * 0.5
    ctx.fillRect(rand() * 512, 540 + rand() * 80, 2, 2)
  }
  ctx.globalAlpha = 1
  return el
}

/** The clock face: paper white, twelve ticks and a thin rim. */
export function clockCanvas() {
  const { el, ctx } = canvas(256, 256)
  ctx.fillStyle = "#f3eee3"
  ctx.beginPath()
  ctx.arc(128, 128, 124, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = "#2b2620"
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2
    const long = i % 5 === 0
    ctx.lineWidth = long ? 5 : 2
    ctx.beginPath()
    ctx.moveTo(128 + Math.sin(a) * (long ? 96 : 104), 128 - Math.cos(a) * (long ? 96 : 104))
    ctx.lineTo(128 + Math.sin(a) * 112, 128 - Math.cos(a) * 112)
    ctx.stroke()
  }
  return el
}

/** A framed print on the shelf: an orange sun setting into blue stripes. */
export function printCanvas() {
  const { el, ctx } = canvas(256, 320)
  ctx.fillStyle = "#f2ece0"
  ctx.fillRect(0, 0, 256, 320)
  ctx.fillStyle = "#1f3a66"
  ctx.fillRect(28, 28, 200, 220)
  ctx.fillStyle = "#e0782f"
  ctx.beginPath()
  ctx.arc(128, 150, 46, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#1f3a66"
  for (let y = 150; y < 248; y += 14) ctx.fillRect(28, y, 200, 7)
  ctx.fillStyle = "#2b2620"
  ctx.font = `600 15px ${FONT}`
  ctx.fillText("Low Tide", 28, 276)
  ctx.font = `400 11px ${FONT}`
  ctx.globalAlpha = 0.6
  ctx.fillText("Screenprint, 2024", 28, 294)
  return el
}

/** Moonlight on the wall: the window's four panes, very soft. */
export function moonlightCanvas() {
  const { el, ctx } = canvas(512, 512)
  ctx.filter = "blur(18px)"
  ctx.fillStyle = "rgba(170,190,235,0.9)"
  const panes = [
    [70, 60, 170, 180],
    [270, 60, 170, 180],
    [70, 270, 170, 180],
    [270, 270, 170, 180],
  ]
  for (const [x, y, w, h] of panes) ctx.fillRect(x, y, w, h)
  return el
}

/** The label on the storage box. */
export function labelCanvas(text: string) {
  const { el, ctx } = canvas(256, 96)
  ctx.fillStyle = "#efe7d6"
  ctx.fillRect(0, 0, 256, 96)
  ctx.strokeStyle = "#2b2620"
  ctx.lineWidth = 3
  ctx.strokeRect(10, 10, 236, 76)
  ctx.fillStyle = "#2b2620"
  ctx.font = `600 30px ${FONT}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, 128, 50)
  return el
}
