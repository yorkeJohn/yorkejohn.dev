'use client'

import {useLocalStorage} from '@mantine/hooks'
import {SpeakerHighIcon, SpeakerSlashIcon} from '@phosphor-icons/react'
import {useEffect} from 'react'
import {Badge} from '@/components'
import {playSound, type SoundKey} from '@/lib/play-sound'

export function Sounds() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const el = target.closest('[data-sfx]') as HTMLElement | null
      if (!el) return

      const sound = el.dataset.sfx as SoundKey | undefined
      if (!sound) return

      playSound(sound)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

export function MuteToggle() {
  const [muted, setMuted] = useLocalStorage({
    key: 'sounds-muted',
    defaultValue: false
  })

  const toggle = () => {
    const next = !muted
    setMuted(next)
    if (!next) playSound('celebration')
  }

  return (
    <Badge className="text-amber-200 font-mono cursor-pointer hover:text-lime-300" variant="outline" onClick={toggle}>
      {muted ? <SpeakerSlashIcon /> : <SpeakerHighIcon />}
    </Badge>
  )
}
