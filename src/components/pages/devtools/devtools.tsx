'use client'

import {BinaryIcon, BracketsCurlyIcon, type Icon, LockIcon, PaletteIcon} from '@phosphor-icons/react'
import {notFound} from 'next/navigation'
import type React from 'react'
import {ColorPicker} from './color-picker/color-picker'
import {JsonFormatter} from './json-formatter'
import {JwtDecoder} from './jwt-decoder'
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
  },
  {
    label: 'JWT Decoder',
    description: 'Decode encoded JSON web tokens',
    slug: 'jwt-decode',
    Icon: LockIcon,
    Component: JwtDecoder
  },
  {
    label: 'Color Picker',
    description: 'Pick and convert colors',
    slug: 'color-picker',
    Icon: PaletteIcon,
    Component: ColorPicker
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
    <main className="px-4 container mx-auto">
      <h1 className="font-heading text-xl mb-2">{label}</h1>
      <p className="text-sm text-muted-foreground mb-8">{description}</p>
      <Component />
    </main>
  )
}
