import React, { useRef, useState } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

/**
 * SilverProjectCard:
 * Ultra-premium liquid silver / chrome project card with:
 * - Scroll-interpolated 3D entrance (bottom-left, center, bottom-right)
 * - Interactive 3D mouse tilt with dynamic specular glare
 * - Continuous silver sheen sweep animation
 * - Cyber metallic frame & glowing beacons
 */
export default function SilverProjectCard({
  project,
  position, // 'left' | 'center' | 'right'
  progress,
  index
}) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    active: false
  })

  // Calculate entrance & exit physics based on progress and card position
  // Left enters earliest from bottom-left, center glides up, right enters from bottom-right
  const getScrollMotion = () => {
    // Hidden outside portfolio progress window
    if (progress < 0.53 || progress > 0.74) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 100px, 0) scale(0.9)',
        pointerEvents: 'none',
        display: 'none'
      }
    }

    // Staggered entrance timing per card
    let startEntrance = 0.54
    let peakEntrance = 0.61
    let initX = 0
    let initY = 160
    let initRot = 0
    let initScale = 0.88

    if (position === 'left') {
      startEntrance = 0.54
      peakEntrance = 0.61
      initX = -130
      initY = 170
      initRot = -6
      initScale = 0.88
    } else if (position === 'center') {
      startEntrance = 0.555
      peakEntrance = 0.625
      initX = 0
      initY = 200
      initRot = 0
      initScale = 0.90
    } else if (position === 'right') {
      startEntrance = 0.57
      peakEntrance = 0.64
      initX = 130
      initY = 170
      initRot = 6
      initScale = 0.88
    }

    // Entrance interpolation [0 -> 1]
    let tIn = 1
    if (progress < startEntrance) {
      tIn = 0
    } else if (progress < peakEntrance) {
      tIn = (progress - startEntrance) / (peakEntrance - startEntrance)
      // Ease out cubic
      tIn = 1 - Math.pow(1 - tIn, 3)
    }

    // Exit interpolation [1 -> 0] as milestone #05 approaches
    const startExit = 0.68
    const endExit = 0.735
    let tOut = 1
    if (progress > endExit) {
      tOut = 0
    } else if (progress > startExit) {
      tOut = (endExit - progress) / (endExit - startExit)
      tOut = Math.pow(tOut, 2)
    }

    const opacity = Math.max(0, Math.min(tIn, tOut))
    const curX = initX * (1 - tIn)
    const curY = (initY * (1 - tIn)) - (45 * (1 - tOut))
    const curRot = initRot * (1 - tIn)
    const curScale = (initScale + (1 - initScale) * tIn) * (0.94 + 0.06 * tOut)

    return {
      opacity,
      transform: `translate3d(${curX}px, ${curY}px, 0) rotate(${curRot}deg) scale(${curScale})`,
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      transition: 'opacity 0.18s ease-out, transform 0.18s ease-out'
    }
  }

  // 3D Mouse Tilt tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const relX = x / rect.width
    const relY = y / rect.height

    // Max 12deg tilt
    const rX = (relY - 0.5) * -14
    const rY = (relX - 0.5) * 14

    setTilt({
      rotateX: rX,
      rotateY: rY,
      glareX: relX * 100,
      glareY: relY * 100,
      active: true
    })
  }

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      active: false
    })
  }

  const scrollStyle = getScrollMotion()

  return (
    <div 
      className={`silver-project-wrapper pos-${position}`}
      style={scrollStyle}
    >
      <div
        ref={cardRef}
        className={`silver-card-inner ${tilt.active ? 'is-hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
            tilt.active ? 'scale3d(1.025, 1.025, 1.025)' : 'scale3d(1, 1, 1)'
          }`,
          transition: tilt.active 
            ? 'transform 0.08s ease-out' 
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Dynamic Specular Glare following mouse */}
        {tilt.active && (
          <div
            className="silver-card-glare"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.32) 0%, rgba(210, 230, 255, 0.12) 40%, transparent 70%)`
            }}
          />
        )}

        {/* Ambient Silver Chrome Beam Sheen sweep */}
        <div 
          className="silver-beam-shimmer" 
          style={{ animationDelay: `${index * 1.8}s` }} 
        />

        {/* Top Header: Badge, Category, Live status */}
        <div className="silver-card-header">
          <div className="silver-id-badge" title={`Project ${project.id}`}>
            <span className="silver-id-num">{project.id}</span>
          </div>
          <span className="silver-category-pill">{project.category}</span>
          <span className="silver-live-beacon">
            <span className="silver-pulse-dot" />
            <span className="silver-beacon-text">LIVE</span>
          </span>
        </div>

        {/* Media Preview Box with Bezel & Glow */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="silver-media-box"
          title={`Launch ${project.title}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="silver-media-img"
            loading="lazy"
          />
          <div className="silver-media-overlay">
            <span className="silver-preview-tag">
              <span>EXPLORE</span>
              <ExternalLink size={12} />
            </span>
          </div>
          <div className="silver-scanline" />
        </a>

        {/* Project Content Body */}
        <div className="silver-card-body">
          <h3 className="silver-card-title">{project.title}</h3>
          <p className="silver-card-desc">{project.description}</p>

          {/* Tech stack pills */}
          <div className="silver-tech-row">
            {project.tech.map((t) => (
              <span key={t} className="silver-tech-pill">{t}</span>
            ))}
          </div>

          {/* Visit Action Row */}
          <div className="silver-card-footer">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="silver-visit-btn"
            >
              <span className="silver-btn-glaze" />
              <span className="silver-btn-label">Visit Project</span>
              <ArrowUpRight size={15} className="silver-btn-icon" />
            </a>
          </div>
        </div>

        {/* Cyber Holographic Corner Brackets */}
        <span className="silver-corner tl" />
        <span className="silver-corner tr" />
        <span className="silver-corner bl" />
        <span className="silver-corner br" />
      </div>
    </div>
  )
}
