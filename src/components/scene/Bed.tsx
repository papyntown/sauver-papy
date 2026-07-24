interface BedProps {
  isCalm: boolean
  isAlert: boolean
  isPanic: boolean
  browTop: string
  browRotL: string
  browRotR: string
  breatheSpeed: string
}

export function Bed({
  isCalm,
  isAlert,
  isPanic,
  browTop,
  browRotL,
  browRotR,
  breatheSpeed,
}: BedProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '24%',
        zIndex: 4,
        width: '48%',
        height: '32%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-2%',
          top: '-34%',
          width: '12%',
          height: '80%',
          background: '#dfe6e1',
          border: '0.6cqw solid #16201c',
          borderRadius: '1cqw',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-2%',
          top: '-14%',
          width: '9%',
          height: '60%',
          background: '#dfe6e1',
          border: '0.6cqw solid #16201c',
          borderRadius: '1cqw',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '2%',
          right: '2%',
          top: '14%',
          height: '64%',
          background: '#f4fbf7',
          border: '0.6cqw solid #16201c',
          borderRadius: '1.4cqw',
          boxShadow: 'inset 0 -1cqw 0 #d8e6df',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '2%',
          width: '22%',
          height: '34%',
          background: '#ffffff',
          border: '0.55cqw solid #16201c',
          borderRadius: '1.6cqw',
          transform: 'rotate(-4deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '34%',
          right: '3%',
          top: '22%',
          height: '60%',
          background:
            'repeating-linear-gradient(90deg,#6fcbaf 0 3cqw,#5cbd9f 3cqw 6cqw)',
          border: '0.6cqw solid #16201c',
          borderRadius: '1.2cqw',
          transformOrigin: 'center bottom',
          animation: `breathe ${breatheSpeed} ease-in-out infinite`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '32%',
          top: '20%',
          width: '8%',
          height: '64%',
          background: '#eaf6f0',
          border: '0.6cqw solid #16201c',
          borderRadius: '1cqw',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '10%',
          top: '-8%',
          width: '20%',
          aspectRatio: '1/1',
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-6%',
            top: '42%',
            width: '16%',
            height: '22%',
            background: '#f2c9a0',
            border: '0.5cqw solid #16201c',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-6%',
            top: '42%',
            width: '16%',
            height: '22%',
            background: '#f2c9a0',
            border: '0.5cqw solid #16201c',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#f6d3ac',
            border: '0.6cqw solid #16201c',
            borderRadius: '46% 46% 50% 50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '24%',
            top: '8%',
            width: '22%',
            height: '14%',
            background: '#fff0dd',
            borderRadius: '50%',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-4%',
            top: '28%',
            width: '20%',
            height: '34%',
            background: '#eef1ef',
            border: '0.5cqw solid #16201c',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-4%',
            top: '28%',
            width: '20%',
            height: '34%',
            background: '#eef1ef',
            border: '0.5cqw solid #16201c',
            borderRadius: '50%',
          }}
        />

        {isCalm && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '26%',
                top: '44%',
                width: '16%',
                height: 0,
                borderTop: '0.55cqw solid #16201c',
                borderRadius: '1cqw',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '26%',
                top: '44%',
                width: '16%',
                height: 0,
                borderTop: '0.55cqw solid #16201c',
                borderRadius: '1cqw',
              }}
            />
          </>
        )}
        {isAlert && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '27%',
                top: '40%',
                width: '13%',
                height: '13%',
                background: '#fff',
                border: '0.45cqw solid #16201c',
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '35%',
                  top: '38%',
                  width: '34%',
                  height: '34%',
                  background: '#16201c',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                right: '28%',
                top: '44%',
                width: '13%',
                height: 0,
                borderTop: '0.5cqw solid #16201c',
              }}
            />
          </>
        )}
        {isPanic && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '24%',
                top: '36%',
                width: '17%',
                height: '19%',
                background: '#fff',
                border: '0.5cqw solid #16201c',
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '32%',
                  top: '34%',
                  width: '34%',
                  height: '34%',
                  background: '#16201c',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                right: '24%',
                top: '36%',
                width: '17%',
                height: '19%',
                background: '#fff',
                border: '0.5cqw solid #16201c',
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '34%',
                  top: '34%',
                  width: '34%',
                  height: '34%',
                  background: '#16201c',
                  borderRadius: '50%',
                }}
              />
            </div>
          </>
        )}

        <div
          style={{
            position: 'absolute',
            left: '25%',
            top: browTop,
            width: '18%',
            height: 0,
            borderTop: '0.55cqw solid #cfd3d1',
            transform: `rotate(${browRotL})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '25%',
            top: browTop,
            width: '18%',
            height: 0,
            borderTop: '0.55cqw solid #cfd3d1',
            transform: `rotate(${browRotR})`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '44%',
            top: '52%',
            width: '12%',
            height: '16%',
            background: '#f2c197',
            border: '0.5cqw solid #16201c',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '24%',
            right: '24%',
            top: '38%',
            height: '18%',
            borderBottom: '0.35cqw solid #16201c',
            opacity: 0.35,
          }}
        />

        {isCalm && (
          <div
            style={{
              position: 'absolute',
              left: '40%',
              top: '74%',
              width: '20%',
              height: '6%',
              border: '0.5cqw solid #16201c',
              borderTop: 'none',
              borderRadius: '0 0 1cqw 1cqw',
            }}
          />
        )}
        {isAlert && (
          <div
            style={{
              position: 'absolute',
              left: '38%',
              top: '78%',
              width: '24%',
              height: 0,
              borderTop: '0.5cqw solid #16201c',
            }}
          />
        )}
        {isPanic && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '40%',
                top: '72%',
                width: '20%',
                height: '16%',
                background: '#7a2a24',
                border: '0.5cqw solid #16201c',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '6%',
                top: '30%',
                width: '1.4cqw',
                height: '1.4cqw',
                background: '#8fd8ec',
                border: '0.35cqw solid #16201c',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(45deg)',
                animation: 'sweatDrop 1.1s ease-in infinite',
              }}
            />
          </>
        )}
        <div
          style={{
            position: 'absolute',
            left: '34%',
            top: '66%',
            width: '32%',
            height: '9%',
            background: '#eef1ef',
            border: '0.5cqw solid #16201c',
            borderRadius: '0 0 1cqw 1cqw',
          }}
        />

        {isCalm && (
          <>
            <div
              style={{
                position: 'absolute',
                right: '-24%',
                top: 0,
                fontFamily: "'Bungee'",
                fontSize: '2.4cqw',
                color: '#5cbd9f',
                animation: 'zzz 2.4s ease-in-out infinite',
              }}
            >
              z
            </div>
            <div
              style={{
                position: 'absolute',
                right: '-30%',
                top: '6%',
                fontFamily: "'Bungee'",
                fontSize: '3.2cqw',
                color: '#6fcbaf',
                animation: 'zzz 2.4s ease-in-out infinite',
                animationDelay: '.8s',
              }}
            >
              Z
            </div>
          </>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '38%',
          top: '34%',
          width: '14%',
          height: '9%',
          background: '#f6d3ac',
          border: '0.55cqw solid #16201c',
          borderRadius: '1cqw',
        }}
      />
    </div>
  )
}
