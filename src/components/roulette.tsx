'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const options = [
  { text: '90% de descuento', color: 'bg-red-500' },
  { text: '10% de descuento', color: 'bg-blue-500' },
  { text: '15% de descuento', color: 'bg-green-500' },
  { text: '20% de descuento', color: 'bg-yellow-500' },
  { text: '25% de descuento', color: 'bg-purple-500' },
  { text: '5% de descuento', color: 'bg-pink-500' },
]

export function Roulette() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  useEffect(() => {
    const spinInterval = setInterval(() => {
      setRotation(prev => (prev + 30) % 360)
    }, 50)

    setTimeout(() => {
      clearInterval(spinInterval)
      setIsSpinning(false)
      const winningIndex = Math.floor(Math.random() * options.length)
      const finalRotation = 360 - (winningIndex * (360 / options.length)) - (360 / (2 * options.length))
      setRotation(finalRotation)
      setWinner(options[(winningIndex - 1 + 6) % 6].text)
    }, 3000)

    return () => clearInterval(spinInterval)
  }, [])

  return (
    <div className="relative w-80 h-80 mb-8">
      <motion.div
        className="w-full h-full rounded-full border-4 border-primary flex items-center justify-center overflow-hidden"
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 10, damping: 10 }}
        style={{ position: 'relative' }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`absolute w-full h-full ${option.color}`}
            style={{
              clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%)',
              transform: `rotate(${index * (360 / options.length)}deg)`,
              transformOrigin: '50% 50%',
            }}
          >
            
          </div>
        ))}
      </motion.div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary z-10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-primary"></div>
      {!isSpinning && winner && (
        <div className="mt-2 inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <span className="text-xl font-bold text-white">¡Ganaste {winner}!</span>
        </div>
      )}
    </div>
  )
}
