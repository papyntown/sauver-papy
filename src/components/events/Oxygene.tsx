import { useState } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'
import { trackStyle } from './shared'

const STEPS = 6
type Side = 'l' | 'r'

/** Pump by alternating sides; repeating the same side wastes the click. */
export function Oxygene({ onSuccess, onFail, timeLimitMs }: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)
  const [progress, setProgress] = useState(0)
  const [lastSide, setLastSide] = useState<Side | null>(null)
  const [buzz, setBuzz] = useState<Side | null>(null)

  function pump(side: Side) {
    if (side === lastSide) {
      setBuzz(side)
      setTimeout(() => setBuzz(null), 150)
      return
    }
    setLastSide(side)
    const next = progress + 100 / STEPS
    if (next >= 100) onSuccess()
    else setProgress(next)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.4cqw',
        width: '100%',
      }}
    >
      <div style={trackStyle}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#3fa7e0',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '.5cqw' }}>
        {(['l', 'r'] as const).map((side) => (
          <button
            key={side}
            onClick={() => pump(side)}
            style={{
              flex: 1,
              fontFamily: "'Bungee'",
              fontSize: '1.1cqw',
              color: '#fff4d8',
              background: '#16201c',
              border: 'none',
              borderRadius: '.6cqw',
              padding: '.5cqw 0',
              cursor: 'pointer',
              animation: buzz === side ? 'shakeX .15s linear' : 'none',
            }}
          >
            {side === 'l' ? '◀' : '▶'}
          </button>
        ))}
      </div>
    </div>
  )
}
