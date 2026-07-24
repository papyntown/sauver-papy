/** The static room shell: wall/floor gradients, tile grids, stains, cables. */
export function Background() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'linear-gradient(#c9ebf4 0%,#bfe6f2 58%,#8fd8bb 58%,#7fd1b0 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '58%',
          zIndex: 0,
          backgroundImage:
            'linear-gradient(#a9d8e6 1px,transparent 1px),linear-gradient(90deg,#a9d8e6 1px,transparent 1px)',
          backgroundSize: '7cqw 7cqw',
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '42%',
          zIndex: 0,
          backgroundImage: 'linear-gradient(90deg,#6cc4a2 2px,transparent 2px)',
          backgroundSize: '9cqw 100%',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '14%',
          left: '9%',
          width: '5cqw',
          height: '3cqw',
          zIndex: 0,
          borderRadius: '50%',
          background: '#a7d6b0',
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '26%',
          width: '3cqw',
          height: '6cqw',
          zIndex: 0,
          borderRadius: '50%',
          background: '#a7d6c4',
          opacity: 0.3,
          transform: 'rotate(20deg)',
        }}
      />

      <svg
        viewBox="0 0 100 56.25"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M50 34 C 38 40, 26 34, 15.5 30"
          fill="none"
          stroke="#16201c"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M52 33 C 66 38, 78 30, 84 24"
          fill="none"
          stroke="#16201c"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M50 34 C 40 41, 30 37, 20 33"
          fill="none"
          stroke="#e2402e"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeDasharray="1.4 1.2"
        />
      </svg>
    </>
  )
}
