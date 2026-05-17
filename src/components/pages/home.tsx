'use client'

import {useFetch} from '@mantine/hooks'
import {ArrowRightIcon, ArrowUpRightIcon} from '@phosphor-icons/react'
import {formatDistanceToNow} from 'date-fns'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import {use} from 'react'
import {Anchor, Marquee, PageSection} from '@/components'
import {Badge, Button} from '@/components/ui'
import {activity} from '@/lib/activity'
import {ProjectCard} from './projects/project-card'
import {projects} from './projects/registry'

const Starry = dynamic(() => import('@/components/starry').then(mod => mod.Starry), {ssr: false})

export function HomePage() {
  return (
    <main className="z-0">
      <div className="w-full h-full fixed left-0 top-0 -z-10 bg-[#000a14]">
        <Starry />
      </div>

      <div className="text-[96pt] font-semibold leading-[0.8] my-20 tracking-tight font-heading">
        <span className="text-muted-foreground">Welcome to</span>
        <br />
        <span className="text-lime-300">yorkejohn.dev</span>
      </div>

      <div className="flex gap-12 items-start">
        <div className="border border-lime-600 p-1">
          <Image width={200} height={200} loading="eager" src="/avatar.jpg" alt="John's Avatar" />
        </div>
        <div className="text-muted-foreground text-2xl tracking-tighter max-w-[45ch] -mt-1">
          <p className="mb-4">
            Hey there! My name is John. I'm a software & data engineer based in Halifax, Nova Scotia, Canada.
          </p>
          <p>This is my personal corner of the internet where I share my projects and what I'm learning.</p>
        </div>
      </div>

      <PageSection label="Stats" className="my-8">
        <StatsMarquee />
      </PageSection>

      <PageSection label="Featured Project" className="my-8">
        <ProjectCard project={projects[9]} className="pt-4">
          <Button asChild variant="default" className="w-full mt-2">
            <Link href="/projects">
              All Projects
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </ProjectCard>
      </PageSection>

      <PageSection label="Recent Activity" className="my-8">
        <ActivityFeed />
      </PageSection>

      <PageSection label="Listening To" className="my-8">
        <SpotifyFeed />
      </PageSection>
    </main>
  )
}

type Stat = {
  label: React.ReactNode
  stat: React.ReactNode
}

const stats: Stat[] = [
  {label: 'Building things since', stat: '2015'},
  {label: '3 languages', stat: 'English - Français (French) - 日本語 (Japanese)'},
  {label: 'Minecraft mod downloads', stat: '2.5M+'},
  {label: 'Hobbies', stat: 'Gaming - Bodybuilding - Hiking - Food'},
  {label: 'Listening to', stat: 'Green Day'},
  {label: 'Unfinished side projects', stat: 'Infinite'}
]

function StatsMarquee() {
  const items = stats.map((item, index) => {
    const {label, stat} = item
    return (
      <Badge key={index} variant="outline" className="mx-1 font-mono">
        {label}:<span className="ms-1 text-lime-300">{stat}</span>
      </Badge>
    )
  })
  return <Marquee items={items} className="pt-2" />
}

function ActivityFeed() {
  const items = use(activity).map((item, index) => {
    const {repo, branch, compareUrl, pushedAt} = item

    return (
      <Anchor href={compareUrl} key={index} className="group hover:bg-lime-300 flex gap-2 py-2 cursor-pointer">
        <div className="w-40">
          <Badge className="text-lime-300 group-hover:text-black transition-none" variant="outline">
            {formatDistanceToNow(pushedAt, {addSuffix: true})}
          </Badge>
        </div>
        <div className="group-hover:text-black">
          Pushed to
          <span className="text-amber-200 font-mono group-hover:text-inherit">&nbsp;{repo}&nbsp;</span>
          on branch
          <span className="text-amber-200 font-mono group-hover:text-inherit">&nbsp;{branch}</span>
          <ArrowUpRightIcon className="inline" />
        </div>
      </Anchor>
    )
  })

  return <div className="flex flex-col pt-2">{items}</div>
}

type SpotifyData = {
  items: Array<{
    name: string
    external_urls: {spotify: string}
    images: Array<{url: string}>
  }>
}

function SpotifyFeed() {
  const {data, loading} = useFetch<SpotifyData>(
    'https://raw.githubusercontent.com/yorkeJohn/yorkejohn.dev/refs/heads/spotify-data/data/top-artists.json'
  )

  if (loading || !data) return null

  const items = data.items.map((item, index) => {
    const name = item.name
    const artistUrl = item.external_urls.spotify
    const image = item.images[0].url
    return (
      <Anchor href={artistUrl} key={index} className="group hover:bg-lime-300 flex gap-2 py-2 cursor-pointer">
        <div className="border border-lime-600 p-1 group-hover:border-transparent">
          <Image src={image} width={50} height={50} alt={name} className="" />
        </div>
        <div>
          <Badge variant="outline" className="text-lime-300 group-hover:text-black transition-none">
            n&deg;{index + 1}
          </Badge>
          <div className="text-2xl tracking-tight group-hover:text-black">
            {name}
            <ArrowUpRightIcon className="inline" />
          </div>
        </div>
      </Anchor>
    )
  })

  return <div className="grid grid-cols-2 pt-2">{items}</div>
}
