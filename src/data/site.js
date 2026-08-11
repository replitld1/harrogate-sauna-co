const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten']
const numberWord = (n) => WORDS[n] ?? String(n)

export const cta = {
  // One verb for the whole funnel. Every entry point promises the same thing,
  // because the thing it promises IS the positioning.
  label: 'Book the walk-round',
  short: 'Book walk-round',
  under: 'Twenty minutes on FaceTime. No deposit.',
}

export const brand = {
  name: 'The Harrogate Sauna Co',
  wordmark: ['Harrogate', 'Sauna Co'],
  short: 'HSC',
  tagline: 'Hand-built cedar saunas',
  place: 'Harrogate, North Yorkshire',
  phone: '+44 (0)1423 647482',
  email: 'workshop@harrogatesauna.co',
  address: ['Manor Farm', 'Crag Lane', 'Harrogate', 'HG3 2BD'],
  from: '£20,000',
}

// The scarcity numbers are quoted in several places — keep them here so they
// cannot drift apart. Update `sold` as slots go.
export const year = {
  current: 2026,
  capacity: 10,
  sold: 6,
  get remaining() {
    return this.capacity - this.sold
  },
}

// Vite rewrites asset imports and index.html for the base path, but not string
// literals like these, so public-directory paths have to be composed by hand.
// Without this the clips 404 on any deployment served from a subpath.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/([^:])\/{2,}/g, '$1/')

// Looping shots. Each is a slow move — the page adds a second, slower drift on top.
export const film = {
  hero: { src: asset('videos/hero-dusk.mp4'), poster: asset('frames/hero-poster.webp'), scrim: 'left', opacity: 0.72, pan: 'pan-in', duration: 44 },
  loyly: { src: asset('videos/loyly-stones.mp4'), poster: asset('frames/loyly-poster.webp'), scrim: 'base', opacity: 0.74, pan: 'pan-up', duration: 34 },
  interior: { src: asset('videos/cabin-interior.mp4'), poster: asset('frames/huum-room.webp'), scrim: 'base', opacity: 0.78, still: true, pan: 'pan-left', duration: 40 },
  workshop: { src: asset('videos/workshop-cedar.mp4'), poster: asset('frames/craft-poster.webp'), scrim: 'full', opacity: 0.34, pan: 'pan-out', duration: 46 },
  night: { src: asset('videos/night-orbit.mp4'), poster: asset('frames/night-poster.webp'), scrim: 'full', opacity: 0.4, pan: 'pan-left', duration: 42 },
}

export const panels = {
  loyly: {
    id: 'loyly',
    film: film.loyly,
    eyebrow: 'Löyly',
    title: 'Water meets',
    emphasis: 'stone.',
    body: 'A HUUM HIVE carries two hundred and fifty kilos of olivine diabase, held at temperature for hours. Mass like that gives steam that rolls across the room and settles, instead of the thin scald you get off a light heater.',
    facts: [
      { label: 'Stone mass', value: '250kg' },
      { label: 'Hold', value: '4 hours' },
    ],
  },
  interior: {
    id: 'interior',
    film: film.interior,
    eyebrow: 'The room',
    title: 'Built around',
    emphasis: 'the heater.',
    body: 'The HUUM sits in a cedar cradle on the wall, not bolted to the floor, so the boards run unbroken underneath and there is no joint for water to sit in. The light is a concealed LED above the bench line — nothing in the hot zone to replace, and no bulb pointing at you.',
    facts: [
      { label: 'Heater', value: 'HUUM DROP' },
      { label: 'Light', value: '2200K LED' },
    ],
  },
}

export const nav = [
  { label: 'The Cabin', href: '#cabin' },
  { label: 'Collection', href: '#collection' },
  { label: 'Dimensions', href: '#dimensions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Craft', href: '#craft' },
  { label: 'Specification', href: '#specification' },
  { label: 'Questions', href: '#questions' },
]

export const heroStats = [
  { value: '10', label: 'Builds a year' },
  { value: `${year.remaining}`, label: `Slots left in ${year.current}` },
  { value: '20 yr', label: 'Cedar warranty' },
]

export const marqueeItems = [
  'Western red cedar, coastal British Columbia',
  'Kiln dried to 12% moisture',
  'Joiners with 30–40 years on the tools',
  'HUUM DROP, CLIFF & HIVE',
  'Geofenced pre-heat',
  'LED-lit, no bulbs in the heat',
  'In-house technology team',
  'Hand-cut mortise & tenon',
  'Harrogate workshop',
  'Ten builds a year, no more',
]

// Hotspots are placed in the coordinate space of the cutaway drawing (1000 × 620)
export const hotspots = [
  {
    id: 'cladding',
    short: 'Cladding',
    x: 105,
    y: 152,
    title: 'British Columbian western red cedar',
    body: 'Vertical boards of clear-grade western red cedar off the British Columbian coast — the tree\u2019s native range, and the grade the timber trade measures every other cedar against. Slow-grown, tight-ringed and knot-free. Rain-screened on battens with a ventilated cavity behind.',
    spec: '19mm · knot-free',
  },
  {
    id: 'envelope',
    short: 'Envelope',
    x: 154,
    y: 336,
    title: 'Six-layer thermal envelope',
    body: 'Cedar, cavity, foil vapour barrier, 100mm rock wool, structural ply, and a second cavity. The cabin holds 90°C for four hours on residual heat alone.',
    spec: 'U-value 0.18',
  },
  {
    id: 'heater',
    short: 'Heater',
    x: 339,
    y: 392,
    title: 'HUUM, and only HUUM',
    body: 'A DROP in the smaller cabins, a CLIFF or a HIVE in the larger ones. HUUM size every heater to a room volume rather than a floor area, which is the same way we size a cabin — so the cabin and the heater are specified off one number instead of two guesses.',
    spec: 'DROP · CLIFF · HIVE',
  },
  {
    id: 'benches',
    short: 'Benches',
    x: 700,
    y: 352,
    title: 'Floating abachi benches',
    body: 'Abachi stays cool to the touch at 100°C. Two tiers, cantilevered from a hidden steel spine so nothing interrupts the floor.',
    spec: '2 tiers · 4 seats',
  },
  {
    id: 'glass',
    short: 'Glazing',
    x: 868,
    y: 300,
    title: 'Full-height glazing',
    body: 'A single pane of 8mm low-iron float glass, thermally toughened and set in a cedar frame with a concealed hinge. No visible hardware inside.',
    spec: '8mm · low-iron',
  },
  {
    id: 'roof',
    short: 'Roof',
    x: 520,
    y: 106,
    title: 'Standing-seam roof',
    body: 'Zinc, folded on site, with a 60mm overhang that throws water clear of the cladding. It will outlast the people who bought it.',
    spec: 'Zinc · 0.7mm',
  },
]

export const models = [
  {
    id: 'stray',
    name: 'Stray',
    seats: 'Two to three',
    footprint: '2.1 × 1.9 m',
    price: '£20,000',
    image: asset('frames/stray-exterior.webp'),
    alt: 'The Stray at dusk — a cedar cube with one lit glazed wall, standing in wet grass.',
    note: 'The original. A cube of cedar with one glazed wall, sized for a courtyard or the end of a town garden.',
    features: ['HUUM DROP 6', 'Single glazed wall', 'Two bench tiers'],
  },
  {
    id: 'nidd',
    name: 'Nidd',
    seats: 'Four to five',
    footprint: '3.0 × 2.2 m',
    price: '£29,000',
    image: asset('frames/huum-heater.webp'),
    alt: 'A HUUM DROP heater in its cedar cradle inside a Nidd, with the bucket and ladle on the bench beside it.',
    note: 'A longer cabin with a covered threshold — somewhere to stand, cool, and go back in. Our most requested build.',
    features: ['HUUM CLIFF 11', 'Covered threshold', 'Corner glazing'],
    featured: true,
  },
  {
    id: 'fountains',
    name: 'Fountains',
    seats: 'Six to eight',
    footprint: '4.2 × 2.4 m',
    price: '£37,000',
    image: asset('frames/fountains-exterior.webp'),
    alt: 'The Fountains at night, lit from within, seen across the garden.',
    note: 'Bath house proportions. A HIVE holding a quarter of a tonne of stone, a cold plunge bay, and a bench that runs the full length.',
    features: ['HUUM HIVE 15', 'Plunge bay', 'Full-length bench'],
  },
]

// Every figure a customer needs before they can commit — and the one number
// that decides the groundwork: none of them reaches a tonne.
export const dimensions = {
  columns: ['Stray', 'Nidd', 'Fountains'],
  rows: [
    { label: 'External footprint', values: ['2.10 × 1.90 m', '3.00 × 2.20 m', '4.20 × 2.40 m'] },
    { label: 'External height', values: ['2.30 m', '2.30 m', '2.45 m'] },
    { label: 'Internal head height', values: ['2.05 m', '2.05 m', '2.15 m'] },
    { label: 'Door opening', values: ['700 × 1900 mm', '700 × 1900 mm', '800 × 1900 mm'] },
    { label: 'Dry weight', values: ['640 kg', '810 kg', '980 kg'] },
    { label: 'Access width needed', values: ['2.40 m', '2.60 m', '2.80 m'] },
    { label: 'Heater', values: ['HUUM DROP 6', 'HUUM CLIFF 11', 'HUUM HIVE 15'] },
    { label: 'Electrical supply', values: ['32A single phase', '16A three phase', '25A three phase'] },
    { label: 'Seats', values: ['2–3', '4–5', '6–8'] },
  ],
}

export const bespoke = {
  price: '£10,000',
  title: 'Or the size you actually need.',
  body: 'If none of the three fits the space, we will draw one that does. That is a full CAD model, a photo-real render of the cabin in your garden, structural calculations, a revised heat load, and the plotting and planning time to prove it before a board is cut.',
  includes: [
    'Full CAD model & technical drawings',
    'Photo-real render sited in your garden',
    'Structural and heat-load calculations',
    'Revised electrical and base specification',
  ],
  note: 'Charged on top of the nearest standard cabin. It adds four to six weeks before the build slot opens, so bespoke enquiries need to start earlier in the year.',
}

// The customer's half of the job. Stated plainly — these are the two things
// that hold up a delivery when they are left to the last week.
export const siting = [
  {
    n: '01',
    title: 'The electrical supply',
    body: 'You arrange a qualified electrician. The Stray runs on a dedicated 32A single-phase supply on its own RCBO. The Nidd and the Fountains use HUUM CLIFF and HIVE units, which are three-phase — so if the house is single-phase only, that is a conversation to have with your DNO early rather than late. We send the full HUUM schedule after the consultation so your electrician can price it.',
    meta: 'Your electrician',
  },
  {
    n: '02',
    title: 'The base',
    body: 'Two options, both fine. Plastic grid mats filled with clean stone, which drain freely and can be lifted later. Or a concrete sub-base if you want it permanent. Every cabin comes in under a tonne, so no piling and no engineered raft.',
    meta: 'Under 1 tonne',
  },
  {
    n: '03',
    title: 'Never straight onto grass',
    body: 'Turf holds water against the bearers and the ground moves through the year. It will take the door out of square within a season. This is the one thing we will not deliver onto.',
    meta: 'Non-negotiable',
  },
]

export const tech = {
  eyebrow: 'Technology',
  title: 'It is warm before',
  emphasis: 'you are home.',
  body: 'Every cabin ships with our own controller and an app that is supported by the technology team here in Harrogate — not a reseller, not an overseas call centre. If your garden Wi-Fi will not reach the bottom of the plot, that is our problem to solve, and we solve it on the day we deliver.',
  features: [
    {
      id: 'geofence',
      title: 'Geofenced pre-heat',
      body: 'Set a radius around home. When you cross it on the way back from work the heater starts by itself, and the cabin is at 90°C as you pull onto the drive. No app to remember, no guessing at thirty-five minutes.',
      spec: 'Automatic',
    },
    {
      id: 'wifi',
      title: 'Connectivity, handled',
      body: 'Gardens are where Wi-Fi goes to die. We survey the signal at the end of the plot before delivery and fit a mesh point or an outdoor bridge if it is needed. Included, not an extra.',
      spec: 'In-house team',
    },
    {
      id: 'schedule',
      title: 'Schedules & remote start',
      body: 'Set a standing Tuesday and Thursday, or start it from anywhere. Temperature, stone temperature and door state are all live in the app.',
      spec: 'iOS & Android',
    },
    {
      id: 'watch',
      title: 'It tells us first',
      body: 'The controller reports faults back to the workshop. Most of the time we know a heater element is failing before you do, and we call you.',
      spec: 'Monitored',
    },
  ],
}

// FAQ #11 carried the truest sentence about the product; it is the design's
// idea now, not its last footnote. Four stops from fresh-sawn to silvered.
export const silvering = {
  title: 'It is meant to',
  emphasis: 'go grey.',
  body: 'Cedar does not need treating, and we would rather you left it alone. Over three or four winters the honey goes out of it and it silvers to the colour of the drystone it sits near. Every cabin we have built is somewhere on this line.',
  stops: [
    { at: 'Year 0', hex: '#c98f5a', label: 'Fresh sawn', note: 'Straight off the moulder, still full of oil.' },
    { at: 'Year 1', hex: '#b07d52', label: 'First winter', note: 'The red deepens before it starts to leave.' },
    { at: 'Year 2', hex: '#95867a', label: 'Turning', note: 'Grey arrives on the weather side first.' },
    { at: 'Year 4', hex: '#9a958c', label: 'Silvered', note: 'Where it stays. No oil, no maintenance, no rot.' },
  ],
  note: 'If you want the red held, we oil it annually and cover it on the service visit. Most people stop asking after the second year.',
}

export const seal = {
  title: 'The seal',
  lines: ['30–40 years', 'on the tools'],
  claims: [
    'Two joiners per cabin, no subcontractors',
    'Kiln dried to 12% — a 20 year cedar warranty',
    'Ten builds a year and not one more',
    'Every cabin signed by the pair who built it',
  ],
}

export const process = [
  {
    n: '01',
    title: 'A FaceTime walk-round',
    body: 'We do the first consultation over FaceTime. You walk us round the garden on the phone and we read the space with you — where the light lands, where the door should face, how we get a cabin down the side of the house. Twenty minutes, no deposit, no salesman on your drive.',
    meta: 'Week 0',
  },
  {
    n: '02',
    title: 'Drawings and your slot',
    body: 'We send the layout, the base specification and the electrical schedule for your electrician to price. When you are happy, a deposit holds one of the ten build slots for the year.',
    meta: 'Week 1',
  },
  {
    n: '03',
    title: 'Selecting the timber',
    body: 'Your cabin is cut from one parcel of coastal British Columbian western red cedar, kiln dried to 12% so it is stable before it is ever cut. You are welcome to come to Crag Lane and choose it.',
    meta: 'Weeks 2–3',
  },
  {
    n: '04',
    title: 'The build',
    body: 'One cabin, two joiners, twelve weeks. Both of them have thirty to forty years on the tools. Photographed each Friday and sent to you. Nothing is subcontracted and nothing is rushed.',
    meta: 'Weeks 4–15',
  },
  {
    n: '05',
    title: 'Delivery, commissioning & first fire',
    body: 'Craned in fully assembled, connected to the supply your electrician has run, signal tested, app paired and geofence set. Then we light it and stay for the first session, because the first löyly should not be taken alone.',
    meta: 'Week 16',
  },
]

export const specification = [
  { group: 'Structure', rows: [
    ['Frame', 'Kiln-dried Scandinavian redwood, 95 × 45mm'],
    ['Cladding', 'Western red cedar, coastal British Columbia, clear grade, 19mm'],
    ['Moisture content', 'Kiln dried to 12% before machining'],
    ['Insulation', '100mm rock wool, foil vapour barrier'],
    ['Roof', 'Standing-seam zinc, 0.7mm, 60mm overhang'],
  ]},
  { group: 'Interior', rows: [
    ['Lining', 'Thermally treated aspen, 15mm'],
    ['Benches', 'Abachi, cantilevered, two tiers'],
    ['Lighting', 'Concealed 2200K LED strip, dimmable — no bulbs, no heat'],
    ['Door', '8mm low-iron toughened glass, cedar frame'],
  ]},
  { group: 'Heat & power', rows: [
    ['Heater', 'HUUM — DROP 6 (Stray) · CLIFF 11 (Nidd) · HIVE 15 (Fountains)'],
    ['Stone', 'HUUM olivine diabase — 55kg (DROP) to 250kg (HIVE)'],
    ['Time to 90°C', '35 minutes from cold'],
    ['Supply', '32A 230V single phase (Stray) · 16A/25A 400V three phase (Nidd, Fountains)'],
  ]},
  { group: 'Technology', rows: [
    ['Control', 'HSC controller, iOS & Android app'],
    ['Geofencing', 'Automatic pre-heat on approach'],
    ['Connectivity', 'Site survey and mesh point included'],
    ['Support', 'In-house team, Harrogate'],
  ]},
  { group: 'Ownership', rows: [
    ['Cedar warranty', '20 years'],
    ['Heater warranty', '10 years'],
    ['Service', 'Annual visit, first five years included'],
    ['Lead time', '16 weeks from deposit'],
    ['Delivery', 'Fully assembled, craned, UK mainland'],
  ]},
]

// Heater sizing — HUUM's own published ratings, not a curve of ours.
//
// Every HUUM heater is rated for a room-volume band. We pick the smallest unit
// whose band still covers the cabin once the target temperature is accounted
// for: running hotter than 90C effectively makes the room bigger to the heater,
// so volume is scaled ~1.2% per degree before the lookup.
//
// Figures from huum.eu product pages (DROP / CLIFF / HIVE), August 2026.
export const cabinVolumes = [
  { id: 'stray', name: 'Stray', m3: 8.2, dims: '2.10 × 1.90 × 2.05 m' },
  { id: 'nidd', name: 'Nidd', m3: 13.5, dims: '3.00 × 2.20 × 2.05 m' },
  { id: 'fountains', name: 'Fountains', m3: 21.7, dims: '4.20 × 2.40 × 2.15 m' },
]

export const heaters = [
  {
    id: 'drop6', name: 'HUUM DROP 6', kw: 6, min: 5, max: 9, stones: '55 kg',
    supply: '32A single phase',
    note: 'A steel basket of stone in a cedar cradle, and what we fit in the Stray. The largest HUUM that still runs off an ordinary single-phase supply at 32A.',
  },
  {
    id: 'drop9', name: 'HUUM DROP 9', kw: 8.5, min: 8, max: 13, stones: '55 kg',
    supply: '40A single phase',
    note: 'The same drop-shaped basket with more element behind it. Worth it if you want the top rung fast, or if the cabin has a lot of glass.',
  },
  {
    id: 'cliff11', name: 'HUUM CLIFF 11', kw: 10.5, min: 10, max: 16, stones: '75 kg',
    supply: '16A three phase',
    note: 'A taller column holding seventy-five kilos. Three-phase only — worth knowing before your electrician quotes.',
  },
  {
    id: 'hive12', name: 'HUUM HIVE 12', kw: 12, min: 12, max: 18, stones: '250 kg',
    supply: '20A three phase',
    note: 'The HIVE buries a quarter of a tonne of stone under the bench. Steam that rolls instead of bites, and it holds long after it cuts out.',
  },
  {
    id: 'hive15', name: 'HUUM HIVE 15', kw: 15, min: 15, max: 23, stones: '250 kg',
    supply: '25A three phase',
    note: 'What we fit in the Fountains. Same 250kg of stone, enough element to bring a bath-house-sized room up in one go.',
  },
  {
    id: 'hive18', name: 'HUUM HIVE 18', kw: 18, min: 18, max: 28, stones: '250 kg',
    supply: '32A three phase',
    note: 'The largest we will fit. Past this you are into commercial territory and a different conversation.',
  },
]

export const thermostat = {
  title: 'Which HUUM',
  emphasis: 'you actually need.',
  body: 'We fit HUUM and nothing else. Spin the dial to the temperature you want to sit at, pick the cabin, and this reads straight off HUUM\u2019s own volume ratings — the same lookup we do on the phone.',
  min: 60,
  max: 110,
  start: 90,
  note: 'HUUM rate every heater for a room-volume band. Running hotter than 90°C makes the room effectively bigger, which is why the answer moves as you turn the dial.',
}

// Target temperature makes the room effectively larger or smaller to the heater.
export const effectiveVolume = (m3, target) => +(m3 * (1 + (target - 90) * 0.012)).toFixed(1)

// Smallest HUUM whose published band still covers the room.
export const heaterFor = (m3, target) => {
  const v = effectiveVolume(m3, target)
  return heaters.find((h) => v <= h.max) ?? heaters[heaters.length - 1]
}

// HUUM quote roughly 30–40 minutes to temperature on a correctly matched unit.
export const timeToTemp = (m3, target, heater) => {
  const v = effectiveVolume(m3, target)
  const headroom = Math.min(1.5, Math.max(0.7, heater.max / v))
  return Math.round(((35 * (target - 15)) / 75 / headroom) * 1.05)
}

export const ladder = [
  {
    temp: '60°',
    name: 'The lower bench',
    body: 'Dry, patient heat. Twenty minutes here before the body agrees to anything warmer.',
  },
  {
    temp: '80°',
    name: 'Löyly',
    body: 'A ladle of water across the stones. The room turns humid for ninety seconds, then lets go.',
  },
  {
    temp: '95°',
    name: 'The top tier',
    body: 'Where the air stops being comfortable and starts being useful. Eight minutes, then cold water.',
  },
]

export const testimonial = {
  quote:
    'We had been told it would be the most expensive thing in the garden. Two winters on, it is the only thing in the garden we use every week.',
  name: 'Marianne & Tom H.',
  place: 'Nidd — Wetherby, 2024',
}

export const faqs = [
  {
    q: 'How long is the wait, and when should I order?',
    a: `Sixteen weeks from deposit to first fire. We build ten cabins a year and ${numberWord(year.sold)} of the ${year.current} slots have gone, so ${numberWord(year.remaining)} remain. Order in the spring for the same year; from about August the deposit rolls into the following year's list. Bespoke sizing adds four to six weeks of drawing before the build slot even opens, so those need to start earlier.`,
  },
  {
    q: 'Where does the cedar come from?',
    a: 'Coastal British Columbia. That is western red cedar\u2019s native range, and BC coastal stock is the benchmark the rest of the trade is graded against — slow-grown, tight-ringed, clear of knots, and naturally durable without any treatment because of the oils the tree makes for itself. We buy clear grade and then kiln dry it to 12% ourselves, so it is stable before a single board is machined. That is why we are comfortable putting twenty years on it.',
  },
  {
    q: 'What do I need to sort before delivery?',
    a: 'Two things, and both want starting early. Electrics: the Stray takes a dedicated 32A single-phase supply, while the Nidd and Fountains use three-phase HUUM units (16A and 25A at 400V). If your house is single-phase only, tell us at the consultation — it changes which cabin makes sense. And a base, either plastic grid mats filled with stone or a concrete sub-base. What we will not do is set a cabin straight onto grass.',
  },
  {
    q: 'Do you come out to look at the garden?',
    a: 'We do the first consultation over FaceTime instead. You walk us round on the phone and we read the light, the access and the fall of the ground with you. It takes twenty minutes rather than half a day, you get an answer the same week, and nobody has to be sold to on their own drive. We are on site at delivery, which is when it actually matters.',
  },
  {
    q: 'Why HUUM and nothing else?',
    a: 'Because they rate a heater by room volume, not by floor area, and they publish the bands. That means we can specify the cabin and the heater off one number and show you the arithmetic — which is what the dial above is doing. They also make the only heaters we have found that look like they belong in a cedar room rather than bolted to it: the DROP sits in a cedar cradle, the HIVE disappears under the bench with a quarter of a tonne of stone on it. We have no trade tie to them. We just have not found better.',
  },
  {
    q: 'How is it lit?',
    a: 'A concealed 2200K LED strip, dimmed from the same app as the heat. No bulbs and no fittings inside the hot zone — nothing to replace at 100°C, nothing casting a hard shadow, and the light comes from behind the bench line so it washes the cedar rather than pointing at you. At the bottom of the dimmer it is about the level of a candle.',
  },
  {
    q: 'What does the geofencing actually do?',
    a: 'You set a radius around home in the app. When you cross it — leaving the office, coming off the A61 — the heater starts on its own. Thirty-five minutes later the cabin is at 90°C, which is roughly the time it takes to get home, get changed and get out to the garden. You never think about it again.',
  },
  {
    q: 'What happens if the Wi-Fi will not reach?',
    a: 'That is our job, not yours. We survey the signal at the bottom of the garden before delivery, and if it is weak we fit a mesh point or an outdoor bridge on the day. It is included. The technology team is in the same building as the workshop, so there is no ticket queue and no overseas call centre.',
  },
  {
    q: 'Can I have one built to my own size?',
    a: 'Yes, for £10,000 on top of the nearest standard cabin. That covers a full CAD model, a photo-real render of it sited in your garden, structural and heat-load calculations, and the plotting and planning time to prove the thing works before we cut anything. It is real engineering time, which is why it is priced as it is.',
  },
  {
    q: 'Do I need planning permission?',
    a: 'In most cases, no. A sauna under 2.5m at the eaves, sited more than two metres from a boundary, generally falls under permitted development in England. All three cabins are under that height. We check your plot at the consultation and put it in writing before you pay anything.',
  },
  {
    q: 'How much does it cost to run?',
    a: 'A 9kW heater draws its full load for about thirty-five minutes, then cycles at roughly a third. A two-hour session lands near 6 kWh — under two pounds at current rates.',
  },
  {
    q: 'Can it be moved?',
    a: 'Yes. Every cabin is a single craned unit under a tonne with no site-built joints, so it can be lifted and re-sited. If you went for grid mats rather than concrete, the base lifts too.',
  },
  {
    q: 'What happens to the cedar?',
    a: 'Left alone, it silvers to a soft grey over three or four years, which is what we would choose. If you want the red held, we can oil it annually — we cover this on the service visit.',
  },
]
