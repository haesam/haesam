import EmailForm from './EmailForm'
import Reveal from './Reveal'

const FAQS = [
  {
    q: '정말 무료인가요?',
    a: '네, 완전 무료입니다. 결제 정보도 받지 않아요. 라이언 커리어랩을 알리기 위한 자료입니다.',
  },
  {
    q: '자료는 언제 오나요?',
    a: '신청 즉시 자동 발송됩니다. 1~2분 내에 도착하며, 안 보이면 스팸함을 확인해주세요.',
  },
  {
    q: '이메일로 광고가 오지 않나요?',
    a: '워크북과 격주 커리어 레터만 보내드립니다. 모든 메일 하단에서 클릭 한 번으로 수신거부할 수 있어요.',
  },
]

export default function FinalCta() {
  return (
    <section className="bg-forest py-16 text-cream md:py-24">
      <div className="mx-auto max-w-prose px-5">
        <Reveal>
          <h2 className="text-center text-2xl font-bold leading-snug md:text-4xl">
            지금 시작하지 않으면,
            <br />
            1년 뒤에도 같은 고민을 하고 있을 거예요
          </h2>
          <p className="mt-4 text-center leading-relaxed text-cream/80">
            고민을 끝내는 데 필요한 건 3일, 그리고 이메일 주소 하나입니다.
          </p>
          <div className="mx-auto mt-8 max-w-[520px]">
            <EmailForm variant="dark" ctaLabel="지금 무료로 받기" />
          </div>

          <div className="mt-16 space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-cream/20 bg-white/5 p-5">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">
                  <span className="mr-2 text-amber">Q.</span>
                  {f.q}
                </summary>
                <p className="mt-3 leading-relaxed text-cream/80">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
