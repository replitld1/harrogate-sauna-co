import { motion, useReducedMotion } from 'framer-motion'
import Cinematic from './ui/Cinematic'

/**
 * A full-viewport shot with the copy hung off the bottom edge.
 * The product carries the frame; the words stay out of its way.
 */
export default function FilmPanel({ id, film, eyebrow, title, emphasis, body, facts = [] }) {
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className="on-media relative flex min-h-[92svh] scroll-mt-20 flex-col justify-end overflow-hidden pb-16 lg:pb-24"
    >
      <Cinematic src={film.src}
        poster={film.poster}
        pan={film.pan}
        duration={film.duration}
        still={film.still} scrim={film.scrim ?? 'base'} opacity={film.opacity ?? 0.68} />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-end gap-10 lg:grid-cols-12"
        >
          <h2 className="text-[clamp(2.6rem,6.4vw,5.2rem)] leading-[0.92] lg:col-span-7">
            {title}
            {emphasis && (
              <>
                {' '}
                {emphasis}
              </>
            )}
          </h2>

          <div className="lg:col-span-5 lg:pb-3">
            {/* The label sits with the supporting column: a kicker stacked
                directly over a headline is the stock arrangement. */}
            <p className="flex items-center gap-4 font-mono text-[11.5px] uppercase tracking-[0.26em] text-glow">
              {eyebrow}
              <span className="h-px w-10 bg-glow/40" aria-hidden="true" />
            </p>
            <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-sand/85">{body}</p>

            {facts.length > 0 && (
              <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5 border-t border-bone/15 pt-6">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-sand/70">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl text-bone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
