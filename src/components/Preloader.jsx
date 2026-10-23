import React from 'react'

export default function Preloader({ progress, isReady, onEnter }) {
  return (
    <div className={`preloader-screen ${isReady ? 'hidden' : ''}`}>
      <div className="preloader-spinner-box">
        <div className="preloader-ring"></div>
        <div className="preloader-ring-inner"></div>
        <span className="preloader-percent">{Math.round(progress)}%</span>
      </div>

      <div className="preloader-info">
        <h2 className="preloader-title">INITIALIZING VISUAL ENGINE</h2>
        <p className="preloader-subtitle">Caching 240 Ultra-HD Sequence Frames • 60 FPS Target</p>
      </div>

      <div className="preloader-bar-wrapper">
        <div 
          className="preloader-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {progress >= 90 && (
        <button 
          className="cta-button" 
          onClick={onEnter}
          style={{ marginTop: '0.75rem', animation: 'fadeIn 0.3s ease' }}
        >
          START EXPLORING
        </button>
      )}
    </div>
  )
}
