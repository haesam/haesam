import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import AuroraHero from './components/AuroraHero'
import SelectedWorks from './components/SelectedWorks'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Contact from './components/Contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-bg">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <AuroraHero />
            <SelectedWorks />
            <Journal />
            <Explorations />
            <Stats />
            <Contact />
          </main>
        </>
      )}
    </div>
  )
}

export default App
