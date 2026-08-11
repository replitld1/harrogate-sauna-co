import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * Dark is the house style — the cabins are photographed at dusk and the page
 * is lit for it. But a garden building at £20k gets read on a train, in an
 * office, and by people who simply prefer paper, so light is a first-class
 * alternative rather than an inverted afterthought.
 *
 * The applied theme is resolved by an inline script in index.html before
 * first paint; this only mirrors and changes it.
 */
const STORE = 'hsc-theme'

export const applyTheme = (t) => {
  document.documentElement.dataset.theme = t
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'light' ? '#f7f3ed' : '#0a0908')
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document === 'undefined' ? 'dark' : document.documentElement.dataset.theme || 'dark',
  )

  // Follow the system until the visitor states a preference of their own.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      if (localStorage.getItem(STORE)) return
      const next = e.matches ? 'light' : 'dark'
      setTheme(next)
      applyTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem(STORE, next)
    } catch {
      /* private mode — the choice just does not persist */
    }
  }

  const Icon = theme === 'light' ? Moon : Sun

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
      title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
      className={`flex h-11 w-11 items-center justify-center rounded-full text-stone transition-colors duration-300 hover:text-bone ${className}`}
    >
      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
    </button>
  )
}
