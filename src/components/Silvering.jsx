import { silvering } from '../data/site'
import Reveal from './ui/Reveal'

/**
 * The material, on a timeline.
 *
 * Cedar is the product, so the page ought to contain some. This is the one
 * place the surfaces are made of timber rather than neutral dark: a real
 * gradient sampled from fresh-sawn through to four-winter silver, with the
 * grain drawn over it. Mobile stacks the stops; from `md` they sit under the
 * band they describe.
 */
export default function Silvering() {
  const stops = silvering.stops
  const ramp = stops.map((s, i) => `${s.hex} ${(i / (stops.length - 1)) * 100}%`).join(', ')

  return (
    <section id="cedar" className="relative scroll-mt-20 border-t border-ash py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="max-w-2xl">
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02]">
            {silvering.title}
            <em className="font-light italic text-timber"> {silvering.emphasis}</em>
          </h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-sand/75">{silvering.body}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 lg:mt-16">
          {/* The band. Board lines are drawn over the ramp so it reads as
              cladding rather than as a gradient swatch. */}
          <div
            className="relative h-28 w-full overflow-hidden rounded-[2px] sm:h-36 lg:h-44"
            style={{ background: `linear-gradient(to right, ${ramp})` }}
            role="img"
            aria-label={`Cedar weathering from ${stops[0].label.toLowerCase()} at year zero to ${stops[stops.length - 1].label.toLowerCase()} by year four`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(0,0,0,0.55) 0 1px, transparent 1px 14px)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.13] mix-blend-overlay grain-overlay"
            />
            {/* Tick at each stop */}
            <div aria-hidden="true" className="absolute inset-0">
              {stops.map((s, i) => (
                <span
                  key={s.at}
                  className="absolute top-0 h-3 w-px bg-ink/45"
                  style={{ left: `${(i / (stops.length - 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {stops.map((s) => (
              <div key={s.at} className="border-t border-ash pt-4">
                <dt className="flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-inset ring-ink/30"
                    style={{ background: s.hex }}
                  />
                  {s.at}
                </dt>
                <dd>
                  <p className="mt-3 font-display text-[1.15rem] leading-tight text-bone">
                    {s.label}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-sand/70">{s.note}</p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-[56ch] text-[14px] leading-relaxed text-stone">
            {silvering.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
