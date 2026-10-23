import React, { useEffect } from 'react'
import SmoothScrollCanvas from './components/SmoothScrollCanvas'

export default function App() {
  // Global keyboard shortcuts (Space to toggle play/pause, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        // Prevent default space scroll
        e.preventDefault()
        const playBtn = document.querySelector('.hud-btn')
        if (playBtn) playBtn.click()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="app-container">
      <SmoothScrollCanvas />
    </main>
  )
}
