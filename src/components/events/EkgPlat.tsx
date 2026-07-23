import { useRef, useState } from 'react'
import type { TransitionEvent } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'
import { actionButtonStyle, trackStyle } from './shared'

const HOLD_MS = 1800

/** Hold the button until the fill bar completes; release and it resets. */
export function EkgPlat({ onSuccess, onFail, timeLimitMs }: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)

  const fillRef = useRef<HTMLDivElement>(null)
  const [holding, setHolding] = useState(false)

  function start() {
    setHolding(true)
    const fill = fillRef.current
    if (!fill) return
    fill.style.transition = 'none'
    fill.style.width = '0%'
    requestAnimationFrame(() => {
      fill.style.transition = `width ${HOLD_MS}ms linear`
      fill.style.width = '100%'
    })
  }

  function cancel() {
    setHolding(false)
    const fill = fillRef.current
    if (!fill) return
    fill.style.transition = 'none'
    fill.style.width = '0%'
  }

  function onTransitionEnd(e: TransitionEvent<HTMLDivElement>) {
    if (e.propertyName === 'width' && holding) onSuccess()
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
          ref={fillRef}
          onTransitionEnd={onTransitionEnd}
          style={{ height: '100%', width: '0%', background: '#e2402e' }}
        />
      </div>
      <button
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        style={{ ...actionButtonStyle, touchAction: 'none' }}
      >
        MAINTENIR
      </button>
    </div>
  )
}
