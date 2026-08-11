import { useEffect, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { tech } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

/* ------------------------------------------------------------------ *
 * The commute, drawn.
 *
 * A quadratic bezier from "work" to "home". The geofence is a ring
 * around home; the moment the dot crosses it the heater lights and the
 * cabin climbs from ambient to 90°C. Everything below is sampled off a
 * single 0→1 progress value so the dot, the ring and the temperature
 * can never disagree with each other.
 * ------------------------------------------------------------------ */

/* Two compositions of the same journey.
 *
 * Landscape squeezed into a phone column rendered 900x460 at 325px wide — the
 * lettering came out around 4px and the whole thing read as a smudge. Portrait
 * is a genuine re-layout, not a scale: the commute runs down the screen, the
 * readout sits above it, and every type size is set against the smaller
 * viewBox so it lands at a real reading size.
 */
const LAYOUTS = {
  landscape: {
    vb: '0 0 900 460',
    home: { x: 640, y: 296 },
    r: 186,
    p0: { x: 62, y: 132 },
    p1: { x: 330, y: 100 },
    grid: { cols: 17, rows: 9, gap: 53, gapY: 52 },
    font: { label: 12, small: 11, big: 30, tick: 12 },
    readout: { x: 700, y: 40, w: 168, h: 74 },
    cabin: 26,
  },
  portrait: {
    vb: '0 0 420 620',
    home: { x: 232, y: 430 },
    r: 150,
    p0: { x: 58, y: 96 },
    p1: { x: 92, y: 268 },
    grid: { cols: 9, rows: 13, gap: 48, gapY: 48 },
    font: { label: 15, small: 13, big: 36, tick: 15 },
    readout: { x: 214, y: 36, w: 186, h: 84 },
    cabin: 30,
  },
}

const curve = (L) => (t) => ({
  x: (1 - t) ** 2 * L.p0.x + 2 * (1 - t) * t * L.p1.x + t ** 2 * L.home.x,
  y: (1 - t) ** 2 * L.p0.y + 2 * (1 - t) * t * L.p1.y + t ** 2 * L.home.y,
})

// Where the route first enters the fence — found once per layout, by walking it.
const crossing = (L) => {
  const at = curve(L)
  for (let i = 0; i <= 200; i++) {
    const t = i / 200
    const p = at(t)
    if (Math.hypot(p.x - L.home.x, p.y - L.home.y) <= L.r) return t
  }
  return 0.6
}

const AMBIENT = 14
const TARGET = 90

export function GeofenceDiagram() {
  const reduced = useReducedMotion()
  const progress = useMotionValue(reduced ? 0.86 : 0)
  const [t, setT] = useState(reduced ? 0.86 : 0)
  const [portrait, setPortrait] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setPortrait(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const L = portrait ? LAYOUTS.portrait : LAYOUTS.landscape
  const at = curve(L)
  const CROSS = crossing(L)
  const HOME = L.home
  const FENCE_R = L.r
  const P0 = L.p0
  const P1 = L.p1

  useMotionValueEvent(progress, 'change', setT)

  useEffect(() => {
    if (reduced) return
    const controls = animate(progress, 1, {
      duration: 9,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 0.8,
    })
    return () => controls.stop()
  }, [progress, reduced])

  const pos = at(t)
  const armed = t >= CROSS
  // Heat ramps over the stretch of journey left after the crossing.
  const heat = armed ? Math.min(1, (t - CROSS) / (1 - CROSS)) : 0
  const temp = Math.round(AMBIENT + (TARGET - AMBIENT) * heat)

  return (
    <figure className="relative overflow-hidden border border-ash bg-soot">
      {/* Drawing-sheet header, same language as the cutaway */}
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-ash bg-bark px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
        <span>Geofence — approach</span>
        <span className={armed ? 'text-ember' : 'text-stone'}>
          {armed ? 'Heater on' : 'Standby'}
        </span>
      </figcaption>

      <svg viewBox={L.vb} className="block w-full" role="img"
        aria-label={`A map showing a route home crossing a geofence boundary, after which the sauna heats to ${TARGET} degrees`}>
        <defs>
          <radialGradient id="fenceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="var(--color-ember)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity="0.14" />
          </radialGradient>
        </defs>

        {/* Faint survey grid */}
        <g stroke="var(--color-ash)" strokeWidth="1">
          {Array.from({ length: L.grid.rows }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * L.grid.gapY + 26} x2="100%" y2={i * L.grid.gapY + 26} />
          ))}
          {Array.from({ length: L.grid.cols }, (_, i) => (
            <line key={`v${i}`} x1={i * L.grid.gap + 26} y1="0" x2={i * L.grid.gap + 26} y2="100%" />
          ))}
        </g>

        {/* Geofence */}
        <circle cx={HOME.x} cy={HOME.y} r={FENCE_R} fill="url(#fenceGlow)" />
        <circle
          cx={HOME.x}
          cy={HOME.y}
          r={FENCE_R}
          fill="none"
          stroke={armed ? 'var(--color-ember)' : 'var(--color-slate)'}
          strokeWidth="1.4"
          strokeDasharray="7 9"
          style={{ transition: 'stroke 600ms ease' }}
        />
        <text
          x={portrait ? HOME.x : HOME.x - FENCE_R + 10}
          y={HOME.y - FENCE_R - (portrait ? 14 : -4)}
          textAnchor={portrait ? 'middle' : 'start'}
          fill="var(--color-stone)"
          fontSize={L.font.label}
          fontFamily="var(--font-mono)"
          letterSpacing="1.4"
        >
          GEOFENCE · 3 KM
        </text>

        {/* Route */}
        <path
          d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${HOME.x} ${HOME.y}`}
          fill="none"
          stroke="var(--color-slate)"
          strokeWidth="1.6"
          strokeDasharray="3 7"
        />

        {/* Start */}
        <circle cx={P0.x} cy={P0.y} r="4.5" fill="var(--color-stone)" />
        <text x={P0.x + 14} y={P0.y + 5} fill="var(--color-stone)" fontSize={L.font.label}
          fontFamily="var(--font-mono)" letterSpacing="1.2">
          WORK, 17:40
        </text>

        {/* The cabin at home */}
        <g transform={`translate(${HOME.x} ${HOME.y})`}>
          <rect x={-L.cabin} y={-L.cabin * 0.85} width={L.cabin * 2} height={L.cabin * 1.7} rx="2"
            fill="var(--color-bark)" stroke="var(--color-slate)" strokeWidth="1.4" />
          <rect x={-L.cabin} y={-L.cabin * 0.85} width={L.cabin * 2} height={L.cabin * 1.7} rx="2"
            fill="var(--color-ember)" style={{ opacity: heat * 0.55, transition: 'opacity 400ms linear' }} />
          <path d={`M${-L.cabin - 4} ${-L.cabin * 0.85} L0 ${-L.cabin * 1.55} L${L.cabin + 4} ${-L.cabin * 0.85}`}
            fill="none" stroke="var(--color-slate)" strokeWidth="1.4" strokeLinejoin="round" />
          <text x="0" y={L.cabin * 1.7 + 14} textAnchor="middle" fill="var(--color-stone)"
            fontSize={L.font.label} fontFamily="var(--font-mono)" letterSpacing="1.4">
            HOME
          </text>
        </g>

        {/* Crossing marker */}
        {(() => {
          const c = at(CROSS)
          return (
            <g>
              <circle cx={c.x} cy={c.y} r="5" fill="none"
                stroke={armed ? 'var(--color-ember)' : 'var(--color-slate)'} strokeWidth="1.5"
                style={{ transition: 'stroke 600ms ease' }} />
              {/* Label sits below the route with a short leader, so the moving
                  dot never runs through the lettering. */}
              <line x1={c.x} y1={c.y + 7} x2={c.x} y2={c.y + 26}
                stroke={armed ? 'var(--color-ember)' : 'var(--color-slate)'} strokeWidth="1"
                style={{ transition: 'stroke 600ms ease' }} />
              <text x={c.x} y={c.y + 42} textAnchor="middle" fill={armed ? 'var(--color-glow)' : 'var(--color-stone)'}
                fontSize={L.font.label} fontFamily="var(--font-mono)" letterSpacing="1.2"
                style={{ transition: 'fill 600ms ease' }}>
                TRIGGER
              </text>
            </g>
          )
        })()}

        {/* You */}
        <g transform={`translate(${pos.x} ${pos.y})`}>
          <circle r={portrait ? 16 : 13} fill="var(--color-ember)" opacity="0.18" />
          <circle r={portrait ? 7 : 5.5} fill="var(--color-glow)" />
        </g>

        {/* Readout */}
        <g transform={`translate(${L.readout.x} ${L.readout.y})`}>
          <rect width={L.readout.w} height={L.readout.h} rx="2" fill="var(--color-ink)"
            stroke="var(--color-ash)" strokeWidth="1" />
          <text x="14" y={L.font.small + 13} fill="var(--color-stone)" fontSize={L.font.small}
            fontFamily="var(--font-mono)" letterSpacing="1.6">
            CABIN
          </text>
          <text x="14" y={L.readout.h - 16} fill={armed ? 'var(--color-glow)' : 'var(--color-sand)'}
            fontSize={L.font.big} fontFamily="var(--font-display)"
            style={{ transition: 'fill 600ms ease' }}>
            {temp}°C
          </text>
          <text x={L.readout.w - 14} y={L.readout.h - 16} textAnchor="end" fill="var(--color-stone)"
            fontSize={L.font.small} fontFamily="var(--font-mono)" letterSpacing="1.2">
            {armed ? `${Math.round(heat * 100)}%` : 'IDLE'}
          </text>
        </g>
      </svg>
    </figure>
  )
}

export default function Tech() {
  return (
    <section
      id="technology"
      className="relative scroll-mt-20 border-t border-ash bg-ink py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="max-w-2xl">
          <Eyebrow>{tech.eyebrow}</Eyebrow>
          <h2 className="mt-10 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
            {tech.title}
            <em className="font-light italic text-glow"> {tech.emphasis}</em>
          </h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-sand/75">{tech.body}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <GeofenceDiagram />
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {tech.features.map((f, i) => (
            <Reveal key={f.id} delay={0.06 * i}>
              <div className="border-t border-ash pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.2rem] leading-snug text-bone">
                    {f.title}
                  </h3>
                </div>
                <p className="mt-3.5 text-[14px] leading-relaxed text-sand/70">{f.body}</p>
                <span className="mt-5 inline-block font-mono text-[11.5px] uppercase tracking-[0.16em] text-cedar">
                  {f.spec}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

