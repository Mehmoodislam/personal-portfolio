import React, { useState, useRef } from 'react'
import { ArrowUpRight, MapPin, Mail, Phone, Sparkles, Terminal, Code2, Cpu, CheckCircle2, ShieldCheck, Zap, Copy, Check, MessageSquare } from 'lucide-react'
import SilverProjectCard from './SilverProjectCard'
import WorkflowPipeline from './WorkflowPipeline'

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46V10.9M7.84 6.2a1.62 1.62 0 1 0 1.63 1.62A1.62 1.62 0 0 0 7.84 6.2Z" />
  </svg>
)

// Skills with categorized domains & architectural roles
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SKILLS = [
  { name: 'React.js', category: 'frontend', role: 'Component Systems', logo: `${DEVICON}/react/react-original.svg`, color: '#61dafb' },
  { name: 'JavaScript', category: 'frontend', role: 'Modern ES6+ Logic', logo: `${DEVICON}/javascript/javascript-original.svg`, color: '#f7df1e' },
  { name: 'Tailwind', category: 'frontend', role: 'Design Tokens & UI', logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, color: '#38bdf8' },
  { name: 'Shopify', category: 'commerce', role: 'Liquid Storefronts', logo: 'https://cdn.simpleicons.org/shopify', color: '#96bf36' },
  { name: 'WordPress', category: 'commerce', role: 'Custom Themes & CMS', logo: `${DEVICON}/wordpress/wordpress-plain.svg`, color: '#21759b' },
  { name: 'Node.js', category: 'backend', role: 'APIs & Server Runtime', logo: `${DEVICON}/nodejs/nodejs-original.svg`, color: '#68a063' },
  { name: 'HTML5', category: 'frontend', role: 'Semantic DOM & SEO', logo: `${DEVICON}/html5/html5-original.svg`, color: '#e34f26' },
  { name: 'CSS3', category: 'frontend', role: 'Animations & Layout', logo: `${DEVICON}/css3/css3-original.svg`, color: '#1572b6' },
  { name: 'PHP', category: 'commerce', role: 'Backend Architecture', logo: `${DEVICON}/php/php-original.svg`, color: '#777bb3' },
  { name: 'Figma', category: 'tools', role: 'UI/UX Design Systems', logo: `${DEVICON}/figma/figma-original.svg`, color: '#f24e1e' },
  { name: 'Git', category: 'tools', role: 'Branching & CI/CD', logo: `${DEVICON}/git/git-original.svg`, color: '#f05032' },
  { name: 'Vite', category: 'frontend', role: 'Next-Gen Bundler', logo: `${DEVICON}/vitejs/vitejs-original.svg`, color: '#bd34fe' },
]

// Portfolio projects: 3 distinctive pillars (Left, Center, Right)
const PROJECTS = [
  {
    id: '01',
    title: 'Synapse AI // Agentifire',
    category: 'AI Platform & Web App',
    position: 'left',
    image: '/projects/ai_platform.jpg',
    description: 'High-performance AI intelligence dashboard with real-time neural data visualizer, custom dark glassmorphic UI, and analytics.',
    tech: ['React.js', 'Next.js', 'Tailwind', 'REST APIs'],
    link: 'https://agentifire.io/'
  },
  {
    id: '02',
    title: 'Aether Luxury // Outhentica',
    category: 'E-Commerce Storefront',
    position: 'center',
    image: '/projects/ecommerce_store.jpg',
    description: 'Bespoke modern luxury storefront with high-speed checkout architecture, custom Liquid component systems, and headless speed.',
    tech: ['Shopify', 'Liquid', 'UI/UX Design', 'JavaScript'],
    link: 'https://outhentica.com/'
  },
  {
    id: '03',
    title: 'Namaz & Daily Routine Tracker',
    category: 'Mobile Application',
    position: 'right',
    image: '/projects/mobile_app.jpg',
    description: 'Futuristic mobile habit tracking interface featuring audio soundwave visualizer, prayer calendar, and ambient dark aesthetic.',
    tech: ['React Native', 'Flutter', 'Audio API', 'UI/UX'],
    link: 'https://github.com/Mehmoodislam'
  }
]

export default function StoryOverlays({ progress }) {
  const [skillCategory, setSkillCategory] = useState('all')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const portfolioGridRef = useRef(null)
  const [ctaTilt, setCtaTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false })

  const scrollToProject = (idx) => {
    setActiveProjectIdx(idx)
    if (portfolioGridRef.current) {
      const cards = portfolioGridRef.current.children
      if (cards && cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  const handlePortfolioScroll = () => {
    if (!portfolioGridRef.current) return
    const container = portfolioGridRef.current
    const scrollLeft = container.scrollLeft
    const width = container.clientWidth
    if (width > 0) {
      const newIdx = Math.round(scrollLeft / (width * 0.85 || width))
      if (newIdx !== activeProjectIdx && newIdx >= 0 && newIdx < PROJECTS.length) {
        setActiveProjectIdx(newIdx)
      }
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mehmoodislam10@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  const handleCtaMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    setCtaTilt({
      rotateX: (relY - 0.5) * -12,
      rotateY: (relX - 0.5) * 12,
      glareX: relX * 100,
      glareY: relY * 100,
      active: true
    })
  }

  const handleCtaMouseLeave = () => {
    setCtaTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false })
  }

  // Hero section opacity: fully visible at top (progress 0 - 0.08), smoothly fades as user scrolls
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

  // Portfolio Section Header entrance calculation (0.53 to 0.74)
  const getPortfolioHeaderStyle = () => {
    if (progress < 0.53 || progress > 0.74) {
      return { opacity: 0, transform: 'translateY(-20px)', display: 'none' }
    }
    let opacity = 1
    let translateY = 0
    if (progress < 0.60) {
      const t = (progress - 0.53) / (0.60 - 0.53)
      opacity = t
      translateY = -24 * (1 - t)
    } else if (progress > 0.68) {
      const t = (0.735 - progress) / (0.735 - 0.68)
      opacity = Math.max(0, t)
      translateY = -20 * (1 - t)
    }
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    }
  }

  const s2 = getCardStyle(0.15, 0.20, 0.28, 0.34) // #02 About Me (Right)
  const s3 = getCardStyle(0.34, 0.39, 0.47, 0.52) // #03 Skills (Left)
  const s6 = getCardStyle(0.92, 0.95, 0.99, 1.0)  // #06 CTA / Contact (Center)

  const isPortfolioVisible = progress >= 0.53 && progress <= 0.74

  // Filter skills based on selected category
  const filteredSkills = skillCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === skillCategory)

  return (
    <div className="hero-overlay-root">
      {/* ============================================================
          MAIN HERO SECTION (Left & Right layout)
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
          MILESTONE 2: ABOUT ME (Executive Professional Profile)
          ============================================================ */}
      <div className="story-card align-right about-me-card pro-card" style={s2}>
        {/* Cyber Corner Decors */}
        <span className="pro-corner tl" />
        <span className="pro-corner tr" />
        <span className="pro-corner bl" />
        <span className="pro-corner br" />

        {/* Top Header Row */}
        <div className="pro-top-bar">
          <div className="phase-tag" style={{ marginBottom: 0 }}>
            <span className="tag-accent">#02</span> EXECUTIVE PROFILE
          </div>
          <div className="pro-status-badge">
            <span className="pulse-dot-green"></span>
            <span>AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Executive Header: Monogram Avatar + Title Info */}
        <div className="pro-header-row">
          <div className="pro-avatar-ring">
            <span className="pro-avatar-initials">MI</span>
            <span className="pro-avatar-glow" />
          </div>
          <div className="pro-name-col">
            <h2 className="pro-full-name">MEHMOOD ISLAM</h2>
            <div className="pro-role-row">
              <span className="pro-role-title">Full Stack Engineer & UI Architect</span>
              <span className="pro-location-badge">Karachi, PK</span>
            </div>
          </div>
        </div>

        {/* Professional Bio */}
        <p className="pro-bio">
          Full Stack Engineer specialized in building high-performance web applications, luxury storefronts, and bespoke digital experiences. Bridging technical engineering rigor with refined motion design.
        </p>

        {/* Professional Metric Counters */}
        <div className="pro-metrics-grid">
          <div className="metric-box">
            <span className="metric-val">3+</span>
            <span className="metric-lbl">Years Experience</span>
          </div>
          <div className="metric-box">
            <span className="metric-val">40+</span>
            <span className="metric-lbl">Projects Delivered</span>
          </div>
          <div className="metric-box">
            <span className="metric-val">99%</span>
            <span className="metric-lbl">Client Satisfaction</span>
          </div>
        </div>

        {/* Verified Contact Details Grid */}
        <div className="pro-contact-grid">
          <div className="pro-contact-item">
            <MapPin size={13} className="pro-contact-icon" />
            <span>36 B Landhi, Karachi, Pakistan</span>
          </div>
          <div className="pro-contact-item">
            <Phone size={13} className="pro-contact-icon" />
            <a href="tel:+923072781656" className="pro-contact-link">03072781656</a>
          </div>
          <div className="pro-contact-item">
            <Mail size={13} className="pro-contact-icon" />
            <a href="mailto:mehmoodislam10@gmail.com" className="pro-contact-link">mehmoodislam10@gmail.com</a>
          </div>
        </div>

        {/* Core Capabilities Chips */}
        <div className="pro-skills-chips">
          <span className="pro-chip primary">⚡ React.js & Next.js</span>
          <span className="pro-chip primary">🛍️ Shopify & Liquid</span>
          <span className="pro-chip">⚙️ WordPress Architecture</span>
          <span className="pro-chip">📱 Mobile App Dev</span>
          <span className="pro-chip">🎨 UI/UX Design Systems</span>
        </div>

        {/* Action / Profile Links */}
        <div className="pro-actions-footer">
          <a 
            href="https://www.linkedin.com/in/mehmood-islam-6a2118332/" 
            target="_blank" 
            rel="noreferrer" 
            className="pro-btn-linkedin"
          >
            <LinkedInIcon />
            <span>LinkedIn Profile</span>
            <ArrowUpRight size={13} />
          </a>
          <a 
            href="mailto:mehmoodislam10@gmail.com" 
            className="pro-btn-direct"
          >
            <Mail size={13} />
            <span>Direct Inquiry</span>
          </a>
        </div>
      </div>

      {/* ============================================================
          MILESTONE 3: SKILLS (Interactive Technical Matrix)
          ============================================================ */}
      <div className="story-card align-left skills-card pro-skills-container pro-card" style={s3}>
        <span className="pro-corner tl" />
        <span className="pro-corner tr" />
        <span className="pro-corner bl" />
        <span className="pro-corner br" />

        {/* Top Header Row */}
        <div className="pro-top-bar">
          <div className="phase-tag" style={{ marginBottom: 0 }}>
            <span className="tag-accent">#03</span> TECHNICAL MATRIX
          </div>
          <div className="pro-status-badge">
            <Cpu size={12} className="meta-icon" />
            <span>PRODUCTION ARSENAL</span>
          </div>
        </div>

        <div className="pro-skills-title-row">
          <div>
            <h2 className="pro-full-name">TECHNICAL CAPABILITIES</h2>
            <p className="pro-skills-subtitle">
              Engineered for velocity, clean architectural patterns, and sub-second load times.
            </p>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="skills-category-tabs">
          {[
            { id: 'all', label: 'All Stack' },
            { id: 'frontend', label: 'Frontend & UI' },
            { id: 'commerce', label: 'Commerce & CMS' },
            { id: 'tools', label: 'Backend & Tools' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`skills-tab-btn ${skillCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSkillCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid with Architectural Role Labels */}
        <div className="skills-grid pro-skills-grid">
          {filteredSkills.map((skill) => (
            <div 
              className="pro-skill-tile" 
              key={skill.name}
              style={{ '--brand-color': skill.color }}
            >
              <div className="pro-skill-icon-wrap">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="skill-logo"
                  loading="lazy"
                />
              </div>
              <div className="pro-skill-text-wrap">
                <span className="pro-skill-name">{skill.name}</span>
                <span className="pro-skill-role">{skill.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Guarantees Footer */}
        <div className="skills-footer-badges">
          <div className="skills-footer-badge">
            <Zap size={11} className="badge-ico" />
            <span>90+ Lighthouse Speed</span>
          </div>
          <div className="skills-footer-badge">
            <ShieldCheck size={11} className="badge-ico" />
            <span>Clean Architecture</span>
          </div>
          <div className="skills-footer-badge">
            <CheckCircle2 size={11} className="badge-ico" />
            <span>Mobile-First UI</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          MILESTONE 4: PORTFOLIO TRIO (3 LIQUID SILVER CHROME CARDS)
          One from bottom-left, one center, one right with 3D tilt & sheen
          ============================================================ */}
      {isPortfolioVisible && (
        <div className="portfolio-showcase-section">
          {/* Portfolio Section Header Banner */}
          <div className="portfolio-section-header" style={getPortfolioHeaderStyle()}>
            <div className="portfolio-phase-indicator">
              <span className="tag-accent">#04</span> PORTFOLIO SHOWCASE
            </div>
            <h2 className="portfolio-master-heading">
              FEATURED <span className="silver-text-highlight">PROJECTS</span>
            </h2>
            <p className="portfolio-subheading">
              Production web applications, bespoke luxury e-commerce & mobile architectures
            </p>
          </div>

          {/* Mobile Project Selector Tabs */}
          <div className="portfolio-mobile-tabs">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                className={`portfolio-tab-pill ${activeProjectIdx === idx ? 'active' : ''}`}
                onClick={() => scrollToProject(idx)}
              >
                <span className="tab-pill-num">{proj.id}</span>
                <span className="tab-pill-title">{proj.title.split('//')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* 3 Silver Project Cards Spread Across Left, Center, Right (Horizontal snap on mobile) */}
          <div 
            ref={portfolioGridRef}
            className="portfolio-trio-grid"
            onScroll={handlePortfolioScroll}
          >
            {PROJECTS.map((project, idx) => (
              <SilverProjectCard
                key={project.id}
                project={project}
                position={project.position}
                progress={progress}
                index={idx}
                isActive={activeProjectIdx === idx}
              />
            ))}
          </div>

          {/* Mobile Dot Navigators & Swipe Hint */}
          <div className="portfolio-mobile-nav">
            <div className="portfolio-dots-bar">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to project ${idx + 1}`}
                  className={`portfolio-dot ${activeProjectIdx === idx ? 'active' : ''}`}
                  onClick={() => scrollToProject(idx)}
                />
              ))}
            </div>
            <span className="portfolio-swipe-hint">Swipe to explore →</span>
          </div>
        </div>
      )}

      {/* ============================================================
          MILESTONE 5: WORKFLOW PIPELINE (4-Phase Agile Engineering)
          ============================================================ */}
      <WorkflowPipeline progress={progress} />

      {/* ============================================================
          MILESTONE 6: CTA / NEXT CHAPTER (Liquid Silver Cyber Portal)
          ============================================================ */}
      <div 
        className="story-card align-center cta-portal-card silver-cta-portal" 
        style={{
          ...s6,
          transform: `${s6.transform || ''} perspective(1000px) rotateX(${ctaTilt.rotateX}deg) rotateY(${ctaTilt.rotateY}deg) ${ctaTilt.active ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'}`,
          transition: ctaTilt.active ? 'opacity 0.2s ease-out, transform 0.08s ease-out' : 'opacity 0.2s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseMove={handleCtaMouseMove}
        onMouseLeave={handleCtaMouseLeave}
      >
        {/* Dynamic Specular Glare layer */}
        {ctaTilt.active && (
          <div 
            className="silver-card-glare"
            style={{
              background: `radial-gradient(circle at ${ctaTilt.glareX}% ${ctaTilt.glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(210, 230, 255, 0.12) 40%, transparent 70%)`
            }}
          />
        )}

        {/* Ambient Silver Sheen sweep beam */}
        <div className="silver-beam-shimmer" style={{ animationDuration: '6s' }} />

        {/* Cyber Corner Decors */}
        <span className="silver-corner tl" />
        <span className="silver-corner tr" />
        <span className="silver-corner bl" />
        <span className="silver-corner br" />

        {/* Top Status Bar */}
        <div className="cta-top-status-row">
          <div className="phase-tag" style={{ marginBottom: 0 }}>
            <span className="tag-accent">#06</span> THE NEXT CHAPTER
          </div>
          <div className="cta-availability-pill">
            <span className="silver-pulse-dot" />
            <span>ACCEPTING SELECT CLIENTS</span>
          </div>
        </div>

        {/* Master Heading */}
        <h2 className="cta-portal-heading">
          LET'S BUILD SOMETHING <br />
          <span className="silver-text-highlight">ICONIC TOGETHER</span>
        </h2>

        <p className="cta-portal-desc">
          Ready to scale your product, launch a bespoke luxury storefront, or architect a next-gen web app? Let's bring visionary engineering to life.
        </p>

        {/* Quick Contact & Channels Strip */}
        <div className="cta-channels-grid">
          {/* Email Touchpoint with Copy */}
          <div className="cta-channel-card">
            <div className="cta-channel-icon-wrap">
              <Mail size={15} className="cta-channel-icon" />
            </div>
            <div className="cta-channel-info">
              <span className="cta-channel-label">Email Me</span>
              <a href="mailto:mehmoodislam10@gmail.com" className="cta-channel-value">
                mehmoodislam10@gmail.com
              </a>
            </div>
            <button
              type="button"
              className={`cta-copy-btn ${copiedEmail ? 'copied' : ''}`}
              onClick={handleCopyEmail}
              title="Copy Email Address"
            >
              {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* WhatsApp / Phone Touchpoint */}
          <div className="cta-channel-card">
            <div className="cta-channel-icon-wrap">
              <Phone size={15} className="cta-channel-icon" />
            </div>
            <div className="cta-channel-info">
              <span className="cta-channel-label">Direct Line / WhatsApp</span>
              <a href="https://wa.me/923072781656" target="_blank" rel="noreferrer" className="cta-channel-value">
                +92 307 2781656
              </a>
            </div>
            <a 
              href="https://wa.me/923072781656" 
              target="_blank" 
              rel="noreferrer" 
              className="cta-ping-btn"
              title="Message on WhatsApp"
            >
              <MessageSquare size={12} />
              <span>Ping</span>
            </a>
          </div>
        </div>

        {/* Response Guarantee Pill */}
        <div className="cta-response-guarantee">
          <Zap size={12} className="cta-zap-icon" />
          <span>Typical response: <strong>under 2 hours</strong></span>
          <span className="cta-dot-sep">•</span>
          <span>Remote Worldwide & On-Site PK</span>
        </div>

        {/* Primary CTA Buttons */}
        <div className="cta-portal-buttons">
          <a 
            href="mailto:mehmoodislam10@gmail.com?subject=Project%20Inquiry%20-%20Let's%20Build%20Something%20Iconic" 
            className="folio-cta-btn silver-cta-btn cta-primary-action"
          >
            <span className="folio-cta-text">Start a Project</span>
            <span className="folio-cta-circle">
              <ArrowUpRight size={17} strokeWidth={2.6} />
            </span>
          </a>

          <a 
            href="https://www.linkedin.com/in/mehmood-islam-6a2118332/" 
            target="_blank" 
            rel="noreferrer" 
            className="cta-button-ghost silver-ghost-btn cta-secondary-action"
          >
            <LinkedInIcon />
            <span>LinkedIn Profile</span>
          </a>

          <button 
            type="button"
            className="cta-button-ghost silver-ghost-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}
