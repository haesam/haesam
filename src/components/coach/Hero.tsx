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

/** 비디오를 불러오지 못하는 환경을 위한 앰비언트 모션 폴백.
 *  비디오가 정상 재생되면 위에 덮여 보이지 않는다. */
function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const BLOBS = [
      { color: '59, 164, 171', r: 0.52, cx: 0.75, cy: 0.35, ax: 0.16, ay: 0.1, sp: 0.00006, ph: 0 },
      { color: '226, 176, 92', r: 0.4, cx: 0.3, cy: 0.75, ax: 0.12, ay: 0.14, sp: 0.00005, ph: 2.1 },
      { color: '30, 64, 96', r: 0.6, cx: 0.5, cy: 0.2, ax: 0.2, ay: 0.08, sp: 0.00004, ph: 4.2 },
      { color: '59, 164, 171', r: 0.35, cx: 0.15, cy: 0.3, ax: 0.1, ay: 0.16, sp: 0.00007, ph: 5.4 },
    ]

    let raf = 0
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (t: number) => {
      const { width: w, height: h } = canvas
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const b of BLOBS) {
        const x = (b.cx + Math.sin(t * b.sp + b.ph) * b.ax) * w
        const y = (b.cy + Math.cos(t * b.sp * 1.3 + b.ph) * b.ay) * h
        const r = b.r * Math.max(w, h)
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(${b.color}, 0.16)`)
        g.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
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
