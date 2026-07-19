import EmailForm from './EmailForm'

export default function Hero() {
  return (
    <header className="bg-forest text-cream">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:items-center md:py-24">
        <div>
          <p className="mb-4 inline-block rounded-full border border-cream/30 px-4 py-1.5 text-sm text-cream/90">
            성인 진로상담사 라이언의 무료 워크북
          </p>
          <h1 className="text-[32px] font-bold leading-[1.25] md:text-[52px]">
            커리어, 이대로 괜찮을까요?
            <br />
            <span className="text-amber">방향부터</span> 정리하세요.
          </h1>
          <p className="mt-5 max-w-[480px] text-base leading-relaxed text-cream/80 md:text-lg">
            이직할까, 버틸까, 아예 바꿔볼까 — 고민만 반복된다면 답은 정보가 아니라 정리에 있습니다. 10년차
            진로상담사 라이언이 2,400번의 상담에서 검증한{' '}
            <strong className="text-cream">『커리어 방향을 3일 만에 정리하는 셀프 진단 워크북』</strong>을 무료로
            보내드립니다.
          </p>

          <div className="mt-8 max-w-[520px]">
            <EmailForm variant="dark" />
          </div>

          <p className="mt-4 text-sm text-cream/60">지금까지 1,283명이 받아갔어요 · 스팸 없이 자료만 보내드려요</p>
        </div>

        {/* 워크북 목업 */}
        <div className="hidden justify-center md:flex" aria-hidden="true">
          <div className="w-[280px] -rotate-3 rounded-lg bg-cream p-8 text-ink shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage">Free Workbook</p>
            <p className="mt-6 text-2xl font-bold leading-snug">
              커리어 방향을
              <br />
              3일 만에 정리하는
              <br />
              셀프 진단 워크북
            </p>
            <div className="mt-10 h-px bg-sand" />
            <p className="mt-4 text-sm text-stone">
              라이언 커리어랩
              <br />
              32p · PDF
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
