import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hotspots } from '../data/site'
import SaunaCutaway from './art/SaunaCutaway'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

export default function Anatomy() {
  const [active, setActive] = useState(hotspots[2].id)
  const detail = hotspots.find((h) => h.id === active)
  const index = hotspots.findIndex((h) => h.id === active)

  return (
    <section id="cabin" className="relative scroll-mt-20 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Anatomy</Eyebrow>
            <h2 className="mt-10 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              Most of what you
              <br />
              paid for is
              <em className="font-light italic text-glow"> hidden.</em>
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-sand/75">
              A sauna is a thermal instrument. What it feels like at 90°C is decided
              by the six millimetres of detail you will never see again once the
              lining goes on. Take the drawing apart.
            </p>

            {/* Detail panel */}
            <div className="mt-10 min-h-[290px] border-t border-ash pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11.5px] tracking-[0.24em] text-ember">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">
                      {detail.spec}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-bone">{detail.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-sand/70">
                    {detail.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Index list — the accessible route through the same content */}
              <ul className="mt-9 flex flex-wrap gap-2">
                {hotspots.map((h, i) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => setActive(h.id)}
                      aria-pressed={active === h.id}
                      className={`rounded-full border px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active === h.id
                          ? 'border-ember/70 bg-ember/10 text-glow'
                          : 'border-ash text-stone hover:border-slate hover:text-sand'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')} · {h.short}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-sm border border-ash bg-soot">
              {/* Drawing sheet header */}
              <div className="flex items-center justify-between border-b border-ash px-6 py-3 font-mono text-[11.5px] uppercase tracking-[0.2em] text-stone">
                <span>Stray — section A–A</span>
                <span className="hidden sm:block">Scale 1:20</span>
                <span>Sheet 03</span>
              </div>
              <SaunaCutaway
                active={active}
                onSelect={setActive}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-4 text-[13px] text-stone">
              Select a marker to read the detail
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
