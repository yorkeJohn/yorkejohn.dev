'use client'

import {motion, useMotionValue, useSpring} from 'framer-motion'
import {useEffect} from 'react'

export function Cursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ringX = useSpring(x, {stiffness: 120, damping: 18, mass: 0.6})
  const ringY = useSpring(y, {stiffness: 120, damping: 18, mass: 0.6})

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <div className="pointer-events-none z-10000">
      <motion.div className="fixed -translate-1/2 w-2 h-2 bg-primary rounded-full" style={{x, y}} />
      <motion.div className="fixed -translate-1/2 w-12 h-12 border rounded-full" style={{x: ringX, y: ringY}} />
    </div>
  )
}
