'use client'

import {useDocumentVisibility} from '@mantine/hooks'
import {VinylRecordIcon} from '@phosphor-icons/react'
import {useEffect, useRef, useState} from 'react'
import {Badge} from '@/components'
import {cn} from '@/lib/cn'

export function Bgm() {
  const ref = useRef<HTMLAudioElement | null>(null)
  const tabbedOut = useDocumentVisibility() === 'hidden'
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = ref.current
    if (!audio) return

    audio.volume = 0.25
    audio.muted = tabbedOut
  }, [tabbedOut])

  const toggle = async () => {
    const audio = ref.current
    if (!audio) return

    if (audio.paused) await audio.play().catch(() => null)
    else audio.pause()
  }

  return (
    <>
      {/** biome-ignore lint/a11y/useMediaCaption: bgm */}
      <audio
        loop
        ref={ref}
        src="/music/lofi-loop.mp3"
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <Badge
        className="text-primary-foreground hover:text-accent-foreground cursor-pointer"
        variant="outline"
        onClick={toggle}
      >
        <VinylRecordIcon className={cn(playing && 'animate-spin')} />
      </Badge>
    </>
  )
}
