import { hotspots } from '../../data/site'

/**
 * Section through the cabin, drawn like a workshop elevation.
 * Each numbered marker is a real button — keyboard reachable, not a hover trick.
 */

// Wall build-up, drawn as a peeled-back stack on the left edge.
// Tones are lifted well above the interior so the layers read at a glance.
const layers = [
  { x: 92, w: 26, fill: '#6b452c' }, // cedar cladding
  { x: 118, w: 8, fill: '#0d0b09' }, // ventilated cavity
  { x: 126, w: 6, fill: '#9a958c' }, // foil vapour barrier
  { x: 132, w: 44, fill: '#332e28' }, // rock wool
  { x: 176, w: 12, fill: '#57432d' }, // structural ply
  { x: 188, w: 6, fill: '#0d0b09' }, // service cavity
]

const INNER_X = 194
const INNER_W = 855 - INNER_X

const stones = [
  [318, 356], [340, 348], [362, 358], [306, 380], [330, 374], [354, 380],
  [316, 402], [342, 400], [364, 404], [308, 426], [332, 424], [356, 428],
  [320, 450], [346, 452],
]

export default function SaunaCutaway({ active, onSelect, className = '' }) {
  return (
    <svg
      viewBox="56 44 888 516"
      className={className}
      role="group"
      aria-label="Cutaway section through the cabin, with six labelled construction details"
    >
      <defs>
        <linearGradient id="cut-air" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#160f0b" />
          <stop offset="0.55" stopColor="#20140d" />
          <stop offset="1" stopColor="#3d1c0d" />
        </linearGradient>
        <linearGradient id="cut-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe3e8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffb27a" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="cut-ember" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff9a4d" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e8622c" stopOpacity="0" />
        </radialGradient>
        <filter id="cut-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Interior air */}
      <rect x={INNER_X} y="118" width={INNER_W} height="382" fill="url(#cut-air)" />
      <ellipse
        cx="360"
        cy="440"
        rx="230"
        ry="190"
        fill="url(#cut-ember)"
        filter="url(#cut-blur)"
        opacity="0.55"
      />

      {/* Roof */}
      <g>
        <rect x="66" y="62" width="880" height="26" fill="#463f38" />
        <rect x="66" y="88" width="880" height="8" fill="#221f1c" />
        <rect x="92" y="96" width="828" height="22" fill="#2a221c" />
        {[180, 300, 420, 540, 660, 780, 880].map((x) => (
          <line key={x} x1={x} y1="62" x2={x} y2="88" stroke="#15120f" strokeWidth="2" />
        ))}
      </g>

      {/* Wall build-up, left */}
      {layers.map((l) => (
        <rect key={l.x} x={l.x} y="118" width={l.w} height="382" fill={l.fill} />
      ))}
      {/* Cedar board lines */}
      <g stroke="#0d0a08" strokeWidth="0.9" opacity="0.55">
        {[98, 105, 112].map((x) => (
          <line key={x} x1={x} y1="118" x2={x} y2="500" />
        ))}
      </g>
      {/* Hatching over the insulation, as on a drawing */}
      <g stroke="#6d655c" strokeWidth="0.9" opacity="0.55">
        {Array.from({ length: 27 }, (_, i) => 124 + i * 15).map((y) => (
          <line key={y} x1="132" y1={y} x2="176" y2={y - 17} />
        ))}
      </g>
      <rect
        x="92"
        y="118"
        width="102"
        height="382"
        fill="none"
        stroke="#0d0a08"
        strokeWidth="1"
      />

      {/* Floor and plinth */}
      <rect x="92" y="500" width="828" height="14" fill="#3b322b" />
      <rect x="92" y="514" width="828" height="26" fill="#1b1714" />
      <g stroke="#0d0a08" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 34 }, (_, i) => 100 + i * 24).map((x) => (
          <line key={x} x1={x} y1="514" x2={x - 14} y2="540" />
        ))}
      </g>

      {/* Heater: stone column */}
      <g>
        <rect x="296" y="330" width="86" height="170" rx="4" fill="#16120f" />
        <rect
          x="296"
          y="330"
          width="86"
          height="170"
          rx="4"
          fill="none"
          stroke="#5b534b"
          strokeWidth="1.5"
        />
        {stones.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={11}
            fill="#413b35"
            stroke="#615950"
            strokeWidth="0.8"
          />
        ))}
        <rect
          x="304"
          y="462"
          width="70"
          height="30"
          rx="3"
          fill="#e8622c"
          style={{ animation: 'flicker 4.5s ease-in-out infinite' }}
        />
        {/* Löyly rising */}
        <g opacity="0.34" filter="url(#cut-blur)">
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              cx={318 + i * 24}
              cy={310}
              rx={16}
              ry={24}
              fill="#f3e2d2"
              style={{
                animation: `drift ${8 + i * 2}s ease-out ${i * 1.8}s infinite`,
                transformOrigin: `${318 + i * 24}px 310px`,
              }}
            />
          ))}
        </g>
      </g>

      {/* Benches, cantilevered off a hidden spine */}
      <g>
        <rect x="806" y="180" width="14" height="320" fill="#2b241e" />
        <rect x="556" y="392" width="264" height="16" rx="4" fill="#9c8365" />
        <rect x="556" y="392" width="264" height="5" rx="2" fill="#c4a982" />
        <rect x="596" y="292" width="224" height="16" rx="4" fill="#9c8365" />
        <rect x="596" y="292" width="224" height="5" rx="2" fill="#c4a982" />
        <rect x="600" y="308" width="216" height="6" fill="#0d0a08" opacity="0.5" />
        <rect x="560" y="408" width="256" height="6" fill="#0d0a08" opacity="0.5" />
      </g>

      {/* Glazed wall, right */}
      <g>
        <rect x="855" y="140" width="26" height="360" fill="url(#cut-glass)" />
        <rect
          x="855"
          y="140"
          width="26"
          height="360"
          fill="none"
          stroke="#7d746a"
          strokeWidth="1.2"
        />
        <rect x="881" y="118" width="39" height="382" fill="#2a221c" />
        <line x1="868" y1="150" x2="868" y2="490" stroke="#e9f2f4" strokeWidth="1" opacity="0.24" />
      </g>

      {/* Ceiling lining */}
      <rect x={INNER_X} y="118" width={INNER_W} height="10" fill="#57432d" />

      {/* Markers */}
      {hotspots.map((h, i) => {
        const on = active === h.id
        return (
          <g
            key={h.id}
            role="button"
            tabIndex={0}
            aria-label={`Detail ${i + 1}: ${h.title}`}
            aria-pressed={on}
            onClick={() => onSelect(h.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(h.id)
              }
            }}
            className="cursor-pointer focus:outline-none"
          >
            <circle cx={h.x} cy={h.y} r="26" fill="#0a0908" opacity={on ? 0.88 : 0.66} />
            <circle
              cx={h.x}
              cy={h.y}
              r={on ? 20 : 15}
              fill="none"
              stroke={on ? '#e8622c' : '#8c8178'}
              strokeWidth="1.4"
              style={{ transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)' }}
            />
            <circle cx={h.x} cy={h.y} r="3.5" fill={on ? '#ffb27a' : '#cfc3b4'} />
            <text
              x={h.x}
              y={h.y - 32}
              textAnchor="middle"
              fill={on ? '#ffb27a' : '#8c8178'}
              fontSize="13"
              fontFamily="var(--font-mono)"
              letterSpacing="1.5"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
