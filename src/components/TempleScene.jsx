import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Birds from './Birds.jsx'
import Reveal from './Reveal.jsx'
import { couple, family, images, invocation } from '../config.js'

// All sizes are fractions of the stage width W, so the scene scales as one picture.
const W = (f) => `calc(var(--W) * ${f})`
const u = (n) => `calc(var(--W) * ${n / 100})`
// Same, but never smaller than `min` px (keeps small text readable on phones).
const uf = (n, min) => `max(${u(n)}, ${min}px)`
// Fraction of the *visible* width, scaled up on phones (see --bell in index.css).
const V = (f) => `calc(var(--V) * ${f} * var(--bell))`

const TEMPLE_RATIO = 5187 / 1440 // height / width of temple.webp
// The arch is taller than the invitation text, so we hide a band of its plain lower
// border (between these fractions of the image height) to keep the spacing tight.
const CUT_FROM = 0.85
const CUT_TO = 0.975
const TEMPLE_OVERLAP = 0.36 // how far (in W) the temple tucks up into the sky block
const ease = [0.22, 1, 0.36, 1]

// Pixel measurements the scroll animation needs (mirrors the CSS --W clamp).
function useViewport() {
  const read = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = Math.min(Math.max(vw, 540), 1280) // keep in sync with --W in index.css
    // Phones: the whole temple is already up on the first screen (like the reference),
    // with its spire at ~40% of the screen height. Larger screens: it rises on scroll.
    const mobile = vw < 720
    const skyH = mobile ? vh * 0.4 + w * TEMPLE_OVERLAP : Math.max(vh, w * 0.66)
    const namesTop = mobile ? w * 0.17 : w * 0.1
    return { vh, w, mobile, skyH, namesTop, templeTop: skyH - w * TEMPLE_OVERLAP }
  }
  const [v, setV] = useState(read)
  useEffect(() => {
    const on = () => setV(read())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return v
}

const bells = [
  { src: images.bell2, left: '2%', w: 0.1, h: 0.3, delay: 0 },
  { src: images.bell1, left: '7.5%', w: 0.11, h: 0.26, delay: 0.4 },
  { src: images.bell1, right: '7.5%', w: 0.11, h: 0.26, delay: 0.2 },
  { src: images.bell2, right: '2%', w: 0.1, h: 0.3, delay: 0.6 },
]

function Bell({ b, entered }) {
  return (
    <motion.div
      className="absolute top-0 z-20"
      style={{ left: b.left, right: b.right, width: V(b.w), height: V(b.h), transformOrigin: '50% 0%' }}
      initial={{ y: '-100%' }}
      animate={entered ? { y: '0%' } : {}}
      transition={{ duration: 1.6, delay: 0.5 + b.delay * 0.5, ease }}
    >
      <motion.img
        src={b.src}
        alt=""
        className="h-full w-full object-contain object-top"
        style={{ transformOrigin: '50% 0%' }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 3.2 + b.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

// One line of the names: fades in on enter, then tilts and sinks behind the temple as you scroll.
function NameLine({ children, entered, delay, rotate, sink, progress, className, style }) {
  const r = useTransform(progress, [0, 1], [0, rotate])
  const y = useTransform(progress, [0, 1], [0, sink])
  const opacity = useTransform(progress, [0, 0.55, 1], [1, 0.85, 0])
  return (
    <motion.span className={'block ' + className} style={{ ...style, rotate: r, y, opacity }}>
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(10px)' }}
        animate={entered ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.6, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

function Names({ entered, progress, sink, top }) {
  const color = 'rgba(171, 86, 38, 0.78)'
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-[3] flex flex-col items-center text-center"
      style={{ top, color }}
    >
      <NameLine
        entered={entered}
        delay={1.1}
        rotate={40}
        sink={sink}
        progress={progress}
        className="font-names"
        style={{ fontSize: `min(${W(0.12)}, 15vw)`, lineHeight: 1 }}
      >
        {couple.groom}
      </NameLine>
      <NameLine
        entered={entered}
        delay={1.35}
        rotate={33}
        sink={sink * 0.95}
        progress={progress}
        className="font-script"
        style={{ fontSize: W(0.06), lineHeight: 1.1 }}
      >
        weds
      </NameLine>
      <NameLine
        entered={entered}
        delay={1.25}
        rotate={-40}
        sink={sink * 0.9}
        progress={progress}
        className="font-names"
        style={{ fontSize: `min(${W(0.12)}, 15vw)`, lineHeight: 1 }}
      >
        {couple.bride}
      </NameLine>
    </div>
  )
}

function Flag({ entered }) {
  return (
    <motion.div
      className="absolute left-1/2 z-10"
      style={{ top: W(-0.098), width: W(0.02), height: W(0.105), marginLeft: W(-0.01) }}
      initial={{ opacity: 0, y: 30 }}
      animate={entered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 1.6 }}
    >
      <img src={images.flagRod} alt="" className="h-full w-full object-fill" />
      <motion.img
        src={images.flag}
        alt=""
        className="absolute"
        style={{ left: '50%', top: '4%', width: W(0.085), transformOrigin: '0% 50%' }}
        animate={{ skewY: [0, -4, 2, -3, 0], scaleX: [1, 0.94, 1, 0.96, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function ArchContent() {
  return (
    <div
      className="absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center justify-between text-center"
      style={{
        top: W(TEMPLE_RATIO * 0.352),
        paddingTop: u(5), // gap between the arch's peak and "श्री गणेशाय नमः"
        bottom: W(0.46), // stays clear of the peacock garden that overlaps the temple's base
        width: `min(68%, calc(100vw - 40px))`,
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: u(1.6) }}>
        <Reveal className="font-deva text-terracotta" style={{ fontSize: uf(3, 16) }}>
          {invocation.title}
        </Reveal>
        <Reveal delay={0.1}>
          <motion.img
            src={images.ganesh}
            alt="Shri Ganesh"
            style={{ width: uf(9, 52) }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Reveal>
        <Reveal delay={0.2} className="font-deva leading-relaxed text-terracotta" style={{ fontSize: uf(2.6, 15) }}>
          {invocation.shloka.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Reveal>
      </div>

      <div className="flex flex-col items-center" style={{ gap: u(1.2) }}>
        <Reveal className="font-serif font-semibold italic text-maroon" style={{ fontSize: uf(3, 17) }}>
          {family.blessingsHeading}
        </Reveal>
        <Reveal delay={0.1} className="font-serif text-ink" style={{ fontSize: uf(2.3, 13.5) }}>
          {family.blessings.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Reveal>
      </div>

      <Reveal className="font-serif whitespace-pre-line text-ink" style={{ fontSize: uf(2.5, 14.5), lineHeight: 1.45 }}>
        {family.inviteText}
      </Reveal>

      <div className="flex flex-col items-center" style={{ gap: u(1.5) }}>
        <Reveal y={60} className="font-names text-terracotta" style={{ fontSize: `min(${u(12)}, 15vw)`, lineHeight: 1 }}>
          {couple.groom}
        </Reveal>
        <Reveal delay={0.1} className="font-serif text-ink" style={{ fontSize: uf(2.2, 13) }}>
          {family.groomParents.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Reveal>
        <Reveal className="font-script text-terracotta" style={{ fontSize: uf(7, 38), lineHeight: 1 }}>
          with
        </Reveal>
        <Reveal y={60} className="font-names text-terracotta" style={{ fontSize: `min(${u(12)}, 15vw)`, lineHeight: 1 }}>
          {couple.bride}
        </Reveal>
        {family.brideParents.length > 0 && (
          <Reveal delay={0.1} className="font-serif text-ink" style={{ fontSize: uf(2.2, 13) }}>
            {family.brideParents.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </Reveal>
        )}
      </div>
    </div>
  )
}

export default function TempleScene({ entered }) {
  const { vh, w, mobile, skyH, namesTop, templeTop } = useViewport()
  const { scrollY } = useScroll()

  // The opening scroll: over this many pixels the temple rises into place
  // and the names sink behind it. Scrolling back up plays it in reverse.
  const range = vh * 0.6
  const progress = useTransform(scrollY, [0, range], [0, 1], { clamp: true })

  // At the top of the page only the spire + flag peek above the bottom edge.
  // (On phones everything starts in place; only the names sink on scroll.)
  const rise = mobile ? 0 : 1
  const templeStart = rise * Math.max(0, vh - w * 0.11 - templeTop)
  const templeY = useTransform(progress, [0, 1], [templeStart, 0])
  const mountainY = useTransform(progress, [0, 1], [rise * w * 0.3, 0])
  const cloudY = useTransform(progress, [0, 1], [rise * w * 0.42, 0])
  const sunY = useTransform(progress, [0, 1], [rise * w * 0.25, 0])
  const skyY = useTransform(scrollY, [0, 1200], [0, 420])

  // How far the names drop so they end up hidden behind the temple building.
  const namesSink = templeTop - namesTop + w * 0.22

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#ecd9cd,#f3e0c9_40%,#ffefe2)]">
      <div className="stage">
        {/* ── Sky ─────────────────────────────── */}
        <div className="relative" style={{ height: skyH }}>
          <motion.img
            src={images.sky}
            alt=""
            className="absolute inset-x-0 top-0 h-[130%] w-full object-cover"
            style={{ y: skyY }}
          />

          <motion.div className="absolute left-1/2" style={{ y: sunY, bottom: W(0.08), width: W(0.5), marginLeft: W(-0.25) }}>
            <motion.img
              src={images.sun}
              alt=""
              className="w-full"
              initial={{ y: '80%', opacity: 0, scale: 0.6 }}
              animate={entered ? { y: '0%', opacity: 1, scale: 1 } : {}}
              transition={{ duration: 2.4, delay: 0.3, ease }}
            />
          </motion.div>

          <motion.div className="absolute inset-x-0" style={{ y: mountainY, top: `calc(100% - ${W(0.62)})` }}>
            <motion.img
              src={images.mountain}
              alt=""
              className="w-full"
              initial={{ y: W(0.4) }}
              animate={entered ? { y: 0 } : {}}
              transition={{ duration: 2.2, delay: 0.2, ease }}
            />
          </motion.div>

          <motion.div className="absolute inset-x-0" style={{ y: cloudY, top: `calc(100% - ${W(0.7)})` }}>
            <motion.img
              src={images.clouds}
              alt=""
              className="w-full opacity-80"
              initial={{ y: W(0.5), opacity: 0 }}
              animate={entered ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2.6, delay: 0.1, ease }}
            />
          </motion.div>

          {entered && (
            <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 2 }}>
              <Birds />
            </motion.div>
          )}

          {/* Names sit in front of the mountains but behind the temple (z 3 < 5). */}
          <Names entered={entered} progress={progress} sink={namesSink} top={namesTop} />
        </div>

        {/* ── Temple: rises out of the bottom edge as you scroll ── */}
        <motion.div className="relative z-[5]" style={{ marginTop: W(-TEMPLE_OVERLAP), y: templeY }}>
          <motion.div
            initial={{ y: W(0.25) }}
            animate={entered ? { y: 0 } : {}}
            transition={{ duration: 2.4, delay: 0.35, ease }}
          >
            <Flag entered={entered} />
            <div className="overflow-hidden" style={{ height: W(TEMPLE_RATIO * CUT_FROM) }}>
              <img src={images.temple} alt="" className="block w-full" />
            </div>
            <div className="relative overflow-hidden" style={{ height: W(TEMPLE_RATIO * (1 - CUT_TO)) }}>
              <img src={images.temple} alt="" className="absolute bottom-0 left-0 block w-full" />
            </div>
            <ArchContent />
          </motion.div>
        </motion.div>
      </div>

      {/* Floral arch + bells are sized to the visible screen (not the wider stage),
          so on phones the corners and bells stay on screen. */}
      <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2" style={{ width: 'var(--V)' }}>
        <motion.div
          style={{ transformOrigin: '50% 0%' }}
          initial={{ scale: 2.3 }}
          animate={entered ? { scale: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Wide screens: low arch with corner flowers. Phones: taller arch with flowers down the sides. */}
          <img src={images.bellFrame} alt="" className="hidden w-full min-[720px]:block" />
          <img src={images.floralArch} alt="" className="w-full min-[720px]:hidden" />
        </motion.div>
        {bells.map((b, i) => (
          <Bell key={i} b={b} entered={entered} />
        ))}
      </div>
    </section>
  )
}
