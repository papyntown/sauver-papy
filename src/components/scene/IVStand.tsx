interface IVStandProps {
  dripSpeed: string
}

export function IVStand({ dripSpeed }: IVStandProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '5%',
        top: '14%',
        zIndex: 5,
        width: '11%',
        height: '64%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: '8%',
          width: '0.9cqw',
          background: 'linear-gradient(90deg,#9aa7a0,#d7ded9,#9aa7a0)',
          border: '0.25cqw solid #16201c',
          borderRadius: '1cqw',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '-1%',
          width: '5cqw',
          height: '1.4cqw',
          border: '0.35cqw solid #16201c',
          borderBottom: 'none',
          borderRadius: '1cqw 1cqw 0 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '5%',
          width: '6cqw',
          height: '11cqw',
          background: '#f4fbf7',
          border: '0.5cqw solid #16201c',
          borderRadius: '1cqw 1cqw 1.6cqw 1.6cqw',
          overflow: 'hidden',
          boxShadow: '0 0.5cqw 0 rgba(0,0,0,.2)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70%',
            background: 'linear-gradient(#ffd27a,#f4b73f)',
            animation: 'bagWobble 2.4s ease-in-out infinite',
            transformOrigin: 'bottom',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '22%',
            width: '1.4cqw',
            height: '5cqw',
            background: '#ffffff88',
            borderRadius: '1cqw',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '6%',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: "'Fredoka'",
            fontWeight: 700,
            fontSize: '1cqw',
            color: '#16201c',
          }}
        >
          JUS DE
          <br />
          VIE
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '23%',
          width: '2cqw',
          height: '3cqw',
          background: '#eaf6f0',
          border: '0.35cqw solid #16201c',
          borderRadius: '.6cqw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: '#f4b73f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '.7cqw',
            height: '.7cqw',
            borderRadius: '50%',
            background: '#f4b73f',
            animation: `drip ${dripSpeed} linear infinite`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '30%',
          bottom: '6%',
          width: '0.35cqw',
          background: '#f4b73f',
          borderRadius: '1cqw',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  )
}
