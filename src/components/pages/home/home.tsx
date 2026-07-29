'use client'

import {useMounted} from '@mantine/hooks'
import dynamic from 'next/dynamic'
import {useTheme} from 'next-themes'
import {PageSection} from '@/components'
import {ProjectCard} from '@/components/pages'
import {projects} from '@/components/pages/projects/registry'
import {ActivityFeed} from './activity-feed'
import {StatsMarquee} from './stats-marquee'
import {TopArtists} from './top-artists'

// background for space theme
const SpaceBackground = dynamic(() => import('./space-background'), {ssr: false})

export function HomePage() {
  const {theme} = useTheme()
  const mounted = useMounted()

  return (
    <section>
      {mounted && theme === 'space' && <SpaceBackground />}
      <div className="text-[60pt] md:text-[72pt] lg:text-[96pt] font-semibold leading-[0.8] my-12 md:my-20 tracking-tight font-heading">
        <div className="text-muted">
          John
          <br className="sm:hidden" />
          &nbsp;Yorke&nbsp;
        </div>
        <div className="text-accent-foreground text-right text-outline">
          yorke
          <br className="sm:hidden" />
          john.dev
        </div>
      </div>

      <div className="text-muted text-lg md:text-xl lg:text-2xl tracking-tighter text-balance mb-16">
        <p className="mb-4">
          Hey there! My name is John. I'm a software & data engineer based in Halifax, Nova Scotia, Canada.
        </p>
        <p>This is my personal corner of the internet where I share my projects and what I'm learning.</p>
      </div>

      <div className="flex flex-col gap-8">
        <PageSection label="Stats">
          <StatsMarquee />
        </PageSection>

        <PageSection label="Featured Project">
          <ProjectCard project={projects[9]} withCta className="pt-4" />
        </PageSection>

        <PageSection label="Recent Activity">
          <ActivityFeed />
        </PageSection>

        <PageSection label="Listening To">
          <TopArtists />
        </PageSection>
      </div>
    </section>
  )
}
