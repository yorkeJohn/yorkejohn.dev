'use client'

import Fuse from 'fuse.js'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {useState} from 'react'
import {Card, CardDescription, CardHeader, CardTitle, Input} from '@/components/ui'
import {devtools, getDevtoolBySlug} from './registry'

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

export function DevtoolPage({slug}: {slug: string}) {
  const def = getDevtoolBySlug(slug)
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
