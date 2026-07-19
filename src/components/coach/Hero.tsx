import { motion } from 'framer-motion'
import { ArrowRight, Flower2, Leaf } from 'lucide-react'

const VIDEO_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_video_mindfull.mp4'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-900 font-hero">
      {/* 배경 비디오 + 오버레이 스택 */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-black/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col px-6 md:px-12 lg:px-24">
        {/* 네비게이션 */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex w-full items-center justify-center gap-6 py-8 md:gap-16"
        >
          <a href="#" className="hidden text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white sm:block md:text-base">Home</a>
          <a href="#roadmap" className="hidden text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white sm:block md:text-base">Practices</a>
          <div className="mx-2 flex h-14 w-14 items-center justify-center rounded-full border border-white transition-colors hover:bg-white/10 md:mx-6">
            <Flower2 className="h-7 w-7 text-white" strokeWidth={1.2} />
          </div>
          <a href="#coach" className="hidden text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white sm:block md:text-base">Journal</a>
          <a href="#lead-form" className="hidden text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white sm:block md:text-base">Community</a>
        </motion.nav>

        {/* 히어로 콘텐츠 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col justify-center pb-24 pt-10"
        >
          <div className="max-w-2xl">
            <motion.p variants={item} className="mb-6 text-sm font-medium tracking-wide text-brand-gold md:text-base">
              Small Steps. Lasting Change.
            </motion.p>

            <motion.h1 variants={item} className="mb-8 font-hero-serif text-3xl font-normal leading-[1.1] text-white md:text-4xl lg:text-5xl">
              Calm Your Mind,
              <br />
              Transform Your Life.
            </motion.h1>

            <motion.div variants={item} className="mb-8 flex items-center gap-4">
              <Leaf className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
              <div className="h-px w-32 bg-brand-gold/30" />
            </motion.div>

            <motion.p variants={item} className="mb-10 max-w-lg text-lg font-light leading-relaxed text-white/80 md:text-xl">
              Daily practices to reduce stress, build mindfulness, and create a life of balance and purpose.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('lead-form')}
                className="group flex items-center justify-center gap-3 rounded-full bg-brand-teal px-8 py-4 font-medium text-white transition-colors hover:bg-[#47c4c9]"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('roadmap')}
                className="group flex items-center justify-center gap-3 rounded-full border border-white/40 bg-transparent px-8 py-4 font-medium text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Learn More
                <ArrowRight className="h-5 w-5 opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
