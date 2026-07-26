import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'
import { SceneEventLabel } from '../scene/SceneEventLabel'

/** Appears in the room, buzzing near the bed — click it to swat it. */
export function Moustique({ onSuccess, onFail, timeLimitMs }: MiniGameProps) {
  useAutoFail(onFail, timeLimitMs)

  return (
    <div style={{ position: 'absolute', left: '46%', top: '36%', zIndex: 9 }}>
      <SceneEventLabel
        name="MOUSTIQUE HOSTILE"
        accent="#ffb020"
        timeLimitMs={timeLimitMs}
      />
      <button
        onClick={onSuccess}
        aria-label="Écraser le moustique"
        style={{
          display: 'block',
          width: '4.5cqw',
          height: '2.8cqw',
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          animation: 'mosquitoFly 2.2s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 40 24" width="100%" height="100%">
          <ellipse
            cx="14"
            cy="6"
            rx="9"
            ry="4"
            fill="#e8e4e4"
            opacity="0.55"
            transform="rotate(-15 14 6)"
          />
          <ellipse
            cx="14"
            cy="18"
            rx="9"
            ry="4"
            fill="#e8e4e4"
            opacity="0.55"
            transform="rotate(15 14 18)"
          />
          <ellipse cx="20" cy="12" rx="10" ry="4" fill="#3a3f3d" />
          <circle cx="9" cy="12" r="3" fill="#3a3f3d" />
          <line
            x1="6"
            y1="12"
            x2="0"
            y2="12"
            stroke="#3a3f3d"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="15"
            x2="14"
            y2="22"
            stroke="#3a3f3d"
            strokeWidth="1"
          />
          <line
            x1="22"
            y1="16"
            x2="22"
            y2="23"
            stroke="#3a3f3d"
            strokeWidth="1"
          />
          <line
            x1="28"
            y1="15"
            x2="30"
            y2="22"
            stroke="#3a3f3d"
            strokeWidth="1"
          />
        </svg>
      </button>
    </div>
  )
}
