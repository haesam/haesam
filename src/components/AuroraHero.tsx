import { useEffect, useRef } from 'react'

/**
 * AuroraHero — premium full-screen hero with an interactive aurora gradient background.
 *
 * Engine notes:
 * - Blobs are pure radial-gradient layers (no expensive `filter: blur`) composited
 *   with `mix-blend-mode: screen` for an additive, WebGL-like aurora.
 * - All motion runs in a single requestAnimationFrame loop writing `translate3d`
 *   transforms directly to refs — React never re-renders during animation.
 * - The cursor is followed with a critically-damped spring, so parallax, the
 *   magnetic blob pull and the bloom all feel elastic rather than instant.
 * - Coarse pointers (touch) fall back to an autonomous drift path at reduced
 *   intensity; `prefers-reduced-motion` renders a single static frame.
 */

interface BlobDef {
  color: string
  x: number // base center, fraction of viewport width
  y: number // base center, fraction of viewport height
  size: number // fraction of max viewport dimension
  depth: number // parallax factor (higher = closer / moves more)
  speed: number // drift frequency
  amp: number // drift amplitude multiplier
  phase: number
  opacity: number
  mobile: boolean // kept on small screens
}

const BLOBS: BlobDef[] = [
  // Deep background wash — slowest layer, anchors the scene
  { color: 'rgba(76, 29, 149, 0.50)',  x: 0.50, y: 0.42, size: 1.30, depth: 0.12, speed: 0.10, amp: 0.6, phase: 0.0, opacity: 0.55, mobile: true },
  // Mid layers
  { color: 'rgba(139, 92, 246, 0.60)', x: 0.24, y: 0.30, size: 0.85, depth: 0.30, speed: 0.16, amp: 1.0, phase: 1.3, opacity: 0.62, mobile: true },
  { color: 'rgba(59, 130, 246, 0.55)', x: 0.74, y: 0.24, size: 0.78, depth: 0.42, speed: 0.13, amp: 1.1, phase: 2.9, opacity: 0.58, mobile: true },
  { color: 'rgba(236, 72, 153, 0.45)', x: 0.84, y: 0.68, size: 0.72, depth: 0.36, speed: 0.19, amp: 0.9, phase: 4.2, opacity: 0.50, mobile: true },
  // Foreground layers — fastest parallax for depth
  { color: 'rgba(34, 211, 238, 0.45)', x: 0.56, y: 0.76, size: 0.62, depth: 0.62, speed: 0.22, amp: 1.2, phase: 5.5, opacity: 0.52, mobile: false },
  { color: 'rgba(52, 211, 153, 0.38)', x: 0.12, y: 0.80, size: 0.56, depth: 0.52, speed: 0.17, amp: 1.0, phase: 0.8, opacity: 0.45, mobile: false },
]

// Fractal-noise grain, inlined so the component stays self-contained
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function AuroraHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const lightRef = useRef<HTMLDivElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small = window.innerWidth < 768
    const lowPower = coarse || small
    const intensity = lowPower ? 0.55 : 1

    let vw = window.innerWidth
    let vh = window.innerHeight
    let sizes = BLOBS.map(b => b.size * Math.max(vw, vh))

    const applySizes = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      sizes = BLOBS.map(b => b.size * Math.max(vw, vh))
      BLOBS.forEach((b, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        el.style.width = `${sizes[i]}px`
        el.style.height = `${sizes[i]}px`
        el.style.display = lowPower && !b.mobile ? 'none' : 'block'
      })
    }
    applySizes()

    // ---- spring-followed cursor state ----
    const cur = { x: vw / 2, y: vh * 0.45 }
    const vel = { x: 0, y: 0 }
    const target = { x: cur.x, y: cur.y }
    let energy = 0 // 0..1, rises with pointer speed, decays smoothly
    let pointerSeen = false
    let lastMove = 0

    const onPointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      const speed = Math.hypot(nx - target.x, ny - target.y)
      energy = Math.min(1, energy + speed * 0.004)
      target.x = nx
      target.y = ny
      pointerSeen = true
      lastMove = performance.now()
    }

    if (!coarse && !reduced) {
      section.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    const STIFFNESS = 0.045
    const DAMPING = 0.86

    let raf = 0
    let last = performance.now()
    const start = last

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 3) // normalized to 60fps steps, clamped
      last = now
      const t = (now - start) / 1000

      // Autonomous drift: before first pointer contact (and always on touch),
      // the "cursor" wanders on a slow lissajous path so the scene stays alive.
      if (!pointerSeen || coarse) {
        target.x = vw * (0.5 + 0.28 * Math.sin(t * 0.21))
        target.y = vh * (0.45 + 0.22 * Math.sin(t * 0.157 + 1.4))
        energy = Math.max(energy, 0.12)
      }

      // Critically-damped spring toward the target — the magnetic feel
      vel.x = (vel.x + (target.x - cur.x) * STIFFNESS * dt) * Math.pow(DAMPING, dt)
      vel.y = (vel.y + (target.y - cur.y) * STIFFNESS * dt) * Math.pow(DAMPING, dt)
      cur.x += vel.x * dt
      cur.y += vel.y * dt

      // Bloom energy fades smoothly after movement stops
      const idle = now - lastMove > 120
      if (idle) energy *= Math.pow(0.975, dt)

      const nx = (cur.x - vw / 2) / (vw / 2) // -1..1 for parallax
      const ny = (cur.y - vh / 2) / (vh / 2)

      for (let i = 0; i < BLOBS.length; i++) {
        const el = blobRefs.current[i]
        if (!el || el.style.display === 'none') continue
        const b = BLOBS[i]
        const size = sizes[i]

        // Layered sine drift (two harmonics = organic, non-repeating motion)
        const driftX =
          (Math.sin(t * b.speed + b.phase) * 0.055 +
            Math.sin(t * b.speed * 0.63 + b.phase * 2.1) * 0.028) * b.amp * vw * intensity
        const driftY =
          (Math.cos(t * b.speed * 0.82 + b.phase) * 0.055 +
            Math.cos(t * b.speed * 0.47 + b.phase * 1.7) * 0.028) * b.amp * vh * intensity

        // Parallax: deeper layers move less, foreground layers more
        const parX = nx * b.depth * 90 * intensity
        const parY = ny * b.depth * 90 * intensity

        let cx = b.x * vw + driftX + parX
        let cy = b.y * vh + driftY + parY

        // Magnetic pull + pop near the cursor (gaussian falloff)
        const dx = cur.x - cx
        const dy = cur.y - cy
        const dist = Math.hypot(dx, dy)
        const radius = size * 0.55
        const infl = Math.exp(-(dist * dist) / (2 * radius * radius)) * intensity
        cx += dx * infl * 0.14
        cy += dy * infl * 0.14

        const scale = 1 + infl * (0.10 + energy * 0.22)
        // Brighten near the cursor but clamp so the scene never oversaturates
        const opacity = Math.min(b.opacity * (1 + infl * (0.35 + energy * 0.55)), 0.85)

        el.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0) scale(${scale})`
        el.style.opacity = String(opacity)
      }

      // Cursor-following radial light + bloom
      const light = lightRef.current
      const bloom = bloomRef.current
      if (light) {
        light.style.transform = `translate3d(${cur.x - 400}px, ${cur.y - 400}px, 0)`
        light.style.opacity = String((0.10 + energy * 0.22) * intensity)
      }
      if (bloom) {
        const bloomScale = 1 + energy * 0.5
        bloom.style.transform = `translate3d(${cur.x - 190}px, ${cur.y - 190}px, 0) scale(${bloomScale})`
        bloom.style.opacity = String((0.06 + energy * 0.5) * intensity)
      }

      raf = requestAnimationFrame(frame)
    }

    if (reduced) {
      // Single static frame: blobs at their base positions, no loop
      BLOBS.forEach((b, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        const size = sizes[i]
        el.style.transform = `translate3d(${b.x * vw - size / 2}px, ${b.y * vh - size / 2}px, 0)`
        el.style.opacity = String(b.opacity)
      })
    } else {
      raf = requestAnimationFrame(frame)
    }

    window.addEventListener('resize', applySizes)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', applySizes)
      section.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#050409]"
    >
      <style>{`
        @keyframes aurora-grain {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-28px, 16px, 0); }
          40%  { transform: translate3d(14px, -30px, 0); }
          60%  { transform: translate3d(-18px, -12px, 0); }
          80%  { transform: translate3d(24px, 22px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes aurora-card-in {
          from { opacity: 0; transform: translateY(28px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-grain-layer { animation: none !important; }
          .aurora-card { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ===== Aurora layers (additive / screen blending) ===== */}
      <div className="absolute inset-0" aria-hidden="true">
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el }}
            className="absolute top-0 left-0 rounded-full mix-blend-screen will-change-transform"
            style={{
              background: `radial-gradient(circle closest-side, ${b.color} 0%, transparent 72%)`,
              opacity: b.opacity,
            }}
          />
        ))}

        {/* Radial light that trails the cursor */}
        <div
          ref={lightRef}
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background:
              'radial-gradient(circle closest-side, rgba(226,232,255,0.28) 0%, rgba(148,163,255,0.10) 42%, transparent 70%)',
            opacity: 0,
          }}
        />
        {/* Tight bloom core around the cursor */}
        <div
          ref={bloomRef}
          className="absolute top-0 left-0 w-[380px] h-[380px] rounded-full mix-blend-screen will-change-transform"
          style={{
            background:
              'radial-gradient(circle closest-side, rgba(255,255,255,0.35) 0%, rgba(186,164,255,0.16) 45%, transparent 70%)',
            opacity: 0,
          }}
        />
      </div>

      {/* Animated film grain for depth */}
      <div className="absolute -inset-[40px] overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="aurora-grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay will-change-transform"
          style={{
            backgroundImage: NOISE_URI,
            backgroundRepeat: 'repeat',
            animation: 'aurora-grain 0.9s steps(5) infinite',
          }}
        />
      </div>

      {/* Cinematic vignette — keeps edges dark and the palette elegant */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 45%, transparent 45%, rgba(4,3,10,0.55) 78%, rgba(4,3,10,0.9) 100%)',
        }}
      />
      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* ===== Glassmorphism content card ===== */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div
          className="aurora-card relative max-w-2xl w-full rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl px-8 py-12 md:px-14 md:py-16 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6)]"
          style={{ animation: 'aurora-card-in 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}
        >
          {/* Inner top highlight for the glass edge */}
          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 24%)',
            }}
          />

          <p className="inline-flex items-center gap-2 whitespace-nowrap text-[10px] md:text-[11px] uppercase tracking-[0.24em] md:tracking-[0.32em] text-white/60 border border-white/10 rounded-full px-4 py-2 mb-8 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/90 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]" />
            Aurora Interface &mdash; 2026
          </p>

          <h1 className="font-display italic text-5xl md:text-7xl leading-[1.02] tracking-tight text-white mb-6">
            Where light
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-cyan-200 to-pink-300 bg-clip-text text-transparent">
              becomes interface
            </span>
          </h1>

          <p className="text-sm md:text-base text-white/55 max-w-md mx-auto mb-10 leading-relaxed">
            A living gradient that breathes with your cursor &mdash; crafted for
            products that want to feel less like software and more like light.
          </p>

          <div className="inline-flex gap-4 flex-wrap justify-center">
            <button className="rounded-full text-sm px-8 py-3.5 bg-white text-[#0a0812] font-medium transition-transform duration-300 hover:scale-[1.04] shadow-[0_0_40px_-8px_rgba(255,255,255,0.45)]">
              Get Started
            </button>
            <button className="rounded-full text-sm px-8 py-3.5 border border-white/15 bg-white/[0.04] text-white/85 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:border-white/30 hover:bg-white/[0.08]">
              View Showcase
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-white/40 uppercase tracking-[0.25em]">Scroll</span>
        <div className="relative w-px h-10 bg-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cyan-200/80 to-violet-300/80 animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
