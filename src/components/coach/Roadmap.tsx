import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PAINS = [
  '계정은 만들었는데 뭘 올려야 할지 모르겠다',
  '남들 따라 콘텐츠를 올려봐도 반응이 없다',
  "'나만의 컨셉'이라는 말이 제일 어렵다",
]

const DAYS = [
  {
    day: 'Day 1',
    title: '나를 한 문장으로 정의하기',
    desc: '경험·강점·관심사를 교차시켜 나만의 포지셔닝 문장을 완성해요. 이 한 문장이 모든 콘텐츠의 기준이 됩니다.',
    outcome: '결과물 — 나의 브랜드 한 줄 선언문',
  },
  {
    day: 'Day 2',
    title: '내 사람과 방향 정하기',
    desc: '누구에게 말할지 타겟 페르소나를 좁히고, 그 사람이 매일 검색하는 주제 3가지를 뽑아요.',
    outcome: '결과물 — 페르소나 카드 + 콘텐츠 주제 3개',
  },
  {
    day: 'Day 3',
    title: '첫 콘텐츠 발행하기',
    desc: '워크북의 템플릿에 채워 넣기만 하면 되는 첫 게시물 공식으로, 3일차에 실제 발행까지 끝냅니다.',
    outcome: '결과물 — 발행 완료된 첫 브랜딩 콘텐츠',
  },
]

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null)

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
      gsap.utils.toArray<HTMLElement>('[data-day-card]').forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="roadmap" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-[1040px] px-6">
        {/* 문제 공감 */}
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[26px] font-bold leading-snug sm:text-[32px]">
            혹시 이런 상태 아닌가요?
          </h2>
          <ul className="mt-8 space-y-3 text-left">
            {PAINS.map((pain) => (
              <li key={pain} className="flex items-start gap-3 rounded-xl bg-surface px-5 py-4 shadow-card">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[15px] leading-relaxed">{pain}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[16px] leading-relaxed text-muted">
            문제는 재능이 아니라 <strong className="highlight-marker font-semibold text-ink">순서</strong>예요.
            딱 3일, 순서대로만 따라오세요.
          </p>
        </div>

        {/* Day 1~3 카드 */}
        <div data-reveal className="mt-20 text-center">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-accent">WHAT'S INSIDE</p>
          <h2 className="mt-3 font-display text-[26px] font-bold sm:text-[32px]">
            로드맵 안에 담긴 3일
          </h2>
        </div>

        <div data-day-grid className="mt-12 grid gap-6 md:grid-cols-3">
          {DAYS.map((item) => (
            <div
              key={item.day}
              data-day-card
              className="group relative rounded-2xl bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lifted"
            >
              <p className="font-display text-[15px] font-bold text-accent">{item.day}</p>
              <h3 className="mt-3 text-[18px] font-bold leading-snug">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-muted">{item.desc}</p>
              <p className="mt-5 border-t border-stroke pt-4 text-[13px] font-medium text-success">
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
