import { ArrowRight } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50'

const variants = {
  solid:
    'bg-bone text-ink hover:bg-glow hover:shadow-[0_0_44px_-8px_var(--color-ember)]',
  ember:
    'bg-ember text-ink hover:bg-glow hover:shadow-[0_0_48px_-6px_var(--color-ember)]',
  ghost:
    'border border-slate/70 text-sand hover:border-cedar hover:text-bone hover:bg-bark',
}

export default function Button({
  as = 'a',
  variant = 'solid',
  arrow = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = as
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        />
      )}
    </Tag>
  )
}
