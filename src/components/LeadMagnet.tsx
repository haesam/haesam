import Reveal from './Reveal'

const BENEFITS = [
  {
    title: 'Day 1 — 나를 데이터로 보기',
    desc: '지난 커리어에서 에너지를 얻은 순간과 잃은 순간을 구조화해, 감이 아닌 기록으로 내 강점을 확인합니다.',
  },
  {
    title: 'Day 2 — 기준 세우기',
    desc: '연봉·성장·안정·자율 중 나에게 진짜 중요한 가치의 우선순위를 한 장의 매트릭스로 정리합니다.',
  },
  {
    title: 'Day 3 — 방향과 액션플랜',
    desc: '정리된 기준으로 커리어 선택지 3개를 비교하고, 이번 주에 시작할 수 있는 액션 플랜을 도출합니다.',
  },
]

export default function LeadMagnet() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-page px-5">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-sage">Free Workbook · 32p PDF</p>
          <h2 className="mt-3 text-center text-2xl font-bold md:text-4xl">
            워크북 하나로, 3일 뒤엔 이렇게 달라집니다
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-sand bg-cream p-8">
                <h3 className="text-lg font-semibold text-forest md:text-xl">{b.title}</h3>
                <p className="mt-3 leading-[1.7] text-stone">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center leading-relaxed text-stone">
            하루 20분씩, 3일. 32페이지 중 <strong className="text-ink">21페이지가 직접 쓰는 워크시트</strong>입니다.
            읽고 끝나는 자료가 아니라, 끝내면 결과물이 남는 자료예요.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
