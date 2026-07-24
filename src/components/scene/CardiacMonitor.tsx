interface CardiacMonitorProps {
  isAlert: boolean
  color: string
  ekgSpeed: string
  bpm: number
}

export function CardiacMonitor({
  isAlert,
  color,
  ekgSpeed,
  bpm,
}: CardiacMonitorProps) {
  return (
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
              background: color,
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
                  stroke={color}
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
            color,
          }}
        >
          <span style={{ fontSize: '4cqw', lineHeight: 1 }}>{bpm}</span>
          <span style={{ fontSize: '1.6cqw' }}>BPM</span>
        </div>
      </div>
    </div>
  )
}
