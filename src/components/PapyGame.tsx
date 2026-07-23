import { useEffect, useReducer, useRef, useState } from 'react'
import { createInitialState, gameReducer, MAX_STRIKES } from '#/game/reducer'
import { EVENT_KINDS, EVENT_REGISTRY } from '#/game/registry'
import { EventCard } from './EventCard'

const ESCALATE_AFTER_MS = 90_000

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function formatClock(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function formatSurvived(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m} min ${String(s).padStart(2, '0')}`
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

  const isTitle = screen === 'title'
  const isEnd = screen === 'end'
  const isPlaying = screen === 'playing'
  const activeCount = game.events.length
  const isPanic = isPlaying && (activeCount >= 3 || game.strikes >= 2)
  const isAlert =
    isPlaying && !isPanic && (activeCount >= 1 || game.strikes >= 1)
  const isCalm = isPlaying && !isPanic && !isAlert

  const counterColor = isPanic ? '#ff3b3b' : '#39ff88'
  const ekgColor = counterColor
  const ekgSpeed = isPanic ? '0.7s' : isAlert ? '1.1s' : '1.9s'
  const dripSpeed = isPanic ? '0.5s' : isAlert ? '0.9s' : '1.6s'
  const breatheSpeed = isPanic ? '0.6s' : isAlert ? '1.6s' : '3.4s'
  const browTop = isPanic ? '30%' : '34%'
  const browRotL = isPanic ? '18deg' : isAlert ? '10deg' : '0deg'
  const browRotR = isPanic ? '-18deg' : isAlert ? '-10deg' : '0deg'
  const bpmBase = isPanic ? 178 : isAlert ? 124 : 68
  const bpm =
    bpmBase + Math.round(Math.sin(game.elapsedMs / 260) * (isPanic ? 6 : 2))
  const tintOpacity = isPanic ? 1 : 0
  const tintAnim = isPanic ? 'panicPulse 0.9s ease-in-out infinite' : 'none'
  const shakeAnim = isPanic ? 'roomShake 0.35s linear infinite' : 'none'

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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background:
              'linear-gradient(#c9ebf4 0%,#bfe6f2 58%,#8fd8bb 58%,#7fd1b0 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '58%',
            zIndex: 0,
            backgroundImage:
              'linear-gradient(#a9d8e6 1px,transparent 1px),linear-gradient(90deg,#a9d8e6 1px,transparent 1px)',
            backgroundSize: '7cqw 7cqw',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '42%',
            zIndex: 0,
            backgroundImage:
              'linear-gradient(90deg,#6cc4a2 2px,transparent 2px)',
            backgroundSize: '9cqw 100%',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '14%',
            left: '9%',
            width: '5cqw',
            height: '3cqw',
            zIndex: 0,
            borderRadius: '50%',
            background: '#a7d6b0',
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '26%',
            width: '3cqw',
            height: '6cqw',
            zIndex: 0,
            borderRadius: '50%',
            background: '#a7d6c4',
            opacity: 0.3,
            transform: 'rotate(20deg)',
          }}
        />

        <svg
          viewBox="0 0 100 56.25"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M50 34 C 38 40, 26 34, 15.5 30"
            fill="none"
            stroke="#16201c"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M52 33 C 66 38, 78 30, 84 24"
            fill="none"
            stroke="#16201c"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M50 34 C 40 41, 30 37, 20 33"
            fill="none"
            stroke="#e2402e"
            strokeWidth="0.4"
            strokeLinecap="round"
            strokeDasharray="1.4 1.2"
          />
        </svg>

        {isTitle && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              background: 'linear-gradient(#c9ebf4,#8fd8bb)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4cqw',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                backgroundImage:
                  'repeating-linear-gradient(-45deg,transparent 0 4cqw,rgba(255,255,255,.18) 4cqw 8cqw)',
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                background: '#fff4d8',
                border: '0.8cqw solid #16201c',
                borderRadius: '2cqw',
                padding: '2cqw 3.5cqw 2.6cqw',
                boxShadow: '0 1.4cqw 0 #16201c',
                transform: 'rotate(-2deg)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka'",
                  fontWeight: 700,
                  fontSize: '2cqw',
                  color: '#e2402e',
                  letterSpacing: '.15cqw',
                }}
              >
                ⚠ URGENCES GÉRIATRIQUES ⚠
              </div>
              <div
                style={{
                  fontFamily: "'Bungee'",
                  fontSize: '6.4cqw',
                  lineHeight: 0.92,
                  color: '#16201c',
                  marginTop: '.6cqw',
                  textShadow: '0.5cqw 0.5cqw 0 #7fd1b0',
                }}
              >
                NE MEURS PAS
                <br />
                TOUT DE SUITE,
              </div>
              <div
                style={{
                  fontFamily: "'Bungee'",
                  fontSize: '9cqw',
                  lineHeight: 0.9,
                  color: '#e2402e',
                  textShadow: '0.6cqw 0.6cqw 0 #16201c',
                }}
              >
                PAPY
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: "'VT323'",
                fontSize: '2.6cqw',
                color: '#16201c',
                marginTop: '1.4cqw',
                background: '#ffffffcc',
                padding: '.2cqw 1.2cqw',
                borderRadius: '1cqw',
              }}
            >
              le compte à rebours de la vie a commencé…
            </div>
            <button
              onClick={startGame}
              style={{
                position: 'relative',
                zIndex: 2,
                marginTop: '2.6cqw',
                fontFamily: "'Bungee'",
                fontSize: '3.4cqw',
                color: '#fff4d8',
                background: '#e2402e',
                border: '0.7cqw solid #16201c',
                borderRadius: '1.4cqw',
                padding: '1cqw 4cqw',
                cursor: 'pointer',
                boxShadow: '0 1cqw 0 #16201c',
                animation: 'pulseBtn 1.1s ease-in-out infinite',
              }}
            >
              ▶ JOUER
            </button>
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: "'Fredoka'",
                fontWeight: 600,
                fontSize: '1.5cqw',
                color: '#16201c',
                marginTop: '2.2cqw',
                opacity: 0.8,
              }}
            >
              Game Jam 2026 — thème « compte à rebours »
            </div>
          </div>
        )}

        {isEnd && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              background: 'linear-gradient(#141a17,#1f2a24)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '3cqw',
            }}
          >
            <div
              style={{
                fontFamily: "'Bungee'",
                fontSize: '4.4cqw',
                color: '#7fd1b0',
                textShadow: '0.4cqw 0.4cqw 0 #000',
              }}
            >
              PARTIE TERMINÉE
            </div>
            <div
              style={{
                fontFamily: "'Fredoka'",
                fontWeight: 600,
                fontSize: '1.9cqw',
                color: '#c9ebf4',
                marginTop: '.4cqw',
              }}
            >
              Papy a rendu l'âme… mais avec panache.
            </div>

            <div
              style={{
                marginTop: '2cqw',
                background: '#fff4d8',
                border: '0.7cqw solid #16201c',
                borderRadius: '1.6cqw',
                padding: '1.4cqw 3cqw',
                boxShadow: '0 1cqw 0 #000',
                transform: 'rotate(-1deg)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka'",
                  fontWeight: 700,
                  fontSize: '1.7cqw',
                  color: '#e2402e',
                  textTransform: 'uppercase',
                  letterSpacing: '.1cqw',
                }}
              >
                Espérance de vie prolongée
              </div>
              <div
                style={{
                  fontFamily: "'VT323'",
                  fontSize: '8cqw',
                  lineHeight: 0.9,
                  color: '#16201c',
                }}
              >
                {formatSurvived(game.elapsedMs)}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                gap: '1cqw',
                marginTop: '2cqw',
                width: '62%',
              }}
            >
              {[
                ['🚨 Crises gérées', game.stats.crises],
                ['🦷 Dentiers rattrapés', game.stats.dentiers],
                ['☕ Cafés renversés', game.stats.cafes],
                ['👻 Anecdotes racontées', game.stats.anecdotes],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#25332c',
                    border: '0.35cqw solid #3f5148',
                    borderRadius: '.9cqw',
                    padding: '.7cqw 1.4cqw',
                    fontFamily: "'Fredoka'",
                    fontWeight: 600,
                    fontSize: '1.5cqw',
                    color: '#c9ebf4',
                  }}
                >
                  <span>{label}</span>
                  <b
                    style={{
                      fontFamily: "'VT323'",
                      fontSize: '2.4cqw',
                      color: '#7fd1b0',
                    }}
                  >
                    {value}
                  </b>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: '1.4cqw',
                fontFamily: "'Fredoka'",
                fontWeight: 600,
                fontSize: '1.5cqw',
                color: '#ffd27a',
              }}
            >
              Note du médecin&nbsp;: « Passable, mais quel caractère. »
            </div>

            <button
              onClick={startGame}
              style={{
                marginTop: '2cqw',
                fontFamily: "'Bungee'",
                fontSize: '2.8cqw',
                color: '#16201c',
                background: '#7fd1b0',
                border: '0.6cqw solid #16201c',
                borderRadius: '1.2cqw',
                padding: '.9cqw 3.4cqw',
                cursor: 'pointer',
                boxShadow: '0 0.9cqw 0 #000',
              }}
            >
              ↺ REJOUER
            </button>
          </div>
        )}

        {isPlaying && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <div
              style={{
                position: 'absolute',
                top: '3%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 6,
                width: '36%',
              }}
            >
              <div
                style={{
                  background: '#16201c',
                  border: '0.7cqw solid #0c120f',
                  borderRadius: '1.4cqw',
                  padding: '1cqw 1.4cqw 1.2cqw',
                  boxShadow:
                    '0 0.8cqw 0 rgba(0,0,0,.4),inset 0 0 0 0.3cqw #2c3a33',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: "'Fredoka'",
                    fontWeight: 700,
                    fontSize: '1.3cqw',
                    color: '#7fd1b0',
                    textTransform: 'uppercase',
                    letterSpacing: '.2cqw',
                    padding: '0 .4cqw .3cqw',
                  }}
                >
                  <span>Temps restant</span>
                  <span style={{ color: counterColor }}>● REC</span>
                </div>
                <div
                  style={{
                    background: '#0a0f0c',
                    borderRadius: '.8cqw',
                    padding: '.2cqw 0',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,.35) 3px 4px)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'VT323'",
                      fontSize: '9cqw',
                      lineHeight: 1,
                      color: counterColor,
                      textShadow: `0 0 2cqw ${counterColor}`,
                      letterSpacing: '.4cqw',
                    }}
                  >
                    {formatClock(game.remainingMs)}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: '2.5%',
                top: '34%',
                zIndex: 5,
                width: '21%',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  background: '#efe7d2',
                  border: '0.7cqw solid #16201c',
                  borderRadius: '1.4cqw',
                  padding: '1cqw',
                  boxShadow: '0 0.9cqw 0 rgba(0,0,0,.3)',
                }}
              >
                {isAlert && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-0.3cqw',
                      border: '0.7cqw solid #e2402e',
                      borderRadius: '1.6cqw',
                      animation: 'blinkRed .5s steps(1) infinite',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: "'Fredoka'",
                    fontWeight: 700,
                    fontSize: '1.2cqw',
                    color: '#16201c',
                    marginBottom: '.6cqw',
                  }}
                >
                  <span>CARDIO-3000</span>
                  <span
                    style={{
                      width: '1cqw',
                      height: '1cqw',
                      borderRadius: '50%',
                      background: counterColor,
                      border: '.2cqw solid #16201c',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'relative',
                    height: '11cqw',
                    background: '#07140d',
                    border: '0.4cqw solid #0c120f',
                    borderRadius: '.7cqw',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'linear-gradient(#0e3d24 1px,transparent 1px),linear-gradient(90deg,#0e3d24 1px,transparent 1px)',
                      backgroundSize: '1.6cqw 1.6cqw',
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '200%',
                      display: 'flex',
                      animation: `ekgMove ${ekgSpeed} linear infinite`,
                    }}
                  >
                    {[0, 1].map((i) => (
                      <svg
                        key={i}
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                        style={{ width: '50%', height: '100%' }}
                      >
                        <polyline
                          points="0,20 12,20 16,20 18,8 20,32 22,20 30,20 34,20 36,17 40,20 55,20 60,20 63,3 66,36 69,20 80,20 88,20 90,15 94,20 100,20"
                          fill="none"
                          stroke={ekgColor}
                          strokeWidth="1.1"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: '.6cqw',
                    marginTop: '.5cqw',
                    fontFamily: "'VT323'",
                    color: ekgColor,
                  }}
                >
                  <span style={{ fontSize: '4cqw', lineHeight: 1 }}>{bpm}</span>
                  <span style={{ fontSize: '1.6cqw' }}>BPM</span>
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                right: '5%',
                top: '14%',
                zIndex: 5,
                width: '11%',
                height: '64%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 0,
                  bottom: '8%',
                  width: '0.9cqw',
                  background: 'linear-gradient(90deg,#9aa7a0,#d7ded9,#9aa7a0)',
                  border: '0.25cqw solid #16201c',
                  borderRadius: '1cqw',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '-1%',
                  width: '5cqw',
                  height: '1.4cqw',
                  border: '0.35cqw solid #16201c',
                  borderBottom: 'none',
                  borderRadius: '1cqw 1cqw 0 0',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '5%',
                  width: '6cqw',
                  height: '11cqw',
                  background: '#f4fbf7',
                  border: '0.5cqw solid #16201c',
                  borderRadius: '1cqw 1cqw 1.6cqw 1.6cqw',
                  overflow: 'hidden',
                  boxShadow: '0 0.5cqw 0 rgba(0,0,0,.2)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '70%',
                    background: 'linear-gradient(#ffd27a,#f4b73f)',
                    animation: 'bagWobble 2.4s ease-in-out infinite',
                    transformOrigin: 'bottom',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12%',
                    left: '22%',
                    width: '1.4cqw',
                    height: '5cqw',
                    background: '#ffffff88',
                    borderRadius: '1cqw',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6%',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: "'Fredoka'",
                    fontWeight: 700,
                    fontSize: '1cqw',
                    color: '#16201c',
                  }}
                >
                  JUS DE
                  <br />
                  VIE
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '23%',
                  width: '2cqw',
                  height: '3cqw',
                  background: '#eaf6f0',
                  border: '0.35cqw solid #16201c',
                  borderRadius: '.6cqw',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '35%',
                    background: '#f4b73f',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '.7cqw',
                    height: '.7cqw',
                    borderRadius: '50%',
                    background: '#f4b73f',
                    animation: `drip ${dripSpeed} linear infinite`,
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '30%',
                  bottom: '6%',
                  width: '0.35cqw',
                  background: '#f4b73f',
                  borderRadius: '1cqw',
                  transform: 'translateX(-50%)',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '24%',
                zIndex: 4,
                width: '48%',
                height: '32%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-2%',
                  top: '-34%',
                  width: '12%',
                  height: '80%',
                  background: '#dfe6e1',
                  border: '0.6cqw solid #16201c',
                  borderRadius: '1cqw',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '-2%',
                  top: '-14%',
                  width: '9%',
                  height: '60%',
                  background: '#dfe6e1',
                  border: '0.6cqw solid #16201c',
                  borderRadius: '1cqw',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '2%',
                  right: '2%',
                  top: '14%',
                  height: '64%',
                  background: '#f4fbf7',
                  border: '0.6cqw solid #16201c',
                  borderRadius: '1.4cqw',
                  boxShadow: 'inset 0 -1cqw 0 #d8e6df',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '6%',
                  top: '2%',
                  width: '22%',
                  height: '34%',
                  background: '#ffffff',
                  border: '0.55cqw solid #16201c',
                  borderRadius: '1.6cqw',
                  transform: 'rotate(-4deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '34%',
                  right: '3%',
                  top: '22%',
                  height: '60%',
                  background:
                    'repeating-linear-gradient(90deg,#6fcbaf 0 3cqw,#5cbd9f 3cqw 6cqw)',
                  border: '0.6cqw solid #16201c',
                  borderRadius: '1.2cqw',
                  transformOrigin: 'center bottom',
                  animation: `breathe ${breatheSpeed} ease-in-out infinite`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '32%',
                  top: '20%',
                  width: '8%',
                  height: '64%',
                  background: '#eaf6f0',
                  border: '0.6cqw solid #16201c',
                  borderRadius: '1cqw',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  left: '10%',
                  top: '-8%',
                  width: '20%',
                  aspectRatio: '1/1',
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-6%',
                    top: '42%',
                    width: '16%',
                    height: '22%',
                    background: '#f2c9a0',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '-6%',
                    top: '42%',
                    width: '16%',
                    height: '22%',
                    background: '#f2c9a0',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#f6d3ac',
                    border: '0.6cqw solid #16201c',
                    borderRadius: '46% 46% 50% 50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '24%',
                    top: '8%',
                    width: '22%',
                    height: '14%',
                    background: '#fff0dd',
                    borderRadius: '50%',
                    opacity: 0.7,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '-4%',
                    top: '28%',
                    width: '20%',
                    height: '34%',
                    background: '#eef1ef',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '-4%',
                    top: '28%',
                    width: '20%',
                    height: '34%',
                    background: '#eef1ef',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '50%',
                  }}
                />

                {isCalm && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: '26%',
                        top: '44%',
                        width: '16%',
                        height: 0,
                        borderTop: '0.55cqw solid #16201c',
                        borderRadius: '1cqw',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        right: '26%',
                        top: '44%',
                        width: '16%',
                        height: 0,
                        borderTop: '0.55cqw solid #16201c',
                        borderRadius: '1cqw',
                      }}
                    />
                  </>
                )}
                {isAlert && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: '27%',
                        top: '40%',
                        width: '13%',
                        height: '13%',
                        background: '#fff',
                        border: '0.45cqw solid #16201c',
                        borderRadius: '50%',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '35%',
                          top: '38%',
                          width: '34%',
                          height: '34%',
                          background: '#16201c',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: '28%',
                        top: '44%',
                        width: '13%',
                        height: 0,
                        borderTop: '0.5cqw solid #16201c',
                      }}
                    />
                  </>
                )}
                {isPanic && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: '24%',
                        top: '36%',
                        width: '17%',
                        height: '19%',
                        background: '#fff',
                        border: '0.5cqw solid #16201c',
                        borderRadius: '50%',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '32%',
                          top: '34%',
                          width: '34%',
                          height: '34%',
                          background: '#16201c',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: '24%',
                        top: '36%',
                        width: '17%',
                        height: '19%',
                        background: '#fff',
                        border: '0.5cqw solid #16201c',
                        borderRadius: '50%',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '34%',
                          top: '34%',
                          width: '34%',
                          height: '34%',
                          background: '#16201c',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  </>
                )}

                <div
                  style={{
                    position: 'absolute',
                    left: '25%',
                    top: browTop,
                    width: '18%',
                    height: 0,
                    borderTop: '0.55cqw solid #cfd3d1',
                    transform: `rotate(${browRotL})`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '25%',
                    top: browTop,
                    width: '18%',
                    height: 0,
                    borderTop: '0.55cqw solid #cfd3d1',
                    transform: `rotate(${browRotR})`,
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: '44%',
                    top: '52%',
                    width: '12%',
                    height: '16%',
                    background: '#f2c197',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '50%',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '24%',
                    right: '24%',
                    top: '38%',
                    height: '18%',
                    borderBottom: '0.35cqw solid #16201c',
                    opacity: 0.35,
                  }}
                />

                {isCalm && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '40%',
                      top: '74%',
                      width: '20%',
                      height: '6%',
                      border: '0.5cqw solid #16201c',
                      borderTop: 'none',
                      borderRadius: '0 0 1cqw 1cqw',
                    }}
                  />
                )}
                {isAlert && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '38%',
                      top: '78%',
                      width: '24%',
                      height: 0,
                      borderTop: '0.5cqw solid #16201c',
                    }}
                  />
                )}
                {isPanic && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: '40%',
                        top: '72%',
                        width: '20%',
                        height: '16%',
                        background: '#7a2a24',
                        border: '0.5cqw solid #16201c',
                        borderRadius: '50%',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        right: '6%',
                        top: '30%',
                        width: '1.4cqw',
                        height: '1.4cqw',
                        background: '#8fd8ec',
                        border: '0.35cqw solid #16201c',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'rotate(45deg)',
                        animation: 'sweatDrop 1.1s ease-in infinite',
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    position: 'absolute',
                    left: '34%',
                    top: '66%',
                    width: '32%',
                    height: '9%',
                    background: '#eef1ef',
                    border: '0.5cqw solid #16201c',
                    borderRadius: '0 0 1cqw 1cqw',
                  }}
                />

                {isCalm && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        right: '-24%',
                        top: 0,
                        fontFamily: "'Bungee'",
                        fontSize: '2.4cqw',
                        color: '#5cbd9f',
                        animation: 'zzz 2.4s ease-in-out infinite',
                      }}
                    >
                      z
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: '-30%',
                        top: '6%',
                        fontFamily: "'Bungee'",
                        fontSize: '3.2cqw',
                        color: '#6fcbaf',
                        animation: 'zzz 2.4s ease-in-out infinite',
                        animationDelay: '.8s',
                      }}
                    >
                      Z
                    </div>
                  </>
                )}
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '38%',
                  top: '34%',
                  width: '14%',
                  height: '9%',
                  background: '#f6d3ac',
                  border: '0.55cqw solid #16201c',
                  borderRadius: '1cqw',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '2%',
                zIndex: 7,
                width: '95%',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '.8cqw' }}
              >
                <div
                  style={{
                    flex: '0 0 auto',
                    fontFamily: "'Bungee'",
                    fontSize: '1.15cqw',
                    color: '#16201c',
                    background: '#ffd27a',
                    border: '0.45cqw solid #16201c',
                    borderRadius: '.9cqw',
                    padding: '.5cqw .8cqw',
                    boxShadow: '0 .5cqw 0 #16201c',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}
                >
                  URGENCES
                  <br />
                  ACTIVES{' '}
                  <span style={{ color: '#e2402e' }}>{activeCount}/3</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    gap: '.8cqw',
                    minHeight: '8cqw',
                  }}
                >
                  {game.events.map((ev) => (
                    <EventCard
                      key={ev.id}
                      id={ev.id}
                      def={EVENT_REGISTRY[ev.kind]}
                      dispatch={dispatch}
                    />
                  ))}
                  {activeCount === 0 && (
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#eaf6f0',
                        border: '0.5cqw dashed #7fb59e',
                        borderRadius: '1cqw',
                        fontFamily: "'Fredoka'",
                        fontWeight: 600,
                        fontSize: '1.5cqw',
                        color: '#5a6f65',
                      }}
                    >
                      Tout est calme… (trop calme ?)
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 8,
                pointerEvents: 'none',
                background:
                  'radial-gradient(circle at 50% 45%,rgba(226,64,46,.12) 10%,#e2402e 115%)',
                opacity: tintOpacity,
                animation: tintAnim,
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
