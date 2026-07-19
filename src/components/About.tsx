import Reveal from './Reveal'

const CREDENTIALS = [
  { number: '10년', label: '성인 진로상담 경력' },
  { number: '2,400+', label: '누적 1:1 상담 건수' },
  { number: '96%', label: '상담 만족도' },
]

export default function About() {
  return (
    <section className="mx-auto max-w-page px-5 py-16 md:py-24">
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
          {/* 프로필 사진 자리 — 실제 사진으로 교체 */}
          <div
            className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-sage text-5xl font-bold text-cream md:h-48 md:w-48"
            aria-label="라이언 상담사 프로필"
          >
            R
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sage">About</p>
            <h2 className="mt-2 text-2xl font-bold md:text-4xl">
              안녕하세요, 성인 진로상담사 <span className="text-sage">라이언</span>입니다
            </h2>
            <p className="mt-5 leading-[1.8] text-stone">
              저도 7년차에 번아웃으로 퇴사하고 1년을 헤맸습니다. 그때 알게 됐어요 — 막막함의 원인은 능력 부족이
              아니라 <strong className="text-ink">기준의 부재</strong>라는 걸. 그 후 10년간 직장인, 경력보유여성,
              전직 희망자 2,400여 명과 함께 각자의 기준을 찾아왔습니다. 이 워크북은 그 상담에서 가장 효과가 좋았던
              도구만 추린 결과물입니다.
            </p>
            <ul className="mt-5 space-y-1.5 text-sm text-stone">
              <li>· 직업상담사 1급 / 국제코치연맹(ICF) 인증 코치</li>
              <li>· 前 대기업 HR 8년, 커리어 전환 교육 출강 120회+</li>
              <li>· 『서른, 방향을 다시 묻다』 저자</li>
            </ul>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-sand bg-white p-6 text-center shadow-card md:p-8">
          {CREDENTIALS.map((c) => (
            <div key={c.label}>
              <dd className="text-2xl font-bold text-amber md:text-4xl">{c.number}</dd>
              <dt className="mt-1 text-xs text-stone md:text-sm">{c.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
