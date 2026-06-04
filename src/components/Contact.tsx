import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { gsap } from 'gsap'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '
const socialLinks = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub']

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  useEffect(() => {
    if (!marqueeRef.current) return
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-12 md:mb-16">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/20 pr-8">
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Get in touch</p>
            <a
              href="mailto:hello@michaelsmith.com"
              className="relative inline-flex items-center group text-2xl md:text-4xl font-display italic text-text-primary hover:text-text-primary/80 transition-colors"
            >
              <span className="absolute inset-[-4px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <span className="relative">hello@michaelsmith.com ↗</span>
            </a>
          </div>

          {/* Footer bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stroke">
            <div className="flex items-center gap-6">
              {socialLinks.map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-muted hover:text-text-primary uppercase tracking-[0.15em] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted">Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
