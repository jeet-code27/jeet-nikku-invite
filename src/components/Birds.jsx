import { motion } from 'framer-motion'

// A small flock drawn in SVG, flapping and drifting across the sky.
const flock = [
  { x: 18, y: 30, s: 1, d: 0 },
  { x: 26, y: 24, s: 0.8, d: 0.3 },
  { x: 33, y: 33, s: 0.9, d: 0.1 },
  { x: 41, y: 21, s: 0.7, d: 0.5 },
  { x: 48, y: 38, s: 0.85, d: 0.2 },
  { x: 57, y: 27, s: 1, d: 0.4 },
  { x: 64, y: 35, s: 0.75, d: 0.15 },
  { x: 72, y: 22, s: 0.9, d: 0.35 },
  { x: 80, y: 31, s: 0.7, d: 0.05 },
  { x: 38, y: 46, s: 0.6, d: 0.45 },
  { x: 60, y: 48, s: 0.65, d: 0.25 },
]

function Bird({ delay }) {
  return (
    <motion.svg viewBox="0 0 40 20" className="h-full w-full overflow-visible">
      <motion.path
        fill="#2b1d16"
        animate={{
          d: [
            'M0 6 Q10 0 20 10 Q30 0 40 6 Q30 4 20 13 Q10 4 0 6Z',
            'M0 16 Q10 14 20 10 Q30 14 40 16 Q30 12 20 13 Q10 12 0 16Z',
            'M0 6 Q10 0 20 10 Q30 0 40 6 Q30 4 20 13 Q10 4 0 6Z',
          ],
        }}
        transition={{ duration: 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

export default function Birds() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ x: ['-8%', '8%'] }}
      transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      {flock.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `calc(var(--W) * ${0.018 * b.s})`,
            height: `calc(var(--W) * ${0.009 * b.s})`,
          }}
          animate={{ y: [0, -10 * b.s, 0] }}
          transition={{ duration: 3 + b.d * 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bird delay={b.d} />
        </motion.div>
      ))}
    </motion.div>
  )
}
