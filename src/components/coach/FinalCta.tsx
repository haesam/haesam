import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LeadForm from './LeadForm'

gsap.registerPlugin(ScrollTrigger)

interface FinalCtaProps {
  onPrivacyClick: () => void
}

const FAQS = [
  {
    q: '정말 무료인가요?',
    a: '네, 100% 무료예요. 이메일만 남기시면 바로 PDF를 보내드립니다. 숨겨진 결제나 조건은 없어요.',
  },
  {
    q: '받은 이메일로 뭐가 오나요?',
    a: '신청 직후 3일 로드맵 PDF가 발송되고, 이후 주 1회 퍼스널브랜딩 실전 팁 뉴스레터가 발행돼요. 언제든 한 번의 클릭으로 구독 해지할 수 있습니다.',
  },
  {
    q: '완전 초보자도 할 수 있나요?',
    a: '팔로워 0명, 계정이 없어도 괜찮아요. 로드맵은 "아직 아무것도 없는 사람"을 기준으로 설계됐고, 빈칸을 채우는 워크북 형식이라 따라오기만 하면 됩니다.',
  },
  {
    q: '개인정보는 어떻게 관리되나요?',
    a: '이메일은 자료 발송과 뉴스레터 발행 목적으로만 사용하고, 구독 해지 시 지체 없이 파기합니다. 제3자에게 제공하지 않아요.',
  },
]

export default function FinalCta({ onPrivacyClick }: FinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-6">
        {/* FAQ */}
        <div data-reveal className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-[26px] font-bold sm:text-[32px]">
            자주 묻는 질문
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => {
              const open = openIdx === i
              return (
                <div key={faq.q} className="overflow-hidden rounded-xl bg-surface shadow-card">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[15px] font-semibold">{faq.q}</span>
                    <motion.svg
                      animate={{ rotate: open ? 45 : 0 }}
                      className="h-5 w-5 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-5 text-[14px] leading-[1.8] text-muted">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* 파이널 CTA */}
        <div data-reveal className="mt-24 rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 lg:py-20">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-[#E8C9A0]">LAST CALL</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-[26px] font-bold leading-snug text-bg sm:text-[34px]">
            3일 뒤의 당신은
            <br />
            오늘의 결정에서 시작됩니다
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-bg/60">
            내일도 "언젠가 해야지"라고 미루게 될 거예요.
            지금 이메일을 남기고, 오늘을 Day 0으로 만드세요.
          </p>
          <div className="mx-auto mt-9 flex max-w-xl justify-center [&_input[type='email']]:border-transparent [&_label]:text-bg/50 [&_label_button]:hover:text-bg">
            <LeadForm id="lead-form" compact onPrivacyClick={onPrivacyClick} />
          </div>
        </div>
      </div>
    </section>
  )
}
