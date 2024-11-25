'use client'

import { useId } from "react"

export function PixelatedLogo({ className = "", size = 32 }: { className?: string, size?: number }) {
  const id = useId()
  const pixelSize = size / 8
  const pixels = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <mask id={`${id}-mask`}>
        {pixels.map((row, y) =>
          row.map((pixel, x) => 
            pixel ? (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="white"
              />
            ) : null
          )
        )}
      </mask>
      <rect width={size} height={size} fill="currentColor" mask={`url(#${id}-mask)`} />
    </svg>
  )
}

