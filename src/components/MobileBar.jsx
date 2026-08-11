import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { brand, cta } from '../data/site'

/**
 * On a phone the page runs to ~22,000px and the header CTA was hidden below
 * `sm`, so there was no way to act without scrolling to the very bottom. This
 * is the fix: a thumb-zone bar that appears once the hero is behind you and
 * gets out of the way over the form itself.
 *
 * Both targets are 52px tall — above the 44px floor with room for a fat thumb.
 */
export default function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const reserve = () => document.getElementById('reserve')

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const r = reserve()?.getBoundingClientRect()
      // Hide once the form itself is on screen — the bar would only compete.
      const atForm = r ? r.top < window.innerHeight * 0.75 && r.bottom > 0 : false
      setShow(pastHero && !atForm)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ash bg-ink/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      // Off-screen copy stays out of the tab order and off screen readers.
      aria-hidden={!show}
      {...(!show && { inert: '' })}
    >
      <div className="flex items-stretch gap-2 p-2.5">
        <a
          href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full border border-slate text-[14.5px] text-sand transition-colors duration-300 active:bg-bark"
        >
          <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
          Call
        </a>
        <a
          href="#reserve"
          className="flex min-h-[52px] flex-[1.6] items-center justify-center rounded-full bg-ember px-4 text-[14.5px] font-medium text-ink transition-colors duration-300 active:bg-glow"
        >
          {cta.short}
        </a>
      </div>
    </div>
  )
}
