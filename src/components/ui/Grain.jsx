/** Film grain laid over the whole page — stops the big dark gradients banding. */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-overlay"
    />
  )
}
