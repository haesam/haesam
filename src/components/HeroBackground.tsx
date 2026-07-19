import { useEffect, useRef } from 'react'

// 외부 에셋 없이 캔버스로 그리는 히어로 배경.
// 레퍼런스: 밤의 구름바다 위 빛나는 소용돌이 궤적 + 언덕 위 실루엣 (딥네이비 #02122C 톤)
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const maybeCanvas = canvasRef.current
    if (!maybeCanvas) return
    const canvas = maybeCanvas
    const maybeCtx = canvas.getContext('2d')
    if (!maybeCtx) return
    const ctx = maybeCtx

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let W = 0
    let H = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    // 파티클 글로우 스프라이트 (매 프레임 radial gradient 생성 방지)
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sctx = sprite.getContext('2d')!
    const sg = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    sg.addColorStop(0, 'rgba(255, 236, 200, 1)')
    sg.addColorStop(0.25, 'rgba(255, 214, 150, 0.55)')
    sg.addColorStop(1, 'rgba(255, 200, 120, 0)')
    sctx.fillStyle = sg
    sctx.fillRect(0, 0, 64, 64)

    interface Star { x: number; y: number; r: number; p: number }
    interface Cloud { x: number; y: number; rx: number; ry: number; a: number; v: number }
    interface Particle { t: number; jitter: number; size: number; speed: number }

    let stars: Star[] = []
    let clouds: Cloud[] = []
    let particles: Particle[] = []

    function seed() {
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.55,
        r: Math.random() * 1.1 + 0.3,
        p: Math.random() * Math.PI * 2,
      }))
      clouds = Array.from({ length: 26 }, (_, i) => {
        const band = 0.42 + (i / 26) * 0.5 // 화면 중하단에 구름바다
        return {
          x: Math.random() * W * 1.4 - W * 0.2,
          y: H * band + (Math.random() - 0.5) * H * 0.06,
          rx: W * (0.12 + Math.random() * 0.22),
          ry: H * (0.035 + Math.random() * 0.06),
          a: 0.1 + Math.random() * 0.14,
          v: (Math.random() * 0.5 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
        }
      })
      particles = Array.from({ length: 220 }, () => ({
        t: Math.random() * Math.PI * 2,
        jitter: (Math.random() - 0.5) * 0.16,
        size: Math.random() * 10 + 4,
        speed: 0.00045 + Math.random() * 0.0006,
      }))
    }

    function resize() {
      const rect = canvas.parentElement!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      seed()
    }

    // 소용돌이 타원 궤적 위 점 좌표
    function orbit(t: number, jitter: number) {
      const cx = W * 0.52
      const cy = H * 0.62
      const rx = W * 0.34
      const ry = H * 0.13
      const tilt = -0.12
      const x0 = Math.cos(t) * rx * (1 + jitter)
      const y0 = Math.sin(t) * ry * (1 + jitter)
      return {
        x: cx + x0 * Math.cos(tilt) - y0 * Math.sin(tilt),
        y: cy + x0 * Math.sin(tilt) + y0 * Math.cos(tilt),
        depth: (Math.sin(t) + 1) / 2, // 0(뒤) ~ 1(앞)
      }
    }

    function draw(time: number) {
      // 하늘 그라데이션
      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#02122c')
      sky.addColorStop(0.45, '#0a1f42')
      sky.addColorStop(0.75, '#132a52')
      sky.addColorStop(1, '#02122c')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // 별
      for (const s of stars) {
        const tw = reduced ? 0.7 : 0.5 + 0.5 * Math.sin(time * 0.0012 + s.p)
        ctx.globalAlpha = 0.25 + tw * 0.45
        ctx.fillStyle = '#dbe7ff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // 구름바다
      for (const c of clouds) {
        if (!reduced) {
          c.x += c.v * 0.06
          if (c.x - c.rx > W * 1.2) c.x = -c.rx
          if (c.x + c.rx < -W * 0.2) c.x = W * 1.2 + c.rx
        }
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx)
        g.addColorStop(0, `rgba(145, 175, 225, ${c.a})`)
        g.addColorStop(1, 'rgba(145, 175, 225, 0)')
        ctx.fillStyle = g
        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.scale(1, c.ry / c.rx)
        ctx.translate(-c.x, -c.y)
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.rx, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 소용돌이 궤적: 은은한 링 글로우
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = 'rgba(255, 210, 140, 0.08)'
      for (let w = 26; w >= 6; w -= 5) {
        ctx.lineWidth = w
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.05) {
          const p = orbit(a, 0)
          a === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // 궤적 위 파티클
      for (const pt of particles) {
        if (!reduced) pt.t += pt.speed * 16
        const p = orbit(pt.t, pt.jitter)
        const s = pt.size * (0.5 + p.depth * 0.8)
        ctx.globalAlpha = 0.25 + p.depth * 0.6
        ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s)
      }
      ctx.restore()
      ctx.globalAlpha = 1

      // 전경 언덕 실루엣 + 사람
      const hillY = H * 0.86
      ctx.fillStyle = '#03101f'
      ctx.beginPath()
      ctx.moveTo(0, H)
      ctx.lineTo(0, hillY + H * 0.06)
      ctx.quadraticCurveTo(W * 0.3, hillY + H * 0.02, W * 0.52, hillY - H * 0.015)
      ctx.quadraticCurveTo(W * 0.75, hillY + H * 0.03, W, hillY + H * 0.07)
      ctx.lineTo(W, H)
      ctx.closePath()
      ctx.fill()

      // 사람 실루엣 (언덕 정상)
      const px = W * 0.52
      const py = hillY - H * 0.015
      const ph = Math.max(H * 0.045, 26)
      ctx.fillStyle = '#020a14'
      ctx.beginPath()
      ctx.arc(px, py - ph * 0.88, ph * 0.13, 0, Math.PI * 2) // 머리
      ctx.fill()
      ctx.beginPath() // 몸
      ctx.moveTo(px - ph * 0.16, py)
      ctx.quadraticCurveTo(px - ph * 0.18, py - ph * 0.55, px - ph * 0.1, py - ph * 0.75)
      ctx.lineTo(px + ph * 0.1, py - ph * 0.75)
      ctx.quadraticCurveTo(px + ph * 0.18, py - ph * 0.55, px + ph * 0.16, py)
      ctx.closePath()
      ctx.fill()
    }

    function loop(time: number) {
      draw(time)
      if (!reduced) raf = requestAnimationFrame(loop)
    }

    resize()
    loop(0)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas.parentElement!)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
}
