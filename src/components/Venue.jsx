import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { events, images, rsvp, venue } from '../config.js'

function Divider({ flip }) {
  return (
    <Reveal className="mx-auto my-12 w-[min(680px,88vw)]">
      <img src={images.divider} alt="" className={'w-full' + (flip ? ' rotate-180' : '')} />
    </Reveal>
  )
}

function Rsvp() {
  const [name, setName] = useState('')
  const [event, setEvent] = useState('')
  const [people, setPeople] = useState(1)

  const send = (e) => {
    e.preventDefault()
    const lines = [
      'Hello! 🙏',
      `I'd love to confirm my presence${event ? ` for *${event}*` : ''}.`,
      name && `Name: ${name}`,
      `No. of people: ${people}`,
    ].filter(Boolean)
    window.open(`https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  const field =
    'w-full rounded-xl border border-gold/60 bg-white/70 px-4 py-3 font-serif text-lg text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20'

  return (
    <Reveal as="form" onSubmit={send} className="mx-auto flex w-[min(520px,90vw)] flex-col gap-4 rounded-3xl border border-gold/50 bg-[#fff7f0] p-7 shadow-[0_20px_60px_-20px_rgba(120,60,10,.35)]">
      <h3 className="text-center font-display text-3xl text-maroon">{rsvp.heading}</h3>
      <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className={field} value={event} onChange={(e) => setEvent(e.target.value)}>
        <option value="">Select Event</option>
        <option value="All events">All events</option>
        {events.map((ev) => (
          <option key={ev.title}>{ev.title}</option>
        ))}
      </select>
      <label className="flex items-center justify-between gap-4 font-serif text-lg">
        No. of People
        <select className={field + ' max-w-28'} value={people} onChange={(e) => setPeople(e.target.value)}>
          {Array.from({ length: rsvp.maxPeople }, (_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
      </label>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-serif text-xl font-semibold text-white shadow-md"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
        </svg>
        Send via WhatsApp
      </motion.button>
    </Reveal>
  )
}

export default function Venue() {
  return (
    <section className="relative bg-cream px-4 pt-16">
      <Reveal className="text-center font-script text-terracotta" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1 }}>
        {venue.heading}
      </Reveal>

      <Reveal className="mx-auto mt-10 w-[min(900px,92vw)] overflow-hidden rounded-[2rem] border-4 border-gold/70 shadow-xl">
        <iframe
          title="Venue map"
          className="block h-[clamp(280px,45vw,440px)] w-full"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=15&output=embed`}
        />
      </Reveal>

      <Reveal className="mt-8 text-center">
        <h3 className="font-display text-3xl text-maroon">{venue.name}</h3>
        {venue.address && <p className="mt-2 font-serif text-xl text-ink">{venue.address}</p>}
        {venue.phone && (
          <a href={`tel:${venue.phone}`} className="mt-1 block font-serif text-lg text-terracotta">
            {venue.phone}
          </a>
        )}
        <motion.a
          href={venue.mapsLink}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3 font-serif text-lg text-cream shadow-md"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          Open in Google Maps
        </motion.a>
      </Reveal>

      {/* RSVP is framed by the divider: flipped above, upright below (as in the reference). */}
      <Divider flip />
      <Rsvp />
      <Divider />
    </section>
  )
}
