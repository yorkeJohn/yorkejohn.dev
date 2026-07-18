'use client'

import {useMounted} from '@mantine/hooks'
import dynamic from 'next/dynamic'
import {useTheme} from 'next-themes'
import {useMemo} from 'react'

export function Background() {
  const {theme} = useTheme()
  const mounted = useMounted()

  const Component = useMemo(() => {
    if (!theme) return null
    return dynamic(() => getBackground(theme), {ssr: false})
  }, [theme])

  if (!mounted || !Component) return null

  return (
    <div className="w-full h-full fixed left-0 top-0 -z-10">
      <Component />
    </div>
  )
}

async function getBackground(theme: string) {
  try {
    const mod = await import(`./backgrounds/${theme}`)
    return mod.default
  } catch {
    return () => null
  }
}
