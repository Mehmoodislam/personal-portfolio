import React from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sliders } from 'lucide-react'

export default function ControlsHUD({
  isPlaying,
  onTogglePlay,
  currentFrame,
  totalFrames,
  onScrub,
  onReset,
  isMuted,
  onToggleMute
}) {
  return (
    <div className="controls-hud">
      {/* Play / Pause toggle */}
      <button 
        className={`hud-btn ${isPlaying ? 'active' : ''}`}
        onClick={onTogglePlay}
        title={isPlaying ? 'Pause auto-play' : 'Auto play sequence'}
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
      </button>

      {/* Frame Scrubber */}
      <div className="scrubber-wrapper">
        <input 
          type="range"
          min="0"
          max={totalFrames - 1}
          value={currentFrame}
          onChange={(e) => onScrub(Number(e.target.value))}
          className="scrubber-slider"
          title="Drag to scrub frames"
        />
        <div className="scrubber-counter">
          {String(currentFrame + 1).padStart(3, '0')} / {totalFrames}
        </div>
      </div>

      {/* Reset button */}
      <button 
        className="hud-btn"
        onClick={onReset}
        title="Scroll back to start"
      >
        <RotateCcw size={15} />
      </button>

      {/* Futuristic Sound Ambience */}
      <button 
        className={`hud-btn ${!isMuted ? 'active' : ''}`}
        onClick={onToggleMute}
        title={isMuted ? 'Enable Ambient Audio' : 'Mute Ambient Audio'}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
    </div>
  )
}
