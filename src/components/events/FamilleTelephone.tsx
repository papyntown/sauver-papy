import type { MiniGameProps } from '#/game/types'
import { ClickToResolve } from './ClickToResolve'

/** Same one-click mechanic as ClickToResolve, just a shorter fuse. */
export function FamilleTelephone(props: MiniGameProps) {
  return <ClickToResolve {...props} actionLabel="DÉCROCHER" />
}
