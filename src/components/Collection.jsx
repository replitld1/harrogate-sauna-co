import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { models } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

/**
 * A plan view of each cabin, to scale against one another —
 * walls, benches, heater, and a dimension line along the bottom.
 */
const plans = {
  stray: { x: 30, w: 40, benches: [[36, 22, 4, 32]], heater: [62, 46, 6, 6], door: 'right' },
  nidd: { x: 18, w: 64, benches: [[24, 22, 4, 32], [70, 22, 4, 32]], heater: [50, 46, 7, 7], door: 'right' },
  fountains: {
    x: 8,
    w: 84,
    benches: [[14, 22, 4, 32], [80, 22, 4, 32], [20, 18, 58, 4]],
    heater: [46, 46, 8, 8],
    door: 'right',
  },
}

function PlanMark({ id }) {
  const p = plans[id]
  return (
    <svg viewBox="0 0 100 76" className="h-16 w-auto" aria-hidden="true">
      {/* Walls */}
      <rect
        x={p.x}
        y="14"
        width={p.w}
        height="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Benches */}
      <g fill="currentColor" opacity="0.45">
        {p.benches.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1" />
        ))}
      </g>
      {/* Heater */}
      <rect
        x={p.heater[0]}
        y={p.heater[1]}
        width={p.heater[2]}
        height={p.heater[3]}
        fill="currentColor"
      />
      {/* Door swing */}
      <path
        d={`M${p.x + p.w} 50 a12 12 0 0 0 -12 -12`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.5"
      />
      {/* Dimension line */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.35">
        <line x1={p.x} y1="68" x2={p.x + p.w} y2="68" />
        <line x1={p.x} y1="64" x2={p.x} y2="72" />
        <line x1={p.x + p.w} y1="64" x2={p.x + p.w} y2="72" />
      </g>
    </svg>
  )
}

export default function Collection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="collection"
      className="relative scroll-mt-20 overflow-hidden border-t border-ash py-28 lg:py-40"
    >

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Three cabins</Eyebrow>
            <h2 className="mt-10 max-w-[16ch] text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              Every one of them the same build.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-sand/70">
            The difference between the three is length and heat, not quality. The
            timber, the envelope and the joinery are identical in the smallest cabin
            and the largest.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px bg-ash lg:grid-cols-3">
          {models.map((m, i) => (
            <motion.article
              key={m.id}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col justify-between overflow-hidden p-8 transition-colors duration-700 lg:p-10 ${
                m.featured ? 'bg-soot' : 'bg-ink hover:bg-soot'
              }`}
            >
              {m.featured && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent"
                  />
                  <span className="absolute right-8 top-9 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.2em] text-ember lg:right-10 lg:top-11">
                    <span className="h-1 w-1 rounded-full bg-ember" aria-hidden="true" />
                    Most requested
                  </span>
                </>
              )}

              <div className="relative">
                {/* The plate answers "what is it"; the plan answers "how big".
                    Both, in that order — nobody commits £29,000 to a wireframe. */}
                <div className="relative -mx-8 -mt-8 mb-8 aspect-[4/3] overflow-hidden lg:-mx-10 lg:-mt-10">
                  {/* The plates breathe too. A phone has no hover, so a
                      hover-only scale left three of the biggest images on the
                      page completely inert — each one now drifts on its own
                      offset so they never move in lockstep. */}
                  <img
                    src={m.image}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    width="1600"
                    height="1194"
                    className="h-full w-full object-cover will-change-transform motion-reduce:animate-none"
                    style={{
                      animation: `cinepan ${46 + i * 5}s cubic-bezier(0.37,0,0.63,1) infinite alternate`,
                      animationDelay: `${i * -6}s`,
                      ['--pan-from']: 'scale(1.03)',
                      ['--pan-to']: 'scale(1.11) translate3d(-1%,-1%,0)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                  />
                </div>
                <div className="text-cedar transition-colors duration-700 group-hover:text-glow">
                  <PlanMark id={m.id} />
                </div>
                <h3 className="mt-5 font-display text-[2rem] leading-none text-bone">
                  {m.name}
                </h3>
                <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-sand/70">
                  {m.note}
                </p>

                <ul className="mt-7 space-y-2.5">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.13em] text-stone"
                    >
                      <span className="h-px w-4 bg-slate" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10 border-t border-ash pt-6">
                <dl className="flex items-end justify-between gap-4">
                  <div>
                    <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">
                      {m.seats} · {m.footprint}
                    </dt>
                    <dd className="mt-2 font-display text-2xl text-bone">{m.price}</dd>
                  </div>
                  <a
                    href="#reserve"
                    className="flex min-h-[44px] items-center gap-2 text-[13.5px] text-sand transition-colors duration-300 hover:text-glow"
                  >
                    Book walk-round
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only">for the {m.name}</span>
                  </a>
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
