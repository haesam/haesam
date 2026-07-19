import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 생성형 AI로 만든 실사 예시 인물(가상 인물). 배포 시 아래 URL의 이미지를
// public/images/coach-yumi.jpg 로 내려받아 두면 로컬 파일이 우선 사용된다.
const COACH_PHOTO_FALLBACK =
  'https://d8j0ntlcm91z4.cloudfront.net/user_2zKID9uGHH3s9RILDyuHqKJaCTk/hf_20260719_140314_a646c062-cfac-4127-a818-9efe5307adb1.png'

const STATS = [
  { value: 7, suffix: '년', label: '퍼스널브랜딩 코칭' },
  { value: 300, suffix: '+', label: '1:1 코칭 수강생' },
  { value: 92, suffix: '%', label: '3일 완주율' },
]

export default function AboutCoach() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('[data-coach-photo]', {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      })
      gsap.from('[data-coach-text]', {
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      })
      // 숫자 카운트업
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const obj = { n: 0 }
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.n))
          },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="coach" className="relative overflow-hidden bg-surface py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1040px] items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div data-coach-photo className="relative mx-auto w-full max-w-[360px]">
          <div className="overflow-hidden rounded-3xl shadow-lifted">
            <img
              src="/images/coach-yumi.jpg"
              onError={(e) => {
                const img = e.currentTarget
                if (img.src !== COACH_PHOTO_FALLBACK) img.src = COACH_PHOTO_FALLBACK
              }}
              alt="퍼스널브랜딩 코치 유미"
              className="aspect-[3/4] w-full bg-stroke object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-5 -right-4 rounded-2xl bg-accent px-5 py-3 text-white shadow-cta sm:-right-8">
            <p className="text-[13px] font-semibold">유미 · YUMI</p>
            <p className="text-[11px] opacity-80">Personal Branding Coach</p>
          </div>
        </div>

        <div data-coach-text>
          <p className="text-[13px] font-semibold tracking-[0.18em] text-accent">ABOUT COACH</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-snug sm:text-[32px]">
            저도 팔로워 0명에서
            <br />
            시작했습니다
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-muted">
            <p>
              안녕하세요, 퍼스널브랜딩 코치 <strong className="font-semibold text-ink">유미</strong>입니다.
              7년 전 저는 매일 남의 콘텐츠를 부러워만 하던 평범한 직장인이었어요.
            </p>
            <p>
              수십 번의 시행착오 끝에 알게 된 건, 브랜딩은 재능이 아니라{' '}
              <strong className="highlight-marker font-semibold text-ink">순서와 구조</strong>라는 사실이었습니다.
              그 구조를 300명이 넘는 수강생들에게 검증했고, 가장 압축된 첫 3일을 이 워크북에 담았어요.
            </p>
            <p>당신의 3일을 제가 설계해 드릴게요.</p>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-bg px-3 py-5 text-center">
                <p className="font-display text-[26px] font-bold text-ink">
                  <span data-count={stat.value}>0</span>
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-[12px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
