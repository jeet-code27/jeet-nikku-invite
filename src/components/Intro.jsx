import { AnimatePresence, motion } from 'framer-motion'
import { couple, images, weddingDate } from '../config.js'

const prettyDate = new Date(weddingDate).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

function Arrow({ flip }) {
  return (
    <svg width="44" height="10" viewBox="0 0 44 10" className={flip ? 'rotate-180' : ''}>
      <path d="M0 5h40" stroke="currentColor" strokeWidth="1.2" />
      <path d="M36 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Intro({ entered, onEnter }) {
  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          key="intro"
          onClick={onEnter}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col overflow-hidden bg-[#efefef] md:flex-row"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="relative h-[58%] w-full md:h-full md:w-[55%]"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={images.heroCouple}
              alt=""
              className="h-full w-full object-cover object-[50%_8%] grayscale"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#efefef] via-transparent to-transparent md:bg-gradient-to-l" />
          </motion.div>

          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-black">
            <motion.h1
              className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-none font-medium"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {couple.groom} <em className="text-[0.55em] font-medium">weds</em> {couple.bride}
            </motion.h1>
            <motion.p
              className="mt-3 font-serif text-[clamp(1rem,1.6vw,1.35rem)] tracking-[0.25em]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75, duration: 1 }}
            >
              {prettyDate}
            </motion.p>
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                <Arrow />
              </motion.span>
              <motion.button
                className="rounded-full bg-black px-7 py-2.5 font-serif text-xl text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 0 0 rgba(0,0,0,.35)', '0 0 0 14px rgba(0,0,0,0)'] }}
                transition={{ boxShadow: { repeat: Infinity, duration: 1.8 } }}
              >
                Tap to Enter
              </motion.button>
              <motion.span animate={{ x: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                <Arrow flip />
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
