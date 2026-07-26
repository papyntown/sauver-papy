import type { Dispatch } from 'react'
import type { GameAction, GameState } from '#/game/types'
import { getVitals } from '#/game/derived'
import { EVENT_REGISTRY } from '#/game/registry'
import { LifeCounter } from './LifeCounter'
import { CardiacMonitor } from './CardiacMonitor'
import { IVStand } from './IVStand'
import { Bed } from './Bed'
import { Door } from './Door'
import { EventsBar } from './EventsBar'
import { SceneEventHost } from './SceneEventHost'

interface GameScreenProps {
  game: GameState
  dispatch: Dispatch<GameAction>
}

export function GameScreen({ game, dispatch }: GameScreenProps) {
  const vitals = getVitals(game, true)

  const cardEvents = game.events.filter(
    (ev) => (EVENT_REGISTRY[ev.kind].placement ?? 'card') === 'card',
  )
  const sceneEvents = game.events.filter(
    (ev) => EVENT_REGISTRY[ev.kind].placement === 'scene',
  )
  const isPretreActive = game.events.some((ev) => ev.kind === 'pretre')

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
      <LifeCounter remainingMs={game.remainingMs} color={vitals.counterColor} />

      <CardiacMonitor
        isAlert={vitals.isAlert}
        color={vitals.counterColor}
        ekgSpeed={vitals.ekgSpeed}
        bpm={vitals.bpm}
      />

      <IVStand dripSpeed={vitals.dripSpeed} />

      <Door isOpen={isPretreActive} />

      <Bed
        isCalm={vitals.isCalm}
        isAlert={vitals.isAlert}
        isPanic={vitals.isPanic}
        browTop={vitals.browTop}
        browRotL={vitals.browRotL}
        browRotR={vitals.browRotR}
        breatheSpeed={vitals.breatheSpeed}
      />

      {sceneEvents.map((ev) => (
        <SceneEventHost
          key={ev.id}
          id={ev.id}
          def={EVENT_REGISTRY[ev.kind]}
          dispatch={dispatch}
        />
      ))}

      <EventsBar
        events={cardEvents}
        activeCount={game.events.length}
        dispatch={dispatch}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 8,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 45%,rgba(226,64,46,.12) 10%,#e2402e 115%)',
          opacity: vitals.tintOpacity,
          animation: vitals.tintAnim,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
