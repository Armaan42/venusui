"use client"

import * as React from "react"

import { useThemeState } from "@/components/site/theme-config"
import { cn } from "@/lib/utils"

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // Slow, crossing swells, like a sheet of fabric breathing.
    float wave = sin(p.x * 0.55 + uTime * 0.6) * 0.28 + cos(p.y * 0.8 + uTime * 0.45) * 0.22;
    // A soft bump that follows the pointer.
    float d = distance(p.xy, uPointer);
    float lift = exp(-d * d * 0.9) * 0.9;
    p.z += wave + lift;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (6.0 / -mv.z) * (1.0 + lift * 1.6);
    // Fade towards the far edge and the sides so the field sinks into the page.
    vAlpha = smoothstep(16.0, 5.0, -mv.z) * smoothstep(9.0, 5.0, abs(p.x)) * (0.75 + lift);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, r) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`

/** Resolves any CSS color (oklch, lab, var()) to linear RGB for the shader, by painting it on a 1px canvas. */
function cssColorToRgb(value: string): [number, number, number] {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return [0.6, 0.6, 1]
  ctx.fillStyle = "#8888ff"
  ctx.fillStyle = value
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

/**
 * A field of glowing dots behind the playground (three.js). It swells slowly,
 * lifts under the pointer and takes its color from the theme's accent. three
 * loads only when the section comes near, the loop pauses off screen, and with
 * reduced motion it draws one still frame.
 */
export function PlaygroundParticles({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const colorRef = React.useRef<(rgb: [number, number, number]) => void>(() => {})
  const theme = useThemeState()

  // Recolor when the theme changes (the accent lives in --primary on this dark stage).
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const primary = getComputedStyle(el).getPropertyValue("--primary").trim()
    colorRef.current(cssColorToRgb(primary || "#a5b4fc"))
  }, [theme])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let cleanup = () => {}
    let cancelled = false

    const start = async () => {
      const THREE = await import("three")
      if (cancelled) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
      camera.position.set(0, -5.2, 3.4)
      camera.lookAt(0, 0, 0)

      const cols = 150
      const rows = 70
      const positions = new Float32Array(cols * rows * 3)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 3
          positions[i] = (x / (cols - 1) - 0.5) * 18
          positions[i + 1] = (y / (rows - 1) - 0.5) * 12
          positions[i + 2] = 0
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uSize: { value: 3.6 * renderer.getPixelRatio() },
        uColor: { value: new THREE.Color(0.65, 0.7, 1) },
      }
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      scene.add(new THREE.Points(geometry, material))

      colorRef.current = ([r, g, b]) => {
        uniforms.uColor.value.setRGB(r, g, b)
        if (reduce) renderer.render(scene, camera)
      }
      colorRef.current(cssColorToRgb(getComputedStyle(el).getPropertyValue("--primary").trim() || "#a5b4fc"))

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el
        if (!w || !h) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        if (reduce) renderer.render(scene, camera)
      }
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(el)
      resize()

      // The pointer, mapped onto the field, eased so the bump glides.
      const section = el.parentElement ?? el
      const aim = new THREE.Vector2(0, -2)
      const onPointer = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect()
        aim.set(((event.clientX - rect.left) / rect.width - 0.5) * 14, (0.5 - (event.clientY - rect.top) / rect.height) * 9)
      }
      section.addEventListener("pointermove", onPointer, { passive: true })

      let frame = 0
      let visible = false
      const tick = (now: number) => {
        uniforms.uTime.value = now / 1000
        uniforms.uPointer.value.lerp(aim, 0.06)
        renderer.render(scene, camera)
        if (visible && !document.hidden) frame = requestAnimationFrame(tick)
      }
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(frame)
        if (visible && !reduce) frame = requestAnimationFrame(tick)
      })
      visibility.observe(el)
      const onVisibility = () => {
        cancelAnimationFrame(frame)
        if (visible && !reduce && !document.hidden) frame = requestAnimationFrame(tick)
      }
      document.addEventListener("visibilitychange", onVisibility)
      if (reduce) renderer.render(scene, camera)

      cleanup = () => {
        cancelAnimationFrame(frame)
        visibility.disconnect()
        resizeObserver.disconnect()
        document.removeEventListener("visibilitychange", onVisibility)
        section.removeEventListener("pointermove", onPointer)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    // Load three only when the section comes near.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        near.disconnect()
        void start()
      },
      { rootMargin: "600px 0px" },
    )
    near.observe(el)
    return () => {
      cancelled = true
      near.disconnect()
      cleanup()
    }
  }, [])

  return <div ref={ref} data-pg-particles="" aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)} />
}
