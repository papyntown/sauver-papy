import type { Stats } from '#/game/types'
import { formatSurvived } from '#/game/format'

interface EndScreenProps {
  elapsedMs: number
  stats: Stats
  onReplay: () => void
}

export function EndScreen({ elapsedMs, stats, onReplay }: EndScreenProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        background: 'linear-gradient(#141a17,#1f2a24)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3cqw',
      }}
    >
      <div
        style={{
          fontFamily: "'Bungee'",
          fontSize: '4.4cqw',
          color: '#7fd1b0',
          textShadow: '0.4cqw 0.4cqw 0 #000',
        }}
      >
        PARTIE TERMINÉE
      </div>
      <div
        style={{
          fontFamily: "'Fredoka'",
          fontWeight: 600,
          fontSize: '1.9cqw',
          color: '#c9ebf4',
          marginTop: '.4cqw',
        }}
      >
        Papy a rendu l'âme… mais avec panache.
      </div>

      <div
        style={{
          marginTop: '2cqw',
          background: '#fff4d8',
          border: '0.7cqw solid #16201c',
          borderRadius: '1.6cqw',
          padding: '1.4cqw 3cqw',
          boxShadow: '0 1cqw 0 #000',
          transform: 'rotate(-1deg)',
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka'",
            fontWeight: 700,
            fontSize: '1.7cqw',
            color: '#e2402e',
            textTransform: 'uppercase',
            letterSpacing: '.1cqw',
          }}
        >
          Espérance de vie prolongée
        </div>
        <div
          style={{
            fontFamily: "'VT323'",
            fontSize: '8cqw',
            lineHeight: 0.9,
            color: '#16201c',
          }}
        >
          {formatSurvived(elapsedMs)}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
          gap: '1cqw',
          marginTop: '2cqw',
          width: '62%',
        }}
      >
        {[
          ['🚨 Crises gérées', stats.crises],
          ['🦷 Dentiers rattrapés', stats.dentiers],
          ['☕ Cafés renversés', stats.cafes],
          ['👻 Anecdotes racontées', stats.anecdotes],
        ].map(([label, value]) => (
          <div
            key={label as string}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#25332c',
              border: '0.35cqw solid #3f5148',
              borderRadius: '.9cqw',
              padding: '.7cqw 1.4cqw',
              fontFamily: "'Fredoka'",
              fontWeight: 600,
              fontSize: '1.5cqw',
              color: '#c9ebf4',
            }}
          >
            <span>{label}</span>
            <b
              style={{
                fontFamily: "'VT323'",
                fontSize: '2.4cqw',
                color: '#7fd1b0',
              }}
            >
              {value}
            </b>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '1.4cqw',
          fontFamily: "'Fredoka'",
          fontWeight: 600,
          fontSize: '1.5cqw',
          color: '#ffd27a',
        }}
      >
        Note du médecin&nbsp;: « Passable, mais quel caractère. »
      </div>

      <button
        onClick={onReplay}
        style={{
          marginTop: '2cqw',
          fontFamily: "'Bungee'",
          fontSize: '2.8cqw',
          color: '#16201c',
          background: '#7fd1b0',
          border: '0.6cqw solid #16201c',
          borderRadius: '1.2cqw',
          padding: '.9cqw 3.4cqw',
          cursor: 'pointer',
          boxShadow: '0 0.9cqw 0 #000',
        }}
      >
        ↺ REJOUER
      </button>
    </div>
  )
}
