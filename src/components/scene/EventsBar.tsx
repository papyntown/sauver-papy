import type { Dispatch } from 'react'
import type { ActiveEvent, GameAction } from '#/game/types'
import { EVENT_REGISTRY } from '#/game/registry'
import { EventCard } from '../EventCard'

interface EventsBarProps {
  events: Array<ActiveEvent>
  activeCount: number
  dispatch: Dispatch<GameAction>
}

export function EventsBar({ events, activeCount, dispatch }: EventsBarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '2%',
        zIndex: 7,
        width: '95%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '.8cqw' }}>
        <div
          style={{
            flex: '0 0 auto',
            fontFamily: "'Bungee'",
            fontSize: '1.15cqw',
            color: '#16201c',
            background: '#ffd27a',
            border: '0.45cqw solid #16201c',
            borderRadius: '.9cqw',
            padding: '.5cqw .8cqw',
            boxShadow: '0 .5cqw 0 #16201c',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          URGENCES
          <br />
          ACTIVES <span style={{ color: '#e2402e' }}>{activeCount}/3</span>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: '.8cqw',
            minHeight: '8cqw',
          }}
        >
          {events.map((ev) => (
            <EventCard
              key={ev.id}
              id={ev.id}
              def={EVENT_REGISTRY[ev.kind]}
              dispatch={dispatch}
            />
          ))}
          {activeCount === 0 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#eaf6f0',
                border: '0.5cqw dashed #7fb59e',
                borderRadius: '1cqw',
                fontFamily: "'Fredoka'",
                fontWeight: 600,
                fontSize: '1.5cqw',
                color: '#5a6f65',
              }}
            >
              Tout est calme… (trop calme ?)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
