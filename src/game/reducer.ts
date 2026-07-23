import type { GameAction, GameState } from './types'

export const START_MS = 180_000
export const MAX_STRIKES = 3
export const MISS_PENALTY_MS = 8_000
export const RESOLVE_BONUS_MS = 3_000

export function createInitialState(): GameState {
  return {
    remainingMs: START_MS,
    elapsedMs: 0,
    events: [],
    strikes: 0,
    stats: { crises: 0, dentiers: 0, cafes: 0, anecdotes: 0 },
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        remainingMs: Math.max(0, state.remainingMs - action.dt),
        elapsedMs: state.elapsedMs + action.dt,
      }

    case 'SPAWN':
      if (state.events.length >= 3) return state
      return {
        ...state,
        events: [...state.events, { id: action.id, kind: action.kind }],
      }

    case 'RESOLVE':
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.id),
        remainingMs: state.remainingMs + RESOLVE_BONUS_MS,
        stats: {
          ...state.stats,
          [action.statKey]: state.stats[action.statKey] + 1,
        },
      }

    case 'MISS':
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.id),
        remainingMs: Math.max(0, state.remainingMs - MISS_PENALTY_MS),
        strikes: state.strikes + 1,
      }

    case 'STAT_TICK':
      return {
        ...state,
        stats: { ...state.stats, [action.key]: state.stats[action.key] + 1 },
      }

    case 'RESET':
      return createInitialState()

    default:
      return state
  }
}
