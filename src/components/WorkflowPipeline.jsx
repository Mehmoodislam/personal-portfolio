import React, { useRef, useState } from 'react'
import { Compass, Palette, Code2, Rocket, ArrowUpRight, Zap, CheckCircle2, Sparkles, Layers, Cpu } from 'lucide-react'

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'PHASE 01 // BLUEPRINT',
    title: 'Architecture & Strategy',
    icon: Compass,
    color: '#38bdf8',
    desc: 'System requirements, API endpoints mapping, database schema design, and technical feasibility analysis.',
    tags: ['System Design', 'Tech Spec', 'API Mapping'],
    kpi: 'Scalable Foundation'
  },
  {
    step: '02',
    phase: 'PHASE 02 // VISUALS',
    title: 'UI/UX & Motion Design',
    icon: Palette,
    color: '#ec4899',
    desc: 'Figma design tokens, dark glassmorphism, bespoke micro-interactions, and fluid responsive prototypes.',
    tags: ['Figma Tokens', 'Micro-Animations', 'User Flows'],
    kpi: 'High-Impact Aesthetics'
  },
  {
    step: '03',
    phase: 'PHASE 03 // VELOCITY',
    title: 'Full Stack Execution',
    icon: Code2,
    color: '#61dafb',
    desc: 'Modular React & Next.js component trees, Shopify Liquid architectures, and clean maintainable code.',
    tags: ['React & Next.js', 'Liquid Engine', 'Clean Code'],
    kpi: 'Resilient Engineering'
  },
  {
    step: '04',
    phase: 'PHASE 04 // DEPLOY',
    title: 'Speed & Edge Launch',
    icon: Rocket,
    color: '#4ade80',
    desc: 'Core Web Vitals tuning for 95+ Lighthouse scores, CDN edge caching, and zero-downtime production deployment.',
    tags: ['95+ Lighthouse', 'Edge CDN', 'CI/CD Launch'],
    kpi: 'Global Velocity'
  }
]

export default function WorkflowPipeline({ progress }) {
  const [activeStep, setActiveStep] = useState(0)
  const gridRef = useRef(null)

  // Section progress range: 0.74 to 0.915
  if (progress < 0.73 || progress > 0.925) {
    return null
  }

  // Entrance and exit interpolation
  const startIn = 0.74
  const peakIn = 0.80
  const startOut = 0.87
  const endOut = 0.92

  let tIn = 1
  if (progress < startIn) {
    tIn = 0
  } else if (progress < peakIn) {
    tIn = (progress - startIn) / (peakIn - startIn)
    tIn = 1 - Math.pow(1 - tIn, 3)
  }

  let tOut = 1
  if (progress > endOut) {
    tOut = 0
  } else if (progress > startOut) {
    tOut = (endOut - progress) / (endOut - startOut)
    tOut = Math.pow(tOut, 2)
  }

  const sectionOpacity = Math.max(0, Math.min(tIn, tOut))
  const headerY = -24 * (1 - tIn) - 20 * (1 - tOut)

  const scrollToStep = (idx) => {
    setActiveStep(idx)
    if (gridRef.current) {
      const cards = gridRef.current.children
      if (cards && cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  const handleGridScroll = () => {
    if (!gridRef.current) return
    const container = gridRef.current
    const scrollLeft = container.scrollLeft
    const width = container.clientWidth
    if (width > 0) {
      const newStep = Math.round(scrollLeft / (width * 0.85 || width))
      if (newStep !== activeStep && newStep >= 0 && newStep < WORKFLOW_STEPS.length) {
        setActiveStep(newStep)
      }
    }
  }

  return (
    <div 
      className="workflow-showcase-section"
      style={{
        opacity: sectionOpacity,
        pointerEvents: sectionOpacity > 0.4 ? 'auto' : 'none'
      }}
    >
      {/* Section Header */}
      <div 
        className="workflow-section-header"
        style={{
          transform: `translateY(${headerY}px)`,
          transition: 'transform 0.18s ease-out'
        }}
      >
        <div className="portfolio-phase-indicator">
          <span className="tag-accent">#05</span> AGILE PIPELINE
        </div>
        <h2 className="portfolio-master-heading">
          HOW I <span className="silver-text-highlight">BUILD PRODUCTS</span>
        </h2>
        <p className="portfolio-subheading">
          A battle-tested 4-phase engineering pipeline from initial blueprint to zero-downtime launch
        </p>
      </div>

      {/* Mobile Phase Step Tabs */}
      <div className="workflow-mobile-tabs">
        {WORKFLOW_STEPS.map((stepItem, idx) => (
          <button
            key={stepItem.step}
            type="button"
            className={`wf-tab-btn ${activeStep === idx ? 'active' : ''}`}
            onClick={() => scrollToStep(idx)}
            style={{ '--step-color': stepItem.color }}
          >
            <span className="wf-tab-num">{stepItem.step}</span>
            <span className="wf-tab-label">{stepItem.title.split('&')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* 4 Interactive Pipeline Cards (Horizontal snap on mobile) */}
      <div 
        ref={gridRef}
        className="workflow-grid-container"
        onScroll={handleGridScroll}
      >
        {WORKFLOW_STEPS.map((stepItem, idx) => {
          return (
            <WorkflowStepCard
              key={stepItem.step}
              stepItem={stepItem}
              index={idx}
              progress={progress}
              tIn={tIn}
              tOut={tOut}
              isActive={activeStep === idx}
              onActivate={() => scrollToStep(idx)}
            />
          )
        })}
      </div>

      {/* Mobile Step Dots */}
      <div className="workflow-mobile-dots">
        {WORKFLOW_STEPS.map((stepItem, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Step ${idx + 1}`}
            className={`wf-dot ${activeStep === idx ? 'active' : ''}`}
            onClick={() => scrollToStep(idx)}
            style={{ '--step-color': stepItem.color }}
          />
        ))}
      </div>

      {/* Pipeline Guarantees Ticker Bar */}
      <div className="workflow-guarantees-bar">
        <div className="guarantee-item">
          <span className="guarantee-bullet" />
          <span>Iterative Sprints</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-bullet" />
          <span>Real-Time Git Versioning</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-bullet" />
          <span>Direct Slack/WhatsApp Comms</span>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-bullet" />
          <span>100% On-Time Delivery</span>
        </div>
      </div>
    </div>
  )
}

function WorkflowStepCard({ stepItem, index, tIn, tOut, isActive, onActivate }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false })

  const IconComp = stepItem.icon

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 860

  // Staggered physics entrance per step (straight on mobile)
  let initX = 0
  let initY = isMobile ? 30 : 120
  let initRot = 0

  if (!isMobile) {
    if (index === 0) {
      initX = -70
      initY = 110
      initRot = -5
    } else if (index === 1) {
      initX = -25
      initY = 130
      initRot = -2
    } else if (index === 2) {
      initX = 25
      initY = 130
      initRot = 2
    } else if (index === 3) {
      initX = 70
      initY = 110
      initRot = 5
    }
  }

  const curX = initX * (1 - tIn)
  const curY = (initY * (1 - tIn)) - ((isMobile ? 15 : 35) * (1 - tOut))
  const curRot = initRot * (1 - tIn)
  const curScale = (0.90 + 0.10 * tIn) * (0.95 + 0.05 * tOut)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const relX = x / rect.width
    const relY = y / rect.height

    setTilt({
      rotateX: (relY - 0.5) * -12,
      rotateY: (relX - 0.5) * 12,
      glareX: relX * 100,
      glareY: relY * 100,
      active: true
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false })
  }

  return (
    <div
      className={`workflow-card-wrapper ${isActive ? 'is-active-step' : ''}`}
      style={{
        transform: `translate3d(${curX}px, ${curY}px, 0) rotate(${curRot}deg) scale(${curScale})`,
        transition: 'transform 0.2s ease-out'
      }}
      onClick={onActivate}
    >
      <div
        ref={cardRef}
        className={`workflow-card-inner ${tilt.active ? 'is-hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
            tilt.active ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
          }`,
          transition: tilt.active 
            ? 'transform 0.08s ease-out' 
            : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Specular Mouse Glare */}
        {tilt.active && (
          <div
            className="silver-card-glare"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.32) 0%, rgba(210, 230, 255, 0.12) 40%, transparent 70%)`
            }}
          />
        )}

        {/* Ambient Silver Sheen sweep beam */}
        <div 
          className="silver-beam-shimmer" 
          style={{ animationDelay: `${index * 1.5}s` }} 
        />

        {/* Cyber Corner Decors */}
        <span className="silver-corner tl" />
        <span className="silver-corner tr" />
        <span className="silver-corner bl" />
        <span className="silver-corner br" />

        {/* Card Header: Step Pill + Phase Code */}
        <div className="wf-card-header">
          <div className="wf-step-disk" style={{ '--step-color': stepItem.color }}>
            <span className="wf-step-num">{stepItem.step}</span>
          </div>
          <span className="wf-phase-tag">{stepItem.phase}</span>
        </div>

        {/* Icon with Glowing Holographic Radar */}
        <div className="wf-icon-container">
          <div className="wf-icon-radar" style={{ '--step-color': stepItem.color }} />
          <div className="wf-icon-box" style={{ '--step-color': stepItem.color }}>
            <IconComp size={22} className="wf-main-icon" />
          </div>
          <span className="wf-kpi-badge">{stepItem.kpi}</span>
        </div>

        {/* Title and Description */}
        <div className="wf-card-body">
          <h3 className="wf-card-title">{stepItem.title}</h3>
          <p className="wf-card-desc">{stepItem.desc}</p>
        </div>

        {/* Micro Tech Tags */}
        <div className="wf-tags-row">
          {stepItem.tags.map((t) => (
            <span key={t} className="wf-chip">{t}</span>
          ))}
        </div>

        {/* Bottom Status Indicator */}
        <div className="wf-card-footer">
          <span className="wf-progress-line">
            <span className="wf-progress-fill" style={{ width: `${(index + 1) * 25}%`, '--step-color': stepItem.color }} />
          </span>
          <span className="wf-step-count">{`0${index + 1} / 04`}</span>
        </div>
      </div>
    </div>
  )
}
