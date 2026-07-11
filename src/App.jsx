import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import VideosPage from './pages/VideosPage'
import SimulationsPage from './pages/SimulationsPage'
import GamesPage from './pages/GamesPage'
import CodeLabPage from './pages/CodeLabPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import { useProgress } from './useProgress'

export default function App() {
  const [profile, setProfile] = useState(null)
  const [page, setPage] = useState('home')
  const { progress, addProgress, saveNote, resetProgress } = useProgress()

  if (!profile) {
    return <LoginPage onEnter={setProfile} />
  }

  function handleLogout() {
    setProfile(null)
  }

  return (
    <div id="app">
      <Header page={page} onNavigate={setPage} studentLabel={`${profile.name} • ${profile.className}`} />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'courses' && <CoursesPage onNavigate={setPage} />}
        {page === 'videos' && <VideosPage progress={progress} addProgress={addProgress} saveNote={saveNote} />}
        {page === 'simulations' && <SimulationsPage addProgress={addProgress} />}
        {page === 'games' && <GamesPage addProgress={addProgress} />}
        {page === 'codelab' && <CodeLabPage addProgress={addProgress} />}
        {page === 'dashboard' && (
          <DashboardPage progress={progress} resetProgress={resetProgress} onLogout={handleLogout} />
        )}
        {page === 'about' && <AboutPage />}
      </main>
      <footer className="footer">
        <strong>Global Connect AI4All</strong>
        <p>Built for free learning, student creativity, and safe AI understanding.</p>
      </footer>
    </div>
  )
}
