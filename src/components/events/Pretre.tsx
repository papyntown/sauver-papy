import { useEffect, useRef } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'
import { SceneEventLabel } from '../scene/SceneEventLabel'
import { DOOR_POSITION } from '../scene/doorPosition'

/** He approaches through the door — click to shut it on him before he arrives. */
export function Pretre({ onSuccess, onFail, timeLimitMs }: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)
  const figureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = figureRef.current
    if (!el) return
    el.style.transition = 'none'
    el.style.transform = 'translateY(40%) scale(0.55)'
    requestAnimationFrame(() => {
      el.style.transition = `transform ${timeLimitMs}ms linear`
      el.style.transform = 'translateY(0) scale(1)'
    })
  }, [timeLimitMs])

  return (
    <div
      onClick={onSuccess}
      role="button"
      style={{
        position: 'absolute',
        ...DOOR_POSITION,
        zIndex: 9,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <SceneEventLabel
        name="LE PRÊTRE"
        accent="#ffb020"
        timeLimitMs={timeLimitMs}
      />
      <div
        ref={figureRef}
        style={{
          position: 'relative',
          width: '65%',
          marginBottom: '4%',
          filter: 'drop-shadow(0 0 .4cqw #ffe9a8)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '4.4cqw',
            background: '#0a0c0b',
            border: '0.25cqw solid #ffe9a8',
            borderRadius: '1.4cqw 1.4cqw 0 0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-2.6cqw',
            transform: 'translateX(-50%)',
            width: '2.4cqw',
            height: '2.4cqw',
            borderRadius: '50%',
            background: '#0a0c0b',
            border: '0.25cqw solid #ffe9a8',
          }}
        />
      </div>
    </div>
  )
}
