import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { brand, cta, nav } from '../data/site'
import Button from './ui/Button'

function Wordmark({ className = '' }) {
  return (
    <a
      href="#top"
      className={`flex items-baseline gap-2.5 ${className}`}
      aria-label={`${brand.name} — home`}
    >
      <span className="font-display text-[19px] tracking-[-0.01em] text-bone">
        {brand.wordmark[0]}
      </span>
      <span className="h-1 w-1 rounded-full bg-ember" aria-hidden="true" />
      <span className="font-display text-[19px] tracking-[-0.01em] text-bone">
        {brand.wordmark[1]}
      </span>
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // You never knew where you were on a 16,000px page. Now the nav says so.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Esc to close, and keep Tab inside the panel while it is up.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      )
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a[href], button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'border-b border-ash/80 bg-ink/92 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-12"
          aria-label="Primary"
        >
          <Wordmark />

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? 'true' : undefined}
                  className={`group relative flex items-center py-3 text-[13px] tracking-wide transition-colors duration-300 hover:text-bone ${
                    active === item.href.slice(1) ? 'text-bone' : 'text-stone'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1.5 left-0 h-px bg-ember transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full ${
                      active === item.href.slice(1) ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
              className="hidden font-mono text-[12px] tracking-wider text-stone transition-colors hover:text-bone xl:block"
            >
              {brand.phone}
            </a>
            <div className="hidden sm:block">
              <Button href="#reserve" variant="ghost" className="!px-5 !py-2.5 !text-[13px]">
                {cta.label}
              </Button>
            </div>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-2.5 flex h-11 w-11 items-center justify-center text-sand lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.4} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            ref={panelRef}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2.5 flex h-11 w-11 items-center justify-center text-sand"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <ul className="mt-6 flex flex-col px-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ash py-4 font-display text-[1.75rem] text-bone"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pt-8">
              <Button href="#reserve" onClick={() => setOpen(false)} arrow className="w-full">
                {cta.label}
              </Button>
              <p className="mt-4 text-center text-[13px] text-stone">{cta.under}</p>
              <div className="mt-8 flex flex-col gap-1">
                <a
                  href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
                  className="flex min-h-[44px] items-center font-mono text-[13px] tracking-wider text-sand"
                >
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex min-h-[44px] items-center font-mono text-[13px] tracking-wider text-sand"
                >
                  {brand.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
