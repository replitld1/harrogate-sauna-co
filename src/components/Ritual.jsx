import { useState } from 'react'
import { motion } from 'framer-motion'
import { ladder } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

/** A temperature dial that fills as you move up the ladder. */
function Dial({ step }) {
  const pct = [0.42, 0.68, 0.94][step]
  const circumference = 2 * Math.PI * 92
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
      <circle cx="110" cy="110" r="92" fill="none" stroke="#241e19" strokeWidth="1.5" />
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2 - Math.PI / 2
        const on = i / 48 <= pct
        return (
          <line
            key={i}
            x1={110 + Math.cos(a) * 78}
            y1={110 + Math.sin(a) * 78}
            x2={110 + Math.cos(a) * (on ? 68 : 72)}
            y2={110 + Math.sin(a) * (on ? 68 : 72)}
            stroke={on ? '#e8622c' : '#3a312a'}
            strokeWidth={on ? 2 : 1}
            style={{ transition: 'all 700ms cubic-bezier(0.16,1,0.3,1)' }}
          />
        )
      })}
      <motion.circle
        cx="110"
        cy="110"
        r="92"
        fill="none"
        stroke="#ffb27a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: circumference * (1 - pct) }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        transform="rotate(-90 110 110)"
        opacity="0.85"
      />
      <circle cx="110" cy="110" r="56" fill="#0a0908" />
      {/* The flicker keyframes drive opacity, so the dimming lives on a wrapper */}
      <g opacity="0.16">
        <circle
          cx="110"
          cy="110"
          r="56"
          fill="#e8622c"
          style={{ animation: 'flicker 5s ease-in-out infinite' }}
        />
      </g>
      <circle cx="110" cy="110" r="56" fill="none" stroke="#3a312a" strokeWidth="1" />
    </svg>
  )
}

export default function Ritual() {
  const [step, setStep] = useState(1)

  return (
    <section id="ritual" className="relative scroll-mt-20 border-t border-ash py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>The ladder</Eyebrow>
            <h2 className="mt-10 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              Heat is a
               sequence,
              <br />
              not a setting.
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-sand/75">
              A good session climbs. The cabin is built to hold each rung steadily —
              no draughts off the floor, no cold shoulder against the glass, and the
              stone mass to give the same löyly on the fourth ladle as the first.
            </p>

            <div className="mt-12 space-y-px">
              {ladder.map((l, i) => (
                <button
                  key={l.temp}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={step === i}
                  className={`block w-full border-l-2 px-6 py-6 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    step === i
                      ? 'border-l-ember bg-bark'
                      : 'border-l-ash hover:border-l-slate hover:bg-soot'
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`font-display text-2xl transition-colors duration-500 ${
                        step === i ? 'text-glow' : 'text-stone'
                      }`}
                    >
                      {l.temp}
                    </span>
                    <span
                      className={`text-[15px] transition-colors duration-500 ${
                        step === i ? 'text-bone' : 'text-sand/70'
                      }`}
                    >
                      {l.name}
                    </span>
                  </div>
                  <motion.p
                    animate={{
                      opacity: step === i ? 1 : 0,
                      height: step === i ? 'auto' : 0,
                    }}
                    initial={false}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden text-[14.5px] leading-relaxed text-sand/65"
                  >
                    <span className="block pt-3">{l.body}</span>
                  </motion.p>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <Dial step={step} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={ladder[step].temp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(3rem,7vw,4.6rem)] leading-none text-bone"
                >
                  {ladder[step].temp}
                </motion.span>
                <span className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.24em] text-stone">
                  Celsius · {ladder[step].name}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
