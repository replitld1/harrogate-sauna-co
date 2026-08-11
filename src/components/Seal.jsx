import { useReducedMotion } from 'framer-motion'
import { seal } from '../data/site'
import Reveal from './ui/Reveal'

const RING_TEXT = 'THE HARROGATE SAUNA CO · BUILT BY HAND AT CRAG LANE · '

/** A struck seal rather than a badge — no gloss, no ribbon, just an engraved
 *  ring that turns slowly. Stops dead under prefers-reduced-motion. */
function SealMark() {
  const reduced = useReducedMotion()

  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44 lg:h-52 lg:w-52" role="img"
      aria-label={`${seal.lines.join(' ')} — ${RING_TEXT.trim()}`}>
      <defs>
        <path
          id="sealRing"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          fill="none"
        />
      </defs>

      {/* Engraved rings */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-slate)" strokeWidth="1" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="var(--color-cedar)" strokeWidth="0.6" opacity="0.6" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--color-slate)" strokeWidth="1" />

      {/* Rotating legend */}
      <g style={reduced ? undefined : { transformOrigin: '100px 100px', animation: 'sealspin 34s linear infinite' }}>
        <text fill="var(--color-stone)" fontSize="9.4" fontFamily="var(--font-mono)" letterSpacing="2.6">
          <textPath href="#sealRing" startOffset="0">
            {RING_TEXT}{RING_TEXT}
          </textPath>
        </text>
      </g>

      {/* Centre */}
      <text x="100" y="93" textAnchor="middle" fill="var(--color-bone)"
        fontSize="21" fontFamily="var(--font-display)">
        {seal.lines[0]}
      </text>
      <text x="100" y="115" textAnchor="middle" fill="var(--color-cedar)"
        fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="2.4">
        {seal.lines[1].toUpperCase()}
      </text>

      {/* Tick marks at the quarters */}
      <g stroke="var(--color-cedar)" strokeWidth="1.2">
        {[0, 90, 180, 270].map((deg) => (
          <line key={deg} x1="100" y1="14" x2="100" y2="21"
            transform={`rotate(${deg} 100 100)`} />
        ))}
      </g>
    </svg>
  )
}

export default function Seal() {
  return (
    <section id="workshop" className="relative border-t border-ash bg-soot py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="shrink-0 text-cedar">
            <SealMark />
          </div>

          <ul className="grid w-full gap-x-12 gap-y-5 sm:grid-cols-2">
            {seal.claims.map((c) => (
              <li key={c} className="flex gap-4 border-b border-ash pb-5 text-[15px] leading-snug text-sand/85">
                <span className="mt-2.5 h-px w-5 shrink-0 bg-cedar" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
