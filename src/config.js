// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to make the invitation yours.
//  Everything below is placeholder content from the reference site.
//  Images live in /public/placeholder — drop your own files in
//  /public/images and change the paths in `images` at the bottom.
// ─────────────────────────────────────────────────────────────

export const couple = {
  groom: 'Jeetendra',
  bride: 'Nikku',
}

// Used by the countdown and the date on the entry screen.
// Format: YYYY-MM-DDTHH:MM:SS+05:30 (IST)
export const weddingDate = '2027-03-09T00:00:00+05:30'

export const invocation = {
  title: '॥ श्री गणेशाय नमः ॥',
  shloka: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'],
}

export const family = {
  blessingsHeading: 'With The Blessings Of',
  blessings: ['Shri. Ashu Singh Rathore & Smt. Bhawar Kanwar'],
  inviteText:
    'With immense joy and happiness,\nthe Rathore Family invites you and your family to celebrate the wedding of their beloved son',
  groomParents: ['G/S/o. Shri. Ashu Singh Rathore & Smt. Bhawar Kanwar', 'S/o. Shri. Shivraj Singh Rathore & Smt. Prem Kanwar'],
  // Bride's family — left blank for now. Add lines like:
  // 'G/D/o. Shri. ... & Smt. ...', 'D/o. Shri. ... & Smt. ...'
  brideParents: [],
}

export const eventsIntro = {
  heading: 'A Journey of Celebration',
  sub: 'Mark Your Calendars, We Can’t Wait to Celebrate',
}

export const events = [
  { title: 'Ganesh Nimantran', subtitle: 'गणेश निमंत्रण', date: '5th Mar 2027, Friday', venue: 'Ghatwa, Rajasthan', time: '' },
  { title: 'Haldi', date: '8th Mar 2027, Monday', venue: 'Ghatwa, Rajasthan', time: '11 AM Onwards' },
  { title: 'Mayra', date: '8th Mar 2027, Monday', venue: 'Ghatwa, Rajasthan', time: '1 PM Onwards' },
  { title: 'Sangeet Night', date: '8th Mar 2027, Monday', venue: 'Ghatwa, Rajasthan', time: '7 PM Onwards' },
  { title: 'Preeti Bhoj', subtitle: 'प्रीतिभोज', date: '8th Mar 2027, Monday', venue: 'Ghatwa, Rajasthan', time: '' },
  { title: 'Barat Nikasi', date: '8th Mar 2027, Monday', venue: 'Ghatwa, Rajasthan', time: '2 PM Onwards' },
]

export const story =
  'Our hearts are full and our smiles wide, we can hardly believe our dreamy-eyed teen selves made it here! We’re ready to make memories that last a lifetime, and they’ll be incomplete without you by our side. Come celebrate our love, share our joy, eat till you can’t move and help us make this day a beautiful, laughter-filled blur we’ll never forget!'

export const venue = {
  heading: 'Looking forward to see you',
  name: 'Ghatwa, Rajasthan',
  address: '',
  phone: '7878253451',
  // Paste the "Share → Copy link" URL from Google Maps here:
  mapsLink: 'https://maps.google.com/?q=Ghatwa+Rajasthan',
  // What the embedded map searches for:
  mapQuery: 'Ghatwa, Rajasthan',
}

export const rsvp = {
  heading: 'Please confirm your presence',
  // WhatsApp number that receives RSVPs, with country code, digits only.
  whatsapp: '917878253451',
  maxPeople: 50,
}

export const countdown = {
  heading: ['The Countdown', 'to forever begins'],
  sub: 'Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives',
}

const P = '/placeholder/'
const ME = '/images/' // your own photos
export const images = {
  heroCouple: ME + 'hero-bw.webp',
  sky: P + 'sky.webp',
  sun: P + 'sun.webp',
  mountain: P + 'mountain.webp',
  clouds: P + 'clouds.webp',
  bellFrame: P + 'bell-frame.webp',
  floralArch: P + 'floral-arch.webp', // phone version of the top arch
  bell1: P + 'bell-1.webp',
  bell2: P + 'bell-2.webp',
  temple: P + 'temple.webp',
  flag: P + 'flag.webp',
  flagRod: P + 'flag-rod.webp',
  ganesh: P + 'ganesh.webp',
  peacockBg: P + 'peacock-bg.webp',
  peacockPillars: P + 'peacock-pillars.webp',
  eventCard: P + 'event-card.png',
  rayL1: P + 'ray-l1.webp',
  rayL2: P + 'ray-l2.webp',
  rayR: P + 'ray-r.webp',
  lotusDivider: P + 'lotus-divider.webp',
  mandapBg: P + 'mandap-bg.webp',
  storyFrame: P + 'story-frame.webp',
  borderStrip: P + 'border-strip.webp',
  gallery: ['ring', 'bride', 'couple-studio', 'groom', 'hero-bw'].map((n) => `${ME}${n}.webp`),
  couplePhoto: ME + 'couple-studio.webp',
  photoArch: P + 'photo-arch.png',
  divider: P + 'divider.webp',
  line: P + 'line.webp',
  countdownBg: P + 'countdown-bg.webp',
}

export const music = P + 'music.mp3'
