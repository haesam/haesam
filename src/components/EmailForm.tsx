import { FormEvent, useId, useState } from 'react'

// TODO: 스티비/Formspree 등 실제 폼 백엔드 엔드포인트로 교체
const FORM_ENDPOINT = ''

interface EmailFormProps {
  variant?: 'light' | 'dark'
  ctaLabel?: string
}

export default function EmailForm({ variant = 'light', ctaLabel = '무료 워크북 받기' }: EmailFormProps) {
  const inputId = useId()
  const consentId = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const isDark = variant === 'dark'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('올바른 이메일 주소를 입력해주세요.')
      return
    }
    if (!consent) {
      setError('개인정보 수집·이용에 동의해주셔야 자료를 보내드릴 수 있어요.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      }
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('전송에 실패했어요. 잠시 후 다시 시도해주세요.')
    }
  }

  if (status === 'done') {
    return (
      <div
        className={`rounded-2xl border p-6 text-center ${
          isDark ? 'border-white/20 bg-white/10 text-cream' : 'border-sand bg-white text-ink shadow-card'
        }`}
        role="status"
      >
        <p className="text-lg font-semibold">신청 완료! 🎉</p>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-cream/80' : 'text-stone'}`}>
          <strong>{email}</strong> 으로 워크북을 보내드렸어요.
          <br />
          메일이 안 보이면 스팸함을 확인해주세요.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            이메일 주소
          </label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            className={`h-14 w-full rounded-xl border-2 px-4 text-base outline-none transition-colors sm:h-[52px] ${
              error && !error.includes('동의')
                ? 'border-red-600'
                : isDark
                  ? 'border-transparent bg-white text-ink focus:border-amber'
                  : 'border-sand bg-white text-ink focus:border-sage'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="h-14 shrink-0 rounded-xl bg-amber px-8 text-base font-bold text-ink transition hover:-translate-y-px hover:brightness-95 disabled:opacity-60 sm:h-[52px]"
        >
          {status === 'sending' ? '전송 중…' : ctaLabel}
        </button>
      </div>

      {error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-amber' : 'text-red-600'}`} role="alert">
          {error}
        </p>
      )}

      <label
        htmlFor={consentId}
        className={`mt-3 flex cursor-pointer items-start gap-2 text-[13px] leading-relaxed ${
          isDark ? 'text-cream/70' : 'text-stone'
        }`}
      >
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-amber"
        />
        <span>
          개인정보 수집·이용에 동의합니다. (수집항목: 이메일 / 목적: 자료 발송 및 커리어 뉴스레터 / 보유기간: 수신거부
          시까지)
        </span>
      </label>
    </form>
  )
}
