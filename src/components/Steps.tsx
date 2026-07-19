import Reveal from './Reveal'

const STEPS = [
  { step: '1', title: '이메일 입력', desc: '아래 폼에 이메일 주소만 입력하세요. 10초면 충분해요.' },
  { step: '2', title: '메일함 확인', desc: '1분 안에 워크북 PDF가 담긴 메일이 도착합니다.' },
  { step: '3', title: '3일 완주', desc: '하루 20분, Day 1부터 차례로. 3일 뒤 방향이 정리됩니다.' },
]

export default function Steps() {
  return (
    <section className="mx-auto max-w-page px-5 py-16 md:py-24">
      <Reveal>
        <h2 className="text-center text-2xl font-bold md:text-4xl">받는 방법은 간단합니다</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="rounded-2xl border border-sand bg-white p-8 text-center shadow-card">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-forest font-bold text-cream">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-stone">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-stone">
          스팸은 보내지 않아요. 워크북 외에는 격주 커리어 레터만 발송되며, 언제든 클릭 한 번으로 수신거부할 수
          있습니다.
        </p>
      </Reveal>
    </section>
  )
}
