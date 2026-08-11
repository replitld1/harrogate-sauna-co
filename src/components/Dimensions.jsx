import { bespoke, dimensions, siting } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

/** The row that carries the weight figure gets picked out — it is the number
 *  that decides whether a customer needs groundwork or a pair of mats. */
const HIGHLIGHT = 'Dry weight'

export default function Dimensions() {
  return (
    <section
      id="dimensions"
      className="relative scroll-mt-20 border-t border-ash py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Dimensions</Eyebrow>
            <h2 className="mt-10 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              Every figure you need before you commit.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-sand/70">
            Take these to your electrician and whoever is laying your base. Nothing
            here changes once you have ordered — if a number moves, it moves before
            you pay us anything.
          </p>
        </Reveal>

        {/* Dimension table. Scrolls sideways on narrow screens rather than
            forcing the page to. */}
        <Reveal delay={0.06} className="mt-16">
          <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Dimensions and requirements for each cabin
              </caption>
              <thead>
                <tr className="border-b border-slate">
                  <th scope="col" className="w-[15rem] py-4 pr-6 font-mono text-[11.5px] font-normal uppercase tracking-[0.2em] text-cedar">
                    Cabin
                  </th>
                  {dimensions.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="py-4 pr-6 font-display text-[1.35rem] font-light text-bone"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dimensions.rows.map((row) => {
                  const lit = row.label === HIGHLIGHT
                  return (
                    <tr
                      key={row.label}
                      className={`border-b border-ash transition-colors duration-500 hover:bg-soot ${
                        lit ? 'bg-soot/60' : ''
                      }`}
                    >
                      <th
                        scope="row"
                        className={`py-4 pr-6 text-[14px] font-normal ${
                          lit ? 'text-cedar' : 'text-stone'
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`py-4 pr-6 font-mono text-[13px] ${
                            lit ? 'text-glow' : 'text-bone'
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[13px] text-stone">
            Not one of them reaches a tonne — which is what keeps the groundwork
            simple.
          </p>
        </Reveal>

        {/* Bespoke */}
        <Reveal delay={0.1} className="mt-24">
          <div className="grid gap-px bg-ash lg:grid-cols-[1.15fr_1fr]">
            <div className="bg-soot p-8 lg:p-12">
              <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-ember">
                Bespoke sizing
              </span>
              <h3 className="mt-6 max-w-[16ch] text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.08]">
                {bespoke.title}
              </h3>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-sand/75">
                {bespoke.body}
              </p>
              <p className="mt-6 max-w-[48ch] text-[14px] leading-relaxed text-stone">
                {bespoke.note}
              </p>
            </div>

            <div className="flex flex-col justify-between bg-ink p-8 lg:p-12">
              <div>
                <dl>
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">
                    Design & engineering fee
                  </dt>
                  <dd className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-bone">
                    {bespoke.price}
                  </dd>
                </dl>
                <ul className="mt-9 space-y-3">
                  {bespoke.includes.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3.5 text-[14px] leading-snug text-sand/80"
                    >
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-cedar"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#reserve"
                className="mt-10 inline-flex w-fit items-center gap-2 border-b border-slate pb-1 text-[14px] text-sand transition-colors duration-300 hover:border-glow hover:text-glow"
              >
                Book the walk-round and bring your dimensions
              </a>
            </div>
          </div>
        </Reveal>

        {/* What the customer arranges */}
        <Reveal delay={0.12} className="mt-24">
          <h3 className="max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1]">
            Two things are yours to arrange.
          </h3>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {siting.map((s) => (
              <div key={s.n} className="border-t border-ash pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[2.4rem] leading-none text-stone">
                    {s.n}
                  </span>
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-cedar">
                    {s.meta}
                  </span>
                </div>
                <h4 className="mt-6 font-display text-[1.25rem] text-bone">{s.title}</h4>
                <p className="mt-3.5 text-[14px] leading-relaxed text-sand/70">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
