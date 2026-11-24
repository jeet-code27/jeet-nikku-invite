import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { images, story } from '../config.js'

const W = (f) => `calc(var(--W) * ${f})`

function Marquee() {
  const photos = [...images.gallery, ...images.gallery]
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex w-max"
        style={{ gap: W(0.02) }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-t-full border-[3px] border-gold bg-cream shadow-lg"
            style={{ width: W(0.185), aspectRatio: '0.7' }}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function MeetCouple() {
  return (
    <section className="relative overflow-hidden">
      <div className="stage" style={{ paddingTop: W(1.25), background: `linear-gradient(transparent ${W(2)}, #ffefe2 ${W(2)})` }}>
        <img src={images.mandapBg} alt="" className="pointer-events-none absolute inset-x-0 top-0 w-full" />

        <div className="relative z-[1]">
          <Reveal className="text-center font-serif font-semibold leading-tight text-maroon" style={{ fontSize: W(0.06) }}>
            Meet the
            <br />
            BRIDE &amp; GROOM
          </Reveal>

          <Reveal
            className="relative mx-auto mt-[calc(var(--W)*0.03)] [container-type:inline-size]"
            style={{ width: 'min(calc(var(--W) * 0.72), calc(100vw - 16px))' }}
          >
            <img src={images.storyFrame} alt="" className="w-full" />
            {/* Text scales with the frame (cqw) so it always stays between the two ornaments. */}
            <motion.p
              className="absolute inset-x-[12%] top-[31%] bottom-[26%] flex items-center justify-center text-center font-serif text-ink"
              style={{ fontSize: 'clamp(12.5px, 3cqw, 24px)', lineHeight: 1.42 }}
            >
              {story}
            </motion.p>
          </Reveal>

          <div className="mt-[calc(var(--W)*0.05)]">
            <img src={images.borderStrip} alt="" className="w-full" />
            <Marquee />
            <img src={images.borderStrip} alt="" className="w-full rotate-180" />
          </div>

          <Reveal className="relative mx-auto mt-[calc(var(--W)*0.04)] pb-[calc(var(--W)*0.06)]" style={{ width: 'min(calc(var(--W) * 0.85), 100vw)' }}>
            <div className="relative" style={{ aspectRatio: '864 / 592' }}>
              <div className="absolute inset-[4%] overflow-hidden">
                <motion.img
                  src={images.couplePhoto}
                  alt="The couple"
                  className="h-full w-full object-cover object-[50%_22%]"
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <img src={images.photoArch} alt="" className="absolute inset-0 h-full w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
