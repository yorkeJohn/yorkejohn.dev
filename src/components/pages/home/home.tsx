'use client'

import {ArrowRightIcon} from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {PageSection} from '@/components'
import {ProjectCard} from '@/components/pages/projects/project-card'
import {projects} from '@/components/pages/projects/registry'
import {Button} from '@/components/ui'
import {ActivityFeed} from './activity-feed'
import {StatsMarquee} from './stats-marquee'
import {TopArtists} from './top-artists'

const Starry = dynamic(() => import('./starry').then(mod => mod.Starry), {ssr: false})

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
        <TopArtists />
      </PageSection>
    </main>
  )
}
