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
 * Should this visitor get 1.5MB of video at all?
 *
 * Phones were fetching all five clips (7.5MB) eagerly, on a page where the
 * poster frame carries the same picture for a fraction of the bytes. Video is
 * an enhancement for wide screens on a connection that has not asked us to go
 * easy; everyone else gets the still, which is what autoplay-refused browsers
 * were seeing anyway.
 */
const wantsVideo = () => {
  if (typeof window === 'undefined') return false
  const c = navigator.connection
  if (c?.saveData) return false
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return false
  return window.matchMedia('(min-width: 768px)').matches
}

export default function Cinematic({
  src,
  poster,
  scrim = 'base',
  drift = true,
  opacity = 0.68,
  eager = false,
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
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setAllowVideo(wantsVideo())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (near || !holderRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    obs.observe(holderRef.current)
    return () => obs.disconnect()
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
  const playVideo = allowVideo && near && !reduced

  useEffect(() => {
    const v = ref.current
    if (!v || !resolved || !playVideo) return
    // Autoplay can still be refused; the poster carries it either way.
    v.play().catch(() => {})
  }, [playVideo, resolved])

  return (
    <div
      ref={holderRef}
      aria-hidden="true"
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
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity,
            animation: drift && !reduced ? 'kenburns 34s ease-in-out infinite alternate' : undefined,
          }}
          src={resolved ?? undefined}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      )}

      <div className={`absolute inset-0 ${scrims[scrim]}`} />
    </div>
  )
}
