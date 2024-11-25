"use client"

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface GameOfLifeProps {
  isActive: boolean
}

const GRID_SIZE = 50
const CELL_SIZE = 20
const FPS = 10

export function GameOfLife({ isActive }: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [grid, setGrid] = useState<boolean[][]>(() => 
    Array.from({ length: GRID_SIZE }, () => 
      Array.from({ length: GRID_SIZE }, () => Math.random() > 0.7)
    )
  )

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
          ].reduce((acc, [x, y]) => {
            const newI = (i + x + GRID_SIZE) % GRID_SIZE
            const newJ = (j + y + GRID_SIZE) % GRID_SIZE
            return acc + (grid[newI][newJ] ? 1 : 0)
          }, 0)

          if (cell) return neighbors === 2 || neighbors === 3
          return neighbors === 3
        })
      )

      setGrid(newGrid)

      const cellColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
      
      newGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            ctx.fillStyle = cellColor
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        })
      })
    }

    const intervalId = setInterval(animate, 1000 / FPS)

    return () => clearInterval(intervalId)
  }, [isActive, grid, theme])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  )
}

