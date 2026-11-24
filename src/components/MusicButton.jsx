import { motion } from 'framer-motion'

export default function MusicButton({ playing, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center gap-[3px] rounded-full bg-maroon text-cream shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileTap={{ scale: 0.9 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-cream"
          animate={playing ? { height: [6, 18, 9, 15, 6] } : { height: 4 }}
          transition={playing ? { duration: 1, repeat: Infinity, delay: i * 0.15 } : { duration: 0.3 }}
        />
      ))}
    </motion.button>
  )
}
