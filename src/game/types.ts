import type { ComponentType } from 'react'

export type EventKind =
  | 'hoquet'
  | 'dentier'
  | 'tension'
  | 'moustique'
  | 'perfusion-vide'
  | 'ekg-plat'
  | 'cable-debranche'
  | 'oxygene'
  | 'pretre'
  | 'lever'
  | 'famille-telephone'

export type StatKey = 'crises' | 'dentiers' | 'cafes' | 'anecdotes'

/**
 * Contract every event mini-game must implement. A mini-game owns its own
 * interaction + internal timer, and only ever communicates outward through
 * these two callbacks — it never reads or dispatches to the game state.
 */
export interface MiniGameProps {
  onSuccess: () => void
  onFail: () => void
  timeLimitMs: number
}

export interface EventDef {
  kind: EventKind
  name: string
  desc: string
  icon: string
  accent: string
  anim: string
  timeLimitMs: number
  statKey: StatKey
  Component: ComponentType<MiniGameProps>
}

export interface ActiveEvent {
  id: number
  kind: EventKind
}

export type Stats = Record<StatKey, number>

export interface GameState {
  remainingMs: number
  elapsedMs: number
  events: Array<ActiveEvent>
  strikes: number
  stats: Stats
}

export type GameAction =
  | { type: 'TICK'; dt: number }
  | { type: 'SPAWN'; id: number; kind: EventKind }
  | { type: 'RESOLVE'; id: number; statKey: StatKey }
  | { type: 'MISS'; id: number }
  | { type: 'STAT_TICK'; key: StatKey }
  | { type: 'RESET' }
