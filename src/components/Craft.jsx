import { film, process } from '../data/site'
import Cinematic from './ui/Cinematic'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

export default function Craft() {
  return (
    <section
      id="craft"
      className="relative scroll-mt-20 overflow-hidden border-t border-ash py-28 lg:py-40"
    >
      <Cinematic
        src={film.workshop.src}
        poster={film.workshop.poster}
        scrim={film.workshop.scrim}
        opacity={film.workshop.opacity}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="max-w-2xl">
          <Eyebrow>Sixteen weeks</Eyebrow>
          <h2 className="mt-14 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
            Nothing here is
             subcontracted.
          </h2>
        </Reveal>

        <ol className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.09} className="relative">
              <div className="flex items-baseline justify-between border-b border-ash pb-4">
                <span className="font-display text-[3.4rem] leading-none text-slate transition-colors duration-700">
                  {p.n}
                </span>
                <span className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-glow">
                  {p.meta}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl text-bone">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-sand/70">{p.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15} className="mt-24 border-t border-ash pt-10">
          <p className="max-w-[62ch] font-display text-[clamp(1.3rem,2.4vw,1.85rem)] leading-[1.45] text-sand italic">
            “We turn down more work than we take. Ten is the number of cabins two
            people can build in a year without starting to cut corners they would
            never admit to.”
          </p>
          <p className="mt-6 text-[13px] text-sand/70">
            Two joiners, twelve weeks, one cabin
          </p>
        </Reveal>
      </div>
    </section>
  )
}
