interface TitleScreenProps {
  onPlay: () => void
}

export function TitleScreen({ onPlay }: TitleScreenProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        background: 'linear-gradient(#c9ebf4,#8fd8bb)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4cqw',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage:
            'repeating-linear-gradient(-45deg,transparent 0 4cqw,rgba(255,255,255,.18) 4cqw 8cqw)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#fff4d8',
          border: '0.8cqw solid #16201c',
          borderRadius: '2cqw',
          padding: '2cqw 3.5cqw 2.6cqw',
          boxShadow: '0 1.4cqw 0 #16201c',
          transform: 'rotate(-2deg)',
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka'",
            fontWeight: 700,
            fontSize: '2cqw',
            color: '#e2402e',
            letterSpacing: '.15cqw',
          }}
        >
          ⚠ URGENCES GÉRIATRIQUES ⚠
        </div>
        <div
          style={{
            fontFamily: "'Bungee'",
            fontSize: '6.4cqw',
            lineHeight: 0.92,
            color: '#16201c',
            marginTop: '.6cqw',
            textShadow: '0.5cqw 0.5cqw 0 #7fd1b0',
          }}
        >
          NE MEURS PAS
          <br />
          TOUT DE SUITE,
        </div>
        <div
          style={{
            fontFamily: "'Bungee'",
            fontSize: '9cqw',
            lineHeight: 0.9,
            color: '#e2402e',
            textShadow: '0.6cqw 0.6cqw 0 #16201c',
          }}
        >
          PAPY
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'VT323'",
          fontSize: '2.6cqw',
          color: '#16201c',
          marginTop: '1.4cqw',
          background: '#ffffffcc',
          padding: '.2cqw 1.2cqw',
          borderRadius: '1cqw',
        }}
      >
        le compte à rebours de la vie a commencé…
      </div>
      <button
        onClick={onPlay}
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '2.6cqw',
          fontFamily: "'Bungee'",
          fontSize: '3.4cqw',
          color: '#fff4d8',
          background: '#e2402e',
          border: '0.7cqw solid #16201c',
          borderRadius: '1.4cqw',
          padding: '1cqw 4cqw',
          cursor: 'pointer',
          boxShadow: '0 1cqw 0 #16201c',
          animation: 'pulseBtn 1.1s ease-in-out infinite',
        }}
      >
        ▶ JOUER
      </button>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Fredoka'",
          fontWeight: 600,
          fontSize: '1.5cqw',
          color: '#16201c',
          marginTop: '2.2cqw',
          opacity: 0.8,
        }}
      >
        Game Jam 2026 — thème « compte à rebours »
      </div>
    </div>
  )
}
