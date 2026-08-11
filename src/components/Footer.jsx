import { brand, models, nav } from '../data/site'

const copyrightYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative border-t border-ash bg-ink pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-xl text-bone">{brand.wordmark[0]}</span>
              <span className="h-1 w-1 rounded-full bg-ember" aria-hidden="true" />
              <span className="font-display text-xl text-bone">{brand.wordmark[1]}</span>
            </div>
            <p className="mt-6 max-w-[34ch] text-[14.5px] leading-relaxed text-sand/60">
              {brand.tagline}, made ten at a time in {brand.place}. Nothing shipped
              flat-packed, nothing built in a hurry.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Sections">
            <h2 className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-stone">
              Sections
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14.5px] text-sand/70 transition-colors duration-300 hover:text-bone"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-stone">
              Cabins
            </h2>
            <ul className="mt-5 space-y-3">
              {models.map((m) => (
                <li key={m.id}>
                  <a
                    href="#collection"
                    className="text-[14.5px] text-sand/70 transition-colors duration-300 hover:text-bone"
                  >
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-stone">
              Workshop
            </h2>
            <address className="mt-5 space-y-3 not-italic">
              <a
                href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
                className="block text-[14.5px] text-sand/70 transition-colors duration-300 hover:text-bone"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="block text-[14.5px] text-sand/70 transition-colors duration-300 hover:text-bone"
              >
                {brand.email}
              </a>
              <p className="text-[14.5px] leading-relaxed text-sand/60">
                {brand.address.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < brand.address.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </address>
          </div>
        </div>

        {/* Grain rule — a last nod to the material */}
        <div
          aria-hidden="true"
          className="mt-16 h-px bg-gradient-to-r from-transparent via-slate to-transparent"
        />

        <div className="mt-8 flex flex-col gap-4 text-[12.5px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} {brand.name} Ltd — Registered in England 07742119
          </p>
          <p>From {brand.from} · Ten builds a year</p>
        </div>
      </div>
    </footer>
  )
}
