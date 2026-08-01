'use client'

import {motion, useMotionValue, useSpring} from 'framer-motion'
import {useEffect} from 'react'
import {useIsPointerDevice} from '@/hooks'

export function Cursor() {
  const pd = useIsPointerDevice()
  if (!pd) return null
  return <CustomCursor />
}

function CustomCursor() {
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
    <div className="pointer-events-none z-10000 flex">
      <motion.div className="-translate-1/2 fixed h-2 w-2 rounded-full bg-primary" style={{x, y}} />
      <motion.div className="-translate-1/2 fixed h-12 w-12 rounded-full border" style={{x: ringX, y: ringY}} />
    </div>
  )
}
