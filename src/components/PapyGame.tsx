import { useEffect, useReducer, useRef, useState } from 'react'
import { createInitialState, gameReducer, MAX_STRIKES } from '#/game/reducer'
import { EVENT_KINDS } from '#/game/registry'
import { getVitals } from '#/game/derived'
import { Background } from './scene/Background'
import { TitleScreen } from './scene/TitleScreen'
import { EndScreen } from './scene/EndScreen'
import { GameScreen } from './scene/GameScreen'

const ESCALATE_AFTER_MS = 90_000

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function PapyGame() {
  const [screen, setScreen] = useState<'title' | 'playing' | 'end'>('title')
  const [game, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  )
  const gameRef = useRef(game)
  gameRef.current = game

  const idRef = useRef(0)
  const lastTsRef = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  )
  const spawnInRef = useRef(2500)
  const cafeInRef = useRef(randRange(15_000, 25_000))
  const anecdoteInRef = useRef(randRange(8_000, 14_000))

  // The engine only schedules spawns and the ambient flavor stats — every
  // event's own success/fail timing is handled inside its own component.
  useEffect(() => {
    if (screen !== 'playing') return
    lastTsRef.current = Date.now()

    function frame() {
      const ts = Date.now()
      const dt = ts - (lastTsRef.current ?? ts)
      lastTsRef.current = ts
      dispatch({ type: 'TICK', dt })

      const g = gameRef.current

      spawnInRef.current -= dt
      if (spawnInRef.current <= 0 && g.events.length < 3) {
        const activeKinds = new Set(g.events.map((e) => e.kind))
        const pool = EVENT_KINDS.filter((k) => !activeKinds.has(k))
        const candidates = pool.length ? pool : EVENT_KINDS
        const kind = candidates[Math.floor(Math.random() * candidates.length)]
        idRef.current += 1
        dispatch({ type: 'SPAWN', id: idRef.current, kind })
        spawnInRef.current =
          g.elapsedMs > ESCALATE_AFTER_MS
            ? randRange(2200, 4200)
            : randRange(3200, 6200)
      }

      cafeInRef.current -= dt
      if (cafeInRef.current <= 0) {
        dispatch({ type: 'STAT_TICK', key: 'cafes' })
        cafeInRef.current = randRange(15_000, 25_000)
      }

      anecdoteInRef.current -= dt
      if (anecdoteInRef.current <= 0) {
        dispatch({ type: 'STAT_TICK', key: 'anecdotes' })
        anecdoteInRef.current = randRange(8_000, 14_000)
      }
    }

    intervalRef.current = setInterval(frame, 100)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [screen])

  useEffect(() => {
    if (
      screen === 'playing' &&
      (game.remainingMs <= 0 || game.strikes >= MAX_STRIKES)
    ) {
      setScreen('end')
    }
  }, [screen, game.remainingMs, game.strikes])

  function startGame() {
    idRef.current = 0
    spawnInRef.current = 2500
    cafeInRef.current = randRange(15_000, 25_000)
    anecdoteInRef.current = randRange(8_000, 14_000)
    dispatch({ type: 'RESET' })
    setScreen('playing')
  }

  const { shakeAnim } = getVitals(game, screen === 'playing')

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#171b1a',
        backgroundImage:
          'radial-gradient(circle at 50% 0%, #23302b 0%, #171b1a 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: "'Fredoka',sans-serif",
      }}
    >
      <div
        style={{
          position: 'relative',
          containerType: 'size',
          width: 'min(94vw,1400px)',
          aspectRatio: '16/9',
          borderRadius: 18,
          overflow: 'hidden',
          border: '7px solid #16201c',
          boxShadow: '0 24px 0 rgba(0,0,0,.35),0 0 0 3px #3f5148',
          animation: shakeAnim,
          background: '#bfe6f2',
        }}
      >
        <Background />

        {screen === 'title' && <TitleScreen onPlay={startGame} />}
        {screen === 'end' && (
          <EndScreen
            elapsedMs={game.elapsedMs}
            stats={game.stats}
            onReplay={startGame}
          />
        )}
        {screen === 'playing' && <GameScreen game={game} dispatch={dispatch} />}
      </div>
    </div>
  )
}
