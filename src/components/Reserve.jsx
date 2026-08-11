import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, ChevronDown } from 'lucide-react'
import { brand, cta, film, models, year } from '../data/site'
import Button from './ui/Button'
import Cinematic from './ui/Cinematic'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

// Placeholders carry the only formatting guidance on the form, so they have to
// clear AA — /60 measured 2.55:1.
const field =
  'w-full min-h-[44px] border-b border-ash bg-transparent py-3.5 text-[15px] text-bone placeholder:text-stone/85 transition-colors duration-500 focus:border-cedar focus:outline-none'
const bad = 'border-ember'

// Loose on purpose: matches every real UK format, rejects "xxx".
const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
const PHONE = /^\+?[\d\s()-]{10,}$/

export default function Reserve() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const [errors, setErrors] = useState({})
  const [sentTo, setSentTo] = useState('')
  const formRef = useRef(null)

  const validate = (data) => {
    const e = {}
    if (!data.name?.trim()) e.name = 'We need a name to put on the drawings.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || ''))
      e.email = 'That email address looks incomplete — check for a missing @ or domain.'
    if (!PHONE.test(data.phone || ''))
      e.phone = 'We call to book the walk-round, so we need a number that reaches you.'
    if (!POSTCODE.test(data.postcode || ''))
      e.postcode = 'That is not a UK postcode. Something like HG2 8RB.'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setFailed(false)
    const data = Object.fromEntries(new FormData(ev.currentTarget))
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) {
      // Send focus to the first thing that is wrong.
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    setBusy(true)
    try {
      // No backend yet. This is where the POST goes — see Known gaps in CLAUDE.md.
      await new Promise((r) => setTimeout(r, 900))
      setSentTo(data.email)
      setSent(true)
    } catch {
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  const Err = ({ name }) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        role="alert"
        className="mt-2 flex items-start gap-2 text-[13px] leading-snug text-glow"
      >
        <AlertCircle size={14} strokeWidth={1.6} className="mt-0.5 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null

  return (
    <section
      id="reserve"
      className="on-media relative scroll-mt-20 overflow-hidden border-t border-ash bg-ink py-28 lg:py-40"
    >
      <Cinematic
        src={film.night.src}
        poster={film.night.poster}
        scrim={film.night.scrim}
        opacity={film.night.opacity}
        pan={film.night.pan}
        duration={film.night.duration}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Reserve</Eyebrow>
            <h2 className="mt-7 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.02]">
              {year.remaining} slots left
              <br />
              for
              <em className="font-light italic text-glow"> {year.current}.</em>
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-sand/75">
              We build ten cabins a year and {year.sold} have gone. Tell us where you
              are and we will set up a FaceTime walk-round of the garden — twenty
              minutes, no deposit, no obligation. We would rather talk you out of it
              now than halfway through a build.
            </p>

            <dl className="mt-12 space-y-6 border-t border-ash pt-8">
              {[
                [`${year.current} slots`, `${year.sold} of 10 sold`],
                ['Lead time', '16 weeks from deposit'],
                ['Workshop', 'Crag Lane, Harrogate HG3'],
                ['Telephone', brand.phone],
                ['Email', brand.email],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone">
                    {k}
                  </dt>
                  <dd className="text-[14.5px] text-sand">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative border border-ash bg-ink p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ember/50 text-ember">
                      <Check size={20} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <h3 className="mt-8 font-display text-3xl text-bone">
                      That is with the workshop.
                    </h3>
                    <p className="mt-4 max-w-[44ch] leading-relaxed text-sand/70">
                      We will call you within two working days to book the FaceTime
                      walk-round, and confirm to{' '}
                      <span className="text-bone">{sentTo}</span>. If it is urgent, the
                      workshop line is answered between seven and five.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 min-h-[44px] border-b border-slate text-[14px] text-sand transition-colors duration-300 hover:border-glow hover:text-glow"
                    >
                      Not right? Change your details
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    ref={formRef}
                    noValidate
                    initial={false}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Marianne Hollis"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`${field} mt-2 ${errors.name ? bad : ''}`}
                        />
                        <Err name="name" />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.co.uk"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`${field} mt-2 ${errors.email ? bad : ''}`}
                        />
                        <Err name="email" />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                        >
                          Telephone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="07700 900123"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          className={`${field} mt-2 ${errors.phone ? bad : ''}`}
                        />
                        <Err name="phone" />
                      </div>
                      <div>
                        <label
                          htmlFor="postcode"
                          className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                        >
                          Postcode
                        </label>
                        <input
                          id="postcode"
                          name="postcode"
                          required
                          autoComplete="postal-code"
                          inputMode="text"
                          placeholder="HG2 8RB"
                          aria-invalid={!!errors.postcode}
                          aria-describedby={errors.postcode ? 'postcode-error' : undefined}
                          className={`${field} mt-2 ${errors.postcode ? bad : ''}`}
                        />
                        <Err name="postcode" />
                      </div>
                      <div>
                        <label
                          htmlFor="model"
                          className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                        >
                          Cabin
                        </label>
                        <div className="relative">
                        <select
                          id="model"
                          name="model"
                          defaultValue="nidd"
                          className={`${field} mt-2 appearance-none pr-8`}
                        >
                          {models.map((m) => (
                            <option key={m.id} value={m.id} className="bg-ink">
                              {m.name} — {m.price}
                            </option>
                          ))}
                          <option value="bespoke" className="bg-ink">
                            Bespoke size — +£10,000
                          </option>
                          <option value="unsure" className="bg-ink">
                            Not sure yet
                          </option>
                        </select>
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-4 right-1 text-stone"
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-stone"
                      >
                        Anything we should know
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder="Access, slope, where you imagine it sitting…"
                        className={`${field} mt-2 resize-none`}
                      />
                    </div>

                    {failed && (
                      <p
                        role="alert"
                        className="flex items-start gap-2.5 border border-ember/40 bg-ember/5 p-4 text-[14px] leading-snug text-sand"
                      >
                        <AlertCircle size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                        <span>
                          That did not send — nothing has been lost. Try again, or ring
                          the workshop on{' '}
                          <a href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`} className="text-glow underline underline-offset-4">
                            {brand.phone}
                          </a>
                          .
                        </span>
                      </p>
                    )}

                    <div className="flex flex-col items-start gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-[38ch] text-[13px] leading-relaxed text-sand/70">
                        {cta.under} No deposit until the drawings are signed off.
                      </p>
                      <Button
                        as="button"
                        type="submit"
                        variant="ember"
                        arrow={!busy}
                        disabled={busy}
                        className="w-full sm:w-auto"
                      >
                        {busy ? 'Sending…' : cta.label}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
