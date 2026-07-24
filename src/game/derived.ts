import type { GameState } from './types'

export interface Vitals {
  activeCount: number
  isPanic: boolean
  isAlert: boolean
  isCalm: boolean
  counterColor: string
  ekgSpeed: string
  dripSpeed: string
  breatheSpeed: string
  browTop: string
  browRotL: string
  browRotR: string
  bpm: number
  tintOpacity: number
  tintAnim: string
  shakeAnim: string
}

/** Every visual cue (monitor, bed, tint, screen shake) derives from this. */
export function getVitals(game: GameState, isPlaying: boolean): Vitals {
  const activeCount = game.events.length
  const isPanic = isPlaying && (activeCount >= 3 || game.strikes >= 2)
  const isAlert =
    isPlaying && !isPanic && (activeCount >= 1 || game.strikes >= 1)
  const isCalm = isPlaying && !isPanic && !isAlert

  const counterColor = isPanic ? '#ff3b3b' : '#39ff88'
  const bpmBase = isPanic ? 178 : isAlert ? 124 : 68
  const bpm =
    bpmBase + Math.round(Math.sin(game.elapsedMs / 260) * (isPanic ? 6 : 2))

  return {
    activeCount,
    isPanic,
    isAlert,
    isCalm,
    counterColor,
    ekgSpeed: isPanic ? '0.7s' : isAlert ? '1.1s' : '1.9s',
    dripSpeed: isPanic ? '0.5s' : isAlert ? '0.9s' : '1.6s',
    breatheSpeed: isPanic ? '0.6s' : isAlert ? '1.6s' : '3.4s',
    browTop: isPanic ? '30%' : '34%',
    browRotL: isPanic ? '18deg' : isAlert ? '10deg' : '0deg',
    browRotR: isPanic ? '-18deg' : isAlert ? '-10deg' : '0deg',
    bpm,
    tintOpacity: isPanic ? 1 : 0,
    tintAnim: isPanic ? 'panicPulse 0.9s ease-in-out infinite' : 'none',
    shakeAnim: isPanic ? 'roomShake 0.35s linear infinite' : 'none',
  }
}
