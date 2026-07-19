export default function Footer() {
  return (
    <footer className="border-t border-sand bg-cream py-10">
      <div className="mx-auto max-w-page px-5 text-center text-[13px] leading-relaxed text-stone">
        <p className="font-semibold text-ink">라이언 커리어랩</p>
        <p className="mt-2">
          대표 라이언 · hello@ryancareer.lab · 서울시 마포구
          <br />ⓒ 2026 Ryan Career Lab. All rights reserved.
        </p>
        <p className="mt-3">
          <a href="#" className="underline underline-offset-2 hover:text-ink">
            개인정보처리방침
          </a>
        </p>
      </div>
    </footer>
  )
}
