import { marqueeItems } from '../data/site'

export default function Marquee() {
  const loop = [...marqueeItems, ...marqueeItems]

  return (
    <section
      aria-label="Materials and credentials"
      className="relative border-y border-ash bg-soot py-5"
    >
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]">
        <div
          className="flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap"
          style={{ animation: 'marquee 46s linear infinite' }}
        >
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 font-mono text-[12.5px] tracking-[0.02em] text-sand/70"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-cedar/70" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
