import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="folio-navbar">
      {/* Brand Logo */}
      <a href="#home" className="folio-brand">
        Folioblox
      </a>

      {/* Centered Navigation Links */}
      <nav className="folio-nav-menu">
        <a href="#home" className="folio-nav-item active">Home</a>
        <a href="#about" className="folio-nav-item">About</a>
        <a href="#projects" className="folio-nav-item">Projects</a>
        <a href="#workflow" className="folio-nav-item">Workflow</a>
        <a href="#contact" className="folio-nav-item">Contact</a>
      </nav>

      {/* CTA Get In Touch Button */}
      <a href="#contact" className="folio-cta-btn">
        <span className="folio-cta-text">Get in touch</span>
        <span className="folio-cta-circle">
          <ArrowUpRight size={17} strokeWidth={2.6} />
        </span>
      </a>
    </header>
  )
}
