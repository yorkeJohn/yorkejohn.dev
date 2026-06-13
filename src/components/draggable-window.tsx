'use client'

import {DotsSixIcon, type Icon, XIcon} from '@phosphor-icons/react'
import {AnimatePresence, motion} from 'motion/react'
import {useIsPointerDevice} from '@/hooks'
import {cn} from '@/lib/cn'
import {playSound} from '@/lib/play-sound'

type BaseDraggableWindowProps = {
  title: string
  iconLeft: Icon
  children: React.ReactNode
}

interface FreeWindowProps extends BaseDraggableWindowProps {
  type: 'free'
  opened?: boolean
  onClose?: () => void
}

interface SnapWindowProps extends BaseDraggableWindowProps {
  type: 'snap'
}

type DraggableWindowProps = FreeWindowProps | SnapWindowProps

export function DraggableWindow({title, iconLeft, children, ...props}: DraggableWindowProps) {
  const pd = useIsPointerDevice()
  const baseClasses = 'border bg-background w-fit px-1 pb-1 h-fit cursor-grab group'

  if (props.type === 'snap') {
    return (
      <motion.div
        drag
        dragListener={pd}
        dragSnapToOrigin
        dragTransition={{bounceStiffness: 1000}}
        onDragStart={() => playSound('transition_up')}
        onDragEnd={() => playSound('transition_down')}
        className={baseClasses}
      >
        <TitleBar title={title} Icon={iconLeft}>
          <DotsSixIcon />
        </TitleBar>
        <div className="border">{children}</div>
      </motion.div>
    )
  }

  if (props.type === 'free') {
    const {opened = true, onClose} = props
    return (
      <AnimatePresence>
        {opened && (
          <motion.div
            drag
            dragListener={pd}
            dragMomentum={false}
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.5, opacity: 0}}
            className={cn(baseClasses, 'fixed bottom-4 right-4')}
          >
            <TitleBar title={title} Icon={iconLeft}>
              <XIcon className="cursor-pointer" onClick={onClose} />
            </TitleBar>
            <div className="border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return null
}

type TitleBarProps = {
  title: string
  Icon: Icon
  children: React.ReactNode
}

function TitleBar({title, Icon, children}: TitleBarProps) {
  return (
    <div className="flex py-1 items-center gap-1 text-muted">
      <Icon />
      <span className="flex-1 h-px bg-transparent group-hover:bg-muted" />
      <span className="font-mono text-[7pt] tracking-wider uppercase">{title}</span>
      <span className="flex-1 h-px bg-transparent group-hover:bg-muted" />
      {children}
    </div>
  )
}
