import type { Dispatch } from 'react'
import type { EventDef, GameAction } from '#/game/types'
import { useEventOutcome } from '#/game/useEventOutcome'

interface SceneEventHostProps {
  def: EventDef
  id: number
  dispatch: Dispatch<GameAction>
}

/**
 * Mounts one 'scene'-placed mini-game with memoized onSuccess/onFail — the
 * scene equivalent of EventCard, minus the card chrome. The mini-game itself
 * owns its absolute position and its own floating label (see SceneEventLabel).
 */
export function SceneEventHost({ def, id, dispatch }: SceneEventHostProps) {
  const { onSuccess, onFail } = useEventOutcome(dispatch, id, def.statKey)
  const Component = def.Component
  return (
    <Component
      onSuccess={onSuccess}
      onFail={onFail}
      timeLimitMs={def.timeLimitMs}
    />
  )
}
