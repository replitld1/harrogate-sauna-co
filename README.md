# The Harrogate Sauna Co

Marketing site for a hand-built cedar sauna company. Dark, editorial, and built to
carry a £24,500 price tag without a single stock photograph.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Stack

- Vite 8 + React 19
- Tailwind CSS v4 via `@tailwindcss/vite` (design tokens live in `@theme`, `src/index.css`)
- framer-motion for scroll reveals, parallax, and layout transitions
- lucide-react for iconography
- Newsreader / Archivo / IBM Plex Mono from Google Fonts, with system fallbacks

## Structure

```
src/
  data/site.js          all copy, specs, models, FAQs — edit here, not in components
  components/
    Nav Hero Marquee FilmPanel Anatomy Collection
    Craft Ritual Specifications FAQ Reserve Footer
    art/SaunaCutaway.jsx     interactive section drawing
    ui/Cinematic.jsx         looping video backdrop + scrim
    ui/                      Reveal, Button, Eyebrow, Grain
```

`public/videos/` holds five looping H.264 clips (7.2MB total) that back the hero,
the two film panels, the craft section and the reserve section. The remaining
artwork — the cutaway section drawing and the model plan views — is inline SVG.

## Notes

- **Film.** `Cinematic` renders a muted, looping, `playsInline` `<video>` under a
  scrim, plus a slow `kenburns` scale so a five-second loop does not read as one.
  Both the loop and the drift stop under `prefers-reduced-motion` — the video
  pauses on its first frame. Clip paths and scrim choices live in `film` in
  `src/data/site.js`; swap a path there to change a shot.
- **The cutaway** (`#cabin`) is the centrepiece: six construction details, each
  selectable from the drawing itself or from the index list beneath the copy. Markers
  are real buttons — focusable, `Enter`/`Space` activated, `aria-pressed` reflected.
- **Motion** respects `prefers-reduced-motion` throughout; `Reveal` skips its initial
  state and the hero parallax collapses to zero.
- **The reserve form has no backend.** Submitting sets local state and renders the
  confirmation panel. Wire `onSubmit` in `src/components/Reserve.jsx` to a real
  endpoint before this goes near a customer.
- Content is fictional — company, people, prices, and registration number included.
