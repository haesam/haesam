import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80', rotate: -3 },
  { img: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80', rotate: 2 },
  { img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80', rotate: -2 },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', rotate: 3 },
  { img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80', rotate: -1 },
  { img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80', rotate: 2 },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      // Parallax columns
      gsap.fromTo(col1Ref.current, { y: 0 }, {
        y: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.fromTo(col2Ref.current, { y: 0 }, {
        y: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-bg" style={{ minHeight: '300vh' }}>
      {/* Pinned center content */}
      <div ref={contentRef} className="relative z-10 h-screen flex items-center justify-center">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary mb-4">
            Visual <em className="font-display italic not-italic">playground</em>
          </h2>
          <p className="text-sm text-muted max-w-xs mx-auto mb-6">
            Experiments in motion, form, and visual language.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary border border-stroke rounded-full px-5 py-2.5 transition-all duration-300"
          >
            View on Dribbble ↗
          </a>
        </motion.div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-start justify-center pt-20">
        <div className="w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-6 pt-[30vh]">
            {items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke pointer-events-auto cursor-pointer"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.img}
                  alt={`Exploration ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-6 pt-[50vh] items-end">
            {items.slice(3, 6).map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke pointer-events-auto cursor-pointer"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.img}
                  alt={`Exploration ${i + 4}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
