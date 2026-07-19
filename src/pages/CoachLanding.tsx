import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from '../components/coach/Hero'
import Roadmap from '../components/coach/Roadmap'
import AboutCoach from '../components/coach/AboutCoach'
import FinalCta from '../components/coach/FinalCta'
import PrivacyModal from '../components/coach/PrivacyModal'

export default function CoachLanding() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useEffect(() => {
    document.body.style.overflow = privacyOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [privacyOpen])

  const openPrivacy = () => setPrivacyOpen(true)

  return (
    <div className="min-h-screen bg-bg">
      {/* 스크롤 진행 바 */}
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <main>
        <Hero />
        <Roadmap />
        <AboutCoach />
        <FinalCta onPrivacyClick={openPrivacy} />
      </main>

      <footer className="border-t border-stroke py-10">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center gap-3 px-6 text-center">
          <p className="font-display text-[15px] font-bold">유미 코치 · YUMI</p>
          <p className="text-[13px] text-muted">
            문의 <a href="mailto:hello@yumicoach.kr" className="underline underline-offset-2 hover:text-ink">hello@yumicoach.kr</a>
          </p>
          <button
            onClick={openPrivacy}
            className="text-[13px] text-muted underline underline-offset-2 hover:text-ink"
          >
            개인정보처리방침
          </button>
          <p className="mt-2 text-[12px] text-muted/70">© 2026 YUMI. All rights reserved.</p>
        </div>
      </footer>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  )
}
