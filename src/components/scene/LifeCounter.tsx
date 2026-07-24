import { formatClock } from '#/game/format'

interface LifeCounterProps {
  remainingMs: number
  color: string
}

export function LifeCounter({ remainingMs, color }: LifeCounterProps) {
  return (
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
          boxShadow: '0 0.8cqw 0 rgba(0,0,0,.4),inset 0 0 0 0.3cqw #2c3a33',
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
          <span style={{ color }}>● REC</span>
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
              color,
              textShadow: `0 0 2cqw ${color}`,
              letterSpacing: '.4cqw',
            }}
          >
            {formatClock(remainingMs)}
          </span>
        </div>
      </div>
    </div>
  )
}
