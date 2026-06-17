import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Contact from './components/Contact'
import StorytellingGenerator from './components/StorytellingGenerator'

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-bg">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
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

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/storytelling" element={<StorytellingGenerator />} />
      </Routes>
    </HashRouter>
  )
}

export default App
