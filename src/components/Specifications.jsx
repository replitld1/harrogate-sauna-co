import { specification, testimonial } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

export default function Specifications() {
  return (
    <section
      id="specification"
      className="relative scroll-mt-20 border-t border-ash bg-soot py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="max-w-2xl">
          <Eyebrow>Specification</Eyebrow>
          <h2 className="mt-10 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
            The whole schedule, published.
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-sand/75">
            Everything below is standard on all three cabins. There is no options
            list and no upgrade path, because there is nothing we would build better
            if you paid more.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {specification.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.07}>
              <h3 className="font-mono text-[11.5px] uppercase tracking-[0.24em] text-cedar">
                {group.group}
              </h3>
              <dl className="mt-5">
                {group.rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[minmax(9rem,0.8fr)_1.4fr] gap-6 border-b border-ash py-4 transition-colors duration-500 hover:border-slate"
                  >
                    <dt className="text-[14px] text-stone">{k}</dt>
                    <dd className="text-[14.5px] leading-snug text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-24">
          <figure className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-8 block h-px w-16 bg-gradient-to-r from-transparent via-cedar to-transparent"
            />
            <blockquote className="font-display text-[clamp(1.45rem,3vw,2.2rem)] leading-[1.4] text-bone">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 text-[13px] text-stone">
              {testimonial.name}
              <span className="mx-3 text-slate">/</span>
              {testimonial.place}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
