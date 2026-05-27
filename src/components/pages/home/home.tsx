'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import {useTheme} from 'next-themes'
import {PageSection} from '@/components'
import {ProjectCard} from '@/components/pages/projects/project-card'
import {projects} from '@/components/pages/projects/registry'
import {ActivityFeed} from './activity-feed'
import {StatsMarquee} from './stats-marquee'
import {TopArtists} from './top-artists'

const Starry = dynamic(() => import('./starry').then(mod => mod.Starry), {ssr: false})

export function HomePage() {
  const {theme} = useTheme()

  return (
    <main className="z-0">
      {theme === 'space' && (
        <div className="w-full h-full fixed left-0 top-0 -z-10">
          <Starry />
        </div>
      )}

      <div className="text-[60pt] md:text-[72pt] lg:text-[96pt] font-semibold leading-[0.8] my-12 md:my-20 tracking-tight font-heading">
        <div className="text-muted">
          Welcome&nbsp;
          <br className="sm:hidden" />
          to&nbsp;
        </div>
        <div className="text-accent-foreground text-right">
          yorke
          <br className="sm:hidden" />
          john.dev
        </div>
      </div>

      <div className="flex sm:flex-row flex-col gap-12 items-start">
        <div className="border border-accent p-1">
          <Image width={200} height={200} loading="eager" src="/avatar.jpg" alt="John's Avatar" />
        </div>
        <div className="text-muted text-lg md:text-xl lg:text-2xl tracking-tighter max-w-[45ch] -mt-1">
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
        <ProjectCard project={projects[9]} withCta className="pt-4" />
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
