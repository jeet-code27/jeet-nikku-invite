import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { events, eventsIntro, images } from '../config.js'

const W = (f) => `calc(var(--W) * ${f})`

function EventCard({ e, i }) {
  return (
    <motion.div
      className="relative [container-type:inline-size]"
      initial={{ opacity: 0, y: 80, rotateX: 35, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay: (i % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ transformPerspective: 900 }}
    >
      <img src={images.eventCard} alt="" className="w-full drop-shadow-[0_12px_24px_rgba(120,60,10,.25)]" />
      <div className="absolute inset-x-[12%] top-[17%] bottom-[38%] flex flex-col items-center justify-center text-center">
        <h3 className="font-serif font-semibold text-[#7c2e12]" style={{ fontSize: '15cqw', lineHeight: 1.05 }}>
          {e.title}
        </h3>
        {e.subtitle && (
          <p className="font-deva text-terracotta" style={{ fontSize: '7.4cqw' }}>
            {e.subtitle}
          </p>
        )}
        <p className="mt-[4cqw] font-serif font-semibold text-ink" style={{ fontSize: '7.4cqw' }}>
          {e.date}
        </p>
        <p className="font-serif text-ink" style={{ fontSize: '6.6cqw' }}>
          {e.venue}
        </p>
        {e.time && (
          <p className="font-serif text-ink" style={{ fontSize: '6.6cqw' }}>
            {e.time}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Events() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const pillarsY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-12%'])
  const raysRotate = useTransform(scrollYProgress, [0, 1], [-10, 10])

  return (
    <section ref={ref} className="relative z-10 overflow-hidden" style={{ marginTop: W(-0.75) }}>
      <div className="stage" style={{ paddingTop: W(1.45), background: `linear-gradient(transparent ${W(2)}, #e5c08a ${W(2)})` }}>
        {/* Domes sit behind; the peacock garden comes in front of them. */}
        <motion.img
          src={images.peacockPillars}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] w-full"
          style={{ y: pillarsY }}
        />
        <img src={images.peacockBg} alt="" className="pointer-events-none absolute inset-x-0 z-[2] w-full" style={{ top: W(0.1) }} />

        {/* Sun-ray ornaments on the side pillars */}
        {[0, 1, 2].map((k) => (
          <motion.img
            key={'l' + k}
            src={k === 2 ? images.rayL2 : images.rayL1}
            alt=""
            className="absolute left-0 z-[3]"
            style={{ top: W(1.75 + k * 0.62), width: W(0.16), rotate: raysRotate }}
          />
        ))}
        {[0, 1, 2].map((k) => (
          <motion.img
            key={'r' + k}
            src={images.rayR}
            alt=""
            className="absolute right-0 z-[3]"
            style={{ top: W(1.75 + k * 0.62), width: W(0.16), rotate: raysRotate }}
          />
        ))}

        <div className="relative z-[4] mx-auto pb-[calc(var(--W)*0.12)]" style={{ width: 'min(76%, calc(100vw - 28px))' }}>
          <Reveal className="text-center font-display text-maroon" style={{ fontSize: W(0.055) }}>
            {eventsIntro.heading}
          </Reveal>
          <Reveal delay={0.1} className="mt-2 text-center font-serif text-ink italic" style={{ fontSize: W(0.024) }}>
            {eventsIntro.sub}
          </Reveal>

          <div
            className="mt-[calc(var(--W)*0.05)] grid grid-cols-2 sm:grid-cols-3"
            style={{ columnGap: W(0.035), rowGap: W(0.045) }}
          >
            {events.map((e, i) => (
              <EventCard key={e.title + i} e={e} i={i} />
            ))}
          </div>

          <Reveal className="mx-auto mt-[calc(var(--W)*0.06)]" style={{ width: W(0.38) }}>
            <img src={images.lotusDivider} alt="" className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
