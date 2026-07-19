import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LeadForm from './LeadForm'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onPrivacyClick: () => void
}

const VIDEO_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_video_mindfull.mp4'

const FLOATING_CHIPS = [
  { label: '포지셔닝', x: '8%', y: '20%', depth: 28, delay: 0 },
  { label: 'Day 1 · 나 정의하기', x: '72%', y: '16%', depth: 46, delay: 0.8 },
  { label: '콘텐츠 방향', x: '86%', y: '58%', depth: 34, delay: 1.6 },
  { label: '첫 발행', x: '68%', y: '76%', depth: 52, delay: 2.4 },
]

const MARQUEE_ITEMS = [
  'PERSONAL BRANDING',
  '3-DAY ROADMAP',
  '하루 1시간',
  'FREE PDF',
  '팔로워 0명부터',
]

/** 비디오를 불러오지 못하는 환경을 위한 "밤 숲 + 반딧불이" 폴백 장면.
 *  비디오가 정상 재생되면 위에 덮여 보이지 않는다. */
function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stat: HTMLCanvasElement | null = null

    // 정적 레이어(하늘·달빛·숲 실루엣)는 오프스크린에 한 번만 그린다
    const buildStatic = (w: number, h: number) => {
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const c = off.getContext('2d')!

      // 하늘: 딥 슬레이트 → 틸그린 숲
      const sky = c.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, '#0c1a26')
      sky.addColorStop(0.45, '#122b30')
      sky.addColorStop(0.8, '#173a35')
      sky.addColorStop(1, '#0e2622')
      c.fillStyle = sky
      c.fillRect(0, 0, w, h)

      // 달빛 글로우 (우상단)
      const moon = c.createRadialGradient(w * 0.62, h * 0.22, 0, w * 0.62, h * 0.22, Math.max(w, h) * 0.55)
      moon.addColorStop(0, 'rgba(168, 224, 205, 0.20)')
      moon.addColorStop(0.4, 'rgba(127, 212, 193, 0.08)')
      moon.addColorStop(1, 'rgba(0, 0, 0, 0)')
      c.fillStyle = moon
      c.fillRect(0, 0, w, h)

      // 은은한 빛줄기
      c.save()
      c.translate(w * 0.62, 0)
      c.rotate(0.18)
      const beam = c.createLinearGradient(0, 0, 0, h)
      beam.addColorStop(0, 'rgba(170, 220, 200, 0.05)')
      beam.addColorStop(1, 'rgba(0, 0, 0, 0)')
      c.fillStyle = beam
      c.fillRect(-w * 0.06, 0, w * 0.12, h)
      c.restore()

      // 아웃포커스 캐노피 — blur 필터는 fill마다 비용이 커서 프레임을 멈추므로,
      // 저해상도 캔버스에 그린 뒤 확대해 자연스러운 블러를 얻는다
      const canopyLayer = (
        scale: number,
        clusters: Array<{ cx: number; cy: number; spread: number; count: number; base: number; color: string }>,
      ) => {
        const s = document.createElement('canvas')
        s.width = Math.max(2, Math.round(w * scale))
        s.height = Math.max(2, Math.round(h * scale))
        const sc = s.getContext('2d')!
        sc.scale(scale, scale)
        for (const cl of clusters) {
          sc.fillStyle = cl.color
          for (let i = 0; i < cl.count; i++) {
            const a = Math.random() * Math.PI * 2
            const d = Math.pow(Math.random(), 0.6) * cl.spread
            const x = cl.cx + Math.cos(a) * d * 1.3
            const y = cl.cy + Math.sin(a) * d
            const r = cl.base * (0.6 + Math.random() * 0.9)
            sc.beginPath()
            sc.ellipse(x, y, r * 1.4, r, a, 0, Math.PI * 2)
            sc.fill()
          }
        }
        c.imageSmoothingEnabled = true
        c.imageSmoothingQuality = 'high'
        c.drawImage(s, 0, 0, w, h)
      }
      // 깊은 배경 캐노피 (강한 블러) → 근경 실루엣 → 달빛 받은 잎 하이라이트
      canopyLayer(0.03, [
        { cx: w * 1.05, cy: h * 0.02, spread: w * 0.3, count: 90, base: w * 0.05, color: 'rgba(10, 34, 26, 0.55)' },
        { cx: -w * 0.05, cy: -h * 0.05, spread: w * 0.26, count: 70, base: w * 0.045, color: 'rgba(10, 34, 26, 0.5)' },
      ])
      canopyLayer(0.08, [
        { cx: w * 1.04, cy: h * 0.04, spread: w * 0.24, count: 110, base: w * 0.032, color: 'rgba(6, 18, 14, 0.8)' },
        { cx: w * 0.92, cy: h * 0.42, spread: w * 0.12, count: 60, base: w * 0.026, color: 'rgba(6, 18, 14, 0.7)' },
        { cx: -w * 0.03, cy: -h * 0.06, spread: w * 0.2, count: 80, base: w * 0.03, color: 'rgba(6, 18, 14, 0.75)' },
        { cx: w * 0.38, cy: -h * 0.1, spread: w * 0.17, count: 50, base: w * 0.026, color: 'rgba(6, 18, 14, 0.6)' },
      ])
      canopyLayer(0.1, [
        { cx: w * 0.86, cy: h * 0.16, spread: w * 0.1, count: 34, base: w * 0.018, color: 'rgba(58, 118, 86, 0.22)' },
        { cx: w * 0.72, cy: h * 0.06, spread: w * 0.08, count: 26, base: w * 0.015, color: 'rgba(58, 118, 86, 0.18)' },
      ])

      // 바닥 안개
      const mist = c.createLinearGradient(0, h * 0.78, 0, h)
      mist.addColorStop(0, 'rgba(0, 0, 0, 0)')
      mist.addColorStop(1, 'rgba(10, 26, 22, 0.85)')
      c.fillStyle = mist
      c.fillRect(0, 0, w, h)

      return off
    }

    interface Firefly {
      x: number; y: number; r: number; ph: number; sp: number; dx: number; dy: number
    }
    let flies: Firefly[] = []
    const seed = () => {
      flies = Array.from({ length: 42 }, () => ({
        x: Math.random(),
        y: 0.12 + Math.random() * 0.78,
        r: 1 + Math.random() * 2.4,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.9,
        dx: (Math.random() - 0.5) * 0.00003,
        dy: (Math.random() - 0.5) * 0.00002,
      }))
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stat = buildStatic(canvas.width, canvas.height)
      seed()
    }
    resize()
    window.addEventListener('resize', resize)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (t: number) => {
      const { width: w, height: h } = canvas
      if (stat) ctx.drawImage(stat, 0, 0)

      // 반딧불이: 천천히 떠다니며 깜빡인다
      for (const f of flies) {
        f.x = (f.x + f.dx * f.sp * 16 + 1) % 1
        f.y = (f.y + f.dy * f.sp * 16 + Math.sin(t * 0.0003 * f.sp + f.ph) * 0.00012 + 1) % 1
        const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 0.0016 * f.sp + f.ph))
        const x = f.x * w
        const y = f.y * h
        const glow = ctx.createRadialGradient(x, y, 0, x, y, f.r * 7)
        glow.addColorStop(0, `rgba(255, 214, 140, ${0.5 * tw})`)
        glow.addColorStop(0.35, `rgba(226, 176, 92, ${0.22 * tw})`)
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, f.r * 7, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255, 236, 190, ${0.85 * tw})`
        ctx.beginPath()
        ctx.arc(x, y, f.r * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default function Hero({ onPrivacyClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 인트로: 라벨 → 헤드라인 줄 단위 리빌 → 서브카피 → 폼 → 칩
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-label]', { y: 24, opacity: 0, duration: 0.6 })
        .from('[data-hero-line]', { yPercent: 110, duration: 0.9, stagger: 0.14 }, '-=0.2')
        .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('[data-hero-form]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('[data-hero-chip]', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, '-=0.6')

      // 스크롤 아웃: 텍스트가 위로 빠지며 페이드
      gsap.to('[data-hero-text]', {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 35%', scrub: true },
      })

      // 마우스 패럴랙스: 칩이 깊이값에 따라 다르게 따라옴
      const chipSetters = gsap.utils.toArray<HTMLElement>('[data-hero-chip]').map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
        depth: Number(el.dataset.depth ?? 30),
      }))

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        chipSetters.forEach((c) => {
          c.x(nx * c.depth)
          c.y(ny * c.depth)
        })
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden bg-slate-900">
      {/* 배경: 앰비언트 폴백 → 비디오 → 오버레이 스택 */}
      <AmbientCanvas />
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-black/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* 플로팅 키워드 칩 — 마우스 패럴랙스 */}
      {FLOATING_CHIPS.map((chip) => (
        <div
          key={chip.label}
          data-hero-chip
          data-depth={chip.depth}
          className="pointer-events-none absolute z-10 hidden lg:block"
          style={{ left: chip.x, top: chip.y }}
        >
          <span
            className="inline-block animate-float rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] font-medium text-white/80 backdrop-blur"
            style={{ animationDelay: `${chip.delay}s` }}
          >
            {chip.label}
          </span>
        </div>
      ))}

      <div className="relative z-20 mx-auto flex w-full max-w-[1040px] flex-1 items-center px-6 pb-24 pt-24 lg:pt-16">
        <div data-hero-text className="max-w-2xl">
          <p data-hero-label className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold text-[#E8C9A0] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            무료 PDF · 5분 안에 받아보세요
          </p>

          <h1 className="font-display text-[34px] font-bold leading-[1.32] text-white sm:text-[42px] lg:text-[46px]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">팔로워 수보다 중요한 건</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                당신이 <span className="highlight-marker text-[#F0A984]">어떤 사람으로</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                <span className="highlight-marker text-[#F0A984]">기억되는가</span>입니다
              </span>
            </span>
          </h1>

          <p data-hero-sub className="mt-6 max-w-md text-[16px] leading-[1.7] text-white/75">
            하루 1시간, 3일이면 나만의 브랜드 뼈대가 잡힙니다.
            7년차 퍼스널브랜딩 코치 유미가 만든{' '}
            <strong className="font-semibold text-white">『3일 퍼스널브랜딩 로드맵』</strong> 워크북을
            이메일로 보내드려요.
          </p>

          <div
            data-hero-form
            className="mt-8 [&_label]:text-white/60 [&_label_button]:hover:text-white [&_.form-note]:text-white/45"
          >
            <LeadForm onPrivacyClick={onPrivacyClick} />
          </div>
        </div>
      </div>

      {/* 하단 마퀴 */}
      <div className="relative z-20 overflow-hidden border-t border-white/10 bg-white/5 py-4 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[13px] font-semibold tracking-[0.14em] text-white/50">
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
