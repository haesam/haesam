import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import LeadMagnet from './components/LeadMagnet'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Steps from './components/Steps'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main>
        <PainPoints />
        <LeadMagnet />
        <About />
        <Testimonials />
        <Steps />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default App
