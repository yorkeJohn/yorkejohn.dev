'use client'

import {BinaryIcon, BracketsCurlyIcon, type Icon, LockIcon, PaletteIcon} from '@phosphor-icons/react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import type React from 'react'
import {useState} from 'react'
import {Card, CardDescription, CardHeader, CardTitle, Input} from '@/components/ui'
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
    slug: 'jwt-decoder',
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
  const [query, setQuery] = useState<string>('')

  const fuse = new Fuse(devtools, {keys: ['label', 'description']})
  const filtered = fuse.search(query).map(res => res.item)

  const cards = filtered.map(dt => {
    const {label, description, slug, Icon} = dt
    return (
      <Link key={slug} href={`/devtools/${slug}`}>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon />
              {label}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    )
  })

  return (
    <div>
      <h1 className="font-heading text-xl mb-2">Developer Tools</h1>
      <p className="text-sm text-muted-foreground mb-8">A curated collection of useful developer tools</p>
      <Input
        placeholder="Search developer tools..."
        className="mb-8"
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{cards}</div>
    </div>
  )
}

const devtoolsMap: Map<string, DevtoolDef> = new Map(devtools.map(dt => [dt.slug, dt]))

export function Devtool({slug}: {slug: string}) {
  const def = devtoolsMap.get(slug)
  if (!def) notFound()

  const {label, description, Component} = def

  return (
    <div>
      <Link href="/devtools" className="text-sm text-blue-200">
        &larr; Back to developer tools list
      </Link>
      <div className="my-8">
        <h1 className="font-heading text-xl mb-2">{label}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Component />
    </div>
  )
}
