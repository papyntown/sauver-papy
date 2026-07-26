import { ClickToResolve } from '#/components/events/ClickToResolve'
import { PerfusionVide } from '#/components/events/PerfusionVide'
import { EkgPlat } from '#/components/events/EkgPlat'
import { CableDebranche } from '#/components/events/CableDebranche'
import { Oxygene } from '#/components/events/Oxygene'
import { Moustique } from '#/components/events/Moustique'
import { Pretre } from '#/components/events/Pretre'
import { Lever } from '#/components/events/Lever'
import { FamilleTelephone } from '#/components/events/FamilleTelephone'
import type { EventDef, EventKind, MiniGameProps } from './types'

const Hoquet = (p: MiniGameProps) => (
  <ClickToResolve {...p} actionLabel="FAIRE PEUR" />
)
const Dentier = (p: MiniGameProps) => (
  <ClickToResolve {...p} actionLabel="RÉCUPÉRER" />
)
const Tension = (p: MiniGameProps) => (
  <ClickToResolve {...p} actionLabel="STABILISER" />
)

export const EVENT_REGISTRY: Record<EventKind, EventDef> = {
  hoquet: {
    kind: 'hoquet',
    name: 'HOQUET CHRONIQUE',
    desc: 'Il a le hoquet. Depuis 40 minutes.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 9000,
    statKey: 'crises',
    Component: Hoquet,
  },
  dentier: {
    kind: 'dentier',
    name: 'DENTIER EN CAVALE',
    desc: 'Le dentier a bondi hors du lit.',
    accent: '#e2402e',
    anim: 'blinkRed .6s steps(1) infinite',
    timeLimitMs: 7000,
    statKey: 'dentiers',
    Component: Dentier,
  },
  tension: {
    kind: 'tension',
    name: 'TENSION COSMIQUE',
    desc: 'Tension : 320 / 210 mmHg.',
    accent: '#e2402e',
    anim: 'blinkRed .5s steps(1) infinite',
    timeLimitMs: 6500,
    statKey: 'crises',
    Component: Tension,
  },
  moustique: {
    kind: 'moustique',
    name: 'MOUSTIQUE HOSTILE',
    desc: 'Un moustique vise le nez.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 8000,
    statKey: 'crises',
    Component: Moustique,
    placement: 'scene',
  },
  'perfusion-vide': {
    kind: 'perfusion-vide',
    name: 'PERFUSION VIDE',
    desc: 'La poche est à sec, glisse-la sur le pied à perf.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 7000,
    statKey: 'crises',
    Component: PerfusionVide,
  },
  'ekg-plat': {
    kind: 'ekg-plat',
    name: 'LIGNE PLATE',
    desc: 'Le cœur hésite. Masse jusqu’à stabilisation.',
    accent: '#e2402e',
    anim: 'blinkRed .5s steps(1) infinite',
    timeLimitMs: 6000,
    statKey: 'crises',
    Component: EkgPlat,
  },
  'cable-debranche': {
    kind: 'cable-debranche',
    name: 'CÂBLE DÉBRANCHÉ',
    desc: 'Rebranche la bonne prise, vite.',
    accent: '#e2402e',
    anim: 'blinkRed .5s steps(1) infinite',
    timeLimitMs: 5000,
    statKey: 'crises',
    Component: CableDebranche,
  },
  oxygene: {
    kind: 'oxygene',
    name: 'MANQUE D’OXYGÈNE',
    desc: 'Pompe en alternant les deux mains.',
    accent: '#e2402e',
    anim: 'blinkRed .5s steps(1) infinite',
    timeLimitMs: 8000,
    statKey: 'crises',
    Component: Oxygene,
  },
  pretre: {
    kind: 'pretre',
    name: 'LE PRÊTRE',
    desc: 'Il approche par la porte. Ferme-la-lui au nez.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 9000,
    statKey: 'crises',
    Component: Pretre,
    placement: 'scene',
  },
  lever: {
    kind: 'lever',
    name: 'PAPY VEUT SE LEVER',
    desc: 'Maintiens-le allongé.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 6500,
    statKey: 'crises',
    Component: Lever,
  },
  'famille-telephone': {
    kind: 'famille-telephone',
    name: 'FAMILLE AU TÉLÉPHONE',
    desc: 'Ça sonne. Décroche vite.',
    accent: '#ffb020',
    anim: 'none',
    timeLimitMs: 4000,
    statKey: 'crises',
    Component: FamilleTelephone,
  },
}

export const EVENT_KINDS = Object.keys(EVENT_REGISTRY) as Array<EventKind>
