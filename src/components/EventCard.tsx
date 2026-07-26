import type { Dispatch } from 'react'
import type { EventDef, GameAction } from '#/game/types'
import { useEventOutcome } from '#/game/useEventOutcome'

interface EventCardProps {
  def: EventDef
  id: number
  dispatch: Dispatch<GameAction>
}

/**
 * Generic chrome shared by every card-placed event: name/desc header, a
 * CSS-only shrinking timer bar, and a slot for the registry's mini-game
 * component. 'scene'-placed events (see EventDef.placement) skip this
 * entirely — they render themselves over the room decor instead.
 */
export function EventCard({ def, id, dispatch }: EventCardProps) {
  const { onSuccess, onFail } = useEventOutcome(dispatch, id, def.statKey)
  const Component = def.Component

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '.4cqw',
        background: '#ffe9b8',
        border: '0.5cqw solid #16201c',
        borderRadius: '1cqw',
        padding: '.6cqw .7cqw',
        boxShadow: '0 .6cqw 0 rgba(0,0,0,.25)',
        animation: def.anim,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '.7cqw' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Fredoka'",
              fontWeight: 700,
              fontSize: '1.3cqw',
              color: '#16201c',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {def.name}
          </div>
          <div
            style={{
              fontFamily: "'Fredoka'",
              fontWeight: 500,
              fontSize: '1.02cqw',
              color: '#2c3a33',
              margin: '.2cqw 0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {def.desc}
          </div>
        </div>
      </div>

      <div
        style={{
          height: '.6cqw',
          background: '#ffffffaa',
          border: '0.2cqw solid #16201c',
          borderRadius: '1cqw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            background: def.accent,
            animation: `shrinkBar ${def.timeLimitMs}ms linear forwards`,
          }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Component
          onSuccess={onSuccess}
          onFail={onFail}
          timeLimitMs={def.timeLimitMs}
        />
      </div>
    </div>
  )
}
