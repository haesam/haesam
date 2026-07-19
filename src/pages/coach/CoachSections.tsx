import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import EmailForm from './EmailForm'

gsap.registerPlugin(ScrollTrigger)

const easeOut = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger}
      className={`px-5 py-20 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ── 마퀴 스트립 ─────────────────────────────────────────
export function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, { xPercent: -50, repeat: -1, duration: 22, ease: 'none' })
    })
    return () => ctx.revert()
  }, [])
  const items = ['인생 방향 점검 워크북', '15 QUESTIONS', '무료 나눔', 'SELF-COACHING', '30 MINUTES']
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-[#E4C97E]/20 bg-[#0E2A1F] py-4">
      <div ref={track} className="flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {row.map((t, i) => (
              <span
                key={`${half}-${i}`}
                className="mx-6 flex items-center gap-6 font-coach-sans text-lg font-semibold tracking-wide text-[#E4C97E]/80"
              >
                {t} <span className="text-[#C96F4A]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ② 문제 공감 ─────────────────────────────────────────
const pains = [
  { emoji: '🌫️', text: '아침에 일어나면 이유 없이 무기력해요' },
  { emoji: '📱', text: '남들과 비교하다 하루가 끝나요' },
  { emoji: '📅', text: '계획은 세우는데 3일을 못 가요' },
  { emoji: '🧭', text: '뭘 원하는지 물어보면 말문이 막혀요' },
]

function PainSection() {
  return (
    <Section className="bg-[#F6F1E7] text-[#14352A]">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2 variants={fadeUp} className="font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          혹시, 이런 생각을
          <br className="sm:hidden" /> 하고 있진 않나요?
        </motion.h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pains.map((p) => (
            <motion.div
              key={p.text}
              variants={fadeUp}
              whileHover={{ y: -6, rotate: -0.5 }}
              className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-[#14352A]/8"
            >
              <span className="text-2xl">{p.emoji}</span>
              <p className="mt-3 text-lg leading-[1.65]">“{p.text}”</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mx-auto mt-12 max-w-xl text-lg leading-[1.7] text-[#14352A]/70">
          의지의 문제가 아닙니다.{' '}
          <span className="font-bold text-[#C96F4A]">방향이 정리되지 않았기 때문</span>입니다.
        </motion.p>
      </div>
    </Section>
  )
}

// ── ③ 자료 소개 ─────────────────────────────────────────
const parts = [
  { no: 'Part 1', title: '지난 1년 돌아보기', desc: '질문 5개로 흩어져 있던 경험이 패턴으로 보이기 시작합니다' },
  { no: 'Part 2', title: '나의 가치관 지도 그리기', desc: '결정이 쉬워지는 나만의 기준 3가지를 발견합니다' },
  { no: 'Part 3', title: '에너지 도둑 찾아내기', desc: '그만둬야 할 것 리스트가 명확해집니다' },
  { no: 'Part 4', title: '다음 챕터 선언문 쓰기', desc: '90일 뒤의 나를 한 문장으로 정의하게 됩니다' },
]

function InsideSection() {
  return (
    <Section className="bg-white text-[#14352A]">
      <div className="mx-auto max-w-4xl">
        <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-[#C96F4A]">
          What's Inside
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-center font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          워크북에 담긴 것들
        </motion.h2>
        <div className="mt-12 space-y-4">
          {parts.map((p, i) => (
            <motion.div
              key={p.no}
              variants={fadeUp}
              className="flex items-start gap-5 rounded-2xl bg-[#F6F1E7] p-6 ring-1 ring-[#14352A]/5 sm:items-center"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14352A] font-coach-sans text-lg font-bold text-[#E4C97E]">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C96F4A]">{p.no}</p>
                <h3 className="mt-0.5 text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-[#14352A]/60">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ── ④ 코치 소개 ─────────────────────────────────────────
function CoachSection() {
  return (
    <Section className="bg-[#F6F1E7] text-[#14352A]">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:gap-14">
        <motion.div variants={fadeUp} className="shrink-0">
          <div className="flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5741] to-[#0B2018] shadow-xl ring-4 ring-white">
            <span className="font-coach-sans text-5xl font-extrabold tracking-[-0.02em] text-[#E4C97E]">해샘</span>
          </div>
        </motion.div>
        <div className="text-center sm:text-left">
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.25em] text-[#C96F4A]">
            About Coach
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em]">
            저도 그 안개 속에 있었습니다
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 leading-[1.75] text-[#14352A]/70 [word-break:keep-all]">
            10년 차 직장인이던 어느 날, "이대로 10년 더?"라는 질문에 아무 대답도 할 수 없었습니다. 그때 저를
            꺼내준 것이 바로 이 질문들이었습니다. 지금은 같은 안개 속에 있는 분들이 자신만의 방향을 찾도록
            돕고 있습니다.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            {['누적 코칭 1,200시간+', '한국코치협회 KPC 인증', '기업 강의 40회+'].map((t) => (
              <span key={t} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium ring-1 ring-[#14352A]/10">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ── ⑤ 후기 ──────────────────────────────────────────────
const reviews = [
  {
    name: '김○○ · 34세 마케터',
    text: '질문 7번에서 울컥했어요. 3년 만에 처음으로 내가 뭘 원하는지 적어봤습니다.',
  },
  {
    name: '이○○ · 29세 개발자',
    text: '자기계발서 열 권보다 이 워크북 30분이 나았어요. 다음 날 바로 퇴사 준비 대신 사이드 프로젝트를 시작했습니다.',
  },
  {
    name: '박○○ · 41세 프리랜서',
    text: '막연했던 불안이 "해야 할 것 3가지"로 정리되는 경험. 무료라는 게 믿기지 않네요.',
  },
]

function ReviewSection() {
  return (
    <Section className="bg-white text-[#14352A]">
      <div className="mx-auto max-w-4xl">
        <motion.h2 variants={fadeUp} className="text-center font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          먼저 받아간 분들의 이야기
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`flex flex-col justify-between rounded-2xl p-6 ring-1 ${
                i === 1 ? 'bg-[#14352A] text-[#F6F1E7] ring-[#14352A]' : 'bg-[#F6F1E7] ring-[#14352A]/8'
              }`}
            >
              <blockquote className="leading-[1.7] [word-break:keep-all]">
                <span className={i === 1 ? 'text-[#E4C97E]' : 'text-[#C96F4A]'}>“</span>
                {r.text}
                <span className={i === 1 ? 'text-[#E4C97E]' : 'text-[#C96F4A]'}>”</span>
              </blockquote>
              <figcaption className={`mt-5 text-sm font-semibold ${i === 1 ? 'text-[#F6F1E7]/60' : 'text-[#14352A]/50'}`}>
                {r.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ── ⑥ 받는 방법 (GSAP 라인 드로잉) ───────────────────────
const steps = [
  { icon: '✉️', title: '이메일 입력', desc: '아래 폼에 이메일만 남겨주세요' },
  { icon: '📬', title: '받은편지함 확인', desc: '1분 안에 워크북이 도착합니다' },
  { icon: '✍️', title: '30분 워크북 작성', desc: '조용한 곳에서 질문에 답해보세요' },
]

function HowSection() {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = root.current?.querySelector<SVGPathElement>('.how-line')
      if (!path) return
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 30%', scrub: 1 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <Section className="bg-[#F6F1E7] text-[#14352A]">
      <div ref={root} className="mx-auto max-w-4xl text-center">
        <motion.h2 variants={fadeUp} className="font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          받는 방법은 딱 3스텝
        </motion.h2>
        <div className="relative mt-14">
          <svg
            className="absolute left-0 top-8 hidden w-full sm:block"
            height="4"
            viewBox="0 0 800 4"
            preserveAspectRatio="none"
          >
            <path className="how-line" d="M0 2 H800" stroke="#C96F4A" strokeWidth="3" strokeDasharray="8 8" fill="none" />
          </svg>
          <div className="relative grid gap-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="flex flex-col items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-md ring-1 ring-[#14352A]/10">
                  {s.icon}
                </span>
                <p className="mt-4 text-sm font-bold text-[#C96F4A]">STEP {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-[#14352A]/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.p variants={fadeUp} className="mt-12 text-sm text-[#14352A]/50">
          스팸 없음 · 언제든 구독 해지 가능 · 자료는 1분 안에 도착
        </motion.p>
      </div>
    </Section>
  )
}

// ── ⑦ 최종 CTA ─────────────────────────────────────────
function FinalCta() {
  return (
    <Section id="get" className="relative overflow-hidden bg-[#0B2018] text-[#F6F1E7]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#1E5741] opacity-50 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#C96F4A] opacity-20 blur-[110px]" />
      </div>
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.h2 variants={fadeUp} className="font-coach-sans text-3xl font-extrabold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          당신의 다음 챕터,
          <br />
          오늘 30분이면 시작됩니다
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[#F6F1E7]/60">
          지금 이메일을 남기면 「인생 방향 점검 워크북」을 무료로 보내드립니다.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex w-full justify-center">
          <EmailForm variant="dark" ctaLabel="무료로 받기" />
        </motion.div>
      </div>
    </Section>
  )
}

// ── 푸터 ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#081812] px-5 py-10 text-center text-sm text-[#F6F1E7]/40">
      <p className="font-coach-sans text-lg font-semibold text-[#F6F1E7]/70">코치 해샘</p>
      <p className="mt-3">대표: 해샘 · 문의: haesam92@gmail.com</p>
      <p className="mt-1">
        <a href="#" className="underline underline-offset-2 hover:text-[#E4C97E]">
          개인정보처리방침
        </a>
      </p>
      <p className="mt-4">© 2026 Coach Haesam. All rights reserved.</p>
    </footer>
  )
}

export default function CoachSections() {
  return (
    <>
      <Marquee />
      <PainSection />
      <InsideSection />
      <CoachSection />
      <ReviewSection />
      <HowSection />
      <FinalCta />
      <Footer />
    </>
  )
}
