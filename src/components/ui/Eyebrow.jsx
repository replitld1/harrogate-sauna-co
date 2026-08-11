export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[11.5px] uppercase tracking-[0.28em] text-cedar">
        {children}
      </span>
      <span className="rule h-px flex-1 max-w-24" aria-hidden="true" />
    </div>
  )
}
