import { useState } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'

const PLUGS = ['#e2402e', '#3fa7e0', '#f4b73f']

/** Three plugs, only one is the right one — pick wrong and it's instant fail. */
export function CableDebranche({
  onSuccess,
  onFail,
  timeLimitMs,
}: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)
  const [correct] = useState(() => Math.floor(Math.random() * PLUGS.length))

  return (
    <div style={{ display: 'flex', gap: '.6cqw' }}>
      {PLUGS.map((color, i) => (
        <button
          key={i}
          onClick={() => (i === correct ? onSuccess() : onFail())}
          style={{
            width: '3cqw',
            height: '3cqw',
            borderRadius: '.7cqw',
            background: color,
            border: '0.35cqw solid #16201c',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  )
}
