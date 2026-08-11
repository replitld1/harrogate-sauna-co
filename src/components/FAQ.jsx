import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="questions" className="relative scroll-mt-20 border-t border-ash py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-10 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              Asked
               honestly.
            </h2>
            <p className="mt-5 max-w-[34ch] leading-relaxed text-sand/70">
              If yours is not here, ring the workshop. You will get a joiner, not a
              call centre.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="border-t border-ash">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <Reveal as="li" key={f.q} delay={i * 0.05} className="border-b border-ash">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        className="group flex w-full items-center justify-between gap-8 py-7 text-left"
                      >
                        <span
                          className={`font-display text-[clamp(1.1rem,2vw,1.4rem)] transition-colors duration-500 ${
                            isOpen ? 'text-glow' : 'text-bone group-hover:text-sand'
                          }`}
                        >
                          {f.q}
                        </span>
                        <Plus
                          size={18}
                          strokeWidth={1.2}
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen
                              ? 'rotate-[135deg] text-ember'
                              : 'text-stone group-hover:rotate-90'
                          }`}
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-button-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-8 pr-10 text-[15px] leading-relaxed text-sand/70">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
