import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-triggered reveal. Everything on the page enters the same way —
 * a short rise and a fade — so the eye learns the rhythm and stops noticing it.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
