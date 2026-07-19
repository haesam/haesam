import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Lottie from 'lottie-react'
import pulseAnim from './lottie/pulse.json'
import EmailForm from './EmailForm'

gsap.registerPlugin(ScrollTrigger)

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  // 단어 단위로 감싸 한글이 단어 중간에서 줄바꿈되지 않게 한다
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} className="hero-char inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export default function CoachHero() {
  const root = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  // 워크북 목업 3D 틸트 (framer-motion)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })

  const onMouseMove = (e: React.MouseEvent) => {
    const r = root.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 47 + 13) % 100}%`,
        top: `${(i * 31 + 7) % 100}%`,
        size: 2 + ((i * 13) % 4),
        delay: (i % 7) * 0.4,
      })),
    []
  )

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // ── 진입 타임라인 ──────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-badge', { y: 24, autoAlpha: 0, duration: 0.7 })
        .from(
          '.hero-char',
          { yPercent: 130, rotateX: -50, autoAlpha: 0, duration: 1, stagger: 0.022 },
          '-=0.35'
        )
        .from('.hero-sub', { y: 28, autoAlpha: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-form', { y: 32, autoAlpha: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-proof', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-book', { y: 70, autoAlpha: 0, rotate: 8, duration: 1.1, ease: 'expo.out' }, '-=0.9')
        .from('.hero-chip', { y: 30, autoAlpha: 0, scale: 0.8, stagger: 0.12, duration: 0.7 }, '-=0.7')
        .from('.hero-scroll', { autoAlpha: 0, duration: 0.6 }, '-=0.3')

      if (reduced) tl.progress(1)

      // ── 소셜프루프 카운트업 ────────────────────────
      const counter = { v: 0 }
      gsap.to(counter, {
        v: 1247,
        duration: 2.2,
        delay: reduced ? 0 : 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = Math.floor(counter.v).toLocaleString()
        },
      })

      if (!reduced) {
        // ── 오로라 블롭 유영 ─────────────────────────
        gsap.utils.toArray<HTMLElement>('.hero-blob').forEach((blob, i) => {
          gsap.to(blob, {
            xPercent: () => gsap.utils.random(-18, 18),
            yPercent: () => gsap.utils.random(-14, 14),
            scale: () => gsap.utils.random(0.85, 1.25),
            duration: () => gsap.utils.random(7, 12),
            delay: i * 0.8,
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            ease: 'sine.inOut',
          })
        })

        // ── 파티클 부유 ─────────────────────────────
        gsap.utils.toArray<HTMLElement>('.hero-particle').forEach((p) => {
          gsap.to(p, {
            y: () => gsap.utils.random(-28, 28),
            x: () => gsap.utils.random(-16, 16),
            opacity: () => gsap.utils.random(0.15, 0.7),
            duration: () => gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
            ease: 'sine.inOut',
          })
        })

        // ── 플로팅 칩 둥실거림 ───────────────────────
        gsap.utils.toArray<HTMLElement>('.hero-chip').forEach((chip, i) => {
          gsap.to(chip, {
            y: i % 2 === 0 ? -14 : 12,
            rotate: i % 2 === 0 ? 2 : -2,
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })

        // ── 스크롤 패럴랙스 ─────────────────────────
        gsap.to('.hero-copy', {
          yPercent: -14,
          autoAlpha: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: 0.8 },
        })
        gsap.to('.hero-stage', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#0B2018] px-5 pb-28 pt-20 text-[#F6F1E7] lg:flex-row lg:gap-8 lg:px-16 lg:pb-16 lg:pt-0"
    >
      {/* 오로라 배경 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#1E5741] opacity-60 blur-[110px]" />
        <div className="hero-blob absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#C96F4A] opacity-25 blur-[130px]" />
        <div className="hero-blob absolute bottom-[-12rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#E4C97E] opacity-15 blur-[120px]" />
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle absolute rounded-full bg-[#E4C97E]"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: 0.3 }}
          />
        ))}
        <div className="absolute inset-0 mix-blend-overlay opacity-40" style={{ backgroundImage: GRAIN }} />
      </div>

      {/* 카피 + 폼 */}
      <div className="hero-copy relative z-10 flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:pt-24 lg:text-left">
        <p className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#E4C97E]/40 bg-[#E4C97E]/10 px-4 py-1.5 text-sm font-medium tracking-wide text-[#E4C97E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4C97E]" />
          무료 워크북 · 15개의 셀프 코칭 질문
        </p>

        <h1
          className="font-coach-sans text-[2.1rem] font-extrabold leading-[1.3] tracking-[-0.02em] [word-break:keep-all] sm:text-5xl lg:text-[3.2rem]"
          style={{ perspective: 600 }}
        >
          <span className="block overflow-hidden pb-1">
            <SplitChars text="열심히는 사는데," />
          </span>
          <span className="block overflow-hidden pb-1">
            <SplitChars text="방향이 맞는지 모르겠다면" />
          </span>
          <span className="block overflow-hidden pb-2 pt-1 text-[#E4C97E]">
            <SplitChars text="당신의 다음 챕터를 찾아드립니다" />
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-md text-base leading-[1.7] text-[#F6F1E7]/70 [word-break:keep-all] sm:text-lg">
          현직 라이프 코치가 실제 세션에서 쓰는 셀프 코칭 워크북.
          <br className="hidden sm:block" /> 30분이면 흩어진 고민이 방향으로 정리됩니다.
        </p>

        <div className="hero-form mt-8 w-full max-w-xl">
          <EmailForm variant="dark" />
        </div>

        <p className="hero-proof mt-6 flex items-center gap-3 text-sm text-[#F6F1E7]/60">
          <span className="flex -space-x-2">
            {['김', '이', '박', '최'].map((n, i) => (
              <span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0B2018] bg-[#1E5741] text-[10px] font-bold text-[#E4C97E]"
              >
                {n}
              </span>
            ))}
          </span>
          이미 <span ref={countRef} className="font-bold text-[#E4C97E]">0</span>명이 받아갔어요
        </p>
      </div>

      {/* 워크북 목업 스테이지 */}
      <div className="hero-stage relative z-10 mt-14 flex flex-1 items-center justify-center lg:mt-0 lg:min-h-screen">
        <div className="pointer-events-none absolute h-[26rem] w-[26rem] -translate-y-4">
          <Lottie animationData={pulseAnim} loop className="h-full w-full opacity-60" />
        </div>

        <motion.div
          className="hero-book relative"
          style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
        >
          <div className="relative h-[19rem] w-[14rem] rounded-2xl border border-[#E4C97E]/30 bg-gradient-to-br from-[#F6F1E7] to-[#E8DFC9] p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:h-[22rem] sm:w-[16rem]">
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-[#14352A]/15" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C96F4A]">
              Self-Coaching Workbook
            </p>
            <h3 className="font-coach-sans mt-4 text-2xl font-extrabold leading-[1.35] tracking-[-0.01em] text-[#14352A]">
              인생 방향
              <br />
              점검 워크북
            </h3>
            <p className="mt-3 text-sm text-[#14352A]/60">15 Questions · 30 Minutes</p>
            <div className="absolute bottom-6 left-6 right-6 border-t border-[#14352A]/15 pt-3">
              <p className="text-xs text-[#14352A]/50">코치 해샘 · Free Edition</p>
            </div>
          </div>

          {/* 플로팅 질문 칩 */}
          <div
            className="hero-chip absolute -left-32 -top-6 hidden whitespace-nowrap rounded-xl bg-[#0E2A1F]/95 px-4 py-2.5 text-xs text-[#F6F1E7] shadow-xl ring-1 ring-[#E4C97E]/30 sm:block"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="text-[#E4C97E]">Q1.</span> 지난 1년, 가장 나다웠던 순간은?
          </div>
          <div
            className="hero-chip absolute -right-16 top-[58%] hidden whitespace-nowrap rounded-xl bg-[#0E2A1F]/95 px-4 py-2.5 text-xs text-[#F6F1E7] shadow-xl ring-1 ring-[#E4C97E]/30 sm:block"
            style={{ transform: 'translateZ(70px)' }}
          >
            <span className="text-[#E4C97E]">Q7.</span> 무엇을 그만두고 싶나요?
          </div>
          <div
            className="hero-chip absolute -bottom-8 -left-14 hidden rounded-xl bg-[#C96F4A] px-4 py-2.5 text-xs font-semibold text-white shadow-lg sm:block"
            style={{ transform: 'translateZ(60px)' }}
          >
            30분이면 충분해요 ✍️
          </div>
        </motion.div>
      </div>

      {/* 스크롤 안내 */}
      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center overflow-hidden rounded-full border border-[#F6F1E7]/30 p-1.5">
          <span className="h-2 w-1 animate-scroll-down rounded-full bg-[#E4C97E]" />
        </div>
      </div>
    </section>
  )
}
