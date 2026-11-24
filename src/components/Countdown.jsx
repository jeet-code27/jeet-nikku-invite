import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { countdown, images, weddingDate } from '../config.js'

const target = new Date(weddingDate).getTime()

function remaining() {
  const d = Math.max(0, target - Date.now())
  return {
    DAYS: Math.floor(d / 864e5),
    HOURS: Math.floor(d / 36e5) % 24,
    MINUTES: Math.floor(d / 6e4) % 60,
    SECONDS: Math.floor(d / 1e3) % 60,
  }
}

function Digit({ d }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={d}
          className="absolute inset-0 text-center"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown() {
  const [t, setT] = useState(remaining)
  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-cream pt-24">
      <Reveal className="text-center font-serif font-semibold leading-tight text-maroon" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
        {countdown.heading[0]}
        <br />
        <span className="font-script font-normal text-terracotta" style={{ fontSize: '1.25em' }}>
          {countdown.heading[1]}
        </span>
      </Reveal>
      <Reveal delay={0.1} className="mx-auto mt-5 w-[min(620px,88vw)] text-center font-serif text-xl text-ink">
        {countdown.sub}
      </Reveal>

      <Reveal className="mx-auto mt-6 w-[min(470px,70vw)]">
        <img src={images.line} alt="" className="w-full" />
      </Reveal>

      <Reveal className="relative z-10 mx-auto mt-10 grid w-[min(820px,94vw)] grid-cols-4 gap-2 sm:gap-5">
        {Object.entries(t).map(([label, v]) => (
          <div key={label} className="flex flex-col items-center rounded-2xl border border-gold/60 bg-white/60 py-4 shadow-md backdrop-blur">
            <div className="font-display text-terracotta" style={{ fontSize: 'clamp(30px, 7vw, 68px)', lineHeight: 1.1 }}>
              {String(v)
                .padStart(2, '0')
                .split('')
                .map((d, i) => (
                  <Digit key={i} d={d} />
                ))}
            </div>
            <div className="mt-1 font-serif text-xs tracking-[0.25em] text-ink sm:text-base">{label}</div>
          </div>
        ))}
      </Reveal>

      <div className="relative -mt-16 w-full sm:-mt-28">
        <img src={images.countdownBg} alt="" className="block w-full" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cream to-transparent" />
      </div>
    </section>
  )
}
