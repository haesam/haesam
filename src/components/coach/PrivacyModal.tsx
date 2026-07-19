import { AnimatePresence, motion } from 'framer-motion'

interface PrivacyModalProps {
  open: boolean
  onClose: () => void
}

export default function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-8 shadow-lifted"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="개인정보 수집·이용 안내"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-xl font-bold">개인정보 수집·이용 안내</h3>
              <button onClick={onClose} aria-label="닫기" className="rounded-lg p-1 text-muted hover:bg-bg hover:text-ink">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-5 space-y-4 text-[14px] leading-[1.8] text-muted">
              <div>
                <p className="font-semibold text-ink">1. 수집 항목</p>
                <p>이메일 주소 (이름은 선택 입력 시)</p>
              </div>
              <div>
                <p className="font-semibold text-ink">2. 수집 목적</p>
                <p>신청하신 무료 자료(3일 퍼스널브랜딩 로드맵 PDF) 발송 및 뉴스레터 발행</p>
              </div>
              <div>
                <p className="font-semibold text-ink">3. 보유 및 이용 기간</p>
                <p>구독 해지 또는 삭제 요청 시까지 보유하며, 요청 시 지체 없이 파기합니다.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">4. 제3자 제공</p>
                <p>수집된 개인정보는 제3자에게 제공하지 않습니다. 다만 이메일 발송을 위해 발송 대행 서비스(스티비)에 처리를 위탁합니다.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">5. 동의 거부 권리</p>
                <p>동의를 거부할 수 있으며, 이 경우 자료 발송이 제한됩니다.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-7 h-12 w-full rounded-xl bg-ink text-[14px] font-semibold text-bg transition-colors hover:bg-ink/85"
            >
              확인했어요
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
