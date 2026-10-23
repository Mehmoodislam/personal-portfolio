import React, { useEffect, useRef, useState, useCallback } from 'react'
import Preloader from './Preloader'
import Navbar from './Navbar'
import StoryOverlays from './StoryOverlays'
import { audioEngine } from '../utils/audioEngine'

const TOTAL_FRAMES = 240
const LERP_FACTOR = 0.08 // Silky smooth deceleration factor

export default function SmoothScrollCanvas() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])
  
  // Progress & Frame state
  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [smoothProgress, setSmoothProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Mutable animation references
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const rafIdRef = useRef(null)
  const lastRenderedFrameRef = useRef(-1)
  const isPlayingRef = useRef(false)

  // Canvas drawing routine with closest-frame fallback
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let img = imagesRef.current[frameIdx]
    
    // Robust fallback: if current frame isn't decoded yet, find closest ready frame
    if (!img || !img.complete || !img.naturalWidth) {
      for (let offset = 1; offset < 30; offset++) {
        const prev = imagesRef.current[frameIdx - offset]
        if (prev && prev.complete && prev.naturalWidth) {
          img = prev
          break
        }
        const next = imagesRef.current[frameIdx + offset]
        if (next && next.complete && next.naturalWidth) {
          img = next
          break
        }
      }
    }

    if (!img || !img.complete || !img.naturalWidth) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Cover calculation to ensure cinematic borderless portrait framing
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh)
    lastRenderedFrameRef.current = frameIdx
  }, [])

  // Preload all 240 sequence frames concurrently
  useEffect(() => {
    let loadedCount = 0
    const images = new Array(TOTAL_FRAMES)
    imagesRef.current = images

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`

      img.onload = () => {
        loadedCount++
        const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100))
        setLoadProgress(pct)

        // Draw initial frame as soon as frame 1 arrives
        if (i === 1) {
          renderFrame(0)
        }

        // Auto-ready once 95% is buffered
        if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.95)) {
          setTimeout(() => setIsReady(true), 300)
        }
      }

      img.onerror = () => {
        loadedCount++
        setLoadProgress(Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100)))
        if (loadedCount >= TOTAL_FRAMES) setIsReady(true)
      }

      images[i - 1] = img
    }

    return () => {
      // Keep loaded image references in memory to prevent garbage collection on re-render
    }
  }, [renderFrame])

  // Handle dynamic high-DPI canvas resizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)

    const ctx = canvas.getContext('2d', { alpha: false })
    if (ctx) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }

    // Force re-render current frame after resize
    const target = lastRenderedFrameRef.current >= 0 ? lastRenderedFrameRef.current : 0
    renderFrame(target)
  }, [renderFrame])

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [updateCanvasSize])

  // Sync scroll position with target progress
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current) return
      const container = containerRef.current
      if (!container) return

      const totalScrollable = container.scrollHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const scrollY = window.scrollY
      const progress = Math.max(0, Math.min(1, scrollY / totalScrollable))
      targetProgressRef.current = progress
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main 60FPS LERP animation loop
  useEffect(() => {
    const loop = () => {
      // Auto-Play mode
      if (isPlayingRef.current) {
        targetProgressRef.current += 0.0022
        if (targetProgressRef.current > 1) {
          targetProgressRef.current = 0
        }
        const container = containerRef.current
        if (container) {
          const totalScrollable = container.scrollHeight - window.innerHeight
          window.scrollTo(0, targetProgressRef.current * totalScrollable)
        }
      }

      // Linear Interpolation (LERP)
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * LERP_FACTOR

      // Dynamic Audio cutoff based on scroll velocity
      const velocity = Math.abs(diff) * 60
      audioEngine.updateScrollVelocity(velocity)

      // Calculate target frame
      const progress = Math.max(0, Math.min(1, currentProgressRef.current))
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      )

      if (targetFrame !== lastRenderedFrameRef.current) {
        renderFrame(targetFrame)
        setCurrentFrameIndex(targetFrame)
        setSmoothProgress(progress)
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [renderFrame])

  // Interactive controls handlers
  const handleTogglePlay = () => {
    const nextState = !isPlaying
    setIsPlaying(nextState)
    isPlayingRef.current = nextState
  }

  const handleScrub = (frameIdx) => {
    if (isPlaying) {
      setIsPlaying(false)
      isPlayingRef.current = false
    }
    const progress = frameIdx / (TOTAL_FRAMES - 1)
    targetProgressRef.current = progress

    const container = containerRef.current
    if (container) {
      const totalScrollable = container.scrollHeight - window.innerHeight
      window.scrollTo({
        top: progress * totalScrollable,
        behavior: 'auto'
      })
    }
  }

  const handleReset = () => {
    if (isPlaying) {
      setIsPlaying(false)
      isPlayingRef.current = false
    }
    targetProgressRef.current = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      audioEngine.init()
      audioEngine.resume()
      audioEngine.setVolume(0.35)
    } else {
      audioEngine.setVolume(0.0001)
    }
  }

  return (
    <>
      {/* Preloader Screen */}
      <Preloader 
        progress={loadProgress} 
        isReady={isReady} 
        onEnter={() => setIsReady(true)} 
      />

      {/* Top Global Scroll Progress Indicator */}
      <div 
        className="global-progress-bar" 
        style={{ transform: `scaleX(${smoothProgress})` }}
      />

      {/* Folioblox Modern Navbar */}
      <Navbar />

      {/* Ambient reactive lighting glows matching visual palette */}
      <div className="ambient-glow-wrapper">
        <div 
          className="ambient-glow-left" 
          style={{ 
            opacity: 0.45 + smoothProgress * 0.45,
            transform: `scale(${1 + smoothProgress * 0.15})`
          }} 
        />
        <div 
          className="ambient-glow-right" 
          style={{ 
            opacity: 0.85 - smoothProgress * 0.4,
            transform: `scale(${1.15 - smoothProgress * 0.15})`
          }} 
        />
      </div>

      {/* Fixed Viewport Container */}
      <div className="canvas-pinned-container">
        {/* HTML5 Canvas Rendering */}
        <canvas 
          ref={canvasRef} 
          className="sequence-canvas"
        />

        {/* Vignette Overlay for Depth */}
        <div className="cinematic-vignette" />

        {/* Subtle Film Grain Noise */}
        <div className="film-grain" />

        {/* Hero Section & Dynamic Story Overlays */}
        <StoryOverlays progress={smoothProgress} />
      </div>

      {/* Main Scroll Container (550vh provides ample smooth travel for 240 frames) */}
      <div 
        ref={containerRef} 
        className="scroll-track-container" 
        style={{ height: '550vh', position: 'relative', pointerEvents: 'none' }}
      />

      {/* Bottom Right Scroll Hint (Retained as requested) */}
      <div 
        className="scroll-indicator-bottom"
        style={{ opacity: smoothProgress < 0.1 ? 1 : 0 }}
      >
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <span>SCROLL TO ANIMATE</span>
      </div>
    </>
  )
}
