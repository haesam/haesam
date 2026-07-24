import { useEffect, useState } from 'react'
import AppleLogo from './AppleLogo'
import { globalNav } from '../data/nav'

// Apple's translucent global navigation bar. Collapses to a hamburger menu
// on small screens and exposes search + bag icons like the real site.

function SearchIcon() {
  return (
    <svg width="15" height="44" viewBox="0 0 15 44" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.298 27.202l-3.87-3.87a6.916 6.916 0 1 0-1.13 1.13l3.87 3.87a.8.8 0 0 0 1.13-1.13zM3.183 20.184a5.298 5.298 0 1 1 7.492 0 5.31 5.31 0 0 1-7.492 0z"
      />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="15" height="44" viewBox="0 0 15 44" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.3535 16.0283H10.0532V14.9821c0-1.6675-1.3573-3.0247-3.0247-3.0247S3.9993 13.3146 3.9993 14.9821v1.0462H2.6989c-.3454 0-.6255.28-.6255.6255v10.7773c0 .3454.2801.6254.6255.6254h8.6546c.3454 0 .6254-.28.6254-.6254V16.6538c0-.3454-.28-.6255-.6254-.6255zm-6.4557-1.0462c0-1.0637.8657-1.9294 1.9294-1.9294s1.9295.8657 1.9295 1.9294v1.0462H4.8978v-1.0462zm5.8302 11.7975H3.3743v-9.6816h1.2492v1.3763c0 .3282.2661.5943.5943.5943s.5943-.2661.5943-.5943v-1.3763h3.2554v1.3763c0 .3282.2661.5943.5943.5943s.5942-.2661.5942-.5943v-1.3763h1.2494v9.6816z"
      />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="anav-hamburger" aria-hidden="true" data-open={open}>
      <span />
      <span />
    </span>
  )
}

export default function GlobalNav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="anav" aria-label="글로벌">
      <div className="anav-inner">
        <a className="anav-logo" href="https://www.apple.com/kr/" aria-label="Apple 홈페이지">
          <AppleLogo className="anav-logo-svg" />
        </a>

        <button
          className="anav-mobile-toggle"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>

        <ul className="anav-links" data-open={open}>
          {globalNav.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="anav-actions">
          <a className="anav-icon" href="https://www.apple.com/kr/search" aria-label="검색">
            <SearchIcon />
          </a>
          <a className="anav-icon" href="https://www.apple.com/kr/shop/bag" aria-label="장바구니">
            <BagIcon />
          </a>
        </div>
      </div>

      {/* Backdrop for the mobile menu */}
      <div className="anav-backdrop" data-open={open} onClick={() => setOpen(false)} />
    </nav>
  )
}
