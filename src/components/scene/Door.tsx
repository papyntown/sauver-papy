import { DOOR_POSITION } from './doorPosition'

interface DoorProps {
  isOpen: boolean
}

/** Permanent decor: a door that swings open with divine light when the priest shows up. */
export function Door({ isOpen }: DoorProps) {
  return (
    <div
      style={{
        position: 'absolute',
        ...DOOR_POSITION,
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0c120f',
          border: '0.5cqw solid #16201c',
          borderRadius: '.6cqw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            background:
              'radial-gradient(circle at 50% 40%, #fff8dd 0%, #ffe9a8 35%, transparent 70%)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity .4s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-conic-gradient(from 0deg at 50% 40%, rgba(255,244,216,.55) 0deg 4deg, transparent 4deg 18deg)',
            opacity: isOpen ? 0.8 : 0,
            transition: 'opacity .4s ease',
            animation: isOpen ? 'raysSpin 6s linear infinite' : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg,#3f5148,#25332c)',
            borderRight: '0.25cqw solid #16201c',
            transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform .45s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg,#25332c,#3f5148)',
            borderLeft: '0.25cqw solid #16201c',
            transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform .45s ease',
          }}
        />
      </div>
    </div>
  )
}
