import { motion, useReducedMotion } from 'framer-motion'
import EmailForm from './EmailForm'

const VIDEO_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_cloud_animation_video.mp4'
const FOREGROUND_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_foreground_bg.png'

export default function Hero() {
  const reduced = useReducedMotion()
  const enter = (y: number, duration: number, delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, ease: 'easeOut' as const, delay },
        }

  return (
    <header className="relative min-h-screen w-full overflow-hidden bg-[#050B14] text-cream">
      {/* 1. 배경 영상 */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* 2. 영상 디밍 오버레이 */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      {/* 3. 포그라운드 이미지 */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[80vh] bg-cover bg-bottom"
        style={{ backgroundImage: `url(${FOREGROUND_URL})` }}
      />
      {/* 4. 하단 비네트 */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-[#02122c] via-[#02122c]/80 to-transparent" />
      {/* 5. 상단 비네트 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #02122cff 0%, #02122cfa 10%, #02122c80 25%, transparent 50%)',
        }}
      />

      {/* 6. UI 콘텐츠 */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-page items-center gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <motion.p
            {...enter(20, 0.6)}
            className="mb-4 inline-block rounded-full border border-cream/30 px-4 py-1.5 text-sm text-cream/90 backdrop-blur-sm"
          >
            성인 진로상담사 라이언의 무료 워크북
          </motion.p>
          <motion.h1 {...enter(30, 0.8, 0.1)} className="text-[32px] font-bold leading-[1.25] md:text-[52px]">
            커리어, 이대로 괜찮을까요?
            <br />
            <span className="text-amber">방향부터</span> 정리하세요.
          </motion.h1>
          <motion.p
            {...enter(20, 0.8, 0.2)}
            className="mt-5 max-w-[480px] text-base leading-relaxed text-cream/80 md:text-lg"
          >
            이직할까, 버틸까, 아예 바꿔볼까 — 고민만 반복된다면 답은 정보가 아니라 정리에 있습니다. 10년차
            진로상담사 라이언이 2,400번의 상담에서 검증한{' '}
            <strong className="text-cream">『커리어 방향을 3일 만에 정리하는 셀프 진단 워크북』</strong>을 무료로
            보내드립니다.
          </motion.p>

          <motion.div {...enter(20, 0.8, 0.3)} className="mt-8 max-w-[520px]">
            <EmailForm variant="dark" />
            <p className="mt-4 text-sm text-cream/60">지금까지 1,283명이 받아갔어요 · 스팸 없이 자료만 보내드려요</p>
          </motion.div>
        </div>

        {/* 워크북 목업 */}
        <motion.div {...enter(20, 0.8, 0.3)} className="hidden justify-center md:flex" aria-hidden="true">
          <div className="w-[280px] -rotate-3 rounded-lg bg-cream p-8 text-ink shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage">Free Workbook</p>
            <p className="mt-6 text-2xl font-bold leading-snug">
              커리어 방향을
              <br />
              3일 만에 정리하는
              <br />
              셀프 진단 워크북
            </p>
            <div className="mt-10 h-px bg-sand" />
            <p className="mt-4 text-sm text-stone">
              라이언 커리어랩
              <br />
              32p · PDF
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
