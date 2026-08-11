import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const scrims = {
  // Bottom-anchored copy: heavy at the foot, open through the middle
  base: 'bg-gradient-to-t from-ink via-ink/25 to-ink/55',
  // Copy sits left on a wide screen, so darken that side and leave the product
  // side clear. In portrait there is no "left" — the copy sits over the whole
  // frame — so below `md` it falls back to a bottom-anchored scrim.
  left:
    'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-ink)_58%,transparent)_0%,color-mix(in_oklab,var(--color-ink)_78%,transparent)_45%,var(--color-ink)_100%)] ' +
    'md:bg-[linear-gradient(90deg,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_72%,transparent)_42%,transparent_78%)]',
  // A panel that has to carry small text over the whole frame
  full: 'bg-ink/62',
}

/**
 * A full-bleed shot behind a section.
 *
 * MOBILE IS STILLS, ON PURPOSE.
 *
 * Video autoplay on a phone depends on a stack of things we do not control —
 * Low Power Mode, the Reduce Motion accessibility setting, the browser's
 * autoplay policy, whether the file was muxed with faststart — and every one
 * of them fails the same silent way: a frozen frame that looks broken. The
 * previous build gated the video element behind four conditions at once, so
 * any single one of them yielded a dead poster with no way to recover.
 *
 * A slow pan on an image has none of those dependencies. It cannot fail to
 * start, it costs ~20KB instead of ~1.5MB, and at arm's length on a phone it
 * reads as the same thing. Desktop still gets the film, because there it
 * demonstrably plays.
 */

// Each panel pans its own way, so five sections never share one move.
const PANS = {
  'pan-in': { from: 'scale(1.02)', to: 'scale(1.14) translate3d(-1.5%,-1.5%,0)' },
  'pan-left': { from: 'scale(1.10) translate3d(2.5%,0,0)', to: 'scale(1.10) translate3d(-2.5%,-1%,0)' },
  'pan-up': { from: 'scale(1.08) translate3d(0,2.5%,0)', to: 'scale(1.14) translate3d(0,-2%,0)' },
  'pan-out': { from: 'scale(1.16) translate3d(1%,1%,0)', to: 'scale(1.03)' },
}

const wantsVideo = () => {
  if (typeof window === 'undefined') return false
  const c = navigator.connection
  if (c?.saveData) return false
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return false
  // Hover + fine pointer is the honest test for "this is a desktop browser",
  // and it is the one surface where autoplay is reliable enough to build on.
  return window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches
}

export default function Cinematic({
  src,
  poster,
  scrim = 'base',
  pan = 'pan-in',
  duration = 38,
  opacity = 0.68,
  eager = false,
  // Panels carried by a real photograph never play a generated clip over it.
  still = false,
  className = '',
}) {
  const ref = useRef(null)
  const holderRef = useRef(null)
  const reduced = useReducedMotion()

  const [near, setNear] = useState(eager)
  const [useVideo, setUseVideo] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setUseVideo(wantsVideo() && !still)
  }, [still])

  /* Nearness is decided two ways on purpose. IntersectionObserver is the
     efficient path but delivers nothing while the document is hidden, and a
     panel that never gets its callback never loads at all. The scroll check
     reaches the same conclusion independently; whichever wins first, we load.
     Not rAF-throttled — rAF is suspended in the same conditions this covers. */
  useEffect(() => {
    if (near) return
    const el = holderRef.current
    if (!el) return

    let done = false
    const promote = () => {
      if (done) return
      done = true
      setNear(true)
    }
    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight + 400 && r.bottom > -400) promote()
    }
    let last = 0
    const onScroll = () => {
      const now = performance.now()
      if (now - last < 100) return
      last = now
      check()
    }

    const obs = new IntersectionObserver(([e]) => e.isIntersecting && promote(), {
      rootMargin: '400px 0px',
    })
    obs.observe(el)
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    document.addEventListener('visibilitychange', check)
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', check)
    }
  }, [near])

  // iOS Safari will not play a `data:` URI in a <video> — it needs a source it
  // can issue range requests against, so the inlined build converts to blob:.
  const [objectUrl, setObjectUrl] = useState(null)
  const isInlined = src?.startsWith('data:')

  useEffect(() => {
    if (!isInlined) return
    let url
    let cancelled = false
    fetch(src)
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return
        url = URL.createObjectURL(blob)
        setObjectUrl(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      if (url) URL.revokeObjectURL(url)
    }
  }, [src, isInlined])

  const resolved = isInlined ? objectUrl : src
  const mountVideo = useVideo && near && !reduced && !!resolved

  useEffect(() => {
    const v = ref.current
    if (!v || !mountVideo) return
    // Safari reads the muted *attribute*, not the property React sets.
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')

    let cancelled = false
    const attempt = () => {
      if (cancelled) return
      const pr = v.play()
      if (pr?.then) pr.then(() => !cancelled && setPlaying(true)).catch(() => {})
    }
    attempt()
    v.addEventListener('loadeddata', attempt)
    v.addEventListener('canplay', attempt)
    return () => {
      cancelled = true
      v.removeEventListener('loadeddata', attempt)
      v.removeEventListener('canplay', attempt)
    }
  }, [mountVideo])

  const move = PANS[pan] ?? PANS['pan-in']
  const panVars = {
    animation: `cinepan ${duration}s cubic-bezier(0.37,0,0.63,1) infinite alternate`,
    ['--pan-from']: move.from,
    ['--pan-to']: move.to,
  }

  return (
    <div
      ref={holderRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-ink ${className}`}
    >
      {/* The still always renders and always pans. If video never starts —
          Low Power Mode, autoplay refused, a phone — this is what you see,
          and it looks finished rather than frozen. */}
      {poster && (
        <img
          src={poster}
          alt=""
          fetchPriority={eager ? 'high' : 'low'}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={reduced ? { opacity } : { opacity, ...panVars }}
        />
      )}

      {mountVideo && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: playing ? opacity : 0, ...(reduced ? {} : panVars) }}
          src={resolved ?? undefined}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          preload="auto"
          tabIndex={-1}
        />
      )}

      <div className={`absolute inset-0 ${scrims[scrim]}`} />
    </div>
  )
}
