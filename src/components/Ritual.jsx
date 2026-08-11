import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  cabinVolumes,
  heaterFor,
  ladder,
  requiredKw,
  thermostat,
  timeToTemp,
} from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

/* The dial sweeps 270°, leaving a gap at the foot where a real thermostat has
   its stop. Angles are measured from twelve o'clock, clockwise. */
const SWEEP = 270
const START = -135
const CX = 110
const CY = 110

const toAngle = (t) => START + t * SWEEP
const pointOn = (angleDeg, r) => {
  const a = (angleDeg * Math.PI) / 180
  return { x: CX + Math.sin(a) * r, y: CY - Math.cos(a) * r }
}

export default function Ritual() {
  const { min, max, start } = thermostat
  const [temp, setTemp] = useState(start)
  const [cabin, setCabin] = useState(cabinVolumes[1])
  const [dragging, setDragging] = useState(false)
  // The move handler must see the live value, not the one captured in the
  // render that ran before setDragging landed — otherwise the first move of a
  // fast drag is dropped.
  const draggingRef = useRef(false)
  const svgRef = useRef(null)

  const t = (temp - min) / (max - min)
  const kw = requiredKw(cabin.m3, temp)
  const heater = heaterFor(kw)
  const mins = timeToTemp(cabin.m3, temp, Number.isFinite(heater.maxKw) ? heater.maxKw : kw)

  // Pointer anywhere on the face maps to the angle under it.
  const setFromPointer = useCallback(
    (e) => {
      const svg = svgRef.current
      if (!svg) return
      const r = svg.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * 220
      const py = ((e.clientY - r.top) / r.height) * 220
      let deg = (Math.atan2(px - CX, CY - py) * 180) / Math.PI
      // Below the stop, snap to whichever end is nearer rather than jumping.
      if (deg < START) deg = deg < -180 + (START + 180) / 2 ? START + SWEEP : START
      if (deg > START + SWEEP) deg = START + SWEEP
      const next = min + ((deg - START) / SWEEP) * (max - min)
      setTemp(Math.round(Math.min(max, Math.max(min, next))))
    },
    [min, max],
  )

  const onKeyDown = (e) => {
    const step = e.shiftKey || e.key.startsWith('Page') ? 5 : 1
    const map = {
      ArrowUp: step, ArrowRight: step, PageUp: step,
      ArrowDown: -step, ArrowLeft: -step, PageDown: -step,
    }
    if (e.key === 'Home') return (e.preventDefault(), setTemp(min))
    if (e.key === 'End') return (e.preventDefault(), setTemp(max))
    if (map[e.key] === undefined) return
    e.preventDefault()
    setTemp((v) => Math.min(max, Math.max(min, v + map[e.key])))
  }

  const knob = pointOn(toAngle(t), 78)

  return (
    <section id="ritual" className="relative scroll-mt-20 border-t border-ash py-24 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Sizing</Eyebrow>
            <h2 className="mt-8 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] lg:mt-10">
              {thermostat.title}
              <br />
              {thermostat.emphasis}
            </h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-sand/75">{thermostat.body}</p>

            {/* Cabin picker */}
            <fieldset className="mt-10">
              <legend className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-cedar">
                Your cabin
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {cabinVolumes.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCabin(c)}
                    aria-pressed={cabin.id === c.id}
                    className={`min-h-[44px] rounded-full border px-5 text-[14px] transition-colors duration-500 ${
                      cabin.id === c.id
                        ? 'border-ember bg-ember/10 text-glow'
                        : 'border-slate text-sand hover:border-stone hover:text-bone'
                    }`}
                  >
                    {c.name}
                    <span className="ml-2 font-mono text-[11.5px] text-stone">{c.m3} m³</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 font-mono text-[11.5px] tracking-wide text-stone">{cabin.dims}</p>
            </fieldset>

            {/* Result */}
            <div className="mt-10 border-t border-ash pt-8">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-stone">
                We would fit
              </p>
              <motion.p
                key={heater.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight text-bone"
              >
                {heater.name}
              </motion.p>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-sand/70">
                {heater.note}
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {[
                  ['Needs', `${kw} kW`],
                  ['To temp', `${mins} min`],
                  ['Supply', heater.supply],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-[14px] leading-snug text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[13px] leading-relaxed text-stone">{thermostat.note}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px]">
              <svg
                ref={svgRef}
                viewBox="0 0 220 220"
                className={`h-full w-full touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                role="slider"
                tabIndex={0}
                aria-label="Target temperature"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={temp}
                aria-valuetext={`${temp} degrees Celsius — we would fit the ${heater.name}`}
                onKeyDown={onKeyDown}
                onPointerDown={(e) => {
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId)
                  } catch {
                    /* capture is a nicety; dragging still works without it */
                  }
                  draggingRef.current = true
                  setDragging(true)
                  setFromPointer(e)
                }}
                onPointerMove={(e) => draggingRef.current && setFromPointer(e)}
                onPointerUp={(e) => {
                  try {
                    e.currentTarget.releasePointerCapture(e.pointerId)
                  } catch {
                    /* nothing captured */
                  }
                  draggingRef.current = false
                  setDragging(false)
                }}
                onPointerCancel={() => {
                  draggingRef.current = false
                  setDragging(false)
                }}
              >
                {/* Track */}
                <circle cx={CX} cy={CY} r="92" fill="none" stroke="#241e19" strokeWidth="1.5" />

                {/* Graduations. Lit up to the current value. */}
                {Array.from({ length: 55 }, (_, i) => {
                  const f = i / 54
                  const a = toAngle(f)
                  const on = f <= t
                  const p1 = pointOn(a, 78)
                  const p2 = pointOn(a, on ? 66 : 71)
                  return (
                    <line
                      key={i}
                      x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                      stroke={on ? '#e8622c' : '#3a312a'}
                      strokeWidth={on ? 2 : 1}
                      style={{ transition: 'all 320ms cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  )
                })}

                {/* The three rungs from the ladder, marked on the face */}
                {ladder.map((l) => {
                  const v = parseInt(l.temp, 10)
                  const a = toAngle((v - min) / (max - min))
                  const p = pointOn(a, 99)
                  return (
                    <text
                      key={l.temp}
                      x={p.x} y={p.y + 3}
                      textAnchor="middle"
                      fontSize="8"
                      fontFamily="var(--font-mono)"
                      fill={Math.abs(v - temp) < 3 ? '#ffb27a' : '#8c8178'}
                      style={{ transition: 'fill 400ms ease' }}
                    >
                      {l.temp}
                    </text>
                  )
                })}

                {/* Face */}
                <circle cx={CX} cy={CY} r="56" fill="#0a0908" />
                <g opacity={0.1 + t * 0.22}>
                  <circle
                    cx={CX} cy={CY} r="56" fill="#e8622c"
                    style={{ animation: 'flicker 5s ease-in-out infinite' }}
                  />
                </g>
                <circle cx={CX} cy={CY} r="56" fill="none" stroke="#3a312a" strokeWidth="1" />

                {/* Knob */}
                <line
                  x1={pointOn(toAngle(t), 60).x} y1={pointOn(toAngle(t), 60).y}
                  x2={knob.x} y2={knob.y}
                  stroke="#ffb27a" strokeWidth="2" strokeLinecap="round"
                />
                <circle cx={knob.x} cy={knob.y} r={dragging ? 8 : 6.5} fill="#ffb27a"
                  style={{ transition: 'r 200ms ease' }} />
                <circle cx={knob.x} cy={knob.y} r="14" fill="#e8622c" opacity="0.16" />
              </svg>

              {/* Readout */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[clamp(2.6rem,7vw,4.2rem)] leading-none text-bone">
                  {temp}°
                </span>
                <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-stone sm:text-[11.5px]">
                  Celsius
                </span>
                <span className="mt-4 max-w-[10rem] text-center text-[12.5px] leading-tight text-glow">
                  {Number.isFinite(heater.maxKw) ? heater.name : 'Wood-fired'}
                </span>
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-stone lg:mt-8">
              Drag the dial · or use the arrow keys
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
