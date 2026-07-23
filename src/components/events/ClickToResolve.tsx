import type { MiniGameProps } from '#/game/types'
import { useAutoFail } from './useAutoFail'
import { actionButtonStyle } from './shared'

interface ClickToResolveProps extends MiniGameProps {
  actionLabel: string
}

/**
 * The simplest mini-game: one click resolves it. This is the reference
 * mechanic reused by hoquet / dentier / tension / moustique / famille-au-
 * telephone — they only differ by label and by the timeLimitMs the registry
 * gives them.
 */
export function ClickToResolve({
  onSuccess,
  onFail,
  timeLimitMs,
  actionLabel,
}: ClickToResolveProps) {
  useAutoFail(onFail, timeLimitMs)

  return (
    <button onClick={onSuccess} style={actionButtonStyle}>
      {actionLabel}
    </button>
  )
}
