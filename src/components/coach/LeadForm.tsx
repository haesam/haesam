import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitLead } from '../../lib/submitLead'

interface LeadFormProps {
  id?: string
  onPrivacyClick: () => void
  compact?: boolean
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LeadForm({ id, onPrivacyClick, compact = false }: LeadFormProps) {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (!EMAIL_RE.test(email)) {
      setErrorMsg('이메일 형식을 확인해 주세요.')
      setStatus('error')
      return
    }
    if (!agreed) {
      setErrorMsg('개인정보 수집·이용에 동의해 주세요.')
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      await submitLead({ email })
      setStatus('success')
    } catch {
      setErrorMsg('전송에 실패했어요. 잠시 후 다시 시도해 주세요.')
      setStatus('error')
    }
  }

  return (
    <div id={id} className="w-full max-w-xl">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="rounded-2xl bg-surface p-8 text-center shadow-card"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15"
            >
              <svg className="h-7 w-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="font-display text-xl font-semibold">신청 완료!</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              입력하신 이메일로 <strong className="text-ink">3일 로드맵 PDF</strong>를 보내드렸어요.
              <br />
              메일이 안 보이면 스팸함을 확인해 주세요.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            noValidate
            className="w-full"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="이메일 주소를 입력하세요"
                aria-label="이메일 주소"
                className="h-14 flex-1 rounded-xl border border-stroke bg-surface px-5 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
              />
              {/* honeypot — 봇 차단용, 사용자에게 보이지 않음 */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="h-14 shrink-0 rounded-xl bg-accent px-8 text-[15px] font-semibold text-white shadow-cta transition-colors hover:bg-accent-deep disabled:opacity-60"
              >
                {status === 'loading' ? '전송 중…' : '무료 로드맵 받기'}
              </motion.button>
            </div>

            <label className="mt-3 flex cursor-pointer items-start gap-2 text-[13px] leading-relaxed text-muted">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (status === 'error') setStatus('idle')
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
              />
              <span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    onPrivacyClick()
                  }}
                  className="underline underline-offset-2 hover:text-ink"
                >
                  개인정보 수집·이용
                </button>
                에 동의합니다. 이메일은 자료 발송과 뉴스레터 발행에만 사용돼요.
              </span>
            </label>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-[13px] font-medium text-accent-deep"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {!compact && (
              <p className="mt-3 text-[12px] text-muted/80">스팸 없음 · 언제든 구독 해지 가능</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
