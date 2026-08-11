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
 * A full-bleed looping shot behind a section.
 *
 * The footage already moves slowly; the drift adds a second, slower scale on
 * top of it so a five-second loop never reads as a five-second loop. Both stop
 * dead under prefers-reduced-motion — the video pauses on its first frame.
 */
/**
 * Should this visitor get 1.5MB of video?
 *
 * Phones play the film too — the footage is the point of the page. What we do
 * not do is what this used to: fetch all five clips (7.5MB) eagerly on load.
 * Each one now mounts only as it comes near the viewport, behind its poster,
 * so a phone pays for the clip it is actually looking at.
 *
 * The two opt-outs are the visitor's own: Data Saver, and a 2G connection.
 */
const wantsVideo = () => {
  if (typeof window === 'undefined') return false
  const c = navigator.connection
  if (c?.saveData) return false
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return false
  return true
}

export default function Cinematic({
  src,
  poster,
  scrim = 'base',
  drift = true,
  opacity = 0.68,
  eager = false,
  // Some panels are carried by a real photograph. Playing a generated clip
  // over one of those would be a downgrade, so they opt out of video.
  still = false,
  className = '',
}) {
  const ref = useRef(null)
  const holderRef = useRef(null)
  const reduced = useReducedMotion()

  // Mount the source only when the panel is close to view (the hero is `eager`,
  // because it is the view).
  const [near, setNear] = useState(eager)
  const [allowVideo, setAllowVideo] = useState(false)

  useEffect(() => {
    setAllowVideo(wantsVideo())
  }, [])

  /* Nearness is decided two ways on purpose.
   *
   * IntersectionObserver is the efficient path, but it delivers nothing while
   * the document is hidden, and a panel that never gets its callback never
   * mounts its video at all — the failure mode is a page of stills. So a
   * cheap rAF-throttled scroll check runs alongside it and reaches the same
   * conclusion independently. Whichever wins first, the video mounts. */
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
      if (r.top < window.innerHeight + 300 && r.bottom > -300) promote()
    }

    // Deliberately not rAF-throttled: rAF is suspended whenever the document
    // is hidden, which is exactly one of the cases this fallback exists to
    // cover. A getBoundingClientRect behind a 100ms time guard is cheap enough.
    let last = 0
    const onScroll = () => {
      const now = performance.now()
      if (now - last < 100) return
      last = now
      check()
    }

    const obs = new IntersectionObserver(([e]) => e.isIntersecting && promote(), {
      rootMargin: '300px 0px',
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
  // can issue range requests against. A blob: URL satisfies that, so the
  // single-file build (where clips are inlined) converts before playing.
  // Ordinary http(s) sources pass straight through untouched.
  const [objectUrl, setObjectUrl] = useState(null)
  const isInlined = src.startsWith('data:')

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
  const playVideo = allowVideo && near && !reduced && !still
  const [blocked, setBlocked] = useState(false)

  /* Getting autoplay to actually happen on a phone.
   *
   * Three things bite here, and all three had to be fixed:
   *  1. React sets `muted` as a DOM *property*, and Safari reads the
   *     *attribute* when deciding whether a video may autoplay. Without the
   *     attribute iOS refuses every time and you are left staring at a poster.
   *  2. play() can reject before the first frame is ready, so it is retried on
   *     canplay/loadeddata rather than fired once and forgotten.
   *  3. Low Power Mode blocks autoplay outright, whatever we do. That is not
   *     recoverable, so we surface a tap-to-play control instead of failing
   *     silently. */
  useEffect(() => {
    const v = ref.current
    if (!v || !resolved || !playVideo) return

    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')

    let cancelled = false
    const attempt = () => {
      if (cancelled) return
      const p = v.play()
      if (p?.then) p.then(() => !cancelled && setBlocked(false)).catch(() => !cancelled && setBlocked(true))
    }

    attempt()
    v.addEventListener('loadeddata', attempt)
    v.addEventListener('canplay', attempt)
    return () => {
      cancelled = true
      v.removeEventListener('loadeddata', attempt)
      v.removeEventListener('canplay', attempt)
    }
  }, [playVideo, resolved])

  return (
    <div
      ref={holderRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-ink ${className}`}
    >
      {/* The still is always present. It is the whole picture on a phone, the
          first paint on desktop, and the fallback when autoplay is refused. */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          fetchPriority={eager ? 'high' : 'low'}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity,
            animation:
              drift && !reduced && !playVideo
                ? 'kenburns 34s ease-in-out infinite alternate'
                : undefined,
          }}
        />
      )}

      {playVideo && (
        <video
          ref={ref}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity,
            animation: drift && !reduced ? 'kenburns 34s ease-in-out infinite alternate' : undefined,
          }}
          src={resolved ?? undefined}
          poster={poster}
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          disableRemotePlayback
          preload="auto"
          tabIndex={-1}
        />
      )}

      <div className={`absolute inset-0 ${scrims[scrim]}`} />

      {/* Low Power Mode refuses autoplay no matter what. Rather than leave a
          still that looks broken, offer the tap. */}
      {blocked && (
        <button
          type="button"
          onClick={() => {
            const v = ref.current
            if (!v) return
            v.muted = true
            v.play().then(() => setBlocked(false)).catch(() => {})
          }}
          className="pointer-events-auto absolute bottom-5 right-5 z-10 flex min-h-[44px] items-center gap-2.5 rounded-full border border-bone/25 bg-ink/70 px-5 text-[13px] text-bone backdrop-blur-md"
        >
          <span
            aria-hidden="true"
            className="block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-bone"
          />
          Play
        </button>
      )}
    </div>
  )
}
