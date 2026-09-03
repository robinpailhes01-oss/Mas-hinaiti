import Nav from './components/Nav'
import Hero from './components/Hero'
import Immersion from './components/Immersion'
import Nuit from './components/Nuit'
import Suite from './components/Suite'
import Options from './components/Options'
import Avis from './components/Avis'
import Tarif from './components/Tarif'
import Acces from './components/Acces'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Immersion />
        <Nuit />
        <Suite />
        <Options />
        <Avis />
        <Tarif />
        <Acces />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
