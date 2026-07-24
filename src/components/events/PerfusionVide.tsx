import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'

/** Drag the bag onto the stand. Pure pointer events, no dnd library. */
export function PerfusionVide({
  onSuccess,
  onFail,
  timeLimitMs,
}: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)

  const bagRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const dragOrigin = useRef<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragOrigin.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // capture is a nice-to-have (keeps the drag going if the pointer
      // leaves the element); the drag itself doesn't depend on it
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragOrigin.current || !bagRef.current) return
    const dx = e.clientX - dragOrigin.current.x
    const dy = e.clientY - dragOrigin.current.y
    bagRef.current.style.transition = 'none'
    bagRef.current.style.transform = `translate(${dx}px, ${dy}px)`
  }

  function onPointerUp() {
    const bag = bagRef.current
    const target = targetRef.current
    dragOrigin.current = null
    setDragging(false)
    if (!bag || !target) return

    const bagRect = bag.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const overlaps =
      bagRect.left < targetRect.right &&
      bagRect.right > targetRect.left &&
      bagRect.top < targetRect.bottom &&
      bagRect.bottom > targetRect.top

    if (overlaps) {
      onSuccess()
      return
    }
    bag.style.transition = 'transform .25s ease'
    bag.style.transform = 'translate(0,0)'
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1cqw',
        width: '100%',
      }}
    >
      <div
        ref={targetRef}
        style={{
          flex: '0 0 auto',
          width: '3cqw',
          height: '3cqw',
          borderRadius: '50%',
          border: '0.3cqw dashed #16201c',
          opacity: 0.7,
        }}
      />
      <div
        ref={bagRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          flex: '0 0 auto',
          width: '3cqw',
          height: '3cqw',
          borderRadius: '50%',
          background: '#f4b73f',
          border: '0.3cqw solid #16201c',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      />
      <div
        style={{
          fontFamily: "'Fredoka'",
          fontWeight: 600,
          fontSize: '1.02cqw',
          color: '#2c3a33',
        }}
      >
        glisse la poche sur le crochet
      </div>
    </div>
  )
}
