'use client'

import {useFetch} from '@mantine/hooks'
import {ArrowUpRightIcon} from '@phosphor-icons/react'
import Image from 'next/image'
import {Anchor, Badge} from '@/components'

type SpotifyData = Array<{
  artist_name: string
  spotify_url: string
  image_url: string
}>

const dataUrl = 'https://raw.githubusercontent.com/yorkeJohn/yorkejohn.dev/refs/heads/site-data/data/top-artists.json'

export function TopArtists() {
  const {data, loading} = useFetch<SpotifyData>(dataUrl)

  if (loading || !data) return null

  const items = data.map((item, index) => {
    const {artist_name, spotify_url, image_url} = item

    return (
      <Anchor
        href={spotify_url}
        key={index}
        className="group flex cursor-pointer items-center gap-2 interact:bg-accent-foreground py-2"
      >
        <div className="shrink-0 border border-accent p-1 group-interact:border-transparent">
          <Image src={image_url} width={50} height={50} alt={artist_name} className="aspect-square object-cover" />
        </div>
        <div>
          <Badge variant="outline" className="text-accent-foreground transition-none group-interact:text-background">
            n&deg;{index + 1}
          </Badge>
          <div className="text-2xl tracking-tight group-interact:text-background">
            {artist_name}
            <ArrowUpRightIcon className="inline" />
          </div>
        </div>
      </Anchor>
    )
  })

  return (
    <div className="pt-2">
      <div className="font-mono text-muted text-sm">Via Spotify &bull; Six-month trend &bull; Updated weekly</div>
      <div className="grid grid-cols-1 md:grid-cols-2">{items}</div>
    </div>
  )
}
