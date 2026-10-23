// Web Audio API ambient atmospheric sound generator
class AmbientAudioEngine {
  constructor() {
    this.ctx = null
    this.filter = null
    this.gainNode = null
    this.oscillators = []
    this.isInitialized = false
  }

  init() {
    if (this.isInitialized) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    this.ctx = new AudioContext()

    // Master Gain
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime)

    // Lowpass filter for smooth cinematic warmth
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime)
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime)

    this.gainNode.connect(this.filter)
    this.filter.connect(this.ctx.destination)

    // Deep ethereal sub-chords (Root C2, Fifth G2, Octave C3)
    const freqs = [65.41, 98.0, 130.81, 196.0]
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator()
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(f, this.ctx.currentTime)
      
      const subGain = this.ctx.createGain()
      subGain.gain.setValueAtTime(0.12 / freqs.length, this.ctx.currentTime)
      
      osc.connect(subGain)
      subGain.connect(this.gainNode)
      osc.start()
      this.oscillators.push(osc)
    })

    this.isInitialized = true
  }

  setVolume(volume) {
    if (!this.ctx || !this.gainNode) return
    const now = this.ctx.currentTime
    this.gainNode.gain.cancelScheduledValues(now)
    this.gainNode.gain.linearRampToValueAtTime(Math.max(0.0001, volume), now + 0.3)
  }

  updateScrollVelocity(velocity) {
    if (!this.ctx || !this.filter) return
    const targetFreq = 260 + Math.min(800, velocity * 400)
    const now = this.ctx.currentTime
    this.filter.frequency.setTargetAtTime(targetFreq, now, 0.15)
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }
}

export const audioEngine = new AmbientAudioEngine()
