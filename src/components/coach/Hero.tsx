import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LeadForm from './LeadForm'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onPrivacyClick: () => void
}

const VIDEO_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_video_mindfull.mp4'

const FLOATING_CHIPS = [
  { label: '포지셔닝', x: '6%', y: '18%', depth: 28, delay: 0 },
  { label: 'Day 1 · 나 정의하기', x: '78%', y: '12%', depth: 46, delay: 0.8 },
  { label: '콘텐츠 방향', x: '88%', y: '62%', depth: 34, delay: 1.6 },
  { label: '첫 발행', x: '3%', y: '70%', depth: 52, delay: 2.4 },
]

const MARQUEE_ITEMS = [
  'PERSONAL BRANDING',
  '3-DAY ROADMAP',
  '하루 1시간',
  'FREE PDF',
  '팔로워 0명부터',
]

export default function Hero({ onPrivacyClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 인트로: 라벨 → 헤드라인 줄 단위 리빌 → 서브카피 → 폼 → 목업
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-label]', { y: 24, opacity: 0, duration: 0.6 })
        .from('[data-hero-line]', { yPercent: 110, duration: 0.9, stagger: 0.14 }, '-=0.2')
        .from('[data-hero-sub]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('[data-hero-form]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('[data-hero-mockup]', { y: 60, opacity: 0, rotateY: -28, duration: 1.1, ease: 'power4.out' }, '-=0.7')
        .from('[data-hero-chip]', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, '-=0.8')

      // 스크롤 아웃: 텍스트는 위로 빠지고 목업은 기울며 축소
      gsap.to('[data-hero-text]', {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 35%', scrub: true },
      })
      gsap.to('[data-hero-mockup]', {
        yPercent: 14,
        rotateY: 24,
        rotateX: 8,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 35%', scrub: true },
      })

      // 마우스 패럴랙스: 칩과 목업이 깊이값에 따라 다르게 따라옴
      const chipSetters = gsap.utils.toArray<HTMLElement>('[data-hero-chip]').map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
        depth: Number(el.dataset.depth ?? 30),
      }))
      const mockupRotX = gsap.quickTo('[data-hero-tilt]', 'rotateX', { duration: 0.9, ease: 'power3' })
      const mockupRotY = gsap.quickTo('[data-hero-tilt]', 'rotateY', { duration: 0.9, ease: 'power3' })

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        chipSetters.forEach((c) => {
          c.x(nx * c.depth)
          c.y(ny * c.depth)
        })
        mockupRotY(nx * 16 - 8)
        mockupRotX(ny * -12 + 4)
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden bg-slate-900">
      {/* 배경 비디오 + 오버레이 스택 (로드 전 폴백: bg-slate-900) */}
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

      <div className="relative z-20 mx-auto grid w-full max-w-[1040px] flex-1 items-center gap-14 px-6 pb-24 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-16">
        {/* 좌: 카피 + 폼 */}
        <div data-hero-text>
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

        {/* 우: PDF 목업 — 3D 틸트 */}
        <div data-hero-mockup className="perspective-1000 mx-auto w-full max-w-[300px] lg:max-w-[340px]">
          <div data-hero-tilt className="preserve-3d relative">
            <div className="preserve-3d relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#3A2E27] via-[#2B2420] to-[#1E1915] p-7 shadow-lifted">
              <div className="absolute inset-x-0 top-0 h-full rounded-2xl border border-white/10" />
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E8C9A0]">FREE WORKBOOK</p>
                  <p className="mt-5 font-display text-[26px] font-bold leading-snug text-[#FAF7F2]">
                    3일<br />퍼스널브랜딩<br />로드맵
                  </p>
                </div>
                <div>
                  <div className="mb-4 space-y-1.5">
                    {['Day 1 — 나를 한 문장으로', 'Day 2 — 사람과 방향', 'Day 3 — 첫 콘텐츠 발행'].map((d) => (
                      <p key={d} className="text-[11px] text-white/50">{d}</p>
                    ))}
                  </div>
                  <p className="text-[12px] font-medium text-[#E8C9A0]">유미 코치 · YUMI</p>
                </div>
              </div>
              {/* 책등 느낌의 측면 */}
              <div
                className="absolute left-0 top-0 h-full w-3 rounded-l-2xl bg-black/30"
                style={{ transform: 'translateZ(-2px)' }}
              />
            </div>
            {/* 뒤 그림자 카드 */}
            <div
              className="absolute inset-0 -z-10 rounded-2xl bg-accent/20 blur-sm"
              style={{ transform: 'translateZ(-40px) translateX(20px) translateY(20px)' }}
            />
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
