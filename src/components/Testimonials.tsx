import Reveal from './Reveal'

const TESTIMONIALS = [
  {
    quote:
      '이직 준비를 1년 미뤘는데, 워크북 Day 2를 끝내고 나서야 제가 뭘 원하는지 알겠더라고요. 3개월 뒤에 원하던 직무로 옮겼습니다.',
    who: '김○○ · 34세 · 마케터',
  },
  {
    quote:
      '경단 6년차라 자신이 없었어요. "할 수 있는 일"이 아니라 "하고 싶은 일"부터 정리하라는 접근이 저에겐 전환점이었습니다.',
    who: '박○○ · 41세 · 재취업 준비',
  },
  {
    quote:
      '무료 자료라 기대 안 했는데 유료 강의보다 낫습니다. 특히 가치 매트릭스는 지금도 큰 결정 때마다 꺼내 씁니다.',
    who: '이○○ · 29세 · 개발자',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-page px-5">
        <Reveal>
          <h2 className="text-center text-2xl font-bold md:text-4xl">먼저 받아본 분들의 이야기</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.who} className="flex flex-col rounded-2xl border border-sand bg-cream p-8">
                <span className="text-3xl font-bold leading-none text-sage" aria-hidden="true">
                  “
                </span>
                <blockquote className="mt-2 flex-1 leading-[1.7]">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm text-stone">{t.who}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
