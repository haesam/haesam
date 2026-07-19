import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CoachHero from './CoachHero'
import CoachSections from './CoachSections'

function MobileCta() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#get"
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed inset-x-4 bottom-4 z-50 rounded-full bg-[#C96F4A] py-4 text-center text-base font-bold text-white shadow-2xl shadow-[#C96F4A]/40 sm:hidden"
        >
          무료 워크북 받기 →
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export default function CoachLanding() {
  useEffect(() => {
    document.title = '인생 방향 점검 워크북 — 무료 나눔 | 코치 유진'
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0B2018] font-coach-sans">
      <CoachHero />
      <CoachSections />
      <MobileCta />
    </div>
  )
}
