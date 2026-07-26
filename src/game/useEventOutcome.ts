import { useCallback } from 'react'
import type { Dispatch } from 'react'
import type { GameAction, StatKey } from './types'

/**
 * Memoized onSuccess/onFail for one active event, shared by every place that
 * hosts a mini-game (the card bar, or a scene overlay). Stable identity
 * matters: a mini-game's internal useAutoFail timer would otherwise reset on
 * every parent re-render.
 */
export function useEventOutcome(
  dispatch: Dispatch<GameAction>,
  id: number,
  statKey: StatKey,
) {
  const onSuccess = useCallback(
    () => dispatch({ type: 'RESOLVE', id, statKey }),
    [dispatch, id, statKey],
  )
  const onFail = useCallback(
    () => dispatch({ type: 'MISS', id }),
    [dispatch, id],
  )
  return { onSuccess, onFail }
}
