import React, { useState } from 'react'
import { ArrowUpRight, ArrowDown, MapPin, Mail, Globe, Phone, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46V10.9M7.84 6.2a1.62 1.62 0 1 0 1.63 1.62A1.62 1.62 0 0 0 7.84 6.2Z" />
  </svg>
)

// Skills list — edit this array to add/remove skills
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SKILLS = [
  { name: 'HTML5', logo: `${DEVICON}/html5/html5-original.svg` },
  { name: 'CSS3', logo: `${DEVICON}/css3/css3-original.svg` },
  { name: 'JavaScript', logo: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'React', logo: `${DEVICON}/react/react-original.svg` },
  { name: 'Node.js', logo: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'Tailwind', logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: 'WordPress', logo: `${DEVICON}/wordpress/wordpress-plain.svg` },
  { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify' },
  { name: 'PHP', logo: `${DEVICON}/php/php-original.svg` },
  { name: 'Figma', logo: `${DEVICON}/figma/figma-original.svg` },
  { name: 'Git', logo: `${DEVICON}/git/git-original.svg` },
  { name: 'Vite', logo: `${DEVICON}/vitejs/vitejs-original.svg` },
]

// Portfolio projects list with rich images
const PROJECTS = [
  {
    id: '01',
    title: 'Synapse AI // Agentifire',
    category: 'AI Platform & Web App',
    image: '/projects/ai_platform.jpg',
    description: 'High-performance AI intelligence dashboard with real-time neural data visualizer, custom dark glassmorphic UI, and analytics.',
    tech: ['React.js', 'Next.js', 'Tailwind', 'REST APIs'],
    link: 'https://agentifire.io/'
  },
  {
    id: '02',
    title: 'Aether Luxury // Outhentica',
    category: 'E-Commerce Storefront',
    image: '/projects/ecommerce_store.jpg',
    description: 'Bespoke modern e-commerce storefront with high-speed checkout architecture and custom Liquid component systems.',
    tech: ['Shopify', 'Liquid', 'UI/UX Design', 'JavaScript'],
    link: 'https://outhentica.com/'
  },
  {
    id: '03',
    title: 'Namaz & Daily Routine Tracker',
    category: 'Mobile Application',
    image: '/projects/mobile_app.jpg',
    description: 'Futuristic mobile habit tracking interface featuring audio soundwave visualizer, prayer calendar, and ambient dark aesthetic.',
    tech: ['Mobile Dev', 'React Native / Flutter', 'UI/UX'],
    link: 'https://github.com/Mehmoodislam'
  }
]

export default function StoryOverlays({ progress }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  // Hero section opacity: fully visible at top (progress 0 - 0.08), then smoothly fades as user scrolls
  const heroOpacity = Math.max(0, 1 - progress * 4.5)
  const heroTranslateY = -progress * 60

  // Milestone helper
  const getCardStyle = (start, peakStart, peakEnd, end) => {
    if (progress < start || progress > end) {
      return { opacity: 0, transform: 'translateY(24px)', pointerEvents: 'none', display: 'none' }
    }
    let opacity = 1
    let translateY = 0
    if (progress < peakStart) {
      const t = (progress - start) / (peakStart - start)
      opacity = t
      translateY = 24 * (1 - t)
    } else if (progress > peakEnd) {
      const t = (end - progress) / (end - peakEnd)
      opacity = t
      translateY = -24 * (1 - t)
    }
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    }
  }

  const s2 = getCardStyle(0.20, 0.26, 0.38, 0.44) // #02 About Me (Right)
  const s3 = getCardStyle(0.44, 0.50, 0.62, 0.68) // #03 Skills (Left)
  const s4 = getCardStyle(0.68, 0.74, 0.86, 0.91) // #04 Portfolio (Right)
  const s5 = getCardStyle(0.91, 0.95, 0.99, 1.0)  // #05 CTA / Contact (Center)

  return (
    <div className="hero-overlay-root">
      {/* ============================================================
          MAIN HERO SECTION (Left & Right layout matching reference)
          ============================================================ */}
      <div 
        className="folio-hero-container"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none',
          visibility: heroOpacity <= 0.01 ? 'hidden' : 'visible'
        }}
      >
        <div className="folio-hero-content">
          {/* Left Hero Content */}
          <div className="hero-left-col">
            <span className="hero-eyebrow">Hey, I'm a</span>
            <h1 className="hero-main-title">
              Full Stack<br />Developer
            </h1>
          </div>

          {/* Right Hero Content */}
          <div className="hero-right-col">
            <h2 className="hero-quote-title">
              I love building things that live on the web.
            </h2>
            <p className="hero-quote-desc">
              I create simple, innovative, and timeless digital products.
            </p>
          </div>
        </div>

        {/* Bottom Services Ticker Line */}
        <div className="folio-bottom-ticker">
          <div className="ticker-item">
            <span className="ticker-num">#01</span>
            <span className="ticker-label">Web Development</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-num">#02</span>
            <span className="ticker-label">Mobile App Development</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-num">#03</span>
            <span className="ticker-label">Game Development</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-num">#04</span>
            <span className="ticker-label">3D Graphics</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SCROLL MILESTONES (Appearing progressively during scroll)
          ============================================================ */}
      
      {/* Milestone 2: About Me (Facing camera) */}
      <div className="story-card align-right about-me-card" style={s2}>
        <div className="phase-tag">
          <span className="tag-accent">#02</span> ABOUT ME
        </div>

        <div className="about-header">
          <h2 className="story-heading about-name">MEHMOOD ISLAM</h2>
          <div className="about-role-badge">
            <span className="role-text">Web Developer | UI/UX Lover</span>
            <span className="pronoun-tag">he/him</span>
          </div>
        </div>

        <p className="story-description about-bio">
          Crafting with React, WordPress, Shopify & more. Future mobile dev, always learning, always building scalable digital experiences.
        </p>

        {/* Quick Meta Info List */}
        <div className="about-meta-grid">
          <div className="meta-item">
            <MapPin size={14} className="meta-icon" />
            <span>36 B Landhi, Karachi, Pakistan</span>
          </div>
          <div className="meta-item">
            <Phone size={14} className="meta-icon" />
            <a href="tel:+923072781656" className="meta-link">
             03072781656
            </a>
          </div>
          <div className="meta-item">
            <Mail size={14} className="meta-icon" />
            <a href="mailto:mehmoodislam10@gmail.com" className="meta-link">
              mehmoodislam10@gmail.com
            </a>
          </div>
        </div>

        {/* Skills Chips */}
        <div className="story-chips about-chips">
          <span className="chip">🚀 React</span>
          <span className="chip">🎨 UI/UX</span>
          <span className="chip">🛍️ Shopify</span>
          <span className="chip">⚙️ WordPress</span>
          <span className="chip">📱 Mobile Dev</span>
        </div>

        {/* Action / Profile Links */}
        <div className="about-actions-row">
          <a 
            href="https://www.linkedin.com/in/mehmood-islam-6a2118332/" 
            target="_blank" 
            rel="noreferrer" 
            className="about-action-btn linkedin-btn"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
            <ArrowUpRight size={13} />
          </a>
          {/* <a 
            href="https://outhentica.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="about-action-btn website-btn"
          >
            <Globe size={14} />
            <span>outhentica.com</span>
            <ArrowUpRight size={13} />
          </a> */}
        </div>
      </div>

      {/* Milestone 3: Skills (Taking off glasses) */}
      <div className="story-card align-left skills-card" style={s3}>
        <div className="phase-tag">
          <span className="tag-accent">#03</span> MY SKILLS
        </div>
        <h2 className="story-heading skills-heading">TECH STACK</h2>
        <p className="story-description skills-desc">
          Languages, frameworks & tools I use to build fast, modern products.
        </p>
        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <div className="skill-tile" key={skill.name}>
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                className="skill-logo"
                loading="lazy"
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone 4: Portfolio Visual Showcase (Right) */}
      <div className="story-card align-right portfolio-card" style={s4}>
        <div className="portfolio-header-row">
          <div className="phase-tag" style={{ marginBottom: 0 }}>
            <span className="tag-accent">#04</span> PORTFOLIO
          </div>
          {/* Project selector indicators */}
          <div className="project-dots-nav">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={`project-dot-btn ${idx === activeProjectIdx ? 'active' : ''}`}
                onClick={() => setActiveProjectIdx(idx)}
                title={p.title}
              >
                <span>{p.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Visual Showcase */}
        {(() => {
          const curr = PROJECTS[activeProjectIdx]
          return (
            <div className="visual-project-showcase">
              {/* Media preview with hover reveal */}
              <a
                href={curr.link}
                target="_blank"
                rel="noreferrer"
                className="showcase-media-frame"
                title={`Open ${curr.title}`}
              >
                <img
                  src={curr.image}
                  alt={curr.title}
                  className="showcase-img"
                  loading="lazy"
                />
                <div className="showcase-glass-overlay">
                  <span className="live-status-pill">
                    <span className="pulse-dot-green"></span>
                    <span>LIVE DEMO</span>
                  </span>
                  <span className="showcase-expand-btn">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>

              {/* Project Meta Information */}
              <div className="showcase-info">
                <div className="showcase-meta-top">
                  <span className="showcase-category">{curr.category}</span>
                  <div className="showcase-nav-arrows">
                    <button
                      type="button"
                      className="nav-arrow-btn"
                      onClick={() => setActiveProjectIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
                      title="Previous project"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      type="button"
                      className="nav-arrow-btn"
                      onClick={() => setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length)}
                      title="Next project"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="showcase-title">{curr.title}</h3>
                <p className="showcase-desc">{curr.description}</p>

                <div className="showcase-footer-row">
                  <div className="showcase-tags">
                    {curr.tech.map((t) => (
                      <span key={t} className="chip-tag">{t}</span>
                    ))}
                  </div>
                  <a
                    href={curr.link}
                    target="_blank"
                    rel="noreferrer"
                    className="showcase-visit-link"
                  >
                    <span>Visit Project</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* 3 Interactive Thumbnail Previews Strip */}
              <div className="showcase-thumbs-strip">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`thumb-tile-btn ${idx === activeProjectIdx ? 'active' : ''}`}
                    onClick={() => setActiveProjectIdx(idx)}
                    title={p.title}
                  >
                    <img src={p.image} alt={p.title} className="thumb-img" />
                    <span className="thumb-label">{p.id} · {p.title.split('//')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })()}
      </div>

      {/* Milestone 5: Call to action (Center) */}
      <div className="story-card align-center" style={s5}>
        <div className="phase-tag" style={{ justifyContent: 'center' }}>
          <span className="tag-accent">#05</span> THE NEXT CHAPTER
        </div>
        <h2 className="story-heading">LET'S BUILD SOMETHING ICONIC</h2>
        <p className="story-description">
          Open for select creative partnerships, bespoke digital experiences, and visionary brands.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem' }}>
          <a href="#contact" className="folio-cta-btn" style={{ padding: '0.65rem 0.65rem 0.65rem 1.4rem' }}>
            <span className="folio-cta-text" style={{ fontSize: '0.95rem' }}>Start a project</span>
            <span className="folio-cta-circle" style={{ width: '34px', height: '34px' }}>
              <ArrowUpRight size={17} strokeWidth={2.6} />
            </span>
          </a>
          <button 
            className="cta-button-ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}
