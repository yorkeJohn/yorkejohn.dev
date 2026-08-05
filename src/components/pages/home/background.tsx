'use client'

import {useMounted} from '@mantine/hooks'
import dynamic from 'next/dynamic'
import {useTheme} from 'next-themes'

// background for space theme
const SpaceBackground = dynamic(() => import('./space-background'), {ssr: false})

export function Background() {
  const {theme} = useTheme()
  const mounted = useMounted()

  if (!mounted || theme !== 'space') {
    return null
  }

  return <SpaceBackground />
}
