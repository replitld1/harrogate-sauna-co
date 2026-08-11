import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { brand, cta, film, heroStats, year } from '../data/site'
import Button from './ui/Button'
import Cinematic from './ui/Cinematic'

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-14%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0])

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden">
      <Cinematic
        src={film.hero.src}
        poster={film.hero.poster}
        scrim={film.hero.scrim}
        opacity={film.hero.opacity}
        eager
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-14 pt-28 lg:justify-center lg:px-12 lg:pt-24 lg:pb-28"
      >
        <div className="max-w-[660px]">
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.26em] text-glow">
              {brand.place} — ten a year
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-[clamp(3rem,7.6vw,6.4rem)] leading-[0.92]"
          >
            The quiet at the
            <br />
            end of the
            <em className="font-light italic text-glow"> garden.</em>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-sand/85"
          >
            We build ten western red cedar saunas a year, by hand, at Crag Lane in
            Harrogate. Joiners with thirty and forty years on the tools, timber kiln
            dried before it is cut, and a cabin that is already at temperature when
            you pull onto the drive.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#reserve" variant="ember" arrow>
              {cta.label}
            </Button>
            <Button href="#interior" variant="ghost">
              Look inside the cabin
            </Button>
          </motion.div>

          <motion.dl
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-bone/15 pt-6 sm:gap-8 lg:mt-14 lg:pt-8"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[1.6rem] leading-none text-bone sm:text-3xl">{s.value}</span>
                  <span className="mt-2 block font-mono text-[10.5px] uppercase leading-tight tracking-[0.12em] text-sand/75 sm:text-[11.5px] sm:tracking-[0.16em]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-6 hidden items-end justify-between px-12 lg:flex"
      >
        <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-sand/70">
          Scroll
          <span className="ml-3 inline-block h-px w-14 translate-y-[-4px] bg-bone/30 align-middle" />
        </span>
        <span className="text-[12.5px] text-sand/70">
          From {brand.from} · 16 weeks from deposit · {year.remaining} slots left in{' '}
          {year.current}
        </span>
      </motion.div>
    </section>
  )
}
