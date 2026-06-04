import { useState, useEffect } from 'react'

const navLinks = ['Home', 'Work', 'Resume']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <button
          className="w-9 h-9 rounded-full relative group overflow-hidden flex-shrink-0"
          onClick={() => setActive('Home')}
        >
          {/* Gradient border ring */}
          <span className="absolute inset-0 rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
          {/* Inner bg circle */}
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </span>
        </button>

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-2 hidden sm:block" />

        {/* Nav links */}
        {navLinks.map(link => (
          <button
            key={link}
            onClick={() => setActive(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              active === link
                ? 'text-text-primary bg-stroke/50'
                : 'text-muted hover:text-text-primary hover:bg-stroke/50'
            }`}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-2 hidden sm:block" />

        {/* Say hi button */}
        <button className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 bg-surface/80 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1">
            Say hi <span className="text-[10px]">↗</span>
          </span>
        </button>
      </div>
    </nav>
  )
}
