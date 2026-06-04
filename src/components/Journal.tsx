import { motion } from 'framer-motion'

const entries = [
  {
    title: 'The Art of Motion Design in Modern UI',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
    readTime: '5 min read',
    date: 'Jan 2026',
  },
  {
    title: 'Building Scalable Design Systems',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    readTime: '8 min read',
    date: 'Dec 2025',
  },
  {
    title: 'Typography in the Age of Variable Fonts',
    img: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=200&q=80',
    readTime: '6 min read',
    date: 'Nov 2025',
  },
  {
    title: 'From Wireframe to World-Class Product',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80',
    readTime: '10 min read',
    date: 'Oct 2025',
  },
]

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary">
              Recent <em className="font-display italic not-italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              Writing about design, code, and the spaces in between.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full border border-stroke px-5 py-2.5 transition-all duration-300 group relative">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-1]" />
            View all <span>→</span>
          </button>
        </motion.div>

        {/* Journal entries */}
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              className="flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <img
                src={entry.img}
                alt={entry.title}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-text-primary/80 transition-colors">
                  {entry.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-xs text-muted hidden sm:block">{entry.readTime}</span>
                <span className="text-xs text-muted">{entry.date}</span>
                <span className="text-muted group-hover:text-text-primary transition-colors">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
