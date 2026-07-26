interface SceneEventLabelProps {
  name: string
  accent: string
  timeLimitMs: number
}

/** Small floating badge (name + shrinking timer) that follows a scene-anchored event. */
export function SceneEventLabel({
  name,
  accent,
  timeLimitMs,
}: SceneEventLabelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '100%',
        transform: 'translateX(-50%)',
        marginBottom: '.4cqw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '.25cqw',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          fontFamily: "'Bungee'",
          fontSize: '.95cqw',
          color: '#fff4d8',
          background: '#16201c',
          border: '0.3cqw solid #16201c',
          borderRadius: '.6cqw',
          padding: '.3cqw .6cqw',
        }}
      >
        {name}
      </div>
      <div
        style={{
          width: '5cqw',
          height: '.45cqw',
          background: '#ffffffaa',
          border: '0.18cqw solid #16201c',
          borderRadius: '1cqw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            background: accent,
            animation: `shrinkBar ${timeLimitMs}ms linear forwards`,
          }}
        />
      </div>
    </div>
  )
}
