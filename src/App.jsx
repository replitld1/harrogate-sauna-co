import Anatomy from './components/Anatomy'
import Collection from './components/Collection'
import Craft from './components/Craft'
import Dimensions from './components/Dimensions'
import FAQ from './components/FAQ'
import FilmPanel from './components/FilmPanel'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Reserve from './components/Reserve'
import Ritual from './components/Ritual'
import Seal from './components/Seal'
import Silvering from './components/Silvering'
import Specifications from './components/Specifications'
import Tech from './components/Tech'
import MobileBar from './components/MobileBar'
import Grain from './components/ui/Grain'
import { panels } from './data/site'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Grain />
      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <FilmPanel {...panels.interior} />
        <Anatomy />
        <FilmPanel {...panels.loyly} />
        <Collection />
        <Silvering />
        <Dimensions />
        <Tech />
        <Craft />
        <Seal />
        <Ritual />
        <Specifications />
        <FAQ />
        <Reserve />
      </main>

      <Footer />
      <MobileBar />
    </>
  )
}
