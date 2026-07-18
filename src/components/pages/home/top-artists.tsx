'use client'

import {useFetch} from '@mantine/hooks'
import {ArrowUpRightIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import {Anchor, Badge} from '@/components'

type SpotifyData = {
  items: Array<{
    name: string
    external_urls: {spotify: string}
    images: Array<{url: string}>
  }>
}

const dataUrl =
  'https://raw.githubusercontent.com/yorkeJohn/yorkejohn.dev/refs/heads/spotify-data/data/top-artists.json'

export function TopArtists() {
  const {data, loading} = useFetch<SpotifyData>(dataUrl)

  if (loading || !data) return null

  const items = data.items.map((item, index) => {
    const name = item.name
    const artistUrl = item.external_urls.spotify
    const image = item.images[0].url
    return (
      <Anchor
        href={artistUrl}
        key={index}
        className="group interact:bg-accent-foreground flex gap-2 py-2 cursor-pointer items-center"
      >
        <div className="border border-accent p-1 group-interact:border-transparent shrink-0">
          <Image src={image} width={50} height={50} alt={name} className="aspect-square object-cover" />
        </div>
        <div>
          <Badge variant="outline" className="text-accent-foreground group-interact:text-background transition-none">
            n&deg;{index + 1}
          </Badge>
          <div className="text-2xl tracking-tight group-interact:text-background">
            {name}
            <ArrowUpRightIcon className="inline" />
          </div>
        </div>
      </Anchor>
    )
  })

  return (
    <div className="pt-2">
      <div className="text-muted text-sm font-mono">Via Spotify &bull; Six-month trend &bull; Updated weekly</div>
      <div className="grid grid-cols-1 md:grid-cols-2">{items}</div>
    </div>
  )
}
