import Reveal from './Reveal'

const PAINS = [
  '출근길마다 "이 길이 맞나…" 싶은데, 퇴근하면 생각할 힘이 없다',
  '이직하고 싶지만 뭘 준비해야 할지 몰라 채용공고만 스크롤한다',
  '적성검사·MBTI는 다 해봤지만 달라진 건 없다',
  '연차는 쌓이는데 "내 커리어"라고 부를 만한 그림이 없다',
  '다시 일하고 싶은데 어디서부터 시작해야 할지 막막하다',
]

export default function PainPoints() {
  return (
    <section className="mx-auto max-w-prose px-5 py-16 md:py-24">
      <Reveal>
        <h2 className="text-center text-2xl font-bold md:text-4xl">혹시 이런 고민, 하고 계신가요?</h2>
        <ul className="mt-10 space-y-4">
          {PAINS.map((pain) => (
            <li
              key={pain}
              className="flex items-start gap-3 rounded-2xl border border-sand bg-white p-5 shadow-card"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-sage"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="leading-relaxed">{pain}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center leading-relaxed text-stone">
          하나라도 해당된다면, 지금 필요한 건 더 많은 채용공고가 아니라
          <br className="hidden md:block" />
          <strong className="text-ink"> 내 기준을 정리하는 시간</strong>입니다.
        </p>
      </Reveal>
    </section>
  )
}
