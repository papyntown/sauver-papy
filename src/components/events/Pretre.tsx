import { useEffect, useRef, useState } from 'react'
import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'

const RETURN_DELAY_MS = 700
const LEAVE_DELAY_MS = 300
const PUSHES_NEEDED = 3

/** Push him away; he comes back twice before finally leaving for good. */
export function Pretre({ onSuccess, onFail, timeLimitMs }: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)
  const [pushCount, setPushCount] = useState(0)
  const [present, setPresent] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function push() {
    if (!present) return
    const count = pushCount + 1
    setPushCount(count)
    setPresent(false)
    if (count >= PUSHES_NEEDED) {
      timeoutRef.current = setTimeout(onSuccess, LEAVE_DELAY_MS)
    } else {
      timeoutRef.current = setTimeout(() => setPresent(true), RETURN_DELAY_MS)
    }
  }

  return (
    <button
      onClick={push}
      disabled={!present}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '.5cqw',
        fontFamily: "'Bungee'",
        fontSize: '1cqw',
        color: '#fff4d8',
        background: '#16201c',
        border: 'none',
        borderRadius: '.6cqw',
        padding: '.6cqw .9cqw',
        cursor: present ? 'pointer' : 'default',
        opacity: present ? 1 : 0.5,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontSize: '1.6cqw',
          transition: 'transform .3s ease',
          transform: present ? 'translateX(0)' : 'translateX(150%)',
        }}
      >
        🙏
      </span>
      REPOUSSER
    </button>
  )
}
