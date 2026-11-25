"use client"

import * as React from "react"
import type * as THREE_NS from "three"

import { cn } from "@/lib/utils"

import { books, type DemoId } from "./interaction-shelf-data"
import {
  clockCanvas,
  labelCanvas,
  moonlightCanvas,
  plainSpineCanvas,
  printCanvas,
  seeded,
  skyCanvas,
  spineCanvas,
} from "./interaction-shelf-textures"

export type ShelfSceneHandle = {
  /** Pulls a book off the shelf and brings it to the middle of the screen, facing you. */
  open: (id: DemoId) => Promise<void>
  /** Puts the book back on the shelf. */
  close: (id: DemoId) => Promise<void>
}

type Props = {
  handleRef: React.RefObject<ShelfSceneHandle | null>
  lampOn: boolean
  onLampToggle: () => void
  onPick: (id: DemoId) => void
  onHover: (id: DemoId | null, at?: { x: number; y: number }) => void
  onReady: () => void
  className?: string
}

const SHELF = { x: -0.6, w: 3.4, h: 2.7, d: 0.5, z: 0.26 }
const LAMP = { x: -1.05, y: 3.55 }
const BG_BOOK_COLORS = ["#3b2a2a", "#2c3346", "#3a3b2a", "#4a2f27", "#2a3a36", "#40322a", "#2b2b38", "#4b3a24", "#33262e"]

/**
 * A small reading room drawn with three.js: a bookshelf whose six numbered
 * books open into demos, a hanging lamp whose cord switches the room from
 * moonlight to lamplight, a window, a real-time clock and a slow mobile.
 * three and GSAP load when the room mounts; the loop pauses off screen. With
 * reduced motion, nothing drifts and every move is instant.
 */
export function ShelfScene({ handleRef, lampOn, onLampToggle, onPick, onHover, onReady, className }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const lampRef = React.useRef<(on: boolean) => void>(() => {})
  const callbacks = React.useRef({ onLampToggle, onPick, onHover, onReady })
  React.useEffect(() => {
    callbacks.current = { onLampToggle, onPick, onHover, onReady }
  })

  React.useEffect(() => {
    lampRef.current(lampOn)
  }, [lampOn])

  React.useEffect(() => {
    const host = ref.current
    if (!host) return
    let disposed = false
    let cleanup = () => {}

    const start = async () => {
      const [THREE, { gsap }, { RoundedBoxGeometry }] = await Promise.all([
        import("three"),
        import("gsap"),
        import("three/addons/geometries/RoundedBoxGeometry.js"),
      ])
      if (disposed) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const small = host.clientWidth < 768
      const T = (seconds: number) => (reduce ? 0 : seconds)

      let renderer: THREE_NS.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
      } catch {
        callbacks.current.onReady()
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      renderer.shadowMap.enabled = !small
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      renderer.domElement.setAttribute("aria-hidden", "true")
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      scene.background = new THREE.Color("#0d1220")
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)

      const texture = (source: HTMLCanvasElement) => {
        const t = new THREE.CanvasTexture(source)
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 4
        return t
      }
      const standard = (color: string, roughness = 0.8, extra: THREE_NS.MeshStandardMaterialParameters = {}) =>
        new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra })
      const box = (w: number, h: number, d: number, material: THREE_NS.Material, x: number, y: number, z: number) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
        return mesh
      }

      // ---------------------------------------------------------------- room
      const wall = standard("#6a6470", 0.95)
      const wainscot = standard("#4e4954", 0.9)
      const wood = standard("#4a2c1a", 0.62)
      const darkWood = standard("#2b190f", 0.7)
      const back = new THREE.Mesh(new THREE.PlaneGeometry(22, 10), wall)
      back.position.set(0, 5, 0)
      back.receiveShadow = true
      scene.add(back)
      box(22, 1.55, 0.06, wainscot, 0, 0.775, 0.03)
      box(22, 0.06, 0.1, wainscot, 0, 1.58, 0.05)
      for (let x = -10; x <= 10; x += 2.2) box(1.7, 1.05, 0.02, standard("#454049", 0.9), x, 0.78, 0.07)
      box(22, 0.14, 0.14, wainscot, 0, 4.7, 0.07)
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(22, 12), standard("#3a2416", 0.75))
      floor.rotation.x = -Math.PI / 2
      floor.position.set(0, 0, 6)
      floor.receiveShadow = true
      scene.add(floor)

      // Window, with the sky behind its bars.
      const sky = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 2.1),
        new THREE.MeshBasicMaterial({ map: texture(skyCanvas()), toneMapped: false }),
      )
      sky.position.set(-4.7, 2.75, 0.015)
      scene.add(sky)
      const frameMaterial = standard("#1b2233", 0.6)
      box(1.72, 0.1, 0.1, frameMaterial, -4.7, 3.85, 0.06)
      box(1.72, 0.1, 0.1, frameMaterial, -4.7, 1.65, 0.06)
      box(0.1, 2.3, 0.1, frameMaterial, -5.56, 2.75, 0.06)
      box(0.1, 2.3, 0.1, frameMaterial, -3.84, 2.75, 0.06)
      box(0.05, 2.1, 0.06, frameMaterial, -4.7, 2.75, 0.05)
      box(1.5, 0.05, 0.06, frameMaterial, -4.7, 2.95, 0.05)
      box(2.0, 0.07, 0.24, frameMaterial, -4.7, 1.57, 0.14)
      const moonlight = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 2.8),
        new THREE.MeshBasicMaterial({
          map: texture(moonlightCanvas()),
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      moonlight.position.set(3.1, 2.75, 0.02)
      moonlight.rotation.z = -0.12
      scene.add(moonlight)

      // ---------------------------------------------------------------- shelf
      const sx = SHELF.x
      const sz = SHELF.z
      box(0.08, SHELF.h, SHELF.d, wood, sx - SHELF.w / 2, SHELF.h / 2, sz)
      box(0.08, SHELF.h, SHELF.d, wood, sx + SHELF.w / 2, SHELF.h / 2, sz)
      box(SHELF.w + 0.3, 0.08, SHELF.d + 0.1, wood, sx, SHELF.h + 0.04, sz + 0.02)
      box(SHELF.w + 0.3, 0.04, SHELF.d + 0.12, darkWood, sx, SHELF.h + 0.1, sz + 0.02)
      box(SHELF.w, 0.14, SHELF.d, darkWood, sx, 0.07, sz)
      box(SHELF.w, 0.05, SHELF.d, wood, sx, 0.165, sz)
      box(SHELF.w, 0.05, SHELF.d, wood, sx, 1.34, sz)
      box(SHELF.w, SHELF.h, 0.02, darkWood, sx, SHELF.h / 2, sz - SHELF.d / 2)
      const dividerX = sx + SHELF.w / 2 - 1.0
      box(0.05, SHELF.h - 1.39, SHELF.d - 0.02, wood, dividerX, 1.36 + (SHELF.h - 1.39) / 2, sz)
      box(0.05, 1.15, SHELF.d - 0.02, wood, sx + 0.2, 0.19 + 0.575, sz)

      const pageMaterial = standard("#e7dcc6", 0.95)
      const bookGeometry = (w: number, h: number, d: number) => new RoundedBoxGeometry(w, h, d, 2, 0.012)
      // Background books show darker, dusty page edges; only the six live books keep bright pages.
      const dustyPages = standard("#6f6352", 0.95)
      const makeBook = (w: number, h: number, d: number, spine: HTMLCanvasElement, cloth: string, pages = dustyPages) => {
        const side = standard(cloth, 0.75)
        const mesh = new THREE.Mesh(bookGeometry(w, h, d), [
          side,
          side,
          pages,
          pages,
          standard("#ffffff", 0.7, { map: texture(spine) }),
          side,
        ])
        mesh.castShadow = true
        mesh.receiveShadow = true
        return mesh
      }

      // Upper shelf: two quiet books, the six live ones, then a few more and one leaning.
      const rand = seeded(11)
      const upperY = 1.365
      let cursor = sx - SHELF.w / 2 + 0.1
      const placeBackground = (count: number, labels: string[] = []) => {
        for (let i = 0; i < count; i++) {
          const w = 0.06 + rand() * 0.05
          const h = 0.74 + rand() * 0.18
          const color = BG_BOOK_COLORS[Math.floor(rand() * BG_BOOK_COLORS.length)]
          const mesh = makeBook(w, h, 0.33, plainSpineCanvas(color, i * 13 + count, labels[i]), color)
          mesh.position.set(cursor + w / 2, upperY + h / 2, sz + 0.02)
          scene.add(mesh)
          cursor += w + 0.006
        }
      }
      placeBackground(2)
      const live = new Map<DemoId, THREE_NS.Mesh>()
      books.forEach((book, i) => {
        const w = 0.115
        const h = 0.86 + (i % 3) * 0.025
        const mesh = makeBook(
          w,
          h,
          0.36,
          spineCanvas({ color: book.color, ink: book.ink, number: book.number, title: book.title, subtitle: book.subtitle }),
          book.color,
          pageMaterial,
        )
        mesh.position.set(cursor + w / 2, upperY + h / 2, sz + 0.04)
        mesh.userData = { id: book.id, home: mesh.position.clone(), homeRotation: mesh.rotation.clone() }
        scene.add(mesh)
        live.set(book.id, mesh)
        cursor += w + 0.006
      })
      placeBackground(3, ["", "Margins", ""])
      const leaning = makeBook(0.07, 0.86, 0.33, plainSpineCanvas("#2c3346", 99, "Index"), "#2c3346")
      leaning.position.set(cursor + 0.16, upperY + 0.4, sz + 0.02)
      leaning.rotation.z = -0.2
      scene.add(leaning)

      // Upper right: a framed print, a small globe on two books lying flat.
      const printFrame = box(0.46, 0.56, 0.03, standard("#efe7d6", 0.6), dividerX + 0.32, upperY + 0.3, sz - 0.12)
      printFrame.rotation.x = -0.08
      const print = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.5),
        new THREE.MeshStandardMaterial({ map: texture(printCanvas()), roughness: 0.8 }),
      )
      print.position.set(0, 0, 0.017)
      printFrame.add(print)
      box(0.42, 0.05, 0.3, standard("#3a3b2a", 0.8), dividerX + 0.72, upperY + 0.025, sz)
      box(0.38, 0.045, 0.28, standard("#4a2f27", 0.8), dividerX + 0.72, upperY + 0.072, sz)
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.095, 32, 24), standard("#d9d4c8", 0.35))
      globe.position.set(dividerX + 0.72, upperY + 0.19, sz)
      globe.castShadow = true
      scene.add(globe)

      // Lower shelf: a long run of quiet books and a storage box.
      cursor = sx - SHELF.w / 2 + 0.1
      const lowerY = 0.19
      for (let i = 0; i < 22; i++) {
        const w = 0.06 + rand() * 0.055
        const h = 0.78 + rand() * 0.25
        const color = BG_BOOK_COLORS[Math.floor(rand() * BG_BOOK_COLORS.length)]
        const mesh = makeBook(w, h, 0.34, plainSpineCanvas(color, 200 + i), color)
        if (cursor + w > sx + 0.17 && cursor < sx + 0.25) cursor = sx + 0.25
        mesh.position.set(cursor + w / 2, lowerY + h / 2, sz + 0.02)
        scene.add(mesh)
        cursor += w + 0.006
        if (cursor > sx + SHELF.w / 2 - 0.85) break
      }
      const storage = box(0.62, 0.42, 0.42, standard("#d8cdb8", 0.85), sx + SHELF.w / 2 - 0.42, lowerY + 0.21, sz + 0.02)
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(0.26, 0.1),
        new THREE.MeshStandardMaterial({ map: texture(labelCanvas("Sketches")) }),
      )
      label.position.set(0, 0.02, 0.212)
      storage.add(label)

      // On top: a vase with dry stems, and a clock that keeps real time.
      const topY = SHELF.h + 0.12
      const vase = new THREE.Mesh(
        new THREE.LatheGeometry(
          [0, 0.07, 0.11, 0.12, 0.1, 0.05, 0.045, 0.06].map((r, i) => new THREE.Vector2(r, i * 0.05)),
          32,
        ),
        standard("#26324a", 0.3),
      )
      vase.position.set(sx - 0.25, topY, sz)
      vase.castShadow = true
      scene.add(vase)
      const stems = new THREE.Group()
      for (let i = 0; i < 7; i++) {
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.006, 0.7 + rand() * 0.25, 5), standard("#8a6a45", 0.9))
        stem.position.set(0, 0.6, 0)
        stem.rotation.set((rand() - 0.5) * 0.5, 0, (rand() - 0.5) * 0.6)
        stems.add(stem)
      }
      stems.position.set(sx - 0.25, topY, sz)
      scene.add(stems)
      const clock = new THREE.Group()
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.05, 48), standard("#b8935a", 0.35, { metalness: 0.4 }))
      rim.rotation.x = Math.PI / 2
      rim.castShadow = true
      clock.add(rim)
      const face = new THREE.Mesh(
        new THREE.CircleGeometry(0.19, 48),
        new THREE.MeshStandardMaterial({ map: texture(clockCanvas()), roughness: 0.7 }),
      )
      face.position.z = 0.026
      clock.add(face)
      const hand = (length: number, width: number) => {
        const pivot = new THREE.Group()
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, length, 0.006), standard("#2b2620", 0.5))
        mesh.position.y = length / 2 - 0.015
        pivot.add(mesh)
        pivot.position.z = 0.03
        clock.add(pivot)
        return pivot
      }
      const hourHand = hand(0.1, 0.012)
      const minuteHand = hand(0.15, 0.008)
      const secondHand = hand(0.16, 0.003)
      clock.position.set(sx + 0.75, topY + 0.21, sz - 0.05)
      scene.add(clock)
      const setClock = () => {
        const now = new Date()
        const s = now.getSeconds()
        const m = now.getMinutes() + s / 60
        const h = (now.getHours() % 12) + m / 60
        secondHand.rotation.z = -(s / 60) * Math.PI * 2
        minuteHand.rotation.z = -(m / 60) * Math.PI * 2
        hourHand.rotation.z = -(h / 12) * Math.PI * 2
      }
      setClock()

      // A mobile turning slowly above the shelf's left side.
      const mobile = new THREE.Group()
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.9, 6), standard("#1a1a1a", 0.5))
      wire.rotation.z = Math.PI / 2
      mobile.add(wire)
      ;[
        [-0.42, -0.25, "#e0782f", 0.07],
        [0.05, -0.42, "#efe7d6", 0.05],
        [0.44, -0.18, "#5c7491", 0.04],
      ].forEach(([x, drop, color, r]) => {
        const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.0015, 0.0015, -(drop as number), 4), standard("#111", 0.5))
        thread.position.set(x as number, (drop as number) / 2, 0)
        const ball = new THREE.Mesh(new THREE.SphereGeometry(r as number, 24, 16), standard(color as string, 0.45))
        ball.position.set(x as number, drop as number, 0)
        ball.castShadow = true
        mobile.add(thread, ball)
      })
      mobile.position.set(sx - 1.55, 3.75, 0.5)
      scene.add(mobile)
      const hanger = new THREE.Mesh(new THREE.CylinderGeometry(0.0015, 0.0015, 1.0, 4), standard("#111", 0.5))
      hanger.position.set(sx - 1.55, 4.25, 0.5)
      scene.add(hanger)

      // ---------------------------------------------------------------- lamp
      const lamp = new THREE.Group()
      const shadeMaterial = standard("#1d1b1a", 0.5, { side: THREE.DoubleSide })
      const shade = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.3, 48, 1, true), shadeMaterial)
      lamp.add(shade)
      const bulbMaterial = new THREE.MeshStandardMaterial({ color: "#fff4e0", emissive: "#ffcf8a", emissiveIntensity: 0.15 })
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 16), bulbMaterial)
      bulb.position.y = -0.11
      lamp.add(bulb)
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1.6, 6), standard("#111", 0.6))
      cord.position.y = 0.95
      lamp.add(cord)
      const pull = new THREE.Group()
      const string = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.5, 5), standard("#cfc6b6", 0.8))
      string.position.y = -0.25
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 12), standard("#b8935a", 0.4, { metalness: 0.3 }))
      bead.position.y = -0.51
      const pullHit = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.62, 8), new THREE.MeshBasicMaterial({ visible: false }))
      pullHit.position.y = -0.3
      pull.add(string, bead, pullHit)
      pull.position.set(0.14, -0.13, 0.05)
      lamp.add(pull)
      lamp.position.set(LAMP.x, LAMP.y, 0.7)
      scene.add(lamp)

      // ---------------------------------------------------------------- light
      const ambient = new THREE.AmbientLight("#8ea2d6", 0.55)
      scene.add(ambient)
      const moon = new THREE.DirectionalLight("#9db4ff", 1.1)
      moon.position.set(-7, 5, 5)
      moon.target.position.set(sx, 1.5, 0)
      scene.add(moon, moon.target)
      const spot = new THREE.SpotLight("#ffb46a", 0, 12, 1.0, 0.75, 1.2)
      spot.position.set(LAMP.x, LAMP.y - 0.12, 0.7)
      spot.target.position.set(sx, 1.2, 0.2)
      spot.castShadow = !small
      spot.shadow.mapSize.set(1024, 1024)
      spot.shadow.bias = -0.0004
      scene.add(spot, spot.target)
      const glow = new THREE.PointLight("#ffbf80", 0, 7, 1.4)
      glow.position.set(LAMP.x, LAMP.y - 0.15, 0.75)
      scene.add(glow)

      // ---------------------------------------------------------------- camera
      const views = (lit: boolean, aspect: number) => {
        const portrait = aspect < 0.9
        if (portrait)
          return lit
            ? { pos: [sx - 0.45, 2.0, 9.4], look: [sx - 0.45, 1.85, 0], fov: 46 }
            : { pos: [sx - 0.45, 2.3, 11.6], look: [sx - 0.4, 2.1, 0], fov: 48 }
        return lit ? { pos: [-0.2, 2.15, 7.6], look: [-0.35, 1.95, 0], fov: 32 } : { pos: [0.4, 2.5, 10.8], look: [0.2, 2.15, 0], fov: 32 }
      }
      const look = new THREE.Vector3()
      const camState = { x: 0, y: 0, z: 0, lx: 0, ly: 0, lz: 0, fov: 32 }
      const applyView = (lit: boolean, duration: number) => {
        const v = views(lit, camera.aspect)
        gsap.to(camState, {
          x: v.pos[0],
          y: v.pos[1],
          z: v.pos[2],
          lx: v.look[0],
          ly: v.look[1],
          lz: v.look[2],
          fov: v.fov,
          duration,
          ease: "power3.inOut",
        })
      }
      {
        const v = views(false, host.clientWidth / Math.max(1, host.clientHeight))
        Object.assign(camState, { x: v.pos[0], y: v.pos[1], z: v.pos[2], lx: v.look[0], ly: v.look[1], lz: v.look[2], fov: v.fov })
      }

      const rgb = (hex: string) => {
        const c = new THREE.Color(hex)
        return { r: c.r, g: c.g, b: c.b }
      }

      // Lamp on and off: lights, bulb, moonlight on the wall, then the camera steps closer.
      let lit = false
      lampRef.current = (on: boolean) => {
        if (on === lit) return
        lit = on
        const d = T(1.1)
        gsap.to(spot, { intensity: on ? 26 : 0, duration: d, ease: "power2.out" })
        gsap.to(glow, { intensity: on ? 5 : 0, duration: d })
        gsap.to(bulbMaterial, { emissiveIntensity: on ? 3.2 : 0.15, duration: d })
        gsap.to(ambient, { intensity: on ? 0.42 : 0.55, duration: d })
        gsap.to(ambient.color, { ...rgb(on ? "#ffd2a8" : "#8ea2d6"), duration: d })
        gsap.to(moon, { intensity: on ? 0.35 : 1.1, duration: d })
        gsap.to(moonlight.material, { opacity: on ? 0.06 : 0.28, duration: d })
        gsap.to(scene.background as THREE_NS.Color, { ...rgb(on ? "#1a120c" : "#0d1220"), duration: d })
        gsap.fromTo(pull.position, { y: -0.13 }, { y: -0.2, duration: T(0.15), yoyo: true, repeat: 1, ease: "power1.inOut" })
        applyView(on, T(1.6))
      }

      // ---------------------------------------------------------------- picking
      const raycaster = new THREE.Raycaster()
      const pointer = new THREE.Vector2(9, 9)
      const aim = { x: 0, y: 0 }
      const targets = [...live.values(), pullHit, shade, bulb]
      let hovered: DemoId | null = null
      let busy = false
      const setHover = (id: DemoId | null, at?: { x: number; y: number }) => {
        const changed = id !== hovered
        if (changed && !id) callbacks.current.onHover(null)
        if (changed) {
          if (hovered) {
            const old = live.get(hovered)!
            gsap.to(old.position, { z: old.userData.home.z, duration: T(0.35), ease: "power2.out" })
          }
          if (id) {
            const mesh = live.get(id)!
            gsap.to(mesh.position, { z: mesh.userData.home.z + 0.09, duration: T(0.35), ease: "power2.out" })
          }
          hovered = id
        }
        // Only report when there's something to show, so moving over empty space doesn't re-render the page.
        if (id || at === undefined) callbacks.current.onHover(id, at)
      }
      const pick = (event: PointerEvent | MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1)
        raycaster.setFromCamera(pointer, camera)
        const hit = raycaster.intersectObjects(targets, false)[0]
        if (!hit) return { kind: "none" as const }
        if (hit.object === pullHit || hit.object === shade || hit.object === bulb) return { kind: "lamp" as const }
        return { kind: "book" as const, id: hit.object.userData.id as DemoId }
      }
      const onMove = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        aim.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        aim.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        if (busy || event.pointerType === "touch") return
        const result = pick(event)
        renderer.domElement.style.cursor = result.kind === "none" ? "default" : "pointer"
        setHover(result.kind === "book" ? result.id : null, { x: event.clientX - rect.left, y: event.clientY - rect.top })
      }
      const onLeave = () => {
        if (!busy) setHover(null)
      }
      const onClick = (event: MouseEvent) => {
        if (busy) return
        const result = pick(event)
        if (result.kind === "lamp") callbacks.current.onLampToggle()
        if (result.kind === "book") callbacks.current.onPick(result.id)
      }
      renderer.domElement.addEventListener("pointermove", onMove)
      renderer.domElement.addEventListener("pointerleave", onLeave)
      renderer.domElement.addEventListener("click", onClick)

      // ---------------------------------------------------------------- open and close
      handleRef.current = {
        open: (id) =>
          new Promise<void>((resolve) => {
            const mesh = live.get(id)
            if (!mesh) return resolve()
            busy = true
            setHover(null)
            renderer.domElement.style.cursor = "default"
            const home = mesh.userData.home as THREE_NS.Vector3
            const forward = new THREE.Vector3()
            camera.getWorldDirection(forward)
            const target = camera.position.clone().add(forward.multiplyScalar(3.2))
            gsap
              .timeline({
                onComplete: () => {
                  // The open book on the page takes over from here.
                  mesh.visible = false
                  resolve()
                },
              })
              .to(mesh.position, { z: home.z + 0.42, duration: T(0.35), ease: "power2.out" })
              .to(mesh.position, { x: target.x, y: target.y, z: target.z, duration: T(0.7), ease: "power3.inOut" })
              .to(mesh.rotation, { y: -Math.PI / 2, x: 0.05, duration: T(0.7), ease: "power3.inOut" }, "<")
              .to(mesh.scale, { x: 2.4, y: 2.4, z: 2.4, duration: T(0.7), ease: "power3.inOut" }, "<")
          }),
        close: (id) =>
          new Promise<void>((resolve) => {
            const mesh = live.get(id)
            if (!mesh) return resolve()
            const home = mesh.userData.home as THREE_NS.Vector3
            mesh.visible = true
            gsap
              .timeline({
                onComplete: () => {
                  busy = false
                  resolve()
                },
              })
              .to(mesh.position, { x: home.x, y: home.y, z: home.z + 0.42, duration: T(0.65), ease: "power3.inOut" })
              .to(mesh.rotation, { y: 0, x: 0, duration: T(0.65), ease: "power3.inOut" }, "<")
              .to(mesh.scale, { x: 1, y: 1, z: 1, duration: T(0.65), ease: "power3.inOut" }, "<")
              .to(mesh.position, { z: home.z, duration: T(0.35), ease: "power2.inOut" })
          }),
      }

      // ---------------------------------------------------------------- loop
      const resize = () => {
        const w = host.clientWidth
        const h = host.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        const v = views(lit, camera.aspect)
        Object.assign(camState, { x: v.pos[0], y: v.pos[1], z: v.pos[2], lx: v.look[0], ly: v.look[1], lz: v.look[2], fov: v.fov })
      }
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(host)
      resize()

      const sway = { x: 0, y: 0 }
      let frame = 0
      let visible = true
      let lastSecond = -1
      const tick = (now: number) => {
        if (!reduce) {
          sway.x += (aim.x - sway.x) * 0.04
          sway.y += (aim.y - sway.y) * 0.04
          mobile.rotation.y = now / 9000
          mobile.rotation.z = Math.sin(now / 2600) * 0.03
        }
        const second = Math.floor(now / 1000)
        if (second !== lastSecond) {
          lastSecond = second
          setClock()
        }
        camera.position.set(camState.x + sway.x * 0.18, camState.y - sway.y * 0.1, camState.z)
        look.set(camState.lx + sway.x * 0.06, camState.ly - sway.y * 0.04, camState.lz)
        camera.lookAt(look)
        if (camera.fov !== camState.fov) {
          camera.fov = camState.fov
        }
        camera.updateProjectionMatrix()
        renderer.render(scene, camera)
        if (visible && !document.hidden) frame = requestAnimationFrame(tick)
      }
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(frame)
        if (visible) frame = requestAnimationFrame(tick)
      })
      io.observe(host)
      const onVisibility = () => {
        cancelAnimationFrame(frame)
        if (visible && !document.hidden) frame = requestAnimationFrame(tick)
      }
      document.addEventListener("visibilitychange", onVisibility)
      frame = requestAnimationFrame(tick)
      callbacks.current.onReady()

      cleanup = () => {
        cancelAnimationFrame(frame)
        io.disconnect()
        resizeObserver.disconnect()
        document.removeEventListener("visibilitychange", onVisibility)
        renderer.domElement.removeEventListener("pointermove", onMove)
        renderer.domElement.removeEventListener("pointerleave", onLeave)
        renderer.domElement.removeEventListener("click", onClick)
        scene.traverse((object) => {
          const mesh = object as THREE_NS.Mesh
          mesh.geometry?.dispose()
          const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []
          for (const material of materials) {
            ;(material as THREE_NS.MeshStandardMaterial).map?.dispose()
            material.dispose()
          }
        })
        renderer.dispose()
        renderer.domElement.remove()
        handleRef.current = null
        lampRef.current = () => {}
      }
    }

    void start()
    return () => {
      disposed = true
      cleanup()
    }
  }, [handleRef])

  return <div ref={ref} className={cn("absolute inset-0", className)} />
}
