import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Intro from './components/Intro.jsx'
import TempleScene from './components/TempleScene.jsx'
import Events from './components/Events.jsx'
import MeetCouple from './components/MeetCouple.jsx'
import Venue from './components/Venue.jsx'
import Countdown from './components/Countdown.jsx'
import MusicButton from './components/MusicButton.jsx'
import { music } from './config.js'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const lenis = new Lenis({ lerp: 0.08 })
    lenisRef.current = lenis
    if (import.meta.env.DEV) window.__lenis = lenis
    lenis.stop()
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  const enter = () => {
    setEntered(true)
    const a = audioRef.current
    if (a) {
      a.volume = 0.6
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
    // Let the opening animation play before the page can scroll.
    setTimeout(() => lenisRef.current?.start(), 2200)
  }

  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {})
    else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={music} loop preload="auto" />
      <Intro entered={entered} onEnter={enter} />
      <main>
        <TempleScene entered={entered} />
        <Events />
        <MeetCouple />
        <Venue />
        <Countdown />
      </main>
      {entered && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </>
  )
}
