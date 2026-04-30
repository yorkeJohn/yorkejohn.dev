'use client'

import {BinaryIcon, BracketsCurlyIcon, type Icon} from '@phosphor-icons/react'
import {notFound} from 'next/navigation'
import type React from 'react'
import {JsonFormatter} from './json-formatter'
import {UuidGenerator} from './uuid-generator'

type DevtoolDef = {
  label: string
  description: string
  slug: string
  Icon: Icon
  Component: React.FC
}

export const devtools: Array<DevtoolDef> = [
  {
    label: 'JSON Formatter',
    description: 'Format and view JSON data',
    slug: 'json-formatter',
    Icon: BracketsCurlyIcon,
    Component: JsonFormatter
  },
  {
    label: 'UUID Generator',
    description: 'Generate random UUIDs',
    slug: 'uuid-generator',
    Icon: BinaryIcon,
    Component: UuidGenerator
  }
]

export function DevtoolsPage() {
  return <div>DevTools</div>
}

const devtoolsMap: Map<string, DevtoolDef> = new Map(devtools.map(dt => [dt.slug, dt]))

export function Devtool({slug}: {slug: string}) {
  const def = devtoolsMap.get(slug)

  if (!def) notFound()

  const {label, description, Component} = def

  return (
    <main className="p-4 container mx-auto">
      <h1 className="font-heading text-xl mb-2">{label}</h1>
      <p className="text-sm text-muted-foreground mb-8">{description}</p>
      <Component />
    </main>
  )
}
