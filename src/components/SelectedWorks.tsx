import { motion } from 'framer-motion'

const projects = [
  { title: 'Automotive Motion', span: 7, img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' },
  { title: 'Urban Architecture', span: 5, img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { title: 'Human Perspective', span: 5, img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80' },
  { title: 'Brand Identity', span: 7, img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary">
              Featured <em className="font-display italic not-italic">projects</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full border border-stroke px-5 py-2.5 transition-all duration-300 group relative">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-1]" />
            View all work <span>→</span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={`md:col-span-${project.span} group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
              style={{ aspectRatio: project.span === 7 ? '7/5' : '5/6' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Background image */}
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg" />

              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative px-5 py-2.5 rounded-full bg-white/95 text-bg text-sm font-medium">
                  <span className="absolute inset-[-2px] rounded-full accent-gradient animate-gradient-shift opacity-70" />
                  <span className="relative">
                    View — <em className="font-display italic">{project.title}</em>
                  </span>
                </div>
              </div>

              {/* Bottom title */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-text-primary/0 group-hover:text-text-primary/0 text-sm font-medium">{project.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
