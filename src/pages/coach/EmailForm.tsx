import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import gsap from 'gsap'
import checkAnim from './lottie/check.json'

interface EmailFormProps {
  variant?: 'light' | 'dark'
  ctaLabel?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function EmailForm({ variant = 'dark', ctaLabel = '무료 워크북 받기' }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const isDark = variant === 'dark'

  // 마그네틱 버튼 — 데스크톱에서 커서를 살짝 따라온다
  const onBtnMove = (e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn || window.matchMedia('(pointer: coarse)').matches) return
    const r = btn.getBoundingClientRect()
    gsap.to(btn, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.35,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      duration: 0.4,
      ease: 'power3.out',
    })
  }
  const onBtnLeave = () => {
    if (btnRef.current) gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  const shake = () => {
    if (wrapRef.current)
      gsap.fromTo(wrapRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('이메일 주소를 다시 확인해주세요')
      shake()
      return
    }
    if (!agreed) {
      setError('개인정보 수집·이용에 동의해주세요')
      shake()
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <div ref={wrapRef} className="w-full max-w-xl">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-3xl px-6 py-7 text-center backdrop-blur ${
              isDark ? 'bg-white/10 text-[#F6F1E7]' : 'bg-[#14352A]/5 text-[#14352A]'
            }`}
          >
            <div className="mx-auto h-20 w-20">
              <Lottie animationData={checkAnim} loop={false} />
            </div>
            <p className="font-coach-sans text-xl font-bold tracking-[-0.01em]">신청 완료! 메일함을 확인하세요</p>
            <p className={`mt-2 text-sm ${isDark ? 'text-[#F6F1E7]/70' : 'text-[#14352A]/60'}`}>
              1분 안에 워크북이 도착합니다 (프로모션 탭도 확인해주세요)
            </p>
            <p className={`mt-4 text-sm ${isDark ? 'text-[#E4C97E]' : 'text-[#C96F4A]'}`}>
              자료가 도움됐다면, 1:1 무료 진단 세션(20분)도 신청해보세요 →
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="w-full"
            noValidate
          >
            <div
              className={`flex flex-col gap-3 rounded-full p-2 sm:flex-row sm:items-center sm:gap-0 ${
                isDark
                  ? 'bg-white/10 ring-1 ring-white/20 backdrop-blur-md'
                  : 'bg-white ring-1 ring-[#14352A]/15 shadow-lg shadow-[#14352A]/5'
              }`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className={`min-w-0 flex-1 bg-transparent px-5 py-3 text-base outline-none ${
                  isDark
                    ? 'text-[#F6F1E7] placeholder:text-[#F6F1E7]/45'
                    : 'text-[#14352A] placeholder:text-[#14352A]/40'
                }`}
              />
              <div onMouseMove={onBtnMove} onMouseLeave={onBtnLeave} className="shrink-0 p-1">
                <motion.button
                  ref={btnRef}
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full whitespace-nowrap rounded-full bg-[#C96F4A] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[#C96F4A]/30 transition-colors hover:bg-[#B85F3B] sm:w-auto"
                >
                  {ctaLabel}
                </motion.button>
              </div>
            </div>

            <label
              className={`mt-4 flex cursor-pointer items-start justify-center gap-2 text-xs leading-relaxed sm:text-[13px] ${
                isDark ? 'text-[#F6F1E7]/60' : 'text-[#14352A]/55'
              }`}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#C96F4A]"
              />
              <span>
                개인정보 수집·이용에 동의합니다 (수집항목: 이메일 · 목적: 자료 발송 및 뉴스레터 · 보유기간:
                동의 철회 시까지)
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-center text-sm font-medium text-[#E86A4A]"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className={`mt-3 text-center text-xs ${isDark ? 'text-[#F6F1E7]/40' : 'text-[#14352A]/40'}`}>
              스팸 없음 · 언제든 구독 해지 가능 · 자료는 1분 안에 도착
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
