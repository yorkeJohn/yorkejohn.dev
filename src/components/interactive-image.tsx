'use client'

import {DotsSixIcon, ImageIcon} from '@phosphor-icons/react'
import {motion} from 'motion/react'
import Image, {type ImageProps} from 'next/image'
import {useIsPointerDevice} from '@/hooks'
import {playSound} from '@/lib/play-sound'

type InteractiveImageProps = {
  imageProps: Omit<ImageProps, 'className'>
  title: string
}

export function InteractiveImage({imageProps, title}: InteractiveImageProps) {
  const pd = useIsPointerDevice()
  return (
    <motion.div
      drag
      dragListener={pd}
      dragSnapToOrigin
      dragTransition={{bounceStiffness: 1000}}
      onDragStart={() => playSound('transition_up')}
      onDragEnd={() => playSound('transition_down')}
      className="border bg-background w-fit px-1 pb-1 h-fit cursor-grab group"
    >
      <div className="flex py-1 items-center gap-1 text-muted">
        <ImageIcon />
        <span className="flex-1 h-px bg-transparent group-hover:bg-muted" />
        <span className="font-mono text-[7pt] tracking-wide uppercase">{title}</span>
        <span className="flex-1 h-px bg-transparent group-hover:bg-muted" />
        <DotsSixIcon />
      </div>
      <Image {...imageProps} className="border pointer-events-none" />
    </motion.div>
  )
}
