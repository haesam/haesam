import { footerColumns, footerLegalLinks } from '../data/nav'

// Apple's dense footer: a small-print disclaimer block, a multi-column link
// directory (rendered as accordions on mobile), then the legal bar.

export default function Footer() {
  const year = 2026

  return (
    <footer className="afoot" aria-label="Apple 푸터">
      <div className="afoot-inner">
        <section className="afoot-legal-notes">
          <p>
            일부 기능은 일부 지역 또는 일부 언어에서 제공되지 않을 수 있습니다. 기능 및 가격은 변경될
            수 있습니다.
          </p>
          <p>
            Apple Store에서 판매되는 제품의 사용 가능 여부, 가격 및 구입 조건은 예고 없이 변경될 수
            있습니다.
          </p>
        </section>

        <hr className="afoot-rule" />

        <div className="afoot-columns">
          {footerColumns.map((col) => (
            <nav className="afoot-col" key={col.title} aria-label={col.title}>
              <h4 className="afoot-col-title">{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="afoot-rule" />

        <p className="afoot-more">
          Apple 제품 구입 방법에 대해 더 알고 싶으세요?{' '}
          <a href="https://www.apple.com/kr/retail/">Apple Store를 방문</a>하시거나{' '}
          <a href="tel:080-333-4000">080-333-4000</a>으로 전화하세요.
        </p>

        <div className="afoot-bottom">
          <p className="afoot-copyright">
            Copyright © {year} Apple Inc. 모든 권리 보유.
          </p>
          <ul className="afoot-legal-links">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className="afoot-region">대한민국</p>
        </div>
      </div>
    </footer>
  )
}
