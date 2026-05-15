import type React from 'react'
import {cn} from '@/lib/utils'

type MarqueeProps = {
  items: React.ReactNode[]
  speed?: number
  pauseOnHover?: boolean
  reverse?: boolean
} & React.ComponentProps<'div'>

export function Marquee({items, speed = 20, pauseOnHover = true, reverse = false, className = ''}: MarqueeProps) {
  const elements = [...items, ...items].map((item, index) => (
    <div key={index} className="shrink-0">
      {item}
    </div>
  ))

  return (
    <div className={cn('relative overflow-hidden whitespace-nowrap', className)}>
      <div
        className={cn(
          'flex w-max',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'hover:paused'
        )}
        style={{animationDuration: `${speed}s`}}
      >
        {elements}
      </div>
    </div>
  )
}
